// Central editing point for all copy, image URLs, links and deliberately unverified placeholders.
// Vite supplies the correct base locally and when hosted from the GitHub Pages project path.
const image = (filename) => `${import.meta.env.BASE_URL}images/${filename}`;

export const siteContent = {
  contact: {
    phone: "+256 774 603 700",
    phoneHref: "tel:+256774603700",
    website: "https://soroticricketacademy.org",
    websiteLabel: "soroticricketacademy.org",
    partnerLink: "#contact",
    social: {
      instagram: "https://www.instagram.com/soroticricketacademy14/",
      x: "https://x.com/SorotiAcademy",
      linkedin: "#",
    },
  },
  videoUrl: "https://www.youtube-nocookie.com/embed/JB52QsPpEH8?rel=0",
  images: {
    hero: image("hero-team.webp"),
    film: image("film-batter.webp"),
    reality: image("story-cricket-portrait.webp"),
    cricket: image("cricket-partners.webp"),
    partnership: image("preparation.webp"),
    finalCta: image("final-chapter.webp"),
  },
  stories: [
    { name: "Nandera Immaculate", copy: "Education, mentorship and a place to belong.", image: image("story-cricket-portrait.webp") },
    { name: "Iloku Esther", copy: "Life skills, leadership and the confidence to choose her future.", image: image("story-two.webp") },
    { name: "Kongai", copy: "A pathway to play, learn and lead beyond the boundary.", image: image("story-three.webp") },
  ],
  impact: [
    ["5000+", "Girls reached since 2014"],
    ["500", "Education bursaries and scholarships"],
    ["100", "Girls trained in vocational skills in 2025"],
    ["25", "Girls who have represented Uganda"],
  ],
};
