"use client";

import { useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { workouts } from "@/data/fitlife";

const goals = ["Aumentare forza", "Massa magra", "Atleta ibrido"];
const levels = ["Principiante", "Intermedio", "Avanzato"];

export default function PlanPage() {
  const [goal, setGoal] = useState(goals[0]);
  const [level, setLevel] = useState(levels[1]);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Generatore piano"
          title="Una settimana di allenamento che sembra fatta per te."
          body="Scegli obiettivo e livello per creare una scheda simulata con forza, condizionamento, recupero e progressione sostenibile."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="glass h-fit rounded-[2rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Dati</p>
            <div className="mt-6 space-y-6">
              <Selector label="Obiettivo" value={goal} options={goals} onChange={setGoal} />
              <Selector label="Livello" value={level} options={levels} onChange={setLevel} />
            </div>
            <div className="mt-6 rounded-3xl bg-emerald-300 p-5 text-slate-950">
              <p className="text-sm font-bold">Focus generato</p>
              <p className="mt-2 text-2xl font-black">{goal}</p>
              <p className="mt-2 text-sm font-semibold">Progressione tarata su un profilo {level.toLowerCase()}.</p>
            </div>
          </aside>
          <div className="grid gap-4 md:grid-cols-2">
            {workouts.map((workout) => (
              <article key={workout.day} className="glass rounded-[2rem] p-6">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
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
