
function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "image") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>;
  if (name === "mouse") return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="5"/><path d="M12 6v4"/></svg>;
  if (name === "play") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
  if (name === "sparkles") return <svg {...common}><path d="M12 3l1.7 5.1L19 10l-5.3 1.9L12 17l-1.7-5.1L5 10l5.3-1.9L12 3z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if (name === "trend") return <svg {...common}><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>;
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>;
  if (name === "instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
  return <svg {...common}><path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8c0 .3 0 .6.1.9A11.4 11.4 0 0 1 3.8 4.7a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 3 18.1 11.3 11.3 0 0 0 9.1 20c7.3 0 11.3-6 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1z"/></svg>;
}


function Logo({ big = false }: { big?: boolean }) {
  return (
    <div className={big ? "logo logo--big" : "logo"} aria-label="PIKET.pl">
      <span className="logo-main">PIKET</span><span className="logo-dot">.</span><span className="logo-pl">pl</span>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero section-surface" id="top">
      <div className="hero__bg-glow hero__bg-glow--left" />
      <div className="hero__bg-glow hero__bg-glow--right" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">JUŻ WKRÓTCE</p>
          <Logo big />
          <div className="hero__chips" aria-label="Główne hasła">
            <div className="hero-chip hero-chip--one">Kolekcjonuj</div>
            <div className="hero-chip hero-chip--two">Handluj</div>
            <div className="hero-chip hero-chip--three">Wygrywaj!</div>
          </div>
          <p className="hero__lead">Nowa platforma marketplace dla pasjonatów kart kolekcjonerskich. Wpisz się na listę i bądź pierwszym, który dołączy do rewolucji w handlu kartami.</p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn btn--primary">Dołącz do listy oczekujących</a>
            <a href="#how-it-works" className="btn btn--secondary">Zobacz jak to działa</a>
            <div className="mouse-indicator"><Icon name="mouse" size={22}/></div>
          </div>
        </div>
        <div className="hero__visual-wrap">
          <div className="hero__visual">
            <div className="image-placeholder">
              <div className="placeholder-icon"><Icon name="image" size={32}/></div>
              <strong>Wstaw tutaj obraz</strong>
              <span>Zastąp to placeholder'em swoim zdjęciem lub grafiką</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section className="intro-section" id="how-it-works">
      <div className="container center">
        <span className="pill">NADCHODZĄCA PREMIERA</span>
        <h2>Zobacz jak to działa</h2>
        <p>Poznaj platformę PIKET.pl w 60 sekund</p>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="video-section section-surface" id="video">
      <div className="container">
        <div className="video-box">
          <button className="play-button" aria-label="Odtwórz film"><Icon name="play" size={38}/></button>
          <p className="video-title">Wstaw tutaj URL filmu reklamowego</p>
          <p className="video-meta">Format: MP4, WebM lub YouTube embed</p>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: "sparkles", title: "Kolekcjonuj", text: "Odkryj najrzadsze i najbardziej wartościowe karty z całego świata w jednym miejscu" },
  { icon: "shield", title: "Handluj", text: "Bezpieczne transakcje z pełną weryfikacją autentyczności i gwarancją ochrony kupujących" },
  { icon: "trend", title: "Wygrywaj", text: "Śledź wartość swojej kolekcji w czasie rzeczywistym i inwestuj mądrze" },
];

function Benefits() {
  return (
    <section className="benefits section-surface">
      <div className="container">
        <div className="section-heading">
          <h2>Co Cię czeka?</h2>
          <p>Wszystko, czego potrzebujesz w jednym miejscu</p>
        </div>
        <div className="benefits__grid">
          {benefits.map(({ icon, title, text }) => (
            <article className="benefit-card" key={title}>
              <div className="benefit-icon"><Icon name={icon} size={37}/></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const types = [
  ["green", "Kupuję\nkarty"],
  ["blue", "Sprzedaję\nkarty"],
  ["purple", "Kupuję i\nsprzedaję"],
  ["orange", "Zostań\nsprzedawcą\nbeta"],
] as const;

function Waitlist() {
  return (
    <section className="waitlist" id="waitlist">
      <div className="container center">
        <div className="mail-hero"><Icon name="mail" size={48}/></div>
        <h2>Bądź pierwszym!</h2>
        <p className="waitlist__lead">Dołącz do listy oczekujących i otrzymaj wczesny dostęp</p>
        <p className="bonus"><Icon name="sparkles" size={22}/><span>Pierwsze <b>100 osób</b> otrzyma ekskluzywne bonusy</span></p>
        <h3>Jak chcesz korzystać z platformy?</h3>
        <div className="type-grid">
          {types.map(([color, label]) => (
            <button className={`type-card type-card--${color}`} key={color}>
              <span className="color-dot" />
              <span>{label.split("\n").map((line, idx) => <span key={`${color}-${idx}`}>{line}{idx < label.split("\n").length - 1 && <br />}</span>)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-surface">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p>Nadchodząca platforma marketplace dla pasjonatów kart kolekcjonerskich. Przygotowujemy coś wyjątkowego!</p>
          <div className="socials">
            <a href="#" aria-label="Instagram"><Icon name="instagram" size={24}/></a>
            <a href="#" aria-label="Twitter"><Icon name="twitter" size={24}/></a>
          </div>
        </div>
        <div className="footer-contact">
          <h3>Współpraca</h3>
          <p>Zainteresowany współpracą? Skontaktuj się z nami:</p>
          <a href="mailto:wspolpraca@piket.pl"><Icon name="mail" size={23}/>wspolpraca@piket.pl</a>
        </div>
      </div>
      <div className="container"><div className="footer-line" /><p className="copyright">© 2026 PIKET.pl. Wszystkie prawa zastrzeżone.</p></div>
    </footer>
  );
}

export default function Page() {
  return (<main><Hero/><HowItWorks/><VideoSection/><Benefits/><Waitlist/><Footer/></main>);
}
