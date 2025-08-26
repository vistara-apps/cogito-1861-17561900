import { NextResponse } from 'next/server';
import { AgentService } from '@/app/lib/agent-service';

const agentService = new AgentService();

export async function GET(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const agentId = params.agentId;
    
    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      );
    }

    const events = await agentService.getAgentEvents(agentId);
    return NextResponse.json({ events });
  } catch (error) {
    console.error(`Error in GET /api/agents/${params.agentId}/events:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch agent events' },
      { status: 500 }
    );
  }
}

