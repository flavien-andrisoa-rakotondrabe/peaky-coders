import { FadeIn } from "../ui";
import { SITE_CONFIG, FOOTER_LINKS, PROVINCES } from "@/lib/constant";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg pt-14 pb-10">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">
            {/* Brand column */}
            <div>
              <a href="#" className="flex items-center gap-2.5 mb-4 group w-fit">
                <span className="w-8 h-8 rounded-xl bg-gradient-main grid place-items-center text-white font-mono font-bold text-sm shadow-orange-sm">
                  M
                </span>
                <span className="font-heading font-bold text-[15px] text-ink">
                  {SITE_CONFIG.name}
                  <span className="text-ink-3 font-medium">{SITE_CONFIG.domain}</span>
                </span>
              </a>
              <p className="text-sm text-ink-2 leading-relaxed max-w-[260px] mb-5">
                Plateforme cartographique civique pour les 6 provinces de Madagascar.
                Projet Smart City — open data, code ouvert.
              </p>
              <div className="flex gap-2">
                <span className="font-mono text-[11px] border border-line rounded-full px-3 py-1 text-ink-3">
                  {SITE_CONFIG.version}
                </span>
                <span className="font-mono text-[11px] border border-emerald-400/40 rounded-full px-3 py-1 text-emerald-600 bg-emerald-50">
                  ● {SITE_CONFIG.status}
                </span>
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3 mb-4 font-semibold">
                  {col.title}
                </h5>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-2 hover:text-ink transition-colors hover:translate-x-0.5 inline-block transition-transform"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-line pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <span className="font-mono text-[11px] text-ink-3 tracking-wide">
              © 2026 · Carte.mg · Projet Smart City Madagascar
            </span>
            <span className="font-mono text-[10px] text-ink-3 tracking-wide">
              {PROVINCES.map((p) => p.name).join(" · ")}
            </span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}