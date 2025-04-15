import { Button, Card, Text, Select, Tabs } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

interface DesignChoice {
  id: string;
  category: string;
  selection: string;
  description: string;
}

const DESIGN_CATEGORIES = {
  layout: ['Single Page', 'Multi Page', 'Dashboard', 'Landing Page'],
  theme: ['Light', 'Dark', 'System', 'Custom'],
  style: ['Minimal', 'Modern', 'Classic', 'Playful'],
  components: ['Basic', 'Advanced', 'Custom'],
} as const;

export function DesignPhase() {
  const [designChoices, setDesignChoices] = useState<DesignChoice[]>([]);
  const [currentCategory, setCurrentCategory] = useState<keyof typeof DESIGN_CATEGORIES>('layout');

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleDesignSelect = async (category: keyof typeof DESIGN_CATEGORIES, selection: string) => {
    const newChoice: DesignChoice = {
      id: Date.now().toString(),
      category,
      selection,
      description: '',
    };

    setDesignChoices((prev) => {
      const filtered = prev.filter((choice) => choice.category !== category);
      return [...filtered, newChoice];
    });

    await complete(`Suggest UI/UX design patterns and best practices for a ${selection} ${category} design style.`);
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div>
          <Text size='5' weight='bold'>
            Design Phase
          </Text>
          <Text color='gray'>Define the visual style and user experience of your application.</Text>
        </div>

        <Tabs.Root value={currentCategory} onValueChange={(value) => setCurrentCategory(value as keyof typeof DESIGN_CATEGORIES)}>
          <Tabs.List>
            {Object.keys(DESIGN_CATEGORIES).map((category) => (
              <Tabs.Trigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {Object.entries(DESIGN_CATEGORIES).map(([category, options]) => (
            <Tabs.Content key={category} value={category}>
              <div className='space-y-4 mt-4'>
                <div className='grid grid-cols-2 gap-4'>
                  {options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        designChoices.find((choice) => choice.category === category && choice.selection === option) ? 'solid' : 'outline'
                      }
                      onClick={() => handleDesignSelect(category as keyof typeof DESIGN_CATEGORIES, option)}>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {completion && (
          <div className='space-y-2'>
            <Text weight='bold'>Design Suggestions</Text>
            <Card className='p-4 bg-muted'>
              <Text>{completion}</Text>
            </Card>
          </div>
        )}

        {designChoices.length > 0 && (
          <div className='space-y-4'>
            <Text weight='bold'>Selected Design Choices</Text>
            <div className='space-y-3'>
              {designChoices.map((choice) => (
                <Card key={choice.id} className='p-4'>
                  <div className='space-y-2'>
                    <Text weight='bold'>{choice.category.charAt(0).toUpperCase() + choice.category.slice(1)}</Text>
                    <Text>{choice.selection}</Text>
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
