export const navItems = [
  { label: "Analisi", href: "/analyzer" },
  { label: "Piano", href: "/plan" },
  { label: "Check-in", href: "/check-in" },
  { label: "Classifica", href: "/leaderboard" },
  { label: "Ricompense", href: "/rewards" },
];

export const analyzerMetrics = [
  { label: "Qualità tecnica", value: "91", detail: "spinta d'anca e ritmo sono molto solidi" },
  { label: "Potenza", value: "84", detail: "buona accelerazione nelle ultime ripetizioni" },
  { label: "Controllo", value: "78", detail: "le ginocchia cedono leggermente sotto fatica" },
];

export const workouts = [
  {
    day: "Lun",
    title: "Forza gambe",
    blocks: ["Squat 5x5", "Stacco rumeno 4x8", "Chiusura core"],
    intensity: "Pesante",
  },
  {
    day: "Mar",
    title: "Base aerobica",
    blocks: ["35 min bici", "Ritmo respiratorio", "Mobilità di scarico"],
    intensity: "Base",
  },
  {
    day: "Mer",
    title: "Parte alta ipertrofia",
    blocks: ["Panca inclinata 4x10", "Trazioni 5 serie", "Stabilità spalle"],
    intensity: "Moderata",
  },
  {
    day: "Ven",
    title: "Potenza atletica",
    blocks: ["Pogo jump", "Kettlebell swing", "Sprint a intervalli"],
    intensity: "Esplosiva",
  },
];

export const checkInSignals = [
  { label: "Sonno", value: "7h 42m", score: 86 },
  { label: "Indolenzimento", value: "Basso", score: 72 },
  { label: "Energia", value: "A fuoco", score: 91 },
  { label: "Idratazione", value: "2.4L", score: 80 },
];

export const friends = [
  { name: "Maya", streak: 19, xp: 8420, trend: "+2" },
  { name: "Leo", streak: 17, xp: 8180, trend: "+1" },
  { name: "Tu", streak: 14, xp: 7960, trend: "+3" },
  { name: "Nora", streak: 12, xp: 7440, trend: "-1" },
  { name: "Sam", streak: 10, xp: 7210, trend: "+4" },
];

export const rewards = [
  { title: "Kit recupero", cost: "1,200 XP", status: "Sbloccato", accent: "Menta" },
  { title: "Pass lezione partner", cost: "2,000 XP", status: "62% completato", accent: "Cielo" },
  { title: "Felpa founder", cost: "4,500 XP", status: "Solo su invito", accent: "Volt" },
];
