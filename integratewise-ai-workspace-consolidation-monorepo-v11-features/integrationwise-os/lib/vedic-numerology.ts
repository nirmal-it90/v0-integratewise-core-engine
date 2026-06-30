export type VedicNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface VedicPersona {
    number: number;
    archetype: string;
    title: string;
    description: string;
    traits: string[];
    recommendedPath: string;
    color: string;
}

const PYTHAGOREAN_MAP: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

function calculateNameNumber(name: string): number {
    const sum = name
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split("")
        .reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);

    // Reduce to single digit (unless master number, but for simplicity we reduce all 
    // or follow specific Vedic rules if requested. The example showed 31 -> 4, so standard reduction).
    let current = sum;
    while (current > 9) {
        current = current.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    }
    return current;
}

export const VEDIC_PERSONAS: Record<number, VedicPersona> = {
    1: {
        number: 1,
        archetype: "The Pioneer",
        title: "Sovereign Architect",
        description: "You are a born leader with a drive for innovation. Your energy pierces through ambiguity to establish clear, new structures.",
        traits: ["Initiator", "Independent", "Visionary"],
        recommendedPath: "Executive Orchestration",
        color: "text-red-400"
    },
    2: {
        number: 2,
        archetype: "The Diplomat",
        title: "Nexus Weaver",
        description: "You see the invisible threads connecting systems and people. Your power lies in harmonization and seamless integration.",
        traits: ["Intuitive", "Collaborative", "Detail-Oriented"],
        recommendedPath: "Community & Workflow Integration",
        color: "text-orange-300"
    },
    3: {
        number: 3,
        archetype: "The Creator",
        title: "Expression Engine",
        description: "Your creativity fuels systems. You turn static data into dynamic, engaging narratives and workflows.",
        traits: ["Expressive", "Optimistic", "Solution-Oriented"],
        recommendedPath: "Creative Automation",
        color: "text-yellow-400"
    },
    4: {
        number: 4,
        archetype: "The Builder",
        title: "Systems Anchor",
        description: "Reliability is your signature. You build the rock-solid foundations upon which scalable empires rest.",
        traits: ["Disciplined", "Practical", "Stable"],
        recommendedPath: "Infrastructure & Security",
        color: "text-green-400"
    },
    5: {
        number: 5,
        archetype: "The Catalyst",
        title: "Freedom Engineer",
        description: "Change is your native tongue. You design agile systems that adapt instantly to shifting realities.",
        traits: ["Adaptive", "Dynamic", "Versatile"],
        recommendedPath: "Agile & Growth Operations",
        color: "text-cyan-400"
    },
    6: {
        number: 6,
        archetype: "The Nurturer",
        title: "Guardian Interface",
        description: "You bring balance and responsibility to automation. Your systems protect and serve the human element.",
        traits: ["Responsible", "Harmonious", "Supportive"],
        recommendedPath: "Service & Support Automation",
        color: "text-indigo-300"
    },
    7: {
        number: 7,
        archetype: "The Seeker",
        title: "Deep Logic Core",
        description: "You look beneath the surface. Your analytical depth uncovers the hidden efficiencies others miss.",
        traits: ["Analytical", "Introspective", "Strategic"],
        recommendedPath: "Data Intelligence & Analytics",
        color: "text-purple-400"
    },
    8: {
        number: 8,
        archetype: "The Executive",
        title: "Power Marshal",
        description: "You understand value and authority. Your systems are designed for maximum ROI and command-and-control.",
        traits: ["Ambitious", "Efficient", "Authoritative"],
        recommendedPath: "Financial & Enterprise Strategy",
        color: "text-amber-500"
    },
    9: {
        number: 9,
        archetype: "The Humanitarian",
        title: "Universal Node",
        description: "You see the big picture. Your integration philosophy encompasses the greater good and global impact.",
        traits: ["Compassionate", "Global-Minded", "Selfless"],
        recommendedPath: "Impact & Sustainability Systems",
        color: "text-rose-400"
    }
};

export function getVedicPersona(name: string): VedicPersona {
    const num = calculateNameNumber(name);
    return VEDIC_PERSONAS[num] || VEDIC_PERSONAS[1];
}
