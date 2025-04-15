'use client';

import { Button, Card, Text, TextArea, TextField, Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

interface Component {
  id: string;
  name: string;
  type: string;
  properties: Record<string, string>;
  logic: string;
}

const COMPONENT_TYPES = ['Page', 'Form', 'List', 'Table', 'Chart', 'Navigation', 'Authentication', 'Modal'] as const;

export function DevelopmentEnvironment() {
  const [components, setComponents] = useState<Component[]>([]);
  const [currentComponent, setCurrentComponent] = useState<Partial<Component>>({});

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleComponentTypeSelect = async (type: string) => {
    setCurrentComponent((prev) => ({ ...prev, type }));
    await complete(`Suggest properties and logic for a ${type} component in a no-code environment.`);
  };

  const handleAddComponent = () => {
    if (!currentComponent.type || !currentComponent.name) return;

    const newComponent: Component = {
      id: Date.now().toString(),
      name: currentComponent.name,
      type: currentComponent.type,
      properties: currentComponent.properties || {},
      logic: currentComponent.logic || '',
    };

    setComponents((prev) => [...prev, newComponent]);
    setCurrentComponent({});
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div>
          <Text size='5' weight='bold'>
            Development Environment
          </Text>
          <Text color='gray'>Build your application using visual components and logic.</Text>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Component Type
            </Text>
            <Select.Root value={currentComponent.type} onValueChange={handleComponentTypeSelect}>
              <Select.Trigger />
              <Select.Content>
                {COMPONENT_TYPES.map((type) => (
                  <Select.Item key={type} value={type}>
                    {type}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Component Name
            </Text>
            <TextField.Root>
              <TextField.Input
                placeholder='Enter component name...'
                value={currentComponent.name || ''}
                onChange={(e) => setCurrentComponent((prev) => ({ ...prev, name: e.target.value }))}
              />
            </TextField.Root>
          </div>

          {completion && (
            <div className='space-y-2'>
              <Text weight='bold'>AI Suggestions</Text>
              <Card className='p-4 bg-muted'>
                <Text>{completion}</Text>
              </Card>
            </div>
          )}

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Component Logic
            </Text>
            <TextArea
              placeholder='Define component behavior...'
              value={currentComponent.logic || ''}
              onChange={(e) => setCurrentComponent((prev) => ({ ...prev, logic: e.target.value }))}
            />
          </div>

          <Button onClick={handleAddComponent}>Add Component</Button>
        </div>

        {components.length > 0 && (
          <div className='space-y-4'>
            <Text weight='bold'>Added Components</Text>
            <div className='space-y-3'>
              {components.map((component) => (
                <Card key={component.id} className='p-4'>
                  <div className='space-y-2'>
                    <Text weight='bold'>{component.name}</Text>
                    <Text color='gray'>Type: {component.type}</Text>
                    {component.logic && (
                      <div className='mt-2'>
                        <Text size='2' weight='bold'>
                          Logic:
                        </Text>
                        <Text size='2' color='gray'>
                          {component.logic}
                        </Text>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
