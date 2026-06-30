"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Plug, 
  Upload, 
  SkipForward, 
  Globe, 
  ArrowRight,
  Slack,
  FileText,
  Database,
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const CONNECT_TOOLS = [
  { id: 'slack', name: 'Slack', icon: Slack, color: 'bg-purple-500/10 text-purple-500' },
  { id: 'notion', name: 'Notion', icon: FileText, color: 'bg-slate-500/10 text-slate-500' },
  { id: 'google', name: 'Google Drive', icon: Database, color: 'bg-blue-500/10 text-blue-500' },
  { id: 'hubspot', name: 'HubSpot / SFDC', icon: Database, color: 'bg-orange-500/10 text-orange-500' },
  { id: 'gmail', name: 'Gmail', icon: Mail, color: 'bg-red-500/10 text-red-500' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'bg-green-500/10 text-green-500' },
]

export default function LoadDataPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<'connect' | 'dump' | 'skip' | null>(null)
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [browserMemory, setBrowserMemory] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToolToggle = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId))
    } else if (selectedTools.length < 2) {
      setSelectedTools([...selectedTools, toolId])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || [])
    setFiles(uploadedFiles)
  }

  const handleContinue = async () => {
    setIsLoading(true)

    // Store preferences
    if (selectedOption === 'connect') {
      localStorage.setItem('integratewise-connected-tools', JSON.stringify(selectedTools))
    } else if (selectedOption === 'dump') {
      // Handle file upload
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      // TODO: Upload files via API
    }
    
    if (browserMemory) {
      localStorage.setItem('integratewise-browser-memory', 'enabled')
    }

    // Wait a moment for UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (selectedOption === 'skip') {
      router.push("/normalize")
    } else {
      router.push("/normalize")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Load Your Data</h1>
          <p className="text-muted-foreground text-lg">
            Let you decide how much to give me, without friction.
          </p>
        </div>

        {/* Four Blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Connect */}
          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-primary/50",
              selectedOption === 'connect' && "border-primary ring-2 ring-primary/20"
            )}
            onClick={() => setSelectedOption('connect')}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Plug className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="text-lg">Connect</CardTitle>
              </div>
              <CardDescription>
                Connect 1–2 tools and I'll pull enough to start.
              </CardDescription>
            </CardHeader>
            {selectedOption === 'connect' && (
              <CardContent className="space-y-3 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  {CONNECT_TOOLS.map((tool) => {
                    const Icon = tool.icon
                    const isSelected = selectedTools.includes(tool.id)
                    
                    return (
                      <button
                        key={tool.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToolToggle(tool.id)
                        }}
                        className={cn(
                          "p-3 rounded-lg border transition-all text-left",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                        disabled={!isSelected && selectedTools.length >= 2}
                      >
                        <Icon className={cn("h-5 w-5 mb-2", tool.color)} />
                        <div className="text-xs font-medium">{tool.name}</div>
                      </button>
                    )
                  })}
                </div>
                {selectedTools.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedTools.length} of 2 selected
                  </Badge>
                )}
              </CardContent>
            )}
          </Card>

          {/* 2. Dump */}
          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-primary/50",
              selectedOption === 'dump' && "border-primary ring-2 ring-primary/20"
            )}
            onClick={() => setSelectedOption('dump')}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle className="text-lg">Dump</CardTitle>
              </div>
              <CardDescription>
                Drop your scribbles, notes, meeting summaries, chat exports, markdown, docs.
              </CardDescription>
            </CardHeader>
            {selectedOption === 'dump' && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <input
                    type="file"
                    multiple
                    accept=".txt,.md,.pdf,.docx,.pptx,.png,.jpg,.webp"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {files.length > 0 ? `${files.length} files selected` : 'Click to upload files'}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      txt, md, pdf, docx, pptx, png, jpg, webp
                    </span>
                  </label>
                  {files.length > 0 && (
                    <div className="space-y-1">
                      {files.map((file, index) => (
                        <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* 3. Skip */}
          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-primary/50",
              selectedOption === 'skip' && "border-primary ring-2 ring-primary/20"
            )}
            onClick={() => setSelectedOption('skip')}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-slate-500/10 flex items-center justify-center">
                  <SkipForward className="h-5 w-5 text-slate-500" />
                </div>
                <CardTitle className="text-lg">Skip</CardTitle>
              </div>
              <CardDescription>
                Skip for now. I'll start with a clean workspace.
              </CardDescription>
            </CardHeader>
            {selectedOption === 'skip' && (
              <CardContent className="pt-0">
                <Badge variant="secondary" className="text-xs">
                  You can add data later
                </Badge>
              </CardContent>
            )}
          </Card>

          {/* 4. Browser Memory (Always visible, toggle) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-violet-500" />
                </div>
                <CardTitle className="text-lg">Browser Memory</CardTitle>
              </div>
              <CardDescription>
                Optional: Pre-seed IQ Hub from your browsing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="browser-memory" className="text-sm cursor-pointer">
                  Enable browser memory
                </Label>
                <Switch
                  id="browser-memory"
                  checked={browserMemory}
                  onCheckedChange={setBrowserMemory}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                I can pre-seed IQ Hub from your browsing, only if you want.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Guardrails */}
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium">Security & Privacy</p>
                <p className="text-xs text-muted-foreground">
                  I scan uploads, limit sizes, and sandbox parsing so nothing crashes your workspace. Your data stays private and secure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={isLoading || (selectedOption === 'connect' && selectedTools.length === 0) || !selectedOption}
            className="px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
