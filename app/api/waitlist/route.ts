import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "MAIL_TO"] as const;

type WaitlistPayload = {
  email?: string;
  selectedType?: string;
  interests?: string[];
  collecting?: string[];
  otherInterest?: string;
  otherCollecting?: string;
  listingVolume?: string;
  name?: string;
  cardsSold?: string[];
  otherCardsSold?: string;
  startVolume?: string;
  salesChannels?: string[];
  otherSalesChannel?: string;
  profileLink?: string;
  biggestProblem?: string;
  betaConsent?: boolean;
};

function withOther(values?: string[], other?: string) {
  const list = values ? [...values] : [];
  if (list.includes("Inne") && other?.trim()) {
    list[list.indexOf("Inne")] = `Inne: ${other.trim()}`;
  }
  return list.length ? list.join(", ") : "Nie wybrano";
}

function escapeHtml(value?: string) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const payload = (await request.json()) as WaitlistPayload;

  if (!payload.email || !payload.email.includes("@")) {
    return NextResponse.json({ message: "Nieprawidłowy adres email" }, { status: 400 });
  }

  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    return NextResponse.json(
      { message: `Brak konfiguracji SMTP: ${missing.join(", ")}` },
      { status: 500 }
    );
  }

  const selectedType = payload.selectedType || "Nie wybrano";
  const subjectType = selectedType === "Zostań sprzedawcą beta" ? "Aplikacja do bety sprzedawców" : "Nowy zapis na listę oczekujących";

  const fields: Array<[string, string]> = [
    ["Typ formularza", selectedType],
    ["Email", payload.email],
  ];

  if (selectedType === "Kupuję karty") {
    fields.push(
      ["Interesujące karty", withOther(payload.interests, payload.otherInterest)],
      ["Co kolekcjonuje", withOther(payload.collecting, payload.otherCollecting)]
    );
  }

  if (selectedType === "Sprzedaję karty") {
    fields.push(["Ile kart planuje wystawić", payload.listingVolume || "Nie wybrano"]);
  }

  if (selectedType === "Kupuję i sprzedaję") {
    fields.push(
      ["Ile kart planuje wystawić", payload.listingVolume || "Nie wybrano"],
      ["Interesujące karty", withOther(payload.interests, payload.otherInterest)],
      ["Co kolekcjonuje", withOther(payload.collecting, payload.otherCollecting)]
    );
  }

  if (selectedType === "Zostań sprzedawcą beta") {
    fields.push(
      ["Imię / Nick", payload.name || "Nie podano"],
      ["Jakie karty sprzedaje", withOther(payload.cardsSold, payload.otherCardsSold)],
      ["Ile kart planuje wystawić na start", payload.startVolume || "Nie wybrano"],
      ["Gdzie obecnie sprzedaje", withOther(payload.salesChannels, payload.otherSalesChannel)],
      ["Link do profilu / sklepu / IG", payload.profileLink || "Nie podano"],
      ["Największy problem przy sprzedaży kart", payload.biggestProblem || "Nie podano"],
      ["Zgoda na zamkniętą betę", payload.betaConsent ? "TAK" : "NIE"]
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const text = [
    `${subjectType} PIKET.pl`,
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlRows = fields
    .map(([label, value]) => `<tr><td style="padding:8px 14px;border-bottom:1px solid #edf0f5;color:#667085;">${escapeHtml(label)}</td><td style="padding:8px 14px;border-bottom:1px solid #edf0f5;color:#081225;font-weight:600;">${escapeHtml(value)}</td></tr>`)
    .join("");

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.MAIL_TO,
    replyTo: payload.email,
    subject: `${subjectType} PIKET.pl`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#081225;">
        <h2 style="margin:0 0 18px;">${escapeHtml(subjectType)} PIKET.pl</h2>
        <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #edf0f5;border-radius:12px;overflow:hidden;">${htmlRows}</table>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
