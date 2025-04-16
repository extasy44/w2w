'use client';

import { Button, Card, Text, TextArea, TextField, Select, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { MarkdownContent } from '@/components/ui/markdown-content';

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
        <div className='space-y-1.5'>
          <Text size='5' weight='bold'>
            Development Environment
          </Text>
          <br />
          <Text color='gray'>Build your application using visual components and logic.</Text>
        </div>

        <div className='space-y-6'>
          <div className='space-y-4'>
            <div className='grid gap-3'>
              <Flex direction='column' gap='2'>
                <Text as='label' size='2' weight='bold'>
                  Component Type
                </Text>
                <Select.Root value={currentComponent.type} onValueChange={handleComponentTypeSelect}>
                  <Select.Trigger className='w-full' placeholder='Select component type...' />
                  <Select.Content>
                    {COMPONENT_TYPES.map((type) => (
                      <Select.Item key={type} value={type}>
                        {type}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction='column' gap='2'>
                <Text as='label' size='2' weight='bold'>
                  Component Name
                </Text>
                <TextField.Root className='w-full'>
                  <TextField.Input
                    placeholder='Enter component name...'
                    value={currentComponent.name || ''}
                    onChange={(e) => setCurrentComponent((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </TextField.Root>
              </Flex>

              {completion && (
                <Flex direction='column' gap='2'>
                  <Text weight='bold'>AI Suggestions</Text>
                  <Card className='p-4 bg-muted'>
                    <MarkdownContent content={completion} />
                  </Card>
                </Flex>
              )}

              <Flex direction='column' gap='2'>
                <Text as='label' size='2' weight='bold'>
                  Component Logic
                </Text>
                <TextArea
                  className='w-full min-h-[100px]'
                  placeholder='Define component behavior...'
                  value={currentComponent.logic || ''}
                  onChange={(e) => setCurrentComponent((prev) => ({ ...prev, logic: e.target.value }))}
                />
              </Flex>

              <Button onClick={handleAddComponent} className='w-full mt-2'>
                Add Component
              </Button>
            </div>
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
      </div>
    </Card>
  );
}
