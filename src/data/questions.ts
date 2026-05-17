import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    prompt: '朋友约饭迟到 40 分钟，只发来一句“快到了”。你会？',
    options: [
      { id: 'a', text: '先点菜，顺便给对方留台阶。', weights: { empathy: 3, socialPolish: 2, responsibility: 1 } },
      { id: 'b', text: '表面说没事，心里已经开庭。', weights: { sensitivity: 3, resentmentMemory: 3, control: 1 } },
      { id: 'c', text: '直接问：“快到了是几分钟？”', weights: { order: 3, control: 2, justice: 1 } },
      { id: 'd', text: '拍空椅子发朋友圈，配文“有人活着，但没完全出现”。', weights: { performance: 2, selfPackaging: 3, absurdResilience: 2 } }
    ]
  },
  {
    id: 2,
    prompt: '你临时被推到所有人面前做开场介绍，灯一亮，台下安静得能听见空调声。你会？',
    sourceNote: '灵感来自音乐剧里常见的开场独白时刻：一个人先站出来，整个故事才开始转动。',
    options: [
      { id: 'a', text: '先笑一下，按自己熟悉的节奏把场面稳住。', weights: { socialPolish: 3, performance: 2, control: 1 } },
      { id: 'b', text: '迅速找重点，直接把该说的说清楚。', weights: { ambition: 2, order: 3, responsibility: 1 } },
      { id: 'c', text: '把话筒递给旁边的人，自己先退半步观察局势。', weights: { observation: 4, survival: 2, empathy: 1 } },
      { id: 'd', text: '心里已经空白，但脸上装作“这是我的主场”。', weights: { selfPackaging: 3, performance: 3, survival: 1 } }
    ]
  },
  {
    id: 3,
    prompt: '你在城里做最底层的临时工，住在地下室，冬天没有暖气。有人说：“签这份合同，至少有饭吃。”你知道条件不公平，但今晚真的很冷。你会？',
    sourceNote: '灵感来自《Hadestown》里欧律狄刻面对寒冷、饥饿和冥界工约的处境。',
    options: [
      { id: 'a', text: '签，先活下来，再谈理想。', weights: { survival: 4, order: 1, absurdResilience: 1 } },
      { id: 'b', text: '不签，越是这种时候越不能把自己卖掉。', weights: { justice: 3, control: 2, sensitivity: 1 } },
      { id: 'c', text: '拉着身边人一起商量，不想一个人决定全家的明天。', weights: { empathy: 3, responsibility: 2, sensitivity: 1 } },
      { id: 'd', text: '把合同藏起来，准备找机会揭穿这套生意。', weights: { justice: 3, observation: 2, control: 1 } }
    ]
  },
  {
    id: 4,
    prompt: '小组作业有人不干活，最后还想署名。你会？',
    options: [
      { id: 'a', text: '整理分工记录，温和但准确地发群里。', weights: { justice: 3, order: 2, socialPolish: 2 } },
      { id: 'b', text: '先忍，最后连三周前的旧账一起翻。', weights: { resentmentMemory: 4, sensitivity: 2, justice: 2 } },
      { id: 'c', text: '直接重排任务，不给他继续混。', weights: { control: 3, responsibility: 2, order: 2 } },
      { id: 'd', text: '把展示做成自己的主场，让他像路过的。', weights: { performance: 3, ambition: 3, selfPackaging: 2 } }
    ]
  },
  {
    id: 5,
    prompt: '你是移民家庭的孩子，口音、姓氏、出身都让你在学校里格格不入。终于有机会参加重要演讲比赛，却有人说你“太急着证明自己”。你会？',
    sourceNote: '灵感来自《Hamilton》里汉密尔顿作为外来者、孤儿和野心家的成长处境。',
    options: [
      { id: 'a', text: '把演讲稿改到能当场让所有人闭嘴。', weights: { ambition: 4, performance: 2, resentmentMemory: 1 } },
      { id: 'b', text: '先去安慰同样被看低的人，不能只顾自己出头。', weights: { empathy: 3, justice: 2, responsibility: 1 } },
      { id: 'c', text: '把这句话记下来，当成以后离开的燃料。', weights: { resentmentMemory: 3, sensitivity: 2, ambition: 2 } },
      { id: 'd', text: '先观察规则，再用规则赢回来。', weights: { order: 3, control: 2, observation: 2 } }
    ]
  },
  {
    id: 6,
    prompt: '排练到一半，负责人突然说：“这段不对，我们全部重来。”你第一反应是？',
    sourceNote: '灵感来自排练厅文化：真正的高光往往来自反复推翻、重建、再发光。',
    options: [
      { id: 'a', text: '可以，但请先说清楚哪里不对。', weights: { order: 3, control: 2, responsibility: 1 } },
      { id: 'b', text: '立刻换一种演法，先用身体和气势把新版本试出来。', weights: { performance: 4, absurdResilience: 2, ambition: 1 } },
      { id: 'c', text: '心里叹气，但会帮大家把情绪接住。', weights: { empathy: 3, socialPolish: 2, responsibility: 1 } },
      { id: 'd', text: '先沉默记下这个改动，回去自己慢慢消化。', weights: { sensitivity: 3, observation: 2, resentmentMemory: 1 } }
    ]
  },
  {
    id: 7,
    prompt: '你生来就和别人不一样，外貌、声音、习惯都被当成笑话。有人告诉你：只要配合他们撒一个谎，就能换来奖学金和安全的未来。你会？',
    sourceNote: '灵感来自《Wicked》里艾芙芭被标签化、被权力利用，又拒绝配合谎言的弧光。',
    options: [
      { id: 'a', text: '当场拒绝，哪怕从此更难过。', weights: { justice: 4, control: 2, sensitivity: 1 } },
      { id: 'b', text: '先答应，等有能力后再改变局面。', weights: { survival: 3, control: 2, ambition: 1 } },
      { id: 'c', text: '问清楚这个谎会伤害谁。', weights: { empathy: 3, justice: 3, observation: 1 } },
      { id: 'd', text: '把这件事讲成一个更好听的版本，先保住形象。', weights: { selfPackaging: 4, socialPolish: 2, performance: 1 } }
    ]
  },
  {
    id: 8,
    prompt: '你被误会了，但解释起来很麻烦。你会？',
    options: [
      { id: 'a', text: '解释，必须解释，世界不能这样运行。', weights: { justice: 3, control: 2, sensitivity: 2 } },
      { id: 'b', text: '不解释，但会记住这件事。', weights: { resentmentMemory: 4, sensitivity: 2, observation: 1 } },
      { id: 'c', text: '看对方值不值得，不值得就算。', weights: { survival: 3, observation: 2, control: 1 } },
      { id: 'd', text: '把误会包装成新人设，先用起来。', weights: { selfPackaging: 4, performance: 2, absurdResilience: 1 } }
    ]
  },
  {
    id: 9,
    prompt: '后台突然停电，下一场马上开始，所有人都慌了。你会？',
    sourceNote: '灵感来自剧场后台的突发状况：真正的演出精神往往不是完美，而是出事也要把幕拉开。',
    options: [
      { id: 'a', text: '先找手电、确认出口和备用路线。', weights: { survival: 4, order: 2, observation: 1 } },
      { id: 'b', text: '站出来分配任务，让每个人知道自己该干什么。', weights: { responsibility: 3, control: 3, order: 1 } },
      { id: 'c', text: '先安抚最慌的人，再想办法补救。', weights: { empathy: 3, socialPolish: 2, responsibility: 1 } },
      { id: 'd', text: '觉得离谱，但已经开始想这事以后能不能讲成段子。', weights: { absurdResilience: 4, performance: 2, selfPackaging: 1 } }
    ]
  },
  {
    id: 10,
    prompt: '朋友深夜发来一句“我没事”。你会？',
    options: [
      { id: 'a', text: '直接打电话，因为“没事”通常就是有事。', weights: { empathy: 3, responsibility: 2, control: 1 } },
      { id: 'b', text: '发一段认真分析，帮他拆问题。', weights: { observation: 2, responsibility: 2, ambition: 1 } },
      { id: 'c', text: '陪他聊废话，不逼他说。', weights: { empathy: 4, socialPolish: 2, survival: 1 } },
      { id: 'd', text: '问：“谁惹你了？名字。”', weights: { justice: 3, resentmentMemory: 2, performance: 1 } }
    ]
  },
  {
    id: 11,
    prompt: '你曾经被人冤枉，失去家庭、工作和名声。多年后你回来，发现伤害你的人依然体面地坐在高位。你手里终于有了报复机会，而且没人会知道。你会？',
    sourceNote: '灵感来自《Sweeney Todd》里陶德回到伦敦后面对 Turpin 法官的复仇执念。',
    options: [
      { id: 'a', text: '立刻动手，旧账不能永远烂在心里。', weights: { resentmentMemory: 4, justice: 2, control: 1 } },
      { id: 'b', text: '停一下，怕自己变成同样可怕的人。', weights: { empathy: 3, sensitivity: 2, justice: 1 } },
      { id: 'c', text: '先确认真相，不能让怒气替你做决定。', weights: { order: 3, observation: 2, control: 2 } },
      { id: 'd', text: '把这段经历写下来，至少不能让真相消失。', weights: { ambition: 2, sensitivity: 2, justice: 2 } }
    ]
  },
  {
    id: 12,
    prompt: '你拿到一首很难唱的独白歌，歌词像把你的心事全写出来了。你会？',
    sourceNote: '音乐剧独唱常常不是为了炫技，而是角色终于无法再装没事。',
    options: [
      { id: 'a', text: '先拆结构、标重音，像解一道很难的题。', weights: { order: 3, control: 2, observation: 1 } },
      { id: 'b', text: '一边害怕一边想挑战，因为这首歌值得。', weights: { romance: 3, ambition: 2, sensitivity: 2 } },
      { id: 'c', text: '唱到最真那句时故意收一点，不想被看穿。', weights: { sensitivity: 3, control: 2, socialPolish: 1 } },
      { id: 'd', text: '练到凌晨，但嘴上说“还行，不难”。', weights: { ambition: 3, selfPackaging: 2, responsibility: 2 } }
    ]
  },
  {
    id: 13,
    prompt: '你和妹妹同时喜欢上同一个聪明、危险、前途无量的人。你先看懂了这个人，也先心动了，但你知道妹妹更适合得到幸福。你会？',
    sourceNote: '灵感来自《Hamilton》里安杰丽卡在婚礼祝酒中回望自己与汉密尔顿初遇的情节。',
    options: [
      { id: 'a', text: '退出，把话说得漂亮。', weights: { socialPolish: 3, empathy: 3, sensitivity: 2 } },
      { id: 'b', text: '争取一次，哪怕这会让场面变得很难看。', weights: { romance: 3, ambition: 2, control: 1 } },
      { id: 'c', text: '立刻判断这段关系会带来什么后果。', weights: { observation: 3, order: 2, control: 2 } },
      { id: 'd', text: '把自己说服成旁观者，之后再慢慢心碎。', weights: { sensitivity: 3, socialPolish: 2, resentmentMemory: 1 } }
    ]
  },
  {
    id: 14,
    prompt: '朋友说“你太敏感了”，你会？',
    options: [
      { id: 'a', text: '沉默，但把这句话反复审判。', weights: { sensitivity: 3, resentmentMemory: 3, observation: 1 } },
      { id: 'b', text: '解释敏感不是问题，粗糙才是。', weights: { justice: 2, sensitivity: 3, control: 1 } },
      { id: 'c', text: '笑着糊弄过去，但关系会悄悄降级。', weights: { socialPolish: 2, survival: 2, resentmentMemory: 1 } },
      { id: 'd', text: '说“对啊，所以我才能发现你很烦”。', weights: { performance: 2, justice: 2, absurdResilience: 2 } }
    ]
  },
  {
    id: 15,
    prompt: '你发现自己的角色只有三句台词，但每次出场都很关键。你会怎么对待？',
    sourceNote: '很多群像作品里，戏份不多的人也可能是气氛、转折和世界观的关键。',
    options: [
      { id: 'a', text: '三句也要练到像主角一样准。', weights: { responsibility: 3, order: 2, performance: 1 } },
      { id: 'b', text: '既然戏少，就更要让人记住。', weights: { performance: 3, selfPackaging: 2, ambition: 1 } },
      { id: 'c', text: '接受边缘位置，但偷偷观察全局。', weights: { observation: 4, survival: 2, empathy: 1 } },
      { id: 'd', text: '去帮别人对词，反正戏少也不能闲着。', weights: { empathy: 3, responsibility: 2, socialPolish: 1 } }
    ]
  },
  {
    id: 16,
    prompt: '你刚进一个封闭的小圈子，就发现这里也讲流量。只要把自己的糟糕经历包装成悲惨故事，就能获得关注和机会。你会？',
    sourceNote: '灵感来自《Chicago》里洛克茜把犯罪、媒体和公众同情变成自我营销的情节。',
    options: [
      { id: 'a', text: '包装，先让自己被看见再说。', weights: { selfPackaging: 4, performance: 3, ambition: 1 } },
      { id: 'b', text: '不包装，我不想把自己演成商品。', weights: { justice: 3, control: 2, sensitivity: 1 } },
      { id: 'c', text: '躲开镜头，先确认这里到底谁说了算。', weights: { observation: 4, survival: 2, control: 1 } },
      { id: 'd', text: '顺势讲成笑话，至少别让别人先定义你。', weights: { absurdResilience: 3, socialPolish: 2, selfPackaging: 1 } }
    ]
  },
  {
    id: 17,
    prompt: '如果你的生活突然变成真人秀，你最担心被拍到什么？',
    options: [
      { id: 'a', text: '我私下其实很努力，装轻松装得很累。', weights: { ambition: 3, selfPackaging: 2, sensitivity: 2 } },
      { id: 'b', text: '我脑子里的吐槽比嘴上多十倍。', weights: { observation: 2, resentmentMemory: 2, sensitivity: 2 } },
      { id: 'c', text: '我有时很想赢，而且不想装不想赢。', weights: { ambition: 4, performance: 2, control: 1 } },
      { id: 'd', text: '我看起来稳定，其实每天都在缝自己。', weights: { responsibility: 3, absurdResilience: 3, socialPolish: 1 } }
    ]
  },
  {
    id: 18,
    prompt: '所有人同时唱着不同旋律，你发现旁边有人一直跑偏。你会？',
    sourceNote: '群唱的魅力在于混乱中的秩序：每个人唱自己的线，最后却要合成一个世界。',
    options: [
      { id: 'a', text: '直接提醒，不然整段都会塌。', weights: { order: 3, control: 2, justice: 1 } },
      { id: 'b', text: '私下帮对方找音，别让他太尴尬。', weights: { empathy: 3, socialPolish: 2, responsibility: 1 } },
      { id: 'c', text: '把自己的声部唱得更稳，先别被带跑。', weights: { control: 3, responsibility: 2, survival: 1 } },
      { id: 'd', text: '表面继续唱，心里已经给这段排了事故报告。', weights: { resentmentMemory: 2, observation: 2, absurdResilience: 1 } }
    ]
  },
  {
    id: 19,
    prompt: '最后一段旋律响起，灯光慢慢暗下去，你最容易想什么？',
    sourceNote: '终曲不只是收尾，它常常负责把角色的命运和观众自己的生活接在一起。',
    options: [
      { id: 'a', text: '这段故事到底想把我带到哪里。', weights: { observation: 3, sensitivity: 2, romance: 1 } },
      { id: 'b', text: '鼓掌要鼓到最后，给所有人一个体面收尾。', weights: { socialPolish: 3, empathy: 2, responsibility: 1 } },
      { id: 'c', text: '如果我是角色，我会不会做一样的选择。', weights: { empathy: 3, justice: 1, observation: 2 } },
      { id: 'd', text: '结束得太快了，但生活好像被轻轻推了一下。', weights: { romance: 3, absurdResilience: 2, sensitivity: 1 } }
    ]
  },
  {
    id: 20,
    prompt: '你最希望别人如何记住你？',
    options: [
      { id: 'a', text: '一个真的改变过什么的人。', weights: { ambition: 3, justice: 2, romance: 2 } },
      { id: 'b', text: '一个把日子过得漂亮的人。', weights: { socialPolish: 3, performance: 2, selfPackaging: 1 } },
      { id: 'c', text: '一个可靠到可以托付的人。', weights: { responsibility: 4, empathy: 2, order: 1 } },
      { id: 'd', text: '一个当时不显眼，但其实一直都在的人。', weights: { observation: 3, empathy: 2, survival: 1 } }
    ]
  }
];
