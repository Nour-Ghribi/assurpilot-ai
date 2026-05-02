import { useState } from "react";
import { Search, ArrowLeft, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clients, contracts, getRecommendations, type Client } from "@/data/mockData";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = clients.filter((c) =>
    `${c.REF_PERSONNE} ${c.profession} ${c.ville} ${c.type_client}`.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    const clientContracts = contracts.filter((c) => c.client_id === selected.REF_PERSONNE);
    const recs = getRecommendations(selected.REF_PERSONNE);
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelected(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Button>

        <Card>
          <CardHeader><CardTitle>Client #{selected.REF_PERSONNE}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                ["Type", selected.type_client],
                ["Age", selected.age || "-"],
                ["Gender", selected.sexe],
                ["Family", selected.situation_familiale],
                ["Profession", selected.profession],
                ["Sector", selected.secteur],
                ["City", selected.ville],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <p className="text-muted-foreground text-xs">{String(label)}</p>
                  <p className="font-medium">{String(value)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Existing Contracts</CardTitle></CardHeader>
          <CardContent>
            {clientContracts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No contracts found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead><TableHead>Product</TableHead><TableHead>Status</TableHead>
                    <TableHead>Start</TableHead><TableHead>End</TableHead><TableHead>Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientContracts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.id}</TableCell>
                      <TableCell>{c.product}</TableCell>
                      <TableCell>
                        <Badge variant={c.status === "ACTIVE" ? "default" : c.status === "EXPIRED" ? "secondary" : "destructive"}>
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{c.start_date}</TableCell>
                      <TableCell>{c.end_date}</TableCell>
                      <TableCell>{c.premium} TND</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recommended Products</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recs.slice(0, 5).map((r) => (
                <div key={r.rank} className="border rounded-lg p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">#{r.rank}</span>
                    {r.already_owned && <Badge variant="secondary" className="text-[10px]">Owned</Badge>}
                  </div>
                  <p className="font-medium text-sm">{r.product}</p>
                  <p className="text-[11px] text-muted-foreground">{r.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="gap-2">
          <Sparkles className="h-4 w-4" /> Generate Commercial Pitch
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Clients</h2>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client ID</TableHead><TableHead>Type</TableHead><TableHead>Age</TableHead>
                <TableHead>Gender</TableHead><TableHead>Family</TableHead><TableHead>Profession</TableHead>
                <TableHead>Sector</TableHead><TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.REF_PERSONNE} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelected(c)}>
                  <TableCell className="font-mono">{c.REF_PERSONNE}</TableCell>
                  <TableCell><Badge variant={c.type_client === "company" ? "secondary" : "outline"}>{c.type_client}</Badge></TableCell>
                  <TableCell>{c.age || "-"}</TableCell>
                  <TableCell>{c.sexe}</TableCell>
                  <TableCell>{c.situation_familiale}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{c.profession}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{c.secteur}</TableCell>
                  <TableCell>{c.ville}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}