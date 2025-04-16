'use client';

import { Button, Card, Text, Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { MarkdownContent } from '@/components/ui/markdown-content';

interface Technology {
  id: string;
  category: string;
  name: string;
  description: string;
}

const TECH_CATEGORIES = ['Frontend Framework', 'Backend Framework', 'Database', 'Authentication', 'Hosting', 'Other'] as const;

export function TechnologySelection() {
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleCategoryChange = async (category: string) => {
    setCurrentCategory(category);
    await complete(
      `Suggest the best technology options for ${category} considering modern development practices and ease of use for a no-code/low-code platform.`
    );
  };

  const handleTechnologySelect = (techName: string) => {
    if (!currentCategory || !techName) return;

    const newTechnology: Technology = {
      id: Date.now().toString(),
      category: currentCategory,
      name: techName,
      description: completion || '',
    };

    setSelectedTechnologies((prev) => {
      // Replace if category already exists
      const filtered = prev.filter((tech) => tech.category !== currentCategory);
      return [...filtered, newTechnology];
    });
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div>
          <Text size='5' weight='bold'>
            Technology Selection
          </Text>
          <br />
          <Text color='gray'>Choose the technologies that will power your application.</Text>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Category
            </Text>
            <Select.Root value={currentCategory} onValueChange={handleCategoryChange}>
              <Select.Trigger className='w-full' />
              <Select.Content>
                {TECH_CATEGORIES.map((category) => (
                  <Select.Item key={category} value={category}>
                    {category}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          {completion && (
            <div className='space-y-3'>
              <Text weight='bold' size='3'>
                Recommended Technologies
              </Text>
              <MarkdownContent content={completion} />
            </div>
          )}
        </div>

        {selectedTechnologies.length > 0 && (
          <div className='space-y-4'>
            <Text weight='bold'>Selected Technologies</Text>
            <div className='space-y-3'>
              {selectedTechnologies.map((tech) => (
                <Card key={tech.id} className='p-4'>
                  <div className='space-y-2'>
                    <Text weight='bold'>{tech.category}</Text>
                    <Text>{tech.name}</Text>
                    <MarkdownContent content={tech.description} className='mt-2' />
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
