'use client';

import { Card, Text } from '@radix-ui/themes';

interface TestingPhaseProps {
  projectId: string;
}

export function TestingPhase({ projectId }: TestingPhaseProps) {
  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <Text size='5' weight='bold'>
          Testing Phase
        </Text>
        <Text>Coming soon...</Text>
      </div>
    </Card>
  );
}
