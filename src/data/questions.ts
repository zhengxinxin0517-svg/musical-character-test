import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    prompt: '朋友约饭迟到了半个多小时，只发来一句“快到了”。你会？',
    options: [
      {
        id: 'a',
        text: '饿了，吃饭最重要，先点菜再说啦。',
        weights: { survival: 7, empathy: 2, absurdResilience: 2 },
        personaScores: { eurydice: 4 }
      },
      {
        id: 'b',
        text: '笑着说“没事不着急”，心里默默扣分。',
        weights: { resentmentMemory: 7, sensitivity: 4, socialPolish: 3 },
        personaScores: { sweeney: 4 }
      },
      {
        id: 'c',
        text: '忍不了一点，直接问ta：“快到了是到哪儿了？还有几分钟？”',
        weights: { order: 7, control: 5, justice: 3 },
        personaScores: { javert: 4 }
      },
      {
        id: 'd',
        text: '拍张空椅子的照片发到小群里，幽默调侃，再补一张“鸽子精”的表情包。',
        weights: { selfPackaging: 7, performance: 5, absurdResilience: 3 },
        personaScores: { roxie: 4 }
      }
    ]
  },
  {
    id: 2,
    prompt: '你毫无准备，突然被推到台上让你即兴说一段。灯一亮，台下所有人都在安静地期待着你发言。你会？',
    options: [
      {
        id: 'a',
        text: '先笑一下稳住场面，飞快构思内容，眉飞色舞，娓娓道来。',
        weights: { ambition: 6, performance: 7, socialPolish: 3 },
        personaScores: { hamilton: 4 }
      },
      {
        id: 'b',
        text: '有点尴尬，直接表达“这次确实是没有准备，很突然”，然后努力想点话撑住这几分钟。',
        weights: { responsibility: 6, socialPolish: 5, absurdResilience: 4 },
        personaScores: { curtain: 4 }
      },
      {
        id: 'c',
        text: '不会有这种可能，灯亮之前我就消失，不可能被抓到台上。',
        weights: { observation: 7, survival: 5, sensitivity: 2 },
        personaScores: { plant: 4 }
      },
      {
        id: 'd',
        text: '直接僵住，向他人眼神求救，期待有人来把你救下台。',
        weights: { survival: 7, empathy: 4, sensitivity: 4 },
        personaScores: { eurydice: 4 }
      }
    ]
  },
  {
    id: 3,
    prompt: '你们一家都是城市里的最底层，温饱都是奢望。有黑心老板递来卖掉全家的“终身劳动合约”。你会？',
    sourceNote: '来自《Hadestown》：欧律狄刻面对寒冷、饥饿和冥界工约。',
    options: [
      {
        id: 'a',
        text: '必须签，就算没有自由也必须先活下来，活着比一切都重要。',
        weights: { survival: 9, order: 3, sensitivity: 2 },
        personaScores: { eurydice: 4 }
      },
      {
        id: 'b',
        text: '绝对不能签，越是这种时候越不能把自己都卖掉，自由是最可贵的。',
        weights: { justice: 9, control: 4, responsibility: 3 },
        personaScores: { elphaba: 4 }
      },
      {
        id: 'c',
        text: '拉着全家人一起商量，不想一个人决定全家人的明天。',
        weights: { empathy: 7, responsibility: 7, socialPolish: 2 },
        personaScores: { valjean: 4 }
      },
      {
        id: 'd',
        text: '迂回装傻，先离开，准备找机会曝光这套生意。',
        weights: { observation: 7, justice: 5, control: 4 },
        personaScores: { angelica: 4 }
      }
    ]
  },
  {
    id: 4,
    prompt: '小组作业有人不干活，最后还想署名。你会？',
    options: [
      {
        id: 'a',
        text: '表面笑嘻嘻说“没问题”，但在提交版本里偷偷把ta的名字删掉。',
        weights: { resentmentMemory: 7, control: 5, socialPolish: 3 },
        personaScores: { sweeney: 4 }
      },
      {
        id: 'b',
        text: '寻求老师帮助，希望老师给出解决方案。',
        weights: { order: 7, justice: 5, responsibility: 3 },
        personaScores: { javert: 4 }
      },
      {
        id: 'c',
        text: '直接开麦，疯狂艾特ta布置任务，不让他继续混。',
        weights: { performance: 7, control: 6, ambition: 4 },
        personaScores: { velma: 4 }
      },
      {
        id: 'd',
        text: '无所谓，我会把做好我的事情，让他像路过的。',
        weights: { ambition: 7, responsibility: 5, performance: 3 },
        personaScores: { hamilton: 4 }
      }
    ]
  },
  {
    id: 5,
    prompt: '你们是移民家庭的孩子，在学校格格不入，终于争取到演讲机会，却被说“太急着证明自己”。你会？',
    sourceNote: '来自《Hamilton》：外来者、孤儿和野心家一路把自己写进时代。',
    options: [
      {
        id: 'a',
        text: '拼命准备演讲，用自己的表现让所有人闭嘴。',
        weights: { ambition: 9, performance: 6, responsibility: 4 },
        personaScores: { hamilton: 4 }
      },
      {
        id: 'b',
        text: '我不能只顾自己出头，要当面问清楚ta，为同样被看低的孩子讨回公道。',
        weights: { justice: 8, empathy: 5, responsibility: 4 },
        personaScores: { elphaba: 4 }
      },
      {
        id: 'c',
        text: '很难过，会感受到很强的无力感，所有不好的回忆都涌上心头。',
        weights: { sensitivity: 8, resentmentMemory: 5, romance: 3 },
        personaScores: { phantom: 4 }
      },
      {
        id: 'd',
        text: '先忍着，等比完赛想办法回击。',
        weights: { resentmentMemory: 8, ambition: 4, control: 3 },
        personaScores: { sweeney: 4 }
      }
    ]
  },
  {
    id: 6,
    prompt: '排练到你的唱段时，你感觉自己表现很好，负责人却说：“这段不对，我们重来。”你第一反应是？',
    options: [
      {
        id: 'a',
        text: '有点噎住，但会调动气氛，先帮大家把情绪接住。',
        weights: { socialPolish: 7, empathy: 5, performance: 3 },
        personaScores: { glinda: 4 }
      },
      {
        id: 'b',
        text: '我可以改，但是你要先说清楚到底哪里不对。',
        weights: { order: 8, control: 5, justice: 3 },
        personaScores: { javert: 4 }
      },
      {
        id: 'c',
        text: '立刻换一种演法，先赶紧把戏排完。',
        weights: { performance: 7, ambition: 5, control: 3 },
        personaScores: { velma: 4 }
      },
      {
        id: 'd',
        text: '立刻反思，可能确实是我表现不好，回去慢慢消化复盘一下吧。',
        weights: { sensitivity: 8, observation: 4, resentmentMemory: 3 },
        personaScores: { phantom: 4 }
      }
    ]
  },
  {
    id: 7,
    prompt: '一觉醒来发现自己的“黑历史”被人翻出来，推上热搜了。你会？',
    options: [
      {
        id: 'a',
        text: '发现商机，马上包装新人设，黑红也是红。',
        weights: { selfPackaging: 9, performance: 7, socialPolish: 4 },
        personaScores: { roxie: 4 }
      },
      {
        id: 'b',
        text: '立刻发澄清长文，努力扭转局面。',
        weights: { ambition: 7, responsibility: 5, control: 4 },
        personaScores: { hamilton: 4 }
      },
      {
        id: 'c',
        text: '愤怒开麦，无差别攻击。',
        weights: { resentmentMemory: 8, justice: 5, performance: 4 },
        personaScores: { sweeney: 4 }
      },
      {
        id: 'd',
        text: '自觉理亏，彻底关机，宣布退网。',
        weights: { sensitivity: 8, survival: 5, control: 3 },
        personaScores: { phantom: 4 }
      }
    ]
  },
  {
    id: 8,
    prompt: '你突然收到一封神秘邀请函。你会？',
    options: [
      {
        id: 'a',
        text: '查来源、查时间、查地址、查风险，确保安全再说。',
        weights: { survival: 8, observation: 6, order: 4 },
        personaScores: { eurydice: 4 }
      },
      {
        id: 'b',
        text: '太神秘了，我必须去。',
        weights: { romance: 8, absurdResilience: 5, empathy: 2 },
        personaScores: { orpheus: 4 }
      },
      {
        id: 'c',
        text: '得带上朋友一起。',
        weights: { empathy: 7, responsibility: 5, survival: 3 },
        personaScores: { valjean: 4 }
      },
      {
        id: 'd',
        text: '不去，但会把邀请函收藏十年。',
        weights: { sensitivity: 8, resentmentMemory: 5, observation: 3 },
        personaScores: { phantom: 4 }
      }
    ]
  },
  {
    id: 9,
    prompt: '后台突然停电，下一场马上开始，所有人都慌了。你会？',
    sourceNote: '来自剧场后台：事故不会等人准备好，幕还是要拉开。',
    options: [
      {
        id: 'a',
        text: '先找手电、确认出口和备用路线。',
        weights: { survival: 8, order: 5, observation: 3 },
        personaScores: { eurydice: 4 }
      },
      {
        id: 'b',
        text: '站出来分配任务，让每个人知道自己该干什么。',
        weights: { responsibility: 8, control: 6, order: 3 },
        personaScores: { valjean: 4 }
      },
      {
        id: 'c',
        text: '先安抚好最慌的人，不能干扰正常演出。',
        weights: { socialPolish: 7, empathy: 5, responsibility: 3 },
        personaScores: { glinda: 4 }
      },
      {
        id: 'd',
        text: '有点离谱，幕后采访可以说说，挺有意思。',
        weights: { absurdResilience: 8, selfPackaging: 4, performance: 3 },
        personaScores: { lovett: 4 }
      }
    ]
  },
  {
    id: 10,
    prompt: '朋友哭着来找你。你会？',
    options: [
      {
        id: 'a',
        text: '抱住，开导，递纸，续命一条龙。',
        weights: { empathy: 9, responsibility: 5, socialPolish: 3 },
        personaScores: { valjean: 4 }
      },
      {
        id: 'b',
        text: '谁欺负你？我现在就去。',
        weights: { justice: 8, control: 4, empathy: 3 },
        personaScores: { elphaba: 4 }
      },
      {
        id: 'c',
        text: '先讲个烂笑话，让空气不那么痛。',
        weights: { absurdResilience: 8, socialPolish: 5, empathy: 3 },
        personaScores: { lovett: 4 }
      },
      {
        id: 'd',
        text: '不说话，陪他坐到天亮。',
        weights: { romance: 7, empathy: 6, sensitivity: 4 },
        personaScores: { orpheus: 4 }
      }
    ]
  },
  {
    id: 11,
    prompt: '多年后，伤害你让你失去一切的人依然体面地坐在高位。你手里终于有了报复机会。你会？',
    sourceNote: '来自《Sweeney Todd》：陶德回到伦敦后，旧账重新开张。',
    options: [
      {
        id: 'a',
        text: '立刻动手，旧账不能永远烂在心里。',
        weights: { resentmentMemory: 9, control: 5, justice: 4 },
        personaScores: { sweeney: 4 }
      },
      {
        id: 'b',
        text: '想想还是算了，怕自己变成同样可怕的人。',
        weights: { empathy: 7, sensitivity: 5, responsibility: 3 },
        personaScores: { valjean: 4 }
      },
      {
        id: 'c',
        text: '先确认情况、查清当年的真相，不能让怒气替你做决定。',
        weights: { order: 8, observation: 5, justice: 4 },
        personaScores: { javert: 4 }
      },
      {
        id: 'd',
        text: '选择放手，只是把这段故事记录下来。',
        weights: { observation: 7, sensitivity: 5, socialPolish: 3 },
        personaScores: { angelica: 4 }
      }
    ]
  },
  {
    id: 12,
    prompt: '你被分到一首很难唱的独白歌，但你个人非常喜欢这首曲子。你会？',
    sourceNote: '来自音乐剧独唱：角色不是突然爱唱歌，而是终于装不下去了。',
    options: [
      {
        id: 'a',
        text: '什么都不想，认真拆结构、标重音，努力准备。',
        weights: { performance: 7, order: 5, responsibility: 4 },
        personaScores: { velma: 4 }
      },
      {
        id: 'b',
        text: '试了试，犹豫要不要把机会让给别人。',
        weights: { empathy: 6, socialPolish: 5, sensitivity: 4 },
        personaScores: { angelica: 4 }
      },
      {
        id: 'c',
        text: '不想放过机会，一边紧张一边练，嘴上说“还行，不难”。',
        weights: { ambition: 8, responsibility: 5, selfPackaging: 4 },
        personaScores: { hamilton: 4 }
      },
      {
        id: 'd',
        text: '果断放弃，因为不想毁掉自己最爱的歌曲。',
        weights: { sensitivity: 8, romance: 5, control: 3 },
        personaScores: { phantom: 4 }
      }
    ]
  },
  {
    id: 13,
    prompt: '你和你的朋友同时喜欢上同一个人。你会？',
    sourceNote: '来自《Hamilton》：安杰丽卡在祝酒时回看初遇，心动和体面同时上场。',
    options: [
      {
        id: 'a',
        text: '果断退出，伪装好自己，把话说得漂亮。',
        weights: { socialPolish: 8, empathy: 5, sensitivity: 4 },
        personaScores: { angelica: 4 }
      },
      {
        id: 'b',
        text: '不计后果争取一次。',
        weights: { romance: 8, ambition: 5, control: 2 },
        personaScores: { orpheus: 4 }
      },
      {
        id: 'c',
        text: '立刻判断这段关系会带来什么后果，权衡利弊。',
        weights: { observation: 7, order: 5, survival: 4 },
        personaScores: { eurydice: 4 }
      },
      {
        id: 'd',
        text: '说服自己放手，之后再慢慢心碎。',
        weights: { sensitivity: 8, romance: 5, resentmentMemory: 3 },
        personaScores: { phantom: 4 }
      }
    ]
  },
  {
    id: 14,
    prompt: '朋友说“你太敏感了”，你会？',
    options: [
      {
        id: 'a',
        text: '沉默，反复复盘自己做了什么。',
        weights: { sensitivity: 8, observation: 5, resentmentMemory: 3 },
        personaScores: { phantom: 4 }
      },
      {
        id: 'b',
        text: '很疑惑，必须解释一下。',
        weights: { order: 7, control: 5, justice: 3 },
        personaScores: { javert: 4 }
      },
      {
        id: 'c',
        text: '笑着糊弄过去，但关系会悄悄降级。',
        weights: { socialPolish: 7, observation: 4, sensitivity: 3 },
        personaScores: { angelica: 4 }
      },
      {
        id: 'd',
        text: '直接说“对啊，所以我才能发现你很烦”。',
        weights: { justice: 7, performance: 4, control: 3 },
        personaScores: { elphaba: 4 }
      }
    ]
  },
  {
    id: 15,
    prompt: '你发现自己的角色只有三句台词，但每次出场都很关键。你会怎么对待？',
    options: [
      {
        id: 'a',
        text: '三句也要练到像主角一样准。',
        weights: { responsibility: 8, order: 5, performance: 3 },
        personaScores: { curtain: 4 }
      },
      {
        id: 'b',
        text: '既然戏少，就更要让人记住。',
        weights: { selfPackaging: 7, performance: 6, ambition: 3 },
        personaScores: { roxie: 4 }
      },
      {
        id: 'c',
        text: '欣然接受边缘位置，我喜欢观察。',
        weights: { observation: 9, survival: 4, empathy: 3 },
        personaScores: { plant: 4 }
      },
      {
        id: 'd',
        text: '去帮别人对词，反正戏少也不能闲着。',
        weights: { responsibility: 8, empathy: 5, socialPolish: 3 },
        personaScores: { valjean: 4 }
      }
    ]
  },
  {
    id: 16,
    prompt: '你最容易被什么东西吸引？',
    options: [
      {
        id: 'a',
        text: '危险但美的东西。',
        weights: { sensitivity: 8, romance: 6, control: 3 },
        personaScores: { phantom: 4 }
      },
      {
        id: 'b',
        text: '真诚到有点傻的人。',
        weights: { romance: 8, empathy: 6, absurdResilience: 3 },
        personaScores: { orpheus: 4 }
      },
      {
        id: 'c',
        text: '有用、能活、能吃饭的东西。',
        weights: { survival: 9, order: 4, observation: 3 },
        personaScores: { eurydice: 4 }
      },
      {
        id: 'd',
        text: '奇怪、荒诞、没人懂的东西。',
        weights: { absurdResilience: 9, survival: 4, selfPackaging: 3 },
        personaScores: { lovett: 4 }
      }
    ]
  },
  {
    id: 17,
    prompt: '所有人同时唱着不同旋律，你发现旁边有人一直跑偏。你会？',
    sourceNote: '来自合唱场面：混乱里也要有秩序，每个人都得守住自己的线。',
    options: [
      {
        id: 'a',
        text: '直接提醒，立刻纠正，不然我会难受死。',
        weights: { order: 8, control: 6, justice: 3 },
        personaScores: { javert: 4 }
      },
      {
        id: 'b',
        text: '偷偷帮他找音，别让他太尴尬。',
        weights: { socialPolish: 7, empathy: 5, responsibility: 3 },
        personaScores: { glinda: 4 }
      },
      {
        id: 'c',
        text: '一不注意，也被带跑了。',
        weights: { romance: 7, sensitivity: 4, empathy: 3 },
        personaScores: { orpheus: 4 }
      },
      {
        id: 'd',
        text: '淡定继续唱，唱完跟他说。',
        weights: { responsibility: 8, socialPolish: 5, control: 3 },
        personaScores: { curtain: 4 }
      }
    ]
  },
  {
    id: 18,
    prompt: '你的人生如果变成一间房，会是什么样？',
    options: [
      {
        id: 'a',
        text: '墙上贴满计划表和奖状。',
        weights: { ambition: 8, performance: 5, responsibility: 4 },
        personaScores: { hamilton: 4 }
      },
      {
        id: 'b',
        text: '灯很暗，但有一架钢琴。',
        weights: { sensitivity: 8, romance: 6, control: 3 },
        personaScores: { phantom: 4 }
      },
      {
        id: 'c',
        text: '沙发很软，谁来都能歇一会儿。',
        weights: { socialPolish: 8, empathy: 6, responsibility: 3 },
        personaScores: { glinda: 4 }
      },
      {
        id: 'd',
        text: '像杂货铺，但每个破烂都有故事。',
        weights: { absurdResilience: 8, survival: 5, selfPackaging: 3 },
        personaScores: { lovett: 4 }
      }
    ]
  },
  {
    id: 19,
    prompt: '你最希望别人如何记住你？',
    options: [
      {
        id: 'a',
        text: '一个真的改变过什么的人。',
        weights: { ambition: 7, justice: 5, romance: 3 },
        personaScores: { hamilton: 4 }
      },
      {
        id: 'b',
        text: '一个把日子过得漂亮的人。',
        weights: { socialPolish: 7, selfPackaging: 5, absurdResilience: 4 },
        personaScores: { glinda: 4 }
      },
      {
        id: 'c',
        text: '一个可靠到可以托付的人。',
        weights: { responsibility: 9, empathy: 5, order: 3 },
        personaScores: { valjean: 4 }
      },
      {
        id: 'd',
        text: '一个不显眼，但一直都在的人。',
        weights: { observation: 9, empathy: 4, survival: 3 },
        personaScores: { plant: 4 }
      }
    ]
  }
];
