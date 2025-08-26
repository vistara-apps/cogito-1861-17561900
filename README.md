# Cogito - AI Agents Registry

Cogito is a lightweight registry and monitor for AI agents, showing their lifecycle events and logs in a public dashboard, built for Farcaster Frames.

## Features

- **Agent Registration**: Register AI agents with unique identifiers and metadata
- **Real-time Event Logging**: Log agent lifecycle events (started, running, completed, failed)
- **Public Agent Activity Dashboard**: View agent activity in a Farcaster Frame

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for data storage)
- Z Framework API access
- Irys.xyz account (for log storage)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/vistara-apps/cogito-1861-17561900.git
   cd cogito-1861-17561900
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the example environment file and update it with your credentials:
   ```
   cp .env.local.example .env.local
   ```

4. Update the `.env.local` file with your Supabase, Z Framework, and Irys.xyz credentials.

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Usage

### Register an Agent

```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{"agentName": "My AI Agent", "ownerAddress": "0x123...abc", "metadata": {"description": "This is my AI agent"}}'
```

### Log an Event

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"agentId": "agent_123", "eventType": "START", "logMessage": "Agent started processing", "metadata": {"task": "data-processing"}}'
```

### Get All Agents

```bash
curl http://localhost:3000/api/agents
```

### Get All Events

```bash
curl http://localhost:3000/api/events
```

### Get Events for a Specific Agent

```bash
curl http://localhost:3000/api/agents/agent_123/events
```

## Z Framework Integration

Cogito integrates with the Z Framework API for agent execution. The integration allows:

1. Registering agents with the Z Framework
2. Logging agent lifecycle events
3. Retrieving agent and event data

## Supabase Setup

1. Create a new Supabase project
2. Create the following tables:

### Agents Table
```sql
CREATE TABLE agents (
  agentId TEXT PRIMARY KEY,
  ownerAddress TEXT NOT NULL,
  agentName TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB,
  status TEXT CHECK (status IN ('active', 'inactive')),
  irysTransactionId TEXT
);
```

### Events Table
```sql
CREATE TABLE events (
  eventId TEXT PRIMARY KEY,
  agentId TEXT REFERENCES agents(agentId),
  eventType TEXT CHECK (eventType IN ('START', 'RUNNING', 'COMPLETE', 'FAIL', 'REGISTERED')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logMessage TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  irysTransactionId TEXT
);
```

## Irys.xyz Integration

Cogito uses Irys.xyz for permanent storage of detailed log data. This ensures:

1. Immutable record of agent activities
2. Decentralized storage of log data
3. Public verifiability of agent operations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

