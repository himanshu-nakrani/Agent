import React, { useEffect, useMemo, useState } from "react";
import {
  buildLabs,
  chapterContent,
  guides,
  moduleLessons,
  modules,
  paperAreas,
  papers,
  readingRoutes,
  reviewDate,
  sourceRules,
} from "./content.js";

function Icon({ name, weight = "regular", label }) {
  return (
    <i
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      className={`ph ${weight === "regular" ? "" : `ph-${weight}`} ph-${name}`}
    />
  );
}

function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const chapterMatch = path.match(/^\/learn\/([^/]+)$/);
  const guideMatch = path.match(/^\/frameworks\/(adk|langgraph)$/);

  if (path === "/") return { kind: "home", path };
  if (path === "/learn") return { kind: "curriculum", path };
  if (chapterMatch && modules.some((module) => module.id === chapterMatch[1])) {
    return { kind: "chapter", path, moduleId: chapterMatch[1] };
  }
  if (path === "/frameworks") return { kind: "framework-index", path };
  if (guideMatch) return { kind: "framework", path, guideId: guideMatch[1] };
  if (path === "/labs") return { kind: "labs", path };
  if (path === "/papers") return { kind: "papers", path };
  return { kind: "not-found", path };
}

function useAppRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(to) {
    const nextPath = to.replace(/\/+$/, "") || "/";
    if (nextPath !== window.location.pathname) {
      window.history.pushState({}, "", nextPath);
      setPathname(nextPath);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return { route: resolveRoute(pathname), navigate };
}

function AppLink({ to, navigate, onClick, children, ...props }) {
  function handleClick(event) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return <a href={to} onClick={handleClick} {...props}>{children}</a>;
}

function PageMasthead({ eyebrow, title, lede, backTo, backLabel, navigate }) {
  return (
    <header className="page-masthead section-boundary">
      {backTo && (
        <AppLink className="page-backlink" to={backTo} navigate={navigate}>
          <Icon name="arrow-left" /> {backLabel}
        </AppLink>
      )}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{lede}</p>
    </header>
  );
}

function HomeDirectory({ navigate }) {
  const destinations = [
    {
      to: "/learn",
      icon: "book-open",
      eyebrow: "01 · Learning path",
      title: "Course curriculum",
      description: "Eight modules from the agent loop to frontier practice, with an explicit build checkpoint in each.",
    },
    {
      to: "/frameworks",
      icon: "brackets-curly",
      eyebrow: "02 · Build guides",
      title: "ADK & LangGraph",
      description: "Separate, source-linked guides for choosing an architecture and shipping a dependable harness.",
    },
    {
      to: "/labs",
      icon: "flask",
      eyebrow: "03 · Agent studio",
      title: "Guided build labs",
      description: "Six practical builds and a short safety lab that turn the material into inspectable traces.",
    },
    {
      to: "/papers",
      icon: "books",
      eyebrow: "04 · Source library",
      title: "Papers & reading routes",
      description: "A filterable set of primary sources, organized by what each paper changes in a real system.",
    },
  ];

  return (
    <section className="home-directory section-boundary" aria-labelledby="directory-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Choose your next page</p>
          <h2 id="directory-heading">A library with room to think.</h2>
        </div>
        <p className="section-lede">Start broad, then move into a dedicated page when you want to learn, build, or read without the rest of the atlas competing for attention.</p>
      </div>
      <div className="home-directory-grid">
        {destinations.map((destination) => (
          <AppLink className="home-directory-card" key={destination.to} to={destination.to} navigate={navigate}>
            <Icon name={destination.icon} />
            <p>{destination.eyebrow}</p>
            <h3>{destination.title}</h3>
            <span>{destination.description}</span>
            <strong>Open page <Icon name="arrow-right" /></strong>
          </AppLink>
        ))}
      </div>
    </section>
  );
}

export function App() {
  const { route, navigate } = useAppRoute();
  const [activeModuleId, setActiveModuleId] = useState("foundations");
  const [moduleOpen, setModuleOpen] = useState(true);
  const [railCollapsed, setRailCollapsed] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [paperArea, setPaperArea] = useState("All");
  const [paperQuery, setPaperQuery] = useState("");
  const [copied, setCopied] = useState("");
  const [activeLabId, setActiveLabId] = useState(buildLabs[0].id);
  const [completedLabs, setCompletedLabs] = useState([]);
  const [chapterAnswerOpen, setChapterAnswerOpen] = useState(false);
  const [quizChoice, setQuizChoice] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [sourceOpen, setSourceOpen] = useState(false);

  const isChapterPage = route.kind === "chapter";
  const activeModule = modules.find((module) => module.id === (isChapterPage ? route.moduleId : activeModuleId)) ?? modules[0];
  const chapter = chapterContent[activeModule.id];
  const selectedGuideId = route.kind === "framework" ? route.guideId : "adk";
  const guide = guides[selectedGuideId];
  const activeLab = buildLabs.find((lab) => lab.id === activeLabId) ?? buildLabs[0];
  const progress = Math.round((completed.length / modules.length) * 100);
  const displayModuleOpen = isChapterPage || moduleOpen;

  const filteredPapers = useMemo(() => {
    const query = paperQuery.trim().toLowerCase();
    return papers.filter((paper) => {
      const categoryMatch = paperArea === "All" || paper.area === paperArea;
      const textMatch =
        !query ||
        [paper.title, paper.area, paper.authors, paper.summary, paper.why]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return categoryMatch && textMatch;
    });
  }, [paperArea, paperQuery]);

  useEffect(() => {
    if (route.kind === "chapter") {
      setActiveModuleId(route.moduleId);
      setModuleOpen(true);
      setChapterAnswerOpen(false);
    }
  }, [route.kind, route.moduleId]);

  useEffect(() => {
    const titles = {
      home: "Agent Atlas — A learning library for agentic AI",
      curriculum: "Course curriculum — Agent Atlas",
      "framework-index": "Framework guides — Agent Atlas",
      labs: "Agent studio — Agent Atlas",
      papers: "Paper library — Agent Atlas",
      "not-found": "Page not found — Agent Atlas",
    };
    document.title = route.kind === "chapter"
      ? `${activeModule.title} — Agent Atlas`
      : route.kind === "framework"
        ? `${guide.label} guide — Agent Atlas`
        : titles[route.kind];
  }, [route.kind, route.moduleId, activeModule.title, guide.label]);

  function chooseModule(id) {
    if (isChapterPage) {
      navigate(`/learn/${id}`);
      return;
    }
    setChapterAnswerOpen(false);
    if (id === activeModule.id) {
      setModuleOpen((isOpen) => !isOpen);
    } else {
      setActiveModuleId(id);
      setModuleOpen(true);
    }
  }

  function toggleComplete(id) {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function toggleLab(id) {
    setCompletedLabs((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function copyCode(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied("Copied");
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("Select the code to copy");
      window.setTimeout(() => setCopied(""), 2200);
    }
  }

  function checkQuiz() {
    if (!quizChoice) {
      setQuizResult("Choose an answer first.");
      return;
    }
    setQuizResult(
      quizChoice === "contract"
        ? "Correct. A tool contract constrains inputs, outputs, failure behavior, and approval boundaries."
        : "Not quite. The safest first move is to define the tool contract before changing the model or adding more agents.",
    );
  }

  const routeActive = (kind) => route.kind === kind || (kind === "framework-index" && route.kind === "framework");

  return (
    <div className={`atlas-shell ${railCollapsed ? "rail-is-collapsed" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to page content</a>
      <aside className={`course-rail ${railCollapsed ? "is-collapsed" : ""}`} aria-label="Learning path navigation">
        <div className="rail-top">
          <AppLink className="wordmark" to="/" navigate={navigate} aria-label="Agent Atlas home">
            <span className="wordmark-full">Agent Atlas</span>
            <span className="wordmark-short" aria-hidden="true">A</span>
          </AppLink>
          <button
            className="rail-toggle"
            type="button"
            onClick={() => setRailCollapsed((isCollapsed) => !isCollapsed)}
            aria-expanded={!railCollapsed}
            aria-label={railCollapsed ? "Expand learning path" : "Collapse learning path"}
            title={railCollapsed ? "Expand learning path" : "Collapse learning path"}
          >
            <Icon name={railCollapsed ? "caret-right" : "caret-left"} />
          </button>
        </div>

        <div className="rail-label">Learning path</div>
        <nav className="path-nav" aria-label="Course modules">
          {modules.map((module) => {
            const isActive = (route.kind === "chapter" && route.moduleId === module.id) || (route.kind === "curriculum" && activeModule.id === module.id);
            const isDone = completed.includes(module.id);
            return (
              <AppLink
                className={`path-item ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                key={module.id}
                to={`/learn/${module.id}`}
                navigate={navigate}
                aria-current={isActive ? "page" : undefined}
                aria-label={railCollapsed ? module.title : undefined}
                title={railCollapsed ? module.title : undefined}
              >
                <span className="path-icon" aria-hidden="true">
                  {isDone ? <Icon name="check" weight="bold" /> : <Icon name={module.icon} />}
                </span>
                <span className="path-number">{module.number}</span>
                <span className="path-copy">
                  <strong>{module.title}</strong>
                  <small>{module.short}</small>
                </span>
              </AppLink>
            );
          })}
        </nav>

        <AppLink
          className="library-link"
          to="/papers"
          navigate={navigate}
          aria-label={railCollapsed ? "Paper library" : undefined}
          title={railCollapsed ? "Paper library" : undefined}
        >
          <span className="path-icon"><Icon name="books" /></span>
          <span>
            <strong>Paper library</strong>
            <small>Explore seminal work</small>
          </span>
          <Icon name="caret-right" />
        </AppLink>
      </aside>

      <main className="content-area" id="main-content">
        <header className="topbar">
          <AppLink className="mobile-brand" to="/" navigate={navigate}>Agent Atlas</AppLink>
          <nav className="topbar-links" aria-label="Primary navigation">
            <AppLink to="/learn" navigate={navigate} aria-current={routeActive("curriculum") ? "page" : undefined}>Curriculum</AppLink>
            <AppLink to="/frameworks" navigate={navigate} aria-current={routeActive("framework-index") ? "page" : undefined}>Frameworks</AppLink>
            <AppLink to="/labs" navigate={navigate} aria-current={routeActive("labs") ? "page" : undefined}>Studio</AppLink>
            <AppLink to="/papers" navigate={navigate} aria-current={routeActive("papers") ? "page" : undefined}>Papers</AppLink>
          </nav>
          <div className="review-date">Reviewed {reviewDate}</div>
          <div className="avatar" aria-label="Learner profile">A</div>
        </header>

        {route.kind === "home" && (
          <>
            <section className="hero section-boundary" aria-labelledby="hero-title">
              <div className="hero-copy">
                <p className="eyebrow">Learning library</p>
                <h1 id="hero-title">From first principles<br />to frontier agents</h1>
                <div className="accent-rule" aria-hidden="true" />
                <p className="hero-description">
                  A rigorous, source-linked path to understand, build, evaluate, and safely ship agentic AI systems.
                </p>
                <div className="hero-actions">
                  <button className="button button-primary" onClick={() => navigate("/learn")}>
                    Begin learning path <Icon name="arrow-right" weight="bold" />
                  </button>
                  <AppLink className="text-action" to="/papers" navigate={navigate}>
                    Browse paper library <Icon name="arrow-right" />
                  </AppLink>
                </div>

                <div className="progress-block" aria-label={`${progress}% of learning path complete`}>
                  <div className="progress-meta">
                    <span>Your progress</span>
                    <span>{progress}% complete</span>
                  </div>
                  <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
                  <p>Each chapter lives on its own page, so you can return to exactly the material you were studying.</p>
                </div>
              </div>
              <figure className="hero-art" aria-label="Vintage books representing foundations, reasoning, and systems">
                <img src="/assets/hero-books.png" alt="Three archival books beside a botanical branch and a stone" />
              </figure>
            </section>

            <section className="featured-lesson section-boundary" aria-labelledby="featured-heading">
              <div className="section-label"><span>Featured lesson</span><span>Start with intent</span></div>
              <div className="featured-grid">
                <figure className="lesson-art">
                  <img src="/assets/lesson-foundations.png" alt="Architectural pencil illustration with abstract agent-loop annotations" />
                </figure>
                <div className="featured-copy">
                  <p className="eyebrow">{activeModule.eyebrow}</p>
                  <h2 id="featured-heading">{activeModule.lesson}</h2>
                  <p>{activeModule.summary}</p>
                  <div className="lesson-meta">
                    <span><Icon name="clock" /> {activeModule.duration}</span>
                    <a href={activeModule.source} target="_blank" rel="noreferrer">
                      Primary source <Icon name="arrow-up-right" />
                    </a>
                  </div>
                </div>
                <div className="featured-actions">
                  <button className="button button-quiet" onClick={() => navigate(`/learn/${activeModule.id}`)}>
                    Open lesson <Icon name="arrow-right" />
                  </button>
                  <button
                    className={`complete-button ${completed.includes(activeModule.id) ? "is-complete" : ""}`}
                    onClick={() => toggleComplete(activeModule.id)}
                  >
                    <Icon name={completed.includes(activeModule.id) ? "check-circle" : "circle"} weight={completed.includes(activeModule.id) ? "fill" : "regular"} />
                    {completed.includes(activeModule.id) ? "Checkpoint complete" : "Mark checkpoint complete"}
                  </button>
                </div>
              </div>
            </section>
            <HomeDirectory navigate={navigate} />
          </>
        )}

        {(route.kind === "curriculum" || isChapterPage) && (
          <>
            <PageMasthead
              eyebrow={isChapterPage ? `Course / ${activeModule.number}` : "Course curriculum"}
              title={isChapterPage ? activeModule.title : "Learn one clear idea at a time."}
              lede={isChapterPage ? activeModule.summary : "Eight dedicated chapters for building an agentic system that is useful, inspectable, and safe to operate."}
              backTo={isChapterPage ? "/learn" : "/"}
              backLabel={isChapterPage ? "All course modules" : "Agent Atlas home"}
              navigate={navigate}
            />
            <section className={`curriculum section-boundary ${isChapterPage ? "reader-page" : ""}`} aria-labelledby="curriculum-heading">
              {!isChapterPage && (
                <div className="section-heading-row">
                  <div>
                    <p className="eyebrow">A calm learning path</p>
                    <h2 id="curriculum-heading">Choose a module, then settle into its own page.</h2>
                  </div>
                  <p className="section-lede">The overview keeps the route visible. The full chapter gives concepts, a trace, a self-check, a glossary, and sources a quieter place to live.</p>
                </div>
              )}

              <div className={`curriculum-layout ${displayModuleOpen ? "is-expanded" : "is-collapsed"} ${isChapterPage ? "is-reading" : ""}`}>
                <div className="module-list" aria-label={isChapterPage ? "Switch chapter" : "Curriculum modules"}>
                  {modules.map((module) => {
                    const active = activeModule.id === module.id;
                    return (
                      <button
                        key={module.id}
                        aria-expanded={active && displayModuleOpen}
                        aria-controls="module-lesson-panel"
                        className={`module-row ${active ? "is-active" : ""} ${active && displayModuleOpen ? "is-open" : ""}`}
                        onClick={() => chooseModule(module.id)}
                      >
                        <span>{module.number}</span>
                        <strong>{module.title}</strong>
                        <small>{module.duration}</small>
                        <Icon name={active && displayModuleOpen ? "caret-down" : "caret-right"} />
                      </button>
                    );
                  })}
                </div>

                {displayModuleOpen ? <article className="lesson-detail" id="module-lesson-panel" aria-live="polite">
                  <p className="eyebrow">{activeModule.eyebrow}</p>
                  <h3>{activeModule.lesson}</h3>
                  <p className="lesson-summary">{activeModule.summary}</p>
                  <div className="detail-columns">
                    <div>
                      <p className="detail-kicker">You will learn</p>
                      <ul className="outcome-list">
                        {activeModule.outcomes.map((outcome) => <li key={outcome}><Icon name="check" weight="bold" />{outcome}</li>)}
                      </ul>
                    </div>
                    <div className="build-note">
                      <p className="detail-kicker">Build checkpoint</p>
                      <p>{activeModule.build}</p>
                      <button className="text-action" onClick={() => toggleComplete(activeModule.id)}>
                        {completed.includes(activeModule.id) ? "Undo completion" : "Complete this checkpoint"} <Icon name="arrow-right" />
                      </button>
                    </div>
                  </div>
                  <section className={`chapter-launcher ${isChapterPage ? "is-open" : ""}`} aria-labelledby="chapter-launcher-heading">
                    <div>
                      <p className="detail-kicker">Focused reading · {chapter.duration}</p>
                      <h4 id="chapter-launcher-heading">{chapter.promise}</h4>
                      <p>The full chapter is ready when you are: concepts, a worked trace, a self-check, a glossary, and source links—kept out of the way until you want to settle in.</p>
                    </div>
                    {isChapterPage ? (
                      <AppLink className="button button-quiet" to="/learn" navigate={navigate}>
                        Return to curriculum <Icon name="arrow-left" />
                      </AppLink>
                    ) : (
                      <button className="button button-quiet" type="button" onClick={() => navigate(`/learn/${activeModule.id}`)}>
                        Start full chapter <Icon name="arrow-right" />
                      </button>
                    )}
                  </section>
                  {isChapterPage && <div className="deep-dive-content" id="deep-dive-content" role="region" aria-label={`${activeModule.title} full chapter`}>
                    <section className="chapter-lesson" id="chapter" aria-labelledby="chapter-heading">
                      <div className="chapter-heading">
                        <div>
                          <p className="detail-kicker">Full chapter lesson · {chapter.duration}</p>
                          <h4 id="chapter-heading">{chapter.promise}</h4>
                        </div>
                        <p>This is the learning material: read the concepts in order, follow the worked trace, make the artifact, then use the check to test whether the idea is operational—not just familiar.</p>
                      </div>

                      <div className="chapter-section-list">
                        {chapter.sections.map((section) => (
                          <article className="chapter-section" key={section.kicker}>
                            <p className="detail-kicker">{section.kicker}</p>
                            <h5>{section.title}</h5>
                            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            <aside className="chapter-artifact"><strong>Make this</strong><span>{section.artifact}</span></aside>
                          </article>
                        ))}
                      </div>

                      <section className="chapter-trace" aria-labelledby="trace-heading">
                        <div className="chapter-trace-heading">
                          <div>
                            <p className="detail-kicker">Worked trace</p>
                            <h5 id="trace-heading">{chapter.trace.title}</h5>
                          </div>
                          <p>{chapter.trace.intro}</p>
                        </div>
                        <ol className="trace-steps">
                          {chapter.trace.steps.map((step, index) => (
                            <li key={step.stage}>
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <div>
                                <strong>{step.stage}</strong>
                                <p>{step.action}</p>
                              </div>
                              <div><em>Why this matters</em><p>{step.why}</p></div>
                            </li>
                          ))}
                        </ol>
                      </section>

                      <div className="chapter-practice-grid">
                        <section className="chapter-check" aria-labelledby="chapter-check-heading">
                          <p className="detail-kicker">Self-check</p>
                          <h5 id="chapter-check-heading">{chapter.check.prompt}</h5>
                          <button
                            className="text-action"
                            onClick={() => setChapterAnswerOpen((isOpen) => !isOpen)}
                            aria-expanded={chapterAnswerOpen}
                          >
                            {chapterAnswerOpen ? "Hide answer" : "Reveal answer"} <Icon name={chapterAnswerOpen ? "minus" : "plus"} />
                          </button>
                          {chapterAnswerOpen && <p className="chapter-answer" aria-live="polite">{chapter.check.answer}</p>}
                        </section>
                        <section className="chapter-glossary" aria-labelledby="glossary-heading">
                          <p className="detail-kicker">Working glossary</p>
                          <h5 id="glossary-heading">The terms to use precisely in a design review.</h5>
                          <dl>
                            {chapter.glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}
                          </dl>
                        </section>
                      </div>

                      <div className="chapter-sources" aria-label={`${activeModule.title} chapter sources`}>
                        <p className="detail-kicker">Chapter sources</p>
                        <div>{chapter.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <Icon name="arrow-up-right" /></a>)}</div>
                      </div>
                    </section>
                    <section className="lesson-field-guide" aria-label={`${activeModule.title} field guide`}>
                      <div className="field-guide-heading">
                        <p className="detail-kicker">Module field guide</p>
                        <p>Use these notes to turn the lesson into a design review, a small build, and a trace you can inspect.</p>
                      </div>
                      <div className="field-guide-grid">
                        {activeModule.fieldGuide.map(([title, detail], index) => (
                          <article key={title}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <h4>{title}</h4>
                            <p>{detail}</p>
                          </article>
                        ))}
                      </div>
                    </section>
                    <section className="lesson-sequence" aria-label={`${activeModule.title} lesson sequence`}>
                      <div className="sequence-heading">
                        <div>
                          <p className="detail-kicker">Three deep-dive lessons</p>
                          <h4>Learn the idea, then make the artifact.</h4>
                        </div>
                        <p>Each lesson has a source anchor and a concrete exercise. Complete them in order or return when a build exposes a gap.</p>
                      </div>
                      <div className="sequence-list">
                        {moduleLessons[activeModule.id].map((lesson) => (
                          <article className="sequence-item" key={`${activeModule.id}-${lesson.number}`}>
                            <div className="sequence-meta"><span>{lesson.number}</span><span><Icon name="clock" /> {lesson.duration}</span></div>
                            <h5>{lesson.title}</h5>
                            <p>{lesson.summary}</p>
                            <div className="sequence-exercise"><strong>Make:</strong> {lesson.exercise}</div>
                            <a href={lesson.source.url} target="_blank" rel="noreferrer">Read {lesson.source.label} <Icon name="arrow-up-right" /></a>
                          </article>
                        ))}
                      </div>
                    </section>
                    <a className="source-callout" href={activeModule.source} target="_blank" rel="noreferrer">
                      <Icon name="seal-check" weight="fill" />
                      <span><strong>Evidence anchor</strong> Read the primary source connected to this lesson.</span>
                      <Icon name="arrow-up-right" />
                    </a>
                  </div>}
                </article> : <aside className="module-collapsed-panel" id="module-lesson-panel" aria-live="polite">
                  <Icon name="books" weight="fill" />
                  <p className="detail-kicker">Lesson collapsed</p>
                  <h3>{activeModule.title}</h3>
                  <p>Use the selected module row to reopen its overview or open the full chapter in its own reader page.</p>
                  <button className="text-action" onClick={() => setModuleOpen(true)}>Open {activeModule.title} <Icon name="arrow-right" /></button>
                </aside>}
              </div>
            </section>
          </>
        )}

        {route.kind === "framework-index" && (
          <>
            <PageMasthead
              eyebrow="Build guides"
              title="Choose the harness you want to understand."
              lede="The concepts transfer; the APIs differ. Enter a dedicated guide to learn the smallest architecture that meets your reliability need."
              backTo="/"
              backLabel="Agent Atlas home"
              navigate={navigate}
            />
            <section className="guide-index section-boundary" aria-label="Framework guide directory">
              {Object.entries(guides).map(([id, item], index) => (
                <AppLink className="guide-index-card" key={id} to={`/frameworks/${id}`} navigate={navigate}>
                  <div><span>{String(index + 1).padStart(2, "0")}</span><Icon name={id === "adk" ? "google-logo" : "share-network"} /></div>
                  <p>{item.eyebrow}</p>
                  <h2>{item.label}</h2>
                  <span>{item.description}</span>
                  <strong>Open full guide <Icon name="arrow-right" /></strong>
                </AppLink>
              ))}
            </section>
          </>
        )}

        {route.kind === "framework" && (
          <>
            <PageMasthead
              eyebrow="Framework guide"
              title={guide.label}
              lede={guide.description}
              backTo="/frameworks"
              backLabel="All framework guides"
              navigate={navigate}
            />
            <section className="framework-section section-boundary" aria-labelledby="framework-heading">
              <nav className="guide-tabs" aria-label="Framework guides">
                {Object.entries(guides).map(([id, item]) => (
                  <AppLink
                    key={id}
                    to={`/frameworks/${id}`}
                    navigate={navigate}
                    className={selectedGuideId === id ? "is-active" : ""}
                    aria-current={selectedGuideId === id ? "page" : undefined}
                  >
                    <Icon name={id === "adk" ? "google-logo" : "share-network"} />
                    {item.label}
                  </AppLink>
                ))}
              </nav>

              <article className="guide-workbench">
                <div className="guide-intro">
                  <p className="eyebrow">{guide.eyebrow}</p>
                  <h3 id="framework-heading">{guide.title}</h3>
                  <p>{guide.description}</p>
                  <a className="inline-source" href={guide.source} target="_blank" rel="noreferrer">
                    Open official documentation <Icon name="arrow-up-right" />
                  </a>
                </div>
                <div className="principle-grid">
                  {guide.principles.map(([title, text], index) => (
                    <article key={title} className="principle">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <div className="code-and-steps">
                  <div className="code-card">
                    <div className="code-toolbar"><span>Minimal starting point</span><button onClick={() => copyCode(guide.code)}><Icon name={copied ? "check" : "copy"} /> {copied || "Copy"}</button></div>
                    <pre><code>{guide.code}</code></pre>
                  </div>
                  <div className="guide-steps">
                    <p className="detail-kicker">How to learn it deeply</p>
                    <ol>
                      {guide.walkthrough.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <div className="guide-checklist">
                      <p className="detail-kicker">Before you ship</p>
                      {guide.checklist.map((item) => <span key={item}><Icon name="check-circle" weight="fill" />{item}</span>)}
                    </div>
                  </div>
                </div>
                <section className="guide-blueprint" aria-label={`${guide.label} end-to-end build blueprint`}>
                  <div className="blueprint-heading">
                    <div>
                      <p className="eyebrow">Deep build sequence</p>
                      <h4>From first runnable loop to a system you can defend.</h4>
                    </div>
                    <p>Use this as a deliberate build order. Do not advance because a demo looks impressive; advance when the proof for the current phase exists.</p>
                  </div>
                  <div className="blueprint-grid">
                    {guide.roadmap.map((item) => (
                      <article className="blueprint-card" key={item.phase}>
                        <p>{item.phase}</p>
                        <h5>{item.title}</h5>
                        <span>{item.detail}</span>
                        <div><strong>Proof:</strong> {item.proof}</div>
                      </article>
                    ))}
                  </div>
                  <aside className="pitfall-callout">
                    <div>
                      <Icon name="warning" weight="fill" />
                      <p className="detail-kicker">Common failure modes</p>
                    </div>
                    <ul>{guide.pitfalls.map((pitfall) => <li key={pitfall}><Icon name="minus" />{pitfall}</li>)}</ul>
                  </aside>
                </section>
              </article>
            </section>
          </>
        )}

        {route.kind === "labs" && (
          <>
            <section className="studio-section section-boundary" aria-labelledby="studio-heading">
              <div className="section-heading-row studio-heading">
                <div>
                  <p className="eyebrow">Agent studio</p>
                  <h2 id="studio-heading">Six builds that turn theory into a trace.</h2>
                </div>
                <p className="section-lede">Work in increasing difficulty: contract a small loop, harden its tools, decide what memory deserves to persist, then prove the system in a repeatable evaluation harness.</p>
              </div>

              <div className="studio-shell">
                <div className="studio-tabs" role="tablist" aria-label="Agent studio labs">
                  {buildLabs.map((lab) => (
                    <button
                      key={lab.id}
                      role="tab"
                      aria-selected={activeLab.id === lab.id}
                      className={activeLab.id === lab.id ? "is-active" : ""}
                      onClick={() => setActiveLabId(lab.id)}
                    >
                      <span>{lab.number}</span>
                      <strong>{lab.title}</strong>
                      <small>{lab.duration}</small>
                      {completedLabs.includes(lab.id) && <Icon name="check-circle" weight="fill" />}
                    </button>
                  ))}
                </div>

                <article className="studio-workbench" role="tabpanel" aria-live="polite">
                  <div className="studio-intro">
                    <div className="studio-meta"><span>{activeLab.level}</span><span><Icon name="clock" /> {activeLab.duration}</span></div>
                    <h3>{activeLab.title}</h3>
                    <p>{activeLab.summary}</p>
                  </div>
                  <div className="studio-layout">
                    <div>
                      <p className="detail-kicker">Build sequence</p>
                      <ol className="studio-steps">
                        {activeLab.steps.map(([title, detail], index) => (
                          <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{detail}</p></div></li>
                        ))}
                      </ol>
                    </div>
                    <aside className="studio-review">
                      <p className="detail-kicker">Definition of done</p>
                      <h4>{activeLab.goal}</h4>
                      <div><strong>Deliver:</strong><p>{activeLab.deliverable}</p></div>
                      <div><strong>Review:</strong><p>{activeLab.review}</p></div>
                      <button className="text-action" onClick={() => toggleLab(activeLab.id)}>
                        {completedLabs.includes(activeLab.id) ? "Undo lab completion" : "Mark lab complete"} <Icon name="arrow-right" />
                      </button>
                    </aside>
                  </div>
                  <div className="studio-sources" aria-label={`${activeLab.title} source anchors`}>
                    <p className="detail-kicker">Source anchors</p>
                    <div>{activeLab.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <Icon name="arrow-up-right" /></a>)}</div>
                    <span>{completedLabs.length} of {buildLabs.length} studio labs marked complete</span>
                  </div>
                </article>
              </div>
            </section>

            <section className="lab-section section-boundary" aria-labelledby="lab-heading">
              <div>
                <p className="eyebrow">Practice lab</p>
                <h2 id="lab-heading">Can you name the safer first move?</h2>
                <p className="section-lede">A research agent receives an unknown web page, then proposes sending an email based on its contents. What should you define first?</p>
              </div>
              <div className="quiz-card">
                {[
                  ["contract", "A tool contract with read/write permissions, validation, and an approval boundary."],
                  ["model", "A bigger model, so it can infer whether the web page is trustworthy."],
                  ["agents", "More agents, so they can vote on the email without a policy."],
                ].map(([value, label]) => (
                  <label className={`quiz-choice ${quizChoice === value ? "is-selected" : ""}`} key={value}>
                    <input type="radio" name="quiz" value={value} checked={quizChoice === value} onChange={() => setQuizChoice(value)} />
                    <span>{label}</span>
                  </label>
                ))}
                <div className="quiz-footer">
                  <button className="button button-primary" onClick={checkQuiz}>Check answer <Icon name="arrow-right" /></button>
                  <p aria-live="polite">{quizResult}</p>
                </div>
              </div>
            </section>
          </>
        )}

        {route.kind === "papers" && (
          <>
            <section className="routes-section section-boundary" aria-labelledby="routes-heading">
              <div className="section-heading-row routes-heading">
                <div>
                  <p className="eyebrow">Reading routes</p>
                  <h2 id="routes-heading">Choose a thread, then read with a question in hand.</h2>
                </div>
                <p className="section-lede">These are deliberate sequences through the library—not a universal canon. Read the source, note its task and limits, then decide what it changes in your own system.</p>
              </div>
              <div className="routes-grid">
                {readingRoutes.map((readingRoute) => (
                  <article className="route-card" key={readingRoute.id}>
                    <p>{readingRoute.eyebrow}</p>
                    <h3>{readingRoute.title}</h3>
                    <span>{readingRoute.description}</span>
                    <ul>
                      {readingRoute.papers.map((paper) => <li key={paper.url}><a href={paper.url} target="_blank" rel="noreferrer">{paper.title} <Icon name="arrow-up-right" /></a></li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="paper-library section-boundary" aria-labelledby="paper-heading">
              <div className="paper-heading">
                <div>
                  <p className="eyebrow">Paper library</p>
                  <h2 id="paper-heading">The ideas that shaped modern agents.</h2>
                </div>
                <button className="source-policy-button" onClick={() => setSourceOpen((open) => !open)} aria-expanded={sourceOpen}>
                  <Icon name="seal-check" weight="fill" /> Fact-check policy <Icon name={sourceOpen ? "minus" : "plus"} />
                </button>
              </div>

              {sourceOpen && (
                <aside className="source-policy" aria-label="Fact-check policy">
                  <div>
                    <p className="detail-kicker">How this library stays honest</p>
                    <h3>Primary sources, scoped claims, dated review.</h3>
                  </div>
                  <ul>{sourceRules.map((rule) => <li key={rule}><Icon name="check" weight="bold" />{rule}</li>)}</ul>
                </aside>
              )}

              <div className="library-controls">
                <label className="search-field">
                  <Icon name="magnifying-glass" />
                  <input value={paperQuery} onChange={(event) => setPaperQuery(event.target.value)} placeholder="Search title, author, concept, or area" />
                </label>
                <div className="filter-row" aria-label="Filter papers by area">
                  {paperAreas.map((area) => (
                    <button key={area} className={paperArea === area ? "is-active" : ""} onClick={() => setPaperArea(area)}>{area}</button>
                  ))}
                </div>
              </div>

              <div className="library-summary"><span>{filteredPapers.length} source-linked papers</span><span>Reviewed {reviewDate}</span></div>
              <div className="paper-grid">
                {filteredPapers.map((paper) => (
                  <article className="paper-card" key={paper.title}>
                    <div className="paper-meta"><span>{paper.area}</span><time>{paper.year}</time></div>
                    <h3>{paper.title}</h3>
                    <p className="authors">{paper.authors}</p>
                    <p>{paper.summary}</p>
                    <div className="why-it-matters"><strong>Why it matters</strong><span>{paper.why}</span></div>
                    <a href={paper.url} target="_blank" rel="noreferrer">Read primary source <Icon name="arrow-up-right" /></a>
                  </article>
                ))}
              </div>
              {!filteredPapers.length && <div className="empty-state"><Icon name="magnifying-glass" /><h3>No papers matched that search.</h3><button className="text-action" onClick={() => { setPaperArea("All"); setPaperQuery(""); }}>Clear filters <Icon name="arrow-right" /></button></div>}
            </section>
          </>
        )}

        {route.kind === "not-found" && (
          <section className="not-found section-boundary" aria-labelledby="not-found-heading">
            <p className="eyebrow">Page not found</p>
            <h1 id="not-found-heading">That reading room is not in the atlas yet.</h1>
            <p>Return to the home page or choose a known route from the learning path.</p>
            <AppLink className="button button-primary" to="/" navigate={navigate}>Back to Agent Atlas <Icon name="arrow-right" /></AppLink>
          </section>
        )}

        <footer className="footer">
          <div><strong>Agent Atlas</strong><span>Learn the loop. Inspect the trace. Cite the source.</span></div>
          <div className="footer-links">
            <a href="https://adk.dev/" target="_blank" rel="noreferrer">ADK docs</a>
            <a href="https://docs.langchain.com/oss/python/langgraph/overview" target="_blank" rel="noreferrer">LangGraph docs</a>
            <AppLink to="/" navigate={navigate}>Back to home</AppLink>
          </div>
        </footer>
      </main>
    </div>
  );
}
