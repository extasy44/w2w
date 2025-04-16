import { Card, Text, TextArea, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

export function IdeaCapture() {
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleSuggestions = async () => {
    if (!appName || !appDescription) return;

    await complete(`Based on the app name "${appName}" and description "${appDescription}", suggest some features and improvements.`);
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Text as='label' size='2' weight='bold'>
            App Name
          </Text>
          <br />
          <TextField.Root>
            <TextField.Input placeholder='Enter your app name' value={appName} onChange={(e) => setAppName(e.target.value)} />
          </TextField.Root>
        </div>

        <div className='space-y-2'>
          <Text as='label' size='2' weight='bold'>
            App Description
          </Text>
          <TextArea
            placeholder='Describe your app idea in detail...'
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
          />
        </div>

        {completion && (
          <div className='space-y-2'>
            <Text weight='bold'>AI Suggestions</Text>
            <Card className='p-4 bg-muted'>
              <Text>{completion}</Text>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}
