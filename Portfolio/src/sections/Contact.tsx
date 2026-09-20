"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PROFILE } from "@/data/profile";
import { VIEWPORT, reveal } from "@/lib/motion";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: MapPin, label: "Location", value: PROFILE.location, href: null },
  {
    icon: Phone,
    label: "Phone",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/\s/g, "")}`,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full scroll-mt-24 overflow-hidden py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-[105rem] px-6 md:px-10">
        <SectionHeader num="08" label="Contact" title="Let's Build" accent="next" />

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          Hiring for multi-agent systems, RL environments, or full-stack AI? Email is the fastest
          path — I read it myself.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            {CONTACT_INFO.map((info, index) => (
              <motion.div
                key={info.label}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="group relative overflow-hidden rounded-none border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-accent/60">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-white transition-transform group-hover:scale-110">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">
                        {info.label}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="mt-1 block font-medium text-white transition-colors hover:text-accent"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="mt-1 font-medium text-white">{info.value}</p>
                      )}
                    </div>
                    {info.href && (
                      <ArrowUpRight className="ml-auto h-4 w-4 text-text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              transition={{ delay: 0.24 }}
              className="flex gap-4"
            >
              {PROFILE.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center border border-white/15 text-text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  aria-label={s.name}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-none border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
              <form
                action={`mailto:${PROFILE.email}`}
                method="post"
                encType="text/plain"
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      placeholder="Your name"
                      className="rounded-none border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="your.email@example.com"
                      className="rounded-none border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can I help you?"
                    className="rounded-none border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="resize-none rounded-none border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                  />
                </div>

                <Button
                  type="submit"
                  aria-label="Send your message to Aditya"
                  className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-none bg-accent px-6 py-4 font-subhead text-[11px] font-bold tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
