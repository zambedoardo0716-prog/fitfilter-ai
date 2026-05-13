import { AppShell, SectionHeader } from "@/components/app-shell";
import { friends } from "@/data/fitlife";

export default function LeaderboardPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Classifica amici"
          title="Le serie rendono visibile la costanza."
          body="Una superficie social con XP, sfide settimanali e un pizzico di competizione per mantenere alta la motivazione."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="glass rounded-[2rem] p-4 sm:p-6">
            <div className="grid gap-3">
              {friends.map((friend, index) => (
                <div
                  key={friend.name}
                  className={`grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-3xl p-4 ${
                    friend.name === "Tu" ? "bg-emerald-300 text-slate-950" : "bg-white/7 text-white"
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/18 font-black">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-lg font-black">{friend.name}</p>
                    <p className={friend.name === "Tu" ? "text-sm text-slate-800" : "text-sm text-white/52"}>
                      serie da {friend.streak} giorni
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-black">{friend.xp.toLocaleString()}</p>
                    <p className={friend.trend.startsWith("+") ? "text-sm font-bold text-emerald-100" : "text-sm font-bold text-white/45"}>
                      {friend.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="grid gap-4">
            {["5.000 passi prima di pranzo", "Tre pasti ricchi di proteine", "Mobilita salva-serie"].map((challenge, index) => (
              <div key={challenge} className="glass rounded-[2rem] p-6">
                <p className="text-sm font-bold text-emerald-200">Sfida {index + 1}</p>
                <h2 className="mt-3 text-2xl font-black">{challenge}</h2>
                <p className="mt-4 text-sm leading-6 text-white/56">Guadagna XP bonus e proteggi la tua posizione settimanale.</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
