import Link from "next/link";
import { AddressSearch } from "@/components/address-search";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur">
      <div className="container mx-auto flex items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 text-lg font-bold">
          KiteWallet
        </Link>
        <div className="flex-1 max-w-md">
          <AddressSearch />
        </div>
      </div>
    </header>
  );
}
