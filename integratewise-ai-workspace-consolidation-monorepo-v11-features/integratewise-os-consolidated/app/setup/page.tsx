"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Brain, Briefcase, Building2, Check, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Types
type Step = 1 | 2 | 3 | 4;

const USE_CASES = [
    { id: "personal", label: "Personal", icon: Brain, desc: "Notes, ideas, learning, personal tasks" },
    { id: "work", label: "Work / Freelance", icon: Briefcase, desc: "Projects, clients, tasks, invoices" },
    { id: "team", label: "Team", icon: Users, desc: "Collaboration, handoffs, shared projects" },
    { id: "business", label: "Business", icon: Building2, desc: "Customers, sales, operations, CRM" },
];

const TOOLS = [
    { id: "notion", name: "Notion", icon: "📝" },
    { id: "todoist", name: "Todoist", icon: "✅" },
    { id: "asana", name: "Asana", icon: "🎯" },
    { id: "trello", name: "Trello", icon: "📋" },
    { id: "hubspot", name: "HubSpot", icon: "🔶" },
    { id: "linear", name: "Linear", icon: "⚡" },
    { id: "clickup", name: "ClickUp", icon: "🚀" },
    { id: "sheets", name: "Sheets", icon: "📊" },
];

export default function SetupWizardPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    // Calculate progress
    const progress = (step / 4) * 100;

    const handleNext = () => {
        if (step < 4) setStep((prev) => (prev + 1) as Step);
        else router.push("/dashboard");
    };

    const handleBack = () => {
        if (step > 1) setStep((prev) => (prev - 1) as Step);
    };

    const toggleTool = (id: string) => {
        setSelectedTools((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Top Bar */}
            <div className="max-w-4xl mx-auto w-full px-6 pt-12 pb-8">
                <div className="flex justify-between text-sm text-slate-500 mb-4 font-mono">
                    <span>Step {step} of 4</span>
                    <span>~60 seconds to first value</span>
                </div>
                <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-slate-700"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* STEP 1: Use Case */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <div className="text-center mb-12 space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight">Welcome to IntegrateWise</h1>
                                <p className="text-xl text-slate-400">Your AI-powered work hub. Let's set you up in 60 seconds.</p>
                                <div className="h-8" />
                                <h2 className="text-2xl font-semibold">What best describes how you'll use this?</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {USE_CASES.map((uc) => (
                                    <button
                                        key={uc.id}
                                        onClick={() => {
                                            setSelectedUseCase(uc.id);
                                            handleNext();
                                        }}
                                        className={cn(
                                            "p-6 text-left rounded-xl border-2 transition-all hover:bg-zinc-900 group",
                                            selectedUseCase === uc.id
                                                ? "border-emerald-500 bg-zinc-900"
                                                : "border-zinc-800 hover:border-zinc-700"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-lg w-fit mb-4 transition-colors",
                                            selectedUseCase === uc.id ? "bg-emerald-950/50" : "bg-zinc-900 group-hover:bg-black"
                                        )}>
                                            <uc.icon className={cn(
                                                "w-6 h-6",
                                                selectedUseCase === uc.id ? "text-emerald-500" : "text-slate-400"
                                            )} />
                                        </div>
                                        <div className="font-semibold text-lg mb-1">{uc.label}</div>
                                        <p className="text-slate-500 text-sm">{uc.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 text-center text-slate-600">
                                <button onClick={handleNext} className="hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                    Skip for now <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Tool Selection */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full text-center"
                        >
                            <div className="mb-12 space-y-4">
                                <h2 className="text-3xl font-bold">Where do you manage tasks?</h2>
                                <p className="text-slate-400">Select all that apply. We'll connect them.</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {TOOLS.map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all h-32 relative",
                                            selectedTools.includes(tool.id)
                                                ? "border-emerald-500 bg-zinc-900"
                                                : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                                        )}
                                    >
                                        {selectedTools.includes(tool.id) && (
                                            <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-black font-bold" />
                                            </div>
                                        )}
                                        <span className="text-4xl mb-3">{tool.icon}</span>
                                        <span className={cn(
                                            "font-medium",
                                            selectedTools.includes(tool.id) ? "text-white" : "text-slate-400"
                                        )}>{tool.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between items-center max-w-2xl mx-auto">
                                <button onClick={handleBack} className="text-slate-500 hover:text-white flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <div className="flex items-center gap-6">
                                    <button onClick={handleNext} className="text-slate-500 hover:text-white text-sm">
                                        Connect later
                                    </button>
                                    <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-8 h-10 font-bold">
                                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Connect First Tool (Simulated) */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full text-center"
                        >
                            <div className="mb-12 space-y-4">
                                <h2 className="text-3xl font-bold">Let's connect your first tool</h2>
                                <p className="text-slate-400">This takes about 30 seconds. You can add more later.</p>
                            </div>

                            <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center shadow-2xl">
                                <span className="text-5xl mb-6 block">📝</span>
                                <h3 className="text-xl font-bold mb-2">Connect Notion</h3>
                                <p className="text-slate-400 mb-8 text-sm">We'll import your tasks, pages, and databases.</p>

                                <Button className="w-full py-6 text-lg bg-white text-black hover:bg-slate-200 mb-6 font-bold" onClick={handleNext}>
                                    Connect Notion
                                </Button>

                                <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
                                    <Lock className="w-3 h-3" /> We only read your data. We never modify or delete anything.
                                </p>
                            </div>

                            <div className="mt-12 flex justify-between items-center max-w-md mx-auto">
                                <button onClick={handleBack} className="text-slate-500 hover:text-white flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button onClick={handleNext} className="text-slate-500 hover:text-white flex items-center gap-2">
                                    Skip, explore first <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Success / Ready */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center max-w-lg mx-auto"
                        >
                            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                                    <Check className="w-8 h-8 text-black" strokeWidth={4} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-4">You're all set!</h2>
                            <p className="text-slate-400 text-lg mb-8">
                                We've configured your workspace based on your preferences.
                            </p>

                            <Button onClick={() => router.push("/dashboard")} className="w-full h-14 text-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
                                Enter Dashboard
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

// Icons
function Lock(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}
