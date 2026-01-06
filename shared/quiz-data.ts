/**
 * 共情天賦測驗 - 數據結構與計分邏輯
 * 
 * 設計哲學：深度心理探索風格
 * - 8 種人格原型，20 題測驗
 * - 基於四個維度的交叉分析
 * - 每個人格原型有獨特的特質與代表書目
 */

// ============ 人格原型定義 ============

export interface ArchetypeProfile {
  id: string;
  name: string;
  emoji: string;
  title: string;
  description: string;
  shortDescription: string;
  coreTraits: string[];
  book: string;
  imageUrl: string;
  color: string;
  bgGradient: string;
}

export const ARCHETYPES: Record<string, ArchetypeProfile> = {
  illuminator: {
    id: "illuminator",
    name: "靈魂照亮者",
    emoji: "🌟",
    title: "The Illuminator",
    description:
      "如同 Brooks 所述，你擁有極強的好奇心。你不是在解決對方的問題，而是在「見證」對方的存在。你的超能力是讓人覺得自己是世界上最特別的人。",
    shortDescription: "透過深度傾聽與好奇心，照亮他人的獨特價值",
    coreTraits: [
      "深度傾聽者",
      "好奇心強",
      "見證他人",
      "提問高手",
      "情感敏銳",
    ],
    book: "《深刻認識一個人》",
    imageUrl: "/images/illuminator.png",
    color: "#D4AF37",
    bgGradient: "from-amber-50 to-yellow-50",
  },
  guardian: {
    id: "guardian",
    name: "邊界守護者",
    emoji: "🛡️",
    title: "The Guardian",
    description:
      "深受 Elle 啟發，你也是高敏感者，但你學會了「穿上防護衣」。你能精準感知毒性情緒並將其擋在門外，這讓你在混亂中能保持清醒，成為他人的安全港。",
    shortDescription: "以清晰的邊界保護自己與他人，成為情感避風港",
    coreTraits: [
      "邊界清晰",
      "高敏感性",
      "毒性感知",
      "自我保護",
      "情感穩定",
    ],
    book: "《共情的邊界》",
    imageUrl: "/images/guardian.png",
    color: "#4A7C7E",
    bgGradient: "from-slate-50 to-blue-50",
  },
  anchor: {
    id: "anchor",
    name: "力量定錨者",
    emoji: "⚓",
    title: "The Anchor",
    description:
      "來自 Cloud 的「四號角落」概念。你提供絕對的穩定。當他人崩潰時，你是那根不動的柱子。你不一定會說很多話，但你的存在本身就是力量。",
    shortDescription: "用沉默的力量與穩定的存在，成為他人的支撐",
    coreTraits: ["穩定可靠", "沉著冷靜", "非言語表達", "內在力量", "陪伴者"],
    book: "《他人的力量》",
    imageUrl: "/images/anchor.png",
    color: "#2196F3",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  catalyst: {
    id: "catalyst",
    name: "潛能催化者",
    emoji: "🔥",
    title: "The Catalyst",
    description:
      "同樣源自 Cloud，但你更具行動力。你給予的共情是「燃料」。你看到對方的潛力，會用挑戰與激勵的方式，推動他們走出受害者模式。",
    shortDescription: "用激勵與挑戰，點燃他人的內在潛能",
    coreTraits: ["行動導向", "潛力挖掘", "激勵者", "解決問題", "推動成長"],
    book: "《他人的力量》",
    imageUrl: "/images/catalyst.png",
    color: "#FF9800",
    bgGradient: "from-orange-50 to-red-50",
  },
  intuitive: {
    id: "intuitive",
    name: "直覺先知",
    emoji: "🔮",
    title: "The Intuitive",
    description:
      "典型的 Elle 筆下高敏感族群。你不需要對方開口，就能透過氣場、肢體語言感知到真相。你常說：「我不知道為什麼，但我就是知道你不開心。」",
    shortDescription: "超越言語，直接感知他人的情緒與真相",
    coreTraits: ["直覺敏銳", "氣場感知", "非言語溝通", "深層感受", "預知力"],
    book: "《共情的邊界》",
    imageUrl: "/images/intuitive.png",
    color: "#9C27B0",
    bgGradient: "from-purple-50 to-indigo-50",
  },
  healer: {
    id: "healer",
    name: "慈悲療癒者",
    emoji: "🕊️",
    title: "The Healer",
    description:
      "Ciaramicoli 的理想化身。你完美平衡了感性（感受痛苦）與理性（理解原因）。你擅長處理深層創傷，給予無條件的接納與寬恕。",
    shortDescription: "以慈悲與理解，療癒他人的深層創傷",
    coreTraits: ["慈悲心", "創傷療癒", "無條件接納", "寬恕力", "平衡感"],
    book: "《共情的力量》",
    imageUrl: "/images/healer.png",
    color: "#4CAF50",
    bgGradient: "from-green-50 to-emerald-50",
  },
  analyst: {
    id: "analyst",
    name: "故事解構師",
    emoji: "🧠",
    title: "The Analyst",
    description:
      "結合了 Brooks 的觀察力與 Ciaramicoli 的認知共情。你喜歡聽故事，並能幫對方梳理出混亂情緒背後的邏輯，讓對方「看懂」自己的人生劇本。",
    shortDescription: "用邏輯與故事，幫助他人理解自己的人生",
    coreTraits: ["邏輯分析", "故事傾聽", "模式識別", "認知共情", "洞察力"],
    book: "《深刻認識一個人》+《共情的力量》",
    imageUrl: "/images/analyst.png",
    color: "#2196F3",
    bgGradient: "from-blue-50 to-teal-50",
  },
  resonator: {
    id: "resonator",
    name: "全感共鳴者",
    emoji: "🌊",
    title: "The Resonator",
    description:
      "極度的感性共情者。當別人哭泣時，你也會流淚。你與他人的情緒邊界最薄，能提供最深度的情感連結，但也最容易受傷。",
    shortDescription: "以最深的情感共鳴連結他人，但需要自我保護",
    coreTraits: ["深度共感", "情感邊界薄", "流淚共鳴", "深度連結", "易受傷"],
    book: "《共情的邊界》",
    imageUrl: "/images/resonator.png",
    color: "#00BCD4",
    bgGradient: "from-cyan-50 to-blue-50",
  },
};

// ============ 測驗題目定義 ============

export interface QuizQuestion {
  id: number;
  category: "sensing" | "processing" | "responding" | "dynamics";
  categoryLabel: string;
  question: string;
  hint?: string;
  scoringGroups: string[]; // 這題影響的計分組別
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 感知階段：你如何接收訊號？(Sensing Phase)
  {
    id: 1,
    category: "sensing",
    categoryLabel: "感知階段",
    question: "走進一個房間時，即使沒人說話，你也能立刻感覺到氣氛是緊張還是愉快的嗎？",
    scoringGroups: ["intuitive"],
  },
  {
    id: 2,
    category: "sensing",
    categoryLabel: "感知階段",
    question:
      "你是否經常發現自己能注意到別人換了髮型、穿著細節，或是微小的表情變化（如嘴角抽動）？",
    scoringGroups: ["observant"],
  },
  {
    id: 3,
    category: "sensing",
    categoryLabel: "感知階段",
    question: "當別人告訴你「我沒事」時，你是否通常能直覺地知道他們在說謊？",
    scoringGroups: ["intuitive"],
  },
  {
    id: 4,
    category: "sensing",
    categoryLabel: "感知階段",
    question:
      "在嘈雜、燈光刺眼或人多的環境中，你是否容易感到能量被耗盡，想要逃離？",
    scoringGroups: ["intuitive"],
  },
  {
    id: 5,
    category: "sensing",
    categoryLabel: "感知階段",
    question:
      "看電影或小說時，你是否會因為角色的遭遇而感到身體上的疼痛或極度不適？",
    scoringGroups: ["intuitive"],
  },

  // 處理階段：你如何消化情緒？(Processing Phase)
  {
    id: 6,
    category: "processing",
    categoryLabel: "處理階段",
    question:
      "當朋友向你訴苦時，你腦中是否會自動開始分析「為什麼他會這樣想」或「這背後的邏輯是什麼」？",
    scoringGroups: ["observant"],
  },
  {
    id: 7,
    category: "processing",
    categoryLabel: "處理階段",
    question:
      "你是否認為，為了保護自己的情緒健康，有時候必須對他人的痛苦「關上門」？",
    scoringGroups: ["action"],
  },
  {
    id: 8,
    category: "processing",
    categoryLabel: "處理階段",
    question:
      "你是否容易將別人的負面情緒（如憤怒、悲傷）吸收到自己身上，事後需要很久才能排解？",
    scoringGroups: ["intuitive"],
  },
  {
    id: 9,
    category: "processing",
    categoryLabel: "處理階段",
    question: "在聽別人說話時，你是否更在意「他沒說出口的話」大於「他說出口的話」？",
    scoringGroups: ["observant"],
  },
  {
    id: 10,
    category: "processing",
    categoryLabel: "處理階段",
    question:
      "你是否相信，理解一個人的過去（童年、創傷），是原諒他們現在行為的關鍵？",
    scoringGroups: ["stable"],
  },

  // 回應階段：你如何給予支持？(Responding Phase)
  {
    id: 11,
    category: "responding",
    categoryLabel: "回應階段",
    question:
      "當朋友遭遇失敗，你傾向於立刻給予鼓勵，告訴他「你可以做得更好」或「我們來想解決辦法」嗎？",
    scoringGroups: ["action"],
  },
  {
    id: 12,
    category: "responding",
    categoryLabel: "回應階段",
    question:
      "你是否覺得，最好的安慰就是靜靜地陪在對方身邊，什麼都不用做，只要「在場」就好？",
    scoringGroups: ["stable"],
  },
  {
    id: 13,
    category: "responding",
    categoryLabel: "回應階段",
    question:
      "你是否擅長透過提問（例如：「那件事對你來說意味著什麼？」），引導對方自己發現答案？",
    scoringGroups: ["observant"],
  },
  {
    id: 14,
    category: "responding",
    categoryLabel: "回應階段",
    question:
      "你是否敢於對朋友說真話，即使那可能會讓當下的氣氛變得尷尬，但你知道這對他有益？",
    scoringGroups: ["action"],
  },
  {
    id: 15,
    category: "responding",
    categoryLabel: "回應階段",
    question:
      "當對方犯錯時，你是否很容易就能設身處地為他找藉口，甚至比他還先原諒自己？",
    scoringGroups: ["stable"],
  },

  // 關係動力：你追求什麼？(Dynamics Phase)
  {
    id: 16,
    category: "dynamics",
    categoryLabel: "關係動力",
    question:
      "在人際關係中，你是否認為「界線」比「親密」更重要，沒有界線的親密是危險的？",
    scoringGroups: ["action"],
  },
  {
    id: 17,
    category: "dynamics",
    categoryLabel: "關係動力",
    question:
      "你是否渴望一種能讓你展現脆弱、承認自己「做不到」的關係（四號角落）？",
    scoringGroups: ["stable"],
  },
  {
    id: 18,
    category: "dynamics",
    categoryLabel: "關係動力",
    question: "你是否經常扮演團體中「和事佬」或「情緒垃圾桶」的角色？",
    scoringGroups: ["intuitive"],
  },
  {
    id: 19,
    category: "dynamics",
    categoryLabel: "關係動力",
    question:
      "你是否認為，愛一個人的最高境界，是幫助他發揮潛能，而不僅僅是讓他開心？",
    scoringGroups: ["action"],
  },
  {
    id: 20,
    category: "dynamics",
    categoryLabel: "關係動力",
    question:
      "你是否覺得，每個人都是一個迷人的謎題，而你人生的樂趣就是去解開這些謎題？",
    scoringGroups: ["observant"],
  },
];

// ============ 計分系統 ============

export interface ScoringResult {
  intuitiveScore: number;
  observantScore: number;
  stableScore: number;
  actionScore: number;
  primaryArchetype: string;
  secondaryArchetype?: string;
  allScores: Record<string, number>;
}

/**
 * 計算測驗結果
 * @param answers - 用戶的答案 (題目ID -> 是否選擇Yes)
 * @returns 計分結果與推薦的人格原型
 */
export function calculateResult(answers: Record<number, boolean>): ScoringResult {
  // 初始化各組計分
  const scores = {
    intuitive: 0,
    observant: 0,
    stable: 0,
    action: 0,
  };

  // 遍歷所有答案，計算各組得分
  Object.entries(answers).forEach(([questionId, isYes]) => {
    if (!isYes) return; // 只計算 Yes 的答案

    const question = QUIZ_QUESTIONS.find((q) => q.id === parseInt(questionId));
    if (!question) return;

    question.scoringGroups.forEach((group) => {
      scores[group as keyof typeof scores]++;
    });
  });

  // 深度判定邏輯 - 確定主要人格原型
  let primaryArchetype = "";
  let secondaryArchetype: string | undefined;

  // 檢查特定條件組合
  if (scores.observant >= 3 && answers[13]) {
    primaryArchetype = "illuminator"; // 靈魂照亮者
  } else if (scores.intuitive >= 3 && answers[3]) {
    primaryArchetype = "intuitive"; // 直覺先知
  } else if (scores.intuitive >= 3 && answers[5]) {
    primaryArchetype = "resonator"; // 全感共鳴者
  } else if (
    (scores.intuitive >= 2 || scores.action >= 2) &&
    answers[7] &&
    answers[16]
  ) {
    primaryArchetype = "guardian"; // 邊界守護者
  } else if (scores.stable >= 3 && answers[12]) {
    primaryArchetype = "anchor"; // 力量定錨者
  } else if (scores.action >= 3 && answers[11]) {
    primaryArchetype = "catalyst"; // 潛能催化者
  } else if (scores.stable >= 3 && answers[10]) {
    primaryArchetype = "healer"; // 慈悲療癒者
  } else if (scores.observant >= 3 && answers[6]) {
    primaryArchetype = "analyst"; // 故事解構師
  } else {
    // 備選方案：根據最高分組決定
    const maxScore = Math.max(
      scores.intuitive,
      scores.observant,
      scores.stable,
      scores.action
    );

    if (scores.intuitive === maxScore) {
      primaryArchetype = answers[5] ? "resonator" : "intuitive";
    } else if (scores.observant === maxScore) {
      primaryArchetype = answers[13] ? "illuminator" : "analyst";
    } else if (scores.stable === maxScore) {
      primaryArchetype = answers[10] ? "healer" : "anchor";
    } else if (scores.action === maxScore) {
      primaryArchetype = answers[11] ? "catalyst" : "guardian";
    }
  }

  // 確定次要人格原型（得分第二高的組別）
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([group]) => group);

  if (sortedScores[0] !== sortedScores[1]) {
    const secondaryGroup = sortedScores[1];
    if (secondaryGroup === "intuitive" && !answers[5]) {
      secondaryArchetype = "intuitive";
    } else if (secondaryGroup === "observant" && !answers[13]) {
      secondaryArchetype = "analyst";
    } else if (secondaryGroup === "stable" && !answers[10]) {
      secondaryArchetype = "anchor";
    } else if (secondaryGroup === "action" && !answers[11]) {
      secondaryArchetype = "guardian";
    }
  }

  return {
    intuitiveScore: scores.intuitive,
    observantScore: scores.observant,
    stableScore: scores.stable,
    actionScore: scores.action,
    primaryArchetype,
    secondaryArchetype,
    allScores: scores,
  };
}
