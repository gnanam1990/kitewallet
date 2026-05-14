import { formatUnits, type Address } from "viem";
import { gqlQuery } from "./kiteindex";
import { publicClient, USDC_E_ADDRESS, ERC20_ABI } from "./kite-chain";

// --- RPC queries ---

export async function getNativeBalance(address: Address) {
  const balance = await publicClient.getBalance({ address });
  return {
    balance,
    formatted: formatUnits(balance, 18),
  };
}

export async function getUSDCEBalance(address: Address) {
  try {
    const balance = await publicClient.readContract({
      address: USDC_E_ADDRESS,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address],
    });
    return {
      balance,
      formatted: formatUnits(balance, 6),
      error: false,
    };
  } catch {
    return {
      balance: BigInt(0),
      formatted: "0",
      error: true,
    };
  }
}

// --- GraphQL queries ---

interface TransferEvent {
  from: string;
  to: string;
  value: string;
  blockNumber: string;
  transactionHash: string;
  timestamp: string;
}

interface GetTransfersResponse {
  transferEvents: {
    items: TransferEvent[];
  };
}

export async function getRecentTransfers(address: string) {
  const addr = address.toLowerCase();
  const data = await gqlQuery<GetTransfersResponse>(
    `query GetTransfers($addr: String!) {
      transferEvents(
        where: { OR: [{ from: $addr }, { to: $addr }] }
        orderBy: "blockNumber"
        orderDirection: "desc"
        limit: 20
      ) {
        items {
          from
          to
          value
          blockNumber
          transactionHash
          timestamp
        }
      }
    }`,
    { addr }
  );

  const unique = new Map<string, TransferEvent>();
  for (const t of data.transferEvents.items) {
    unique.set(`${t.transactionHash}-${t.from}-${t.to}-${t.value}`, t);
  }
  return Array.from(unique.values())
    .sort((a, b) => Number(BigInt(b.blockNumber) - BigInt(a.blockNumber)))
    .slice(0, 20);
}

interface BridgeTransfer {
  transferId: string;
  direction: string;
  sender: string;
  recipient: string;
  amount: string;
  status: string;
  blockNumber: string;
}

interface GetBridgeResponse {
  bridgeTransfers: {
    items: BridgeTransfer[];
  };
}

export async function getBridgeHistory(address: string) {
  const addr = address.toLowerCase();

  const data = await gqlQuery<GetBridgeResponse>(
    `query GetBridges($addr: String!) {
      bridgeTransfers(
        where: { OR: [{ sender: $addr }, { recipient: $addr }] }
        orderBy: "blockNumber"
        orderDirection: "desc"
        limit: 20
      ) {
        items {
          transferId
          direction
          sender
          recipient
          amount
          status
          blockNumber
        }
      }
    }`,
    { addr }
  );

  const unique = new Map<string, BridgeTransfer>();
  for (const b of data.bridgeTransfers.items) {
    unique.set(b.transferId, b);
  }
  return Array.from(unique.values()).sort(
    (a, b) => Number(BigInt(b.blockNumber) - BigInt(a.blockNumber))
  );
}

interface ValidatorRegistration {
  validatorId: string;
  owner: string;
  stake: string;
  delegationFeeBips: string;
  minStakeDuration: string;
  blockNumber: string;
}

interface DelegatorRegistration {
  validatorId: string;
  delegatorAddress: string;
  stake: string;
  blockNumber: string;
}

interface GetStakingResponse {
  validatorRegistrations: {
    items: ValidatorRegistration[];
  };
  delegatorRegistrations: {
    items: DelegatorRegistration[];
  };
}

export async function getStakingPositions(address: string) {
  const addr = address.toLowerCase();

  const data = await gqlQuery<GetStakingResponse>(
    `query GetStaking($addr: String!) {
      validatorRegistrations(where: { owner: $addr }, limit: 1) {
        items {
          validatorId
          owner
          stake
          delegationFeeBips
          minStakeDuration
          blockNumber
        }
      }
      delegatorRegistrations(
        where: { delegatorAddress: $addr }
        limit: 50
      ) {
        items {
          validatorId
          delegatorAddress
          stake
          blockNumber
        }
      }
    }`,
    { addr }
  );

  return {
    asValidator: data.validatorRegistrations.items[0] ?? null,
    asDelegator: data.delegatorRegistrations.items,
  };
}
