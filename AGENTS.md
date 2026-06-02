Codex · Etappe 1 — Token-Block (:root) + Atlas-Fonts

BRANCH: Arbeite auf `redesign`. Base und Ziel = `redesign`, nicht main.
Beachte AGENTS.md (harte Grenzen, Token-Strategie, Smoke-Test).

In dieser Etappe NUR CSS im <style>-Block + ein <link> im <head>.
Kein JS, kein Render-Code.

AUFGABEN

1) Fonts laden. Direkt nach den <meta>-Tags im <head> (vor <style>) einfügen:

   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">

2) :root-Block ersetzen (aktuell Zeilen 8–61). Helle Atlas-Tokens aus
   DESIGN.md §2 als neue kanonische Variablen. Behalte ALLE bestehenden
   --rt-*- und Alias-Namen, zeige sie auf die hellen Werte um:

   --rt-bg            #F4ECDC
   --rt-bg-elevated   #EADFC9
   --rt-surface       #FCF8EF
   --rt-surface-2     #F6EFE0
   --rt-surface-3     #EFE6D2
   --rt-surface-quiet #F6EFE0
   --rt-border-line   #E3D8C1
   --rt-border-strong #CFC0A3
   --rt-ink           #2C2419
   --rt-ink-mid       #6C6051
   --rt-ink-dim       #9A8B73
   --rt-on-accent     #FBF4E8
   --rt-gold          #C24A2B            (Gold-Slot wird der eine Zinnober-Akzent)
   --rt-gold-soft     rgba(194,74,43,0.10)
   --rt-indigo        #4F6E89            (Indigo wird ruhiger Info-Ton, KEIN zweiter Primary)
   --rt-indigo-soft   rgba(79,110,137,0.12)
   --rt-success       #4F7A52
   --rt-warning       #A9772B
   --rt-danger        #A8432B
   --rt-info          #4F6E89
   (zugehörige -soft-Werte aus DESIGN.md §2 übernehmen)
   --ring             0 0 0 3px rgba(194,74,43,0.28)

   Ergänze zusätzlich im selben :root die neuen kanonischen Tokens aus
   DESIGN.md §2: --paper, --surface, --rule, --accent, --accent-hi,
   --accent-deep, --hue-* , --sh-1/-2/-3, Radius-Skala.

   Fonts:
   --font-ui     "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif
   --font-serif  "Cormorant Garamond", "Iowan Old Style", Georgia, serif
   --font-mono   bleibt (IBM Plex Mono ist schon vorhanden)

3) Theme-Klassen angleichen. body.theme-light (Z. 63 ff.) und der Default
   theme-dark mit den neuen hellen Tokens konsistent machen. Atlas ist hell:
   theme-light als Atlas-Default mappen; sicherstellen, dass body.theme-dark
   KEINE dunklen Hex-Werte mehr erzwingt, die :root überschreiben (neutralisieren
   oder auf die hellen Tokens zeigen). body.theme-eink bleibt funktional (alles
   --ink/--rule, kein gefüllter Akzent), nur Farbwerte an die warme Palette
   angleichen. Theme-Werte (theme-dark/-light/-eink) und id="themeSelect" NICHT
   umbenennen.

SMOKE-TEST (ausführen + berichten)
- node -e Syntaxcheck nach Muster aus readme.md
- App lädt ohne Konsolenfehler; Projekt mit Features/Sprints rendert
- App durchgehend hell — kein weiß-auf-weiß, kein dunkler :root-Override-Rest
- Theme-Wechsel Light↔E-Ink ohne Token-Lücke, E-Ink ohne gefüllten Akzent

COMMIT
feat(atlas): light token block + Atlas fonts, legacy vars aliased
