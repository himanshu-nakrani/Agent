const modules = [
  ['0. Orientation', 'Learn the vocabulary: agent, tool, memory, state, trace, planner, executor, evaluator, environment, and guardrail.', 'Draw an agent loop for booking travel, then mark which steps are deterministic and which need model judgment.', 'You can explain why agentic systems are control systems, not just longer prompts.'],
  ['1. LLM foundations', 'Tokens, context windows, sampling, system/developer/user instructions, structured outputs, embeddings, RAG, and hallucination sources.', 'Build a JSON-only intent extractor and test it with malformed user requests.', 'You can predict when a model call should be replaced by a rule, retrieval call, or validator.'],
  ['2. Tools and function calling', 'Schemas, validation, idempotency, retries, side effects, authentication, rate limits, and sandboxing.', 'Create tools for weather lookup, calendar search, and draft-email creation; make sending require approval.', 'You can design a tool API that is safe for an LLM to call.'],
  ['3. State and memory', 'Separate transcript, scratchpad, task state, user preferences, semantic memory, episodic memory, and source-of-truth databases.', 'Build a note-taking agent that remembers preferences but re-retrieves current facts.', 'You can decide what should be remembered, retrieved, expired, or never stored.'],
  ['4. Reasoning and planning', 'ReAct, plan-and-execute, tree search, reflection, self-debugging, decomposition, and replanning.', 'Implement a research loop with a max step budget and a critic that asks for missing evidence.', 'You can explain the tradeoff between deeper planning and latency/cost.'],
  ['5. Multi-agent design', 'Role separation, manager-worker patterns, debate, reviewer agents, blackboard state, contracts, and termination rules.', 'Create planner, researcher, writer, and reviewer agents with strict handoff schemas.', 'You can avoid fake role-play and use multi-agent systems only when coordination adds value.'],
  ['6. Frameworks', 'When to use raw SDKs, ADK, LangGraph, AutoGen-style conversations, workflow engines, queues, and MCP.', 'Rebuild the same assistant once as a simple loop, once as a LangGraph graph, and once as an ADK agent.', 'You can justify a framework choice based on persistence, observability, control, and deployment needs.'],
  ['7. Evaluation', 'Golden datasets, trajectory evaluation, rubric grading, unit tests for tools, adversarial prompts, and human review.', 'Create ten tasks with expected tool calls and run regression checks after changing prompts.', 'You can detect regressions in both final answers and intermediate behavior.'],
  ['8. Security and governance', 'Prompt injection, data exfiltration, tool abuse, least privilege, approvals, audit logs, privacy, and compliance.', 'Red-team your own agent with malicious web pages and adversarial tool outputs.', 'You can explain why retrieved text must never override system policy.'],
  ['9. Production operations', 'Tracing, metrics, queues, background jobs, checkpointing, rollbacks, cost budgets, SLAs, and incident response.', 'Deploy a toy agent with trace IDs, retries, dashboards, and a kill switch.', 'You can operate an agent as a production service rather than a notebook demo.']
];

const papers = [
  ['WebGPT', 'Nakano et al., 2021', 'Early browser-assisted question answering with human feedback. It taught builders to separate answer generation from evidence gathering and to make citation-backed browsing part of the workflow.'],
  ['MRKL Systems', 'Karpas et al., 2022', 'Proposed modular systems that route language-model requests to expert tools. This idea lives on in tool routers, calculators, search tools, and database agents.'],
  ['ReAct', 'Yao et al., 2022', 'Combined reasoning traces with actions and observations. ReAct became the default mental model for agents that need to think, call tools, inspect results, and continue.'],
  ['Toolformer', 'Schick et al., 2023', 'Showed that models can learn when and how to call APIs using self-supervised data. It influenced later function-calling and tool-use training work.'],
  ['Reflexion', 'Shinn et al., 2023', 'Added verbal self-reflection as memory after failed attempts. The practical lesson is to store lessons from failures and reuse them on future trials.'],
  ['Generative Agents', 'Park et al., 2023', 'Simulated believable human-like agents with memory streams, reflection, and planning. It remains essential for understanding social and long-horizon agent behavior.'],
  ['Voyager', 'Wang et al., 2023', 'Built an open-ended Minecraft agent with an automatic curriculum and reusable skill library. It is a landmark for lifelong skill acquisition.'],
  ['AutoGen', 'Wu et al., 2023', 'Popularized programmable multi-agent conversations, where specialized agents coordinate through message passing and tool use.'],
  ['AgentBench', 'Liu et al., 2023', 'Benchmarked LLM agents across interactive tasks, pushing the field beyond static QA into action-oriented evaluation.'],
  ['WebArena', 'Zhou et al., 2023', 'Provided realistic websites and tasks for web agents. It exposed how hard real browser interaction is compared with text-only benchmarks.'],
  ['SWE-bench', 'Jimenez et al., 2023', 'Evaluated systems on real GitHub issues and tests. It became a central benchmark for software engineering agents.'],
  ['SWE-agent', 'Yang et al., 2024', 'Showed that agent-computer interfaces and command design matter greatly for coding agents, not just the base model.'],
  ['OSWorld', 'Xie et al., 2024', 'Evaluated multimodal agents in real computer environments, highlighting UI grounding, long-horizon control, and operational robustness.'],
  ['AI Agent Architecture surveys', 'Masterman et al., 2024', 'Organized emerging agent architectures around planning, reasoning, tool use, memory, and orchestration patterns.'],
  ['LLM-agent evaluation surveys', '2025–2026 survey literature', 'Systematized evaluation of planning, tool use, self-reflection, memory, web agents, software agents, scientific agents, generalist agents, and LLM-as-judge approaches.'],
  ['Agentic AI architecture surveys', '2025–2026 survey literature', 'Clarified the difference between broad agentic AI and LLM-based agents, and mapped autonomy, governance, multi-agent collaboration, applications, and risks.']
];

document.getElementById('moduleList').innerHTML = modules.map(([title, learn, build, mastery]) => `
  <article class="module"><h3>${title}</h3><p><strong>Learn:</strong> ${learn}</p><p><strong>Build:</strong> ${build}</p><p><strong>Mastery:</strong> ${mastery}</p></article>
`).join('');

document.getElementById('paperGrid').innerHTML = papers.map(([title, authors, summary], index) => `
  <article class="paper"><b>${String(index + 1).padStart(2, '0')}</b><h3>${title}</h3><p class="authors">${authors}</p><p>${summary}</p></article>
`).join('');
