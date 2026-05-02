import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clients, getRecommendations, ragCitations } from "@/data/mockData";
import { FileText, Search } from "lucide-react";

export default function RecommendationsPage() {
  const [clientId, setClientId] = useState<string>("");
  const [ragOpen, setRagOpen] = useState<number | null>(null);

  const recs = clientId ? getRecommendations(Number(clientId)) : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Recommendations</h2>

      <div className="max-w-xs">
        <Select value={clientId} onValueChange={setClientId}>
          <SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger>
          <SelectContent>
            {clients.map((c) => (
              <SelectItem key={c.REF_PERSONNE} value={String(c.REF_PERSONNE)}>
                #{c.REF_PERSONNE} — {c.profession}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {recs.length > 0 && (
        <div className="space-y-4">
          {recs.map((r) => (
            <Card key={r.rank}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">#{r.rank}</span>
                    <div>
                      <p className="font-semibold">{r.product}</p>
                      <p className="text-xs text-muted-foreground">{r.source}</p>
                    </div>
                    {r.already_owned && <Badge variant="secondary">Already Owned</Badge>}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setRagOpen(ragOpen === r.rank ? null : r.rank)}
                  >
                    <Search className="h-3 w-3" /> Justify with RAG
                  </Button>
                </div>

                {ragOpen === r.rank && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    <p className="text-xs font-medium text-muted-foreground">Retrieved Document Excerpts</p>
                    {ragCitations.map((c) => (
                      <div key={c.chunk_id} className="border rounded-md p-3 space-y-1 bg-muted/30">
                        <div className="flex items-center gap-2 text-xs">
                          <FileText className="h-3 w-3 text-primary" />
                          <span className="font-medium">{c.pdf}</span>
                          <Badge variant="outline" className="text-[10px]">Chunk #{c.chunk_id}</Badge>
                          <Badge variant="secondary" className="text-[10px]">Score: {c.score.toFixed(2)}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}