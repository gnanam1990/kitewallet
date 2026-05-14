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

interface BridgeTransfer {
  transferId: string;
  direction: string;
  sender: string;
  recipient: string;
  amount: string;
  status: string;
  blockNumber: string;
}

interface BridgeHistoryProps {
  bridges: BridgeTransfer[];
}

function getStatusVariant(status: string): "default" | "secondary" | "outline" {
  switch (status.toLowerCase()) {
    case "executed":
      return "default";
    case "relayed":
    case "received":
      return "secondary";
    default:
      return "outline";
  }
}

export function BridgeHistory({ bridges }: BridgeHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Bridge History</CardTitle>
          <Badge variant="secondary">{bridges.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {bridges.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4">
            No bridge activity
          </p>
        ) : (
          <>
            {/* Desktop table */}
            <Table className="hidden md:table">
              <TableHeader>
                <TableRow>
                  <TableHead>Direction</TableHead>
                  <TableHead>Transfer ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bridges.map((b) => {
                  const amount = Number(b.amount) / 1e6;
                  return (
                    <TableRow key={b.transferId}>
                      <TableCell>
                        <Badge
                          variant={
                            b.direction === "in" ? "default" : "destructive"
                          }
                        >
                          {b.direction === "in" ? "← in" : "→ out"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {shorten(b.transferId, 6)}
                      </TableCell>
                      <TableCell>{amount.toFixed(2)} USDC.e</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(b.status)}>
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {bridges.map((b) => {
                const amount = Number(b.amount) / 1e6;
                return (
                  <div
                    key={b.transferId}
                    className="border rounded-lg p-3 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <Badge
                        variant={
                          b.direction === "in" ? "default" : "destructive"
                        }
                      >
                        {b.direction === "in" ? "← in" : "→ out"}
                      </Badge>
                      <Badge variant={getStatusVariant(b.status)}>
                        {b.status}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">
                      {amount.toFixed(2)} USDC.e
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {shorten(b.transferId, 6)}
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

export function BridgeHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-36" />
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
