"use client";

import { useState } from "react";

// ─── Real experiment data ────────────────────────────────────────────────────

const EXPERIMENT_START = "2026-03-04";
const EXPERIMENT_DURATION = 90;

const dailyResults = [
  { date: "2026-03-04", day: 0, memories: 227, hot: 227, warm: 0, cold: 0, archive: 0, size: 0.84, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-05", day: 1, memories: 252, hot: 252, warm: 0, cold: 0, archive: 0, size: 0.93, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-06", day: 2, memories: 343, hot: 343, warm: 0, cold: 0, archive: 0, size: 1.27, recall: 76, similarity: 43, tested: 50, successes: 38, type: "daily" },
  { date: "2026-03-07", day: 3, memories: 484, hot: 484, warm: 0, cold: 0, archive: 0, size: 1.79, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-08", day: 4, memories: 674, hot: 674, warm: 0, cold: 0, archive: 0, size: 2.50, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-09", day: 5, memories: 823, hot: 823, warm: 0, cold: 0, archive: 0, size: 3.05, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-10", day: 6, memories: 823, hot: 823, warm: 0, cold: 0, archive: 0, size: 3.05, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-11", day: 7, memories: 823, hot: 823, warm: 0, cold: 0, archive: 0, size: 3.05, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-12", day: 8, memories: 823, hot: 823, warm: 0, cold: 0, archive: 0, size: 3.05, recall: 0, similarity: 0, tested: 50, successes: 0, type: "daily" },
  { date: "2026-03-19", day: 15, memories: 824, hot: 572, warm: 252, cold: 0, archive: 0, size: 3.05, recall: 0, similarity: 0, tested: 0, successes: 0, type: "daily" },
];

const weeklyResults = [
  { date: "2026-03-12", day: 8, memories: 823, recall: 30, similarity: 26, tested: 50, successes: 15, type: "weekly" },
  { date: "2026-03-19", day: 15, memories: 824, recall: 0, similarity: 0, tested: 0, successes: 0, type: "weekly" },
];

const subjects = [
  { name: "Classical Mechanics", domain: "Physics", facts: 50, status: "injected" },
  { name: "Thermodynamics", domain: "Physics", facts: 50, status: "injected" },
  { name: "Electromagnetism", domain: "Physics", facts: 50, status: "injected" },
  { name: "Quantum Mechanics", domain: "Physics", facts: 50, status: "injected" },
  { name: "Relativity", domain: "Physics", facts: 50, status: "injected" },
  { name: "Optics", domain: "Physics", facts: 50, status: "injected" },
  { name: "Nuclear Physics", domain: "Physics", facts: 50, status: "injected" },
  { name: "Chemistry", domain: "Science", facts: 50, status: "injected" },
  { name: "Astronomy", domain: "Science", facts: 50, status: "injected" },
  { name: "Biology", domain: "Science", facts: 50, status: "injected" },
  { name: "Mathematics", domain: "STEM", facts: 1, status: "injected" },
  { name: "Technology", domain: "STEM", facts: 1, status: "injected" },
  { name: "Economics", domain: "STEM", facts: 1, status: "injected" },
  { name: "History", domain: "Humanities", facts: 1, status: "pending" },
  { name: "Politics", domain: "Humanities", facts: 1, status: "injected" },
  { name: "Philosophy", domain: "Humanities", facts: 1, status: "injected" },
];

const tierThresholds = { hotDays: 7, warmDays: 30, coldDays: 365 };
const consolidationDefaults = {
  deduplicateThreshold: 0.92,
  clusterThreshold: 0.78,
  minClusterSize: 3,
  archiveTruncateLength: 200,
};

type Tab = "overview" | "data" | "methodology" | "architecture" | "timeline";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const latest = dailyResults[dailyResults.length - 1];
  const latestWeekly = weeklyResults[weeklyResults.length - 1];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--border)]" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>TERRONEX</span>
            <span>/</span>
            <span>RESEARCH</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Engram Memory Decay Study</h1>
          <p className="text-gray-400 max-w-2xl">
            A 90-day empirical study measuring how semantic memories stored in Engram degrade over time
            through biologically-inspired tier transitions: HOT, WARM, COLD, and ARCHIVE.
          </p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="badge badge-active">ACTIVE -- Day {latest.day}/90</span>
            <span className="text-gray-500">Started: {EXPERIMENT_START}</span>
            <span className="text-gray-500">{latest.memories} memories</span>
            <span className="text-gray-500">{latest.size} MB</span>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex gap-1">
          {(["overview", "data", "methodology", "architecture", "timeline"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`nav-link capitalize ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "overview" && <Overview latest={latest} latestWeekly={latestWeekly} />}
        {activeTab === "data" && <Data />}
        {activeTab === "methodology" && <Methodology />}
        {activeTab === "architecture" && <Architecture />}
        {activeTab === "timeline" && <Timeline />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 text-sm">
          Powered by <span className="text-cyan-400">@terronex/engram</span> v2.1.2
          {" "}&middot;{" "}
          Consolidation engine: <span className="text-cyan-400">@terronex/engram-trace-lite</span>
          {" "}&middot;{" "}
          Embeddings: all-MiniLM-L6-v2 (384 dims)
          <div className="mt-2 text-gray-700">
            <a href="/engram-evo" className="hover:text-gray-400">Engram Evo Experiment</a>
            {" "}&middot;{" "}
            <a href="https://github.com/terronexdev" className="hover:text-gray-400">GitHub</a>
            {" "}&middot;{" "}
            <a href="https://www.npmjs.com/package/@terronex/engram" className="hover:text-gray-400">NPM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────

function Overview({ latest, latestWeekly }: { latest: typeof dailyResults[0]; latestWeekly: typeof weeklyResults[0] }) {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Day</div>
          <div className="stat-value text-cyan-400 mt-1">{latest.day}</div>
          <div className="text-xs text-gray-600 mt-1">of 90</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Memories</div>
          <div className="stat-value text-white mt-1">{latest.memories}</div>
          <div className="text-xs text-gray-600 mt-1">{latest.size} MB</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Weekly Recall</div>
          <div className="stat-value text-amber-400 mt-1">{latestWeekly.recall}%</div>
          <div className="text-xs text-gray-600 mt-1">{latestWeekly.successes}/{latestWeekly.tested} questions</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Similarity</div>
          <div className="stat-value text-blue-400 mt-1">{latestWeekly.similarity}%</div>
          <div className="text-xs text-gray-600 mt-1">cosine distance</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Tier Transitions</div>
          <div className="stat-value text-green-400 mt-1">252</div>
          <div className="text-xs text-gray-600 mt-1">HOT → WARM achieved!</div>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="card">
        <h2 className="section-title">Memory Tier Distribution</h2>
        <div className="space-y-3">
          <TierRow label="HOT" count={latest.hot} total={latest.memories} color="var(--red)" desc="Recently created, frequently accessed. Active recall." />
          <TierRow label="WARM" count={latest.warm} total={latest.memories} color="var(--amber)" desc="Aging memories. Accessed less often. Candidates for clustering." />
          <TierRow label="COLD" count={latest.cold} total={latest.memories} color="var(--blue)" desc="Rarely accessed. Long-term storage. May be summarized." />
          <TierRow label="ARCHIVE" count={latest.archive} total={latest.memories} color="var(--gray)" desc="Content truncated. Minimal footprint. Last resort recall." />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <h2 className="section-title">Experiment Progress</h2>
        <div className="relative bg-[#111118] rounded-full h-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${(latest.day / EXPERIMENT_DURATION) * 100}%`,
              background: "linear-gradient(90deg, var(--cyan), var(--blue))",
            }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white">
            Day {latest.day} / {EXPERIMENT_DURATION} ({((latest.day / EXPERIMENT_DURATION) * 100).toFixed(1)}%)
          </span>
        </div>
        <div className="flex justify-between mt-3 text-xs text-gray-600">
          <span>March 4, 2026</span>
          <span className="text-green-400">HOT-&gt;WARM achieved Day 15!</span>
          <span>WARM-&gt;COLD expected ~Day 60</span>
          <span>June 2, 2026</span>
        </div>
      </div>

      {/* What We're Testing */}
      <div className="card">
        <h2 className="section-title">What This Experiment Measures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-medium mb-2">Primary Questions</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2"><span className="text-cyan-400">1.</span> How fast do semantic memories degrade when not accessed?</li>
              <li className="flex gap-2"><span className="text-cyan-400">2.</span> Does recall accuracy drop before or after tier transitions?</li>
              <li className="flex gap-2"><span className="text-cyan-400">3.</span> Do access patterns (recall testing) slow decay measurably?</li>
              <li className="flex gap-2"><span className="text-cyan-400">4.</span> Is the 30% similarity threshold appropriate for "meaningful recall"?</li>
              <li className="flex gap-2"><span className="text-cyan-400">5.</span> How does memory density (count) affect recall quality?</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Design Decisions</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><strong className="text-gray-300">Weekly testing (not daily):</strong> Prevents access boosts from artificially keeping memories HOT</li>
              <li><strong className="text-gray-300">25% sampling (max 50):</strong> Lets 75% of memories age without any interference</li>
              <li><strong className="text-gray-300">30% similarity threshold:</strong> High bar for "successful recall" to avoid false positives</li>
              <li><strong className="text-gray-300">16-subject rotation:</strong> Cross-domain knowledge tests domain independence of decay</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DATA TAB ────────────────────────────────────────────────────────────────

function Data() {
  return (
    <div className="space-y-8">
      {/* Daily Results Table */}
      <div className="card">
        <h2 className="section-title">Daily Injection Results</h2>
        <p className="text-sm text-gray-500 mb-4">
          Daily tests ran Days 0-8 (before switching to weekly-only). Recall on most days was 0% because
          questions were drawn from subjects not yet injected, revealing an early design flaw that was corrected on Day 6.
        </p>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Memories</th>
                <th>Size (MB)</th>
                <th className="tier-hot">HOT</th>
                <th className="tier-warm">WARM</th>
                <th className="tier-cold">COLD</th>
                <th>Recall</th>
                <th>Similarity</th>
                <th>Hits</th>
              </tr>
            </thead>
            <tbody>
              {dailyResults.map((r, i) => (
                <tr key={i}>
                  <td className="font-mono text-gray-400">{r.date}</td>
                  <td className="text-gray-300">{r.day}</td>
                  <td className="text-white font-medium">{r.memories}</td>
                  <td className="text-gray-400">{r.size}</td>
                  <td className="tier-hot">{r.hot}</td>
                  <td className="tier-warm">{r.warm}</td>
                  <td className="tier-cold">{r.cold}</td>
                  <td>
                    <span className={r.recall > 0 ? "text-green-400 font-medium" : "text-gray-600"}>
                      {r.recall}%
                    </span>
                  </td>
                  <td>
                    <span className={r.similarity > 0 ? "text-cyan-400" : "text-gray-600"}>
                      {r.similarity}%
                    </span>
                  </td>
                  <td className="text-gray-400">{r.successes}/{r.tested}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Results */}
      <div className="card">
        <h2 className="section-title">Weekly Recall Tests</h2>
        <p className="text-sm text-gray-500 mb-4">
          Weekly tests sample 25% of available questions (max 50) from injected subjects only.
          This reduces access interference while still measuring recall quality.
        </p>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Memories</th>
                <th>Questions Available</th>
                <th>Tested (25%)</th>
                <th>Recall Rate</th>
                <th>Avg Similarity</th>
                <th>Successes</th>
              </tr>
            </thead>
            <tbody>
              {weeklyResults.map((r, i) => (
                <tr key={i}>
                  <td className="font-mono text-gray-400">{r.date}</td>
                  <td className="text-gray-300">{r.day}</td>
                  <td className="text-white">{r.memories}</td>
                  <td className="text-gray-400">6,771</td>
                  <td className="text-gray-300">{r.tested}</td>
                  <td className="text-amber-400 font-medium">{r.recall}%</td>
                  <td className="text-cyan-400">{r.similarity}%</td>
                  <td className="text-gray-300">{r.successes}/{r.tested}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Memory Growth Chart */}
      <div className="card">
        <h2 className="section-title">Memory Growth</h2>
        <div className="space-y-2">
          {dailyResults.map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500 w-12">Day {r.day}</span>
              <div className="flex-1 bg-[#111118] rounded h-5 relative overflow-hidden">
                <div
                  className="h-full rounded bar-chart-bar"
                  style={{
                    width: `${(r.memories / 824) * 100}%`,
                    background: `linear-gradient(90deg, var(--cyan), var(--blue))`,
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 w-16 text-right">{r.memories}</span>
              <span className="text-xs text-gray-600 w-16 text-right">{r.size} MB</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="card">
        <h2 className="section-title">Subject Breakdown (16 Domains)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {["Physics", "Science", "STEM", "Humanities"].map((domain) => (
            <div key={domain} className="bg-[#111118] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">{domain}</h3>
              <div className="space-y-2">
                {subjects.filter(s => s.domain === domain).map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{s.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">{s.facts} facts</span>
                      <span className={`badge ${s.status === "injected" ? "badge-active" : "badge-warm"}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── METHODOLOGY TAB ─────────────────────────────────────────────────────────

function Methodology() {
  return (
    <div className="space-y-8">
      {/* Hypothesis */}
      <div className="card">
        <h2 className="section-title">Hypothesis</h2>
        <div className="bg-[#111118] rounded-lg p-6 border-l-4 border-cyan-500">
          <p className="text-gray-300 leading-relaxed">
            Semantic memories stored in Engram will follow a predictable decay curve as they transition
            through tiers (HOT → WARM → COLD → ARCHIVE), with recall accuracy degrading proportionally
            to the time since last access. Memories that are accessed (even via recall testing) will
            demonstrate measurably slower decay due to access boost mechanics.
          </p>
        </div>
      </div>

      {/* Decay Algorithm */}
      <div className="card">
        <h2 className="section-title">Decay Algorithm</h2>
        <p className="text-sm text-gray-500 mb-4">
          Source: <code className="text-cyan-400">@terronex/engram-trace-lite</code> consolidator.js
        </p>
        <div className="code-block">
          <div className="text-gray-500">// Core decay formula</div>
          <div className="text-cyan-400">effectiveAge = (realAge - accessBoost) / importanceMultiplier</div>
          <br />
          <div className="text-gray-500">// Access boost: each access adds 0.5 days (max 5 days total)</div>
          <div className="text-amber-400">accessBoost = min(accessCount * 0.5, 5)</div>
          <br />
          <div className="text-gray-500">// Importance multiplier: importance 0-1 maps to 1x-3x slowdown</div>
          <div className="text-amber-400">importanceMultiplier = 1 + (importance * 2)</div>
          <br />
          <div className="text-gray-500">// Tier transition thresholds</div>
          <div><span className="tier-hot">HOT</span>  <span className="text-gray-500">→</span> <span className="tier-warm">WARM</span>    <span className="text-gray-500">:</span> effectiveAge <span className="text-gray-500">&gt;</span> <span className="text-white">{tierThresholds.hotDays}</span> days</div>
          <div><span className="tier-warm">WARM</span> <span className="text-gray-500">→</span> <span className="tier-cold">COLD</span>    <span className="text-gray-500">:</span> effectiveAge <span className="text-gray-500">&gt;</span> <span className="text-white">{tierThresholds.warmDays}</span> days</div>
          <div><span className="tier-cold">COLD</span> <span className="text-gray-500">→</span> <span className="tier-archive">ARCHIVE</span> <span className="text-gray-500">:</span> effectiveAge <span className="text-gray-500">&gt;</span> <span className="text-white">{tierThresholds.coldDays}</span> days</div>
        </div>
      </div>

      {/* Consolidation Pipeline */}
      <div className="card">
        <h2 className="section-title">Consolidation Pipeline</h2>
        <p className="text-sm text-gray-500 mb-4">
          Five-phase stateless pipeline. Runs after each memory injection via <code className="text-cyan-400">allo consolidate</code>.
        </p>
        <div className="space-y-3">
          {[
            { phase: 1, name: "Decay", desc: "Age memories through tiers based on time + access patterns. Pure time-based, no dependencies.", available: true },
            { phase: 2, name: "Deduplicate", desc: `Remove near-identical memories with cosine similarity > ${consolidationDefaults.deduplicateThreshold}. Keeps higher importance/access memory.`, available: true },
            { phase: 3, name: "Cluster", desc: `Group similar WARM/COLD memories by embedding proximity (threshold: ${consolidationDefaults.clusterThreshold}, min cluster: ${consolidationDefaults.minClusterSize}).`, available: false },
            { phase: 4, name: "Summarize", desc: "Collapse clusters into single summary entries. Requires LLM summarizer.", available: false },
            { phase: 5, name: "Archive", desc: `Truncate ARCHIVE-tier content to ${consolidationDefaults.archiveTruncateLength} characters to save space.`, available: true },
          ].map((p) => (
            <div key={p.phase} className="flex gap-4 bg-[#111118] rounded-lg p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400">
                {p.phase}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{p.name}</span>
                  <span className={`badge ${p.available ? "badge-active" : "badge-archive"}`}>
                    {p.available ? "active" : "requires LLM"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Protocol */}
      <div className="card">
        <h2 className="section-title">Test Protocol</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-medium mb-3">Daily Injection</h3>
            <div className="code-block text-xs">
              <div className="text-gray-500"># Runs every day via inject_only.sh</div>
              <div className="text-gray-500"># Adds 50 facts from next subject in rotation</div>
              <div className="text-gray-500"># 16 subjects cycle: physics(7) → science(3) → stem(3) → humanities(3)</div>
              <br />
              <div>1. Load current rotation_index from state.json</div>
              <div>2. Select subject[rotation_index % 16]</div>
              <div>3. Read facts from data/subjects/&lt;subject&gt;.json</div>
              <div>4. <span className="text-cyan-400">allo remember</span> each fact with tags</div>
              <div>5. <span className="text-cyan-400">allo consolidate</span> (triggers decay)</div>
              <div>6. Increment rotation_index</div>
              <div>7. <strong className="text-amber-400">NO recall testing</strong></div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-3">Weekly Recall Test</h3>
            <div className="code-block text-xs">
              <div className="text-gray-500"># Runs weekly via weekly_test.sh</div>
              <div className="text-gray-500"># Tests 25% of available questions (max 50)</div>
              <div className="text-gray-500"># Only tests subjects already injected</div>
              <br />
              <div>1. List subjects injected so far (rotation_index)</div>
              <div>2. Gather all questions for those subjects</div>
              <div>3. Random sample 25% (cap at 50)</div>
              <div>4. <span className="text-cyan-400">allo recall</span> each question</div>
              <div>5. Score: similarity &gt; 30% = success</div>
              <div>6. Record recall_rate, avg_similarity</div>
              <div>7. Save to results/weekly_test_DATE.json</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Weekly */}
      <div className="card">
        <h2 className="section-title">Why Weekly Testing?</h2>
        <div className="bg-[#111118] rounded-lg p-6">
          <p className="text-gray-300 mb-4">
            An early design flaw was discovered on Day 2: daily recall testing was <strong>preventing decay</strong>.
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Each <code className="text-cyan-400">allo recall</code> increments the memory&apos;s <code className="text-cyan-400">accessCount</code>,
            which feeds into the <code className="text-cyan-400">accessBoost</code> formula. With daily testing,
            a memory accessed just 10 times would gain a 5-day boost to its effective age, potentially
            keeping it in HOT tier indefinitely.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800 p-4 rounded">
              <div className="tier-hot font-medium mb-1">Daily Testing (original)</div>
              <div className="text-gray-400">8-day-old memory with 10 accesses:</div>
              <div className="font-mono text-gray-300 mt-1">
                effectiveAge = (8 - 5) / 1 = <span className="text-red-400">3 days</span>
              </div>
              <div className="text-gray-500 mt-1">Still HOT (needs &gt;7)</div>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <div className="text-green-400 font-medium mb-1">Weekly Testing (current)</div>
              <div className="text-gray-400">8-day-old memory with 1 access:</div>
              <div className="font-mono text-gray-300 mt-1">
                effectiveAge = (8 - 0.5) / 1 = <span className="text-green-400">7.5 days</span>
              </div>
              <div className="text-gray-500 mt-1">Transitions to WARM (exceeds 7)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ARCHITECTURE TAB ────────────────────────────────────────────────────────

function Architecture() {
  return (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="card">
        <h2 className="section-title">System Architecture</h2>
        <div className="code-block text-xs leading-relaxed">
          <pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                     DECAY EXPERIMENT HOST                       │
│                   WSL2 / Ubuntu on Windows                      │
│                                                                 │
│  ┌──────────────┐    ┌──────────────────────┐                   │
│  │ inject_only  │───>│  Allo CLI            │                   │
│  │  .sh (daily) │    │  (allo remember)     │                   │
│  └──────────────┘    │                      │                   │
│                      │  ┌────────────────┐  │                   │
│  ┌──────────────┐    │  │ engram-trace-  │  │                   │
│  │ weekly_test  │───>│  │ lite           │  │                   │
│  │  .sh (weekly)│    │  │                │  │                   │
│  └──────────────┘    │  │ - Consolidator │  │                   │
│                      │  │ - Decay engine │  │                   │
│                      │  │ - Dedup        │  │                   │
│                      │  └───────┬────────┘  │                   │
│                      │          │            │                   │
│                      │  ┌───────▼────────┐  │  ┌──────────────┐ │
│  ┌──────────────┐    │  │  Engram File   │  │  │ Xenova/      │ │
│  │ questions    │    │  │  (.engram)     │◄─┼──│ MiniLM-L6-v2 │ │
│  │  .json       │    │  │                │  │  │ (384 dims)   │ │
│  └──────────────┘    │  │  Binary format │  │  └──────────────┘ │
│                      │  │  Content +     │  │                   │
│  ┌──────────────┐    │  │  Vectors +     │  │                   │
│  │ subjects/    │    │  │  Metadata      │  │                   │
│  │  *.json      │    │  └────────────────┘  │                   │
│  └──────────────┘    └──────────────────────┘                   │
│                                                                 │
│  ┌──────────────┐    ┌──────────────────────┐                   │
│  │ state.json   │    │ results/             │                   │
│  │ rotation_idx │    │  test_YYYY-MM-DD     │                   │
│  │ last_subject │    │  weekly_test_DATE    │                   │
│  └──────────────┘    └──────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
          `}</pre>
        </div>
      </div>

      {/* Components */}
      <div className="card">
        <h2 className="section-title">Components</h2>
        <div className="space-y-4">
          {[
            { name: "Allo CLI", version: "latest", desc: "Command-line interface for Engram memory operations. Wraps engram-trace-lite with user-friendly commands.", path: "~/.npm-global/bin/allo" },
            { name: "@terronex/engram-trace-lite", version: "0.1.0", desc: "Lightweight consolidation engine. Implements decay, dedup, clustering, summarization, and archival. Stateless, pure-function pipeline.", path: "~/.npm-global/lib/node_modules/@terronex/allo/node_modules/@terronex/engram-trace-lite/" },
            { name: "@terronex/engram", version: "2.1.2", desc: "Core Engram library. Single-file format containing content + vectors + metadata in binary Float32 format.", path: "npm: @terronex/engram" },
            { name: "Xenova/all-MiniLM-L6-v2", version: "ONNX", desc: "384-dimensional embedding model. JavaScript port of sentence-transformers/all-MiniLM-L6-v2 via @xenova/transformers. Runs locally on CPU.", path: "Loaded at runtime by Allo" },
          ].map((c) => (
            <div key={c.name} className="bg-[#111118] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-white font-medium">{c.name}</span>
                <span className="text-xs font-mono text-cyan-400">{c.version}</span>
              </div>
              <p className="text-sm text-gray-400">{c.desc}</p>
              <p className="text-xs text-gray-600 mt-1 font-mono">{c.path}</p>
            </div>
          ))}
        </div>
      </div>

      {/* File Format */}
      <div className="card">
        <h2 className="section-title">Engram File Format</h2>
        <p className="text-sm text-gray-500 mb-4">
          Each .engram file is a single binary container storing content, embeddings, and metadata together.
          No external database required.
        </p>
        <div className="code-block text-xs">
          <pre>{`Memory Entry Structure:
┌────────────────────────────────────────────┐
│  id:          UUID                         │
│  content:     "The speed of light is..."   │
│  embedding:   Float32Array[384]            │
│  tier:        "hot" | "warm" | "cold" | "archive"  │
│  importance:  0.0 - 1.0                    │
│  accessCount: number                       │
│  createdAt:   ISO 8601 timestamp           │
│  lastAccess:  ISO 8601 timestamp           │
│  tags:        ["decay-test", "physics"]    │
└────────────────────────────────────────────┘

Current brain: test-v21.engram
  Memories: 824
  Size: 3.05 MB
  Avg per memory: ~3.8 KB (content + 384 floats + metadata)`}</pre>
        </div>
      </div>

      {/* Embedding Model */}
      <div className="card">
        <h2 className="section-title">Embedding Model</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-medium mb-2">all-MiniLM-L6-v2</h3>
            <table className="data-table">
              <tbody>
                <tr><td className="text-gray-500">Dimensions</td><td className="text-white">384</td></tr>
                <tr><td className="text-gray-500">Model size</td><td className="text-white">~22 MB</td></tr>
                <tr><td className="text-gray-500">Max sequence</td><td className="text-white">256 tokens</td></tr>
                <tr><td className="text-gray-500">Runtime</td><td className="text-white">ONNX (CPU)</td></tr>
                <tr><td className="text-gray-500">JS port</td><td className="text-white">Xenova/transformers</td></tr>
                <tr><td className="text-gray-500">Similarity</td><td className="text-white">Cosine distance</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Why This Model?</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Runs entirely on CPU -- no GPU required</li>
              <li>Sub-10ms per embedding at 384 dims</li>
              <li>Good balance of quality vs. size for semantic search</li>
              <li>Native JavaScript via @xenova/transformers (no Python)</li>
              <li>Same model as the Python sentence-transformers version</li>
              <li>Small enough for browser deployment if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TIMELINE TAB ────────────────────────────────────────────────────────────

function Timeline() {
  const events = [
    { date: "Mar 4", day: 0, title: "Experiment begins", desc: "First 227 memories injected. Daily testing active. Brain: 0.84 MB." },
    { date: "Mar 5", day: 1, title: "Day 1: +25 memories", desc: "252 total. Recall: 0% (questions from non-injected subjects)." },
    { date: "Mar 6", day: 2, title: "First successful recall", desc: "76% recall, 43% similarity. 343 memories. Testing physics subjects matched injected data.", highlight: true },
    { date: "Mar 7", day: 3, title: "Growth continues", desc: "484 memories. Recall 0% again (subject mismatch in test pool)." },
    { date: "Mar 8", day: 4, title: "674 memories", desc: "Brain reaches 2.5 MB. All memories still in HOT tier." },
    { date: "Mar 9", day: 5, title: "Injection nearly complete", desc: "823 memories, 3.05 MB. Discovered daily testing prevents tier decay via access boosts." },
    { date: "Mar 10", day: 6, title: "Injection plateau", desc: "823 memories stable. No new injections (some subjects have only 1 fact)." },
    { date: "Mar 11", day: 7, title: "Design flaw identified", desc: "Daily recall was boosting accessCount, preventing HOT → WARM transitions. Switched to weekly testing protocol.", highlight: true },
    { date: "Mar 12", day: 8, title: "First weekly test", desc: "30% recall, 26% similarity. New protocol: inject_only.sh (daily) + weekly_test.sh. 25% sampling.", highlight: true },
    { date: "Mar 19", day: 15, title: "✓ HOT → WARM transitions achieved!", desc: "252 memories transitioned to WARM tier. Tier system validated - decay working as designed!", highlight: true },
    { date: "~Apr 3", day: 30, title: "Expected: WARM → COLD begins", desc: "First memories reach 30-day effective age. Clustering phase activates.", future: true },
    { date: "~Jun 2", day: 90, title: "Experiment concludes", desc: "Final analysis. Full decay curve. Publish results.", future: true },
  ];

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="section-title">Experiment Timeline</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-800"></div>

          <div className="space-y-6">
            {events.map((e, i) => (
              <div key={i} className={`flex gap-4 ${e.future ? "opacity-50" : ""}`}>
                <div className="flex-shrink-0 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono
                    ${e.highlight ? "bg-cyan-900/50 border border-cyan-700 text-cyan-400" :
                      e.future ? "bg-gray-800 border border-gray-700 text-gray-500" :
                      "bg-gray-800 border border-gray-700 text-gray-400"}`}>
                    {e.day}
                  </div>
                </div>
                <div className={`pb-6 ${e.future ? "" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">{e.date}</span>
                    {e.highlight && <span className="badge badge-active">milestone</span>}
                    {e.future && <span className="badge badge-archive">projected</span>}
                  </div>
                  <h3 className="text-white font-medium mt-1">{e.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="card">
        <h2 className="section-title">Predictions</h2>
        <div className="space-y-4">
          <div className="bg-[#111118] rounded-lg p-4 border-l-4 border-red-500">
            <h3 className="text-white font-medium">HOT → WARM (Days 14-21)</h3>
            <p className="text-sm text-gray-400 mt-1">
              Earliest memories (Day 0, no access boost) should transition first.
              With importance=0 and accessCount near 0, effective age equals real age.
              At Day 14, effectiveAge = 14 &gt; 7. Expect batch transition of ~200 memories.
            </p>
          </div>
          <div className="bg-[#111118] rounded-lg p-4 border-l-4 border-amber-500">
            <h3 className="text-white font-medium">Recall Degradation (Days 21-45)</h3>
            <p className="text-sm text-gray-400 mt-1">
              As memories move to WARM tier, recall quality may drop. WARM memories are still
              searchable but may be deprioritized in results. Key metric: does similarity score
              drop below 30% threshold?
            </p>
          </div>
          <div className="bg-[#111118] rounded-lg p-4 border-l-4 border-blue-500">
            <h3 className="text-white font-medium">WARM → COLD (Days 60+)</h3>
            <p className="text-sm text-gray-400 mt-1">
              Cold transition requires effectiveAge &gt; 30. At this point, clustering and
              summarization (if LLM is connected) would begin merging related COLD memories
              into compressed representations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function TierRow({ label, count, total, color, desc }: { label: string; count: number; total: number; color: string; desc: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="w-16 text-sm font-mono font-bold" style={{ color }}>{label}</span>
      <div className="flex-1 bg-[#111118] rounded-full h-6 relative overflow-hidden">
        <div
          className="h-full rounded-full bar-chart-bar"
          style={{ width: `${Math.max(pct > 0 ? 2 : 0, pct)}%`, background: color }}
        ></div>
        {count > 0 && (
          <span className="absolute right-3 top-0 h-full flex items-center text-xs text-gray-400">
            {count} ({pct.toFixed(1)}%)
          </span>
        )}
      </div>
      <span className="text-xs text-gray-600 w-64 hidden md:block">{desc}</span>
    </div>
  );
}
