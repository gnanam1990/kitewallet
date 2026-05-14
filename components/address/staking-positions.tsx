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

interface ValidatorRegistration {
  validatorId: string;
  stake: string;
  delegationFeeBips: string;
  minStakeDuration: string;
  blockNumber: string;
}

interface DelegatorRegistration {
  validatorId: string;
  stake: string;
  blockNumber: string;
}

interface StakingPositionsProps {
  asValidator: ValidatorRegistration | null;
  asDelegator: DelegatorRegistration[];
}

export function StakingPositions({
  asValidator,
  asDelegator,
}: StakingPositionsProps) {
  const hasContent = asValidator || asDelegator.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staking Positions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasContent ? (
          <p className="text-muted-foreground text-sm py-4">
            Not currently a validator or delegator
          </p>
        ) : (
          <>
            {asValidator && (
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Validator</h3>
                  <Badge>ID: {shorten(asValidator.validatorId, 6)}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Stake: </span>
                    <span className="font-medium">
                      {(Number(asValidator.stake) / 1e18).toFixed(2)} KITE
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fee: </span>
                    <span className="font-medium">
                      {(Number(asValidator.delegationFeeBips) / 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Min Duration: </span>
                    <span className="font-medium">
                      {Math.floor(
                        Number(asValidator.minStakeDuration) / 86400
                      )}{" "}
                      days
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Since Block: </span>
                    <span className="font-medium">
                      {asValidator.blockNumber}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {asDelegator.length > 0 && (
              <>
                <h3 className="font-semibold">Delegations</h3>
                {/* Desktop table */}
                <Table className="hidden md:table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Validator</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Since Block</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asDelegator.map((d, i) => (
                      <TableRow key={`${d.validatorId}-${i}`}>
                        <TableCell className="font-mono text-sm">
                          {shorten(d.validatorId, 6)}
                        </TableCell>
                        <TableCell>
                          {(Number(d.stake) / 1e18).toFixed(2)} KITE
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {d.blockNumber}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {asDelegator.map((d, i) => (
                    <div
                      key={`${d.validatorId}-${i}`}
                      className="border rounded-lg p-3 space-y-1"
                    >
                      <div className="font-mono text-xs text-muted-foreground">
                        Validator: {shorten(d.validatorId, 6)}
                      </div>
                      <div className="text-sm font-medium">
                        {(Number(d.stake) / 1e18).toFixed(2)} KITE
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Block {d.blockNumber}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function StakingPositionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  );
}
