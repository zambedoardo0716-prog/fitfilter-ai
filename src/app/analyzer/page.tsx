"use client";

import { useMemo, useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";

const levels = ["Principiante", "Intermedio", "Avanzato"];
const goals = ["Aumentare forza", "Dimagrire", "Migliorare atletismo", "Mettere massa"];
const frequencies = ["2-3 giorni/settimana", "4 giorni/settimana", "5+ giorni/settimana"];
const limitationOptions = ["Nessuna", "Ginocchia sensibili", "Schiena rigida", "Limitazione alle spalle"];
const loadingSteps = ["Leggo i frame del reel", "Traccio la traiettoria", "Incrocio il tuo contesto", "Creo indicazioni personalizzate"];

type FlowState = "onboarding" | "loading" | "results";

export default function AnalyzerPage() {
  const [flow, setFlow] = useState<FlowState>("onboarding");
  const [level, setLevel] = useState(levels[1]);
  const [goal, setGoal] = useState(goals[0]);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [limitations, setLimitations] = useState(limitationOptions[0]);
  const [reelUrl, setReelUrl] = useState("");
  const [clipLabel, setClipLabel] = useState("Nessun file selezionato");

  const analysis = useMemo(() => {
    const levelOffset = level === "Avanzato" ? 4 : level === "Principiante" ? -3 : 0;
    const limitationOffset = limitations === "Nessuna" ? 3 : -4;
    const frequencyOffset = frequency === "5+ giorni/settimana" ? 2 : frequency === "2-3 giorni/settimana" ? -1 : 0;
    const form = 86 + levelOffset + limitationOffset;
    const power = 80 + frequencyOffset + (goal === "Migliorare atletismo" ? 5 : 0);
    const control = 78 + limitationOffset + (level === "Principiante" ? 2 : 0);
    const readiness = Math.round((form + power + control) / 3);

    return {
      form,
      power,
      control,
      readiness,
      headline:
        limitations === "Nessuna"
          ? `Profilo ${level.toLowerCase()} orientato a ${goal.toLowerCase()}, con buona capacità di lavoro.`
          : `Profilo ${level.toLowerCase()} orientato a ${goal.toLowerCase()}, con attenzione a ${limitations.toLowerCase()}.`,
      cue:
        limitations === "Ginocchia sensibili"
          ? "Mantieni le tibie più stabili in discesa e rallenta leggermente il ritmo prima di aumentare il carico."
          : limitations === "Schiena rigida"
            ? "Attiva il core prima della discesa e riduci il range quando la fatica cambia l'inclinazione del busto."
            : limitations === "Limitazione alle spalle"
              ? "Tieni moderato il volume di spinta e preferisci accessori con presa neutra questa settimana."
              : "Il ritmo delle ripetizioni è pulito: puoi progredire, ma l'ultima parte del set richiede più controllo.",
      prescription:
        goal === "Dimagrire"
          ? "Abbina il lavoro di forza a finisher brevi di conditioning, senza trasformare ogni seduta in massacro."
          : goal === "Mettere massa"
            ? "Usa eccentriche controllate e aggiungi un back-off set per stimolare ipertrofia."
            : goal === "Migliorare atletismo"
              ? "Inserisci pliometria a basso volume prima dei carichi pesanti, quando sei ancora fresco."
              : "Aumenta il carico con gradualità e tieni il set principale con una ripetizione di margine.",
    };
  }, [frequency, goal, level, limitations]);

  function runAnalysis() {
    setFlow("loading");
    window.setTimeout(() => setFlow("results"), 2300);
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Analizza il reel"
          title="Analisi AI personalizzata, senza complicazioni."
          body="Un percorso premium che raccoglie il tuo contesto, accetta un link o un caricamento simulato e genera un report locale chiaro, realistico e utile."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="glass h-fit rounded-[2rem] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">Percorso analisi</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">
                {flow === "onboarding" ? "01 dati" : flow === "loading" ? "02 scansione" : "03 report"}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <Step active={flow === "onboarding"} done={flow !== "onboarding"} label="Profilo e reel" />
              <Step active={flow === "loading"} done={flow === "results"} label="Scansione movimento AI" />
              <Step active={flow === "results"} done={false} label="Report personalizzato" />
            </div>
            <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <p className="text-sm font-bold text-emerald-100">Demo locale</p>
              <p className="mt-2 text-sm leading-6 text-white/56">
                Nessun backend, login o caricamento reale. Le risposte nascono solo da dati simulati in locale.
              </p>
            </div>
          </aside>

          {flow === "onboarding" && (
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div className="glass rounded-[2rem] p-5 sm:p-6">
                <div className="grid gap-6">
                  <OptionGroup label="Livello fitness" value={level} options={levels} onChange={setLevel} />
                  <OptionGroup label="Obiettivo" value={goal} options={goals} onChange={setGoal} />
                  <OptionGroup label="Frequenza di allenamento" value={frequency} options={frequencies} onChange={setFrequency} />
                  <OptionGroup label="Fastidi o limitazioni" value={limitations} options={limitationOptions} onChange={setLimitations} />
                </div>
              </div>

              <div className="glass rounded-[2rem] p-5 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">Sorgente reel</p>
                <label className="mt-5 block text-sm font-bold text-white/70" htmlFor="reel-url">
                  Link Reel o TikTok
                </label>
                <input
                  id="reel-url"
                  value={reelUrl}
                  onChange={(event) => setReelUrl(event.target.value)}
                  placeholder="https://tiktok.com/@fitfilter/reel"
                  className="mt-3 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/32 focus:border-emerald-300/70"
                />
                <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/36">
                  <span className="h-px flex-1 bg-white/10" />
                  oppure
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/18 bg-white/6 p-5 text-center transition hover:border-emerald-300/50 hover:bg-emerald-300/8">
                  <input
                    type="file"
                    accept="video/*"
                    className="sr-only"
                    onChange={(event) => setClipLabel(event.target.files?.[0]?.name ?? "Nessun file selezionato")}
                  />
                  <span className="text-4xl font-black text-emerald-200">+</span>
                  <span className="mt-3 text-sm font-bold text-white">Carica una clip demo</span>
                  <span className="mt-2 max-w-52 text-xs leading-5 text-white/44">{clipLabel}</span>
                </label>
                <button
                  onClick={runAnalysis}
                  className="mt-5 w-full rounded-2xl bg-emerald-300 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-200"
                >
                  Genera analisi AI
                </button>
              </div>
            </div>
          )}

          {flow === "loading" && <LoadingPanel />}

          {flow === "results" && (
            <div className="grid gap-6">
              <div className="glass overflow-hidden rounded-[2rem]">
                <div className="grid gap-0 lg:grid-cols-[.8fr_1.2fr]">
                  <div className="relative min-h-[420px] bg-[#0f172a] p-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_18%,rgba(42,245,177,.28),transparent_18rem),linear-gradient(145deg,rgba(37,99,235,.45),transparent_60%)]" />
                    <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/12 bg-black/24 p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">REPORT AI</span>
                        <span className="text-xs text-white/54">{reelUrl ? "Link analizzato" : clipLabel}</span>
                      </div>
                      <div>
                        <p className="text-7xl font-black">{analysis.readiness}</p>
                        <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">punteggio fit</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">Insight personalizzato</p>
                    <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{analysis.headline}</h2>
                    <p className="mt-5 text-base leading-8 text-white/62">{analysis.cue}</p>
                    <p className="mt-4 text-base leading-8 text-white/62">{analysis.prescription}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <Score label="Tecnica" value={analysis.form} />
                      <Score label="Potenza" value={analysis.power} />
                      <Score label="Controllo" value={analysis.control} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  `Piano su ${frequency.toLowerCase()}`,
                  limitations === "Nessuna" ? "Nessun limite segnalato" : `Da proteggere: ${limitations}`,
                  `Focus: ${goal}`,
                ].map((item) => (
                  <div key={item} className="glass rounded-[2rem] p-5">
                    <p className="text-sm font-bold text-white/78">{item}</p>
                    <p className="mt-3 text-sm leading-6 text-white/48">Raccomandazione simulata e generata in locale dalle tue risposte.</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setFlow("onboarding")}
                  className="rounded-2xl border border-white/14 px-5 py-4 text-sm font-bold text-white transition hover:bg-white/8"
                >
                  Modifica dati
                </button>
                <button
                  onClick={runAnalysis}
                  className="rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-200"
                >
                  Rifai la scansione AI
                </button>
              </div>

              <p className="text-xs leading-5 text-white/42">
                Feedback demo non medico. Se senti dolore, fermati e consulta un professionista qualificato.
              </p>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}

function Step({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl p-3 ${active ? "bg-white/10" : "bg-white/5"}`}>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
          done ? "bg-emerald-300 text-slate-950" : active ? "bg-white text-slate-950" : "bg-white/10 text-white/50"
        }`}
      >
        {done ? "✓" : ""}
      </span>
      <span className={active ? "font-bold text-white" : "font-semibold text-white/52"}>{label}</span>
    </div>
  );
}

function OptionGroup({
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
      <p className="mb-3 text-sm font-bold text-white/66">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              value === option
                ? "bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-950/30"
                : "bg-white/8 text-white/70 hover:bg-white/12"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function LoadingPanel() {
  return (
    <div className="glass relative min-h-[560px] overflow-hidden rounded-[2rem] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(42,245,177,.22),transparent_20rem),radial-gradient(circle_at_80%_80%,rgba(96,165,250,.18),transparent_18rem)]" />
      <div className="relative flex min-h-[512px] flex-col items-center justify-center text-center">
        <div className="relative h-40 w-40">
          <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-emerald-300" />
          <div className="absolute inset-5 animate-pulse rounded-full border border-white/18 bg-white/8" />
          <div className="absolute inset-12 rounded-full bg-emerald-300 shadow-2xl shadow-emerald-300/30" />
        </div>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">FitFilter AI sta analizzando</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight">Sto preparando il tuo report personalizzato sul movimento.</h2>
        <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
          {loadingSteps.map((step) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/7 p-4 text-sm font-bold text-white/70">
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white/7 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white/60">{label}</p>
        <p className="font-mono text-lg font-black text-white">{value}</p>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
