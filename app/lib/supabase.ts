
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Agent = {
  agentId: string;
  ownerAddress: string;
  agentName: string;
  createdAt: string;
  metadata: any;
  status: 'active' | 'inactive';
};

export type Event = {
  eventId: string;
  agentId: string;
  eventType: 'START' | 'RUNNING' | 'COMPLETE' | 'FAIL' | 'REGISTERED';
  timestamp: string;
  logMessage?: string;
  metadata?: any;
};
