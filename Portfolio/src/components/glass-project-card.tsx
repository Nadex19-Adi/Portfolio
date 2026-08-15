"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/use-tilt";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, type MouseEvent } from "react";

interface GlassProjectCardProps {
    title: string;
    description: string;
    image: string;
    tech: string[];

    metrics?: Record<string, string | undefined>;
    className?: string;
    imageClassName?: string;
}

export function GlassProjectCard({
    title,
    description,
    image,
    tech,

    metrics,
    className,
    imageClassName,
}: GlassProjectCardProps) {
    const { rotateX, rotateY, onMouseMove, onMouseLeave, transformPerspective } = useTilt(7);
    const [glare, setGlare] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        onMouseMove(e);
        const rect = e.currentTarget.getBoundingClientRect();
        setGlare({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 25 }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformPerspective }}
            transition={{ duration: 0.4 }}
            className={cn("w-full will-change-transform", className)}
        >
            <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-accent/60">
                {/* Image Section */}
                <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
                    <img
                        src={image}
                        alt={`Preview of project: ${title}`}
                        loading="lazy"
                        decoding="async"
                        className={cn("h-full w-full object-cover transition-all duration-700 group-hover:scale-110", imageClassName)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/20 to-transparent" />
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-accent text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </div>

                {/* Content Section */}
                <div className="flex grow flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-2xl leading-tight text-white transition-colors group-hover:text-accent">
                            {title}
                        </h3>
                    </div>

                    {/* Tech Stack — always visible */}
                    {tech && tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {tech.map((t, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-subhead text-[9px] font-bold uppercase tracking-widest text-accent"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-[15px] leading-[1.7] text-text-secondary">
                        {description}
                    </p>

                    {/* Metrics Section */}
                    {metrics && (
                        <div className="mt-auto grid grid-cols-2 gap-y-3 gap-x-2 border-t border-white/10 pt-4 text-xs">
                            {Object.entries(metrics).map(([key, value]) => (
                                <div key={key} className="flex flex-col">
                                    <span className="font-subhead text-[8px] font-bold uppercase tracking-[0.2em] text-text-muted opacity-90">{key}</span>
                                    <span className="mt-0.5 font-medium text-white/90">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cursor-following glare for depth */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(560px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.09), transparent 45%)`,
                    }}
                />
            </Card>
        </motion.div>
    );
}
