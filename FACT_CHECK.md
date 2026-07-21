# Agent Atlas verification ledger

Last reviewed: paper library 21 July 2026; curriculum extension 22 July 2026.

This project is intentionally a **curated milestone map**, not a claim that every paper mentioning an agent is equally central. Its factual-content standard is deliberately narrow: each paper card has one primary source, each summary stays within the source's abstract or original research release, and performance figures are omitted unless a learner opens the source and inspects the task, model, metric, and version.

## Paper-library audit

- **46** cards are in [`src/content.js`](./src/content.js).
- **41** cards link to arXiv primary records. The URLs returned HTTP 200 in the link audit; their citation titles were compared with the displayed titles. Forty matched exactly and one uses the conventional Unicode `τ` rendering of arXiv's LaTeX title markup.
- **5** cards link to their issuing organization's original research release: [PaperBench](https://openai.com/index/paperbench/), [BrowseComp](https://openai.com/index/browsecomp/), [SWE-Lancer](https://openai.com/index/swe-lancer/), [GeneBench-Pro](https://openai.com/index/introducing-genebench-pro/), and [LifeSciBench](https://openai.com/index/introducing-life-sci-bench/).
- The 2025–26 frontier additions were checked against their original paper records or original research releases before inclusion. They are labelled by year rather than being folded into older claims.

## Framework-guide audit

- Google ADK guide: [official ADK agent documentation](https://adk.dev/agents/).
- LangGraph guide: [official LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview).

The guides teach stable architectural concepts—agent contracts, state, nodes, edges, tool boundaries, evaluation, and approval points. They do not promise API behaviour beyond the linked official documentation.

## Curriculum audit

- The eight course modules each carry a primary-source anchor and a three-part field guide.
- Field guides are deliberately framed as implementation and review practices rather than unsupported benchmark claims. They cover task contracts, context boundaries, planning signals, tool validation, memory lifecycle, typed handoffs, evaluation cases, and benchmark interpretation.
- The learning material avoids performance figures and vendor-specific capability claims unless the learner follows the linked original source.

## Extended curriculum audit

- The expanded path adds **24** source-anchored deep-dive lessons, **6** hands-on build labs, and **5** guided reading routes.
- New lesson and lab anchors use the official Google ADK and LangGraph documentation or original paper records for ReAct, Toolformer, Tree of Thoughts, Generative Agents, MemGPT, AutoGen, AgentBench, WebArena, AgentDojo, τ-bench, OSWorld, BrowserGym, Magentic-One, and the coding-benchmark position paper.
- The extension was checked on 22 July 2026. Its descriptions are scoped to the cited source's architecture, task setting, or benchmark purpose; it intentionally makes no leaderboard, safety-guarantee, or framework-API compatibility claims.
- Build exercises are instructional designs, not assertions that one architecture is universally best. They ask learners to preserve evidence, permissions, state, recovery, and review artifacts so claims can be tested in a local context.
- The eight curriculum modules now contain full chapter lessons: four concept sections, a worked trace, a self-check with an answer key, a working glossary, and primary-source links per module. The explanatory text is deliberately framed as a design and review method; it does not make uncited performance claims.

## Reading rule

Source links make claims inspectable; they do not make every implementation choice universally correct. Before applying a paper's result, check its version, task setup, environment, evaluation method, limitations, and whether its result transfers to your agent.
