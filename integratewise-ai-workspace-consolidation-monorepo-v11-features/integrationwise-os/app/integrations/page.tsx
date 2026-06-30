import { IntegrationsSelection } from "@/components/integrations-selection"
import { Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" })

export default function IntegrationsPage() {
  return (
    <div className={cn("min-h-screen bg-white", spaceGrotesk.variable)}>
      <IntegrationsSelection />
    </div>
  )
}
