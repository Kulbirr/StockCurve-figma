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
  isNew?: boolean;
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

export const discoverTokens: MarketToken[] = [
  {
    symbol: "AAPLX",
    name: "AAPLx Curve",
    pair: "AAPLx",
    price: "$0.000482",
    cap: "$482K",
    change: 18.4,
    progress: 64,
    volume: "$94.2K",
    tone: "apple",
    mark: "A",
  },
  {
    symbol: "SPNK",
    name: "SolPunk",
    pair: "SOL",
    price: "$0.0129",
    cap: "$91K",
    change: 4.2,
    progress: 38,
    volume: "$16.8K",
    tone: "fable",
    mark: "S",
  },
  {
    symbol: "TSLAX",
    name: "TSLAx Fast",
    pair: "TSLAx",
    price: "$0.482",
    cap: "$1.2M",
    change: 52.1,
    progress: 91,
    volume: "$382K",
    tone: "tesla",
    mark: "T",
  },
  {
    symbol: "GNS",
    name: "USDC Genesis",
    pair: "USDC",
    price: "$7.04",
    cap: "$3.8M",
    change: 6.7,
    progress: 100,
    volume: "$712K",
    tone: "nvidia",
    mark: "G",
    graduated: true,
  },
  {
    symbol: "NVDAX",
    name: "NVDAx Prime",
    pair: "NVDAx",
    price: "$0.620",
    cap: "$620K",
    change: 29.3,
    progress: 72,
    volume: "$182K",
    tone: "moss",
    mark: "N",
  },
  {
    symbol: "DOGEC",
    name: "DogeCurve",
    pair: "SOL",
    price: "$0.000034",
    cap: "$34K",
    change: 12.8,
    progress: 14,
    volume: "$9.8K",
    tone: "orbit",
    mark: "D",
  },
  {
    symbol: "MOONX",
    name: "MoonX",
    pair: "SOL",
    price: "$0.000021",
    cap: "$12K",
    change: 142,
    progress: 6,
    volume: "$24.3K",
    tone: "lilac",
    mark: "M",
    isNew: true,
  },
  {
    symbol: "CSHB",
    name: "CoinShiba",
    pair: "SOL",
    price: "$0.000058",
    cap: "$58K",
    change: 3.9,
    progress: 22,
    volume: "$7.6K",
    tone: "soda",
    mark: "C",
  },
  {
    symbol: "ETHEX",
    name: "Ether Circuit",
    pair: "USDC",
    price: "$0.00011",
    cap: "$110K",
    change: 8.4,
    progress: 31,
    volume: "$18.2K",
    tone: "orbit",
    mark: "E",
  },
  {
    symbol: "SOLCAT",
    name: "SolCat Club",
    pair: "SOL",
    price: "$0.000076",
    cap: "$76K",
    change: 2.7,
    progress: 19,
    volume: "$11.4K",
    tone: "moss",
    mark: "C",
  },
  {
    symbol: "AMDXX",
    name: "AMDx Index",
    pair: "AMDx",
    price: "$0.031",
    cap: "$310K",
    change: 15.8,
    progress: 49,
    volume: "$67.1K",
    tone: "apple",
    mark: "A",
  },
  {
    symbol: "PICO",
    name: "Pico Protocol",
    pair: "USDC",
    price: "$0.000015",
    cap: "$15K",
    change: -2.1,
    progress: 8,
    volume: "$4.2K",
    tone: "fable",
    mark: "P",
    isNew: true,
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
