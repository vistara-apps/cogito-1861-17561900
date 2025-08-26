import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Agent = {
  agentId: string;
  ownerAddress: string;
  agentName: string;
  createdAt: string;
  metadata: any;
  status: 'active' | 'inactive';
  irysTransactionId?: string; // Reference to Irys.xyz transaction for additional metadata
};

export type Event = {
  eventId: string;
  agentId: string;
  eventType: 'START' | 'RUNNING' | 'COMPLETE' | 'FAIL' | 'REGISTERED';
  timestamp: string;
  logMessage?: string;
  metadata?: any;
  irysTransactionId?: string; // Reference to Irys.xyz transaction for log data
};

// Supabase service for agent and event data
export class SupabaseService {
  // Agents
  async getAgents(): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }

    return data || [];
  }

  async getAgent(agentId: string): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('agentId', agentId)
      .single();

    if (error) {
      console.error('Error fetching agent:', error);
      throw error;
    }

    return data;
  }

  async createAgent(agent: Omit<Agent, 'agentId' | 'createdAt'>): Promise<Agent> {
    const newAgent = {
      ...agent,
      agentId: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('agents')
      .insert([newAgent])
      .select()
      .single();

    if (error) {
      console.error('Error creating agent:', error);
      throw error;
    }

    return data;
  }

  async updateAgent(agentId: string, updates: Partial<Agent>): Promise<Agent> {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('agentId', agentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating agent:', error);
      throw error;
    }

    return data;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    return data || [];
  }

  async getAgentEvents(agentId: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('agentId', agentId)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching agent events:', error);
      throw error;
    }

    return data || [];
  }

  async createEvent(event: Omit<Event, 'eventId' | 'timestamp'>): Promise<Event> {
    const newEvent = {
      ...event,
      eventId: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('events')
      .insert([newEvent])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }

    return data;
  }
}

