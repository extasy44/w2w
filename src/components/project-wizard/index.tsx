'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
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
import { Box, Flex } from '@radix-ui/themes';
import { v4 as uuidv4 } from 'uuid';

export function ProjectWizard() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [projectId] = useState(() => uuidv4());

  // Find the active component
  const ActiveComponent = tabs.find((tab) => tab.value === activeTab)?.component || tabs[0].component;

  return (
    <Box className='max-w-6xl mx-auto p-4'>
      <Flex justify='between' align='center' mb='4'>
        <h1 className='text-2xl font-semibold'>Project Wizard</h1>
      </Flex>

      <Tabs.Root defaultValue='idea' className='w-full' onValueChange={setActiveTab}>
        <Box mb='4' style={{ overflowX: 'auto' }}>
          <Tabs.List className='flex gap-2 pb-2'>
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
        </Box>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='space-y-4'>
            <Tabs.Content value={activeTab} className='outline-none'>
              <CardContainer>
                <ActiveComponent projectId={projectId} />
              </CardContainer>
            </Tabs.Content>
          </motion.div>
        </AnimatePresence>
      </Tabs.Root>
    </Box>
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
