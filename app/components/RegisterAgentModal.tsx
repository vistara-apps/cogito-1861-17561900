
"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../lib/storage";

interface RegisterAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentRegistered: () => void;
}

export function RegisterAgentModal({ isOpen, onClose, onAgentRegistered }: RegisterAgentModalProps) {
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName.trim()) return;

    setIsLoading(true);
    
    try {
      const agent = {
        agentId: `agent_${uuidv4()}`,
        ownerAddress: "0x1234...5678", // Mock address - would come from wallet
        agentName: agentName.trim(),
        createdAt: new Date().toISOString(),
        metadata: { description: description.trim() },
        status: 'active' as const,
      };

      await storage.createAgent(agent);
      
      // Reset form
      setAgentName("");
      setDescription("");
      
      onAgentRegistered();
    } catch (error) {
      console.error('Failed to register agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg border border-border max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="heading">Register New Agent</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-bg rounded transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="body font-medium block mb-2">
              Agent Name *
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="My AI Assistant"
              className="input-field w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="body font-medium block mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this agent does..."
              className="input-field w-full h-20 resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="caption text-text-secondary">
              Registration fee: $0.10
            </p>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded-md hover:bg-bg transition-colors duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
                disabled={!agentName.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Register Agent</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
