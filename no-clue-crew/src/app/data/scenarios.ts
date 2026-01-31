// scenarios.ts

export type Stats = {
  age: number;

  bank: number;        // cash
  happiness: number;   // 0-100
  debt: number;        // loans / credit card balance
  creditScore: number; // 0-850

  // simple trackers to unlock future stuff
  bikeProgress: number; // 0..120 (goal)
  hasBike: boolean;
  hasLaptop: boolean;
  education: "none" | "highschool" | "university";
};

export type Effect = Partial<Pick<
  Stats,
  "bank" | "happiness" | "debt" | "creditScore" | "bikeProgress" | "hasBike" | "hasLaptop" | "education"
>> & {
  note?: string;
};

export type Requirements = {
  minBank?: number;
  maxDebt?: number;
  minCreditScore?: number;
  minHappiness?: number;
  mustHaveBike?: boolean;
  mustHaveLaptop?: boolean;

  // optional custom requirement
  custom?: (stats: Stats) => boolean;

  lockedMessage?: string;
};

export type Option = {
  id: string;      // "A" "B" "C" ...
  label: string;   // button label
  detail?: string; // extra text (optional)
  effect: Effect;

  requirements?: Requirements;

  // If requirements fail, you can either:
  // - block the option (no change), OR
  // - apply this fallback (ex: forced loan)
  onFailEffect?: Effect;
};

export type Scenario = {
  id: string;
  minAge: number;
  maxAge: number;
  title: string;
  prompt: string;

  // optional: show once per age range, or allow repeats
  oneTime?: boolean;

  options: Option[];
};

// --------------------
// Helpers (Requirements + Effects)
// --------------------
export function clampStats(stats: Stats): Stats {
  return {
    ...stats,
    happiness: Math.max(0, Math.min(100, stats.happiness)),
    creditScore: Math.max(0, Math.min(850, stats.creditScore)),
    bikeProgress: Math.max(0, Math.min(120, stats.bikeProgress)),
  };
}

export function applyEffect(stats: Stats, effect: Effect): Stats {
  const next: Stats = {
    ...stats,
    bank: stats.bank + (effect.bank ?? 0),
    happiness: stats.happiness + (effect.happiness ?? 0),
    debt: stats.debt + (effect.debt ?? 0),
    creditScore: stats.creditScore + (effect.creditScore ?? 0),
    bikeProgress: stats.bikeProgress + (effect.bikeProgress ?? 0),
    hasBike: effect.hasBike ?? stats.hasBike,
    hasLaptop: effect.hasLaptop ?? stats.hasLaptop,
    education: effect.education ?? stats.education,
  };

  // auto-unlock bike if progress reaches goal
  if (!next.hasBike && next.bikeProgress >= 120) {
    next.hasBike = true;
  }

  return clampStats(next);
}

export function checkOptionRequirements(
  stats: Stats,
  option: Option
): { allowed: boolean; reason?: string } {
  const r = option.requirements;
  if (!r) return { allowed: true };

  if (typeof r.minBank === "number" && stats.bank < r.minBank) {
    return { allowed: false, reason: r.lockedMessage ?? `Need at least $${r.minBank}.` };
  }
  if (typeof r.maxDebt === "number" && stats.debt > r.maxDebt) {
    return { allowed: false, reason: r.lockedMessage ?? "Debt is too high." };
  }
  if (typeof r.minCreditScore === "number" && stats.creditScore < r.minCreditScore) {
    return { allowed: false, reason: r.lockedMessage ?? "Credit score is too low." };
  }
  if (typeof r.minHappiness === "number" && stats.happiness < r.minHappiness) {
    return { allowed: false, reason: r.lockedMessage ?? "Happiness is too low right now." };
  }
  if (r.mustHaveBike && !stats.hasBike) {
    return { allowed: false, reason: r.lockedMessage ?? "You need a bike first." };
  }
  if (r.mustHaveLaptop && !stats.hasLaptop) {
    return { allowed: false, reason: r.lockedMessage ?? "You need a laptop first." };
  }
  if (r.custom && !r.custom(stats)) {
    return { allowed: false, reason: r.lockedMessage ?? "You don't meet the requirements." };
  }

  return { allowed: true };
}

