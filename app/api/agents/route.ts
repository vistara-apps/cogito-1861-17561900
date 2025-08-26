
import { NextResponse } from 'next/server';

// Mock database - in production this would use Supabase
let agents: any[] = [];

export async function GET() {
  try {
    return NextResponse.json({ agents });
  } catch (error) {
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

    const agent = {
      agentId: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentName,
      ownerAddress,
      createdAt: new Date().toISOString(),
      metadata: metadata || {},
      status: 'active'
    };

    agents.push(agent);

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
