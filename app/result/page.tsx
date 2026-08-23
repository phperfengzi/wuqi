'use client';

import { useEffect, useState } from 'react';
import { calculateResult, questions, traits, type Weapon, type Scores } from '../data';
import { weaponFacts } from '../weaponFacts';

type Result = { weapon:Weapon; alternatives:Weapon[]; scores:Scores; confidence:number };

const historyNotes: Record<string, string> = {
  '剑器':'剑在中国既是格斗之器，也是身份、礼法与文士精神的象征。它讲究刃身与持者的一致，重点不只在锋利，也在分寸。',
  '刀器':'刀是最贴近实战的兵器之一，从环首刀到横刀，一直伴随着军阵、骑战与民间。它的语法很直白：承力，然后破局。',
  '枪矛':'枪矛以长柄拉开距离，是军阵与骑战中最典型的控制性兵器。一条直线，既是防线，也是进攻的起点。',
  '戈戟':'戈与戟承载着先秦军阵的记忆，其形制将勾、刺、掠等方式合于一体。这类兵器的魅力，就在于一件器里能读出多种意图。',
  '斧钺钩叉':'斧、钺、钩与叉都有很强的功能性：勇于破坏，也善于牵制。它们往往用一个明确动作打破结构。',
  '锤鞭锏':'锤、鞭与锏的力量不只来自重量，更来自运势。它们适合那些相信稳定、重复与坚持会积累优势的人。',
  '软兵':'软兵不靠固定轨迹取胜，而是利用摆动、回旋与意外。流星锤、链子与节鞭，都是“把不确定变成力量”的象征。',
  '弓弩':'弓弩讲究的是预判、蓄力与时机。它将故事拉到远处，让一次释放在很久之前就开始发生。',
  '投掷兵器':'投掷之器的价值在于出手瞬间的判断。它适合能在极短窗口里让意图变得明晰的人。',
  '棍杖':'棍杖是最朴素也最富变化的兵器，可防、可击、可借力。它的传统不在华丽形制，而在掌握基本功后的自由。',
  '奇门器械':'奇门器械游离于军阵制式之外，在武术、民俗与传奇中生长。拂尘、铁扇与判官笔，都是将身份转化为优势的想象。',
  '盾牌防御':'盾牌不只是抵挡，也是为了保护队友、阵形与退路而存在。它的攻击性，常常来自对空间的掌控。',
};

const sceneNotes: Record<string, string> = {
  '近程':'适合在局面贴近、信息充分时迅速收束战局。', '中远程':'适合先立边界，再用稳定节奏把优势推向前方。', '远程':'适合暗中观察、耐心蓄力，在最准确的时机出手。',
};

const traitReadings: Record<string, string> = {
  '全局判断':'你会先看整体、关系与后果；看似慢半拍，其实是在为关键一步留出空间。',
  '行动力量':'你不喜欢让问题悬着。面对僵局，你有把复杂处直接切开的勇气，也愿意承担改变带来的波动。',
  '反应速度':'你的反应很快，能够在变化尚未凝固时先动起来。你擅长让机会不只停留在“看见”。',
  '掌控局面':'你对气氛、秩序与彼此的位置有敏锐感。你不一定声音最大，却常能决定事情往哪里走。',
  '做决定':'重要时刻你更信任选择本身。犹豫不会让你安心，清醒地承担一个答案反而会。',
  '想新办法':'你天然会寻找不在标准答案里的连接。别人看到限制时，你容易先看到可被重新组合的条件。',
  '保护意识':'你在意代价，也在意谁会被遗漏。你的稳不是保守，而是愿意替关系和结果多留一层余地。',
  '稳定耐心':'你能把注意力留在真正重要的事情上。越是嘈杂时，越能显出你不被轻易带走的力量。',
};

