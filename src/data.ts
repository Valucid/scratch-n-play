export const navLinks = [
  {
    name: "How to play",
    href: "/#howtoplay",
  },
  {
    name: "Review",
    href: "/#review",
  },
  {
    name: "Rewards",
    href: "/#rewards",
  },
  {
    name: "T & C",
    href: "/terms",
  },
];

export const winners = [
  { id: 1, name: "Ahmed1024", prize: "₦5,000" },
  { id: 2, name: "Ahmed1024", prize: "₦5,000" },
  { id: 3, name: "Ahmed1024", prize: "₦5,000" },
  { id: 4, name: "Ahmed1024", prize: "₦5,000" },
  { id: 5, name: "Ahmed1024", prize: "₦5,000" },
  { id: 6, name: "Ahmed1024", prize: "₦5,000" },
];

export const steps = [
  {
    step: "Step 1",
    title: "Subscribe",
    description: "Text SP to 20444  to get started on Scratch and Play",
    image: "/images/one.svg",
  },
  {
    step: "Step 2",
    title: "Scratch and Win",
    description:
      "Scratch the designated area on the ticket to reveal your prize",
    image: "/images/two.svg",
  },
  {
    step: "Step 3",
    title: "Claim Your Prizes",
    description: "Redeem your winning ticket to claim your Prize",
    image: "/images/three.svg",
  },
];

export const whyScratch = [
  {
    title: "Instant Wins",
    description: "Prizes revealed in seconds.",
    image: "/images/wins.svg",
  },
  {
    title: "Guaranteed Fairness",
    description: "Randomized and transparent scratch mechanics.",
    image: "/images/fair.svg",
  },
  {
    title: "Safe & Secure",
    description: "Data protection and fast payouts.",
    image: "/images/safe.svg",
  },
];
export const faq = [
  {
    heading: "What prizes can I win?",
    text: "Participants are eligible to Win Cash and Airtime Prizes ",
  },
  {
    heading: "How can I redeem my prizes?",
    text: " For smaller prizes, like airtime or data, you can receive them instantly through your account, for cash prizes you'd be instructed to share your account details or  you will receive a notification with instructions on how to claim your winnings, which could include visiting a redemption center or providing your contact information for prize delivery",
  },
  {
    heading: " how do I know I won?",
    text: "Once you win a prize, you will receive a notification with instructions on how to claim it.",
  },
  {
    heading: " Can I receive my cash as airtime?",
    text: "No, Airtime prizes are instant.",
  },
];
export const reviews = [
  {
    id: 1,
    name: "ProGamerX",
    review:
      "The rewards are fantastic and I really love the platform. I’ve won so many cool prizes and will recommend them over and over again.",
    rating: 5,
  },
  {
    id: 2,
    name: "ProGamerX",
    review:
      "The rewards are fantastic and I really love the platform. I’ve won so many cool prizes and will recommend them over and over again.",
    rating: 5,
  },
  {
    id: 3,
    name: "ProGamerX",
    review:
      "The rewards are fantastic and I really love the platform. I’ve won so many cool prizes and will recommend them over and over again.",
    rating: 5,
  },
];
export interface TermSection {
  title: string;
  content: string[];
}
export const termsData: TermSection[] = [
  {
    title: "⁠Eligibility",
    content: [
      "1.1 Participants must be at least 18 years old",
      "1.2. The Promotion is open to residents of Nigeria.",
      "1.3. Employees, agents, and affiliates of PC Converge, as well as their immediate family members, are not eligible to participate.",
    ],
  },
  {
    title: "Participation",
    content: [
      "2.1  To participate, purchase a Scratch and Play card or access the promotion through SMS or Web.",
      "2.2. Participants must scratch the designated area to reveal their prize or entry details.",
      "2.3. Each scratch card or entry offers an instant chance to win.",
    ],
  },
  {
    title: "⁠Prizes",
    content: [
      "3.1 Instant Prizes: Participants can win instant cash rewards or airtime.",
      "3.2 The value of the cash or airtime reward will be revealed upon scratching the card or completing the play process.",
      "3.3. All prizes are non-transferable and cannot be exchanged unless stated otherwise.",
    ],
  },
  {
    title: "⁠Prize Redemption",
    content: [
      "4.1 Cash Prizes: Winners of cash prizes will receive payment via [bank transfer, mobile wallet, etc.] within 24 - 72 hours of confirmation. ",
      "4.2. Airtime Rewards: Airtime prizes will be credited directly to the phone number provided at the time of participation ",
      "4.3. Participants must provide accurate and valid contact details to claim their prizes.",
    ],
  },
  {
    title: "⁠ ⁠Fraud and Disqualification",
    content: [
      "5.1. Scratch and play reserves the right to disqualify participants suspected of fraud, tampering, or breach of these terms.",
      "5.2Tampered scratch cards will be deemed invalid.",
    ],
  },

  {
    title: "⁠Liability",
    content: [
      "6.1. Scratch and Play is not responsible for technical errors, lost entries, or any damages resulting from participation.",
      "6.2. Participants accept all risks associated with participating in this promotion.",
    ],
  },
  {
    title: "Privacy",
    content: [
      "7.1. Personal information collected will be used solely for the purposes of the Promotion and prize distribution.",
      "7.2. By participating, you consent to the use of your name and image for promotional purposes without additional compensation.",
    ],
  },
  {
    title: "General",
    content: [
      "8.1. The Promotion is subject to local laws and regulations.",
      "8.2. Scratch and Play reserves the right to amend or cancel the Promotion without prior notice.",
      "8.3. By participating, you agree to these terms and all decisions made by Scratch and Play, which are final and binding.",
      "For further inquiries, please contact info@scratchandplay.com.",
      "Play responsibly. Terms and Conditions apply.",
    ],
  },
];
