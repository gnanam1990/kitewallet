import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { Address } from "viem";
import {
  getNativeBalance,
  getUSDCEBalance,
  getRecentTransfers,
  getBridgeHistory,
  getStakingPositions,
} from "@/lib/queries";
import { shorten } from "@/lib/utils";
import { CopyButton } from "@/components/address/copy-button";
import { BalanceCards, BalanceCardsSkeleton } from "@/components/address/balance-cards";
import { TransfersTable, TransfersTableSkeleton } from "@/components/address/transfers-table";
import { BridgeHistory, BridgeHistorySkeleton } from "@/components/address/bridge-history";
import { StakingPositions, StakingPositionsSkeleton } from "@/components/address/staking-positions";
import { SiteHeader } from "@/components/site-header";

interface PageProps {
  params: Promise<{ address: string }>;
}

function isValidAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

async function BalanceSection({ address }: { address: Address }) {
  const [native, usdce] = await Promise.allSettled([
    getNativeBalance(address),
    getUSDCEBalance(address),
  ]);

  return (
    <BalanceCards
      nativeBalance={
        native.status === "fulfilled" ? native.value : null
      }
      usdceBalance={
        usdce.status === "fulfilled" ? usdce.value : null
      }
    />
  );
}

async function TransfersSection({ address }: { address: string }) {
  let transfers: Awaited<ReturnType<typeof getRecentTransfers>> = [];
  try {
    transfers = await getRecentTransfers(address);
  } catch {
    // GraphQL may be unavailable
  }
  return (
    <TransfersTable transfers={transfers} currentAddress={address} />
  );
}

async function BridgeSection({ address }: { address: string }) {
  let bridges: Awaited<ReturnType<typeof getBridgeHistory>> = [];
  try {
    bridges = await getBridgeHistory(address);
  } catch {
    // GraphQL may be unavailable
  }
  return <BridgeHistory bridges={bridges} />;
}

async function StakingSection({ address }: { address: string }) {
  let staking: Awaited<ReturnType<typeof getStakingPositions>> | null = null;
  try {
    staking = await getStakingPositions(address);
  } catch {
    // GraphQL may be unavailable
  }
  return (
    <StakingPositions
      asValidator={staking?.asValidator ?? null}
      asDelegator={staking?.asDelegator ?? []}
    />
  );
}

export default async function AddressPage({ params }: PageProps) {
  const { address } = await params;

  if (!isValidAddress(address)) {
    redirect("/?error=invalid_address");
  }

  const normalizedAddress = address.toLowerCase();

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto py-8 px-4 space-y-6">
        {/* Address Header */}
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-2xl font-bold font-mono break-all">
            {shorten(normalizedAddress, 8)}
          </h1>
          <CopyButton text={normalizedAddress} />
        </div>

      {/* Balances */}
      <Suspense fallback={<BalanceCardsSkeleton />}>
        <BalanceSection address={normalizedAddress as Address} />
      </Suspense>

      {/* Transfers */}
      <Suspense fallback={<TransfersTableSkeleton />}>
        <TransfersSection address={normalizedAddress} />
      </Suspense>

      {/* Bridges */}
      <Suspense fallback={<BridgeHistorySkeleton />}>
        <BridgeSection address={normalizedAddress} />
      </Suspense>

      {/* Staking */}
      <Suspense fallback={<StakingPositionsSkeleton />}>
        <StakingSection address={normalizedAddress} />
      </Suspense>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { address } = await params;
  const short = isValidAddress(address) ? shorten(address.toLowerCase(), 6) : "Invalid";
  return {
    title: `${short} — KiteWallet`,
    description: `Wallet details for ${short} on Kite Mainnet`,
  };
}