const weaponExplainers: Record<string, { what: string; usedBy: string; use: string; connection: string }> = {
  '剑器': { what:'剑是有锋刃的短兵器，多以刺、格挡和转向取胜。', usedBy:'古代军士、随身佩剑者与习武者都可能使用；剑也常带有礼仪与身份象征。', use:'它需要判断距离与时机，不能只凭蛮力。', connection:'这对应你做事时重视分寸、标准和准确判断。' },
  '刀器': { what:'刀是单刃近战兵器，动作直接，适合劈、砍、斩。', usedBy:'历史上常见于步兵、骑兵和民间武术。', use:'它强调快速解决眼前最重要的问题。', connection:'这对应你更愿意先行动、把僵局切开。' },
  '枪矛': { what:'枪和矛都是长柄刺击兵器，能在较远距离控制对手。', usedBy:'步兵军阵与骑兵都大量使用过这类兵器。', use:'它的核心不是硬拼，而是先守住距离与节奏。', connection:'这对应你习惯先建立边界、再稳步推进。' },
  '戈戟': { what:'戈、戟是带钩、刺或多种刃部的长柄兵器。', usedBy:'先秦到后世的军阵、车战和仪仗中都能见到它们的身影。', use:'它可以勾、刺、牵制，擅长处理复杂局面。', connection:'这对应你能同时考虑多个选择和后续影响。' },
  '斧钺钩叉': { what:'斧、钺、钩、叉是动作目标很明确的兵器，强调破开或牵制。', usedBy:'军阵、仪仗和民间武术中都有相应形制。', use:'它适合打开坚固局面、打断对方节奏。', connection:'这对应你擅长抓重点、不怕面对难题。' },
  '锤鞭锏': { what:'锤、鞭、锏多靠重量、打击力或连续挥击形成优势。', usedBy:'历史军阵、骑战记载和传统武术中都常出现。', use:'它需要稳定发力与持续承受，而不是一时花巧。', connection:'这对应你在压力下可靠、能把一件事扛到底。' },
  '软兵': { what:'软兵器包含流星锤、节鞭、绳镖等，依靠摆动和回旋改变轨迹。', usedBy:'更多见于民间武术与演练传统。', use:'它的关键是灵活变化、借力与节奏。', connection:'这对应你善于变通，能从意外里找到机会。' },
  '弓弩': { what:'弓弩是远程发射兵器：弓靠拉弦，弩通常借助机械结构蓄力。', usedBy:'军阵、守城与狩猎都曾广泛使用。', use:'它强调观察、准备和选择准确的释放时机。', connection:'这对应你习惯先看清全局，再把力量用在关键点上。' },
  '投掷兵器': { what:'这类兵器通过投掷或弹射在远处作用，例如梭枪、飞刀、袖箭。', usedBy:'军阵、狩猎、民间技艺与武术想象中都能见到。', use:'它考验瞬间判断和准确度。', connection:'这对应你善于抓住短暂机会、快速作出选择。' },
  '棍杖': { what:'棍和杖是长条形兵器，可击、可挡、可借力。', usedBy:'军阵、行旅与民间武术中都非常常见。', use:'它变化多，但基础逻辑清楚，重在扎实。', connection:'这对应你会用现有资源，把基本功做成优势。' },
  '奇门器械': { what:'铁扇、拂尘、判官笔等不属于常规军阵制式，常被归入奇门兵器。', usedBy:'主要见于民间武术、戏曲和传奇叙事。', use:'它的魅力是出人意料，能把平常物件用出新方法。', connection:'这对应你不受常规限制，善于重新理解问题。' },
  '盾牌防御': { what:'盾牌是防护器具，可遮挡攻击，也能配合推进或保护队友。', usedBy:'守城、步兵阵列与护卫场景都离不开它。', use:'它的价值在于减少损失、守住空间与退路。', connection:'这对应你重视安全感、关系和长期结果。' },
};

type WeaponProfile = {
  title?: string; identity: string; tags: string[]; opening: string; what: string; usedBy: string; use: string;
  personality: string; history: string; source: string; benefit: string; theme?: string;
  dossier?: { intro: string; features: Array<{ title: string; text: string }>; originTitle: string; origin: string };
};

