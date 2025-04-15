import { Container, Heading, Text } from '@radix-ui/themes';
import { ProjectWizard } from '@/components/project-wizard';

export default function Home() {
  return (
    <main className='min-h-screen py-12'>
      <Container>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='text-center space-y-4'>
            <Heading size='8' className='tracking-tight'>
              Build Your App with AI Assistance
            </Heading>
            <Text size='5' className='text-muted-foreground'>
              From idea to deployment, we guide you through every step
            </Text>
          </div>
          <ProjectWizard />
        </div>
      </Container>
    </main>
  );
}
