"use client";
import { useState } from "react";
const steps = [
  { title: "Discovery & consultation", text: "We learn your goals, users, current challenges, and the outcome that would make the project valuable." },
  { title: "Solution design & ideation", text: "We map the experience, explore creative directions, and turn the strongest idea into a clear product plan." },
  { title: "Development & integration", text: "We build, test, and integrate the solution with regular review points so you always know what is happening." },
];
export default function Process() {
  const [active, setActive] = useState(0);
  return <section id="process" className="process dark-section section-pad"><div className="process-grid"><div><p className="kicker">Work process</p><h2>How Neural innovates</h2><div className="steps">{steps.map((step, i) => <button key={step.title} className={active === i ? "active" : ""} onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, "0")}</span><div><b>{step.title}</b>{active === i ? <p>{step.text}</p> : null}</div><i>{active === i ? "×" : "+"}</i></button>)}</div></div><div className="process-art"><div className="process-orb"><i /><i /><i /></div><span>IDEA<br />TO<br />IMPACT</span></div></div></section>;
}
