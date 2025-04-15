'use client';

import { Button, Card, Text, TextField, Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

interface DeploymentConfig {
  id: string;
  platform: string;
  region: string;
  environment: string;
  domain?: string;
  settings: Record<string, string>;
}

const PLATFORMS = ['Vercel', 'AWS', 'Google Cloud', 'Azure', 'Heroku', 'Digital Ocean'] as const;

const ENVIRONMENTS = ['Development', 'Staging', 'Production'] as const;

const REGIONS = ['US East', 'US West', 'Europe', 'Asia Pacific', 'South America'] as const;

export function DeploymentSystem() {
  const [deployments, setDeployments] = useState<DeploymentConfig[]>([]);
  const [currentConfig, setCurrentConfig] = useState<Partial<DeploymentConfig>>({});

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handlePlatformSelect = async (platform: string) => {
    setCurrentConfig((prev) => ({ ...prev, platform }));
    await complete(`Suggest best practices and configuration settings for deploying to ${platform}.`);
  };

  const handleAddDeployment = () => {
    if (!currentConfig.platform || !currentConfig.environment || !currentConfig.region) return;

    const newDeployment: DeploymentConfig = {
      id: Date.now().toString(),
      platform: currentConfig.platform,
      environment: currentConfig.environment,
      region: currentConfig.region,
      domain: currentConfig.domain,
      settings: {},
    };

    setDeployments((prev) => [...prev, newDeployment]);
    setCurrentConfig({});
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div>
          <Text size='5' weight='bold'>
            Deployment System
          </Text>
          <Text color='gray'>Configure and manage your application deployments.</Text>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Platform
            </Text>
            <Select.Root value={currentConfig.platform} onValueChange={handlePlatformSelect}>
              <Select.Trigger />
              <Select.Content>
                {PLATFORMS.map((platform) => (
                  <Select.Item key={platform} value={platform}>
                    {platform}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Environment
            </Text>
            <Select.Root
              value={currentConfig.environment}
              onValueChange={(env) => setCurrentConfig((prev) => ({ ...prev, environment: env }))}>
              <Select.Trigger />
              <Select.Content>
                {ENVIRONMENTS.map((env) => (
                  <Select.Item key={env} value={env}>
                    {env}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Region
            </Text>
            <Select.Root value={currentConfig.region} onValueChange={(region) => setCurrentConfig((prev) => ({ ...prev, region }))}>
              <Select.Trigger />
              <Select.Content>
                {REGIONS.map((region) => (
                  <Select.Item key={region} value={region}>
                    {region}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Custom Domain (Optional)
            </Text>
            <TextField.Root>
              <TextField.Input
                placeholder='Enter custom domain...'
                value={currentConfig.domain || ''}
                onChange={(e) => setCurrentConfig((prev) => ({ ...prev, domain: e.target.value }))}
              />
            </TextField.Root>
          </div>

          {completion && (
            <div className='space-y-2'>
              <Text weight='bold'>Deployment Suggestions</Text>
              <Card className='p-4 bg-muted'>
                <Text>{completion}</Text>
              </Card>
            </div>
          )}

          <Button onClick={handleAddDeployment}>Add Deployment Configuration</Button>
        </div>

        {deployments.length > 0 && (
          <div className='space-y-4'>
            <Text weight='bold'>Deployment Configurations</Text>
            <div className='space-y-3'>
              {deployments.map((deployment) => (
                <Card key={deployment.id} className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <Text weight='bold'>{deployment.platform}</Text>
                      <Text size='2' color='gray'>
                        {deployment.environment}
                      </Text>
                    </div>
                    <Text color='gray'>Region: {deployment.region}</Text>
                    {deployment.domain && <Text size='2'>Domain: {deployment.domain}</Text>}
                    <div className='flex space-x-2 mt-2'>
                      <Button size='1' variant='outline'>
                        Deploy
                      </Button>
                      <Button size='1' variant='outline' color='red'>
                        Delete
                      </Button>
                    </div>
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
