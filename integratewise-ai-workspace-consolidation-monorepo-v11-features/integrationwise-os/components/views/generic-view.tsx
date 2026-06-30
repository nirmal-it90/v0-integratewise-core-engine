'use client';

import { ReactNode } from 'react';
import { useLens } from '@/lib/lens/lens-provider';
import { Lens } from '@/lib/lens/lens-config';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

/**
 * GENERIC VIEW WRAPPER
 * Uses shadcn/ui components for consistent layout
 * 
 * Usage:
 * <GenericView
 *   title={{ cs: 'Accounts', bs: 'Clients', os: 'Contacts' }}
 *   description={{ cs: 'Manage customer accounts', bs: 'Manage clients', os: 'Your network' }}
 * >
 *   <YourViewContent />
 * </GenericView>
 */

interface GenericViewProps {
  // Title per lens or single string
  title: string | { cs: string; bs: string; os: string };
  // Description per lens or single string
  description?: string | { cs: string; bs: string; os: string };
  // Actions to show in header
  actions?: ReactNode;
  // Main content
  children: ReactNode;
  // Additional class names
  className?: string;
  // Override lens (optional, for testing)
  forceLens?: Lens;
}

function getLensValue<T extends string>(
  value: T | { cs: T; bs: T; os: T },
  lens: Lens
): T {
  if (typeof value === 'string') return value;
  return value[lens];
}

export function GenericView({
  title,
  description,
  actions,
  children,
  className,
  forceLens,
}: GenericViewProps) {
  const { lens: contextLens } = useLens();
  const lens = forceLens ?? contextLens;

  const displayTitle = getLensValue(title, lens);
  const displayDescription = description ? getLensValue(description, lens) : undefined;

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header using Card component */}
      <Card className="rounded-none border-x-0 border-t-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">{displayTitle}</CardTitle>
            {displayDescription && (
              <CardDescription className="mt-1">{displayDescription}</CardDescription>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </CardHeader>
      </Card>

      <Separator />

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  );
}

/**
 * LENS CONTENT - Shows content only for specific lenses
 * 
 * Usage:
 * <LensContent show={['cs']}>
 *   <HealthScoreWidget />
 * </LensContent>
 */
interface LensContentProps {
  show: Lens[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function LensContent({ show, children, fallback }: LensContentProps) {
  const { lens } = useLens();

  if (show.includes(lens)) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}

/**
 * LENS FIELD - Displays a field only if visible in current lens
 * 
 * Usage:
 * <LensField field="health_score" entity="accounts">
 *   {(value) => <HealthScore value={value} />}
 * </LensField>
 */
interface LensFieldProps<T> {
  field: string;
  entity: 'accounts' | 'tasks' | 'projects';
  value: T;
  children: (value: T) => ReactNode;
  fallback?: ReactNode;
}

export function LensField<T>({
  field,
  entity,
  value,
  children,
  fallback,
}: LensFieldProps<T>) {
  const { getVisibleFields } = useLens();
  const visibleFields = getVisibleFields(entity);

  if (visibleFields.includes(field)) {
    return <>{children(value)}</>;
  }

  return fallback ? <>{fallback}</> : null;
}

/**
 * USE LENS VALUE - Hook to get lens-specific value
 * 
 * Usage:
 * const title = useLensValue({ cs: 'Accounts', bs: 'Clients', os: 'Contacts' });
 */
export function useLensValue<T>(value: T | { cs: T; bs: T; os: T }): T {
  const { lens } = useLens();
  return getLensValue(value as T, lens);
}
