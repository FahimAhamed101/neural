"use client";
import { useState } from "react";
const steps = [
  { title: "Discovery & diagnosis", text: "We learn your goals or reproduce the current problem, review the product and codebase, and identify the outcome that would make the work valuable." },
  { title: "Solution design & ideation", text: "We map the experience, explore creative directions, and turn the strongest idea into a clear product plan." },
  { title: "Build, repair & test", text: "We develop or repair the product, test critical user journeys, and share regular review points so you always know what is happening." },
];
export default function Process() {
  const [active, setActive] = useState(0);
  return <section id="process" className="process dark-section section-pad"><div className="process-grid"><div><p className="kicker">Work process</p><h2>From idea or issue to a dependable product</h2><div className="steps">{steps.map((step, i) => <button key={step.title} className={active === i ? "active" : ""} onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, "0")}</span><div><b>{step.title}</b>{active === i ? <p>{step.text}</p> : null}</div><i>{active === i ? "×" : "+"}</i></button>)}</div></div><div className="process-art"><div className="process-orb"><i /><i /><i /></div><span>IDEA<br />TO<br />IMPACT</span></div></div></section>;
}
