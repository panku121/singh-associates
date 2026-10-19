"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "sa-admin-pass";

function supabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function formatWhen(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default function AdminAccessPage() {
  const [password, setPassword] = useState("");
  const [activePassword, setActivePassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [rows, setRows] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(pass) {
    const supabase = supabaseClient();
    if (!supabase) {
      setNote("Enquiry desk is not connected yet.");
      return;
    }

    setLoading(true);
    setNote("");
    const { data, error } = await supabase.rpc("list_inquiries", { passcode: pass });
    setLoading(false);

    if (error) {
      const message = String(error.message || "").toLowerCase();
      sessionStorage.removeItem(STORAGE_KEY);
      setUnlocked(false);
      setActivePassword("");
      if (message.includes("invalid password")) {
        setNote("That password is not correct.");
      } else if (message.includes("list_inquiries") || message.includes("schema cache")) {
        setNote("The enquiry list is not switched on yet.");
      } else {
        setNote("Could not load enquiries. Please try again.");
      }
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, pass);
    setActivePassword(pass);
    setUnlocked(true);
    setRows(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) load(saved);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    load(password);
  }

  function lock() {
    sessionStorage.removeItem(STORAGE_KEY);
    setUnlocked(false);
    setActivePassword("");
    setPassword("");
    setRows([]);
    setNote("");
  }

  return (
    <div className="admin-page">
      <header className="admin-bar">
        <div className="container nav-wrap">
          <a href="/" className="brand" aria-label="Singh and Associates home">
            <img src="/assets/logo.png" alt="Singh & Associates" />
            <span>
              <strong>Singh &amp; Associates</strong>
              <small>Tax Advocates</small>
            </span>
          </a>
          {unlocked ? (
            <button className="button button-quiet" type="button" onClick={lock}>
              Lock
            </button>
          ) : null}
        </div>
      </header>

      <main className="admin-main">
        <div className="container">
          {unlocked ? (
            <>
              <div className="admin-head">
                <div>
                  <p className="eyebrow">Private desk</p>
                  <h1>People who wrote in.</h1>
                </div>
                <button
                  className="button button-primary"
                  type="button"
                  disabled={loading}
                  onClick={() => load(activePassword)}
                >
                  {loading ? "Refreshing…" : "Refresh"}
                </button>
              </div>
              {rows.length === 0 ? (
                <p className="admin-empty">No enquiries yet.</p>
              ) : (
                <div className="admin-grid">
                  {rows.map((row) => (
                    <article className="admin-card" key={row.id}>
                      <p className="admin-service">{row.service}</p>
                      <h2>{row.name}</h2>
                      <a href={`tel:${row.phone}`}>{row.phone}</a>
                      <p className="admin-time">{formatWhen(row.created_at)}</p>
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form className="contact-form admin-gate" method="post" onSubmit={handleSubmit}>
              <p className="eyebrow">Private</p>
              <h1>Enquiry desk</h1>
              <label>
                Password
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter the desk password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button className="button button-primary" type="button" disabled={loading} onClick={handleSubmit}>
                {loading ? "Opening…" : "Open enquiries"}
              </button>
              <p className="form-note" aria-live="polite">
                {note}
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
