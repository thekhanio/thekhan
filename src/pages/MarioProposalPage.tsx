import ProposalPage, { type ProposalConfig } from "./ProposalPage";

const marioConfig: ProposalConfig = {
  client: { name: "MarioScape", businessName: "MarioScape" },
  date: "March 9, 2026",
  whereYouAre: [
    "You've got 15 years of experience, a trailer full of equipment, and 38 five-star reviews under Clean & Green. But none of that is under your name yet. No website, no listing, no business email \u2014 nothing that says MarioScape.",
    "Right now, every job comes from word of mouth and referrals. That works \u2014 until it doesn't. One slow week and you're back to hoping the phone rings.",
    "Your biggest headache is getting calls while you're working. A 10-minute phone call costs you an entire cut. And nobody's catching the ones you miss.",
    "Someone in Deerfield submitted a landscaping request through Clean & Green\u2019s site this week. That lead is yours \u2014 but there\u2019s no MarioScape for them to find yet.",
  ],
  whereYoureHeaded: [
    "People don\u2019t call your dad\u2019s company and ask for you. They Google MarioScape and call you directly.",
    "A homeowner in Deerfield Googles \u2018landscaper near me\u2019 and your name shows up \u2014 with 40+ five-star reviews, a professional site, and a number that rings.",
    "Your phone buzzes with estimate requests while you're on a job. You finish the lawn, check your phone, and three new leads are waiting. No more stopping work to answer calls.",
  ],
  whatWellBuild: [
    { title: "Multi-page website (one page per service)", why: "Each service gets its own page so Google knows what you offer. \u2018Landscaper in Deerfield\u2019 finds your lawn care page. \u2018Gutter cleaning Evanston\u2019 finds your gutter page." },
    { title: "Google Business Profile (40+ reviews as the goal)", why: "We migrate your C&G profile over 4 weeks \u2014 new name, same reviews, same trust. Then we reach out to your snow removal clients to push you past 40 before the season starts. You launch with proof most businesses take years to build." },
    { title: "Tracking \u2014 see where every call comes from", why: "We set up analytics so you can see who visits your site, what they searched, and where they came from. No guessing." },
    { title: "Bing \u2014 reach the homeowners your competitors miss", why: "Over a billion people search on Bing. Most of them are older homeowners \u2014 exactly the people who need landscaping. Your competitors aren\u2019t there." },
    { title: "Business email (info@marioscape.com)", why: "Professional email that routes to your existing inbox. One-person operation that looks like an established company." },
    { title: "Your own dashboard \u2014 update from your phone", why: "Change your photos, services, and gallery whenever you want. Swap it out as the season changes \u2014 no calling me and waiting." },
    { title: "Monthly check-in", why: "Quick call or text. What\u2019s working. What to adjust. Plain language, no jargon." },
  ],
  monthOnePrice: "$150",
  monthOneDescription: "Here\u2019s exactly what you pay and when:\n\nTo me (TheKhan):\n\u2022 Month 1 \u2014 $150 \u2014 Day 1\n\u2022 Website build \u2014 $750 \u2014 Day 60\n\nYours (your name, your accounts):\n\u2022 GoDaddy domain (marioscape.com) \u2014 $10\u201312/year\n\u2022 Google Workspace (info@marioscape.com) \u2014 $8/mo\n\nYour out-of-pocket today: ~$168. That\u2019s it. Everything else \u2014 tracking, dashboard, Google Business Profile migration, Bing setup \u2014 I\u2019m doing at that price to show you what this looks like. We sit down April 1 and talk about what ongoing management looks like.",
  ownership: [
    "Your website code \u2014 every line of it",
    "marioscape.com domain \u2014 registered in your name",
    "Google Business Profile \u2014 your account, your reviews",
    "Business email \u2014 your Google Workspace",
    "Analytics data \u2014 your Google account",
    "All social media accounts \u2014 your profiles",
    "If you leave, you take everything with you. The site works without me. The Google profile works without me. You're never locked in.",
  ],
  whatHappensNext: [
    { step: "You pay $150 for Month 1", detail: "That\u2019s it. That\u2019s your cost today. I start building the same day." },
    { step: "Domain + email setup (I\u2019ll walk you through it)", detail: "You purchase marioscape.com on GoDaddy ($10\u201312/year) and Google Workspace ($8/mo). These are yours \u2014 your name, your accounts. Takes 5 minutes and I\u2019m on the phone with you the whole time." },
    { step: "Site live within 7 days", detail: "Multi-page, hand-coded, mobile-responsive. Every service gets its own page so Google can find you." },
    { step: "Google Business Profile migration starts", detail: "Week by week, we move C&G to MarioScape. New name, same 38+ reviews. By the end, you\u2019re fully rebranded." },
    { step: "April 1: we sit down and talk", detail: "By then you\u2019ll have a live site, a migrating profile, and tracking running. We look at the numbers together and decide what ongoing management looks like. Website build ($750) due after 60 days." },
  ],
  damagingAdmission: "I\u2019m not a regular marketing agency. I treat your business like my own \u2014 because your growth is literally my growth. When you call, I pick up. When you need something, it\u2019s done.",
  scarcity: "I\u2019m only taking on one to three clients at a time. You\u2019re one of them. This rate won\u2019t exist once the case studies are done.",
};

export default function MarioProposalPage() {
  return <ProposalPage config={marioConfig} />;
}
