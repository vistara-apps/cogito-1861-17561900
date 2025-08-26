
"use client";

import { formatDistanceToNow } from "date-fns";
import { Activity, AlertCircle, CheckCircle, Play, Square } from "lucide-react";

interface EventLogItemProps {
  event: {
    eventId: string;
    eventType: 'START' | 'RUNNING' | 'COMPLETE' | 'FAIL' | 'REGISTERED';
    timestamp: string;
    logMessage?: string;
    agentId: string;
  };
  agentName?: string;
  variant?: 'info' | 'warning' | 'error';
}

export function EventLogItem({ event, agentName, variant = 'info' }: EventLogItemProps) {
  const getEventIcon = () => {
    switch (event.eventType) {
      case 'START':
        return <Play className="w-4 h-4 text-accent" />;
      case 'RUNNING':
        return <Activity className="w-4 h-4 text-primary" />;
      case 'COMPLETE':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'FAIL':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'REGISTERED':
        return <Square className="w-4 h-4 text-text-secondary" />;
      default:
        return <Activity className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getEventColor = () => {
    switch (variant) {
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      default:
        return 'border-l-primary';
    }
  };

  return (
    <div className={`card border-l-4 ${getEventColor()} animate-slide-up`}>
      <div className="flex items-start space-x-3">
        {getEventIcon()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="body font-medium">{event.eventType}</span>
            <span className="caption">
              {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
            </span>
          </div>
          
          {agentName && (
            <p className="caption text-text-secondary mb-1">
              Agent: {agentName}
            </p>
          )}
          
          {event.logMessage && (
            <p className="body text-text-secondary">{event.logMessage}</p>
          )}
          
          <code className="caption bg-bg px-2 py-1 rounded text-xs block mt-2">
            {event.eventId}
          </code>
        </div>
      </div>
    </div>
  );
}
