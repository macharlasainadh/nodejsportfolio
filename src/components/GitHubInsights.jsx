"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GitHubInsights() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

        if (!token || !username) {
          throw new Error("GitHub token or username not found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        };

        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers,
          }
        );
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers }
        );
        const reposData = await reposResponse.json();

        // Fetch contribution data using GitHub GraphQL API
        let totalContributions = 0;

        try {
          // Use GraphQL to get contribution data for current year
          const currentYear = new Date().getFullYear();
          const graphqlQuery = {
            query: `
              query($username: String!) {
                user(login: $username) {
                  contributionsCollection(from: "${currentYear}-01-01T00:00:00Z", to: "${currentYear}-12-31T23:59:59Z") {
                    contributionCalendar {
                      totalContributions
                    }
                  }
                }
              }
            `,
            variables: { username },
          };

          const contributionsResponse = await fetch(
            "https://api.github.com/graphql",
            {
              method: "POST",
              headers: {
                ...headers,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(graphqlQuery),
            }
          );

          if (contributionsResponse.ok) {
            const contributionsData = await contributionsResponse.json();
            if (contributionsData.data && contributionsData.data.user) {
              totalContributions =
                contributionsData.data.user.contributionsCollection
                  .contributionCalendar.totalContributions;
            }
          }
        } catch (error) {
          console.warn(
            "Could not fetch contributions data with GraphQL, trying alternative:",
            error
          );

          // Fallback: Use search API for commits
          try {
            const currentYear = new Date().getFullYear();
            const searchResponse = await fetch(
              `https://api.github.com/search/commits?q=author:${username}+author-date:${currentYear}-01-01..${currentYear}-12-31`,
              { headers }
            );

            if (searchResponse.ok) {
              const searchData = await searchResponse.json();
              totalContributions = searchData.total_count;
            }
          } catch (searchError) {
            console.warn(
              "Could not fetch contributions with search API:",
              searchError
            );
            // Final fallback: estimate based on repository activity
            const activeRepos = reposData.filter(
              (repo) =>
                !repo.fork && new Date(repo.updated_at) > new Date("2024-01-01")
            );
            totalContributions = activeRepos.length * 15; // rough estimate
          }
        }

        // Calculate statistics
        const totalStars = reposData.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (sum, repo) => sum + repo.forks_count,
          0
        );
        const languages = {};

        reposData.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const topLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);

        const totalLanguageRepos = topLanguages.reduce(
          (sum, [, count]) => sum + count,
          0
        );

        // Get recent repositories (top 6)
        const recentRepos = reposData
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6);

        // Fetch README content for recent repositories
        const reposWithReadme = await Promise.all(
          recentRepos.map(async (repo) => {
            try {
              const readmeResponse = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/readme`,
                { headers }
              );

              if (readmeResponse.ok && readmeResponse.status === 200) {
                const readmeData = await readmeResponse.json();
                // Decode base64 content
                const readmeContent = atob(readmeData.content);
                // Extract README content - more aggressive approach to find real descriptions
                let lines = readmeContent.split("\n");

                // Try multiple approaches to find meaningful content
                let cleanContent = "";

                // Approach 1: Skip only the main title and find first paragraph
                let contentLines = lines.filter((line, index) => {
                  const trimmed = line.trim();

                  // Skip the very first title if it's at the top
                  if (index === 0 && trimmed.startsWith("# ")) return false;

                  // Keep meaningful content
                  return (
                    trimmed.length > 15 &&
                    !trimmed.startsWith("![") && // Skip images
                    !trimmed.startsWith("[![") && // Skip badges
                    !trimmed.startsWith("```") && // Skip code blocks
                    !trimmed.startsWith("---") && // Skip dividers
                    !trimmed.match(/^\s*\|/) && // Skip tables
                    !trimmed.startsWith("- [") && // Skip TOC links
                    !trimmed.match(/^##+ /) && // Skip subheaders for now
                    !trimmed.toLowerCase().includes("installation") &&
                    !trimmed.toLowerCase().includes("license")
                  );
                });

                if (contentLines.length > 0) {
                  cleanContent = contentLines
                    .slice(0, 4)
                    .join(" ")
                    .replace(/[*_`]/g, "")
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                    .replace(/\s+/g, " ")
                    .trim()
                    .substring(0, 280);
                }

                // Approach 2: If still no content, try to get any descriptive text
                if (cleanContent.length < 30) {
                  contentLines = lines.filter((line) => {
                    const trimmed = line.trim();
                    return (
                      trimmed.length > 20 &&
                      !trimmed.startsWith("#") &&
                      !trimmed.startsWith("!") &&
                      !trimmed.startsWith("```") &&
                      !trimmed.startsWith("---") &&
                      !trimmed.match(/^\s*\|/)
                    );
                  });

                  if (contentLines.length > 0) {
                    cleanContent = contentLines[0]
                      .replace(/[*_`]/g, "")
                      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                      .replace(/\s+/g, " ")
                      .trim()
                      .substring(0, 250);
                  }
                }

                const finalContent =
                  cleanContent.length > 15
                    ? cleanContent
                    : repo.description || "No README content available";

                return {
                  ...repo,
                  readmePreview: finalContent,
                  hasRealReadme: cleanContent.length > 15,
                  originalDescription: repo.description,
                };
              } else {
                return {
                  ...repo,
                  readmePreview: repo.description || "No README available",
                  hasRealReadme: false,
                  originalDescription: repo.description,
                };
              }
            } catch (error) {
              // Silently handle README fetch errors
              return {
                ...repo,
                readmePreview: repo.description || "README unavailable",
                hasRealReadme: false,
                originalDescription: repo.description,
              };
            }
          })
        );

        setGithubData({
          user: userData,
          totalRepos: userData.public_repos,
          totalStars,
          totalForks,
          followers: userData.followers,
          following: userData.following,
          topLanguages,
          totalLanguageRepos,
          recentRepos: reposWithReadme,
          totalContributions,
        });
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const StatCard = ({ title, value, icon, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-6 text-center backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-orange-400 mb-1">{value}</div>
      <div className="text-gray-300 text-sm">{title}</div>
    </motion.div>
  );

  const LanguageItem = ({ language, count, index, total }) => {
    const percentage = ((count / total) * 100).toFixed(1);

    // Language-specific colors (GitHub authentic colors)
    const languageColors = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572a5",
      Java: "#b07219",
      "C++": "#f34b7d",
      CSS: "#563d7c",
      HTML: "#e34c26",
      React: "#61dafb",
      Vue: "#41b883",
      Go: "#00add8",
      Rust: "#dea584",
      PHP: "#4f5d95",
      Ruby: "#701516",
      Swift: "#fa7343",
      Kotlin: "#a97bff",
      C: "#555555",
      "C#": "#239120",
      Dart: "#00b4ab",
      Shell: "#89e051",
      PowerShell: "#012456",
      "Objective-C": "#438eff",
      Scala: "#c22d40",
      R: "#198ce7",
      Perl: "#0298c3",
      Haskell: "#5e5086",
      Lua: "#000080",
      Assembly: "#6e4c13",
      SCSS: "#c6538c",
      Less: "#1d365d",
      Stylus: "#ff6347",
      CoffeeScript: "#244776",
      Elixir: "#6e4a7e",
      Clojure: "#db5855",
      "F#": "#b845fc",
      Julia: "#a270ba",
      Erlang: "#b83998",
      Nim: "#ffc200",
      Crystal: "#000100",
      Zig: "#ec915c",
    };

    const color = languageColors[language] || "#6b7280";

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium text-sm">{language}</span>
          <span className="text-gray-400 text-xs">{count} repos</span>
        </div>
        <div className="w-full bg-gray-700/40 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
            className="h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
      </motion.div>
    );
  };

  const RepoCard = ({ repo, index }) => (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="block bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white truncate">{repo.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            ⭐ {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            📄 README Preview
          </span>
          {repo.hasRealReadme && (
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
              Live Docs
            </span>
          )}
        </div>
        <p className="text-gray-300 text-sm line-clamp-4 leading-relaxed">
          {repo.readmePreview}
          {repo.readmePreview && repo.readmePreview.length >= 280 && "..."}
        </p>
        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="text-xs text-gray-600 mt-1">
            Real README: {repo.hasRealReadme ? "Yes" : "No"} | Length:{" "}
            {repo.readmePreview?.length || 0}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            {repo.language}
          </span>
        )}
        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </motion.a>
  );

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            GitHub <span className="text-orange-500">Insights</span>
          </h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            GitHub <span className="text-orange-500">Insights</span>
          </h2>
          <div className="text-center text-red-400">
            <p>Error loading GitHub data: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!githubData) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-800/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-4"
        >
          GitHub <span className="text-orange-500">Insights</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
        >
          A glimpse into my coding journey and contributions to the open-source
          community
        </motion.p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard
            title="Public Repos"
            value={githubData.totalRepos}
            icon="📚"
            delay={0.1}
          />
          <StatCard
            title="Total Stars"
            value={githubData.totalStars}
            icon="⭐"
            delay={0.2}
          />
          <StatCard
            title="Total Forks"
            value={githubData.totalForks}
            icon="🍴"
            delay={0.3}
          />
          <StatCard
            title="Followers"
            value={githubData.followers}
            icon="👥"
            delay={0.4}
          />
          <StatCard
            title="Following"
            value={githubData.following}
            icon="➕"
            delay={0.5}
          />
          <StatCard
            title="Contributions"
            value={githubData.totalContributions}
            icon="💻"
            delay={0.6}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🚀 Top Languages
            </h3>
            <div className="space-y-1">
              {githubData.topLanguages.map(([language, count], index) => (
                <LanguageItem
                  key={language}
                  language={language}
                  count={count}
                  index={index}
                  total={githubData.totalLanguageRepos}
                />
              ))}
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={githubData.user.avatar_url}
                alt="GitHub Avatar"
                className="w-16 h-16 rounded-full border-2 border-orange-500/30"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {githubData.user.name}
                </h3>
                <p className="text-orange-400">@{githubData.user.login}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {githubData.user.bio || "No bio available"}
            </p>
            <div className="text-sm text-gray-400">
              <p>📍 {githubData.user.location || "Location not specified"}</p>
              <p>
                📅 Joined{" "}
                {new Date(githubData.user.created_at).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              📊 Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Repositories</span>
                <span className="text-orange-400 font-semibold">
                  {githubData.totalRepos}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Stars Earned</span>
                <span className="text-orange-400 font-semibold">
                  {githubData.totalStars}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Forks Created</span>
                <span className="text-orange-400 font-semibold">
                  {githubData.totalForks}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Network</span>
                <span className="text-orange-400 font-semibold">
                  {githubData.followers + githubData.following}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={`https://github.com/${githubData.user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 hover:scale-105"
          >
            <span>👨‍💻</span>
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
