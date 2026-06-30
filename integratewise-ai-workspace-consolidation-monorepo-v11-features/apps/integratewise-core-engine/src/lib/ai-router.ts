import type { SpineEvent } from '../types/spine-event';
import type { Env } from '../types/env';

/**
 * AI Router - Routes events to appropriate AI models and generates tasks
 */

export interface AIRouteRequest {
  event: SpineEvent;
  context?: Record<string, unknown>;
}

export interface AIRouteResponse {
  success: boolean;
  model?: string;
  tasks?: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate?: string;
  }>;
  insights?: string[];
  error?: string;
}

/**
 * Route event to appropriate AI model based on source and type
 */
export async function routeEvent(request: AIRouteRequest, env: Env): Promise<AIRouteResponse> {
  const { event } = request;

  try {
    // Determine which AI model to use based on event source and type
    const model = selectModel(event);

    // Generate tasks and insights based on event
    const tasks = await generateTasks(event, env);
    const insights = await generateInsights(event, env);

    return {
      success: true,
      model,
      tasks,
      insights,
    };
  } catch (error) {
    console.error('[AI Router] Failed to route event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown AI routing error',
    };
  }
}

/**
 * Select appropriate AI model based on event characteristics
 */
function selectModel(event: SpineEvent): string {
  // Model selection logic based on event source and complexity
  switch (event.source) {
    case 'stripe':
      return 'gpt-4o-mini'; // Simple financial data processing
    case 'slack':
    case 'discord':
      return 'claude-3-haiku'; // Fast conversation analysis
    case 'notion':
    case 'github':
      return 'gpt-4o'; // Complex document/code understanding
    default:
      return 'gpt-4o-mini'; // Default model
  }
}

/**
 * Generate tasks from event using AI
 */
async function generateTasks(
  event: SpineEvent,
  env: Env
): Promise<Array<{ title: string; description: string; priority: 'low' | 'medium' | 'high' | 'critical'; dueDate?: string }>> {
  // Placeholder for AI-based task generation
  // In production, this would call OpenAI/Anthropic API

  const tasks: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate?: string;
  }> = [];

  // Example: Generate task for Stripe payment
  if (event.source === 'stripe' && event.type.includes('payment_intent.succeeded')) {
    tasks.push({
      title: 'Process successful payment',
      description: `Payment received from ${event.payload.customer || 'customer'}`,
      priority: 'high',
    });
  }

  // Example: Generate task for Slack mention
  if (event.source === 'slack' && event.type === 'app_mention') {
    tasks.push({
      title: 'Respond to Slack mention',
      description: `You were mentioned in Slack: ${event.payload.text || 'message'}`,
      priority: 'medium',
    });
  }

  // Example: Generate task for GitHub PR
  if (event.source === 'github' && event.type === 'pull_request.opened') {
    tasks.push({
      title: 'Review pull request',
      description: `New PR opened: ${event.payload.title || 'untitled'}`,
      priority: 'medium',
    });
  }

  return tasks;
}

/**
 * Generate insights from event using AI
 */
async function generateInsights(event: SpineEvent, env: Env): Promise<string[]> {
  // Placeholder for AI-based insight generation
  // In production, this would analyze patterns and trends

  const insights: string[] = [];

  // Example: Stripe payment insights
  if (event.source === 'stripe') {
    insights.push(`Payment of ${event.payload.amount || 0} received`);
  }

  // Example: Conversation insights
  if (event.source === 'slack' || event.source === 'discord') {
    insights.push('New conversation activity detected');
  }

  return insights;
}

/**
 * Analyze event payload and extract key information
 */
export function analyzeEvent(event: SpineEvent): {
  summary: string;
  importance: 'low' | 'medium' | 'high';
  actionable: boolean;
} {
  // Simple heuristic-based analysis
  let importance: 'low' | 'medium' | 'high' = 'medium';
  let actionable = false;

  // High importance events
  if (
    event.source === 'stripe' ||
    event.type.includes('payment') ||
    event.type.includes('error') ||
    event.type.includes('critical')
  ) {
    importance = 'high';
    actionable = true;
  }

  // Low importance events
  if (
    event.type.includes('ping') ||
    event.type.includes('heartbeat') ||
    event.type.includes('read')
  ) {
    importance = 'low';
  }

  const summary = `${event.source} event: ${event.type}`;

  return { summary, importance, actionable };
}
