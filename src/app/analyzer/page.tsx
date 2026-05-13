"use client";

import { useMemo, useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";

const levels = ["Beginner", "Intermediate", "Advanced"];
const goals = ["Build strength", "Lose fat", "Improve athleticism", "Gain muscle"];
const frequencies = ["2-3 days/week", "4 days/week", "5+ days/week"];
const limitationOptions = ["None", "Knee sensitivity", "Lower back tightness", "Shoulder limitation"];
const loadingSteps = ["Reading reel frames", "Mapping movement path", "Matching your training context", "Building coaching cues"];

type FlowState = "onboarding" | "loading" | "results";

export default function AnalyzerPage() {
  const [flow, setFlow] = useState<FlowState>("onboarding");
  const [level, setLevel] = useState(levels[1]);
  const [goal, setGoal] = useState(goals[0]);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [limitations, setLimitations] = useState(limitationOptions[0]);
  const [reelUrl, setReelUrl] = useState("");
  const [clipLabel, setClipLabel] = useState("No file selected");

  const analysis = useMemo(() => {
    const levelOffset = level === "Advanced" ? 4 : level === "Beginner" ? -3 : 0;
    const limitationOffset = limitations === "None" ? 3 : -4;
    const frequencyOffset = frequency === "5+ days/week" ? 2 : frequency === "2-3 days/week" ? -1 : 0;
    const form = 86 + levelOffset + limitationOffset;
    const power = 80 + frequencyOffset + (goal === "Improve athleticism" ? 5 : 0);
    const control = 78 + limitationOffset + (level === "Beginner" ? 2 : 0);
    const readiness = Math.round((form + power + control) / 3);

    return {
      form,
      power,
      control,
      readiness,
      headline:
        limitations === "None"
          ? `${level} ${goal.toLowerCase()} profile with strong training capacity.`
          : `${level} ${goal.toLowerCase()} profile with ${limitations.toLowerCase()} safeguards.`,
      cue:
        limitations === "Knee sensitivity"
          ? "Keep shins quieter on the eccentric and use a slightly slower tempo before adding load."
          : limitations === "Lower back tightness"
            ? "Brace before the descent and shorten range when fatigue changes your torso angle."
            : limitations === "Shoulder limitation"
              ? "Keep pressing volume moderate and bias neutral-grip accessories this week."
              : "Your rep rhythm is clean enough to progress, but the final third still needs control.",
      prescription:
        goal === "Lose fat"
          ? "Pair this with short conditioning finishers after strength work."
          : goal === "Gain muscle"
            ? "Use controlled eccentrics and add one back-off set for hypertrophy."
            : goal === "Improve athleticism"
              ? "Add low-volume plyometrics before heavy lifts while freshness is high."
              : "Progress load slowly and keep the top set at one rep in reserve.",
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
          eyebrow="Reel analyzer"
          title="Personalized AI form analysis in seconds."
          body="A premium mock flow that captures training context, accepts a reel link or upload, then generates a futuristic local-only report."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="glass h-fit rounded-[2rem] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">Analyzer flow</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">
                {flow === "onboarding" ? "01 setup" : flow === "loading" ? "02 scan" : "03 report"}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <Step active={flow === "onboarding"} done={flow !== "onboarding"} label="Profile and reel" />
              <Step active={flow === "loading"} done={flow === "results"} label="AI movement scan" />
              <Step active={flow === "results"} done={false} label="Personalized report" />
            </div>
            <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <p className="text-sm font-bold text-emerald-100">Local demo mode</p>
              <p className="mt-2 text-sm leading-6 text-white/56">
                No backend, auth, or real upload processing. All answers are generated from local mock state.
              </p>
            </div>
          </aside>

          {flow === "onboarding" && (
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div className="glass rounded-[2rem] p-5 sm:p-6">
                <div className="grid gap-6">
                  <OptionGroup label="Fitness level" value={level} options={levels} onChange={setLevel} />
                  <OptionGroup label="Training goal" value={goal} options={goals} onChange={setGoal} />
                  <OptionGroup label="Training frequency" value={frequency} options={frequencies} onChange={setFrequency} />
                  <OptionGroup label="Injuries or limitations" value={limitations} options={limitationOptions} onChange={setLimitations} />
                </div>
              </div>

              <div className="glass rounded-[2rem] p-5 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">Reel source</p>
                <label className="mt-5 block text-sm font-bold text-white/70" htmlFor="reel-url">
                  Reel or TikTok URL
                </label>
                <input
                  id="reel-url"
                  value={reelUrl}
                  onChange={(event) => setReelUrl(event.target.value)}
                  placeholder="https://tiktok.com/@fitlife/reel"
                  className="mt-3 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/32 focus:border-emerald-300/70"
                />
                <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/36">
                  <span className="h-px flex-1 bg-white/10" />
                  or
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/18 bg-white/6 p-5 text-center transition hover:border-emerald-300/50 hover:bg-emerald-300/8">
                  <input
                    type="file"
                    accept="video/*"
                    className="sr-only"
                    onChange={(event) => setClipLabel(event.target.files?.[0]?.name ?? "No file selected")}
                  />
                  <span className="text-4xl font-black text-emerald-200">+</span>
                  <span className="mt-3 text-sm font-bold text-white">Upload demo clip</span>
                  <span className="mt-2 max-w-52 text-xs leading-5 text-white/44">{clipLabel}</span>
                </label>
                <button
                  onClick={runAnalysis}
                  className="mt-5 w-full rounded-2xl bg-emerald-300 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-200"
                >
                  Generate AI analysis
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
                        <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">AI REPORT</span>
                        <span className="text-xs text-white/54">{reelUrl ? "URL analyzed" : clipLabel}</span>
                      </div>
                      <div>
                        <p className="text-7xl font-black">{analysis.readiness}</p>
                        <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">fit score</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">Personalized insight</p>
                    <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{analysis.headline}</h2>
                    <p className="mt-5 text-base leading-8 text-white/62">{analysis.cue}</p>
                    <p className="mt-4 text-base leading-8 text-white/62">{analysis.prescription}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <Score label="Form" value={analysis.form} />
                      <Score label="Power" value={analysis.power} />
                      <Score label="Control" value={analysis.control} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  `Plan around ${frequency.toLowerCase()}`,
                  limitations === "None" ? "No limitation flags" : `Protect: ${limitations}`,
                  `Goal bias: ${goal}`,
                ].map((item) => (
                  <div key={item} className="glass rounded-[2rem] p-5">
                    <p className="text-sm font-bold text-white/78">{item}</p>
                    <p className="mt-3 text-sm leading-6 text-white/48">Mock recommendation generated locally from your setup answers.</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setFlow("onboarding")}
                  className="rounded-2xl border border-white/14 px-5 py-4 text-sm font-bold text-white transition hover:bg-white/8"
                >
                  Edit inputs
                </button>
                <button
                  onClick={runAnalysis}
                  className="rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-200"
                >
                  Re-run mock AI scan
                </button>
              </div>

              <p className="text-xs leading-5 text-white/42">
                Non-medical demo feedback. Stop if you feel pain and consult a qualified professional for health concerns.
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
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">FitLife AI is analyzing</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight">Building your personalized movement report.</h2>
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
