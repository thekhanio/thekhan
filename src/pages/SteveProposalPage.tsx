import ProposalPage, { type ProposalConfig } from "./ProposalPage";

const steveConfig: ProposalConfig = {
  client: { name: "Premier Partners", businessName: "Premier Partners" },
  date: "March 9, 2026",
  whereYouAre: [
    "You're spending $2,300 a month and you can't tell me which calls came from ads and which came from Google. Nobody can \u2014 because there's no tracking separating the two.",
    "Your five sites are live. Your four Google profiles exist. But nothing is connected, nothing is tracked, and you're flying blind on what's actually working.",
    "You told me you want to cut what you pay in half and still be busy. That starts with knowing where your leads actually come from.",
    "You\u2019re paying for marketing you can\u2019t measure. That\u2019s not a strategy \u2014 that\u2019s a guess.",
  ],
  whereYoureHeaded: [
    "You open your phone and see exactly how many calls came from Google, how many from ads, and how many from Nextdoor. For the first time, you know where your money is going.",
    "Your sites aren't just landing pages anymore \u2014 they rank for every service you offer in every area you serve. Power washing in Grayslake. Holiday lighting in Libertyville. Paver installation in Lake County.",
    "Danielle picks up the phone and the first thing she asks is \u2018How did you hear about us?\u2019 \u2014 and the answer matches your dashboard. Your competitors are on Topline Pro templates. You're on hand-coded sites that load in under 2 seconds.",
  ],
  whatWellBuild: [
    { title: "Tracking across all 5 sites", why: "Finally see where your traffic comes from \u2014 organic vs paid vs direct. No more guessing." },
    { title: "Search tools \u2014 see what people type to find you", why: "See exactly what people search to find you. Fix what's broken. Rank for what matters." },
    { title: "All 4 Google Business Profiles optimized", why: "Weekly posting, updated photos, correct categories, service area targeting. This alone can double your map visibility." },
    { title: "Dashboard \u2014 update from your phone", why: "Update photos, gallery, and content from your phone. No GitHub. No coding. Drag and drop." },
    { title: "New service pages behind the scenes", why: "I add service pages targeting specific areas and keywords. Your sites grow without you lifting a finger." },
    { title: "Seasonal content rotation", why: "Power washing copy in spring. Holiday lighting in summer. Snow in fall. Your sites stay relevant year-round." },
    { title: "Monthly reporting", why: "One page. How many people visited. Where they came from. What they searched. Plain English." },
    { title: "Bing Places setup", why: "Over a billion Bing users. Mostly older homeowners. Nobody in your market is there." },
  ],
  monthOnePrice: "$150",
  monthOneDescription: "Month 1 is $150. That covers maintenance and making sure you show up on Google across all five sites. Everything else \u2014 tracking setup, dashboard, Google Business Profile management, reporting \u2014 I'm doing at that price to show you what this looks like. We sit down April 1 and talk about what ongoing management looks like.",
  ownership: [
    "All 5 websites \u2014 you already own the code",
    "All 5 domains \u2014 registered in your name",
    "All 4 Google Business Profiles \u2014 your accounts",
    "Analytics data \u2014 your Google account",
    "Dashboard content \u2014 exportable anytime",
    "If you leave, you take everything with you. No hostage situation. No locked accounts. No \u2018call us to get your data.\u2019",
  ],
  whatHappensNext: [
    { step: "You pay $150 for Month 1", detail: "That\u2019s it. That\u2019s your cost today. I start working the same day." },
    { step: "Tracking goes live this week", detail: "Every visitor across all 5 sites is tracked \u2014 organic, paid, direct. No more guessing." },
    { step: "Dashboard wired within 2 weeks", detail: "Edit photos, gallery, and content from your phone. No GitHub, no coding." },
    { step: "Google Business Profiles optimized", detail: "All 4 profiles updated \u2014 photos, categories, posting, service areas." },
    { step: "April 1: we sit down and talk", detail: "By then you\u2019ll have data, a dashboard, and optimized profiles. We look at the numbers together and decide what ongoing management looks like." },
  ],
  damagingAdmission: "I\u2019m not a regular marketing agency. I\u2019ve seen what happens when companies take your money and go quiet for a week when you need something simple. I treat your business like my own \u2014 because your growth is literally my growth. When you call, I pick up. When you need something, it\u2019s done.",
  scarcity: "I\u2019m only taking on one to three clients at a time. That\u2019s not a sales line \u2014 it\u2019s math. Each client gets my full attention, not a ticket number.",
};

export default function SteveProposalPage() {
  return <ProposalPage config={steveConfig} />;
}
