import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { opportunities } from "@/data/mockData";

const columns = [
  { key: "in_progress" as const, label: "In Progress", color: "bg-primary" },
  { key: "accepted" as const, label: "Accepted", color: "bg-[hsl(142,71%,45%)]" },
  { key: "refused" as const, label: "Refused", color: "bg-destructive" },
];

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Opportunities</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const items = opportunities.filter((o) => o.status === col.key);
          return (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${col.color}`} />
                <h3 className="font-semibold text-sm">{col.label}</h3>
                <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
              </div>
              {items.map((opp) => (
                <Card key={opp.id} className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">{opp.id}</span>
                      <span className="text-[10px] text-muted-foreground">{opp.last_update}</span>
                    </div>
                    <p className="text-sm font-medium">{opp.product}</p>
                    <p className="text-xs text-muted-foreground">Client #{opp.client_id}</p>
                    <p className="text-xs text-muted-foreground italic">{opp.email_subject}</p>
                    <p className="text-xs border-t pt-2 text-muted-foreground">{opp.argument}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}