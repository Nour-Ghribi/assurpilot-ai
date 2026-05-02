import { useState } from "react";
import { Search, FileText, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { documentChunks } from "@/data/mockData";

export default function DocumentsPage() {
  const [search, setSearch] = useState("");

  const results = search.trim()
    ? documentChunks
        .map((c) => ({
          ...c,
          score: c.text.toLowerCase().includes(search.toLowerCase()) ? (0.7 + Math.random() * 0.25) : 0,
        }))
        .filter((c) => c.score > 0)
        .sort((a, b) => b.score - a.score)
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Documents / OCR & RAG</h2>

      <div className="flex items-center gap-4">
        <Card className="flex-shrink-0">
          <CardContent className="p-4 flex items-center gap-3">
            <Database className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Indexed Chunks</p>
              <p className="text-xl font-bold">{documentChunks.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Semantic search across documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {search.trim() && results.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Search Results ({results.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {results.map((r) => (
              <div key={r.id} className="border rounded-md p-3 space-y-1 bg-muted/20">
                <div className="flex items-center gap-2 text-xs">
                  <FileText className="h-3 w-3 text-primary" />
                  <span className="font-medium">{r.pdf}</span>
                  <Badge variant="outline" className="text-[10px]">Chunk #{r.chunk_id}</Badge>
                  <Badge variant="secondary" className="text-[10px]">Score: {r.score.toFixed(2)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">All Document Chunks</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>PDF</TableHead><TableHead>Chunk</TableHead><TableHead>Pages</TableHead><TableHead>Text Excerpt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentChunks.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="text-xs">{c.pdf}</TableCell>
                  <TableCell>{c.chunk_id}</TableCell>
                  <TableCell>{c.pages}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-xs text-muted-foreground">{c.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}