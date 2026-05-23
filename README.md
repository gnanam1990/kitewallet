# KiteWallet

Open-source wallet viewer for Kite Mainnet. Paste any address, see balances, transfers, bridge history, and staking positions.

Powered by [KiteIndex](https://github.com/gnanam1990/kiteindex) — same author, same week.

## Deployment

- **Production:** https://kitewallet.vercel.app
- **Host:** Vercel (`kitewallet`)
- **Status:** production build verified; address balance lookup uses public RPC, transfer/bridge/staking history requires a public KiteIndex GraphQL endpoint via `NEXT_PUBLIC_KITEINDEX_URL`
- **Last verified:** 2026-05-23

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

v0.1. Public read-only deployment is live. Full transfer, bridge, and staking history depends on KiteIndex availability.

Built with [openclaude](https://github.com/openclaude/openlawb), [@kevincodex](https://twitter.com/kevincodex), [@gitlawb](https://twitter.com/gitlawb).

MIT.
