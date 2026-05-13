import Link from "next/link";
import { navItems } from "@/data/fitlife";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mesh-bg min-h-screen overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05070c]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300 text-lg font-black text-slate-950">
              F
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight">FitFilter AI</span>
              <span className="block text-xs text-white/48">Coach fitness AI</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/66 transition hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/analyzer"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-200"
          >
            Analizza il reel
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-white/46">
        FitFilter AI è una demo non medica: non fa diagnosi, non cura e non sostituisce il parere di professionisti qualificati.
      </footer>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">{title}</h1>
      <p className="mt-5 text-base leading-7 text-white/62 sm:text-lg">{body}</p>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="glass rounded-[2rem] p-5">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-white/58">{detail}</p>
    </div>
  );
}

export function PhonePreview() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-white/14 bg-slate-950 p-3 shadow-2xl shadow-emerald-950/30">
      <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#101621]">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(42,245,177,.3),transparent_42%),linear-gradient(20deg,rgba(96,165,250,.25),transparent_38%)]" />
        <div className="absolute inset-x-5 top-5 flex items-center justify-between text-xs text-white/70">
          <span>Reel FitFilter</span>
          <span className="rounded-full bg-emerald-300 px-2 py-1 font-bold text-slate-950">AI attiva</span>
        </div>
        <div className="absolute left-5 right-5 top-24 rounded-3xl border border-white/12 bg-black/32 p-4">
          <div className="h-56 rounded-2xl bg-[linear-gradient(135deg,#202b3b,#111827_55%,#1d4ed8)]">
            <div className="flex h-full items-end p-4">
              <div className="w-full rounded-2xl bg-black/42 p-3 text-sm text-white">
                Profondità squat rilevata: 94%
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Ritmo", "Ginocchia", "Profondità"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/8 p-3 text-center text-xs text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-5 rounded-3xl bg-white p-4 text-slate-950">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Prossima azione</p>
          <p className="mt-2 text-lg font-black">Aggiungi mobilità caviglie prima dei set pesanti.</p>
        </div>
      </div>
    </div>
  );
}
