"use client";

import { useState } from 'react';
import { storage } from '../lib/storage';

interface CrewAIIntegrationProps {
  agentId: string;
}

export function CrewAIIntegration({ agentId }: CrewAIIntegrationProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAgent = async () => {
    setIsRunning(true);
    setStatus('Starting agent...');
    setError(null);

    try {
      // Log START event
      await storage.createEvent({
        agentId,
        eventType: 'START',
        logMessage: 'Agent execution started',
        metadata: {
          timestamp: new Date().toISOString(),
          initiatedBy: 'user'
        }
      });

      setStatus('Agent running...');

      // Simulate agent execution (this would be replaced with actual CrewAI integration)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Log RUNNING event
      await storage.createEvent({
        agentId,
        eventType: 'RUNNING',
        logMessage: 'Agent is processing data',
        metadata: {
          progress: '50%',
          timestamp: new Date().toISOString()
        }
      });

      setStatus('Agent completing task...');

      // Simulate task completion (this would be replaced with actual CrewAI integration)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Log COMPLETE event
      await storage.createEvent({
        agentId,
        eventType: 'COMPLETE',
        logMessage: 'Agent execution completed successfully',
        metadata: {
          result: 'Task completed successfully',
          timestamp: new Date().toISOString()
        }
      });

      setStatus('Agent execution completed');
    } catch (err) {
      console.error('Error running agent:', err);
      setError('Failed to run agent');

      // Log FAIL event
      try {
        await storage.createEvent({
          agentId,
          eventType: 'FAIL',
          logMessage: `Agent execution failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
          metadata: {
            error: err instanceof Error ? err.message : 'Unknown error',
            timestamp: new Date().toISOString()
          }
        });
      } catch (logError) {
        console.error('Failed to log error event:', logError);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h3 className="heading mb-2">CrewAI Integration</h3>
      <p className="body text-text-secondary mb-4">
        Run this agent using the Z Framework API (CrewAI based)
      </p>

      <button
        onClick={runAgent}
        disabled={isRunning}
        className={`btn ${isRunning ? 'btn-disabled' : 'btn-primary'}`}
      >
        {isRunning ? 'Running...' : 'Run Agent'}
      </button>

      {status && (
        <div className="mt-4 p-2 bg-surface rounded-md">
          <p className="body">{status}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
          <p className="body">{error}</p>
        </div>
      )}
    </div>
  );
}

