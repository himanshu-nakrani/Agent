const papers = [
['WebGPT','Nakano et al., 2021','Browser-assisted QA with human feedback; established browsing, citations, and action traces as model-adjacent capabilities.'],
['ReAct','Yao et al., 2022','Combined reasoning traces with actions and observations; the canonical think-act-observe loop.'],
['MRKL Systems','Karpas et al., 2022','Routed language models to external expert modules; precursor to tool-router architectures.'],
['Toolformer','Schick et al., 2023','Showed models can learn API/tool-use behavior from self-supervised data.'],
['Reflexion','Shinn et al., 2023','Used verbal feedback and episodic memory to improve future trials without weight updates.'],
['Generative Agents','Park et al., 2023','Demonstrated believable simulated agents with memory streams, reflection, and planning.'],
['Voyager','Wang et al., 2023','Built an open-ended Minecraft agent with curriculum, skill library, and iterative prompting.'],
['AutoGen','Wu et al., 2023','Popularized programmable multi-agent conversations for task solving.'],
['AgentBench','Liu et al., 2023','Benchmarked LLMs as agents across diverse interactive environments.'],
['WebArena','Zhou et al., 2023','Created realistic web tasks for evaluating browser-control agents.'],
['SWE-bench','Jimenez et al., 2023','Evaluated agents on real GitHub issue resolution.'],
['SWE-agent','Yang et al., 2024','Showed agent-computer interfaces can materially improve software engineering agents.'],
['OSWorld','Xie et al., 2024','Evaluated multimodal agents operating real computer environments.'],
['The Landscape of Emerging AI Agent Architectures','Masterman et al., 2024','Surveyed reasoning, planning, and tool-calling architecture patterns.'],
['Agent AI: Surveying the Horizons of Multimodal Interaction','Durante et al., 2024','Mapped multimodal interaction capabilities for agents.'],
['Agentic AI surveys, 2025–2026','Acharya; Plaat; Schneider; Abou Ali & Dornaika; others','Synthesized autonomy, architectures, applications, governance, and future hybrid symbolic-neural directions.']
];
document.getElementById('paperGrid').innerHTML = papers.map(([t,a,s],i)=>`<article class="paper"><b>${String(i+1).padStart(2,'0')}</b><h3>${t}</h3><p class="authors">${a}</p><p>${s}</p></article>`).join('');
