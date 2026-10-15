"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;

    const subject = encodeURIComponent("Subscribe to the Wanky newsletter");
    const body = encodeURIComponent(
      `Please add this email address to the Wanky newsletter mailing list:\n\n${address}\n\nI understand that this request will be sent by email.`
    );

    window.location.href =
      `mailto:wankyzone@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex items-start gap-4">
          <Mail size={29} strokeWidth={1.5} className="mt-1 shrink-0 text-zinc-400" />
          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              Get updates from Wanky
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Product news, engineering notes, and meaningful updates from
              across the Wanky ecosystem.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="wanky-newsletter-email">
            Email address
          </label>
          <input
            id="wanky-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#FF4D94]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FF4D94] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
          >
            Subscribe <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-[10px] leading-5 text-zinc-500 md:hidden">
          Subscribing opens your email app to send a request. This form does
          not store addresses automatically.
        </p>
      </div>
      <p className="hidden px-6 pb-4 text-center text-[10px] text-zinc-500 md:block">
        Subscribing opens your email app to send a request; addresses are not
        stored automatically by this website.
      </p>
    </section>
  );
}
