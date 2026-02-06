export interface QuizQuestion {
  id: string;
  chapter: number;
  chapterTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const chapters = [
  { number: 1, title: "Clock Management Fundamentals" },
  { number: 2, title: "Two-Minute Offense Strategy" },
  { number: 3, title: "Protecting a Lead" },
  { number: 4, title: "End of Half Clock Management" },
  { number: 5, title: "Advanced Situational Tactics" },
  { number: 6, title: "Communication Systems and Practice" },
  { number: 7, title: "Special Teams and Clock Strategy" },
  { number: 8, title: "Game-Winning Scenario Playbook" },
  { number: 9, title: "NCAA Clock Rules - Critical Details" },
  { number: 10, title: "Analytics and Clock Management" },
];

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Clock Management Fundamentals
  {
    id: "1-1",
    chapter: 1,
    chapterTitle: "Clock Management Fundamentals",
    question:
      "In NCAA football, when does the clock stop on first downs during the game?",
    options: [
      "On every first down throughout the entire game",
      "Only in the final two minutes of each half",
      "Only in the fourth quarter",
      "The clock never stops on first downs in college football",
    ],
    correctIndex: 1,
    explanation:
      "In NCAA football, the clock stops on first downs only in the final two minutes of each half. This is a key difference from other levels of football.",
  },
  {
    id: "1-2",
    chapter: 1,
    chapterTitle: "Clock Management Fundamentals",
    question:
      "How many timeouts does each team receive per half in NCAA football?",
    options: ["Two", "Three", "Four", "Five"],
    correctIndex: 1,
    explanation:
      "Each team receives three timeouts per half in NCAA football. Managing these timeouts is critical to effective clock management.",
  },
  {
    id: "1-3",
    chapter: 1,
    chapterTitle: "Clock Management Fundamentals",
    question:
      "After most plays, the play clock is set to how many seconds in NCAA football?",
    options: ["25 seconds", "30 seconds", "35 seconds", "40 seconds"],
    correctIndex: 3,
    explanation:
      "The play clock is set to 40 seconds after most plays and 25 seconds after administrative stoppages.",
  },
  {
    id: "1-4",
    chapter: 1,
    chapterTitle: "Clock Management Fundamentals",
    question:
      "When your team has a lead late in the game, how should you view time?",
    options: [
      "Time is irrelevant - focus on scoring",
      "Time is your most valuable asset - preserve it",
      "Time should be used to take risks and extend the lead",
      "Time management only matters in the final minute",
    ],
    correctIndex: 1,
    explanation:
      "With a lead late in the game, time is your most valuable asset. Every second that ticks off the clock brings you closer to victory.",
  },
  {
    id: "1-5",
    chapter: 1,
    chapterTitle: "Clock Management Fundamentals",
    question:
      "Which of the following is a common clock management error at the college level?",
    options: [
      "Using timeouts to stop the clock when trailing",
      "Wasting timeouts early when trailing, leaving none for the final drive",
      "Running the ball when protecting a lead",
      "Spiking the ball to stop the clock in the final minute",
    ],
    correctIndex: 1,
    explanation:
      "Wasting timeouts early when trailing is one of the most common clock management errors. Coaches must preserve timeouts for critical late-game situations.",
  },
  {
    id: "1-6",
    chapter: 1,
    chapterTitle: "Clock Management Fundamentals",
    question:
      "When do 10-second runoff rules apply in NCAA football?",
    options: [
      "In the final two minutes of any half",
      "In the final minute when the offense commits certain penalties",
      "Whenever a team calls a timeout",
      "Only in overtime situations",
    ],
    correctIndex: 1,
    explanation:
      "10-second runoff rules apply in the final minute of each half when the offense commits certain penalties such as false start, illegal formation, or delay of game.",
  },

  // Chapter 2: Two-Minute Offense Strategy
  {
    id: "2-1",
    chapter: 2,
    chapterTitle: "Two-Minute Offense Strategy",
    question:
      "What should the QB know before every snap in a two-minute drill?",
    options: [
      "Only the play call",
      "Game time, down and distance, and timeout situation",
      "Only the score differential",
      "Only the defensive formation",
    ],
    correctIndex: 1,
    explanation:
      "The QB must know game time, down and distance, and timeout situation before every snap. This awareness drives every decision in the two-minute drill.",
  },
  {
    id: "2-2",
    chapter: 2,
    chapterTitle: "Two-Minute Offense Strategy",
    question:
      "Why should you save at least one timeout for the final 30 seconds of a two-minute drill?",
    options: [
      "To challenge a play",
      "To substitute players",
      "To stop clock after incompletion or give time for field goal team",
      "Timeouts are not that important in the final 30 seconds",
    ],
    correctIndex: 2,
    explanation:
      "Saving at least one timeout for the final 30 seconds ensures you can stop the clock after a play or give the field goal team time to set up.",
  },
  {
    id: "2-3",
    chapter: 2,
    chapterTitle: "Two-Minute Offense Strategy",
    question:
      "What is the downside of spiking the ball to stop the clock?",
    options: [
      "It results in a 5-yard penalty",
      "It wastes a down",
      "The clock actually continues to run",
      "It requires a timeout",
    ],
    correctIndex: 1,
    explanation:
      "Spiking the ball should only be done when absolutely necessary because it wastes a down. That's one fewer opportunity to gain yards or score.",
  },
  {
    id: "2-4",
    chapter: 2,
    chapterTitle: "Two-Minute Offense Strategy",
    question:
      "With 2:00-1:30 remaining, 3 timeouts, and the ball at your own 25, what is the recommended strategy?",
    options: [
      "Throw deep on every play",
      "Run the ball to control the clock",
      "Balanced attack, save timeouts for red zone",
      "Spike the ball immediately",
    ],
    correctIndex: 2,
    explanation:
      "With ample time and all three timeouts, a balanced attack is best. Save your timeouts for the red zone where you'll need them most.",
  },
  {
    id: "2-5",
    chapter: 2,
    chapterTitle: "Two-Minute Offense Strategy",
    question:
      "Why are sideline passes particularly valuable in a two-minute drill?",
    options: [
      "They are easier throws for the quarterback",
      "Incomplete stops clock; complete usually stops clock via out of bounds",
      "Defensive backs cannot cover sideline routes",
      "They always result in first downs",
    ],
    correctIndex: 1,
    explanation:
      "Sideline passes offer a dual benefit: an incompletion stops the clock, and a completion near the sideline often results in the receiver getting out of bounds, also stopping the clock.",
  },
  {
    id: "2-6",
    chapter: 2,
    chapterTitle: "Two-Minute Offense Strategy",
    question:
      "With 0:45-0:20 left and 1-2 timeouts in the red zone, what is the recommended approach?",
    options: [
      "Run the ball to use clock",
      "Take shots at the end zone, preserve 1 timeout for field goal",
      "Spike the ball on every play",
      "Call timeout before every snap",
    ],
    correctIndex: 1,
    explanation:
      "In the red zone with limited time, take shots at the end zone while preserving at least one timeout for the field goal operation if needed.",
  },

  // Chapter 3: Protecting a Lead
  {
    id: "3-1",
    chapter: 3,
    chapterTitle: "Protecting a Lead",
    question:
      "When protecting a lead in the fourth quarter, how much time should you run off the play clock before each snap?",
    options: [
      "Snap immediately to catch the defense off guard",
      "Run it down to about 20 seconds",
      "Run it down to 1-2 seconds before every snap",
      "Use the full 40 seconds and take delay of game penalties",
    ],
    correctIndex: 2,
    explanation:
      "Run the play clock down to 1-2 seconds before every snap. This maximizes the time elapsed per play without taking a delay of game penalty.",
  },
  {
    id: "3-2",
    chapter: 3,
    chapterTitle: "Protecting a Lead",
    question:
      "Approximately how much time can each first down allow you to consume?",
    options: [
      "About 30 seconds",
      "About 60 seconds",
      "About 120 seconds (three plays at 40 seconds each)",
      "About 180 seconds",
    ],
    correctIndex: 2,
    explanation:
      "Each first down allows approximately 120 seconds to be run off the clock - three plays with the play clock running down to near zero each time.",
  },
  {
    id: "3-3",
    chapter: 3,
    chapterTitle: "Protecting a Lead",
    question:
      "What does NOT exist in college football that affects late-game clock management differently than the NFL?",
    options: [
      "Three timeouts per half",
      "The two-minute warning",
      "40-second play clock",
      "Overtime rules",
    ],
    correctIndex: 1,
    explanation:
      "The two-minute warning does not exist in college football. This means the game flows differently than the NFL, and coaches must account for the continuous clock.",
  },
  {
    id: "3-4",
    chapter: 3,
    chapterTitle: "Protecting a Lead",
    question:
      "When should you NOT be conservative with clock management despite having a lead?",
    options: [
      "When winning by 30 points",
      "When the lead is one score or less - scoring again may be more valuable",
      "When it's the first quarter",
      "When you have all three timeouts",
    ],
    correctIndex: 1,
    explanation:
      "If the lead is one score or less, scoring again may be more valuable than clock manipulation. Being too conservative could let the opponent back in the game.",
  },
  {
    id: "3-5",
    chapter: 3,
    chapterTitle: "Protecting a Lead",
    question:
      "A sustained drive with 2-3 first downs can consume approximately how much time?",
    options: [
      "1-2 minutes",
      "2-3 minutes",
      "4-6 minutes",
      "8-10 minutes",
    ],
    correctIndex: 2,
    explanation:
      "A sustained drive with 2-3 first downs can consume 4-6 minutes of game time, which is devastating for a trailing opponent's comeback hopes.",
  },
  {
    id: "3-6",
    chapter: 3,
    chapterTitle: "Protecting a Lead",
    question:
      "With a 6+ minute lead in the 4th quarter on 4th and short, what should you consider?",
    options: [
      "Always punt - protect field position",
      "Going for it to keep possession and continue running clock",
      "Attempt a field goal regardless of field position",
      "Call timeout to discuss",
    ],
    correctIndex: 1,
    explanation:
      "With a 6+ minute lead in the 4th quarter, consider going for it on 4th and short to maintain possession and continue consuming clock.",
  },

  // Chapter 4: End of Half Clock Management
  {
    id: "4-1",
    chapter: 4,
    chapterTitle: "End of Half Clock Management",
    question:
      "How does receiving the second half kickoff affect your end-of-first-half strategy?",
    options: [
      "It doesn't affect strategy at all",
      "You should be more conservative before halftime",
      "You should be more aggressive - chance for a double-score opportunity",
      "You should always kneel out the half",
    ],
    correctIndex: 2,
    explanation:
      "Receiving the second half kickoff means you can potentially score before and after halftime, creating a double-score opportunity. This makes aggressive play before halftime more valuable.",
  },
  {
    id: "4-2",
    chapter: 4,
    chapterTitle: "End of Half Clock Management",
    question:
      "With 0:45, own 25, 3 timeouts, and receiving 2nd half kick, what should you do?",
    options: [
      "Kneel out the half",
      "Go with full aggression for double-score opportunity",
      "Run conservative plays only",
      "Try one deep pass then kneel",
    ],
    correctIndex: 1,
    explanation:
      "With 0:45, your own 25, all 3 timeouts, and receiving the 2nd half kick, you should go with full aggression. This is a prime double-score opportunity.",
  },
  {
    id: "4-3",
    chapter: 4,
    chapterTitle: "End of Half Clock Management",
    question:
      "With 0:35, own 20, 1 timeout, and kicking off to start the 2nd half, what is recommended?",
    options: [
      "Go with aggressive passing",
      "Try a screen pass and see what happens",
      "Kneel and run out the half",
      "Throw a Hail Mary",
    ],
    correctIndex: 2,
    explanation:
      "With limited time, only one timeout, deep in your own territory, and kicking off after half (opponent gets ball), the risk of turnover outweighs the potential reward. Kneel it out.",
  },
  {
    id: "4-4",
    chapter: 4,
    chapterTitle: "End of Half Clock Management",
    question:
      "What should you NEVER do when managing the end of the first half with a lead?",
    options: [
      "Use timeouts strategically",
      "Give the ball back with time for the opponent to score",
      "Run safe possession plays",
      "Take a knee if time is short",
    ],
    correctIndex: 1,
    explanation:
      "Never give the ball back with time for the opponent to score unless you're badly trailing. Turnovers or failed drives that leave time can give the opponent free points.",
  },
  {
    id: "4-5",
    chapter: 4,
    chapterTitle: "End of Half Clock Management",
    question:
      "On defense at the end of a half, what is the priority order for preventing scores?",
    options: [
      "Prevent field goals first, then touchdowns",
      "Prevent touchdowns first, then field goals",
      "Focus only on interceptions",
      "Blitz every play to force turnovers",
    ],
    correctIndex: 1,
    explanation:
      "On defense, prevent touchdowns first, then field goals. Understanding the opponent's kicker range helps determine how aggressively to play based on field position.",
  },

  // Chapter 5: Advanced Situational Tactics
  {
    id: "5-1",
    chapter: 5,
    chapterTitle: "Advanced Situational Tactics",
    question:
      "When is an intentional safety a strategically sound decision?",
    options: [
      "Whenever you're winning by any margin",
      "Leading by 3-5 points, pinned deep, under 30 seconds, opponent has no timeouts",
      "Anytime in the fourth quarter",
      "Only when losing",
    ],
    correctIndex: 1,
    explanation:
      "The intentional safety is effective when leading by 3-5 points, pinned deep in your territory, under 30 seconds remain, and the opponent has no timeouts. You give up 2 points but virtually guarantee victory.",
  },
  {
    id: "5-2",
    chapter: 5,
    chapterTitle: "Advanced Situational Tactics",
    question:
      "After taking an intentional safety, what happens?",
    options: [
      "The opponent gets the ball at your 20",
      "You punt from your end zone",
      "You give a free kick from your 20-yard line",
      "The opponent gets the ball at midfield",
    ],
    correctIndex: 2,
    explanation:
      "After a safety, the team that gave up the safety kicks a free kick from their own 20-yard line. With 2-3 seconds left and no timeouts for the opponent, returning this for a score is nearly impossible.",
  },
  {
    id: "5-3",
    chapter: 5,
    chapterTitle: "Advanced Situational Tactics",
    question:
      "When the opponent is out of timeouts, what strategy should you employ?",
    options: [
      "Throw deep passes",
      "Run to the middle of the field, substitute freely, use motion to eat clock",
      "Call your own timeouts",
      "Play the same as if they had timeouts",
    ],
    correctIndex: 1,
    explanation:
      "When the opponent is out of timeouts, run to the middle of the field to force them to burn time getting set, substitute freely since they can't match without burning plays, and use motion to cause confusion.",
  },
  {
    id: "5-4",
    chapter: 5,
    chapterTitle: "Advanced Situational Tactics",
    question:
      "When protecting a lead inside the opponent's 5-yard line late in the game, what should you consider?",
    options: [
      "Score as quickly as possible",
      "Scoring too quickly gives the opponent time - run play clock down and score on final play if possible",
      "Kick a field goal immediately",
      "Take a knee",
    ],
    correctIndex: 1,
    explanation:
      "At the goal line with a lead, scoring too quickly gives the opponent time for a comeback. Consider running the play clock down on all four downs and scoring on the final play if possible.",
  },
  {
    id: "5-5",
    chapter: 5,
    chapterTitle: "Advanced Situational Tactics",
    question:
      "What should you be aware of when deliberately slowing down play between downs on defense?",
    options: [
      "There are no rules about pace of play",
      "Unsportsmanlike conduct penalties - refs watch this closely",
      "The play clock doesn't apply to defense",
      "You can take as long as you want between plays",
    ],
    correctIndex: 1,
    explanation:
      "When getting off the field slowly between plays on defense, be aware that officials watch closely for unsportsmanlike conduct. There's a fine line between smart play and a penalty.",
  },
  {
    id: "5-6",
    chapter: 5,
    chapterTitle: "Advanced Situational Tactics",
    question:
      "After administrative stoppages, the play clock is set to how many seconds?",
    options: [
      "40 seconds",
      "35 seconds",
      "30 seconds",
      "25 seconds",
    ],
    correctIndex: 3,
    explanation:
      "The play clock resets to 25 seconds after penalties, timeouts, and administrative stoppages, compared to 40 seconds after most regular plays.",
  },

  // Chapter 6: Communication Systems and Practice
  {
    id: "6-1",
    chapter: 6,
    chapterTitle: "Communication Systems and Practice",
    question:
      "Who should be the designated decision-maker for clock management on the sideline?",
    options: [
      "The team captain",
      "The quarterback coach",
      "Typically the offensive coordinator or head coach",
      "The special teams coordinator",
    ],
    correctIndex: 2,
    explanation:
      "One coach should be designated for clock decisions - typically the offensive coordinator or head coach. Clear chain of command prevents confusion and wasted timeouts.",
  },
  {
    id: "6-2",
    chapter: 6,
    chapterTitle: "Communication Systems and Practice",
    question:
      "What is the recommended primary method of sideline communication in loud environments?",
    options: [
      "Verbal calls from the sideline",
      "Visual signals",
      "Radio communication",
      "Written play cards",
    ],
    correctIndex: 1,
    explanation:
      "Visual signals should be the primary communication method, especially in loud environments. Practice communication with hand signals for timeout, spike, tempo up, and tempo down.",
  },
  {
    id: "6-3",
    chapter: 6,
    chapterTitle: "Communication Systems and Practice",
    question:
      "When should two-minute offense situations be practiced during the week?",
    options: [
      "Only on game day",
      "Only on Friday walkthroughs",
      "Tuesday: install, Wednesday: four-minute, Thursday: end-of-half, Friday: walkthrough",
      "There's no need to practice clock management specifically",
    ],
    correctIndex: 2,
    explanation:
      "Clock management should be practiced throughout the week: Tuesday for two-minute offense, Wednesday for four-minute offense (protecting lead), Thursday for end-of-half situations, and Friday for opponent-specific walkthroughs.",
  },
  {
    id: "6-4",
    chapter: 6,
    chapterTitle: "Communication Systems and Practice",
    question:
      "What should be included on a coach's laminated clock management cheat sheet?",
    options: [
      "Only the team's depth chart",
      "Time per first down, FG ranges, timeout decision references, and runoff scenarios",
      "Only the play sheet",
      "Only the opponent's roster",
    ],
    correctIndex: 1,
    explanation:
      "A clock management cheat sheet should include: time required per first down (~2:00), opponent's and your FG ranges, timeout decision quick references by quarter and score, and 10-second runoff scenarios.",
  },
  {
    id: "6-5",
    chapter: 6,
    chapterTitle: "Communication Systems and Practice",
    question:
      "What should you study about opponents regarding clock management on film?",
    options: [
      "Only their offensive formations",
      "How they handle two-minute situations, timeout tendencies, hurry-up effectiveness, and their clock management mistakes",
      "Only their special teams plays",
      "Only their defensive schemes",
    ],
    correctIndex: 1,
    explanation:
      "Film study should focus on how opponents handle two-minute situations, whether they waste timeouts, their hurry-up effectiveness, lead-protection philosophy, and their clock management mistakes.",
  },

  // Chapter 7: Special Teams and Clock Strategy
  {
    id: "7-1",
    chapter: 7,
    chapterTitle: "Special Teams and Clock Strategy",
    question:
      "When trailing late in the game on a kickoff return, what should you consider?",
    options: [
      "Always return the kick for maximum field position",
      "Fair catch deep to save time getting the offense on the field",
      "Let the ball go into the end zone for a touchback",
      "Call a timeout before the kickoff",
    ],
    correctIndex: 1,
    explanation:
      "When trailing late, consider a fair catch to save precious seconds getting the offense on the field quickly rather than risking time on a return.",
  },
  {
    id: "7-2",
    chapter: 7,
    chapterTitle: "Special Teams and Clock Strategy",
    question:
      "How quickly should you practice getting the field goal unit on the field?",
    options: [
      "30 seconds",
      "20 seconds",
      "8-10 seconds",
      "As long as needed",
    ],
    correctIndex: 2,
    explanation:
      "Practice getting the field goal unit on the field in 8-10 seconds. In late-game situations with the clock running, every second of transition time matters.",
  },
  {
    id: "7-3",
    chapter: 7,
    chapterTitle: "Special Teams and Clock Strategy",
    question:
      "When protecting a lead, what is the benefit of punting?",
    options: [
      "It always pins the opponent deep",
      "Punt takes time off the clock and provides a good field position trade",
      "It forces the opponent to use a timeout",
      "There is no benefit to punting when protecting a lead",
    ],
    correctIndex: 1,
    explanation:
      "When protecting a lead, punting consumes time while trading field position. Pooch punts can run even more time by keeping the ball in the air longer.",
  },
  {
    id: "7-4",
    chapter: 7,
    chapterTitle: "Special Teams and Clock Strategy",
    question:
      "When leading late, what is the priority on kickoff returns?",
    options: [
      "Try for a big return to extend the lead",
      "Don't risk fumbles - secure possession is paramount",
      "Always fair catch regardless of field position",
      "Run reverses and trick plays",
    ],
    correctIndex: 1,
    explanation:
      "When leading late in the game, don't risk fumbles on returns. Secure possession is paramount - a fumble on a return could give the opponent a short field and new life.",
  },

  // Chapter 8: Game-Winning Scenario Playbook
  {
    id: "8-1",
    chapter: 8,
    chapterTitle: "Game-Winning Scenario Playbook",
    question:
      "Down 7 with 1:30 left, ball at your own 25, 3 timeouts. How many plays can you realistically execute?",
    options: [
      "3-4 plays",
      "5-6 plays",
      "8-10 plays",
      "12-15 plays",
    ],
    correctIndex: 2,
    explanation:
      "With 1:30, three timeouts, and efficient clock management, you can realistically execute 8-10 plays - enough for a complete scoring drive.",
  },
  {
    id: "8-2",
    chapter: 8,
    chapterTitle: "Game-Winning Scenario Playbook",
    question:
      "Up 3 with 3:00 left, 1st and 10 at your own 30. How many first downs effectively end the game?",
    options: [
      "One first down",
      "Two first downs",
      "Three first downs",
      "Four first downs",
    ],
    correctIndex: 2,
    explanation:
      "Three first downs effectively end the game. Each first down allows approximately 2 minutes of clock burn (three plays at ~40 seconds each), consuming the remaining 3 minutes plus.",
  },
  {
    id: "8-3",
    chapter: 8,
    chapterTitle: "Game-Winning Scenario Playbook",
    question:
      "Tied game, 0:45 left, ball at your own 20, 2 timeouts. What's the primary objective?",
    options: [
      "Score a touchdown",
      "Get into field goal range (opponent's 35-40 yard line)",
      "Run out the clock for overtime",
      "Throw deep for a quick score",
    ],
    correctIndex: 1,
    explanation:
      "With 0:45 and 2 timeouts, the realistic goal is to get into field goal range - typically the opponent's 35-40 yard line. Use 2-3 plays for 20-25 yards, save one timeout for the FG operation.",
  },
  {
    id: "8-4",
    chapter: 8,
    chapterTitle: "Game-Winning Scenario Playbook",
    question:
      "Up 9 with 2:30 left, opponent has ball at midfield. What is the key defensive approach?",
    options: [
      "Blitz every play to force turnovers",
      "Prevent the touchdown first - a field goal doesn't beat you",
      "Play man-to-man coverage to be aggressive",
      "Foul to stop the clock",
    ],
    correctIndex: 1,
    explanation:
      "When up 9, the opponent needs a TD and FG. Prevent the touchdown first since a field goal alone doesn't beat you. Force them to use their timeouts and get off the field slowly.",
  },

  // Chapter 9: NCAA Clock Rules
  {
    id: "9-1",
    chapter: 9,
    chapterTitle: "NCAA Clock Rules - Critical Details",
    question:
      "In NCAA football, after an incomplete pass outside the final 2 minutes, when does the clock restart?",
    options: [
      "On the snap",
      "On the ready-for-play signal",
      "It doesn't restart until the next play",
      "After a 10-second runoff",
    ],
    correctIndex: 1,
    explanation:
      "Outside the final 2 minutes of each half, the clock restarts on the ready-for-play signal after incomplete passes, not on the snap. This is a key NCAA rule that differs from the final 2 minutes.",
  },
  {
    id: "9-2",
    chapter: 9,
    chapterTitle: "NCAA Clock Rules - Critical Details",
    question:
      "Which penalties trigger the 10-second runoff rule in the final minute?",
    options: [
      "Pass interference and holding",
      "False start, illegal formation, and delay of game",
      "Offsides and encroachment",
      "Personal fouls and targeting",
    ],
    correctIndex: 1,
    explanation:
      "The 10-second runoff applies to offensive fouls like false start, illegal formation, and delay of game in the final minute of each half when the clock would have been running.",
  },
  {
    id: "9-3",
    chapter: 9,
    chapterTitle: "NCAA Clock Rules - Critical Details",
    question:
      "How can the offense avoid a 10-second runoff?",
    options: [
      "By declining the penalty",
      "By challenging the call",
      "By using a timeout",
      "The 10-second runoff cannot be avoided",
    ],
    correctIndex: 2,
    explanation:
      "The offense can use a timeout to avoid the 10-second runoff. This is why timeout management is critical in the final minute of each half.",
  },
  {
    id: "9-4",
    chapter: 9,
    chapterTitle: "NCAA Clock Rules - Critical Details",
    question:
      "After a team timeout, the play clock is set to how many seconds?",
    options: [
      "40 seconds",
      "30 seconds",
      "25 seconds",
      "15 seconds",
    ],
    correctIndex: 2,
    explanation:
      "After team timeouts, the play clock is set to 25 seconds, not the usual 40 seconds that follows most plays.",
  },
  {
    id: "9-5",
    chapter: 9,
    chapterTitle: "NCAA Clock Rules - Critical Details",
    question:
      "In the final 2 minutes, after a first down, when does the clock restart?",
    options: [
      "On the ready-for-play signal",
      "Immediately",
      "On the snap",
      "After a mandatory 10-second delay",
    ],
    correctIndex: 0,
    explanation:
      "In the final 2 minutes of each half, after a first down, the clock stops and restarts on the ready-for-play signal. Outside the final 2 minutes, first downs also stop the clock briefly and restart on ready.",
  },
  {
    id: "9-6",
    chapter: 9,
    chapterTitle: "NCAA Clock Rules - Critical Details",
    question:
      "What is the delay of game penalty in NCAA football?",
    options: [
      "10 yards",
      "15 yards",
      "5 yards",
      "Loss of down",
    ],
    correctIndex: 2,
    explanation:
      "Delay of game is a 5-yard penalty. While it sounds minor, in clock management situations it can trigger a 10-second runoff in the final minute.",
  },

  // Chapter 10: Analytics and Clock Management
  {
    id: "10-1",
    chapter: 10,
    chapterTitle: "Analytics and Clock Management",
    question:
      "What is the average possession length in college football?",
    options: [
      "1-1.5 minutes",
      "2.5-3 minutes",
      "4-5 minutes",
      "6-7 minutes",
    ],
    correctIndex: 1,
    explanation:
      "The average possession in college football is 2.5-3 minutes. This figure is essential for calculating how many possessions remain in a game.",
  },
  {
    id: "10-2",
    chapter: 10,
    chapterTitle: "Analytics and Clock Management",
    question:
      "According to analytics, when does time become exponentially more valuable?",
    options: [
      "In the first quarter",
      "At halftime",
      "In the final 5 minutes",
      "In overtime",
    ],
    correctIndex: 2,
    explanation:
      "Time becomes exponentially more valuable in the final 5 minutes of a game. Every second has increasing impact on win probability.",
  },
  {
    id: "10-3",
    chapter: 10,
    chapterTitle: "Analytics and Clock Management",
    question:
      "When leading late in the game, what is more important than maximizing your own points?",
    options: [
      "Getting turnovers",
      "Reducing opponent possessions",
      "Scoring touchdowns",
      "Using all your timeouts",
    ],
    correctIndex: 1,
    explanation:
      "Late in the game with a lead, reducing opponent possessions is more valuable than maximizing your own points. Fewer possessions for the opponent means fewer chances for them to score.",
  },
  {
    id: "10-4",
    chapter: 10,
    chapterTitle: "Analytics and Clock Management",
    question:
      "When trailing late in the game, what becomes the critical focus?",
    options: [
      "Running the clock",
      "Maximizing points per possession",
      "Reducing opponent possessions",
      "Controlling field position",
    ],
    correctIndex: 1,
    explanation:
      "When trailing, maximizing points per possession is critical. Each possession may be your last, so efficiency and scoring on every drive becomes paramount.",
  },
  {
    id: "10-5",
    chapter: 10,
    chapterTitle: "Analytics and Clock Management",
    question:
      "How should analytics inform fourth down decisions late in a game?",
    options: [
      "Always go for it based on expected points alone",
      "Never go for it - always punt or kick",
      "Factor in both expected points AND possessions remaining",
      "Ignore analytics and go with gut feeling",
    ],
    correctIndex: 2,
    explanation:
      "Fourth down decisions must factor in both expected points and possessions remaining. Pure expected-points analysis doesn't account for the clock management dimension.",
  },
];

export function getQuestionsByChapter(chapter: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapter === chapter);
}

export function getRandomQuestions(count: number, chapter?: number): QuizQuestion[] {
  const pool = chapter ? getQuestionsByChapter(chapter) : [...quizQuestions];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
