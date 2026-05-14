import { getNativeBalance, getUSDCEBalance, getRecentTransfers, getBridgeHistory, getStakingPositions } from "../lib/queries";
import type { Address } from "viem";

const address = process.argv[2] as Address;

if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
  console.error("Usage: npx tsx scripts/test-data.ts <0xAddress>");
  process.exit(1);
}

async function main() {
  console.log(`Testing queries for: ${address}\n`);

  console.log("1. Native KITE balance:");
  const native = await getNativeBalance(address);
  console.log(`   Balance: ${native.formatted} KITE\n`);

  console.log("2. USDC.e balance:");
  const usdce = await getUSDCEBalance(address);
  console.log(`   Balance: ${usdce.formatted} USDC.e${usdce.error ? " (error fetching)" : ""}\n`);

  console.log("3. Recent transfers:");
  const transfers = await getRecentTransfers(address);
  console.log(`   Found ${transfers.length} transfers`);
  if (transfers.length > 0) {
    console.log(`   Latest: from ${transfers[0].from} to ${transfers[0].to} value ${transfers[0].value}`);
  }
  console.log();

  console.log("4. Bridge history:");
  const bridges = await getBridgeHistory(address);
  console.log(`   Found ${bridges.length} bridge transfers`);
  if (bridges.length > 0) {
    console.log(`   Latest: id=${bridges[0].transferId} status=${bridges[0].status} amount=${bridges[0].amount}`);
  }
  console.log();

  console.log("5. Staking positions:");
  const staking = await getStakingPositions(address);
  console.log(`   Validator: ${staking.asValidator ? `ID ${staking.asValidator.validatorId}` : "none"}`);
  console.log(`   Delegations: ${staking.asDelegator.length}`);
  console.log();
}

main().catch(console.error);
