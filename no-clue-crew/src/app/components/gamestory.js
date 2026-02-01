const dataArray = {
  "success": true,
  "data": {
    "stories": [
      {
        "id": "1",
        "age": 14,
        "increaseAge": 1,
        "choiceA": "Save for 3 day Overnight School Trip – $500",
        "choiceB": "Spend on Games & Buy a Jellycat – $55",
        "resultA": "Monty gains Confidence Boost + Life Experience :D",
        "resultB": "Monty has Short-Term Fun!",
        "choiceAeffects": {"wealth": +1, "happiness": 20},
        "choiceBeffects": {"wealth": -55, "happiness": 30},
        "lesson":
          "Saving for experiences teaches that money can be used for meaningful goals, not just quick fun. Try setting aside a little money each week for something special you really care about."
      },
      {
        "id": "2",
        "age": 15,
        "increaseAge": 1,
        "choiceA": "Get a Part-Time Job After School and start saving up",
        "choiceB": "Focus Only on Free Time",
        "resultA": "Monty gains a Steady Income + Time Management Skills",
        "resultB": "Monty is Relaxed with No Savings",
        "choiceAeffects": {"wealth": +500, "happiness": -10},
        "choiceBeffects": {"wealth": 0, "happiness": 10},
        "lesson":
          "Balancing work and leisure is crucial. While earning money is important, so is enjoying your free time. Find a balance that works for you."
      },
      {
        "id": "3",
        "age": 16,
        "increaseAge": 1,
        "choiceA": "Save for a Used Car",
        "choiceB": "Buy the latest iphone and new trendy clothes",
        "resultA": "Monty became Independence",
        "resultB": "Monty's Style Upgraded; Empty Savings :O",
        "choiceAeffects": {"wealth": 500, "happiness": -5},
        "choiceBeffects": {"wealth": -1100, "happiness": 50},
        "lesson":
          "Saving for big needs shows the difference between wants and necessities. Planning ahead can give you independence without running out of money."
     
      },
      {
        "id": "4",
        "age": 17,
        "increaseAge": 1,
        "choiceA": "Apply for Scholarships & Budget for School",
        "choiceB": "Ignore Costs Until Later",
        "resultA": "Monty has Lower Future Debt",
        "resultB": "Monty is starting to have Financial Stress!",
        "choiceAeffects": {"wealth": 1500, "happiness": 20},
        "choiceBeffects": {"wealth": -500, "happiness": 10},
        "lesson":
          "Planning for education costs helps avoid money stress later. Applying early and making a budget can save you a lot in the future."
      
      },
      {
        "id": "5",
        "age": 18,
        "increaseAge": 4,
        "choiceA": "Choose Affordable Post-Secondary Path",
        "choiceB": "Choose Dream School Without Budgeting",
        "resultA": "Monty has Manageable Student Loans!",
        "resultB": "Monty has High Debt Pressure >~<",
        "choiceAeffects": {"wealth": 100, "happiness": 30},
        "choiceBeffects": {"wealth": -1000, "happiness": 30},
        "lesson":
          "Choosing affordable options helps keep debt under control. You can still chase your dreams while being smart about how much you borrow."
      
      },
      {
        "id": "6",
        "age": 22,
        "increaseAge": 5,
        "choiceA": "Start an Emergency Fund",
        "choiceB": "Spend Entire Paycheque",
        "resultA": "Monty has Financial Security :D",
        "resultB": "Monty is Living Paycheque to Paycheque :(",
        "choiceAeffects": {"wealth": 1500, "happiness": 15},
        "choiceBeffects": {"wealth": -3500, "happiness": 50},
        "lesson":
          "Building an emergency fund is essential for financial security. It helps you handle unexpected expenses without going into debt."
      },
      {
        "id": "7",
        "age": 27,
        "increaseAge": 3,
        "choiceA": "Start Investing Early",
        "choiceB": "Delay Investing",
        "resultA": "Compound Growth Advantage",
        "resultB": "Monty has Missed Growth Opportunities",
        "choiceAeffects": {"wealth": +500, "happiness": +10},
        "choiceBeffects": {"wealth": -500, "happiness": -10},
        "lesson":
          "Investing early allows your money to grow over time. The sooner you start, the more you can benefit from compound growth."
      },
      {
        "id": "8",
        "age": 30,
        "increaseAge": 5,
        "choiceA": "Budget for Housing & Lifestyle",
        "choiceB": "Overspend to look cool",
        "resultA": "Monty has Stable Finances!",
        "resultB": "Monty has Great Money Anxiety",
        "choiceAeffects": {"wealth": +11000, "happiness": 20},
        "choiceBeffects": {"wealth": -15000, "happiness": +40},
        "lesson":
          "Choosing affordable options helps keep debt under control. You can still chase your dreams while being smart about how much you borrow."
      
      },
      {
        "id": "9",
        "age": 35,
        "increaseAge": 7,
        "choiceA": "Increase Retirement Contributions",
        "choiceB": "Prioritize Luxuries",
        "resultA": "Montys Future is Comfortable :)",
        "resultB": "Monty has Retirement Delays...",
        "choiceAeffects": {"wealth": +500, "happiness": +10},
        "choiceBeffects": {"wealth": -500, "happiness": -10},
        "lesson":
          "Increasing retirement contributions early can lead to a more comfortable future. It's important to prioritize long-term savings over short-term luxuries."
      },
      {
        "id": "10",
        "age": 42,
        "increaseAge": 8,
        "choiceA": "Pay Off High-Interest Debt",
        "choiceB": "Minimum Payments Only",
        "resultA": "Monty gains Financial Freedom!!! :D",
        "resultB": "Montys Debt is Snowball :(",
        "choiceAeffects": {"wealth": +500, "happiness": +10},
        "choiceBeffects": {"wealth": -500, "happiness": -10},
        "lesson":
          "Paying off high-interest debt quickly can save you money in the long run. It's better to tackle debt aggressively than to make only minimum payments."
      },
      {
        "id": "11",
        "age": 50,
        "increaseAge": 11,
        "choiceA": "Downsize & Save Aggressively",
        "choiceB": "Maintain Expensive Lifestyle",
        "resultA": "Monty is ready to Retire",
        "resultB": "Monty has Delayed Retirement >~<",
        "choiceAeffects": {"wealth": +500, "happiness": +10},
        "choiceBeffects": {"wealth": -500, "happiness": -10},
        "lesson":
          "Downsizing and saving aggressively can provide financial security in retirement. It's important to live within your means and prioritize savings."
      },
      {
        "id": "12",
        "age": 61,
        "increaseAge": 6,
        "choiceA": "Finalize Retirement Plan",
        "choiceB": "Hope Things Work Out",
        "resultA": "Monty gains Peace of Mind",
        "resultB": "Monty has Uncertainty",
        "choiceAeffects": {"wealth":+500, "happiness": +10},
        "choiceBeffects": {"wealth": -500, "happiness": -10},
        "lesson":
          "Finalizing a retirement plan provides clarity and direction. It's essential to have a strategy in place rather than leaving things to chance."
      },
      {
        "id": "13",
        "age": 67,
        "increaseAge": 3,
        "choiceA": "Live Within Retirement Income",
        "choiceB": "Overspend Savings",
        "resultA": "Monty had Long-Term Stability",
        "resultB": "Monty is at Risk of Running Out",
        "choiceAeffects": {"wealth": +5000, "happiness": +10},
        "choiceBeffects": {"wealth": 500, "happiness": -10},
        "lesson":
          "Living within your means during retirement is crucial for long-term stability. It's important to budget and avoid overspending."
      },
      {
        "id": "14",
        "age": 70,
        "increaseAge": 12,
        "choiceA": "Plan Estate & Healthcare Costs",
        "choiceB": "Avoid Financial Planning",
        "resultA": "Family Security",
        "resultB": "Unexpected Burdens",
        "choiceAeffects": {"wealth": +5000, "happiness": +10},
        "choiceBeffects": {"wealth": -5000, "happiness": -10},
        "lesson":
          "Planning for estate and healthcare costs is essential to avoid burdening your family later. Proactive financial planning can ensure peace of mind."
      },
      {
        "id": "15",
        "age": 82,
        "increaseAge": 1,
        "choiceA": "Reflect on Smart Financial Choices",
        "choiceB": "Regret Missed Planning",
        "resultA": "Comfort & Legacy",
        "resultB": "Monty has Financial Stress Late in Life ><",
        "choiceAeffects": {"wealth": +5000, "happiness": +70},
        "choiceBeffects": {"wealth": -10000, "happiness": -70},
        "lesson":
          "Reflecting on your financial choices can provide valuable insights for the future. It's never too late to learn from past mistakes and make better decisions."
      }
    ]
  }
};

export default dataArray;