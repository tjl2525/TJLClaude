export interface ScenarioChoice {
  text: string;
  outcome: string;
  pointsAwarded: number;
  isOptimal: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  chapter: number;
  situation: {
    quarter: number;
    timeRemaining: string;
    down: number;
    distance: number;
    fieldPosition: string;
    yourScore: number;
    opponentScore: number;
    yourTimeouts: number;
    opponentTimeouts: number;
    receiving2ndHalf?: boolean;
    additionalContext?: string;
  };
  question: string;
  choices: ScenarioChoice[];
}

export const scenarios: Scenario[] = [
  // Beginner Scenarios
  {
    id: "s1",
    title: "Basic Two-Minute Drill",
    difficulty: "Beginner",
    chapter: 2,
    situation: {
      quarter: 4,
      timeRemaining: "1:55",
      down: 1,
      distance: 10,
      fieldPosition: "Own 25",
      yourScore: 17,
      opponentScore: 21,
      yourTimeouts: 3,
      opponentTimeouts: 1,
    },
    question:
      "You're down 4 with under 2 minutes. You have all 3 timeouts and the ball at your own 25. What is your strategic approach?",
    choices: [
      {
        text: "Go no-huddle, balanced attack. Save timeouts for the red zone.",
        outcome:
          "Excellent choice. With nearly 2 minutes and all 3 timeouts, you have plenty of time for a full drive. Saving timeouts for the red zone gives you maximum flexibility when it matters most.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Throw deep on every play to score quickly.",
        outcome:
          "Too aggressive. With 1:55 and 3 timeouts, you have time for a methodical drive. Deep throws are low-percentage and incompletions, while they stop the clock, waste valuable downs.",
        pointsAwarded: 3,
        isOptimal: false,
      },
      {
        text: "Use a timeout immediately to organize the team.",
        outcome:
          "Unnecessary. With 1:55 and the clock stopped on the change of possession, you should already have your two-minute offense rehearsed. Don't burn a timeout for organization - that's what practice is for.",
        pointsAwarded: 2,
        isOptimal: false,
      },
      {
        text: "Run the ball to establish balance and keep the defense honest.",
        outcome:
          "While keeping the defense honest is good, running the ball when trailing with under 2 minutes burns too much clock. Your timeouts are valuable but using them on run plays wastes their potential.",
        pointsAwarded: 4,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s2",
    title: "Protecting a 4th Quarter Lead",
    difficulty: "Beginner",
    chapter: 3,
    situation: {
      quarter: 4,
      timeRemaining: "5:30",
      down: 1,
      distance: 10,
      fieldPosition: "Own 35",
      yourScore: 24,
      opponentScore: 17,
      yourTimeouts: 2,
      opponentTimeouts: 3,
    },
    question:
      "You're up 7 with 5:30 left and the ball. The opponent has all 3 timeouts. What's your game plan?",
    choices: [
      {
        text: "Run the play clock down, mix runs and short passes, prioritize first downs to keep the drive alive.",
        outcome:
          "Perfect strategy. Running the play clock down maximizes time consumed. Mixing runs and passes prevents predictability while prioritizing first downs. Each first down burns ~2 minutes. Two first downs could effectively end the game.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Run the ball three times every series to burn clock.",
        outcome:
          "Too predictable. While running burns clock, the opponent will stack the box. If you go three-and-out, you've only used about 2 minutes and given the ball back with 3:30 left - still enough time for a comeback.",
        pointsAwarded: 5,
        isOptimal: false,
      },
      {
        text: "Continue with your normal aggressive offense to try to score again.",
        outcome:
          "With a 7-point lead and 5:30 left, you should shift to clock-management mode. Scoring quickly actually hurts you by giving the opponent more time. Focus on first downs and clock consumption.",
        pointsAwarded: 4,
        isOptimal: false,
      },
      {
        text: "Take a knee on every play to run out the clock.",
        outcome:
          "With 5:30 left, you can't kneel the game away. Even running the full play clock, three kneels only burns about 2 minutes. You'd give the ball back with over 3 minutes left - that's an eternity.",
        pointsAwarded: 1,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s3",
    title: "End of First Half Decision",
    difficulty: "Beginner",
    chapter: 4,
    situation: {
      quarter: 2,
      timeRemaining: "0:48",
      down: 1,
      distance: 10,
      fieldPosition: "Own 25",
      yourScore: 14,
      opponentScore: 10,
      yourTimeouts: 3,
      opponentTimeouts: 1,
      receiving2ndHalf: true,
    },
    question:
      "You're up 4 at the end of the first half. You have all 3 timeouts and receive the 2nd half kickoff. Do you try to score?",
    choices: [
      {
        text: "Go aggressive - this is a double-score opportunity. Attack with all 3 timeouts available.",
        outcome:
          "Exactly right! Receiving the 2nd half kickoff creates a double-score opportunity. With 0:48, all 3 timeouts, and getting the ball again after half, the reward far outweighs the risk. Even a field goal extends your lead significantly.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Kneel it out - protect the lead going into halftime.",
        outcome:
          "Too conservative. You're leaving points on the table. With 0:48, 3 timeouts, and getting the ball to start the second half, this is a prime scoring opportunity. The double-score potential makes aggression the right call.",
        pointsAwarded: 2,
        isOptimal: false,
      },
      {
        text: "Try one quick pass. If it's incomplete, kneel the rest.",
        outcome:
          "Half-measures don't work here. Either commit to a scoring drive or kneel. One pass with a plan to quit doesn't maximize your opportunity and could still result in a turnover.",
        pointsAwarded: 4,
        isOptimal: false,
      },
      {
        text: "Run the ball three times to burn clock safely.",
        outcome:
          "This wastes the end of half opportunity. Running burns clock but doesn't position you to score. With 3 timeouts and the 2nd half kickoff coming, you should be trying to add to your lead.",
        pointsAwarded: 2,
        isOptimal: false,
      },
    ],
  },

  // Intermediate Scenarios
  {
    id: "s4",
    title: "Timeout Dilemma in the Red Zone",
    difficulty: "Intermediate",
    chapter: 2,
    situation: {
      quarter: 4,
      timeRemaining: "0:38",
      down: 1,
      distance: 10,
      fieldPosition: "Opponent 18",
      yourScore: 20,
      opponentScore: 24,
      yourTimeouts: 1,
      opponentTimeouts: 0,
    },
    question:
      "You're down 4 in the red zone with 0:38 left and only 1 timeout. How do you manage the clock?",
    choices: [
      {
        text: "Take shots at the end zone. Save the timeout for the field goal operation if needed.",
        outcome:
          "Smart approach. With 0:38 and 1 timeout, you can run 2-3 plays. Take aggressive shots at the end zone - incomplete passes stop the clock. Keep your timeout in reserve for the FG unit if you need a field goal to tie (if applicable) or to set up a final play.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Use the timeout now to set up the perfect play.",
        outcome:
          "Don't waste your last timeout for play design. You should have end-zone plays ready. If you use it now and then have a completion in the middle of the field, you'll have no way to stop the clock for a FG attempt.",
        pointsAwarded: 3,
        isOptimal: false,
      },
      {
        text: "Spike the ball to stop the clock and regroup.",
        outcome:
          "The clock is already stopped (first down in final 2 minutes stops the clock in NCAA). Spiking would waste a precious down for no benefit. You need every play to score.",
        pointsAwarded: 1,
        isOptimal: false,
      },
      {
        text: "Run the ball to catch the defense off guard.",
        outcome:
          "Running the ball is risky here. If you're tackled inbounds, you'll have to burn your last timeout. That leaves you with no timeout for any remaining plays or field goal operation.",
        pointsAwarded: 4,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s5",
    title: "The Intentional Safety Decision",
    difficulty: "Intermediate",
    chapter: 5,
    situation: {
      quarter: 4,
      timeRemaining: "0:22",
      down: 3,
      distance: 8,
      fieldPosition: "Own 2",
      yourScore: 20,
      opponentScore: 17,
      yourTimeouts: 0,
      opponentTimeouts: 0,
    },
    question:
      "You're up 3, pinned at your own 2-yard line, 0:22 left, 3rd and 8. Neither team has timeouts. What do you do?",
    choices: [
      {
        text: "Take an intentional safety. Run clock to 2-3 seconds, then free kick from the 20.",
        outcome:
          "Brilliant call. You give up 2 points (still lead 20-19), but the clock runs down to 2-3 seconds. Your free kick from the 20 means the opponent must return the kick and score from distance with almost no time. This virtually guarantees the win.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Punt from the end zone to flip field position.",
        outcome:
          "Risky. A punt from your own 2 could be blocked for a touchdown, or a short punt gives the opponent the ball around midfield with 15+ seconds - potentially in field goal range. The intentional safety is the safer play.",
        pointsAwarded: 5,
        isOptimal: false,
      },
      {
        text: "Try to convert the 3rd and 8 with a pass.",
        outcome:
          "Very risky at your own 2. An interception is a likely touchdown. A sack in the end zone is a safety anyway but without the clock benefit. A completion that doesn't get the first down leaves you with 4th down and even less time to manage.",
        pointsAwarded: 3,
        isOptimal: false,
      },
      {
        text: "Run the ball up the middle and hope for a first down.",
        outcome:
          "3rd and 8 from your own 2 is extremely unlikely to convert on a run. If you're stopped short, you face 4th down with even less time. The intentional safety gives you more control over the outcome.",
        pointsAwarded: 2,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s6",
    title: "Fourth Down Clock Decision",
    difficulty: "Intermediate",
    chapter: 3,
    situation: {
      quarter: 4,
      timeRemaining: "3:15",
      down: 4,
      distance: 1,
      fieldPosition: "Opponent 42",
      yourScore: 28,
      opponentScore: 21,
      yourTimeouts: 1,
      opponentTimeouts: 2,
    },
    question:
      "You're up 7 with 3:15 left. It's 4th and 1 at the opponent's 42. The opponent has 2 timeouts. Do you go for it or punt?",
    choices: [
      {
        text: "Go for it. Converting keeps the clock running and could end the game.",
        outcome:
          "Strong choice. A conversion gives you a first down and continues the drive. With the opponent's 2 timeouts, they can stop the clock, but another first down or two seals the game. The risk of turning it over at the 42 is acceptable when a conversion effectively wins.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Punt to pin them deep and rely on your defense.",
        outcome:
          "A reasonable but suboptimal choice. Punting gives the ball back with ~3:00 and 2 timeouts from their own territory. That's enough time for a full scoring drive. Converting the 4th and 1 is the higher-percentage play to end the game.",
        pointsAwarded: 6,
        isOptimal: false,
      },
      {
        text: "Attempt a 59-yard field goal.",
        outcome:
          "A 59-yard field goal is extremely low percentage in college football. A miss gives the opponent the ball at their own 42 with 3:15 - better field position than if you'd punted. This is the worst of all options.",
        pointsAwarded: 1,
        isOptimal: false,
      },
      {
        text: "Call timeout to think it over.",
        outcome:
          "With only 1 timeout, don't waste it on indecision. You should know your 4th-and-short philosophy coming into the game. Burning the timeout here means you have none left if the opponent gets the ball back.",
        pointsAwarded: 3,
        isOptimal: false,
      },
    ],
  },

  // Advanced Scenarios
  {
    id: "s7",
    title: "Goal Line Clock Dilemma",
    difficulty: "Advanced",
    chapter: 5,
    situation: {
      quarter: 4,
      timeRemaining: "1:45",
      down: 1,
      distance: 3,
      fieldPosition: "Opponent 3",
      yourScore: 31,
      opponentScore: 28,
      yourTimeouts: 2,
      opponentTimeouts: 1,
      additionalContext:
        "You have a powerful short-yardage offense. Opponent has a strong passing attack.",
    },
    question:
      "You're up 3 at the opponent's 3-yard line with 1:45 left. Scoring makes it a 10-point game, but gives them the ball back. How do you manage this?",
    choices: [
      {
        text: "Run the play clock down on each play, try to score on 3rd or 4th down to minimize time left.",
        outcome:
          "Outstanding clock management. Running the play clock down on each play burns ~40 seconds per play. Over 3-4 plays, you consume most of the remaining time before scoring. Even if they get the ball back, there's minimal time for two scores (TD + FG/TD).",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Score immediately on the first play to go up 10.",
        outcome:
          "Going up 10 feels safe, but scoring immediately leaves ~1:40 on the clock. The opponent's strong passing attack could score quickly with a timeout, then an onside kick and another score. Burning clock first is smarter.",
        pointsAwarded: 4,
        isOptimal: false,
      },
      {
        text: "Kneel three times then kick a field goal.",
        outcome:
          "Kneeling from the 3-yard line three times loses yardage, pushing you back to around the 6-7. While it burns clock, a field goal only puts you up 6 instead of potentially up 10 with a TD. This leaves them needing only a TD to win instead of needing two scores.",
        pointsAwarded: 5,
        isOptimal: false,
      },
      {
        text: "Take delay of game penalties to burn extra time.",
        outcome:
          "In the final minute, delay of game triggers a 10-second runoff. But you're at 1:45, not the final minute. Delay of game penalties push you back 5 yards each time, making scoring harder without the runoff benefit.",
        pointsAwarded: 2,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s8",
    title: "The Double-Score Calculation",
    difficulty: "Advanced",
    chapter: 4,
    situation: {
      quarter: 2,
      timeRemaining: "1:20",
      down: 1,
      distance: 10,
      fieldPosition: "Midfield",
      yourScore: 7,
      opponentScore: 14,
      yourTimeouts: 2,
      opponentTimeouts: 0,
      receiving2ndHalf: true,
      additionalContext:
        "Your offense has been struggling. Opponent's offense is explosive.",
    },
    question:
      "Down 7, ball at midfield, 1:20 left in the half. You receive the 2nd half kick. Your offense has been struggling. What's the call?",
    choices: [
      {
        text: "Go for it with conservative attacks - use short, high-percentage passes to get in FG range.",
        outcome:
          "Best approach given the context. Even though your offense is struggling, the midfield position and 2 timeouts give you a realistic chance at a field goal. Conservative, high-percentage plays minimize turnover risk while still attacking. The FG cuts it to 4, then you get the ball to start the 2nd half.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Go fully aggressive - take deep shots to score a touchdown before half.",
        outcome:
          "Your offense has been struggling - forcing deep shots is likely to result in incompletions or turnovers. With the opponent having no timeouts, a turnover won't cost you points, but wasted downs are opportunities lost. Controlled aggression is better than desperation.",
        pointsAwarded: 5,
        isOptimal: false,
      },
      {
        text: "Kneel it out. Your offense is struggling and you don't want to give the explosive opponent any chance.",
        outcome:
          "Too conservative. You're down 7 and need to score. The opponent has 0 timeouts and you're at midfield with 2 TOs - even if your offense struggles, a field goal attempt from this field position is worth the risk. You're also getting the ball back after half.",
        pointsAwarded: 3,
        isOptimal: false,
      },
      {
        text: "Run the ball three times to see if you can pick up a first down, then reassess.",
        outcome:
          "Running three times from midfield burns too much clock when you're trailing by 7. Even with timeouts, you'd likely consume most of the remaining time on runs without gaining enough to matter. Pass-first approach is needed here.",
        pointsAwarded: 3,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s9",
    title: "10-Second Runoff Crisis",
    difficulty: "Advanced",
    chapter: 9,
    situation: {
      quarter: 4,
      timeRemaining: "0:42",
      down: 2,
      distance: 7,
      fieldPosition: "Opponent 28",
      yourScore: 21,
      opponentScore: 24,
      yourTimeouts: 1,
      opponentTimeouts: 0,
      additionalContext:
        "Your kicker is reliable from 45 yards. You need to be at the opponent's 28 or closer for a comfortable FG.",
    },
    question:
      "Down 3 with 0:42 left. You're at the opponent's 28 (FG range). Your left tackle just false started. The officials will enforce a 10-second runoff unless you use your timeout. What do you do?",
    choices: [
      {
        text: "Use your timeout to avoid the 10-second runoff. You'll have 0:42 but no timeouts.",
        outcome:
          "Correct call. Using the timeout preserves all 42 seconds. The false start moves you to the 33, but you're still in FG range. With 0:42 and no timeouts, you can still run 1-2 plays (incomplete passes stop the clock in final 2 minutes) or kick the FG from 50 yards. Having 42 seconds is worth more than the timeout.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Accept the 10-second runoff. Save the timeout for later.",
        outcome:
          "Losing 10 seconds puts you at 0:32 with the penalty pushing you to the 33. But you keep your timeout. The problem: what's the timeout for? You're already in FG range. The extra 10 seconds gives you an additional play opportunity, which could be the difference.",
        pointsAwarded: 6,
        isOptimal: false,
      },
      {
        text: "Kick the field goal right now from 45 yards.",
        outcome:
          "You can't kick the field goal 'right now' - the false start penalty must be enforced first, moving you to the 33. After that, a 50-yard FG is less reliable. You should use the timeout, then consider whether to try gaining yards back or kick from 50.",
        pointsAwarded: 2,
        isOptimal: false,
      },
      {
        text: "Decline the penalty somehow.",
        outcome:
          "You cannot decline a penalty on your own team. The false start is enforced automatically. Your only choice is whether to use a timeout to avoid the 10-second runoff.",
        pointsAwarded: 0,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s10",
    title: "Late Game Defensive Strategy",
    difficulty: "Advanced",
    chapter: 8,
    situation: {
      quarter: 4,
      timeRemaining: "2:30",
      down: 1,
      distance: 10,
      fieldPosition: "Opponent's ball at their 35",
      yourScore: 27,
      opponentScore: 21,
      yourTimeouts: 2,
      opponentTimeouts: 3,
      additionalContext:
        "Opponent has a top-5 passing attack. Your defense has been solid but their QB is on fire today.",
    },
    question:
      "Up 6, opponent has ball at their 35 with 2:30 left and all 3 timeouts. Their QB is playing lights-out. How do you manage your defensive timeouts?",
    choices: [
      {
        text: "Save your timeouts. If they score quickly, you'll need them to drive for a response score.",
        outcome:
          "Smart thinking. With their 3 timeouts and a hot QB, they likely have time to score regardless. Saving your 2 timeouts means if they score a TD to go up 1 (28-27), you'd have ~1:00-1:30 and 2 timeouts to drive for a FG. This gives you a response option.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Use timeouts aggressively to get the ball back sooner after stops.",
        outcome:
          "This sounds logical but backfires. Using your timeouts on defense helps you get the ball back... but if they score anyway, you'll have no timeouts for your own drive. With a hot QB and 3 of their own timeouts, they don't need the help.",
        pointsAwarded: 4,
        isOptimal: false,
      },
      {
        text: "Use one timeout if they get past midfield, save one for your drive.",
        outcome:
          "A compromise approach, but not optimal. One timeout for your own drive is tight, especially since you may need to go 60+ yards. The real value is preserving both timeouts for your potential game-winning drive.",
        pointsAwarded: 6,
        isOptimal: false,
      },
      {
        text: "Call timeout before their first play to set up your defense perfectly.",
        outcome:
          "Burning a timeout before the first play is wasteful. You should have your defensive alignment ready. This leaves you with only 1 timeout for a potential game-winning drive if they score.",
        pointsAwarded: 2,
        isOptimal: false,
      },
    ],
  },
  {
    id: "s11",
    title: "Free Points or Field Position?",
    difficulty: "Intermediate",
    chapter: 7,
    situation: {
      quarter: 4,
      timeRemaining: "4:00",
      down: 4,
      distance: 3,
      fieldPosition: "Opponent 36",
      yourScore: 17,
      opponentScore: 14,
      yourTimeouts: 1,
      opponentTimeouts: 2,
      additionalContext:
        "Your kicker has made 3/3 field goals today, including a 47-yarder. Your defense has been dominant all game.",
    },
    question:
      "Up 3 with 4:00 left at the opponent's 36 on 4th and 3. Your kicker is hot. Your defense is dominant. What's the play?",
    choices: [
      {
        text: "Kick the 53-yard field goal. Your kicker is on fire and 6 points is much harder to overcome than 3.",
        outcome:
          "Good reasoning. Your kicker hit from 47, and a 53-yarder is within range for a hot kicker. Making it puts you up 6 (two scores). The risk is a miss giving them the ball at their 43, but your dominant defense mitigates that risk. A strong analytical choice.",
        pointsAwarded: 8,
        isOptimal: false,
      },
      {
        text: "Go for the first down. Converting keeps the ball and can run more clock.",
        outcome:
          "The most aggressive option. Converting runs significant clock and could lead to a TD. But failing gives the opponent the ball at their 36 with 4:00 - a manageable scoring position. With your dominant defense, this is reasonable but the field goal is a better risk/reward.",
        pointsAwarded: 7,
        isOptimal: false,
      },
      {
        text: "Punt and pin them deep. Trust your dominant defense to get a stop.",
        outcome:
          "With a dominant defense, this maximizes field position advantage. Pinning them inside their 10 with 4:00 left makes their scoring drive much harder. Even if they drive, they'll consume significant clock. But you miss a chance to extend to a 2-score lead.",
        pointsAwarded: 6,
        isOptimal: false,
      },
      {
        text: "Kick the field goal. Going up 6 forces the opponent to score a TD, and the time consumed by the FG operation helps too.",
        outcome:
          "Best decision. Going up 6 means the opponent MUST score a touchdown - a field goal only ties. Combined with your dominant defense, this dramatically increases your win probability. The 53-yard attempt from a hot kicker is a high-percentage play.",
        pointsAwarded: 10,
        isOptimal: true,
      },
    ],
  },
  {
    id: "s12",
    title: "Tempo Trap",
    difficulty: "Advanced",
    chapter: 6,
    situation: {
      quarter: 4,
      timeRemaining: "6:45",
      down: 1,
      distance: 10,
      fieldPosition: "Own 20",
      yourScore: 35,
      opponentScore: 28,
      yourTimeouts: 3,
      opponentTimeouts: 3,
      additionalContext:
        "Your quarterback just threw a pick-6 on the previous possession, cutting your lead from 14 to 7. The crowd is energized for the opponent. Your QB looks rattled.",
    },
    question:
      "Up 7 but momentum has completely shifted after a pick-6. 6:45 left, both teams have 3 timeouts. Your QB is rattled. How do you approach this possession?",
    choices: [
      {
        text: "Slow tempo, run-heavy, rebuild QB confidence with short passes. Use play clock fully.",
        outcome:
          "Best approach. Slowing the tempo settles your rattled QB and disrupts the opponent's momentum. Running the ball keeps the clock moving and avoids putting your QB in difficult situations. Short, high-percentage passes on early downs rebuild confidence. Using the full play clock kills time while your team regains composure.",
        pointsAwarded: 10,
        isOptimal: true,
      },
      {
        text: "Go no-huddle aggressive to take back momentum with a quick score.",
        outcome:
          "Dangerous with a rattled QB. Going fast when your QB is shaken increases turnover risk. Another turnover could tie or lose the game. Your QB needs time to settle, not pressure to perform at a higher tempo.",
        pointsAwarded: 3,
        isOptimal: false,
      },
      {
        text: "Replace the QB with the backup for this drive.",
        outcome:
          "An extreme reaction. Unless your backup is proven in pressure situations, inserting a cold quarterback in a 7-point game with 6:45 left is very risky. Better to settle your starter with manageable plays than gamble on an untested backup.",
        pointsAwarded: 2,
        isOptimal: false,
      },
      {
        text: "Run the ball every single play - don't let the QB touch it.",
        outcome:
          "Too predictable. The opponent will stack the box and force three-and-outs. You need to convert at least one first down to burn meaningful clock. Mix in safe, short passes to keep the defense honest while being run-heavy.",
        pointsAwarded: 5,
        isOptimal: false,
      },
    ],
  },
];

export function getScenariosByDifficulty(
  difficulty: Scenario["difficulty"]
): Scenario[] {
  return scenarios.filter((s) => s.difficulty === difficulty);
}

export function getScenariosByChapter(chapter: number): Scenario[] {
  return scenarios.filter((s) => s.chapter === chapter);
}
