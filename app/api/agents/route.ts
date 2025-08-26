import { NextResponse } from 'next/server';
import { AgentService } from '@/app/lib/agent-service';

const agentService = new AgentService();

export async function GET() {
  try {
    const agents = await agentService.getAgents();
    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Error in GET /api/agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentName, ownerAddress, metadata } = body;

    if (!agentName || !ownerAddress) {
      return NextResponse.json(
        { error: 'Agent name and owner address are required' },
        { status: 400 }
      );
    }

    const agent = await agentService.registerAgent({
      agentName,
      ownerAddress,
      metadata
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/agents:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}

