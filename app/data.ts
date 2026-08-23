export type Trait = 'reach' | 'force' | 'tempo' | 'control' | 'daring' | 'ingenuity' | 'guard' | 'discipline';
export type Scores = Record<Trait, number>;
export type Option = { text: string; weights: Partial<Scores> };
export type Question = { type: '情境' | '价值观' | '直觉' | '自评'; text: string; note: string; options: Option[] };
export type Weapon = { name: string; category: string; range: string; source: string; vector: Scores; motto: string; analysis: string; suggestion: string };

export const traits: { key: Trait; label: string }[] = [
  { key:'reach', label:'全局判断' }, { key:'force', label:'行动力量' }, { key:'tempo', label:'反应速度' }, { key:'control', label:'掌控局面' },
  { key:'daring', label:'做决定' }, { key:'ingenuity', label:'想新办法' }, { key:'guard', label:'保护意识' }, { key:'discipline', label:'稳定耐心' },
];

const O = (text: string, weights: Partial<Scores>): Option => ({ text, weights });
export const questions: Question[] = [
  { type:'情境', text:'你在黑夜中听到院外有异响。', note:'选择你的第一反应', options:[O('留在暗处，先判断声音从何而来',{reach:2,control:2,discipline:2}),O('立刻出门，在对方未站稳前面对',{tempo:2,daring:3}),O('唤醒同伴，守住最窄的入口',{guard:3,control:2}),O('制造另一处声响，迫使对方现身',{ingenuity:3,control:2})]},
  { type:'价值观', text:'一场胜利中，你最希望留下什么？', note:'没有正确答案', options:[O('从一开始就掌握局势',{control:3,reach:1}),O('在关键时刻敢于押上一切',{daring:3,force:2}),O('为同伴留出安全退路',{guard:3,discipline:2}),O('用对手从未想过的方法结束',{ingenuity:3,tempo:1})]},
  { type:'直觉', text:'四条路通向同一座城，你会走哪条？', note:'凭直觉选择', options:[O('人迹罕至的山脊',{reach:2,discipline:2}),O('最短却最陡的峡谷',{daring:3,tempo:2}),O('旋绕而安全的河岸',{guard:3,control:1}),O('地图上没画出的旧道',{ingenuity:3,daring:1})]},
  { type:'自评', text:'事情突然失控时，你通常是哪一种人？', note:'想象最近一次真实经历', options:[O('迅速决定，边行动边修正',{tempo:3,daring:2}),O('一句话让大家先停下来',{control:3,guard:1}),O('找到那个真正的突破口',{force:2,discipline:2}),O('将现有工具拼出新解法',{ingenuity:3,tempo:1})]},
  { type:'情境', text:'对方人数更多，但尚未发现你。', note:'你会怎样创造优势', options:[O('绕到能看见全局的高处',{reach:3,control:2}),O('只对最关键的目标出手',{discipline:3,force:2}),O('把他们引入不能并排的地形',{guard:2,control:3}),O('改变自己的身份，混入其中',{ingenuity:3,daring:2})]},
  { type:'价值观', text:'你更愿意被人如何信任？', note:'选最接近的一项', options:[O('站在远处，也能看清事情',{reach:3,discipline:1}),O('需要打破僵局时，第一个想到我',{force:3,daring:2}),O('在一片混乱里，依然稳得住',{guard:2,discipline:3}),O('看见别人忽略的可能',{ingenuity:3,control:1})]},
  { type:'直觉', text:'你在桌上看到四枚无字令牌。', note:'你会拿起', options:[O('最轻、最薄的那枚',{tempo:3,discipline:1}),O('边缘磨损最多的那枚',{force:2,guard:2}),O('温度与其他不同的那枚',{ingenuity:3,control:1}),O('离自己最远的那枚',{reach:3,daring:1})]},
  { type:'自评', text:'与人意见不合时，你更常用哪种方式？', note:'不要选“应该”，选“通常”', options:[O('直接说出最难说的那句话',{force:2,daring:3}),O('一层层确认分歧到底在哪',{control:3,discipline:2}),O('先保住彼此的关系再谈',{guard:3,tempo:1}),O('换个问题，让对方自己看见矛盾',{ingenuity:3,reach:1})]},
  { type:'情境', text:'你只有一次传递消息的机会。', note:'你最在意什么', options:[O('让它到得足够远',{reach:3,force:1}),O('让它到得足够快',{tempo:3,daring:1}),O('让它绝不会被误解',{discipline:3,control:2}),O('让只有对的人能看懂',{ingenuity:3,guard:1})]},
  { type:'价值观', text:'一件工具最吸引你的品质是？', note:'凭第一印象', options:[O('一目了然，没有多余部件',{discipline:3,force:1}),O('能在很多情境中改变用法',{ingenuity:3,control:1}),O('即使失误，仍留有余地',{guard:3,reach:1}),O('一旦出手，效果明确',{force:3,daring:2})]},
  { type:'直觉', text:'你更容易被哪一种节奏带动？', note:'想象音乐、走路或工作的节拍', options:[O('短促、密集、不给空隙',{tempo:3,daring:1}),O('缓慢、稳定、逐步推进',{discipline:3,guard:2}),O('平静很久，然后一次爆发',{force:3,control:1}),O('不断变化，不让人猜到下一拍',{ingenuity:3,tempo:2})]},
  { type:'自评', text:'进入陌生环境时，你的注意力首先落在？', note:'回想一个真实场景', options:[O('出口、通道与距离',{reach:3,guard:2}),O('谁在影响整个场面',{control:3,daring:1}),O('手边有什么可以利用',{ingenuity:3,force:1}),O('当下最需要完成的事',{discipline:3,tempo:2})]},
  { type:'情境', text:'队伍必须穿过一段开阔地。', note:'你会主动承担', options:[O('去前方找出最稳妥的路线',{reach:3,discipline:2}),O('走在最外侧，随时截住意外',{guard:3,tempo:1}),O('留在中间，让所有人步调一致',{control:3,discipline:1}),O('故意留下一个假痕迹',{ingenuity:3,daring:1})]},
  { type:'价值观', text:'你如何理解“强大”？', note:'选最令你信服的说法', options:[O('让别人无法轻易迫近',{reach:2,guard:3}),O('承受一切之后仍然站立',{guard:3,discipline:2}),O('在需要时改变游戏规则',{ingenuity:3,daring:1}),O('把全部力量放在一个决定上',{force:3,daring:2})]},
  { type:'直觉', text:'一阵风吹过，你最先注意到？', note:'不要思考象征意义', options:[O('屋檐下瞬间翻起的纸角',{tempo:3,ingenuity:1}),O('远处树林整体的方向',{reach:3,control:1}),O('一根始终不动的柱子',{discipline:3,guard:2}),O('门突然合上的声音',{force:3,daring:1})]},
  { type:'自评', text:'你学习一件新事物的方式更接近？', note:'以你真正会采取的方式为准', options:[O('先掌握标准动作，重复到稳定',{discipline:3,control:2}),O('直接开始，错了立刻重来',{tempo:3,daring:2}),O('先理解它能与什么组合',{ingenuity:3,reach:1}),O('先看清最常见的失败在哪',{guard:3,discipline:1})]},
  { type:'情境', text:'你与对手都在等待一个空隙。', note:'你更可能', options:[O('用一个假动作制造空隙',{ingenuity:3,tempo:2}),O('不等了，直接让局面发生变化',{daring:3,force:2}),O('继续等，直到空隙真正出现',{discipline:3,control:2}),O('后退半步，让对方先暴露意图',{reach:2,guard:3})]},
  { type:'价值观', text:'如果必须舍弃一项优势，你最不愿放弃？', note:'它可能也是你的依赖', options:[O('先看清再行动的时间',{reach:2,discipline:3}),O('直接改变局面的力量',{force:3,daring:1}),O('为失败留下的第二条路',{guard:3,control:1}),O('不被常规限制的自由',{ingenuity:3,tempo:1})]},
  { type:'直觉', text:'你更想站在哪个位置看一场大雨？', note:'选画面最清晰的一个', options:[O('高塔顶层，看雨线越过全城',{reach:3,discipline:1}),O('长廊尽头，看风改变雨势',{control:2,ingenuity:2}),O('屋檐下，离雨幕只有一步',{daring:2,tempo:3}),O('窗内灯旁，听雨不被淋湿',{guard:3,discipline:2})]},
  { type:'自评', text:'别人对你最常见的误解可能是？', note:'选曾真实发生过的', options:[O('以为我冷淡，其实我在观察',{reach:2,discipline:3}),O('以为我冲动，其实我已经决定',{daring:3,tempo:2}),O('以为我保守，其实我在保护重要的事',{guard:3,control:2}),O('以为我跳跃，其实我看见了连接',{ingenuity:3,reach:1})]},
  { type:'情境', text:'你必须带一件不熟悉的工具完成任务。', note:'你会怎么开始', options:[O('先测试它的极限在哪',{force:2,daring:3}),O('先找到最简单可靠的用法',{discipline:3,guard:2}),O('先将它放到更合适的位置',{reach:3,control:2}),O('先试一种它原本没被设计来做的事',{ingenuity:3,tempo:1})]},
  { type:'价值观', text:'当你已经占据优势时，更认可哪种做法？', note:'选你最认同的', options:[O('等到时机真正成熟再出手',{discipline:3,control:2}),O('把力量留给最关键的一击',{force:2,guard:2}),O('不让情绪缩短自己的视野',{reach:3,discipline:1}),O('有奇招时，也愿意回到简单办法',{ingenuity:3,control:1})]},
  { type:'直觉', text:'面对一扇未知的门，你希望门后是？', note:'选最令你好奇的', options:[O('一条能通往很远地方的路',{reach:3,daring:1}),O('一间摆满奇异工具的工坊',{ingenuity:3,tempo:1}),O('一座结构完整、秩序分明的书库',{discipline:3,control:2}),O('一个正在等候你的强大对手',{daring:3,force:2})]},
  { type:'自评', text:'到了真正重要的时刻，你最依赖自己的？', note:'这是最后一题', options:[O('在压力下仍能看清全局',{reach:2,control:3}),O('不犹豫地完成那个决断',{daring:3,force:2}),O('不让自己与别人轻易受伤',{guard:3,discipline:2}),O('在没有路的地方找到一条路',{ingenuity:3,tempo:2})]},
];

