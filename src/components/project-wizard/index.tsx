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

export function ProjectWizard() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  // Find the active component
  const ActiveComponent = tabs.find((tab) => tab.value === activeTab)?.component || tabs[0].component;

  return (
    <Box className='max-w-6xl mx-auto p-4'>
      <Flex justify='between' align='center' mb='4'>
        <h1 className='text-2xl font-semibold'>Project Wizard</h1>
        <InteractiveButton
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='rounded-full w-10 h-10 bg-transparent hover:bg-muted flex items-center justify-center relative'>
          <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </InteractiveButton>
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
                <ActiveComponent />
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
