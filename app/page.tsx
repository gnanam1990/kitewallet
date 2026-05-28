import { AddressSearch } from "@/components/address-search";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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
    <div className="kite-gradient flex flex-1 flex-col items-center justify-center px-4">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 py-16">
        <div className="space-y-3 text-center">
          <Image
            src="/kite-logo-mark-black.png"
            alt="Kite"
            width={52}
            height={52}
            priority
            className="mx-auto h-13 w-13 object-contain"
          />
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Kite Mainnet wallet viewer
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">KiteWallet</h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Open-source wallet viewer for Kite Mainnet
          </p>
        </div>

        <div className="w-full max-w-xl rounded-lg border border-border bg-card/80 p-3 shadow-sm backdrop-blur">
          <AddressSearch size="lg" initialError={error} />
        </div>

        <div className="w-full max-w-xl space-y-3">
          <p className="text-center text-sm text-muted-foreground">
            Try a suggested address:
          </p>
          <div className="grid gap-2">
            {SUGGESTED_ADDRESSES.map((s) => (
              <Link key={s.address} href={`/${s.address.toLowerCase()}`}>
                <Card className="cursor-pointer border-border/80 bg-card/85 shadow-sm transition-colors hover:bg-accent">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center justify-between gap-4 text-left">
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

        <footer className="pt-8 text-center text-xs text-muted-foreground">
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