const S = (v: number[]): Scores => ({ reach:v[0], force:v[1], tempo:v[2], control:v[3], daring:v[4], ingenuity:v[5], guard:v[6], discipline:v[7] });
type Group = { category:string; range:string; source:string; names:string[]; base:number[]; motto:string; analysis:string; suggestion:string };
const groups: Group[] = [
  {category:'剑器',range:'近程',source:'军阵·佩饰·武术',names:['青铜剑','铁剑','汉剑','环首剑','唐制仪刀','长剑','短剑','双剑','子母剑','鱼肠剑'],base:[3,4,7,8,5,4,5,8],motto:'藏锋于直，定势于心。',analysis:'你偏爱清晰、准确与有分寸的行动。你并不排斥决断，只是希望每次出手都有理由。',suggestion:'保留你的标准，也允许自己在信息不完整时先走一步。'},
  {category:'刀器',range:'近程',source:'军阵·民间·武术',names:['环首刀','横刀','障刀','陌刀','朴刀','腰刀','雁翎刀','柳叶刀','牛尾刀','蝴蝶双刀'],base:[2,8,8,4,8,3,4,5],motto:'路已看定，便一往无前。',analysis:'你的优势在于把判断迅速变成行动。与其让局面久拖，你更愿意主动切开僵局。',suggestion:'果断之前多看一眼代价；你不需要变慢，只需要让快更准。'},
  {category:'枪矛',range:'中远程',source:'军阵·骑战·武术',names:['矛','长矛','铁枪','长枪','大枪','马槊','步槊','钩镰枪','鸦项枪','梨花枪'],base:[9,6,6,8,5,3,5,8],motto:'一线之内，尽在掌中。',analysis:'你擅长在行动之前建立边界，用距离与秩序让问题变得可控。',suggestion:'边界是你的力量，但亲近不总是入侵；偶尔允许事物进入你的圆内。'},
  {category:'戈戟',range:'中远程',source:'先秦军阵·车战·仪仗',names:['青铜戈','长胡戈','短胡戈','援戈','青铜戟','卤字戟','方天戟','手戟','双戟','鸡鸣戟'],base:[8,7,5,9,6,6,5,7],motto:'非止一锋，变化皆为所用。',analysis:'你不喜欢单一功能的答案。你会同时看到牵制、转化与下一步，把复杂变成优势。',suggestion:'你可以继续处理复杂，但要当心为了保留所有选项而延迟最重要的一击。'},
  {category:'斧钺钩叉',range:'近中程',source:'军阵·仪仗·民间',names:['战斧','长柄斧','短钺','大钺','钩','虎头钩','鹿角钩','三股叉','飞鱼叉','月牙铲'],base:[4,9,4,5,8,4,5,6],motto:'不与坚固周旋，只令它改变。',analysis:'你对核心问题有很强的辨识力，不容易被枝节拖住。当需要破局时，你愿意承担冲击。',suggestion:'把“破开”之后的“如何重建”也纳入计划，你的力量会更持久。'},
  {category:'锤鞭锏',range:'近程',source:'军阵·骑战·武术',names:['铜锤','铁锤','瓜锤','蒜头骨朵','铁骨朵','节鞭','铁鞭','单锏','双锏','狼牙棒'],base:[2,9,4,6,7,2,8,8],motto:'重不在形，在于不可动摇。',analysis:'你给人的可靠感来自稳定与承重。你不必频繁表态，一旦认定，就很难被动摇。',suggestion:'稳固不等于独自承受。在负荷过重之前开口，也是一种定力。'},
  {category:'软兵',range:'近中程',source:'武术·民间·奇门',names:['流星锤','双流星锤','绳镖','飞爪','九节鞭','三节棍','两节棍','铁链夹棒','链子枪','锦绳套索'],base:[5,5,9,6,7,10,3,4],motto:'轨迹不定，意图始终在手。',analysis:'你的思维具有流动性，擅长从意外的角度进入问题。别人看见变化，你看见可以利用的轨迹。',suggestion:'奇思需要一个稳定的支点。为自己设定一两条不轻易改变的原则。'},
  {category:'弓弩',range:'远程',source:'军阵·守城·狩猎',names:['角弓','长弓','稍弓','步弓','骑弓','擘张弩','蹶张弩','臂张弩','连弩','床弩'],base:[10,6,4,9,4,4,6,10],motto:'未必近身，局势早已决定。',analysis:'你习惯拉开距离，先理解结构再投入力量。你对时机有耐心，也尊重准备的价值。',suggestion:'不是每件事都需要看见完整轨迹才开始。给近在眼前的感受留一些位置。'},
  {category:'投掷兵器',range:'远程',source:'军阵·武术·民间',names:['梭枪（投枪）','短标','投矛','飞石索','弹弓','飞刀','飞镖','袖箭','铁蒺藜','弹丸'],base:[9,4,9,7,7,8,2,6],motto:'一念既发，不再追问路程。',analysis:'你擅长在极短的窗口里抓住机会。你把敏锐、预判和少量决定性行动结合在一起。',suggestion:'敏锐让你快人一步，但也要为误判设置缓冲，尤其在不可撤回的事上。'},
  {category:'棍杖',range:'中程',source:'军阵·民间·武术',names:['长棍','齐眉棍','哨棒','梢子棍','狼牙棍','铁杖','禅杖','行者棒','枷棒','扁担'],base:[6,6,7,7,5,5,8,7],motto:'朴素之物，亦有万千路数。',analysis:'你相信真正的能力不依赖华丽条件。你适应性强，愿意把基本功做到可信。',suggestion:'你很会用现有条件解决问题，但也值得为自己争取更好的工具与支持。'},
  {category:'奇门器械',range:'近中程',source:'武术·民间·演义',names:['铁扇','拂尘','判官笔','峨眉刺','铁尺','手钩','铁筷','阴阳锐','乾坤圈','长凳'],base:[4,3,8,8,5,10,5,6],motto:'常物无常用，所见即所能。',analysis:'你不太被物件的原定义限制，对身份、方法与场景都有再解释能力。',suggestion:'让别人跟得上你的转换。说出你看见的连接，创意才能成为共识。'},
  {category:'盾牌防御',range:'近程',source:'军阵·守城·武术',names:['木盾','藤牌','团牌','旁牌','燕尾牌','手牌','挨牌','步兵长盾','钩镶盾','铁护臂'],base:[2,5,4,8,3,3,10,9],motto:'守住不是停留，而是为下一步保留。',analysis:'你本能地注意什么不能失去。你的谨慎不是退缩，而是为人和事建立可持续的空间。',suggestion:'保护者也需要被保护。不要总把自己放在所有冲击的最前面。'},
];

