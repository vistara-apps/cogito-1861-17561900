"use client";

import { AgentService } from './agent-service';
import { Agent, Event } from './supabase';

// Client-side wrapper for the AgentService
export class Storage {
  private agentService: AgentService;

  constructor() {
    this.agentService = new AgentService();
  }

  async getAgents(): Promise<Agent[]> {
    return this.agentService.getAgents();
  }

  async getAgent(agentId: string): Promise<Agent | null> {
    return this.agentService.getAgent(agentId);
  }

  async createAgent(agent: {
    agentName: string;
    ownerAddress: string;
    metadata?: any;
  }): Promise<Agent> {
    return this.agentService.registerAgent(agent);
  }

  async getEvents(): Promise<Event[]> {
    return this.agentService.getEvents();
  }

  async getAgentEvents(agentId: string): Promise<Event[]> {
    return this.agentService.getAgentEvents(agentId);
  }

  async createEvent(event: {
    agentId: string;
    eventType: Event['eventType'];
    logMessage?: string;
    metadata?: any;
  }): Promise<Event> {
    return this.agentService.logEvent(event);
  }
}

// Export a singleton instance
export const storage = new Storage();

