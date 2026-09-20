import { PortfolioShell } from "@/components/portfolio-shell";
import { getGithubStats, getWakatimeStats } from "@/lib/github";

/** Live telemetry refreshes hourly; the rest of the page stays static. */
export const revalidate = 3600;

export default async function Page() {
  const [github, wakatime] = await Promise.all([getGithubStats(), getWakatimeStats()]);

  return <PortfolioShell github={github} wakatime={wakatime} />;
}
