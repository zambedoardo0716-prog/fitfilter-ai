import Link from "next/link";
import { AppShell, MetricCard, PhonePreview } from "@/components/app-shell";
import { analyzerMetrics, checkInSignals, friends, rewards, workouts } from "@/data/fitlife";

export default function Home() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-200">
            AI fitness coach for short-form athletes
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
            Turn every workout reel into a smarter training week.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
            FitLife AI analyzes fitness clips, builds adaptive workout plans, checks recovery, and keeps friends chasing streaks in one premium demo experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/analyzer" className="rounded-full bg-emerald-300 px-6 py-3 text-center font-black text-slate-950 transition hover:bg-emerald-200">
              Try analyzer
            </Link>
            <Link href="/plan" className="rounded-full border border-white/14 px-6 py-3 text-center font-bold text-white transition hover:bg-white/8">
              Generate plan
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {analyzerMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
        <PhonePreview />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          ["Reel analyzer", "AI movement insights from mock TikTok-style clips."],
          ["Plan generator", `${workouts.length} adaptive weekly training blocks.`],
          ["Recovery check-in", `${checkInSignals.length} daily readiness signals.`],
          ["Social rewards", `${friends.length} friends and ${rewards.length} unlock paths.`],
        ].map(([title, body]) => (
          <div key={title} className="glass rounded-[2rem] p-6">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
