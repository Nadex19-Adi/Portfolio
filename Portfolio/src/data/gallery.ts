/**
 * Event photos that ship in `public/events/`. Names and roles only — no dates
 * are recorded here because they were never confirmed.
 *
 * `span` and `ratio` drive the wall layout: a 12-column grid on large screens
 * with deliberately uneven tiles so the wall reads as a photo sheet rather than
 * a uniform card grid.
 */
export const GALLERY = [
  {
    name: "NKCON 2024",
    role: "Participant",
    image: "/events/nkcon-2024.jpg",
    span: "lg:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    name: "NKCON 2025",
    role: "Technical Co-Lead",
    image: "/events/nkcon-2025.jpg",
    span: "lg:col-span-5",
    ratio: "aspect-[16/10]",
  },
  {
    name: "Google DevFest",
    role: "Participant",
    image: "/events/google-devfest-2026.jpg",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    name: "Google Cloud Community Days",
    role: "Participant",
    image: "/events/google-cloud-community-days.jpg",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    name: "IEEE Advisor Meet",
    role: "Volunteer",
    image: "/events/ieee-advisor-meet.jpg",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    name: "AESS Conclave",
    role: "Participant",
    image: "/events/aess-conclave.jpg",
    span: "lg:col-span-5",
    ratio: "aspect-[16/10]",
  },
  {
    name: "IEEE NKSS AGM",
    role: "SAC Volunteer",
    image: "/events/ieee-nkss-agm-2026.jpg",
    span: "lg:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    name: "Make for Belagavi",
    role: "Participant",
    image: "/events/make-for-belagavi.jpg",
    span: "lg:col-span-6",
    ratio: "aspect-[16/11]",
  },
  {
    name: "IEEE Volunteer Meet",
    role: "SAC Volunteer",
    image: "/events/ieee-volunteer-meet.jpg",
    span: "lg:col-span-6",
    ratio: "aspect-[16/11]",
  },
];
