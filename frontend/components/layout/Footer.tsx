import { FadeIn } from "../ui";
import { SITE_CONFIG, FOOTER_LINKS, PROVINCES } from "@/lib/constant";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-14 pb-10 relative overflow-hidden">

      {/* 🌫️ soft glow background */}
      <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">

        <FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">

            {/* BRAND */}
            <div>
              <a href="#" className="flex items-center gap-2.5 mb-4 w-fit">

                <span className="
                  w-8 h-8
                  rounded-xl
                  bg-gradient-main
                  grid place-items-center
                  text-white
                  font-bold
                  shadow-md
                ">
                  M
                </span>

                <span className="font-semibold text-foreground text-sm">
                  {SITE_CONFIG.name}
                  <span className="text-muted-foreground font-normal">
                    {SITE_CONFIG.domain}
                  </span>
                </span>

              </a>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mb-5">
                Plateforme cartographique civique pour les 6 provinces de Madagascar.
                Projet Smart City — open data, code ouvert.
              </p>

              <div className="flex gap-2">

                <span className="
                  font-mono text-[11px]
                  border border-border
                  rounded-full px-3 py-1
                  text-muted-foreground
                  bg-surface
                ">
                  {SITE_CONFIG.version}
                </span>

                <span className="
                  font-mono text-[11px]
                  border border-green-500/30
                  rounded-full px-3 py-1
                  text-green-600
                  bg-green-500/10
                ">
                  ● {SITE_CONFIG.status}
                </span>

              </div>
            </div>

            {/* LINKS */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h5 className="
                  font-mono text-xs
                  uppercase tracking-widest
                  text-muted-foreground
                  mb-4
                ">
                  {col.title}
                </h5>

                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="
                          text-sm
                          text-muted-foreground
                          hover:text-foreground
                          transition
                          hover:translate-x-1
                          inline-block
                        "
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* BOTTOM BAR */}
          <div className="
            border-t border-border
            pt-6
            flex flex-col md:flex-row
            justify-between
            items-start md:items-center
            gap-3
          ">

            <span className="text-xs text-muted-foreground font-mono tracking-wide">
              © 2026 · Carte.mg · Smart City Madagascar
            </span>

            <span className="text-xs text-muted-foreground font-mono tracking-wide">
              {PROVINCES.map((p) => p.name).join(" · ")}
            </span>

          </div>

        </FadeIn>
      </div>
    </footer>
  );
}