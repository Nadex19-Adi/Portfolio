"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "adityavpatil818@gmail.com",
    href: "mailto:adityavpatil818@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Belgaum, India",
    href: "#",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 815284 5070",
    href: "tel:+918152845070",
  },
];

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/Nadex19-Adi" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/aditya-patil-77aab2352/" },
];

export function ContactBlock() {
  return (
    <section id="contact" className="relative w-full scroll-mt-24 overflow-hidden py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <span className="font-display text-sm text-accent">06</span>
            <span className="h-px w-12 bg-accent" />
            <span className="font-subhead text-[11px] font-bold tracking-[0.3em] text-text-muted">Pit Wall — Contact</span>
          </div>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-white">
            Start Your <span className="text-accent">Engine</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Ready to build something fast, intelligent, and production-ready? Let's take the grid together.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact Info */}
          <div className="space-y-5">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-accent/60">
                  <a href={info.href} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-white transition-transform group-hover:scale-110">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">{info.label}</h3>
                      <p className="mt-1 font-medium text-white">{info.value}</p>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-4"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center border border-white/15 text-text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  aria-label={s.name}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
              <a
                href="https://aditya-patil.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center border border-white/15 text-text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-white"
                aria-label="Portfolio"
              >
                <Globe className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
              <form
                action="mailto:adityavpatil818@gmail.com"
                method="post"
                encType="text/plain"
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      placeholder="Your name"
                      className="rounded-md border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="your.email@example.com"
                      className="rounded-md border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can I help you?"
                    className="rounded-md border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-subhead text-[10px] font-bold tracking-[0.2em] text-text-muted">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="resize-none rounded-md border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted focus-visible:ring-accent"
                  />
                </div>

                <Button
                  type="submit"
                  aria-label="Send your message to Aditya"
                  className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-accent px-6 py-4 font-subhead text-[11px] font-bold tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
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
