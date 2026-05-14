import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BalanceCardsProps {
  nativeBalance: { formatted: string } | null;
  usdceBalance: { formatted: string; error?: boolean } | null;
}

export function BalanceCards({ nativeBalance, usdceBalance }: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Native KITE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {nativeBalance
              ? `${Number(nativeBalance.formatted).toFixed(4)} KITE`
              : "—"}
          </div>
          {!nativeBalance && (
            <p className="text-xs text-muted-foreground mt-1">
              Balance unavailable
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Bridged USDC.e
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {usdceBalance
              ? usdceBalance.error
                ? "—"
                : `${Number(usdceBalance.formatted).toFixed(2)} USDC.e`
              : "—"}
          </div>
          {usdceBalance?.error && (
            <p className="text-xs text-muted-foreground mt-1">
              Balance unavailable
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function BalanceCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[0, 1].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
