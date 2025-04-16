'use client';

import { Card, Text } from '@radix-ui/themes';

interface DevelopmentPhaseProps {
  projectId: string;
}

export function DevelopmentPhase({ projectId }: DevelopmentPhaseProps) {
  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <Text size='5' weight='bold'>
          Development Phase
        </Text>
        <Text>Coming soon...</Text>
      </div>
    </Card>
  );
}
