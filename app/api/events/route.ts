
import { NextResponse } from 'next/server';

// Mock database - in production this would use Supabase
let events: any[] = [];

export async function GET() {
  try {
    const sortedEvents = events.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return NextResponse.json({ events: sortedEvents });
  } catch (error) {
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

    const event = {
      eventId: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentId,
      eventType,
      timestamp: new Date().toISOString(),
      logMessage: logMessage || '',
      metadata: metadata || {}
    };

    events.push(event);

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
