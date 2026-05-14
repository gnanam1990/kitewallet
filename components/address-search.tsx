"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

function isValidAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

interface AddressSearchProps {
  className?: string;
  size?: "default" | "lg";
  initialError?: string | null;
}

export function AddressSearch({
  className,
  size = "default",
  initialError,
}: AddressSearchProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(initialError ?? null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter an address");
      return;
    }

    if (!isValidAddress(trimmed)) {
      setError("Invalid Ethereum address format");
      return;
    }

    router.push(`/${trimmed.toLowerCase()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Paste a Kite address: 0x..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={
            size === "lg" ? "text-lg h-14 px-6" : undefined
          }
        />
        <Button type="submit" size={size === "lg" ? "lg" : "default"}>
          Look up
        </Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
