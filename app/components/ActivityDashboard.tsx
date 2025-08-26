
"use client";

import { useState, useEffect } from "react";
import { AgentCard } from "./AgentCard";
import { EventLogItem } from "./EventLogItem";
import { RegisterAgentButton } from "./RegisterAgentButton";
import { storage } from "../lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

export function ActivityDashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("agents");

  const loadData = async () => {
    try {
      const [agentsData, eventsData] = await Promise.all([
        storage.getAgents(),
        storage.getAllEvents()
      ]);
      
      setAgents(agentsData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.agentId === agentId);
    return agent?.agentName || 'Unknown Agent';
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="card">
        <h2 className="heading mb-4">Quick Actions</h2>
        <RegisterAgentButton onAgentRegistered={loadData} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="agents">
            My Agents ({agents.length})
          </TabsTrigger>
          <TabsTrigger value="activity">
            Recent Activity ({events.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="space-y-4">
            {agents.length === 0 ? (
              <div className="card text-center py-8">
                <h3 className="heading mb-2">No Agents Registered</h3>
                <p className="body text-text-secondary mb-4">
                  Register your first AI agent to start tracking its activity.
                </p>
              </div>
            ) : (
              agents.map((agent) => (
                <AgentCard 
                  key={agent.agentId} 
                  agent={agent}
                  variant={agent.status === 'active' ? 'active' : 'completed'}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="card text-center py-8">
                <h3 className="heading mb-2">No Activity Yet</h3>
                <p className="body text-text-secondary">
                  Agent events will appear here as they occur.
                </p>
              </div>
            ) : (
              events.slice(0, 20).map((event) => (
                <EventLogItem
                  key={event.eventId}
                  event={event}
                  agentName={getAgentName(event.agentId)}
                  variant={event.eventType === 'FAIL' ? 'error' : 'info'}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
