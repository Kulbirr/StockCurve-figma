import { useParams } from "react-router";

import { PlaceholderPage } from "@/components/stockcurve-app";

export function meta() {
  return [{ title: "Pool — StockCurve" }];
}

export default function PoolRoute() {
  const { symbol } = useParams();
  return (
    <PlaceholderPage
      title={`${(symbol ?? "token").toUpperCase()} pool`}
      active="Discover"
    />
  );
}
