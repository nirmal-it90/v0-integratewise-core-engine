'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  departmentSchedules,
  dayNames,
  departments,
  dailyBriefs,
  weeklyCadence,
  contentPublishing,
} from '@/lib/data/operating-calendar';

export function OperatingCalendarView() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Executive');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'content'>('daily');

  const schedule = departmentSchedules[selectedDepartment];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operating Calendar</h1>
        <p className="text-muted-foreground mt-2">
          Company-wide scheduling rhythm for all departments
        </p>
      </div>

      {/* Department Tabs */}
      <div className="flex flex-wrap gap-2">
        {departments.map(dept => {
          const deptSchedule = departmentSchedules[dept];
          const isSelected = selectedDepartment === dept;
          return (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isSelected
                  ? `${deptSchedule.color} text-white shadow-lg`
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className="mr-2">{deptSchedule.icon}</span>
              {dept}
            </button>
          );
        })}
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{schedule.icon}</span>
            <div>
              <CardTitle>{schedule.department}</CardTitle>
              <CardDescription>{schedule.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* View Mode Tabs */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'daily' | 'weekly' | 'content')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Briefs</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Cadence</TabsTrigger>
          <TabsTrigger value="content">Content Publishing</TabsTrigger>
        </TabsList>

        {/* Daily Briefs Tab */}
        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4">
            {schedule.dailyEvents.length > 0 ? (
              schedule.dailyEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl font-bold text-primary">{event.time}</span>
                          <Badge variant={event.priority === 'high' ? 'default' : 'secondary'}>
                            {event.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {event.departments.map(dept => (
                            <Badge key={dept} variant="outline" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-muted-foreground">DAILY</div>
                        <div className="text-sm text-muted-foreground mt-1">Recurring</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    No daily briefs scheduled for {schedule.department}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Weekly Cadence Tab */}
        <TabsContent value="weekly" className="space-y-4">
          <div className="space-y-2">
            {schedule.weeklyEvents.length > 0 ? (
              schedule.weeklyEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-primary">
                            {event.dayOfWeek !== undefined && dayNames[event.dayOfWeek]}
                          </span>
                          <span className="text-muted-foreground">at {event.time}</span>
                          <Badge variant={event.priority === 'high' ? 'default' : 'secondary'}>
                            {event.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {event.departments.map(dept => (
                            <Badge key={dept} variant="outline" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-muted-foreground">WEEKLY</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    No weekly events scheduled for {schedule.department}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Content Publishing Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4">
            {schedule.contentEvents.length > 0 ? (
              schedule.contentEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-primary">
                            {event.dayOfWeek !== undefined && dayNames[event.dayOfWeek]}
                          </span>
                          <span className="text-muted-foreground">at {event.time}</span>
                          <Badge variant={event.priority === 'high' ? 'default' : 'secondary'}>
                            {event.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {event.departments.map(dept => (
                            <Badge key={dept} variant="outline" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-muted-foreground">
                          PUBLISHING
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    No content publishing scheduled for {schedule.department}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Timeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Company-Wide Daily Timeline (IST)</CardTitle>
          <CardDescription>All departments follow this daily rhythm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyBriefs.map(event => (
              <div key={event.id} className="flex items-center gap-4 pb-3 border-b last:border-0">
                <div className="w-16 font-mono font-bold text-lg text-primary">{event.time}</div>
                <div className="flex-1">
                  <div className="font-medium">{event.name}</div>
                  <div className="text-sm text-muted-foreground">{event.description}</div>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {event.departments.slice(0, 2).map(dept => (
                    <Badge key={dept} variant="secondary" className="text-xs">
                      {dept}
                    </Badge>
                  ))}
                  {event.departments.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{event.departments.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
