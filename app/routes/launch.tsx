import { useState, type ChangeEvent, type PointerEvent } from "react";
import { Link } from "react-router";

import {
  CurveMark,
  QuoteBadge,
  StockCurveHeader,
} from "@/components/stockcurve-app";

type Preset = "Flat" | "Exponential" | "Long" | "Gentle";
type Pair = "SOL" | "USDC" | "AAPLx" | "NVDAx";

const presets: Preset[] = ["Flat", "Exponential", "Long", "Gentle"];
const pairs: Pair[] = ["SOL", "USDC", "AAPLx", "NVDAx"];
const curvePoints: Record<Preset, [number, number][]> = {
  Flat: [
    [18, 181],
    [162, 151],
    [300, 116],
    [438, 82],
    [582, 42],
  ],
  Exponential: [
    [18, 186],
    [162, 178],
    [300, 155],
    [438, 104],
    [582, 28],
  ],
  Long: [
    [18, 181],
    [162, 163],
    [300, 132],
    [438, 88],
    [582, 28],
  ],
  Gentle: [
    [18, 181],
    [162, 137],
    [300, 101],
    [438, 68],
    [582, 39],
  ],
};

export function meta() {
  return [{ title: "Launch token — StockCurve" }];
}

export default function LaunchRoute() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [preset, setPreset] = useState<Preset>("Exponential");
  const [points, setPoints] = useState(curvePoints.Exponential);
  const [pair, setPair] = useState<Pair>("SOL");
  const [fee, setFee] = useState(1);
  const [threshold, setThreshold] = useState("85");
  const [error, setError] = useState("");
  const [launchState, setLaunchState] = useState<
    "idle" | "signing" | "success"
  >("idle");

  const selectPreset = (value: Preset) => {
    setPreset(value);
    setPoints(curvePoints[value].map(([x, y]) => [x, y]));
  };
  const validateAndContinue = () => {
    if (step === 1 && !name.trim()) {
      setError("Add a token name to continue.");
      return;
    }
    if (step === 1 && !/^[a-zA-Z0-9]{2,10}$/.test(ticker)) {
      setError("Ticker must be 2–10 letters or numbers.");
      return;
    }
    if (
      step === 3 &&
      (!Number(threshold) || Number(threshold) < 10 || Number(threshold) > 99)
    ) {
      setError("Graduation threshold must be between 10% and 99%.");
      return;
    }
    setError("");
    setStep((current) => Math.min(4, current + 1));
  };
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };
  const movePoint = (index: number, event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const desiredY = ((event.clientY - bounds.top) / bounds.height) * 220;
    setPoints((current) => {
      const y = Math.max(
        current[index + 1][1] + 2,
        Math.min(current[index - 1][1] - 2, desiredY),
      );
      return current.map((point, pointIndex) =>
        pointIndex === index ? [point[0], y] : point,
      );
    });
  };
  const projectedPrice = (percent: number) => {
    const y = points[Math.min(4, Math.round(percent / 25))]?.[1] ?? 186;
    return `$${(0.0001 + (186 - y) * 0.00019).toFixed(4)}`;
  };
  const launch = () => {
    setLaunchState("signing");
    window.setTimeout(() => setLaunchState("success"), 1100);
  };

  return (
    <div className="sc-app-shell">
      <StockCurveHeader active="Launch" />
      <main className="sc-page sc-launch-page">
        <div className="sc-launch-top">
          <Link to="/" className="sc-back-link">
            ← Discover
          </Link>
          <span className="sc-preview-mode">PREVIEW MODE</span>
        </div>
        <div className="sc-launch-layout">
          <aside className="sc-stepper" aria-label="Launch steps">
            {[
              [1, "Token"],
              [2, "Curve"],
              [3, "Market"],
              [4, "Review"],
            ].map(([number, label]) => {
              const index = Number(number);
              return (
                <button
                  type="button"
                  key={number}
                  onClick={() => {
                    if (index < step) {
                      setStep(index);
                      setError("");
                    }
                  }}
                  className={`sc-step ${step === index ? "current" : ""} ${step > index ? "complete" : ""}`}
                >
                  <span>{step > index ? "✓" : number}</span>
                  {label}
                </button>
              );
            })}
          </aside>

          <section className="sc-launch-content">
            {launchState === "success" ? (
              <div className="sc-launch-success">
                <span className="sc-success-icon">
                  <CurveMark />
                </span>
                <div className="sc-eyebrow">LAUNCH PREVIEW COMPLETE</div>
                <h1>{name || "Your token"} is ready.</h1>
                <p>
                  No transaction was sent. Connect a wallet integration to
                  launch on Solana.
                </p>
                <div className="sc-success-summary">
                  <span>${ticker || "TOKEN"}</span>
                  <QuoteBadge pair={pair} />
                  <span>{preset} curve</span>
                </div>
                <div className="sc-launch-actions">
                  <Link to="/" className="sc-button sc-button-primary">
                    Explore tokens
                  </Link>
                  <button
                    className="sc-button sc-button-secondary"
                    type="button"
                    onClick={() => {
                      setLaunchState("idle");
                      setStep(1);
                    }}
                  >
                    Create another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="sc-step-heading">
                  <div className="sc-step-counter">STEP 0{step} / 04</div>
                  <h1>
                    {
                      [
                        "Token details",
                        "Design your curve",
                        "Market setup",
                        "Review launch",
                      ][step - 1]
                    }
                  </h1>
                </div>

                {step === 1 && (
                  <div className="sc-form-fields">
                    <div className="sc-form-row">
                      <label className="sc-field">
                        <span>Token name</span>
                        <input
                          autoFocus
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          maxLength={32}
                          placeholder="e.g. Moss Protocol"
                        />
                      </label>
                      <label className="sc-field">
                        <span>Ticker</span>
                        <div className="sc-ticker-input">
                          <b>$</b>
                          <input
                            value={ticker}
                            onChange={(event) =>
                              setTicker(
                                event.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, "")
                                  .slice(0, 10),
                              )
                            }
                            placeholder="MOSS"
                          />
                        </div>
                      </label>
                    </div>
                    <label className="sc-field">
                      <span>
                        Description <small>OPTIONAL</small>
                      </span>
                      <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        maxLength={240}
                        placeholder="What is this token about?"
                        rows={3}
                      />
                    </label>
                    <label className="sc-upload">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImage}
                      />
                      {imagePreview ? (
                        <img src={imagePreview} alt="Token artwork preview" />
                      ) : (
                        <span className="sc-upload-icon">+</span>
                      )}
                      <span>
                        <b>
                          {imagePreview ? "Replace image" : "Add token image"}
                        </b>
                        <small>PNG, JPG or WEBP · square works best</small>
                      </span>
                    </label>
                  </div>
                )}

                {step === 2 && (
                  <div className="sc-curve-editor">
                    <div className="sc-preset-row">
                      {presets.map((item) => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={preset === item}
                          onClick={() => selectPreset(item)}
                          className={`sc-preset ${preset === item ? "selected" : ""}`}
                        >
                          <svg viewBox="0 0 52 27" aria-hidden="true">
                            <path
                              d={
                                item === "Flat"
                                  ? "M2 23C14 21 23 17 50 3"
                                  : item === "Long"
                                    ? "M2 23C23 21 30 15 50 3"
                                    : item === "Gentle"
                                      ? "M2 23C10 17 26 9 50 3"
                                      : "M2 23C27 23 33 22 38 15C43 8 46 5 50 3"
                              }
                            />
                          </svg>
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                    <div className="sc-chart-panel">
                      <div className="sc-chart-title">
                        <span>PRICE CURVE</span>
                        <span className="sc-number">
                          {ticker ? `$${ticker}` : "TOKEN"} / {pair}
                        </span>
                      </div>
                      <svg
                        className="sc-curve-chart"
                        viewBox="0 0 600 220"
                        preserveAspectRatio="none"
                        aria-label="Interactive bonding curve; drag a point to adjust the curve"
                        onPointerDown={(event) => {
                          event.currentTarget.setPointerCapture(
                            event.pointerId,
                          );
                          movePoint(
                            Math.min(
                              3,
                              Math.max(
                                1,
                                Math.round(
                                  ((event.clientX -
                                    event.currentTarget.getBoundingClientRect()
                                      .left) /
                                    event.currentTarget.getBoundingClientRect()
                                      .width) *
                                    4,
                                ),
                              ),
                            ),
                            event,
                          );
                        }}
                        onPointerMove={(event) => {
                          if (event.buttons === 1)
                            movePoint(
                              Math.min(
                                3,
                                Math.max(
                                  1,
                                  Math.round(
                                    ((event.clientX -
                                      event.currentTarget.getBoundingClientRect()
                                        .left) /
                                      event.currentTarget.getBoundingClientRect()
                                        .width) *
                                      4,
                                  ),
                                ),
                              ),
                              event,
                            );
                        }}
                      >
                        {[0, 1, 2, 3, 4].map((line) => (
                          <line
                            key={line}
                            x1="18"
                            x2="582"
                            y1={24 + line * 39}
                            y2={24 + line * 39}
                            className="sc-grid-line"
                          />
                        ))}
                        <path
                          d={`M ${points.map(([x, y]) => `${x},${y}`).join(" L ")} L 582,204 L 18,204 Z`}
                          className="sc-chart-fill"
                        />
                        <path
                          d={`M ${points.map(([x, y]) => `${x},${y}`).join(" L ")}`}
                          className="sc-chart-stroke"
                        />
                        {points.slice(1, 4).map(([x, y], index) => (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="6"
                            className="sc-chart-point"
                          />
                        ))}
                        <text x="18" y="216">
                          0%
                        </text>
                        <text x="545" y="216">
                          100%
                        </text>
                      </svg>
                      <div className="sc-chart-hint">
                        Drag a point to fine-tune
                      </div>
                    </div>
                    <div className="sc-projection-grid">
                      {[25, 50, 75, 100].map((amount) => (
                        <div key={amount}>
                          <span>{amount}% filled</span>
                          <strong className="sc-number">
                            {projectedPrice(amount)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="sc-market-form">
                    <div className="sc-field-label">Quote pair</div>
                    <div className="sc-pair-grid">
                      {pairs.map((value) => (
                        <button
                          key={value}
                          className={`sc-pair-option ${pair === value ? "selected" : ""}`}
                          type="button"
                          aria-pressed={pair === value}
                          onClick={() => setPair(value)}
                        >
                          <QuoteBadge pair={value} />
                          <span>
                            {value.endsWith("x")
                              ? `${value.slice(0, -1)} tokenized stock`
                              : value === "SOL"
                                ? "Solana"
                                : "USD Coin"}
                          </span>
                          <i>{pair === value ? "✓" : ""}</i>
                        </button>
                      ))}
                    </div>
                    <label className="sc-range-field">
                      <span>
                        Creator fee <b>{fee.toFixed(1)}%</b>
                      </span>
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.1"
                        value={fee}
                        onChange={(event) => setFee(Number(event.target.value))}
                      />
                      <small>Fee on each trade, earned by the creator.</small>
                    </label>
                    <label className="sc-field sc-threshold-field">
                      <span>Graduation threshold</span>
                      <div className="sc-threshold-input">
                        <input
                          value={threshold}
                          onChange={(event) =>
                            setThreshold(
                              event.target.value.replace(/[^0-9]/g, ""),
                            )
                          }
                          inputMode="numeric"
                        />
                        <span>% market cap filled</span>
                      </div>
                    </label>
                  </div>
                )}

                {step === 4 && (
                  <div className="sc-review">
                    <div className="sc-review-token">
                      <span className="sc-review-avatar">
                        {imagePreview ? (
                          <img src={imagePreview} alt="" />
                        ) : (
                          <span>{ticker.slice(0, 1) || <CurveMark />}</span>
                        )}
                      </span>
                      <div>
                        <strong>{name || "Untitled token"}</strong>
                        <span>${ticker || "TICKER"}</span>
                      </div>
                      <QuoteBadge pair={pair} />
                    </div>
                    {description && (
                      <p className="sc-review-description">{description}</p>
                    )}
                    <div className="sc-review-list">
                      <div>
                        <span>Bonding curve</span>
                        <strong>{preset}</strong>
                      </div>
                      <div>
                        <span>Creator fee</span>
                        <strong className="sc-number">{fee.toFixed(1)}%</strong>
                      </div>
                      <div>
                        <span>Graduation threshold</span>
                        <strong className="sc-number">{threshold}%</strong>
                      </div>
                      <div>
                        <span>Estimated network fee</span>
                        <strong className="sc-number">~0.02 SOL</strong>
                      </div>
                      <div>
                        <span>Launch cost</span>
                        <strong className="sc-number">~0.1 SOL</strong>
                      </div>
                    </div>
                    <div className="sc-review-notice">
                      Preview only. No wallet signature or transaction will be
                      requested.
                    </div>
                  </div>
                )}

                {error && (
                  <p className="sc-form-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="sc-launch-actions">
                  {step > 1 && (
                    <button
                      className="sc-button sc-button-secondary"
                      type="button"
                      onClick={() => {
                        setStep((current) => current - 1);
                        setError("");
                      }}
                    >
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      className="sc-button sc-button-primary"
                      type="button"
                      onClick={validateAndContinue}
                    >
                      Continue <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <button
                      className="sc-button sc-button-primary"
                      type="button"
                      onClick={launch}
                      disabled={launchState === "signing"}
                    >
                      {launchState === "signing" ? (
                        <>
                          <span className="sc-spinner" /> Waiting for signature…
                        </>
                      ) : (
                        "Launch token"
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
          <aside className="sc-launch-aside">
            <div className="sc-aside-card">
              <span className="sc-aside-kicker">BUILT ON</span>
              <strong>Meteora DBC</strong>
              <span className="sc-aside-copy">
                Custom curves. Real markets.
              </span>
              <div className="sc-aside-logo">
                <CurveMark />
              </div>
            </div>
            <div className="sc-aside-status">
              <span className="sc-live-dot" /> SOLANA MAINNET
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
