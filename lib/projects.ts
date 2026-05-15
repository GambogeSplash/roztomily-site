/**
 * Single source of truth for project case studies.
 * Index page + detail page + sitemap all read from here.
 */

export type Project = {
  slug: string;
  client: string;
  title: string;
  category: string;        // "PR & Brand Marketing", "Experiential", etc.
  year: string;            // short — e.g. "2022"
  date: string;            // longer — e.g. "October 2022"
  duration: string;        // e.g. "4 min read"
  image: string;           // primary image — used for both card thumbnail + detail cover
  subtitle: string;
  role: string;
  stack: string[];
  body: { h?: string; p: string }[];
  gallery?: string[];      // optional secondary images on the detail page
};

export const projects: Project[] = [
  {
    slug: "good-mama-9ja-queen-fashion-show",
    client: "Good Mama",
    title: "9ja Queen Open Market Fashion Show",
    category: "Experiential",
    year: "2023",
    date: "2022",
    duration: "3 min read",
    image: "/roztomily/projects/good-mama-9ja-queen-fashion-show/01.jpg",
    subtitle: "Grassroots open-market activations bringing the Good Mama brand directly to traders and shoppers across Nigeria.",
    role: "Experiential lead",
    stack: ["Grassroots activation", "Open-market engagement", "Reward mechanics"],
    body: [
      { h: "Challenge", p: "Good Mama launched the 9ja Queen Open Market Fashion Show to deepen engagement with everyday consumers by activating directly within high-traffic market environments across Nigeria." },
      { h: "Approach", p: "The campaign focused on bringing brand experience closer to consumers through interactive, reward-driven engagement and live activations. Execution was anchored in grassroots visibility, ensuring strong connection with traders, shoppers, and retail communities." },
      { h: "Outcomes", p: "Strong visibility across multiple open markets nationwide. Increased emotional connection with everyday consumers. High engagement through interactive on-ground activations. Positive sentiment across both offline and digital channels. Strengthened brand presence within core consumer communities." },
    ],
    gallery: [
      "/roztomily/projects/good-mama-9ja-queen-fashion-show/01.jpg",
      "/roztomily/projects/good-mama-9ja-queen-fashion-show/02.jpg",
      "/roztomily/projects/good-mama-9ja-queen-fashion-show/03.jpg",
      "/roztomily/projects/good-mama-9ja-queen-fashion-show/04.jpg",
    ],
  },
  {
    slug: "valuejet-brand-launch",
    client: "ValueJet",
    title: "Airline Launch Campaign",
    category: "PR & Brand Marketing",
    year: "2022",
    date: "October 2022",
    duration: "4 min read",
    image: "/roztomily/projects/valuejet-brand-launch/01.jpg",
    subtitle: "Integrated launch communications and event execution for ValueJet's entry into the Nigerian aviation market.",
    role: "PR & brand marketing lead",
    stack: ["Earned media", "Event production", "Social amplification"],
    body: [
      { h: "Challenge", p: "In October 2022, ValueJet Airline entered the Nigerian aviation industry, marking its debut in the domestic air travel market. The launch presented an opportunity to introduce the brand and its service offerings, particularly its flexible fare pricing structure designed to make air travel more accessible to a wider range of Nigerian travellers." },
      { h: "Approach", p: "An integrated communications strategy was developed to position the airline's proposition through a targeted media mix, while overseeing the execution of the official launch event and supporting campaign rollout." },
      { h: "Outcomes", p: "Seamless execution of the official launch event, including event set up, production, guest experience, and media coordination. Strong media and public engagement around ValueJet's entry. Over 360% growth in earned media across print, blogs, television and social media. #FlyValueJet trended three times on X (formerly Twitter), reaching over 2 million users." },
    ],
    gallery: [
      "/roztomily/projects/valuejet-brand-launch/01.jpg",
      "/roztomily/projects/valuejet-brand-launch/02.jpg",
      "/roztomily/projects/valuejet-brand-launch/03.jpg",
    ],
  },
  {
    slug: "premier-cool-ready-up-your-cool",
    client: "Premier Cool",
    title: "“Ready Up Your Cool” TVC",
    category: "Creative Production",
    year: "2022",
    date: "2022",
    duration: "3 min read",
    image: "/roztomily/projects/premier-cool-ready-up-your-cool/01.png",
    subtitle: "End-to-end creative production and delivery of a two-part TVC series for Premier Cool's Black Soap and Ultimate product lines.",
    role: "Creative production lead",
    stack: ["TVC production", "Casting", "Location & logistics"],
    body: [
      { h: "Challenge", p: "Premier Cool sought to strengthen its market positioning by connecting with a younger, lifestyle-driven audience through a bold and relatable campaign that reinforced the brand's promise of comfort, freshness, and everyday ease." },
      { h: "Approach", p: "We championed the end-to-end creative production and delivery of the “Ready Up Your Cool” TVC series across two distinct commercials. Our role spanned concept alignment, cast sourcing, location scouting, production planning, and on-ground coordination, overseeing execution from pre-production through to final delivery with full quality control, brand consistency, and stakeholder collaboration." },
      { h: "Outcomes", p: "Successful delivery of high-quality commercials aligned with Premier Cool's brand positioning. Seamless coordination across all production phases, from scripting to final execution. PR support for commercial rollout across media platforms." },
    ],
    gallery: ["/roztomily/projects/premier-cool-ready-up-your-cool/01.png"],
  },
  {
    slug: "bord-bia-meet-the-maker",
    client: "Bord Bia",
    title: "Meet the Maker",
    category: "Experiential",
    year: "2021",
    date: "2021",
    duration: "4 min read",
    image: "/roztomily/projects/bord-bia-meet-the-maker/01.jpg",
    subtitle: "The first Meet the Maker event in Africa · staged at the Irish Consulate in Lagos to promote premium Irish spirits in Nigeria.",
    role: "Experiential marketing lead",
    stack: ["Event production", "Stakeholder engagement", "Earned media"],
    body: [
      { h: "Challenge", p: "Bord Bia hosted its first Meet the Maker event in Africa in 2021 at the Irish Consulate in Lagos to promote premium Irish spirits in Nigeria, showcase Irish distillers, and deepen engagement with key stakeholders within the local market." },
      { h: "Approach", p: "A detailed communications and event execution plan was developed to guide the rollout, ensuring strong stakeholder participation and coordinated media presence. We supported the experience with audio-visual production and structured media amplification across digital and traditional platforms." },
      { h: "Outcomes", p: "Successfully delivered the first Meet the Maker event in Africa with strong stakeholder attendance. Achieved over 50% in earned media value across campaign coverage. Extended visibility through coordinated media and content amplification." },
    ],
    gallery: ["/roztomily/projects/bord-bia-meet-the-maker/01.jpg"],
  },
  {
    slug: "kerrygold-world-milk-day",
    client: "Kerrygold",
    title: "World Milk Day",
    category: "Experiential",
    year: "2022",
    date: "May–July 2022",
    duration: "4 min read",
    image: "/roztomily/projects/kerrygold-world-milk-day/01.jpg",
    subtitle: "Three-day mall activation plus influencer-led storytelling and an interactive online competition to spotlight Irish milk for World Milk Day.",
    role: "Campaign lead",
    stack: ["Mall activation", "Influencer", "Social competition"],
    body: [
      { h: "Challenge", p: "To leverage World Milk Day as a strategic moment, Bord Bia partnered with Ornua's Kerrygold to increase awareness of the quality and nutritional benefits of Irish milk among Nigerian consumers." },
      { h: "Approach", p: "The campaign combined on-ground engagement with digital amplification to drive both awareness and participation. In the lead-up to World Milk Day, a three-day offline activation was delivered across select malls, supported by influencer-led storytelling and an interactive online competition that encouraged consumers to create and share their own milk-based recipes." },
      { h: "Outcomes", p: "Successfully executed a three-day mall activation with strong foot traffic and consumer participation. Reached over 12 million users across digital and social platforms. Delivered over 330% value-add on influencer media spend through 40 content pieces and mentions. Increased Kerrygold's Instagram following by 20% between May and July 2022." },
    ],
    gallery: ["/roztomily/projects/kerrygold-world-milk-day/01.jpg"],
  },
  {
    slug: "carex-carextra-campaign",
    client: "Carex",
    title: "Carextra Campaign",
    category: "Experiential",
    year: "2022",
    date: "2022",
    duration: "3 min read",
    image: "/roztomily/projects/carex-carextra-campaign/01.jpg",
    subtitle: "Experiential activation at Ikeja City Mall translating Carex's Carextra concept into a live care-and-pamper brand experience.",
    role: "Experiential lead",
    stack: ["Mall activation", "Brand ambassador", "Foot-traffic engagement"],
    body: [
      { h: "Challenge", p: "Recognising the need to build a more personal and engaging connection with consumers, Carex translated its Carextra campaign into a physical experiential activation designed to bring care and brand interaction directly to shoppers." },
      { h: "Approach", p: "We led the experiential execution, bringing the concept to life at Ikeja City Mall through a branded activation hub that offered visitors care and pamper sessions. This was further enhanced with a meet-and-greet featuring brand ambassador Jbums, driving foot traffic and strengthening emotional connection." },
      { h: "Outcomes", p: "Successfully delivered a high-traffic experiential activation at Ikeja City Mall. Increased visibility for the brand. Generated strong consumer participation through care and pamper engagement sessions." },
    ],
    gallery: ["/roztomily/projects/carex-carextra-campaign/01.jpg"],
  },
  {
    slug: "regal-turn-up-and-shine",
    client: "Regal Gin",
    title: "Turn Up & Shine",
    category: "PR & Brand Marketing",
    year: "2019",
    date: "2019",
    duration: "3 min read",
    image: "/roztomily/projects/regal-turn-up-and-shine/01.jpg",
    subtitle: "Phased media and content amplification strategy for REGAL Gin's sponsorship of the 2019 Afrobeat Party, celebrating the legacy of Fela Anikulapo Kuti.",
    role: "PR strategy lead",
    stack: ["Sponsorship activation", "Influencer", "Content amplification"],
    body: [
      { h: "Challenge", p: "REGAL Gin, launched in Nigeria in 1983, has maintained a strong presence within the gin category. To further promote the brand, drive appeal, and increase its market share, REGAL sponsored the 2019 edition of the Afrobeat Party, an annual concert celebrating the legacy of Fela Anikulapo Kuti." },
      { h: "Approach", p: "To maximise the impact of the sponsorship, a phased media and content amplification strategy was executed across pre-event, live event, and post-event stages. Influencers were activated to drive visibility and attendance, while audio-visual content and audience feedback were captured to extend the campaign lifecycle beyond the event." },
      { h: "Outcomes", p: "Amplified event highlights across relevant media and digital platforms. Increased media visibility for REGAL Gin across online and print channels. Extended campaign reach through influencer-led content and post-event amplification." },
    ],
    gallery: ["/roztomily/projects/regal-turn-up-and-shine/01.jpg"],
  },
];

export const projectSlugs = (): string[] => projects.map((p) => p.slug);
export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
