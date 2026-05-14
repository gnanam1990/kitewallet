import { createPublicClient, http, type Address } from "viem";

export const kiteChain = {
  id: 2366,
  name: "Kite",
  nativeCurrency: {
    name: "KITE",
    symbol: "KITE",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc-virginia.gokite.ai"] },
  },
} as const;

export const publicClient = createPublicClient({
  chain: kiteChain,
  transport: http("https://rpc-virginia.gokite.ai"),
});

export const USDC_E_ADDRESS: Address =
  "0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e";

export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