// 逐器档案优先于门类说明：新增兵器时应在这里补入经核验的独立资料，不能只套用门类性格。
const weaponProfiles: Record<string, WeaponProfile> = {
  '梭枪（投枪）': {
    identity:'宋代兵书所见 · 短柄投掷枪', tags:['短柄投射','盾牌配合','先投后近','抓住时机'],
    opening:'阁下出手并不莽撞，而是擅长在窗口稍纵即逝时，迅速把判断化为行动。与你相合的，是短小而凌厉的梭枪。',
    what:'梭枪是中国古代的一种短柄投掷兵器，外形近似带锋刃的短枪或梭镖。它的名字来自投出时像织布梭一样向前飞去；北宋兵书中也称它为“飞梭枪”。',
    usedBy:'《武经总要》把它放在枪类中记述。书中说它“本出南方，蛮獠用之”；进入兵书后，它已是军队能够理解并记录的一种短柄投射兵器。使用者通常需要与盾牌、队形或其他近战兵器配合，而不是孤身把它当成长枪使用。',
    use:'它的主用法是单手投出，在数十步内以突发的直线投射打乱或击中目标；兵书还写到一手持“旁牌”（小盾），一手掷梭枪，形成掩护下的投射。短柄令它较便于携带和突然出手，但它的核心仍是投掷，不是替代长枪列阵。',
    personality:'你对机会的敏感，常常早于别人把计划说出口。你不喜欢无休止地拉扯：信息够了，就会果断下注。你的强项是预判、反应和把握时机；需要留意的则是，为重要决定留一点复核空间，让快不变成仓促。',
    history:'北宋官修兵书《武经总要》把梭枪列入“枪九色”。书中明确记录它“长数尺”、源自南方使用传统，并描述持旁牌投掷、数十步内命中目标的战术。这比笼统叫它“标枪”更准确：梭枪是有特定文献称谓与用法线索的中国古代短柄投射枪。',
    source:'主要依据：《武经总要》卷一“器图”梭枪条；“数尺”为古籍原有尺度，不能换算成唯一可靠的厘米数。',
    benefit:'这个结果给你的不是“你很会攻击”的空话，而是一个行动提醒：当你已经看清窗口，就把目标、时点和退路一起定下来。你适合负责临门一脚，也适合在团队犹豫时提出可执行的下一步。',
    dossier:{
      intro:'想象一根比长枪短得多的木杆：前端装一枚尖锐枪刃，整体利落、轻便，能单手握住。它不是影视里泛泛的“飞镖”，而是一种有明确兵书称谓的短柄投射枪。',
      features:[
        { title:'形制短小', text:'《武经总要》只说“长数尺”。这说明它明显短于用于列阵的长枪，便于携带与单手出手；史料没有给出统一、可靠的厘米数，因此不应写成精确的 50—65 厘米。' },
        { title:'先投射，再衔接', text:'它的杀伤逻辑是把短枪掷出，在数十步的窗口内突袭目标。短柄也使它更适合贴近盾牌行动；实际携带和近身配合会因时代、队伍和器形不同而变。' },
        { title:'配旁牌使用', text:'兵书描述“一手持旁牌，一手摽以掷人”。旁牌可理解为小型盾牌：投掷者不是毫无遮挡地出手，而是在防护下完成投射，形成“有掩护的先手”。' },
      ],
      originTitle:'从南方使用传统到宋代兵书',
      origin:'《武经总要》记它“本出南方，蛮獠用之”，这是古籍的时代称呼，并非现代民族分类。到北宋时，梭枪被收入官修兵书的“枪九色”，说明它已经进入军事知识体系。我们能据此确认其在宋代兵书中的名称、形制与战术线索；至于每个地区、每支军队的实际装备规模，则不宜夸大。',
    },
  },
  '唐制仪刀': {
    title:'唐制仪刀', identity:'宫廷仪仗 · 大唐威仪', tags:['雍容华贵','不怒自威','分寸感强','审美与秩序'],
    opening:'阁下气度沉稳，如盛唐宫阙般自有尺度。与你相合的不是战场上的横刀，而是羽仪所执、以威仪镇场的唐制仪刀。',
    what:'仪刀是唐代“四制刀”之一。它的形制与早期环首刀传统有关，常施龙凤环，并以金银装饰；在测试中，它代表的是一种“无需大声，也能让人信服”的气场。',
    usedBy:'它主要属于宫廷仪仗体系：皇帝出行、朝会等礼仪场合的侍卫与仪卫会执持。它可以与禁卫、千牛卫的宫廷护卫形象相连，但不应把它简单当成一件前线冲阵的主战刀。',
    use:'它最重要的用途是展示秩序、身份与国家威仪：让场面有边界，让人知道规矩所在。它有锋刃，但这份锋芒更多是一种“有力量的克制”。',
    personality:'你的魅力不在于抢着成为焦点，而在于你出现之后，场面会自然变得更有秩序。你在意品质、规则和表达的分寸，也不愿用粗暴的方式证明自己。外表可能温和克制，内心却有很明确的底线；当需要承担时，你会让别人感到可靠。',
    history:'《唐六典》将唐代刀制列为仪刀、障刀、横刀、陌刀四类，并称仪刀“盖古班剑之类”，至隋“装以金银，羽仪所执”。这说明它的核心历史身份是礼仪与仪卫，而非把“唐刀”三个字混同为单一的实战兵器。',
    source:'史料依据：《唐六典·卷十六·武库令丞职掌》；本页将其作为文化性格测试的意象解读。',
    benefit:'这个结果可以提醒你：你的优势是让事情显得更得体、更可信、更有章法。下一次需要主持、协调或表达立场时，不必模仿强势的人；清晰的标准、平稳的语气和可靠的细节，就是你的影响力。',
    theme:'tang-imperial',
  },
};

