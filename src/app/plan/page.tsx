"use client";

import { useMemo, useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";

const goals = ["Dimagrire", "Mettere massa", "Fitness generale"];
const levels = ["Principiante", "Intermedio", "Avanzato"];
const frequencies = ["2 giorni", "3-4 giorni", "5+ giorni"];
const durations = ["30 minuti", "45 minuti", "60+ minuti"];
const equipmentTypes = ["Casa / corpo libero", "Palestra"];

type PlanDay = {
  day: string;
  title: string;
  intensity: string;
  blocks: string[];
  note: string;
};

export default function PlanPage() {
  const [goal, setGoal] = useState(goals[0]);
  const [level, setLevel] = useState(levels[1]);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [duration, setDuration] = useState(durations[1]);
  const [equipment, setEquipment] = useState(equipmentTypes[1]);

  const plan = useMemo(
    () => buildPlan({ goal, level, frequency, duration, equipment }),
    [duration, equipment, frequency, goal, level],
  );

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Generatore piano"
          title="Una scheda che cambia davvero in base a te."
          body="Scegli obiettivo, livello, frequenza, durata e attrezzatura: FitFilter AI crea una settimana simulata ma credibile, con volume e struttura coerenti."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="glass h-fit rounded-[2rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Dati</p>
            <div className="mt-6 space-y-6">
              <Selector label="Obiettivo" value={goal} options={goals} onChange={setGoal} />
              <Selector label="Livello" value={level} options={levels} onChange={setLevel} />
              <Selector label="Frequenza" value={frequency} options={frequencies} onChange={setFrequency} />
              <Selector label="Tempo disponibile" value={duration} options={durations} onChange={setDuration} />
              <Selector label="Attrezzatura" value={equipment} options={equipmentTypes} onChange={setEquipment} />
            </div>
            <div className="mt-6 rounded-3xl bg-emerald-300 p-5 text-slate-950">
              <p className="text-sm font-bold">Focus generato</p>
              <p className="mt-2 text-2xl font-black">{plan.summary}</p>
              <p className="mt-2 text-sm font-semibold">{plan.strategy}</p>
            </div>
          </aside>

          <div className="grid gap-5">
            <div className="glass rounded-[2rem] p-5">
              <div className="grid gap-3 md:grid-cols-3">
                {plan.highlights.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/7 p-4 text-sm font-bold text-white/76">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {plan.days.map((workout) => (
                <article key={`${workout.day}-${workout.title}`} className="glass rounded-[2rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-emerald-200">{workout.day}</p>
                      <h2 className="mt-2 text-2xl font-black text-white">{workout.title}</h2>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/72">{workout.intensity}</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {workout.blocks.map((block) => (
                      <div key={block} className="rounded-2xl bg-white/7 p-4 text-sm font-semibold text-white/76">
                        {block}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-6 text-white/48">{workout.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function buildPlan({
  goal,
  level,
  frequency,
  duration,
  equipment,
}: {
  goal: string;
  level: string;
  frequency: string;
  duration: string;
  equipment: string;
}) {
  const gym = equipment === "Palestra";
  const short = duration === "30 minuti";
  const long = duration === "60+ minuti";
  const beginner = level === "Principiante";
  const advanced = level === "Avanzato";
  const highFrequency = frequency === "5+ giorni";
  const lowFrequency = frequency === "2 giorni";

  const summary = lowFrequency
    ? "Full body sostenibile"
    : highFrequency
      ? advanced
        ? "Split avanzato ad alto volume"
        : "Routine frequente ma controllata"
      : goal === "Dimagrire"
        ? "Circuiti metabolici"
        : goal === "Mettere massa"
          ? "Split ipertrofia"
          : "Approccio bilanciato";

  const strategy =
    goal === "Dimagrire"
      ? "Più circuiti, recuperi brevi e cardio intelligente."
      : goal === "Mettere massa"
        ? "Progressive overload, volume mirato e recuperi completi."
        : "Forza, cardio e mobilità distribuiti senza estremi.";

  const highlights = [
    beginner ? "Volume basso e tecnica semplice" : advanced ? "Volume alto e split più specifico" : "Intensità moderata e buona varietà",
    short ? "Sedute compatte da 30 minuti" : long ? "Più esercizi e volume extra" : "Durata equilibrata da 45 minuti",
    gym ? "Uso completo di attrezzi e macchine" : "Solo corpo libero e attrezzi domestici",
  ];

  const baseDays = lowFrequency ? ["Lun", "Gio"] : highFrequency ? ["Lun", "Mar", "Mer", "Gio", "Ven"] : ["Lun", "Mer", "Ven", "Sab"];

  let days: PlanDay[];

  if (goal === "Dimagrire") {
    days = fatLossPlan({ baseDays, beginner, advanced, gym, short, long, lowFrequency, highFrequency });
  } else if (goal === "Mettere massa") {
    days = musclePlan({ baseDays, beginner, advanced, gym, short, long, lowFrequency, highFrequency });
  } else {
    days = generalPlan({ baseDays, beginner, advanced, gym, short, long, lowFrequency, highFrequency });
  }

  return {
    days,
    highlights,
    strategy,
    summary,
  };
}

function fatLossPlan(options: PlanOptions): PlanDay[] {
  const { baseDays, beginner, advanced, gym, short, long, lowFrequency, highFrequency } = options;
  const strengthMove = gym ? "Goblet squat o leg press" : "Squat a corpo libero";
  const pullMove = gym ? "Lat machine" : "Rematore con zaino";
  const cardio = gym ? "Bike o tapis roulant" : "Step-up e jumping jack";

  if (lowFrequency) {
    return baseDays.map((day, index) => ({
      day,
      title: `Full body brucia-grassi ${index + 1}`,
      intensity: beginner ? "Controllata" : "Metabolica",
      blocks: compact([
        `${strengthMove} ${beginner ? "3x10" : "4x12"}`,
        `${pullMove} ${beginner ? "3x10" : "4x12"}`,
        `${cardio} ${short ? "8 min" : "12 min"} a intervalli`,
        long ? "Core circuit 3 giri" : "",
      ]),
      note: "Recuperi brevi, ritmo alto e tecnica pulita: l'obiettivo è consumare senza perdere qualità.",
    }));
  }

  const templates = highFrequency
    ? ["Circuito lower", "Cardio zone 2", "Circuito upper", "HIIT tecnico", "Full body leggero"]
    : ["Circuito full body", "Upper + cardio", "Lower metabolico", "Conditioning"];

  return templates.map((title, index) => ({
    day: baseDays[index],
    title,
    intensity: advanced ? "Alta" : beginner ? "Facile" : "Media",
    blocks: compact([
      gym ? "Superset macchina + manubri 4 giri" : "Circuito corpo libero 4 giri",
      beginner ? "2 esercizi base, 45 sec lavoro" : "3 esercizi, 40 sec lavoro / 20 sec pausa",
      `${cardio} ${short ? "6-8 min" : long ? "15-18 min" : "10-12 min"}`,
      advanced && long ? "Finisher EMOM 8 min" : "",
    ]),
    note: "Più densità, meno recupero: ogni seduta resta breve, leggibile e sostenibile.",
  }));
}

function musclePlan(options: PlanOptions): PlanDay[] {
  const { baseDays, beginner, advanced, gym, short, long, lowFrequency, highFrequency } = options;
  const press = gym ? "Chest press o panca manubri" : "Push-up controllati";
  const row = gym ? "Row machine" : "Rematore con elastico";
  const legs = gym ? "Leg press + leg curl" : "Affondi + hip thrust da terra";

  if (lowFrequency) {
    return baseDays.map((day, index) => ({
      day,
      title: `Full body ipertrofia ${index + 1}`,
      intensity: beginner ? "Tecnica" : "Progressiva",
      blocks: compact([
        `${legs} ${beginner ? "3x8" : "4x8-10"}`,
        `${press} ${beginner ? "3x8" : "4x10"}`,
        `${row} ${beginner ? "3x10" : "4x10-12"}`,
        long ? "Isolamento braccia/spalle 3x12" : "",
      ]),
      note: "Progressione semplice: quando completi tutte le ripetizioni, aumenta poco il carico o il controllo.",
    }));
  }

  const templates = highFrequency
    ? advanced
      ? ["Push pesante", "Pull volume", "Gambe quad focus", "Upper pump", "Posteriori + braccia"]
      : ["Upper", "Lower", "Push", "Pull", "Gambe leggera"]
    : ["Upper ipertrofia", "Lower ipertrofia", "Push/Pull", "Gambe + richiamo"];

  return templates.map((title, index) => ({
    day: baseDays[index],
    title,
    intensity: advanced ? "Alta" : beginner ? "Moderata" : "Solida",
    blocks: compact([
      gym ? "Multiarticolare principale 4x6-8" : "Variante lenta a corpo libero 4x8-12",
      short ? "2 accessori mirati 3x10" : "3 accessori mirati 3-4x10-12",
      long ? "Isolamento finale 3x15 + mobilità" : "Recupero 75-90 sec",
      advanced ? "Ultima serie RPE 8-9" : "",
    ]),
    note: "Focus su volume utile, recuperi completi e carichi tracciabili settimana dopo settimana.",
  }));
}

function generalPlan(options: PlanOptions): PlanDay[] {
  const { baseDays, beginner, advanced, gym, short, long, lowFrequency, highFrequency } = options;
  const hinge = gym ? "Stacco rumeno manubri" : "Hip hinge a corpo libero";
  const push = gym ? "Shoulder press macchina" : "Push-up inclinati";
  const conditioning = gym ? "Rower o bike" : "Camminata veloce + core";

  if (lowFrequency) {
    return baseDays.map((day, index) => ({
      day,
      title: `Full body bilanciata ${index + 1}`,
      intensity: beginner ? "Base" : "Media",
      blocks: compact([
        `${hinge} ${beginner ? "3x8" : "4x8"}`,
        `${push} ${beginner ? "3x8" : "4x10"}`,
        `${conditioning} ${short ? "8 min" : "12 min"}`,
        long ? "Mobilità anche e spalle 10 min" : "",
      ]),
      note: "Pochi movimenti, ben scelti: forza, fiato e mobilità senza sovraccaricare la settimana.",
    }));
  }

  const templates = highFrequency
    ? ["Forza full body", "Cardio tecnico", "Upper + core", "Lower + mobilità", "Conditioning leggero"]
    : ["Full body forza", "Cardio + mobilità", "Upper/Lower mix", "Condizionamento"];

  return templates.map((title, index) => ({
    day: baseDays[index],
    title,
    intensity: advanced ? "Vivace" : beginner ? "Accessibile" : "Equilibrata",
    blocks: compact([
      gym ? "Pattern squat/push/pull con attrezzi" : "Pattern squat/push/pull corpo libero",
      short ? "Circuito principale 20 min" : "Blocco forza + blocco cardio",
      long ? "Extra mobilità e core 12 min" : `${conditioning} ${beginner ? "facile" : "moderato"}`,
      advanced ? "Progressione tecnica su tempo o carico" : "",
    ]),
    note: "Scheda ampia ma sostenibile: abbastanza varietà per migliorare senza inseguire ogni trend.",
  }));
}

type PlanOptions = {
  advanced: boolean;
  baseDays: string[];
  beginner: boolean;
  gym: boolean;
  highFrequency: boolean;
  long: boolean;
  lowFrequency: boolean;
  short: boolean;
};

function compact(items: string[]) {
  return items.filter(Boolean);
}

function Selector({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-bold text-white/62">{label}</p>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              value === option ? "bg-white text-slate-950" : "bg-white/8 text-white/70 hover:bg-white/12"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