export function chooseOption(
  stats: Stats,
  option: Option
): { nextStats: Stats; allowed: boolean; message?: string } {
  const check = checkOptionRequirements(stats, option);

  if (check.allowed) {
    return { nextStats: applyEffect(stats, option.effect), allowed: true };
  }

  if (option.onFailEffect) {
    return { nextStats: applyEffect(stats, option.onFailEffect), allowed: false, message: check.reason };
  }

  return { nextStats: stats, allowed: false, message: check.reason };
}

export function getScenariosForAge(age: number): Scenario[] {
  return SCENARIOS.filter(s => age >= s.minAge && age <= s.maxAge);
}

// Optional: a starter player state (your UI can use this)
export const DEFAULT_STATS: Stats = {
  age: 7,
  bank: 0,
  happiness: 50,
  debt: 0,
  creditScore: 0,
  bikeProgress: 0,
  hasBike: false,
  hasLaptop: false,
  education: "none",
};

// --------------------
// YOUR FULL SCENARIOS (Improved)
// --------------------
// Notes on improvements:
// - Bike is tracked with bikeProgress (goal 120). Snack spending slows progress.
// - Trip / jacket / laptop can fallback into debt if user insists without enough bank.
// - University choices affect education + debt.
// - Grade 10 job modeled as MONTHLY result (your team can apply it once per "year" or 12 times).

