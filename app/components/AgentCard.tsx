
"use client";

import { formatDistanceToNow } from "date-fns";
import { Copy, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";

interface AgentCardProps {
  agent: {
    agentId: string;
    agentName: string;
    status: 'active' | 'inactive';
    createdAt: string;
    ownerAddress: string;
  };
  variant?: 'active' | 'completed' | 'failed';
}

export function AgentCard({ agent, variant = 'active' }: AgentCardProps) {
  const [copied, setCopied] = useState(false);

  const getStatusIcon = () => {
    switch (agent.status) {
      case 'active':
        return <Clock className="w-4 h-4 text-accent" />;
      default:
        return <CheckCircle className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getStatusColor = () => {
    switch (variant) {
      case 'active':
        return 'border-l-accent';
      case 'failed':
        return 'border-l-red-500';
      default:
        return 'border-l-text-secondary';
    }
  };

  const copyAgentId = async () => {
    try {
      await navigator.clipboard.writeText(agent.agentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy agent ID:', err);
    }
  };

  return (
    <div className={`card border-l-4 ${getStatusColor()} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getStatusIcon()}
            <h3 className="heading">{agent.agentName}</h3>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <code className="caption bg-bg px-2 py-1 rounded text-xs">
              {agent.agentId.slice(0, 8)}...{agent.agentId.slice(-6)}
            </code>
            <button
              onClick={copyAgentId}
              className="p-1 hover:bg-bg rounded transition-colors duration-200"
              title="Copy Agent ID"
            >
              {copied ? (
                <CheckCircle className="w-3 h-3 text-accent" />
              ) : (
                <Copy className="w-3 h-3 text-text-secondary" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className={`caption px-2 py-1 rounded-sm ${
              agent.status === 'active' 
                ? 'bg-accent/10 text-accent' 
                : 'bg-text-secondary/10 text-text-secondary'
            }`}>
              {agent.status}
            </span>
            <span className="caption">
              Created {formatDistanceToNow(new Date(agent.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