function personalityReading(weapon: Weapon, strongest: string, second: string, third: string) {
  return `你与${weapon.name}的相合，不只在于偏好${weapon.category}的气质，更在于你处理不确定性的方式。${traitReadings[strongest]} ${traitReadings[second]} 当外界催促你立刻表态时，你会先依靠自己的${third}，把情绪、线索与风险放回合适的位置。你并非永远强硬或永远谨慎；真正鲜明的地方，是你知道何时该蓄力，何时该让局面向前一步。`;
}

function sceneGuide(weapon: Weapon, strongest: string) {
  const range = sceneNotes[weapon.range] || sceneNotes['中远程'];
  return [
    ['初入新局', `别急着证明自己。先用${strongest}把关键人物、出口与可用资源看清，${range}`],
    ['局面胶着', `这正是${weapon.name}的时刻：不必面面俱到，选择一个最能撬动全局的支点，让行动有方向。`],
    ['关系协作', `把你的判断说成别人能接住的下一步。兵器再锋利，也要在阵中才能显出真正的价值。`],
  ];
}

function shapeGuide(weapon: Weapon) {
  const special: Record<string, string> = {
    '唐制仪刀':'一把直身单刃长刀，柄首、刀鞘可施龙凤环与金银装饰；它更像宫廷仪仗中的华贵礼器，而不是战场砍杀刀。',
    '梭枪（投枪）':'一根“数尺”长的短木杆，前端装锋利枪刃；它比长枪短得多，可单手握持，投出时像织布梭一样飞行。史书写“数尺”，没有可靠统一的厘米数。',
    '床弩':'一张装在架座上的大型弩，不适合随身携带；通常需要固定部署，甚至多人协作张弦与瞄准。',
    '流星锤':'一枚或两枚锤头用绳索连接在手柄或手腕一端，挥动时会画出很大的圆弧。',
    '拂尘':'一根短柄前端束有长丝、麻或兽尾状拂穗的器物；原本是清扫、仪式用品，后才进入武术想象。',
    '藤牌':'一面用藤条编制或加固的轻便圆盾，通常一手持盾，另一手配短兵器。',
  };
  if (special[weapon.name]) return special[weapon.name];
  const shapes: Record<string, string> = {
    '剑器':'整体是笔直的双刃金属剑身，中间有脊，尾部接剑格、剑柄和柄首；看起来像一条细长的直线。',
    '刀器':'一侧开刃的长条刀身，刀背较厚，配握柄；不同刀型会在长度、弧度和是否装长柄上变化。',
    '枪矛':'一根长木杆或竹杆，最前端装尖锐金属枪头；远看像“一根长杆加一个锋利尖头”。',
    '戈戟':'长杆顶部不只一个尖头：戈有横出的刃，戟则把刺头和横刃组合在一起，外形比枪更复杂。',
    '斧钺钩叉':'都是长柄前端装宽刃、弯钩或分叉金属头的器械；一眼重点在“斧面、钩尖或叉齿”。',
    '锤鞭锏':'以短柄加重锤头、棱节、节段或尖凸为主，外形厚重，不靠锋利长刃取胜。',
    '软兵':'由绳、链或多个节段连接，拿在手里不是固定直线，挥动后才形成攻击范围。',
    '弓弩':'弓是弯曲弓臂加弓弦；弩像“装在木臂上的弓”，多了机括、弩臂和扳机结构。',
    '投掷兵器':'尺寸比长枪短得多，常做成短杆、短刃、小型铁器或弹体，重点是便于携带和出手。',
    '棍杖':'一根没有锋刃或锋刃不明显的长条杆体，常以木、竹或金属制成，重点在长度、韧性和重心。',
    '奇门器械':'外形往往不像标准军械，可能是扇、笔、环、钩、凳等日常物件或其强化版本。',
    '盾牌防御':'一面可遮住身体部分区域的板、编织物或金属防具，背面通常有握把或绑带。',
  };
  return shapes[weapon.category] || '它的具体形制需要结合时代、出土器物和兵书图像一起理解。';
}

