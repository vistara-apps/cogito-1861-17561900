"use client";

import { useMiniKit, useAddFrame, useOpenUrl } from "@coinbase/onchainkit/minikit";
import { type ReactNode } from "react";
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Identity, Avatar, Name, Address, EthBalance } from "@coinbase/onchainkit/identity";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { context } = useMiniKit();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  const handleAddFrame = async () => {
    await addFrame();
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <div className="container">
        <header className="flex justify-between items-center py-lg border-b border-border">
          <div className="flex items-center space-x-md">
            <h1 className="heading text-primary">Cogito</h1>
            <span className="caption text-text-secondary">AI Agents Registry</span>
          </div>
          
          <div className="flex items-center space-x-sm">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="px-md py-sm bg-accent text-white rounded-md hover:bg-accent/90 transition-colors duration-base"
              >
                Add Frame
              </button>
            )}
            
            <Wallet>
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-lg pt-md pb-sm" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </header>

        <main className="py-lg">
          {children}
        </main>

        <footer className="py-lg border-t border-border text-center">
          <button
            onClick={() => openUrl("https://base.org/builders/minikit")}
            className="caption text-text-secondary hover:text-text-primary transition-colors duration-base"
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
