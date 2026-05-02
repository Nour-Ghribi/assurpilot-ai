import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, FileText } from "lucide-react";
import { ragCitations } from "@/data/mockData";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
  citations?: typeof ragCitations;
}

const insuranceKeywords = ["insurance", "guarantee", "exclusion", "contract", "product", "coverage", "claim", "premium", "policy", "deductible", "reinsurance", "assistance", "liability", "risk"];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const isInsurance = insuranceKeywords.some((k) => input.toLowerCase().includes(k));
      const assistantMsg: ChatMsg = isInsurance
        ? {
            role: "assistant",
            content: `Based on the retrieved insurance documentation, here is what I found regarding your question:\n\nThe insurance policy covers the insured party against risks defined in the special conditions. Home Assistance coverage includes emergency plumbing, locksmith services, and electrical repairs within 24 hours of the reported incident. The policyholder benefits from a network of certified professionals.\n\nExclusions include pre-existing damage, incidents caused by willful negligence, and claims filed more than 48 hours after the event occurrence.`,
            citations: ragCitations,
          }
        : {
            role: "assistant",
            content: "I am specialized in insurance products and insurance documentation. Please ask me about guarantees, exclusions, contracts, products, or any insurance-related topic.",
          };
      setMessages((m) => [...m, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold tracking-tight">Chatbot RAG</h2>

      <Card className="h-[calc(100vh-240px)] flex flex-col">
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <div className="text-center space-y-2">
                <Bot className="h-10 w-10 mx-auto text-primary/40" />
                <p>Ask a question about insurance products and documentation.</p>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2" : ""}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                {msg.citations && (
                  <div className="space-y-2 mt-2">
                    <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                    {msg.citations.map((c) => (
                      <div key={c.chunk_id} className="border rounded p-2 bg-muted/30 space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <FileText className="h-3 w-3 text-primary" />
                          <span className="font-medium">{c.pdf}</span>
                          <Badge variant="outline" className="text-[10px]">Chunk #{c.chunk_id}</Badge>
                          <Badge variant="secondary" className="text-[10px]">{c.score.toFixed(2)}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{c.text.slice(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </CardContent>
        <div className="border-t p-4 flex gap-2">
          <Input
            placeholder="Ask about guarantees, exclusions, contracts, products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} disabled={loading} size="icon"><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}