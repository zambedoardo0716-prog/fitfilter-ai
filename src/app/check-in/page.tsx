"use client";

import { useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { checkInSignals } from "@/data/fitlife";

export default function CheckInPage() {
  const [readiness, setReadiness] = useState(82);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Controllo giornaliero"
          title="Capisci quando spingere e quando recuperare."
          body="Un check-in essenziale che trasforma segnali simulati di recupero in indicazioni pratiche per allenarti meglio."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass rounded-[2rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Prontezza</p>
            <div className="mt-6 flex items-end gap-4">
              <span className="text-7xl font-black">{readiness}</span>
              <span className="pb-3 text-white/52">/ 100</span>
            </div>
            <input
              aria-label="Punteggio prontezza"
              type="range"
              min="45"
              max="98"
              value={readiness}
              onChange={(event) => setReadiness(Number(event.target.value))}
              className="mt-8 w-full accent-emerald-300"
            />
            <div className="mt-8 rounded-3xl bg-white p-5 text-slate-950">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Today&apos;s call</p>
              <p className="mt-2 text-2xl font-black">
                {readiness > 84 ? "Via libera all'intensità." : readiness > 68 ? "Allenati, ma tieni una ripetizione di margine." : "Giornata orientata al recupero."}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {checkInSignals.map((signal) => (
              <div key={signal.label} className="glass rounded-[2rem] p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-black">{signal.label}</h2>
                  <span className="font-mono text-sm text-emerald-200">{signal.score}</span>
                </div>
                <p className="mt-3 text-3xl font-black">{signal.value}</p>
                <div className="mt-5 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${signal.score}%` }} />
                </div>
              </div>
            ))}
            <div className="glass rounded-[2rem] p-6 sm:col-span-2">
              <h2 className="text-2xl font-black">Protocollo recupero</h2>
              <p className="mt-4 text-white/62">
                Parti con dieci minuti di mobilità, tieni moderati gli accessori per le gambe e programma la prossima seduta intensa dopo un&apos;altra buona notte di sonno.
              </p>
              <p className="mt-5 text-xs leading-5 text-white/42">
                Questo check-in non è un consiglio medico e non va usato per diagnosi o gestione di infortuni.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
