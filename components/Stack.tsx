import Link from "next/link";

export default function Stack() {
  return (
    <section id="about" className="about section-pad" aria-labelledby="about-title">
      <div className="about-shape" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="about-copy">
        <p className="kicker">About us</p>
        <h2 id="about-title">
          A development partner for websites, mobile apps, and custom software
        </h2>
        <p>
          Neural IT Limited is a development studio in Dhaka, Bangladesh, working with businesses
          across Europe, Asia and the Middle East. We turn business requirements into responsive
          websites, dependable mobile products, and maintainable custom systems — and we repair the
          ones that have stopped working.
        </p>
        <p>
          Our process combines product planning, user experience design, engineering, testing and
          launch support. Every solution is shaped around the customer, the workflow, the budget and
          the measurable goal it has to support. You get a written scope, a fixed quote, and direct
          contact with the engineer building it.
        </p>
        <Link className="text-link" href="#services">
          Explore our services <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
