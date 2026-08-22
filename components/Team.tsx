const team = [
  { name: "Fahim Ahamed", role: "Founder & Lead Engineer", tone: "amber", initials: "FA" },
  { name: "Product Strategy", role: "Research & product direction", tone: "blue", initials: "PS" },
  { name: "Creative Studio", role: "UI/UX & visual systems", tone: "pink", initials: "CS" },
  { name: "Engineering Lab", role: "Web, mobile & cloud", tone: "green", initials: "EL" },
];
export default function Team() {
  return <section className="team section-pad"><div className="team-top"><div><p className="kicker">Team members</p><h2>Where creativity meets technology: our talent for solutions</h2></div><div className="team-stat"><strong>50+</strong><span>Combined projects</span><a className="text-link" href="#contact">Explore team <i>↗</i></a></div></div><div className="team-grid">{team.map((member) => <article key={member.name} className="team-card"><div className={`portrait ${member.tone}`}><span>{member.initials}</span><i /><b /></div><h3>{member.name}</h3><p>{member.role}</p><span className="team-arrow">↗</span></article>)}</div></section>;
}