function atlasPosition(category: string) {
  const positions: Record<string, string> = {
    '剑器':'0% 0%', '刀器':'33.333% 0%', '枪矛':'66.666% 0%', '戈戟':'100% 0%',
    '斧钺钩叉':'0% 50%', '锤鞭锏':'33.333% 50%', '软兵':'66.666% 50%', '弓弩':'100% 50%',
    '投掷兵器':'0% 100%', '棍杖':'33.333% 100%', '奇门器械':'66.666% 100%', '盾牌防御':'100% 100%',
  };
  return positions[category] || '0% 0%';
}

function carryGuide(category: string) {
  const guides: Record<string, string> = {
    '剑器':'通常配剑鞘佩带，近身时拔出使用。', '刀器':'常配刀鞘携行；军阵刀与民间刀的携带方式不同。',
    '枪矛':'以双手持杆为主；步兵看阵形，骑兵看坐骑与冲击距离。', '戈戟':'双手持长杆，和军阵、车战或仪仗队列关系密切。',
    '斧钺钩叉':'多以长柄双手操持，重在先拉开距离再做明确动作。', '锤鞭锏':'短柄多可单手或双手持握，靠近身的稳定发力。',
    '软兵':'收束时短、挥开后远，使用者需为绳链留出回旋空间。', '弓弩':'弓配箭囊；弩还需要上弦、装矢和相对稳定的发射位置。',
    '投掷兵器':'常与盾、囊袋或其他近战兵器配合，先投后近或以投射扰乱。', '棍杖':'双手握住杆体的不同位置，通过步法调整长短距离。',
    '奇门器械':'通常贴身携带或藏于日常器物形态，距离较近才显出变化。', '盾牌防御':'一手持盾或绑在前臂，另一手配短兵器；重点是保护自己和同伴。',
  };
  return guides[category] || '具体携带与配合方式会随时代、器形和使用者不同而变化。';
}

function radarSvgPoints(scores: Scores) {
  const values = [scores.reach, scores.force, scores.tempo, scores.daring, scores.ingenuity, scores.guard];
  return values.map((value, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / values.length;
    const radius = 28 + (Math.min(10, value) / 10) * 52;
    return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
  }).join(' ');
}

function personaTitle(strongest: string) {
  const titles: Record<string, string> = {
    '全局判断':'谋定型人格', '行动力量':'破阵型人格', '反应速度':'先锋型人格', '掌控局面':'定势型人格',
    '做决定':'决断型人格', '想新办法':'破格型人格', '保护意识':'守护型人格', '稳定耐心':'持重型人格',
  };
  return titles[strongest] || '自成一格的人格';
}

