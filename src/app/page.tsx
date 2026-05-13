import Link from "next/link";
import { AppShell, MetricCard, PhonePreview } from "@/components/app-shell";
import { analyzerMetrics, checkInSignals, friends, rewards, workouts } from "@/data/fitlife";

export default function Home() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-200">
            Il coach AI per chi si allena partendo dai reel
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
            Trasforma ogni reel fitness in una settimana di allenamento più intelligente.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
            FitFilter AI aiuta a trasformare contenuti fitness virali in piani realistici, personalizzati e sostenibili, con analisi tecnica, recupero e motivazione sociale in un&apos;unica esperienza premium.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/analyzer" className="rounded-full bg-emerald-300 px-6 py-3 text-center font-black text-slate-950 transition hover:bg-emerald-200">
              Analizza il reel
            </Link>
            <Link href="/plan" className="rounded-full border border-white/14 px-6 py-3 text-center font-bold text-white transition hover:bg-white/8">
              Crea il piano
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
          ["Analisi reel", "Insight AI sul movimento da clip in stile TikTok, con dati simulati."],
          ["Piano personalizzato", `${workouts.length} blocchi settimanali adattati al tuo obiettivo.`],
          ["Check-in recupero", `${checkInSignals.length} segnali giornalieri per capire quanto spingere.`],
          ["Motivazione sociale", `${friends.length} amici e ${rewards.length} percorsi premio da sbloccare.`],
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
