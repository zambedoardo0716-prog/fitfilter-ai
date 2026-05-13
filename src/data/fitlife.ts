export const navItems = [
  { label: "Analyzer", href: "/analyzer" },
  { label: "Plan", href: "/plan" },
  { label: "Check-in", href: "/check-in" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Rewards", href: "/rewards" },
];

export const analyzerMetrics = [
  { label: "Form score", value: "91", detail: "hip drive and tempo look sharp" },
  { label: "Power", value: "84", detail: "strong final rep acceleration" },
  { label: "Control", value: "78", detail: "knees drift inward under fatigue" },
];

export const workouts = [
  {
    day: "Mon",
    title: "Lower strength",
    blocks: ["Back squat 5x5", "Romanian deadlift 4x8", "Core finisher"],
    intensity: "Heavy",
  },
  {
    day: "Tue",
    title: "Zone 2 engine",
    blocks: ["35 min bike", "Breath cadence", "Mobility reset"],
    intensity: "Base",
  },
  {
    day: "Wed",
    title: "Upper hypertrophy",
    blocks: ["Incline press 4x10", "Pull-ups 5 sets", "Shoulder stability"],
    intensity: "Moderate",
  },
  {
    day: "Fri",
    title: "Athletic power",
    blocks: ["Pogo jumps", "Kettlebell swings", "Sprint intervals"],
    intensity: "Explosive",
  },
];

export const checkInSignals = [
  { label: "Sleep", value: "7h 42m", score: 86 },
  { label: "Soreness", value: "Low", score: 72 },
  { label: "Mood", value: "Locked in", score: 91 },
  { label: "Hydration", value: "2.4L", score: 80 },
];

export const friends = [
  { name: "Maya", streak: 19, xp: 8420, trend: "+2" },
  { name: "Leo", streak: 17, xp: 8180, trend: "+1" },
  { name: "You", streak: 14, xp: 7960, trend: "+3" },
  { name: "Nora", streak: 12, xp: 7440, trend: "-1" },
  { name: "Sam", streak: 10, xp: 7210, trend: "+4" },
];

export const rewards = [
  { title: "Recovery drop", cost: "1,200 XP", status: "Unlocked", accent: "Mint" },
  { title: "Partner class pass", cost: "2,000 XP", status: "62% ready", accent: "Sky" },
  { title: "Founders hoodie", cost: "4,500 XP", status: "Invite only", accent: "Volt" },
];
