// Central editing point for all copy, image URLs, links and deliberately unverified placeholders.
// Vite supplies the correct base locally and when hosted from the GitHub Pages project path.
const image = (filename) => `${import.meta.env.BASE_URL}images/${filename}`;

export const siteContent = {
  contact: { email: "[contact email]", partnerLink: "#contact", social: { instagram: "#", youtube: "#", linkedin: "#" } },
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
    { name: "Nandera Immaculate", quote: "I want to keep learning and playing.", image: image("story-cricket-portrait.webp") },
    { name: "Iloku Esther", quote: "Cricket has given me confidence.", image: image("story-two.webp") },
    { name: "Kongai", quote: "My dreams are bigger than my challenges.", image: image("story-three.webp") },
  ],
  impact: [["1000+", "Girls reached"], ["5", "Schools engaged"], ["300+", "Girls supported in education"], ["100+", "Girls in cricket"]],
};
