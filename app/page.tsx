import { AddressSearch } from "@/components/address-search";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const SUGGESTED_ADDRESSES = [
  {
    label: "High-volume USDC.e sender",
    address: "0xd5f52a3be6d0dc6527809ef3180dca78c6fe66b5",
  },
  {
    label: "Bridge user",
    address: "0x22a298457fCee8C2f31C0444E7cd0E707293E7F2",
  },
  {
    label: "Validator",
    address: "0x16582fdccf868C98D02744195E036104C438Af44",
  },
];

interface LandingPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = await searchParams;
  const error = params.error === "invalid_address" ? "Invalid address format" : null;

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4">
      <main className="flex flex-col items-center gap-8 max-w-2xl w-full py-16">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">KiteWallet</h1>
          <p className="text-muted-foreground text-lg">
            Open-source wallet viewer for Kite Mainnet
          </p>
        </div>

        {/* Search */}
        <div className="w-full max-w-lg">
          <AddressSearch size="lg" initialError={error} />
        </div>

        {/* Suggested addresses */}
        <div className="space-y-3 w-full max-w-lg">
          <p className="text-sm text-muted-foreground text-center">
            Try a suggested address:
          </p>
          <div className="grid gap-2">
            {SUGGESTED_ADDRESSES.map((s) => (
              <Link key={s.address} href={`/${s.address.toLowerCase()}`}>
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className="font-mono text-xs text-muted-foreground truncate">
                        {s.address.slice(0, 10)}...{s.address.slice(-8)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pt-8">
          Powered by{" "}
          <a
            href="https://github.com/gnanam1990/kiteindex"
            className="underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            KiteIndex
          </a>{" "}
          •{" "}
          <a
            href="https://github.com/gnanam1990/kitewallet"
            className="underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/gnanam1990/kitewallet
          </a>
        </footer>
      </main>
    </div>
  );
}
