"use server";

import { ZFrameworkClient } from './z-framework';
import { SupabaseService, Agent, Event } from './supabase';
import { IrysClient } from './irys';

// Unified service for agent and event management
export class AgentService {
  private zFramework: ZFrameworkClient;
  private supabase: SupabaseService;
  private irys: IrysClient;

  constructor() {
    this.zFramework = new ZFrameworkClient();
    this.supabase = new SupabaseService();
    this.irys = new IrysClient();
  }

  // Register a new agent
  async registerAgent(agentData: {
    agentName: string;
    ownerAddress: string;
    metadata?: any;
  }): Promise<Agent> {
    try {
      // Store additional metadata on Irys.xyz if provided
      let irysTransactionId: string | undefined;
      if (agentData.metadata) {
        irysTransactionId = await this.irys.storeLog({
          type: 'agent_metadata',
          data: agentData.metadata
        });
      }

      // Create agent in Supabase
      const agent = await this.supabase.createAgent({
        agentName: agentData.agentName,
        ownerAddress: agentData.ownerAddress,
        metadata: agentData.metadata || {},
        status: 'active',
        irysTransactionId
      });

      // Register agent with Z Framework
      try {
        await this.zFramework.registerAgent({
          agentName: agent.agentName,
          ownerAddress: agent.ownerAddress,
          metadata: agent.metadata,
          status: agent.status
        });
      } catch (error) {
        console.error('Failed to register agent with Z Framework:', error);
        // Continue with local registration even if Z Framework registration fails
      }

      // Log registration event
      await this.logEvent({
        agentId: agent.agentId,
        eventType: 'REGISTERED',
        logMessage: `Agent ${agent.agentName} registered`,
        metadata: {}
      });

      return agent;
    } catch (error) {
      console.error('Error registering agent:', error);
      throw error;
    }
  }

  // Log an event for an agent
  async logEvent(eventData: {
    agentId: string;
    eventType: Event['eventType'];
    logMessage?: string;
    metadata?: any;
  }): Promise<Event> {
    try {
      // Store detailed log data on Irys.xyz if provided
      let irysTransactionId: string | undefined;
      if (eventData.metadata) {
        irysTransactionId = await this.irys.storeLog({
          type: 'event_log',
          agentId: eventData.agentId,
          eventType: eventData.eventType,
          timestamp: new Date().toISOString(),
          data: eventData.metadata
        });
      }

      // Create event in Supabase
      const event = await this.supabase.createEvent({
        agentId: eventData.agentId,
        eventType: eventData.eventType,
        logMessage: eventData.logMessage,
        metadata: eventData.metadata || {},
        irysTransactionId
      });

      // Log event with Z Framework
      try {
        await this.zFramework.logEvent({
          agentId: event.agentId,
          eventType: event.eventType,
          logMessage: event.logMessage,
          metadata: event.metadata
        });
      } catch (error) {
        console.error('Failed to log event with Z Framework:', error);
        // Continue with local logging even if Z Framework logging fails
      }

      // Update agent status based on event type
      if (eventData.eventType === 'START' || eventData.eventType === 'RUNNING') {
        await this.supabase.updateAgent(eventData.agentId, { status: 'active' });
      } else if (eventData.eventType === 'COMPLETE' || eventData.eventType === 'FAIL') {
        await this.supabase.updateAgent(eventData.agentId, { status: 'inactive' });
      }

      return event;
    } catch (error) {
      console.error('Error logging event:', error);
      throw error;
    }
  }

  // Get all agents
  async getAgents(): Promise<Agent[]> {
    try {
      // Try to get agents from Z Framework first
      try {
        const zAgents = await this.zFramework.getAgents();
        return zAgents;
      } catch (error) {
        console.error('Failed to get agents from Z Framework:', error);
        // Fall back to Supabase if Z Framework fails
        return await this.supabase.getAgents();
      }
    } catch (error) {
      console.error('Error getting agents:', error);
      throw error;
    }
  }

  // Get all events
  async getEvents(): Promise<Event[]> {
    try {
      // Try to get events from Z Framework first
      try {
        const zEvents = await this.zFramework.getEvents();
        return zEvents;
      } catch (error) {
        console.error('Failed to get events from Z Framework:', error);
        // Fall back to Supabase if Z Framework fails
        return await this.supabase.getEvents();
      }
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

  // Get events for a specific agent
  async getAgentEvents(agentId: string): Promise<Event[]> {
    try {
      // Try to get agent events from Z Framework first
      try {
        const zEvents = await this.zFramework.getAgentEvents(agentId);
        return zEvents;
      } catch (error) {
        console.error('Failed to get agent events from Z Framework:', error);
        // Fall back to Supabase if Z Framework fails
        return await this.supabase.getAgentEvents(agentId);
      }
    } catch (error) {
      console.error('Error getting agent events:', error);
      throw error;
    }
  }

  // Get a specific agent
  async getAgent(agentId: string): Promise<Agent | null> {
    try {
      return await this.supabase.getAgent(agentId);
    } catch (error) {
      console.error('Error getting agent:', error);
      throw error;
    }
  }
}

