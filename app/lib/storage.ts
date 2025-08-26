
"use client";

// Mock storage implementation for demo purposes
// In production, this would integrate with Supabase
export class MockStorage {
  private agents: Map<string, any> = new Map();
  private events: Map<string, any[]> = new Map();

  async getAgents(): Promise<any[]> {
    return Array.from(this.agents.values());
  }

  async getAgent(agentId: string): Promise<any | null> {
    return this.agents.get(agentId) || null;
  }

  async createAgent(agent: any): Promise<any> {
    this.agents.set(agent.agentId, agent);
    this.events.set(agent.agentId, []);
    
    // Add initial registration event
    const registeredEvent = {
      eventId: `event_${Date.now()}`,
      agentId: agent.agentId,
      eventType: 'REGISTERED',
      timestamp: new Date().toISOString(),
      logMessage: `Agent ${agent.agentName} registered`,
      metadata: {}
    };
    
    this.events.get(agent.agentId)?.push(registeredEvent);
    
    return agent;
  }

  async getEvents(agentId: string): Promise<any[]> {
    return this.events.get(agentId) || [];
  }

  async getAllEvents(): Promise<any[]> {
    const allEvents: any[] = [];
    for (const events of this.events.values()) {
      allEvents.push(...events);
    }
    return allEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async createEvent(event: any): Promise<any> {
    const agentEvents = this.events.get(event.agentId) || [];
    agentEvents.push(event);
    this.events.set(event.agentId, agentEvents);
    
    // Update agent status based on event type
    const agent = this.agents.get(event.agentId);
    if (agent) {
      if (event.eventType === 'START' || event.eventType === 'RUNNING') {
        agent.status = 'active';
      } else if (event.eventType === 'COMPLETE' || event.eventType === 'FAIL') {
        agent.status = 'inactive';
      }
      this.agents.set(event.agentId, agent);
    }
    
    return event;
  }
}

export const storage = new MockStorage();
