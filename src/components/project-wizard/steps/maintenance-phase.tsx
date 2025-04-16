'use client';

import { Card, Text } from '@radix-ui/themes';

interface MaintenancePhaseProps {
  projectId: string;
}

export function MaintenancePhase({ projectId }: MaintenancePhaseProps) {
  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <Text size='5' weight='bold'>
          Maintenance Phase
        </Text>
        <Text>Coming soon...</Text>
      </div>
    </Card>
  );
}
