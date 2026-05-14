import Link from "next/link";
import { AddressSearch } from "@/components/address-search";

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto py-3 px-4 flex items-center gap-4">
        <Link href="/" className="font-bold text-lg shrink-0">
          KiteWallet
        </Link>
        <div className="flex-1 max-w-md">
          <AddressSearch />
        </div>
      </div>
    </header>
  );
}
