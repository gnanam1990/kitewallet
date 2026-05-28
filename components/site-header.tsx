import Link from "next/link";
import Image from "next/image";
import { AddressSearch } from "@/components/address-search";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur">
      <div className="container mx-auto flex items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold">
          <Image
            src="/kite-logo-mark-black.png"
            alt="Kite"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          KiteWallet
        </Link>
        <div className="flex-1 max-w-md">
          <AddressSearch />
        </div>
      </div>
    </header>
  );
}
