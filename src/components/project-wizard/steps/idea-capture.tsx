'use client';

import { Card, Text, TextArea, TextField, Button } from '@radix-ui/themes';
import { useState, useEffect, useCallback } from 'react';
import { useCompletion } from 'ai/react';
import { MarkdownContent } from '@/components/ui/markdown-content';
import { useDebounce } from '@/hooks/use-debounce';
import { createSuggestion, getSuggestions } from '@/lib/services/suggestions';
import { useToast } from '@/components/ui/use-toast';

interface IdeaCaptureProps {
  projectId: string;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  metadata: any;
}

export function IdeaCapture({ projectId }: IdeaCaptureProps) {
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [isAutoComplete, setIsAutoComplete] = useState(false);
  const [savedSuggestions, setSavedSuggestions] = useState<string | null>(null);
  const debouncedDescription = useDebounce(appDescription, 2000);
  const { toast } = useToast();

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/completion',
  });

  // Load saved suggestions on mount
  useEffect(() => {
    async function loadSuggestions() {
      try {
        const suggestions = await getSuggestions();
        const saved = suggestions.find((s) => s.metadata?.projectId === projectId);
        if (saved) {
          setAppName(saved.title);
          setAppDescription(saved.description);
          setSavedSuggestions(saved.metadata?.suggestions || null);
        }
      } catch (error) {
        console.error('Failed to load suggestions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load saved suggestions',
          variant: 'destructive',
        });
      }
    }
    loadSuggestions();
  }, [projectId, toast]);

  const handleSuggestions = useCallback(async () => {
    if (!appName || !appDescription) return;

    try {
      const result = await complete(
        `Based on the app name "${appName}" and description "${appDescription}", suggest some features and improvements. Format the response in markdown with clear sections for Features, User Experience, and Technical Considerations.`
      );

      // Save suggestions to database
      await createSuggestion({
        title: appName,
        description: appDescription,
        user_id: 'current-user-id', // TODO: Replace with actual user ID
        status: 'pending',
        metadata: {
          projectId,
          suggestions: result,
        },
      });

      toast({
        title: 'Success',
        description: 'Suggestions saved successfully',
      });
    } catch (error) {
      console.error('Failed to save suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to save suggestions',
        variant: 'destructive',
      });
    }
  }, [appName, appDescription, complete, projectId, toast]);

  useEffect(() => {
    if (isAutoComplete && debouncedDescription) {
      handleSuggestions();
    }
  }, [debouncedDescription, handleSuggestions, isAutoComplete]);

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Text as='label' size='2' weight='bold'>
            App Name
          </Text>
          <TextField.Root>
            <TextField.Input placeholder='Enter your app name' value={appName} onChange={(e) => setAppName(e.target.value)} />
          </TextField.Root>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Text as='label' size='2' weight='bold'>
              App Description
            </Text>
            <div className='flex items-center gap-2'>
              <Text size='1' color='gray'>
                Auto-suggest
              </Text>
              <Button variant={isAutoComplete ? 'solid' : 'outline'} size='1' onClick={() => setIsAutoComplete(!isAutoComplete)}>
                {isAutoComplete ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
          <TextArea
            placeholder='Describe your app idea in detail...'
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
            className='min-h-[150px]'
          />
        </div>

        <Button onClick={handleSuggestions} disabled={!appName || !appDescription || isLoading} className='w-full'>
          {isLoading ? 'Generating...' : 'Generate Suggestions'}
        </Button>

        {isLoading && (
          <div className='flex items-center justify-center py-4'>
            <Text color='gray'>Generating suggestions...</Text>
          </div>
        )}

        {(completion || savedSuggestions) && !isLoading && (
          <div className='space-y-3'>
            <Text weight='bold' size='3'>
              AI Suggestions
            </Text>
            <MarkdownContent content={completion || savedSuggestions || ''} />
          </div>
        )}
      </div>
    </Card>
  );
}
