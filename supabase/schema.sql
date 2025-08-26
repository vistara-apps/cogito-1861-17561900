-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  agentId TEXT PRIMARY KEY,
  ownerAddress TEXT NOT NULL,
  agentName TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB,
  status TEXT CHECK (status IN ('active', 'inactive')),
  irysTransactionId TEXT
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  eventId TEXT PRIMARY KEY,
  agentId TEXT REFERENCES agents(agentId),
  eventType TEXT CHECK (eventType IN ('START', 'RUNNING', 'COMPLETE', 'FAIL', 'REGISTERED')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logMessage TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  irysTransactionId TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_agentId ON events(agentId);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);

-- Create RLS policies for security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read agents and events
CREATE POLICY "Allow public read access to agents" ON agents
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to events" ON events
  FOR SELECT USING (true);

-- Allow authenticated users to create agents and events
CREATE POLICY "Allow authenticated users to create agents" ON agents
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to create events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update only their own agents
CREATE POLICY "Allow users to update their own agents" ON agents
  FOR UPDATE USING (auth.uid()::text = ownerAddress);

-- Allow users to create events only for their own agents
CREATE POLICY "Allow users to create events for their own agents" ON events
  FOR INSERT WITH CHECK (
    agentId IN (
      SELECT agentId FROM agents WHERE ownerAddress = auth.uid()::text
    )
  );

