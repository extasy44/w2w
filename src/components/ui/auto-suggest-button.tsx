'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAutoSuggest } from '@/contexts/auto-suggest-context';

export function AutoSuggestButton({ onClick }: { onClick?: () => void }) {
  const { isAutoComplete, setIsAutoComplete, isGenerating } = useAutoSuggest();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isAutoComplete ? 'default' : 'outline'}
            size='sm'
            onClick={() => setIsAutoComplete(!isAutoComplete)}
            disabled={isGenerating}
            className='gap-2'>
            <Sparkles className='h-4 w-4' />
            {isGenerating ? 'Generating...' : isAutoComplete ? 'Auto-suggest On' : 'Auto-suggest Off'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle AI-powered suggestions for your project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
