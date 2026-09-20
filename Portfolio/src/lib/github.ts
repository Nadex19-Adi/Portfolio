/**
 * Live platform stats.
 *
 * Everything here degrades to `null` rather than throwing, so a rate limit, an
 * offline build machine, or a missing key can never break `next build`. When the
 * data is missing the UI links out instead of inventing numbers.
 */

const USERNAME = "Nadex19-Adi";
const REVALIDATE_SECONDS = 3600;
const TIMEOUT_MS = 8000;

export type GithubStats = {
  username: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  profileUrl: string;
};

export type WakatimeStats = {
  total: string;
  dailyAverage: string;
  topLanguage: string | null;
};

type GithubUser = {
  public_repos: number;
  followers: number;
  html_url: string;
};

type GithubRepo = {
  fork: boolean;
  language: string | null;
  stargazers_count: number;
};

type WakatimeSummary = {
  grand_total: { total_seconds: number };
};

type WakatimeLanguage = {
  name: string;
  total_seconds: number;
};

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  const hr = hours === 1 ? "hr" : "hrs";
  const min = minutes === 1 ? "min" : "mins";
  if (hours === 0) return `${minutes} ${min}`;
  return `${hours} ${hr} ${minutes} ${min}`;
}

async function getJson<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubStats(): Promise<GithubStats | null> {
  const [user, repos] = await Promise.all([
    getJson<GithubUser>(`https://api.github.com/users/${USERNAME}`, {
      Accept: "application/vnd.github+json",
    }),
    getJson<GithubRepo[]>(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { Accept: "application/vnd.github+json" },
    ),
  ]);

  if (!user) return null;

  const owned = (repos ?? []).filter((repo) => !repo.fork);
  const totalStars = owned.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

  const counts = new Map<string, number>();
  for (const repo of owned) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  const topLanguages = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    username: USERNAME,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLanguages,
    profileUrl: user.html_url,
  };
}

/**
 * WakaTime needs a personal API key. Without `WAKATIME_API_KEY` this returns
 * `null` and the card is not rendered at all.
 */
export async function getWakatimeStats(): Promise<WakatimeStats | null> {
  const key = process.env.WAKATIME_API_KEY;
  if (!key) return null;

  const auth = { Authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}` };

  const [summaries, languages] = await Promise.all([
    getJson<WakatimeSummary[]>(
      "https://wakatime.com/api/v1/users/current/summaries?range=last_7_days",
      auth,
    ),
    getJson<{ data: WakatimeLanguage[] }>(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      auth,
    ),
  ]);

  if (!summaries?.length) return null;

  const totalSeconds = summaries.reduce(
    (sum, day) => sum + (day.grand_total?.total_seconds ?? 0),
    0,
  );
  if (totalSeconds <= 0) return null;

  return {
    total: formatDuration(totalSeconds),
    dailyAverage: formatDuration(Math.round(totalSeconds / summaries.length)),
    topLanguage: languages?.data?.[0]?.name ?? null,
  };
}
