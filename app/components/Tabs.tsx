
"use client";

import { type ReactNode } from "react";

interface TabsProps {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

export function Tabs({ children, value, onValueChange }: TabsProps) {
  return (
    <div data-value={value} data-onchange={onValueChange}>
      {children}
    </div>
  );
}

interface TabsListProps {
  children: ReactNode;
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex bg-surface border border-border rounded-lg p-1 mb-6">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
}

export function TabsTrigger({ children, value }: TabsTriggerProps) {
  const tabs = document.querySelector('[data-value]');
  const currentValue = tabs?.getAttribute('data-value');
  const isActive = currentValue === value;
  
  const handleClick = () => {
    const onValueChange = (tabs as any)?.__onValueChange;
    if (onValueChange) onValueChange(value);
    tabs?.setAttribute('data-value', value);
    // Trigger a re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('tabchange'));
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-white'
          : 'text-text-secondary hover:text-text-primary hover:bg-bg'
      }`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
}

export function TabsContent({ children, value }: TabsContentProps) {
  const tabs = document.querySelector('[data-value]');
  const currentValue = tabs?.getAttribute('data-value');
  const isActive = currentValue === value;

  if (!isActive) return null;
  
  return <div>{children}</div>;
}
