"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { AgentCard } from "./components/AgentCard";
import { RegisterAgentButton } from "./components/RegisterAgentButton";

interface Agent {
  agentId: string;
  agentName: string;
  ownerAddress: string;
  status: 'active' | 'inactive' | 'completed' | 'failed';
  createdAt: string;
  lastEvent?: {
    eventType: string;
    timestamp: string;
    logMessage?: string;
  };
}

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    // Mock data for demonstration
    const mockAgents: Agent[] = [
      {
        agentId: "agent_001",
        agentName: "Data Processor Alpha",
        ownerAddress: "0x1234...5678",
        status: "active",
        createdAt: "2024-01-15T10:30:00Z",
        lastEvent: {
          eventType: "RUNNING",
          timestamp: "2024-01-15T14:22:00Z",
          logMessage: "Processing batch 47/100"
        }
      },
      {
        agentId: "agent_002",
        agentName: "ML Model Trainer",
        ownerAddress: "0x9876...4321",
        status: "completed",
        createdAt: "2024-01-14T08:15:00Z",
        lastEvent: {
          eventType: "COMPLETE",
          timestamp: "2024-01-15T12:45:00Z",
          logMessage: "Training completed with 94.2% accuracy"
        }
      },
      {
        agentId: "agent_003",
        agentName: "API Monitor Bot",
        ownerAddress: "0x5555...7777",
        status: "failed",
        createdAt: "2024-01-15T06:00:00Z",
        lastEvent: {
          eventType: "FAIL",
          timestamp: "2024-01-15T13:30:00Z",
          logMessage: "Connection timeout after 3 retries"
        }
      }
    ];

    setTimeout(() => {
      setAgents(mockAgents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAgentRegistered = (newAgent: Agent) => {
    setAgents(prev => [newAgent, ...prev]);
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-lg">
        <div className="text-center space-y-md">
          <h2 className="display text-primary">AI Agents Registry</h2>
          <p className="body text-text-secondary max-w-2xl mx-auto">
            Monitor and track your AI agents' lifecycle events in real-time. 
            Register new agents and view their activity logs publicly.
          </p>
        </div>

        <div className="flex justify-center">
          <RegisterAgentButton onAgentRegistered={handleAgentRegistered} />
        </div>

        <div className="space-y-md">
          <h3 className="heading">Active Agents ({agents.length})</h3>
          
          {agents.length === 0 ? (
            <div className="text-center py-xl">
              <p className="body text-text-secondary">No agents registered yet.</p>
              <p className="caption text-text-secondary mt-sm">
                Register your first agent to start monitoring its activity.
              </p>
            </div>
          ) : (
            <div className="grid gap-md">
              {agents.map((agent) => (
                <AgentCard key={agent.agentId} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
