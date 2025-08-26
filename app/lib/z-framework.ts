"use server";

import { Agent, Event } from './supabase';

// Z Framework API client
// This is a placeholder implementation that will be updated once we have access to the API documentation
export class ZFrameworkClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.Z_FRAMEWORK_API_URL || 'https://agents.vistara.dev';
    this.apiKey = process.env.Z_FRAMEWORK_API_KEY || '';
  }

  // Register an agent with the Z Framework
  async registerAgent(agent: Omit<Agent, 'agentId' | 'createdAt'>): Promise<Agent> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(agent)
      });

      if (!response.ok) {
        throw new Error(`Failed to register agent: ${response.statusText}`);
      }

      const data = await response.json();
      return data.agent;
    } catch (error) {
      console.error('Error registering agent:', error);
      throw error;
    }
  }

  // Log an event with the Z Framework
  async logEvent(event: Omit<Event, 'eventId' | 'timestamp'>): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error(`Failed to log event: ${response.statusText}`);
      }

      const data = await response.json();
      return data.event;
    } catch (error) {
      console.error('Error logging event:', error);
      throw error;
    }
  }

  // Get all agents
  async getAgents(): Promise<Agent[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get agents: ${response.statusText}`);
      }

      const data = await response.json();
      return data.agents;
    } catch (error) {
      console.error('Error getting agents:', error);
      throw error;
    }
  }

  // Get all events
  async getEvents(): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get events: ${response.statusText}`);
      }

      const data = await response.json();
      return data.events;
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

  // Get events for a specific agent
  async getAgentEvents(agentId: string): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/${agentId}/events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get agent events: ${response.statusText}`);
      }

      const data = await response.json();
      return data.events;
    } catch (error) {
      console.error('Error getting agent events:', error);
      throw error;
    }
  }
}