export const SCENARIOS: Scenario[] = [
  // AGE 7–10: Needs vs Wants
  {
    id: "bday_money_7_10",
    minAge: 7,
    maxAge: 10,
    title: "Birthday Money",
    prompt: "You get $20 for your birthday. What do you do?",
    options: [
      {
        id: "A",
        label: "Buy a toy",
        detail: "Fun now, but you’ll have less later.",
        effect: { bank: -20, happiness: +10, note: "want_spend" },
        requirements: { minBank: 20, lockedMessage: "You need $20 to buy the toy." },
        onFailEffect: { happiness: -2, note: "couldnt_afford_toy" },
      },
      {
        id: "B",
        label: "Save it",
        detail: "Delayed reward—more options later.",
        effect: { bank: +20, happiness: +2, note: "save" },
      },
    ],
  },

  // AGE 10–12: Saving goal (Bike)
  {
    id: "bike_goal_10_12",
    minAge: 10,
    maxAge: 12,
    title: "Save for a Bike",
    prompt: "You want a bike that costs $120. You get a weekly allowance of $10. What do you do each week?",
    options: [
      {
        id: "A",
        label: "Spend on snacks",
        detail: "You have fun now, but the bike takes longer.",
        // you still get the $10 allowance, but you spend it
        effect: { bank: +0, happiness: +6, bikeProgress: +2, note: "snacks" },
      },
      {
        id: "B",
        label: "Save allowance for bike",
        detail: "Bike comes sooner. Bigger happiness later.",
        // you save the $10 toward bike (progress)
        effect: { happiness: +2, bikeProgress: +10, note: "save_for_bike" },
      },
      {
        id: "C",
        label: "Split: save $7, spend $3",
        detail: "Balanced choice.",
        effect: { happiness: +4, bikeProgress: +7, note: "split" },
      },
    ],
  },

  // AGE 12–14: School Trip
  {
    id: "school_trip_12_14",
    minAge: 12,
    maxAge: 14,
    title: "3-Day Overnight School Trip",
    prompt: "Your school is going on a 3-day overnight trip. The cost is $150. Your friends are all going!",
    options: [
      {
        id: "A",
        label: "Go on the trip",
        detail: "Great memories, but it costs money.",
        effect: { bank: -150, happiness: +15, note: "experience" },
        requirements: { minBank: 150, lockedMessage: "You don’t have $150 saved." },
        // fallback: parents/loan covers it but you start teen debt (small lesson)
        onFailEffect: { debt: +150, happiness: +10, creditScore: -5, note: "trip_on_debt" },
      },
      {
        id: "B",
        label: "Skip and save",
        detail: "More money now, but you feel left out.",
        effect: { bank: +150, happiness: -10, note: "save_sacrifice" },
      },
    ],
  },

  // Grade 9: Trendy jacket
  {
    id: "superpuff_grade9",
    minAge: 14,
    maxAge: 15,
    title: "Trend Pressure: Super Puff",
    prompt:
      "Winter is coming. Everyone at school is wearing a $300 trendy jacket. You already have a warm jacket, just not trendy.",
    options: [
      {
        id: "A",
        label: "Buy the trendy jacket",
        detail: "You fit in, but it’s a want—not a need.",
        effect: { bank: -300, happiness: +30, note: "trend_spend" },
        requirements: { minBank: 300, lockedMessage: "You can’t afford it with cash." },
        // fallback: buy with debt (sets up credit lesson later)
        onFailEffect: { debt: +300, happiness: +15, creditScore: -10, note: "trend_debt" },
      },
      {
        id: "B",
        label: "Keep your old jacket",
        detail: "You save money, even if it’s not trendy.",
        effect: { bank: +300, happiness: -10, note: "practical" },
      },
    ],
  },

  // Grade 10: Part-time job (monthly)
  {
    id: "job_grade10",
    minAge: 15,
    maxAge: 16,
    title: "First Job!",
    prompt: "You got your first job at a fast-food place. You earn $450/month. How do you use it each month?",
    options: [
      {
        id: "A",
        label: "Save most, spend some",
        detail: "Save $300, spend $150",
        effect: { bank: +300, happiness: +10, note: "balanced_saver" },
      },
      {
        id: "B",
        label: "Lifestyle spender",
        detail: "Save $100, spend $350",
        effect: { bank: +100, happiness: +30, note: "lifestyle" },
      },
      {
        id: "C",
        label: "Spend it all",
        detail: "Save $0, spend $450",
        effect: { bank: +0, happiness: +50, note: "yolo" },
      },
      {
        id: "D",
        label: "Save it all",
        detail: "Save $450, spend $0",
        effect: { bank: +450, happiness: +0, note: "extreme_saver" },
      },
    ],
  },

  // Grade 11: Laptop
  {
    id: "laptop_grade11",
    minAge: 16,
    maxAge: 17,
    title: "Laptop Required",
    prompt: "School requires a laptop. A good one costs $1,200.",
    options: [
      {
        id: "A",
        label: "Buy it with savings",
        detail: "You’re prepared for school.",
        effect: { bank: -1200, happiness: +5, hasLaptop: true, note: "prepared" },
        requirements: { minBank: 1200, lockedMessage: "You don’t have $1,200 saved." },
        // fallback: forced loan so you can still continue
        onFailEffect: { debt: +1200, happiness: -5, hasLaptop: true, creditScore: -5, note: "laptop_loan" },
      },
      {
        id: "B",
        label: "Don’t buy one",
        detail: "School becomes harder without a laptop.",
        effect: { happiness: -20, hasLaptop: false, note: "unprepared" },
      },
    ],
  },

  // Grade 12: University
  {
    id: "university_grade12",
    minAge: 17,
    maxAge: 18,
    title: "University Decision",
    prompt: "You got accepted into your favourite program! Tuition + living costs = $12,000/year.",
    options: [
      {
        id: "A",
        label: "Student loans (full)",
        detail: "Tuition covered. You graduate faster, but with debt.",
        effect: { debt: +12000, happiness: +0, education: "university", note: "full_loan" },
      },
      {
        id: "B",
        label: "Work part-time + smaller loan",
        detail: "Less debt, but more stress.",
        effect: { debt: +6000, happiness: -10, education: "university", note: "work_and_loan" },
      },
      {
        id: "C",
        label: "Skip university (for now)",
        detail: "Avoid debt. Keep working and earning $600/month.",
        effect: { bank: +600, happiness: -5, education: "highschool", note: "skip_uni" },
      },
    ],
  },

  // Age 18: Credit card intro (optional but recommended)
  {
    id: "credit_card_18",
    minAge: 18,
    maxAge: 18,
    title: "First Credit Card?",
    prompt: "A bank offers you a credit card with a $1,000 limit. Do you take it?",
    options: [
      {
        id: "A",
        label: "Yes—use it responsibly",
        detail: "Small purchases, pay it off monthly.",
        effect: { creditScore: +40, happiness: +5, note: "build_credit" },
      },
      {
        id: "B",
        label: "Yes—spend big",
        detail: "You buy lots of stuff now, but debt grows.",
        effect: { debt: +800, creditScore: -50, happiness: +15, note: "bad_credit_habits" },
      },
      {
        id: "C",
        label: "No—not ready",
        detail: "No debt, but you won’t build credit yet.",
        effect: { creditScore: +0, happiness: +0, note: "no_credit_history" },
      },
    ],
  },
];
