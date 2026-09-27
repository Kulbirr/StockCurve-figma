import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

import {
  marketTokens,
  QuoteBadge,
  StockCurveHeader,
  TokenAvatar,
} from "@/components/stockcurve-app";

const filters = ["All", "SOL", "USDC", "Stocks"] as const;
const sorts = ["New", "Hot", "Near graduation"] as const;

type Filter = (typeof filters)[number];
type Sort = (typeof sorts)[number];

export function meta() {
  return [
    { title: "StockCurve — Discover" },
    {
      name: "description",
      content: "Discover tokens with creator-designed bonding curves.",
    },
  ];
}

export default function DiscoverRoute() {
  const [pairFilter, setPairFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("Hot");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") ?? "";
  const tokens = useMemo(() => {
    const visible = marketTokens.filter((token) => {
      const pairMatch =
        pairFilter === "All" ||
        (pairFilter === "Stocks"
          ? token.pair.endsWith("x")
          : token.pair === pairFilter);
      const queryMatch = `${token.symbol} ${token.name}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return pairMatch && queryMatch;
    });
    if (sort === "Hot") return visible.sort((a, b) => b.change - a.change);
    if (sort === "Near graduation")
      return visible.sort((a, b) => b.progress - a.progress);
    return visible;
  }, [pairFilter, query, sort]);

  return (
    <div className="sc-app-shell">
      <StockCurveHeader active="Discover" />
      <main className="sc-page sc-discover">
        <section className="sc-hero">
          <div className="sc-hero-copy">
            <div className="sc-eyebrow">
              <span className="sc-live-dot" /> SOLANA TOKEN LAUNCHPAD
            </div>
            <h1>
              Every token starts
              <br />
              with a <em>curve.</em>
            </h1>
            <Link className="sc-button sc-button-primary" to="/launch">
              Launch a token <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="sc-hero-mark" aria-hidden="true">
            <svg viewBox="0 0 420 240" fill="none">
              <path
                className="sc-curve-glow"
                d="M14 218C84 217 113 204 163 177C238 137 269 66 403 19"
              />
              <path
                className="sc-curve-line"
                d="M14 218C84 217 113 204 163 177C238 137 269 66 403 19"
              />
              <circle cx="403" cy="19" r="4" />
            </svg>
          </div>
          <div className="sc-hero-stats">
            <div>
              <strong>12,486</strong>
              <span>Tokens launched</span>
            </div>
            <div>
              <strong>$28.4M</strong>
              <span>Volume · 24h</span>
            </div>
            <div>
              <strong>318</strong>
              <span>Graduated</span>
            </div>
          </div>
        </section>

        <section className="sc-market" aria-label="Token market">
          <div className="sc-market-head">
            <div className="sc-market-title">
              <span className="sc-live-dot" /> Live market{" "}
              <span className="sc-market-count">{tokens.length} tokens</span>
            </div>
          </div>
          <div className="sc-market-tools">
            <div className="sc-filter-group" aria-label="Quote pair">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={pairFilter === filter ? "selected" : ""}
                  aria-pressed={pairFilter === filter}
                  onClick={() => setPairFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="sc-sort-group" aria-label="Sort tokens">
              <span>Sort</span>
              {sorts.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={sort === option ? "selected" : ""}
                  aria-pressed={sort === option}
                  onClick={() => setSort(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {tokens.length ? (
            <div className="sc-token-grid">
              {tokens.map((token) => (
                <Link
                  className="sc-token-card"
                  to={`/pool/${token.symbol.toLowerCase()}`}
                  key={token.symbol}
                >
                  <div className="sc-token-card-top">
                    <TokenAvatar token={token} />
                    <div className="sc-token-identity">
                      <strong>{token.name}</strong>
                      <span>${token.symbol}</span>
                    </div>
                    <QuoteBadge pair={token.pair} />
                  </div>
                  <div className="sc-token-price-row">
                    <strong className="sc-number">{token.price}</strong>
                    <span
                      className={token.change >= 0 ? "positive" : "negative"}
                    >
                      {token.change > 0 ? "+" : ""}
                      {token.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="sc-progress-label">
                    <span>
                      {token.graduated ? "Graduated" : "Curve progress"}
                    </span>
                    <span className="sc-number">{token.progress}%</span>
                  </div>
                  <div
                    className={`sc-progress ${token.graduated ? "graduated" : ""}`}
                  >
                    <span style={{ width: `${token.progress}%` }} />
                  </div>
                  <div className="sc-token-card-foot">
                    <span>
                      MC <b className="sc-number">{token.cap}</b>
                    </span>
                    <span>
                      VOL <b className="sc-number">{token.volume}</b>
                    </span>
                    <span className="sc-open-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="sc-empty-market">
              <span>No tokens match that search.</span>
              <button
                type="button"
                onClick={() => {
                  setSearchParams({});
                  setPairFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
        <footer className="sc-page-foot">
          <span>STOCKCURVE PROTOCOL</span>
          <span>
            POWERED BY METEORA DBC <i>·</i> SOLANA
          </span>
        </footer>
      </main>
    </div>
  );
}
