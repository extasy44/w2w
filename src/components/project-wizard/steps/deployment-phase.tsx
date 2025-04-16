'use client';

import { Card, Text } from '@radix-ui/themes';

interface DeploymentPhaseProps {
  projectId: string;
}

export function DeploymentPhase({ projectId }: DeploymentPhaseProps) {
  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <Text size='5' weight='bold'>
          Deployment Phase
        </Text>
        <Text>Coming soon...</Text>
      </div>
    </Card>
  );
}
