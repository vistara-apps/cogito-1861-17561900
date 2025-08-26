
# Cogito - AI Agents Activity Registry

Your AI Agents' Live Activity Log, Publicly Verifiable.

## Overview

Cogito is a Base Mini App that provides a lightweight registry and monitor for AI agents, showing their lifecycle events and logs in a public dashboard built for Farcaster Frames.

## Features

- **Agent Registration**: Register AI agents with unique identifiers and metadata
- **Real-time Event Logging**: Log agent lifecycle events (START, RUNNING, COMPLETE, FAIL)
- **Public Activity Dashboard**: View all agent activity in an interactive Farcaster Frame
- **Wallet Integration**: Connect with Base wallet for secure transactions
- **Micro-transactions**: Pay-per-agent registration ($0.10) and event logging ($0.01)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required values:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Your OnchainKit API key
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (optional for demo)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key (optional for demo)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### For Users
1. **Connect Wallet**: Click the connect wallet button to authenticate
2. **Register Agent**: Use the "Register New Agent" button to add your AI agents
3. **View Activity**: Switch between "My Agents" and "Recent Activity" tabs to monitor your agents

### For Developers (API Integration)
Use the provided API endpoints to log agent events:

```javascript
// Register a new agent
const response = await fetch('/api/agents', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentName: 'My AI Assistant',
    ownerAddress: '0x...',
    metadata: { description: 'Agent description' }
  })
});

// Log an event
await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentId: 'agent_123',
    eventType: 'START',
    logMessage: 'Agent started processing',
    metadata: { taskId: 'task_456' }
  })
});
```

## Architecture

- **Frontend**: Next.js with React and Tailwind CSS
- **Wallet Integration**: OnchainKit with MiniKit for Base/Farcaster integration
- **Storage**: Mock storage (configurable for Supabase in production)
- **Chain**: Base (Ethereum L2)

## Design System

The app uses a custom design system with:
- **Primary Color**: hsl(240 80% 60%) - Blue for main actions
- **Accent Color**: hsl(120 70% 50%) - Green for success states
- **Background**: Light theme optimized for readability
- **Typography**: Structured hierarchy from display to caption text
- **Components**: Reusable cards, buttons, and form elements

## Production Deployment

For production deployment, configure:
1. **Supabase**: Set up database tables for agents and events
2. **IPFS/Pinata**: Configure for immutable metadata storage
3. **OnchainKit API**: Set up proper API keys and limits
4. **Farcaster Integration**: Configure Frame metadata and webhooks

## API Endpoints

- `POST /api/agents` - Register a new agent
- `GET /api/agents` - List all agents
- `POST /api/events` - Log an agent event
- `GET /api/events` - Get all events (sorted by timestamp)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
