import { AppShell, SectionHeader } from "@/components/app-shell";
import { rewards } from "@/data/fitlife";

export default function RewardsPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Ricompense"
          title="Rendi la costanza qualcosa a cui vuoi tornare."
          body="Premi, badge e sblocchi simulati chiudono il loop del prodotto senza pagamenti, account o servizi backend."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {rewards.map((reward) => (
            <article key={reward.title} className="glass rounded-[2rem] p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl font-black text-slate-950">
                {reward.title.slice(0, 1)}
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">{reward.accent}</p>
              <h2 className="mt-3 text-3xl font-black">{reward.title}</h2>
              <p className="mt-4 text-white/58">{reward.cost}</p>
              <div className="mt-6 rounded-2xl bg-white/8 p-4 text-sm font-bold text-white/76">{reward.status}</div>
            </article>
          ))}
        </div>
        <div className="glass mt-6 rounded-[2rem] p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {["Serie da 14 giorni", "8 miglioramenti tecnici", "3 recuperi salvati"].map((badge) => (
              <div key={badge} className="rounded-3xl bg-white/7 p-5">
                <p className="text-4xl font-black text-emerald-200">★</p>
                <p className="mt-3 font-black">{badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
