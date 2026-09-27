import { useState } from "react";
import { Form, Link, useLocation } from "react-router";

export type MarketToken = {
  symbol: string;
  name: string;
  pair: string;
  price: string;
  cap: string;
  change: number;
  progress: number;
  volume: string;
  tone: string;
  mark: string;
  graduated?: boolean;
};

export const marketTokens: MarketToken[] = [
  {
    symbol: "MOSS",
    name: "Moss Protocol",
    pair: "SOL",
    price: "$0.00482",
    cap: "$482K",
    change: 18.42,
    progress: 68,
    volume: "$92.4K",
    tone: "moss",
    mark: "M",
  },
  {
    symbol: "ORBIT",
    name: "Orbit Pets",
    pair: "USDC",
    price: "$0.0186",
    cap: "$1.86M",
    change: 7.16,
    progress: 91,
    volume: "$216K",
    tone: "orbit",
    mark: "O",
  },
  {
    symbol: "AAPLX",
    name: "Apple Onchain",
    pair: "AAPLx",
    price: "$0.1231",
    cap: "$1.23M",
    change: 4.88,
    progress: 42,
    volume: "$168K",
    tone: "apple",
    mark: "A",
  },
  {
    symbol: "FABLE",
    name: "Fable Finance",
    pair: "SOL",
    price: "$0.00213",
    cap: "$213K",
    change: -3.24,
    progress: 27,
    volume: "$38.1K",
    tone: "fable",
    mark: "F",
  },
  {
    symbol: "NVDAI",
    name: "Nvidia Index",
    pair: "NVDAx",
    price: "$0.0764",
    cap: "$764K",
    change: 12.06,
    progress: 76,
    volume: "$304K",
    tone: "nvidia",
    mark: "N",
  },
  {
    symbol: "SODA",
    name: "Soda Club",
    pair: "USDC",
    price: "$0.00934",
    cap: "$934K",
    change: 2.19,
    progress: 100,
    volume: "$129K",
    tone: "soda",
    mark: "S",
    graduated: true,
  },
  {
    symbol: "LILAC",
    name: "Lilac Labs",
    pair: "SOL",
    price: "$0.00087",
    cap: "$87K",
    change: 31.52,
    progress: 14,
    volume: "$54.7K",
    tone: "lilac",
    mark: "L",
  },
  {
    symbol: "TSLAX",
    name: "Tesla Circuit",
    pair: "TSLAx",
    price: "$0.0418",
    cap: "$418K",
    change: -1.07,
    progress: 57,
    volume: "$82.3K",
    tone: "tesla",
    mark: "T",
  },
];

export function CurveMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 31C10.5 30.2 12.3 27.3 16.1 23.2C21 17.9 22.7 9.5 32 4"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StockCurveHeader({ active = "Discover" }: { active?: string }) {
  const search = new URLSearchParams(useLocation().search).get("search") ?? "";
  const links = [
    { label: "Discover", href: "/" },
    { label: "Launch", href: "/launch" },
    { label: "Presets", href: "/presets" },
    { label: "Portfolio", href: "/portfolio" },
  ];
  return (
    <header className="sc-header">
      <Link className="sc-brand" to="/" aria-label="StockCurve home">
        <CurveMark className="sc-brand-mark" />
        <span>
          Stock<span className="sc-brand-light">Curve</span>
        </span>
      </Link>
      <nav className="sc-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className={active === link.label ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Form className="sc-global-search" action="/" method="get" role="search">
        <span aria-hidden="true">⌕</span>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search tokens or tickers…"
          aria-label="Search tokens or tickers"
        />
      </Form>
      <WalletButton />
    </header>
  );
}

function WalletButton() {
  const [state, setState] = useState<
    "disconnected" | "connecting" | "connected" | "unavailable"
  >("disconnected");
  const handleClick = () => {
    if (state === "connecting" || state === "unavailable") return;
    if (state === "connected") {
      setState("disconnected");
      return;
    }
    setState("connecting");
    window.setTimeout(() => setState("unavailable"), 450);
    window.setTimeout(() => setState("disconnected"), 2200);
  };
  return (
    <button
      className={`sc-wallet ${state}`}
      onClick={handleClick}
      type="button"
      aria-live="polite"
    >
      <span className="sc-wallet-dot" />
      {state === "connecting"
        ? "Connecting…"
        : state === "connected"
          ? "Wallet connected"
          : state === "unavailable"
            ? "Wallet unavailable"
            : "Connect wallet"}
    </button>
  );
}

export function TokenAvatar({
  token,
  size = "large",
}: {
  token: Pick<MarketToken, "tone" | "mark">;
  size?: "small" | "large";
}) {
  return (
    <span
      className={`sc-token-avatar ${token.tone} ${size}`}
      aria-hidden="true"
    >
      <span>{token.mark}</span>
    </span>
  );
}

export function QuoteBadge({ pair }: { pair: string }) {
  const stock = pair.endsWith("x");
  return (
    <span className={`sc-quote-badge ${stock ? "stock" : ""}`}>
      {stock && <i>{pair.slice(0, 1)}</i>}
      {pair}
    </span>
  );
}

export function PlaceholderPage({
  title,
  active,
}: {
  title: string;
  active: string;
}) {
  return (
    <div className="sc-app-shell">
      <StockCurveHeader active={active} />
      <main className="sc-placeholder">
        <div className="sc-placeholder-mark">
          <CurveMark />
        </div>
        <h1>{title}</h1>
        <p>This screen is not built yet. Ask StockCurve to build it next.</p>
        <Link className="sc-button sc-button-primary" to="/">
          Back to discover
        </Link>
      </main>
    </div>
  );
}
