import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, FileText, Mail, MessageCircle, CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react";
import { clients, getRecommendations, pitchResponse } from "@/data/mockData";

export default function PitchPage() {
  const [clientId, setClientId] = useState("");
  const [productName, setProductName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [whatsappText, setWhatsappText] = useState("");

  const recs = clientId ? getRecommendations(Number(clientId)) : [];

  const generate = () => {
    setEmailText(pitchResponse.pitch_email);
    setWhatsappText(pitchResponse.pitch_whatsapp);
    setGenerated(true);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-semibold tracking-tight">Commercial Pitch Generator</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={clientId} onValueChange={(v) => { setClientId(v); setGenerated(false); setProductName(""); }}>
              <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.REF_PERSONNE} value={String(c.REF_PERSONNE)}>
                    #{c.REF_PERSONNE} — {c.profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={productName} onValueChange={setProductName} disabled={!clientId}>
              <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
              <SelectContent>
                {recs.map((r) => (
                  <SelectItem key={r.rank} value={r.product}>{r.product}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generate} disabled={!clientId || !productName} className="gap-2">
            <Sparkles className="h-4 w-4" /> Generate Pitch
          </Button>
        </CardContent>
      </Card>

      {generated && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[hsl(142,71%,45%)]" /> Benefits</CardTitle></CardHeader>
              <CardContent><ul className="text-sm space-y-1">{pitchResponse.benefices.map((b, i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span>{b}</li>)}</ul></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Eligibility</CardTitle></CardHeader>
              <CardContent><ul className="text-sm space-y-1">{pitchResponse.eligibilite.map((e, i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span>{e}</li>)}</ul></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Exclusions</CardTitle></CardHeader>
              <CardContent><ul className="text-sm space-y-1">{pitchResponse.exclusions.map((e, i) => <li key={i} className="flex gap-2"><span className="text-destructive">•</span>{e}</li>)}</ul></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[hsl(38,92%,50%)]" /> Risks</CardTitle></CardHeader>
              <CardContent><ul className="text-sm space-y-1">{pitchResponse.risques.map((r, i) => <li key={i} className="flex gap-2"><span className="text-[hsl(38,92%,50%)]">•</span>{r}</li>)}</ul></CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Mail className="h-4 w-4" /> Email Pitch</CardTitle></CardHeader>
            <CardContent><Textarea value={emailText} onChange={(e) => setEmailText(e.target.value)} rows={12} className="font-mono text-sm" /></CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Pitch</CardTitle></CardHeader>
            <CardContent><Textarea value={whatsappText} onChange={(e) => setWhatsappText(e.target.value)} rows={4} className="text-sm" /></CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Document Citations</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {pitchResponse.citations.map((c) => (
                <div key={c.chunk_id} className="border rounded p-2 bg-muted/30">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium">{c.pdf}</span>
                    <Badge variant="outline" className="text-[10px]">Chunk #{c.chunk_id}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.extrait}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}