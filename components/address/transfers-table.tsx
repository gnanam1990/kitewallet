import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { shorten } from "@/lib/utils";

interface Transfer {
  from: string;
  to: string;
  value: string;
  blockNumber: string;
  transactionHash: string;
}

interface TransfersTableProps {
  transfers: Transfer[];
  currentAddress: string;
}

export function TransfersTable({ transfers, currentAddress }: TransfersTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Recent USDC.e Transfers</CardTitle>
          <Badge variant="secondary">{transfers.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {transfers.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4">
            No USDC.e activity yet
          </p>
        ) : (
          <>
            {/* Desktop table */}
            <Table className="hidden md:table">
              <TableHeader>
                <TableRow>
                  <TableHead>Direction</TableHead>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Block</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((t, i) => {
                  const isSent =
                    t.from.toLowerCase() === currentAddress.toLowerCase();
                  const counterparty = isSent ? t.to : t.from;
                  const amount = Number(t.value) / 1e6;
                  return (
                    <TableRow key={`${t.transactionHash}-${i}`}>
                      <TableCell>
                        <Badge variant={isSent ? "destructive" : "default"}>
                          {isSent ? "→ out" : "← in"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {shorten(counterparty)}
                      </TableCell>
                      <TableCell>{amount.toFixed(2)} USDC.e</TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.blockNumber}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {transfers.map((t, i) => {
                const isSent =
                  t.from.toLowerCase() === currentAddress.toLowerCase();
                const counterparty = isSent ? t.to : t.from;
                const amount = Number(t.value) / 1e6;
                return (
                  <div
                    key={`${t.transactionHash}-${i}`}
                    className="border rounded-lg p-3 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <Badge variant={isSent ? "destructive" : "default"}>
                        {isSent ? "→ out" : "← in"}
                      </Badge>
                      <span className="text-sm font-medium">
                        {amount.toFixed(2)} USDC.e
                      </span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {shorten(counterparty)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Block {t.blockNumber}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function TransfersTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
