# KiteWallet

Open-source wallet viewer for Kite Mainnet. Paste any address, see balances, transfers, bridge history, and staking positions.

Powered by [KiteIndex](https://github.com/gnanam1990/kiteindex) — same author, same week.

## Try it locally

Requires KiteIndex running locally at http://localhost:42069.

```
git clone https://github.com/gnanam1990/kitewallet
cd kitewallet
npm install
npm run dev
```

Open http://localhost:3000. Try one of the suggested addresses on the landing page.

## What it shows

- Native KITE + bridged USDC.e balances (via direct RPC call to Kite Mainnet)
- Last 20 USDC.e transfers involving this address
- Bridge history (Avalanche ↔ Kite via Lucid)
- Staking position (as validator and/or delegator)

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
- viem for direct chain RPC
- GraphQL queries against KiteIndex
- Zero external dependencies beyond those

## Status

v0.1. Local-only by design — deploys when there's demand.

Built with [openclaude](https://github.com/openclaude/openlawb), [@kevincodex](https://twitter.com/kevincodex), [@gitlawb](https://twitter.com/gitlawb).

MIT.