export const weapons: Weapon[] = groups.flatMap((g, gi) => g.names.map((name, i) => {
  const vector = g.base.map((n, d) => Math.max(1, Math.min(10, n + (((i * 3 + d * 2 + gi) % 5) - 2)))) as number[];
  return { name, category:g.category, range:g.range, source:g.source, vector:S(vector), motto:g.motto, analysis:g.analysis, suggestion:g.suggestion };
}));

export function calculateResult(answers: number[]): { weapon: Weapon; alternatives: Weapon[]; scores: Scores; confidence: number } {
  const scores = S([0,0,0,0,0,0,0,0]);
  answers.forEach((answer, qi) => {
    const option = questions[qi]?.options[answer];
    if (!option) return;
    Object.entries(option.weights).forEach(([k,v]) => { scores[k as Trait] += v || 0; });
  });
  // 24 题的原始权重并非完全等量：创新、耐心等特质被提及得更频繁。
  // 先按全题库的出现总权重校正，再归一化，避免某一特质仅因题目数量更多而占优。
  const traitCalibration: Scores = S([1.043,1.323,1.292,1.024,1.064,.786,.904,.822]);
  const calibrated = Object.fromEntries(Object.entries(scores).map(([k,v]) => [k, v * traitCalibration[k as Trait]])) as Scores;
  const max = Math.max(...Object.values(calibrated), 1);
  const normalized = Object.fromEntries(Object.entries(calibrated).map(([k,v]) => [k, (v / max) * 10])) as Scores;
  const signature = answers.reduce((hash,n,i) => (hash * 33 + n * 7 + i) >>> 0, 5381);
  const rankedGroups = groups.map((group) => ({
    group,
    distance: traits.reduce((sum,t,i) => sum + Math.pow(normalized[t.key] - group.base[i], 2), 0),
  })).sort((a,b) => a.distance - b.distance);
  // 匹配度作为权重而不是硬阈值：相近门类更容易出现，但 12 个门类均保留入选机会。
  // 这使结果不会被某一道题锁死，也避免著名刀剑持续挤压冷门器械。
  // 根据随机作答模拟重新校准：12 个门类会稳定靠近各自 1/12 的出现机会。
  const balance: Record<string,number> = {'刀器':1.406,'剑器':1.112,'奇门器械':1.01,'弓弩':1.19,'戈戟':.709,'投掷兵器':1.11,'斧钺钩叉':.982,'枪矛':.913,'棍杖':.614,'盾牌防御':1.91,'软兵':1,'锤鞭锏':1.578};
  const weighted = rankedGroups.map(x => ({ ...x, weight:Math.exp(-x.distance / 42) * (balance[x.group.category] || 1) }));
  const totalWeight = weighted.reduce((sum,x) => sum + x.weight, 0);
  let cursor = ((signature ^ (signature >>> 16)) >>> 0) / 4294967296 * totalWeight;
  let selectedGroup = weighted[weighted.length - 1];
  for (const item of weighted) { cursor -= item.weight; if (cursor <= 0) { selectedGroup = item; break; } }
  const candidates = weapons.filter(w => w.category === selectedGroup.group.category);
  const weapon = candidates[signature % candidates.length];
  const nearestInOtherGroups = rankedGroups.slice(0,3)
    .filter(x => x.group.category !== weapon.category)
    .map(x => weapons.filter(w => w.category === x.group.category)
      .sort((a,b) => traits.reduce((s,t)=>s+Math.pow(normalized[t.key]-a.vector[t.key],2),0) - traits.reduce((s,t)=>s+Math.pow(normalized[t.key]-b.vector[t.key],2),0))[0]);
  const sameGroupAlt = candidates[(candidates.indexOf(weapon) + 3) % candidates.length];
  const alternatives = [nearestInOtherGroups[0], sameGroupAlt].filter(Boolean) as Weapon[];
  const confidence = Math.max(72, Math.min(94, Math.round(94 - selectedGroup.distance / 8)));
  return { weapon, alternatives, scores:normalized, confidence };
}
