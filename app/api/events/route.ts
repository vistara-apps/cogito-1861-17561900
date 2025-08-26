import { NextResponse } from 'next/server';
import { AgentService } from '@/app/lib/agent-service';

const agentService = new AgentService();

export async function GET() {
  try {
    const events = await agentService.getEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error in GET /api/events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, eventType, logMessage, metadata } = body;

    if (!agentId || !eventType) {
      return NextResponse.json(
        { error: 'Agent ID and event type are required' },
        { status: 400 }
      );
    }

    const event = await agentService.logEvent({
      agentId,
      eventType,
      logMessage,
      metadata
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/events:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

