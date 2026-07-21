'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  departmentSchedules,
  dayNames,
  dailyBriefs,
  weeklyCadence,
  contentPublishing,
} from '@/lib/data/operating-calendar';

export function OperatingCalendarAllDepartments() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Company Operating Calendar</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          All departments view - Complete scheduling rhythm for IntegrateWise (Asia/Kolkata timezone)
        </p>
      </div>

      {/* Daily Timeline (Company-wide) */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Daily Timeline (IST - Every Day)</CardTitle>
          <CardDescription>All departments follow this daily rhythm from 08:00 to 18:00</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyBriefs.map((event, index) => (
              <div key={event.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className="w-20">
                  <div className="font-mono font-bold text-2xl text-primary">{event.time}</div>
                  <div className="text-xs text-muted-foreground mt-1">IST</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg mb-1">{event.name}</div>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {event.departments.map(dept => {
                      const deptSchedule = departmentSchedules[dept];
                      return (
                        <Badge key={dept} className={`${deptSchedule.color} text-white text-xs`}>
                          {deptSchedule.icon} {dept}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">Daily</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Cards with Specific Schedules */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Department Schedules</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {Object.entries(departmentSchedules).map(([deptName, schedule]) => (
            <Card key={deptName} className="overflow-hidden">
              <CardHeader className={`${schedule.color} text-white`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{schedule.icon}</span>
                  <div>
                    <CardTitle className="text-2xl text-white">{deptName}</CardTitle>
                    <CardDescription className="text-white/80">{schedule.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Daily Events */}
                  {schedule.dailyEvents.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase">Daily Focus Areas</h4>
                      <div className="space-y-2">
                        {schedule.dailyEvents.map(event => (
                          <div key={event.id} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                            <div className="font-mono font-bold text-sm text-primary min-w-16">{event.time}</div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{event.name}</div>
                              <div className="text-xs text-muted-foreground">{event.description}</div>
                            </div>
                            <Badge variant="outline" className="text-xs ml-2">{event.priority}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weekly Events */}
                  {schedule.weeklyEvents.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase">Weekly Focus Days</h4>
                      <div className="space-y-2">
                        {schedule.weeklyEvents.map(event => (
                          <div key={event.id} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                            <div className="font-semibold text-sm text-primary min-w-24">
                              {event.dayOfWeek !== undefined && dayNames[event.dayOfWeek].slice(0, 3)}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{event.name}</div>
                              <div className="text-xs text-muted-foreground">{event.description}</div>
                            </div>
                            <Badge variant="outline" className="text-xs ml-2">{event.priority}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Events */}
                  {schedule.contentEvents.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase">Content Publishing</h4>
                      <div className="space-y-2">
                        {schedule.contentEvents.map(event => (
                          <div key={event.id} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                            <div className="font-semibold text-sm text-primary min-w-24">
                              {event.dayOfWeek !== undefined && dayNames[event.dayOfWeek].slice(0, 3)}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{event.name}</div>
                              <div className="text-xs text-muted-foreground">{event.description}</div>
                            </div>
                            <Badge variant="outline" className="text-xs ml-2">{event.priority}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Cadence Overview */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Weekly Cadence (Monday - Sunday)</CardTitle>
          <CardDescription>Department focus areas for each day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
              const dayEventsWeekly = weeklyCadence.filter(e => e.dayOfWeek === dayIndex);
              const dayEventsContent = contentPublishing.filter(e => e.dayOfWeek === dayIndex);
              const dayName = dayNames[dayIndex];
              
              return (
                <Card key={dayName}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{dayName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dayEventsWeekly.map(event => (
                      <div key={event.id} className="text-sm border-l-2 border-primary pl-3">
                        <div className="font-semibold">{event.name}</div>
                        <div className="text-xs text-muted-foreground">{event.description}</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {event.departments.map(dept => (
                            <Badge key={dept} variant="secondary" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    {dayEventsContent.map(event => (
                      <div key={event.id} className="text-sm border-l-2 border-pink-500 pl-3">
                        <div className="font-semibold">📝 {event.name}</div>
                        <div className="text-xs text-muted-foreground">{event.description}</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {event.departments.map(dept => (
                            <Badge key={dept} variant="secondary" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">Executive, Product, Engineering, Sales, Marketing, CS</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Briefs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
            <p className="text-xs text-muted-foreground mt-1">08:00 - 18:00 IST</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Cadence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">Monday - Sunday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Content Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">Publishing rhythm</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
