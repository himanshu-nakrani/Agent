# 🤖 Agentic AI — Research Intelligence Report

> **Author:** Himanshu Nakrani | State Street Corporation
> **Generated:** June 14, 2026
> **Targets:** AAAI 2027 (Jul 28 deadline) · ICLR 2027 (~Sep 2026 deadline)
> **Source:** [Sauna AI Extended Report](https://app.sauna.ai/share/research-intelligence-extended-cckizg6puu2t)

---

<p align="center">
  <a href="./agent-atlas/README.md">
    <img src="./agent-atlas/public/assets/hero-books.png" alt="Agent Atlas learning library" width="760" />
  </a>
</p>

## ✦ Explore Agent Atlas

This repository now includes [**Agent Atlas**](./agent-atlas/README.md): a calm, source-linked learning library that turns this research landscape into a guided path from first principles to practical agent systems.

| Learn | Build | Investigate |
| --- | --- | --- |
| 8 curriculum modules and 24 full lessons | 6 practical labs plus Google ADK and LangGraph guides | 46 source-linked paper entries and 5 reading routes |

<details>
<summary><strong>Start the learning experience locally</strong></summary>

```bash
cd agent-atlas
npm install
npm run dev
```

Then open the local Vite URL and begin at `/learn`. The full [Agent Atlas README](./agent-atlas/README.md) includes a route map, learner paths, source policy, and production build instructions.

</details>

---

## Table of Contents

1. [Explore Agent Atlas](#-explore-agent-atlas)
2. [The Big Paradigm Shift](#-the-big-paradigm-shift)
3. [4 Key Trends in Agentic AI](#-4-key-trends-in-agentic-ai)
4. [Critical Unsolved Problems](#-critical-unsolved-problems)
5. [Paper Proposals](#-4-paper-proposals-agentic-ai-focus)
   - [Paper 1: Curriculum RL for Agent Tool-Use](#paper-1-curriculum-rl-for-agent-tool-use--highest-novelty)
   - [Paper 2: CascadeBreaker — Self-Correction as Cascade Interruption](#paper-2-cascadebreaker--self-correction-as-cascade-interruption-in-multi-agent-systems)
   - [Paper 3: Agent Trace Evaluation Framework](#paper-3-agent-trace-evaluation-framework-process-level)
   - [Paper 4: Memory Consolidation & Forgetting](#paper-4-memory-consolidation--forgetting-for-long-horizon-agents)
6. [Decision Matrix](#-decision-matrix)
7. [Recommendation](#-recommendation)
8. [Key References](#-key-references)

---

## 📐 The Big Paradigm Shift

The field is moving from **pipeline-based agents** (external logic orchestrates planning/tool-use/memory) → **model-native agentic AI** where these capabilities are internalized into model parameters via RL. This is the defining transition of 2026–2028.

**Key Paper:** *"Beyond Pipelines: A Survey of the Paradigm Shift toward Model-Native Agentic AI"* (arXiv:2510.16720, Oct 2025)

- RL enables outcome-driven exploration rather than imitating static data
- Application domains: **Deep Research Agents** (long-horizon reasoning), **GUI Agents** (embodied interaction)
- Future trajectory: internalization of multi-agent collaboration and reflection

---

## 🔮 4 Key Trends in Agentic AI

### Trend 1: RL-Internalized Agent Capabilities

- Agents are moving from prompting strategies (ReAct, CoT) to RL-trained internal reasoning
- Deep Research Agents (long-horizon) and GUI Agents (embodied interaction) are the two proving grounds
- **Next frontier:** internalizing multi-agent collaboration and self-reflection via RL
- Databricks TAO bakes inference-time reasoning into the fine-tuning phase — open-source models achieve proprietary-tier reasoning at standard inference cost

**Implication for your stack:** Your Text-to-SQL agent and RAG pipelines should adopt PRM-scored reasoning loops rather than relying on a single generation pass. TAO offers a path to inference-time reasoning power without runtime token cost for your Llama 3.1 fine-tunes.

### Trend 2: Agent Memory Is Maturing

- New taxonomy: **Token-level, Parametric, and Latent** memory (not just long/short-term)
- Three functions: Factual, Experiential, Working memory
- Three dynamics: formation, evolution, retrieval
- Systems: Hindsight (4-network memory), GCC (Git-like version control for context), SciBORG (FSA-based memory), AgentInfer (semantic compression)
- **Critical gap:** No principled forgetting/consolidation mechanism exists

**Key Paper:** *"Memory in the Age of AI Agents"* (arXiv:2512.13564, Dec 2025)

**Implication:** Agent Forge should have memory governance as a first-class module. For State Street, this means separating transaction-context memory from fund knowledge from agent execution history — each with distinct retention, decay, and access-control policies.

### Trend 3: Tool Ecosystem Explosion (MCP Era)

- Model Context Protocol is becoming the standard but creates new attack surfaces
- Tool use correctness is still only **30–60%** even for frontier models
- Agents can't discover or create tools autonomously — they only use pre-defined ones
- MCP security: "The boundary between epistemic errors (hallucinations) and security breaches dissolves"

**Key Paper:** MCP Security Analysis (arXiv:2512.08290)

### Trend 4: Self-Correction & Error Cascade Awareness

- The **self-correction paradox**: prompted LLMs can't self-correct without external feedback, yet agents detect errors at 53–94% rates — the failure is architectural, not cognitive (Kamoi et al., TACL 2024)
- **"Self-Correction Illusion"** (2025): relabeling `<self>` to an external role lifts correction rates by **23–93 pp** — it's a template artifact
- Structured Reflection (trained diagnosis + repair) turns error→repair into an explicit trainable action (Su et al., ACL 2025)
- Self-Reflective APIs with machine-readable recovery feedback: **+36.7–40 pp** task completion lift
- **Error propagation in MAS** is now measurable: CHARM achieves **89.4% cascade detection**, CTHA reduces cascades by **47%**, "From Spark to Fire" shows a single atomic error can corrupt an entire pipeline
- The field is fragmented: self-correction studies single agents, error propagation studies topologies — **nobody has connected them**

**Key Papers:** Kamoi et al. (TACL 2024), "Failure Makes the Agent Stronger" (ACL 2025), CHARM (arXiv:2606.04435), "From Spark to Fire" (arXiv:2603.04474), CTHA (arXiv:2601.10738)

---

## 🔴 Critical Unsolved Problems

| Severity | Gap | Evidence |
|---|---|---|
| **Critical** | Long-horizon planning is fundamentally broken | CubeBench: **0.00% pass rate** on all long-horizon tasks |
| **Critical** | Agent reliability is catastrophically low | τ-bench: GPT-4o pass^8 consistency **<25%** over 8 trials |
| **Critical** | Multi-agent systems show "enthusiasm but minimal gains" | MAST analysis: 1,600+ traces across 7 MAS frameworks, 14 unique failure modes |
| **High** | Tool use far from production-ready | 30–60% correctness; C³-Bench shows failures at tool dependencies and composition |
| **High** | Security is an afterthought | Agents more vulnerable to **memory injection than prompt injection** (CrAIBench) |
| **High** | Process-level evaluation doesn't exist | No benchmark evaluates *how* agents solve problems, only *if* they succeed |
| **High** | Web agents still massively behind humans | WebArena: best agent **14.41%** vs human **78.24%** |
| **High** | OS-level agents far from usable | OSWorld: best model **12.24%** vs human **72.36%** |
| **Medium** | No standardized agent communication protocols | "No standard way for agents to communicate with external tools or data sources" |
| **Medium** | Curriculum learning for agents is virtually empty | Only 1 paper found; showed curriculum can backfire ("learned pessimism") |
| **Medium** | Synthetic data for agent training is scarce | Learn-by-interact: synthetic data improved ICL by 12.2%, training by 19.5% |
| **High** | Self-correction is architectural, not cognitive | Agents detect errors (53–94%) but miscorrect (53–94%); template artifact blocks capability |
| **High** | Single errors cascade through multi-agent pipelines | "From Spark to Fire": one atomic error causes system-wide failure; governance prevents infection in ≥89% of runs |

### Detailed Gap Analysis

**1. Long-Horizon Planning Failure**
- CubeBench reveals agents have fundamental failures in long-term planning under partial observability
- Agents assume deterministic environments; no work on probabilistic planning with LLM agents
- No benchmark specifically tests agents' ability to detect plan failure and replan dynamically

**2. Multi-Agent System Fragility**
- MAST Taxonomy (Cemri et al., 2025): 1,600+ annotated traces across 7 MAS frameworks
- 14 unique failure modes in 3 categories: (i) system design issues, (ii) inter-agent misalignment, (iii) task verification
- Models tested: GPT-4, Claude 3, Qwen2.5, CodeLlama
- "Enthusiasm but minimal performance gains on popular benchmarks"

**3. Tool Composition & Reliability**
- C³-Bench shows agents fail at tool dependencies, long-context info, and policy switching
- No work addresses robustness when tool chains are composed dynamically
- No formal study of how agents compose tools in novel ways vs. memorized patterns

**4. Security & Adversarial Robustness**
- CrAIBench (150+ blockchain tasks, 500+ attack test cases): AI models significantly more vulnerable to memory injection than prompt injection
- AgentDojo (97 tasks, 629 security test cases): SOTA LLMs fail many tasks even without attacks
- No principled defense framework exists; current work is purely empirical benchmarking

**5. Evaluation Methodology Gaps**
- Most benchmarks use binary task completion
- ResearchGym: agents improve in only 6.7% of cases
- Scale ≠ robustness (KAMI)
- No standard methodology for capturing behavioral distributions of stochastic agents
- No benchmark tests whether agent skills transfer across domains

**6. Self-Correction & Error Cascade Gap**
- The self-correction paradox: LLMs can correct others but fail to correct themselves due to chat-template role artifacts (relabeling `<self>` → external role lifts correction by 23–93 pp)
- Conditional miscorrection rate is dominant (53–94%) — agents detect errors but correct them wrong
- Isolated self-correction outperforms unguided multi-agent debate (debate suffers from sycophantic conformity 85.5%, contextual fragility 70.0%, consensus collapse 32.3%)
- In multi-agent pipelines, a single atomic error seed causes system-wide failure (CHARM: 89.4% cascade detection, 82.1% propagation reduction with governance)
- **Nobody has connected** agent-level self-correction capability to system-level cascade interruption — this is the wide-open gap

---

## 📝 4 Paper Proposals (Agentic AI Focus)

### Paper 1: Curriculum RL for Agent Tool-Use ⭐ Highest Novelty

| | |
|---|---|
| **Title** | *CurriculumRL: Progressive Skill Acquisition for LLM Agent Tool-Use via Curriculum-Guided Reinforcement Learning* |
| **Gap** | Virtually zero systematic work on designing curricula for agent training. Only 1 paper exists (Madmoun & Lahlou, EACL 2026), and it showed naive curricula backfire ("learned pessimism"). |
| **Contribution** | 1. Formalize curriculum design for LLM agents: automated task difficulty calibration, progressive skill acquisition, exploration-exploitation balance. 2. Show that curriculum-aware RL fine-tuning produces agents that generalize tool composition better than standard RL. 3. Design space analysis: ordering strategies, difficulty metrics, transfer measurement. |
| **Target** | ICLR 2027 (learning theory angle) or AAAI 2027 (agent design) |
| **Effort** | 4–5 months |
| **Your fit** | Very high — you've done QLoRA fine-tuning, RLHF work, and pretraining. You understand the training pipeline. |
| **Hypothesis** | "Curriculum-ordered RL training with progressive tool-complexity scaling produces agents with X% higher tool-use generalization than standard RL or SFT, measured on unseen tool compositions." |
| **Baselines** | Standard RL (GRPO/PPO), SFT on tool traces, Madmoun & Lahlou's curriculum approach |
| **Metrics** | Tool-use accuracy on unseen compositions, generalization rate, training efficiency (sample complexity), failure mode analysis |
| **Why you** | Directly extends your fine-tuning/pretraining research interests. Almost no competition — this is a wide-open space. The theoretical angle (curriculum theory + RL) is ICLR-friendly. |

### Paper 2: CascadeBreaker — Self-Correction as Cascade Interruption in Multi-Agent Systems

| | |
|---|---|
| **Title** | *CascadeBreaker: Interrupting Error Propagation in Multi-Agent Systems via Trained Self-Correction at Critical Nodes* |
| **Gap** | Self-correction and error propagation are studied in isolation. No work connects agent-level correction capability to system-level cascade behavior. No framework identifies *where* in a multi-agent pipeline to deploy correction for maximum cascade interruption. |
| **Contribution** | 1. **Error propagation graph model**: formalize how errors flow through multi-agent topologies with dependency edges. 2. **Critical node identification**: algorithm to find which agent in the pipeline, if corrected, maximally reduces cascade probability. 3. **Trained correction module**: lightweight verifier/corrector that can be inserted at critical nodes — trained on failure trajectories (à la CLEANER + Structured Reflection). 4. **CascadeBreaker benchmark**: inject errors at different positions in multi-agent pipelines, measure cascade rates with/without correction at identified critical nodes. |
| **Target** | AAAI 2027 or ICLR 2027 |
| **Effort** | 4–5 months |
| **Your fit** | Very high — Alpha Copilot is a multi-stage agent pipeline (schema extraction → SQL generation → correction → execution). You've seen cascading failures in production. |
| **Hypothesis** | "Targeted self-correction at topologically critical nodes in multi-agent pipelines reduces final-task error rate by X% compared to uniform correction deployment, and by Y% compared to no correction, with Z% lower overhead than full-pipeline verification." |
| **Baselines** | No correction, uniform correction at every agent, CHARM (cascade detection), CTHA (message contracts), AgentDropoutV2 (firewall) |
| **Metrics** | Cascade interruption rate, final-task accuracy, correction overhead (latency + tokens), false correction rate |
| **Why you** | Alpha Copilot's multi-stage pipeline (Text-to-SQL + RAG) is a real multi-agent system where you've seen cascading errors in production. The graph-theoretic cascade model gives ICLR-friendly theory; the benchmark gives NeurIPS D&B appeal. CHARM, CTHA, and "From Spark to Fire" are all from Jan–Jun 2026 — the community is actively working on this but hasn't connected self-correction to cascade interruption yet. |

### Paper 3: Agent Trace Evaluation Framework (Process-Level)

| | |
|---|---|
| **Title** | *AgentProbe: Process-Level Evaluation and Failure Attribution for Agentic Systems* |
| **Gap** | All current benchmarks (SWE-bench, WebArena, τ-bench) measure binary success. No framework evaluates reasoning traces, tool selection quality, error recovery, or component-level attribution. |
| **Contribution** | 1. Formal trace decomposition protocol for agent execution spans. 2. Process-level scoring: reasoning quality, tool selection appropriateness, recovery from failures. 3. Statistical framework for stochastic agent evaluation (agents aren't deterministic but benchmarks pretend they are). 4. Agent-as-a-Judge calibrated for trace scoring with causal attribution chains. |
| **Target** | NeurIPS 2026 D&B or ICLR 2027 |
| **Effort** | 3–4 months |
| **Your fit** | High — your RAGrade / evaluation work maps directly. Agent Forge gives you production traces. |
| **Hypothesis** | "Process-level trace evaluation reveals failure patterns invisible to task-completion metrics, and trace-decomposed scoring achieves ≥90% human alignment on agent quality assessment." |
| **Baselines** | Ragas, DeepEval, Opik, Agent-as-a-Judge, AgentBoard (progress rate metric) |
| **Metrics** | Human alignment rate, evaluation cost reduction vs. human review, component-level attribution precision, false attribution rate |
| **Why you** | NeurIPS Datasets & Benchmarks track actively seeks evaluation framework contributions. You have real production pipelines to run the evaluation on — differentiator against purely academic proposals. |

### Paper 4: Memory Consolidation & Forgetting for Long-Horizon Agents

| | |
|---|---|
| **Title** | *Consolidation-Aware Agent Memory: Learning What to Forget for Long-Horizon Tasks* |
| **Gap** | Agents accumulate context with no principled forgetting mechanism. Long-horizon tasks (10+ steps) fail partly due to context pollution. No cognitive-science-inspired consolidation exists for LLM agents. |
| **Contribution** | 1. Consolidation-aware memory module: periodic "sleep-like" compression that preserves decision-relevant memories and discards noise. 2. Benchmark for memory-dependent reasoning (not just retrieval). 3. Show that consolidation prevents the context dilution failure mode in multi-hop agentic loops. |
| **Target** | AAAI 2027 or ICLR 2027 |
| **Effort** | 3–4 months |
| **Your fit** | High — connects to your RAG systems and agent memory work. |
| **Hypothesis** | "Consolidation-aware agent memory reduces context dilution failures by X% on long-horizon tasks (>10 steps) versus append-only memory, while maintaining Y% recall on decision-critical information." |
| **Baselines** | Naive append-only memory, sliding window, Hindsight, GCC |
| **Metrics** | Context dilution rate, decision-critical recall, task completion on long-horizon benchmarks, memory footprint efficiency |
| **Why you** | Cognitive-inspired approach connects to continual learning (ICLR hot topic). Combines your RAG infrastructure with novel agent memory design. |

---

## 🏆 Decision Matrix

| Paper | Novelty | Feasibility | Deadline Fit | Citation Potential | Effort |
|---|---|---|---|---|---|
| **Curriculum RL for Agents** | ⭐⭐⭐⭐⭐ (wide open) | ⭐⭐⭐ | AAAI 2027 ✅ / ICLR 2027 ✅ | High — foundational | 4–5 mo |
| **CascadeBreaker** | ⭐⭐⭐⭐⭐ (unifies 2 fields) | ⭐⭐⭐⭐ | AAAI 2027 ✅ / ICLR 2027 ✅ | Very high — practical + theoretical | 4–5 mo |
| **Agent Trace Evaluation** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ICLR 2027 ✅ | Very high — benchmarks get cited | 3–4 mo |
| **Memory Consolidation** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | AAAI 2027 ✅ | Moderate-high | 3–4 mo |

---

## 🎯 Recommendation

Given the **AAAI 2027 deadline (Jul 28)** and **ICLR 2027 (~Sep 2026)**:

1. **Start with Curriculum RL for Agents** — it's the widest open space, directly leverages your fine-tuning/pretraining skills, and has theoretical depth that ICLR values. You could submit to AAAI first (Jul 28) with initial results, then extend for ICLR.

2. **CascadeBreaker** is your strongest second paper — it unifies self-correction and error propagation (two hot subfields that haven't been connected), maps directly to Alpha Copilot's production architecture, and has both theoretical (graph model) and systems (benchmark) components. Target AAAI or ICLR.

3. **Parallel-track Agent Trace Evaluation** as a Datasets & Benchmarks paper — it's more execution-heavy but less research-risky. Your Agent Forge gives you a head start.

4. **Memory Consolidation** is the backup — strongest if you can connect it to cognitive science theory.

---

## 📚 Key References

### Surveys & Frameworks
- *"Beyond Pipelines: A Survey of the Paradigm Shift toward Model-Native Agentic AI"* — arXiv:2510.16720, Oct 2025
- *"Adaptation Framework for LLM Agents"* — arXiv:2512.16301
- *"Memory in the Age of AI Agents"* — arXiv:2512.13564, Dec 2025
- *MAST Taxonomy* (Cemri et al., 2025) — arXiv:2503.13657 — 1,600+ traces, 14 failure modes
- *Agent Protocols Survey* (Yang et al., 2025) — arXiv:2504.16736

### Benchmarks
- **CubeBench** — Long-horizon spatial reasoning; 0.00% pass rate on all long-horizon tasks
- **τ-bench** (Yao et al., 2024) — arXiv:2406.12045 — GPT-4o pass^8 <25%
- **WebArena** (Zhou et al., 2023) — arXiv:2307.13854 — Agent 14.41% vs Human 78.24%
- **OSWorld** (Xie et al., 2024) — arXiv:2404.07972 — Agent 12.24% vs Human 72.36%
- **SWE-bench** (Jimenez et al., 2023) — arXiv:2310.06770 — Agentless achieved 32% at $0.70
- **PRL-Bench** — Physics research tasks; best score <50%
- **MCPAgentBench** — Evaluates LLM agents' use of MCP tools

### Safety & Robustness
- *Agentic AI Security Survey* — arXiv:2603.22928
- **CrAIBench** (Patlan et al., 2025) — arXiv:2503.16248 — Memory injection > prompt injection
- **AgentDojo** (Debenedetti et al., 2024) — arXiv:2406.13352 — 97 tasks, 629 security test cases
- **ART** — Red-teaming at scale with 1.8M attacks
- *MCP Security Analysis* — arXiv:2512.08290

### Agent Memory & Planning
- **Hindsight** — 4-network memory (retain/recall/reflect)
- **GCC** — Git-like version control for context; +13% on SWE-Bench
- **SciBORG** — FSA-based memory
- **AgentInfer** — Semantic compression for latency reduction
- **DIANOIA** — Diagnostic framework for multi-agent reasoning

### Training & Data
- *Learn-by-interact* (Su et al., 2025) — arXiv:2501.10893 — Synthetic data: +12.2% ICL, +19.5% training
- *Madmoun & Lahlou* (EACL 2026) — Curriculum learning can backfire ("learned pessimism")
- **T1 Dataset** (NeurIPS 2025) — Multi-turn tool planning

### Multi-Agent
- **Evolving Idea Graphs (EIG)** — Top performer on AI Idea Bench 2025
- **NightFeats** — Won "Best Dynamic Evaluation" NeurIPS 2025
- **AnalogSAGE** — 10× pass rate improvement in analog circuit design

### Notable Agent Systems
- **SEVerA** — Verified Synthesis of Self-Evolving Agents; formal logic contracts, zero constraint violations

### Self-Correction & Error Propagation
- *"When Can LLMs Actually Correct Their Own Mistakes?"* (Kamoi et al., TACL 2024) — arXiv:2406.01297
- *"The Self-Correction Illusion"* (2025) — template artifact; relabeling lifts correction 23–93 pp
- *"Failure Makes the Agent Stronger"* (Su et al., ACL 2025) — arXiv:2509.18847 — Structured Reflection + Tool-Reflection-Bench
- *"Self-Reflective APIs"* (Canedo & Chethan, 2026) — arXiv:2606.05037 — +36.7–40 pp with machine-readable recovery feedback
- *"Internal Consistency and Self-Feedback in LLMs"* (Liang et al.) — arXiv:2407.14507 — Self-Feedback framework
- **RefGRPO** — Free calibration bonus for agentic RL; underconfidence 44.4% → 7.7%
- **CLEANER** — Self-Purified Trajectories; matches SOTA with ⅓ training data
- **Affordance Agent Harness** (Huang et al., 2026) — arXiv:2605.00663 — Verification-gated skill orchestration
- **CHARM** (Jun 2026) — arXiv:2606.04435 — Cascade hallucination detection; 89.4% detection, 82.1% propagation reduction
- *"From Spark to Fire"* (Mar 2026) — arXiv:2603.04474 — Error propagation as directed dependency graphs; governance prevents infection in ≥89%
- **CTHA** (Jan 2026) — arXiv:2601.10738 — 47% cascade reduction via message contracts + authority manifolds
- **AgentDropoutV2** (Feb 2026) — arXiv:2602.23258 — Active firewall; +6.39 pp math, +2.28 pp code
- **MAS-FIRE** (2026) — Fault injection framework; sequential topologies most vulnerable
- **AUTOTRANSFORM** (2024) — Single-leader topologies mitigate propagation; flat peer most susceptible
- *Misalignment Propagation* (Cruz, 2026) — Safety-aligned LLMs degraded by semantic peer pressure
- *"Where LLM Agents Fail"* (2025) — AgentErrorTaxonomy, AgentErrorBench; debugging yields +24% all-correct accuracy
- **TAMAS** (2025) — Adversarial benchmark for inter-agent interaction robustness
- **LEAP** — Solved all 12 Putnam 2025 problems via sorry-driven decomposition
- **STRIATUM-CTF** — Beat 21 human teams in cybersecurity CTF
- **AutoPentester** — 27% better subtask completion, 39.5% more vulnerability coverage
- **PokeAgent Challenge** — NeurIPS 2025 competition, 100+ teams

---

## 📋 Timeline

| Milestone | Target Date |
|---|---|
| AAAI 2027 submission | Jul 28, 2026 |
| ICLR 2027 submission | ~Sep 2026 |
| Paper 1 (Curriculum RL) — draft | Aug 2026 |
| Paper 2 (CascadeBreaker) — draft | Aug–Sep 2026 |
| Paper 3 (AgentTrace) — draft | Sep 2026 |
| Paper 4 (Memory Consolidation) — draft | Oct 2026 |

---

*Last updated: June 14, 2026*
