"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function isIndianPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone) || /^0?[1-5]\d{9}$/.test(phone);
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formNote, setFormNote] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const year = new Date().getFullYear();

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setSending(true);
    setFormNote("");

    if (!url || !key) {
      setFormNote("Enquiry form is not connected yet. Add the Supabase URL and key, then rebuild the site.");
      setSending(false);
      return;
    }

    const data = new FormData(form);
    const phoneNumber = digitsOnly(data.get("phone"));
    if (!isIndianPhone(phoneNumber)) {
      setFormNote("Enter a 10-digit mobile number, or a landline with STD code (11 digits starting with 0). Digits only.");
      setSending(false);
      return;
    }

    const supabase = createClient(url, key);
    const { error } = await supabase.from("inquiries").insert({
      name: String(data.get("name") || "").trim(),
      phone: phoneNumber,
      service: String(data.get("service") || "").trim(),
    });

    if (error) {
      setFormNote("We could not save your enquiry. Please call us or try again in a moment.");
    } else {
      setFormNote("Thank you. Your enquiry has been received. We will contact you shortly.");
      form.reset();
      setPhone("");
    }
    setSending(false);
  }

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Trusted tax & compliance guidance for businesses and individuals</span>
          <a href="tel:+918920052835">Call: +91 89200 52835</a>
        </div>
      </div>

      <header className="header" id="top">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Singh and Associates home">
            <img src="/assets/logo.png" alt="Singh & Associates" />
            <span>
              <strong>Singh &amp; Associates</strong>
              <small>Tax Advocates</small>
            </span>
          </a>
          <button
            className="menu-toggle"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
          <nav className={menuOpen ? "nav open" : "nav"}>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
            <a href="#process" onClick={closeMenu}>
              How it works
            </a>
            <a href="#plans" onClick={closeMenu}>
              Plans
            </a>
            <a href="#contact" className="nav-cta" onClick={closeMenu}>
              Get Consultation
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Clarity. Compliance. Confidence.</p>
              <h1>
                Make every financial decision <em>count.</em>
              </h1>
              <p className="lead">
                A modern tax and accounting practice for entrepreneurs, growing companies and families. We turn complex compliance into clear next steps.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Book a consultation <span>→</span>
                </a>
                <a className="button button-quiet" href="#services">
                  Explore services
                </a>
              </div>
              <div className="trust-row">
                <div>
                  <b>GST</b>
                  <span>Registration & Returns</span>
                </div>
                <div>
                  <b>ITR</b>
                  <span>Tax Return Filing</span>
                </div>
                <div>
                  <b>TDS</b>
                  <span>Timely Compliance</span>
                </div>
              </div>
            </div>
            <div className="hero-card">
              <div className="ornament">S&amp;A</div>
              <p>Tax advisory that feels</p>
              <h2>
                Personal.
                <br />
                Precise.
                <br />
                Proactive.
              </h2>
              <div className="card-footer">
                <span>Established expertise</span>
                <span>Ghaziabad, NCR</span>
              </div>
            </div>
          </div>
        </section>

        <section className="intro">
          <div className="container intro-grid">
            <p className="section-label">Your trusted advisors</p>
            <p className="intro-statement">
              Whether you are registering a new venture, filing a return or navigating day-to-day accounts, our focus stays simple:{" "}
              <strong>sound advice, delivered honestly.</strong>
            </p>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="portrait-wrap">
              <div className="portrait-ring">
                <img src="/assets/mahaveer-singh.jpg" alt="Mahaveer Singh, Tax Advocate" />
              </div>
              <div className="credential">
                <strong>Mahaveer Singh</strong>
                <span>B.Com (H), LL.B</span>
              </div>
            </div>
            <div>
              <p className="eyebrow">About the practice</p>
              <h2>Legal insight. Financial discipline. Human attention.</h2>
              <p>
                Mahaveer Singh is a qualified Tax Advocate with a strong foundation in taxation and legal advisory. At Singh &amp; Associates, every client receives practical, transparent guidance shaped around their exact needs.
              </p>
              <p>
                From statutory filings to long-term business support, we help you move forward with complete clarity.
              </p>
              <a className="text-link" href="#contact">
                Meet with our team <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">What we do</p>
                <h2>Essential services for a well-run business.</h2>
              </div>
              <p>
                Focused support across tax, compliance and accounting—kept clear, timely and dependable.
              </p>
            </div>
            <div className="service-grid">
              <article>
                <span className="service-num">01</span>
                <h3>GST Registration</h3>
                <p>New registration and amendments, handled so your business starts compliant.</p>
                <a href="#contact">Learn more →</a>
              </article>
              <article>
                <span className="service-num">02</span>
                <h3>GST Return</h3>
                <p>Return filing and corrections, prepared before every due date.</p>
                <a href="#contact">Learn more →</a>
              </article>
              <article>
                <span className="service-num">03</span>
                <h3>ITR</h3>
                <p>Income-tax return preparation and filing for individuals and businesses.</p>
                <a href="#contact">Learn more →</a>
              </article>
              <article>
                <span className="service-num">04</span>
                <h3>TDS Return</h3>
                <p>TDS working, returns and filings kept on schedule.</p>
                <a href="#contact">Learn more →</a>
              </article>
              <article>
                <span className="service-num">05</span>
                <h3>Accounting</h3>
                <p>Books and reports organised so your finances stay in control.</p>
                <a href="#contact">Learn more →</a>
              </article>
              <article>
                <span className="service-num">06</span>
                <h3>Trademark</h3>
                <p>Search, filing and registration of your brand name, handled with care.</p>
                <a href="#contact">Learn more →</a>
              </article>
              <article>
                <span className="service-num">07</span>
                <h3>Food Licence</h3>
                <p>FSSAI food licence application and follow-up, done properly.</p>
                <a href="#contact">Learn more →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="container">
            <p className="eyebrow">Simple by design</p>
            <h2>A smoother path to compliance.</h2>
            <div className="steps">
              <div>
                <b>01</b>
                <h3>Tell us your requirement</h3>
                <p>Share your business details or filing need with our team.</p>
              </div>
              <div>
                <b>02</b>
                <h3>Get a clear checklist</h3>
                <p>We explain documents, timelines and fees before we begin.</p>
              </div>
              <div>
                <b>03</b>
                <h3>Stay on track</h3>
                <p>We handle the filing and keep you informed at every step.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section plans" id="plans">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Flexible support</p>
                <h2>Choose the support that suits you.</h2>
              </div>
              <p>
                Indicative monthly plans. Final scope and pricing can be customised after a consultation.
              </p>
            </div>
            <div className="plan-grid">
              <article className="plan">
                <p>Starter</p>
                <h3>
                  ₹1,000<small>/month</small>
                </h3>
                <ul>
                  <li>GST Return</li>
                  <li>ITR support</li>
                  <li>15-minute consultation</li>
                  <li>Email support</li>
                </ul>
                <a className="button button-outline" href="#contact">
                  Enquire now
                </a>
              </article>
              <article className="plan featured">
                <span className="popular">Most popular</span>
                <p>Growth</p>
                <h3>
                  ₹2,500<small>/month</small>
                </h3>
                <ul>
                  <li>GST Registration</li>
                  <li>GST Return</li>
                  <li>ITR filing</li>
                  <li>TDS Return</li>
                </ul>
                <a className="button button-light" href="#contact">
                  Start a conversation
                </a>
              </article>
              <article className="plan">
                <p>Professional</p>
                <h3>
                  ₹5,100<small>/month</small>
                </h3>
                <ul>
                  <li>GST registration & returns</li>
                  <li>ITR / TDS returns</li>
                  <li>Accounting support</li>
                  <li>Trademark & food licence</li>
                </ul>
                <a className="button button-outline" href="#contact">
                  Enquire now
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Let’s talk</p>
              <h2>Begin with a clear conversation.</h2>
              <p>Reach out to discuss your requirement and receive straightforward guidance.</p>
              <div className="contact-links">
                <a href="tel:+918920052835">
                  <span>Phone</span>+91 89200 52835
                </a>
                <a href="mailto:gstconsultants5@gmail.com">
                  <span>Email</span>gstconsultants5@gmail.com
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://maps.app.goo.gl/9wdDYTKHAaGkE8ae6"
                >
                  <span>Office</span>74, Gupta Colony, Near Delhi Juice Corner, Ghaziabad
                </a>
              </div>
            </div>
            <form className="contact-form" id="inquiry-form" onSubmit={handleSubmit}>
              <label>
                Your name
                <input required name="name" type="text" placeholder="Enter your name" />
              </label>
              <label>
                Phone number
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={11}
                  pattern="[6-9][0-9]{9}|0?[1-5][0-9]{9}"
                  title="10-digit mobile, or landline with STD code (11 digits starting with 0). Digits only."
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) => setPhone(digitsOnly(event.target.value))}
                />
              </label>
              <label>
                How can we help?
                <select name="service" defaultValue="GST Registration">
                  <option>GST Registration</option>
                  <option>GST Return</option>
                  <option>ITR</option>
                  <option>TDS Return</option>
                  <option>Accounting</option>
                  <option>Trademark</option>
                  <option>Food Licence</option>
                  <option>Other enquiry</option>
                </select>
              </label>
              <button className="button button-primary" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send enquiry"} {!sending && <span>→</span>}
              </button>
              <p className="form-note" id="form-note" aria-live="polite">
                {formNote}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#top">
            <img src="/assets/logo.png" alt="Singh & Associates" />
            <span>
              <strong>Singh &amp; Associates</strong>
              <small>Tax Advocates</small>
            </span>
          </a>
          <p>© <span id="year">{year}</span> Singh &amp; Associates. All rights reserved.</p>
          <p>
            <a href="/adminAccess/">Admin page</a>
          </p>
          <p>Monday–Saturday · 10 AM to 7 PM</p>
        </div>
      </footer>

      <a
        className="whatsapp"
        href="https://wa.me/918920052835"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        ◔
      </a>
    </>
  );
}
