'use client';

import { Button, Card, Text, TextArea, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { MarkdownContent } from '@/components/ui/markdown-content';

interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export function RequirementsDefinition() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleAddRequirement = () => {
    if (!currentTitle || !currentDescription) return;

    const newRequirement: Requirement = {
      id: Date.now().toString(),
      title: currentTitle,
      description: currentDescription,
      priority: 'medium',
    };

    setRequirements([...requirements, newRequirement]);
    setCurrentTitle('');
    setCurrentDescription('');

    // Get AI suggestions for the requirement
    complete(
      `Based on the requirement "${currentTitle}: ${currentDescription}", suggest some implementation details and potential features to consider.`
    );
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div>
          <Text size='5' weight='bold'>
            Requirements Definition
          </Text>
          <br />
          <Text color='gray'>Define the core requirements and features of your application.</Text>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Requirement Title
            </Text>
            <TextField.Root>
              <TextField.Input
                placeholder='Enter requirement title...'
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
            </TextField.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Description
            </Text>
            <TextArea
              placeholder='Describe the requirement in detail...'
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
            />
          </div>

          <Button onClick={handleAddRequirement}>Add Requirement</Button>
        </div>

        {requirements.length > 0 && (
          <div className='space-y-4'>
            <Text weight='bold'>Defined Requirements</Text>
            <div className='space-y-3'>
              {requirements.map((req) => (
                <Card key={req.id} className='p-4'>
                  <div className='space-y-2'>
                    <Text weight='bold'>{req.title}</Text>
                    <Text color='gray'>{req.description}</Text>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {completion && (
          <div className='space-y-2'>
            <Text weight='bold'>AI Suggestions</Text>
            <Card className='p-4 bg-muted'>
              <MarkdownContent content={completion} />
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}
