'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { IdeaCapture } from './steps/idea-capture';
import { RequirementsDefinition } from './steps/requirements-definition';
import { TechnologySelection } from './steps/technology-selection';
import { DesignPhase } from './steps/design-phase';
import { DevelopmentEnvironment } from './steps/development-environment';
import { TestingTools } from './steps/testing-tools';
import { DeploymentSystem } from './steps/deployment-system';
import { MaintenanceDashboard } from './steps/maintenance-dashboard';
import { CardContainer } from '../ui/card-container';
import { InteractiveButton } from '../ui/interactive-button';

export function ProjectWizard() {
  return (
    <div className='max-w-6xl mx-auto p-4'>
      <Tabs.Root defaultValue='idea' className='w-full'>
        <Tabs.List className='flex overflow-x-auto gap-2 mb-6 pb-2'>
          {tabs.map(({ value, label }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className='px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                hover:bg-muted/80'>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className='space-y-4'>
          {tabs.map(({ value, component: Component }) => (
            <Tabs.Content
              key={value}
              value={value}
              className='transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100'>
              <CardContainer>
                <Component />
              </CardContainer>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}

const tabs = [
  { value: 'idea', label: 'Idea Capture', component: IdeaCapture },
  { value: 'requirements', label: 'Requirements', component: RequirementsDefinition },
  { value: 'technology', label: 'Technology', component: TechnologySelection },
  { value: 'design', label: 'Design', component: DesignPhase },
  { value: 'development', label: 'Development', component: DevelopmentEnvironment },
  { value: 'testing', label: 'Testing', component: TestingTools },
  { value: 'deployment', label: 'Deployment', component: DeploymentSystem },
  { value: 'maintenance', label: 'Maintenance', component: MaintenanceDashboard },
];
