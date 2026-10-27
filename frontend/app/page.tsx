import { PublicPortfolio } from "@/components/public/portfolio";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  return <PublicPortfolio data={await fetchPortfolio()} />;
}
