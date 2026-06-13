# KiteWallet

> A read-only wallet viewer for Kite Mainnet — paste any address to see balances, transfers, bridge history, and staking positions.

## Overview

KiteWallet is a read-only block-explorer-style viewer for the Kite Mainnet. Paste any account address and it shows the account's native KITE and bridged USDC.e balances, recent token transfers, bridge activity, and staking positions. It is purely a viewer: it never connects a wallet, signs transactions, or holds keys. It is aimed at anyone who wants a quick, focused look at on-chain activity for a Kite address.

## Features

- **Address lookup** — paste a `0x…` address (or pick a suggested one) to open a per-address view.
- **Balances** — native KITE and bridged USDC.e balances read directly from the chain over RPC.
- **Recent transfers** — the latest USDC.e transfers involving the address (sent or received), deduplicated and sorted by block.
- **Bridge history** — bridge transfers in and out, with direction, amount, and status.
- **Staking positions** — the address's validator registration (if any) and its delegations.
- **Graceful degradation** — balances are served from RPC; transfer/bridge/staking sections come from a GraphQL index and render empty if that index is unavailable.

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 and [shadcn/ui](https://ui.shadcn.com/) components (Base UI primitives, lucide-react icons)
- [viem](https://viem.sh/) for direct JSON-RPC chain reads
- A GraphQL indexer endpoint (KiteIndex, a Ponder-based index) for historical transfer/bridge/staking data

## Getting started

### Prerequisites

- Node.js 20+
- npm (a `package-lock.json` is committed)
- A reachable KiteIndex GraphQL endpoint for the transfer/bridge/staking sections. Balances work without it. The default endpoint is `http://localhost:42069/graphql/public`.

### Installation

```bash
git clone https://github.com/gnanam1990/kitewallet
cd kitewallet
npm install
```

### Configuration

The app reads a single optional environment variable:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_KITEINDEX_URL` | GraphQL endpoint for the index that serves transfers, bridge history, and staking. Defaults to `http://localhost:42069/graphql/public` when unset. |

The Kite Mainnet RPC URL and the USDC.e contract address are hardcoded in `lib/kite-chain.ts`.

### Running

```bash
npm run dev    # start the dev server at http://localhost:3000
npm run build  # production build
npm run start  # serve the production build
npm run lint   # run ESLint
```

Open http://localhost:3000 and enter an address, or use one of the suggested addresses on the landing page.

## Usage

- Landing page (`/`): an address search box and a few suggested addresses.
- Address page (`/<address>`): balances, recent transfers, bridge history, and staking for the given address. Invalid addresses (anything not matching `0x` + 40 hex chars) redirect back to the landing page with an error.

There is also a small helper script to exercise the data-fetching functions against a live endpoint from the command line:

```bash
npx tsx scripts/test-data.ts 0xYourAddress
```

## Project structure

```
app/                 # Next.js App Router pages
  page.tsx           #   landing page (address search)
  [address]/page.tsx #   per-address view
components/
  address/           # balance cards, transfers table, bridge history, staking
  ui/                # shadcn/ui primitives
lib/
  kite-chain.ts      # viem client, chain config, USDC.e address + ABI
  kiteindex.ts       # GraphQL fetch helper + endpoint resolution
  queries.ts         # RPC and GraphQL query functions
scripts/test-data.ts # CLI helper to test the query functions
```

## Status

Early stage (v0.1). The app is a functional read-only viewer. Balances are fetched live from the Kite Mainnet RPC; the transfers, bridge, and staking sections depend on a reachable KiteIndex GraphQL endpoint and render empty when it is unavailable. There are no automated tests — `scripts/test-data.ts` is a manual smoke-test helper. KiteWallet performs no signing and holds no keys.

## License

No license specified.
