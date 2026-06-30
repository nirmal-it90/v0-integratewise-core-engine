'use client';

import { Target, Briefcase, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLens } from '@/lib/lens/lens-provider';
import { Lens } from '@/lib/lens/lens-config';
import { cn } from '@/lib/utils';

const LENS_ICONS = {
  cs: Target,
  bs: Briefcase,
  os: User,
} as const;

const LENS_NAMES = {
  cs: 'Customer Success',
  bs: 'Business',
  os: 'Personal OS',
} as const;

const LENS_DESCRIPTIONS = {
  cs: 'Manage accounts, health & renewals',
  bs: 'Revenue, clients & operations',
  os: 'Personal productivity & AI thinking',
} as const;

const LENS_COLORS = {
  cs: 'text-emerald-500',
  bs: 'text-blue-500',
  os: 'text-violet-500',
} as const;

interface LensSwitcherProps {
  compact?: boolean;
  className?: string;
}

export function LensSwitcher({ compact = false, className }: LensSwitcherProps) {
  const { lens, setLens, config } = useLens();

  const CurrentIcon = LENS_ICONS[lens];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex items-center gap-2',
            compact ? 'h-8 px-2' : 'h-10 px-3',
            className
          )}
        >
          <CurrentIcon className={cn('h-4 w-4', LENS_COLORS[lens])} />
          {!compact && (
            <>
              <span className="font-medium">{LENS_NAMES[lens]}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Switch Lens
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(['os', 'bs', 'cs'] as Lens[]).map((lensOption) => {
          const Icon = LENS_ICONS[lensOption];
          const isActive = lens === lensOption;

          return (
            <DropdownMenuItem
              key={lensOption}
              onClick={() => setLens(lensOption)}
              className={cn(
                'flex flex-col items-start gap-1 py-3 cursor-pointer',
                isActive && 'bg-accent'
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn('h-4 w-4', LENS_COLORS[lensOption])} />
                <span className="font-medium">{LENS_NAMES[lensOption]}</span>
                {isActive && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Active
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground pl-6">
                {LENS_DESCRIPTIONS[lensOption]}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
