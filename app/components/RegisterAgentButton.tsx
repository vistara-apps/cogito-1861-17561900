
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { RegisterAgentModal } from "./RegisterAgentModal";

interface RegisterAgentButtonProps {
  onAgentRegistered?: () => void;
}

export function RegisterAgentButton({ onAgentRegistered }: RegisterAgentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center space-x-2 w-full"
      >
        <Plus className="w-4 h-4" />
        <span>Register New Agent</span>
      </button>

      <RegisterAgentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAgentRegistered={() => {
          setIsOpen(false);
          onAgentRegistered?.();
        }}
      />
    </>
  );
}