export default function ResultPage() {
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    let answers: number[];
    try { answers = JSON.parse(localStorage.getItem('arsenal-answers') || '[]'); } catch { answers=[]; }
    if (answers.length !== questions.length) answers = Array.from({length:questions.length},(_,i) => i % 4);
    setResult(calculateResult(answers));
  }, []);
  if (!result) return <main className="result-loading">正在检索兵器谱……</main>;
  const { weapon, alternatives, scores, confidence } = result;
  const sortedTraits = [...traits].sort((a,b) => scores[b.key] - scores[a.key]);
  const strongest = sortedTraits[0].label;
  const second = sortedTraits[1].label;
  const third = sortedTraits[2].label;
  const scenes = sceneGuide(weapon, strongest);
  const shape = shapeGuide(weapon);
  const carry = carryGuide(weapon.category);
  const atlas = atlasPosition(weapon.category);
  const explainer = weaponExplainers[weapon.category];
  const profile = weaponProfiles[weapon.name];
  const fact = weaponFacts[weapon.name];
  const detail = {
    identity: profile?.identity || fact?.identity || `${weapon.category} · ${weapon.range}兵器`,
    tags: profile?.tags || [weapon.category, weapon.range, `${strongest}型`],
    opening: profile?.opening || `阁下与${weapon.name}气质相合。它所代表的，是你在压力与选择面前最自然的行动方式。`,
    what: profile?.what || (fact ? `${weapon.name}：${fact.note}` : explainer.what),
    user: profile?.usedBy || fact?.user || explainer.usedBy,
    use: profile?.use || fact?.use || explainer.use,
    personality: profile?.personality || weapon.analysis,
    history: profile?.history || (fact ? `${fact.identity} ${fact.note}` : historyNotes[weapon.category] || '这件兵器的具体形制与时代需要结合资料进一步判断。'),
    source: profile?.source || fact?.source || `来源标签：${weapon.source}`,
    benefit: profile?.benefit || `这个结果可以帮你识别自己的优势：${fact?.note || explainer.connection} ${weapon.suggestion}`,
  };
  const dossier = profile?.dossier || {
    intro: `${profile?.title || weapon.name}是${fact?.identity || `${weapon.category}中的一件器物`}。先认清它的形制与用途，再理解它在历史资料中的位置。`,
    features: [
      { title:'形制怎么认', text: `${shape} ${fact?.note || ''}` },
      { title:'怎么使用', text: `${detail.use} ${carry}` },
      { title:'谁会使用', text: detail.user },
    ],
    originTitle: fact?.status === '史料器名' ? '名称与史料' : '资料边界',
    origin: `${detail.history} ${fact?.source ? `本页参考：${fact.source}。` : ''}`,
  };

  return (
    <main className="result-shell">
      <nav className="result-nav">
        <a className="brand inverse" href="/">器·谱 <span>ARSENAL CODEX</span></a>
        <p>已完成 24/24 · 鉴定完成 · 匹配度 {confidence}%</p>
        <button onClick={async () => { const text = `${weapon.name}，我的本命古代兵器，契合度 ${confidence}%。`; if (navigator.share) { try { await navigator.share({ title: '器·谱鉴定结果', text, url: window.location.href }); } catch {} } else { await navigator.clipboard?.writeText(text); } }}>分享结果 ↗</button>
      </nav>

      <section className="result-hero" style={{ backgroundImage:"url('/result-hero.png')" }}>
        <span className="hero-spark spark-one"/><span className="hero-spark spark-two"/><span className="hero-spark spark-three"/>
        <div className="result-index"><span>RESULT</span><b>NO. {String(Math.abs(weapon.name.split('').reduce((a,c)=>a+c.charCodeAt(0),0)) % 120 + 1).padStart(3,'0')}</b></div>
        <div className="weapon-mark" aria-hidden="true"><span/><span/><i>{weapon.name.slice(0,1)}</i><small>神兵现身</small></div>
        <div className="result-title">
          <div className="hero-atlas-wrap"><div className="weapon-atlas hero-atlas" style={{'--atlas-pos':atlas} as React.CSSProperties}/><small>{weapon.category} · 形制示意</small></div>
          <p>{detail.opening}</p>
          <h1>{profile?.title || weapon.name}</h1>
          <div className="weapon-tags">{detail.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <blockquote>“{weapon.motto}”</blockquote>
          <div className="fit-score"><div className="fit-ring" style={{'--fit':`${confidence * 3.6}deg`} as React.CSSProperties}><b>{confidence}%</b><span>契合度</span></div><p>四类题型交叉计算<br/><small>并非命定，只是你此刻的倒影</small></p></div>
        </div>
      </section>

      <section className="weapon-101 weapon-summary">
        <div className="weapon-overview"><div><p className="section-no">先看懂这把兵器</p><h2>{profile?.title || weapon.name}</h2><p>{detail.what}</p></div></div>
      </section>

      <section className="trait-radar-summary">
        <article className="personality-card"><p className="section-no">01 / 兵器人格</p><h2>{personaTitle(strongest)}</h2><p>{detail.personality}</p><div className="keyword-row"><span>{strongest}</span><span>{second}</span><span>{weapon.category}</span></div></article>
        <article className="radar-profile"><div><p className="section-no">02 / 六维雷达图</p><h2>你的行动轮廓</h2><p>六条轴线呈现你在本次测试中的力量分布。</p></div><div className="radar-visual"><svg viewBox="0 0 200 200" aria-label="六维人格雷达图"><polygon className="radar-outer" points="100,20 169,60 169,140 100,180 31,140 31,60"/><polygon className="radar-inner" points="100,60 134,80 134,120 100,140 66,120 66,80"/>{[[-90],[-30],[30],[90],[150],[210]].map(([angle]) => <line key={angle} x1="100" y1="100" x2={100 + Math.cos(angle * Math.PI / 180) * 80} y2={100 + Math.sin(angle * Math.PI / 180) * 80}/>)}<polygon className="radar-area" points={radarSvgPoints(scores)}/></svg><span className="radar-label reach">全局</span><span className="radar-label force">行动</span><span className="radar-label tempo">反应</span><span className="radar-label daring">决断</span><span className="radar-label ingenuity">创新</span><span className="radar-label guard">保护</span></div></article>
      </section>

      <section className="weapon-dossier">
        <header><p className="section-no">兵器详解</p><h2>想再多了解一点？</h2><p>{dossier.intro}</p></header>
        <details className="dossier-details">
          <summary><span>展开完整兵器档案</span><small>形制 · 用法 · 流传</small><i>＋</i></summary>
          <div className="dossier-features">{dossier.features.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <div className="dossier-origin"><p className="section-no">流传与记录</p><h3>{dossier.originTitle}</h3><p>{dossier.origin}</p></div>
        </details>
      </section>

      <section className="analysis-grid">
        <div className="advice-copy">
          <p className="section-no">结果提示</p>
          <h2>把你的锋芒，<br/>用在对的地方。</h2>
          <div className="advice-points">
            <article><b>你的优势</b><p>{detail.benefit}</p></article>
            <article><b>需要留意</b><p>{weapon.suggestion}</p></article>
            <article><b>下一次可以这样做</b><p>遇到需要推进的事，先用你的「{strongest}」判断关键点，再用「{second}」把决定落实成所有人能接住的一步。</p></article>
          </div>
          <div className="alt-weapons"><b>与你接近的另两器</b>{alternatives.map((w,i)=><span key={w.name}><i>0{i+2}</i>{w.name}<em>{w.range}</em></span>)}</div>
        </div>
      </section>

      <section className="result-actions">
        <div><p>一次选择，是当下的倒影</p><h2>换一组选择，<br/>再看你的答案。</h2></div>
        <div className="action-row"><button onClick={() => { localStorage.removeItem('arsenal-answers'); window.location.href='/quiz'; }}>重新测试 <span>↻</span></button><a href="/">返回主页 <span>→</span></a></div>
      </section>
    </main>
  );
}
