// 食材营养知识库 - 包含权威来源的营养信息和趣味文化知识

export interface NutritionFact {
  ingredient: string  // 食材名称
  nutrients: string[]  // 主要营养成分
  benefits: string[]  // 健康益处
  source?: string  // 权威来源
}

export interface FunFact {
  dishName: string  // 菜名或主题
  title: string  // 标题
  content: string  // 趣味知识内容
  source?: string  // 来源
}

// 食材营养知识 - 来源：中国营养学会、USDA、WHO
export const nutritionFacts: Record<string, NutritionFact> = {
  '牛肉': {
    ingredient: '牛肉',
    nutrients: ['优质蛋白质 (26g/100g)', '铁 (2.6mg/100g)', '锌 (4.5mg/100g)', '维生素B12'],
    benefits: ['补血益气，增强免疫力', '促进肌肉生长', '改善贫血症状'],
    source: '中国食物成分表(第6版)'
  },
  '猪肉': {
    ingredient: '猪肉',
    nutrients: ['蛋白质 (20g/100g)', '维生素B1 (0.54mg/100g)', '锌', '硒'],
    benefits: ['补充体力', '维持神经系统健康', '改善食欲'],
    source: '中国食物成分表(第6版)'
  },
  '鸡肉': {
    ingredient: '鸡肉',
    nutrients: ['低脂蛋白质 (19g/100g)', '烟酸', '硒', '维生素B6'],
    benefits: ['高蛋白低脂肪', '促进新陈代谢', '增强免疫力'],
    source: 'USDA FoodData Central'
  },
  '鱼': {
    ingredient: '鱼',
    nutrients: ['优质蛋白质', 'Omega-3脂肪酸 (DHA/EPA)', '维生素D', '硒'],
    benefits: ['保护心血管健康', '促进大脑发育', '预防老年痴呆'],
    source: 'American Heart Association'
  },
  '豆腐': {
    ingredient: '豆腐',
    nutrients: ['植物蛋白 (8g/100g)', '钙 (164mg/100g)', '大豆异黄酮', '卵磷脂'],
    benefits: ['降低胆固醇', '预防骨质疏松', '适合乳糖不耐受人群'],
    source: '中国营养学会'
  },
  '鸡蛋': {
    ingredient: '鸡蛋',
    nutrients: ['完全蛋白质 (13g/100g)', '卵磷脂', '维生素A/D/E/K', '胆碱'],
    benefits: ['促进大脑发育', '保护视力', '增强记忆力'],
    source: 'Harvard T.H. Chan School of Public Health'
  },
  '番茄': {
    ingredient: '番茄',
    nutrients: ['番茄红素', '维生素C (19mg/100g)', '钾', 'β-胡萝卜素'],
    benefits: ['强效抗氧化', '保护心血管', '预防前列腺癌'],
    source: 'Journal of Nutritional Science'
  },
  '菠菜': {
    ingredient: '菠菜',
    nutrients: ['叶酸 (194μg/100g)', '铁 (2.7mg/100g)', '维生素K', 'β-胡萝卜素'],
    benefits: ['预防贫血', '保护视力', '促进骨骼健康'],
    source: '中国食物成分表(第6版)'
  },
  '胡萝卜': {
    ingredient: '胡萝卜',
    nutrients: ['β-胡萝卜素 (4.1mg/100g)', '维生素A', '膳食纤维', '钾'],
    benefits: ['保护视力', '增强免疫力', '促进皮肤健康'],
    source: 'USDA FoodData Central'
  },
  '土豆': {
    ingredient: '土豆',
    nutrients: ['碳水化合物', '钾 (421mg/100g)', '维生素C', '膳食纤维'],
    benefits: ['提供持久能量', '维持电解质平衡', '促进消化'],
    source: 'USDA FoodData Central'
  },
  '白菜': {
    ingredient: '白菜',
    nutrients: ['维生素C', '膳食纤维', '钾', '叶酸'],
    benefits: ['清热解毒', '促进消化', '增强免疫力'],
    source: '中国食物成分表(第6版)'
  },
  '蒜': {
    ingredient: '大蒜',
    nutrients: ['大蒜素', '硒', '维生素B6', '锰'],
    benefits: ['天然抗菌消炎', '降低血压', '增强免疫力'],
    source: 'Journal of Nutrition'
  },
  '姜': {
    ingredient: '生姜',
    nutrients: ['姜辣素', '姜烯酚', '维生素C', '镁'],
    benefits: ['暖胃驱寒', '缓解恶心', '抗炎止痛'],
    source: 'International Journal of Molecular Sciences'
  },
  '虾': {
    ingredient: '虾',
    nutrients: ['蛋白质 (20g/100g)', '虾青素', '硒', '维生素B12'],
    benefits: ['强效抗氧化', '保护心血管', '增强免疫力'],
    source: 'USDA FoodData Central'
  },
  '排骨': {
    ingredient: '排骨',
    nutrients: ['蛋白质', '钙', '磷', '胶原蛋白'],
    benefits: ['补钙强骨', '滋养皮肤', '补充体力'],
    source: '中国食物成分表(第6版)'
  },
  '木耳': {
    ingredient: '黑木耳',
    nutrients: ['膳食纤维 (29.9g/100g)', '铁 (97.4mg/100g)', '多糖', '维生素E'],
    benefits: ['清理血管', '润肠通便', '补血养颜'],
    source: '中国食物成分表(第6版)'
  },
  '香菇': {
    ingredient: '香菇',
    nutrients: ['香菇多糖', '维生素D', '膳食纤维', '硒'],
    benefits: ['增强免疫力', '抗肿瘤', '降低胆固醇'],
    source: 'International Journal of Medicinal Mushrooms'
  },
  '茄子': {
    ingredient: '茄子',
    nutrients: ['花青素', '绿原酸', '膳食纤维', '钾'],
    benefits: ['抗氧化', '保护心血管', '降血压'],
    source: 'Journal of Agricultural and Food Chemistry'
  },
  '青椒': {
    ingredient: '青椒',
    nutrients: ['维生素C (72mg/100g)', 'β-胡萝卜素', '维生素B6', '叶酸'],
    benefits: ['增强免疫力', '促进铁吸收', '保护视力'],
    source: 'USDA FoodData Central'
  },
  '辣椒': {
    ingredient: '辣椒',
    nutrients: ['辣椒素', '维生素C', 'β-胡萝卜素', '维生素A'],
    benefits: ['促进新陈代谢', '缓解疼痛', '促进消化'],
    source: 'British Journal of Nutrition'
  },
  '冬瓜': {
    ingredient: '冬瓜',
    nutrients: ['钾', '维生素C', '膳食纤维', '丙醇二酸'],
    benefits: ['利尿消肿', '清热解暑', '辅助减肥'],
    source: '中国食物成分表(第6版)'
  },
  '山药': {
    ingredient: '山药',
    nutrients: ['黏液蛋白', '淀粉酶', '膳食纤维', '钾'],
    benefits: ['健脾养胃', '补肾益精', '稳定血糖'],
    source: '中国药典'
  },
  '萝卜': {
    ingredient: '白萝卜',
    nutrients: ['维生素C', '芥子油', '膳食纤维', '钾'],
    benefits: ['促进消化', '清热化痰', '增强免疫力'],
    source: '中国食物成分表(第6版)'
  },
}

// 趣味文化知识
export const funFacts: FunFact[] = [
  {
    dishName: '东坡肉',
    title: '苏东坡的美食传奇',
    content: '东坡肉得名于北宋大文豪苏轼（号东坡居士）。相传苏轼在黄州任职时，当地猪肉便宜却无人会做，他便发明了用小火慢炖的方法，创作出这道肥而不腻的名菜，并写下《猪肉颂》："净洗铛，少著水，柴头罨烟焰不起。待他自熟莫催他，火候足时他自美。"',
    source: '《苏轼诗集》'
  },
  {
    dishName: '麻婆豆腐',
    title: '麻婆的真实身份',
    content: '麻婆豆腐源于清朝同治年间成都北门万福桥边的陈兴盛饭铺。店主陈氏脸上有麻点，人称"陈麻婆"，她做的豆腐麻辣鲜香、嫩滑可口，久而久之"麻婆豆腐"便成了这道菜的名字。1909年被列为成都著名食品。',
    source: '《成都通览》'
  },
  {
    dishName: '宫保鸡丁',
    title: '宫保是官名不是调料',
    content: '"宫保"原是清朝官职"太子少保"的简称。这道菜的发明者丁宝桢是晚清名臣，曾任四川总督，死后被追赠"太子太保"，后人便以他的官衔命名这道他发明的菜，称为"宫保鸡丁"。',
    source: '《清史稿》'
  },
  {
    dishName: '鱼香肉丝',
    title: '鱼香肉丝里没有鱼',
    content: '鱼香肉丝之所以叫"鱼香"，是因为调料的搭配（泡椒、姜、蒜、糖、醋）模仿了四川人烹饪鱼时常用的调味方式。这种调味组合被称为"鱼香味"，是川菜的经典复合味型之一，用于烹制肉类时便有了"鱼香肉丝"。',
    source: '《川菜烹饪事典》'
  },
  {
    dishName: '回锅肉',
    title: '为什么要"回锅"',
    content: '回锅肉是四川家庭最常见的菜肴之一。"回锅"指的是将煮熟的五花肉再次入锅炒制。传统做法是将祭祀用的白煮肉再加工食用，既不浪费又别有风味。郫县豆瓣酱是回锅肉的灵魂调料，没有它就做不出正宗的味道。',
    source: '《中国川菜》'
  },
  {
    dishName: '糖醋鱼',
    title: '酸甜口味的科学',
    content: '糖和醋的组合不仅美味，还有科学道理。醋酸能软化鱼骨、去腥提鲜，而糖能中和醋的酸味，形成层次丰富的口感。研究表明，酸甜味能刺激唾液分泌，增进食欲，这也是为什么糖醋口味的菜总是那么开胃。',
    source: 'Food Chemistry Journal'
  },
  {
    dishName: '红烧',
    title: '红烧的颜色从何而来',
    content: '红烧菜的"红"色主要来自三个途径：酱油中的焦糖色素、糖经过炒制产生的焦糖化反应，以及食材本身在高温下发生的美拉德反应。正宗红烧要先"炒糖色"，将冰糖或白糖小火炒至枣红色再放入食材，这样颜色才能均匀诱人。',
    source: '《中国烹饪》'
  },
  {
    dishName: '辣椒',
    title: '中国人为什么越来越爱吃辣',
    content: '辣椒明朝末年才传入中国，最初只作观赏植物。真正开始吃辣是在清朝，因为"以辣代盐"——内陆地区盐贵，辣椒便成了调味替代品。现代研究发现，吃辣会刺激大脑分泌内啡肽，产生愉悦感，这种"辣椒素快感"让人欲罢不能。如今川渝地区吃辣还与气候有关，辣椒能祛湿御寒。',
    source: '《中国辣椒史》'
  },
  {
    dishName: '饺子',
    title: '饺子的千年历史',
    content: '饺子源于东汉"医圣"张仲景的"祛寒娇耳汤"。相传张仲景见穷人耳朵冻烂，便用面皮包上羊肉和驱寒药材做成耳朵状的食物给病人吃。后来人们模仿制作，称为"娇耳"、"扁食"，最后演变为今天的"饺子"。',
    source: '《伤寒杂病论》'
  },
  {
    dishName: '炒菜',
    title: '为什么中国人爱炒菜',
    content: '炒菜是中国独特的烹饪方式，起源于宋代。铁锅的普及和植物油的使用使得"炒"这种需要高温快速翻动的技法成为可能。炒菜的优点是快速、省燃料、保留营养，这与中国人口众多、燃料珍贵的历史背景密切相关。',
    source: '《中国饮食文化史》'
  },
  {
    dishName: '老鸭汤',
    title: '夏天吃鸭的养生智慧',
    content: '中医认为鸭肉性凉，有滋阴清热的功效，特别适合夏秋季节食用。俗话说"大暑老鸭胜补药"，就是这个道理。老鸭比嫩鸭肉质更紧实、味道更鲜美，用来炖汤营养价值更高。',
    source: '《本草纲目》'
  },
  {
    dishName: '白切鸡',
    title: '粤菜追求的本味',
    content: '白切鸡是粤菜"清、鲜、嫩、滑"风格的代表。最讲究的是"三提三放"——将鸡在沸水中提起放下三次，使皮肉均匀受热而不破裂。好的白切鸡皮爽肉滑，蘸上姜葱油便是人间美味，这正体现了粤菜追求食材本味的理念。',
    source: '《粤菜烹调技术》'
  },
  {
    dishName: '小龙虾',
    title: '小龙虾的逆袭之路',
    content: '小龙虾原产北美，20世纪30年代作为牛蛙饲料引入中国。最初被视为入侵物种，无人食用。直到2000年代，湖北潜江的厨师们发明了油焖大虾的做法，小龙虾才一跃成为夜宵之王。如今中国是世界上最大的小龙虾消费国，年消费量超过100万吨。',
    source: '《中国渔业年鉴》'
  },
  {
    dishName: '蒜蓉',
    title: '大蒜的健康密码',
    content: '大蒜被称为"天然抗生素"，其中的大蒜素具有强大的抗菌作用。但大蒜素在完整的蒜瓣中并不存在，只有当大蒜被切碎或捣碎后，蒜氨酸和蒜酶接触才会产生大蒜素。所以切好的蒜末静置10-15分钟再烹饪，才能最大化其营养价值。',
    source: 'Journal of Nutrition'
  },
]

// 根据菜名获取相关的趣味知识
export function getFunFactByDish(dishName: string): FunFact | null {
  // 精确匹配
  const exact = funFacts.find(f => f.dishName === dishName)
  if (exact) return exact
  
  // 模糊匹配
  const partial = funFacts.find(f => 
    dishName.includes(f.dishName) || f.dishName.includes(dishName)
  )
  if (partial) return partial
  
  // 特殊匹配规则
  if (dishName.includes('红烧')) {
    return funFacts.find(f => f.dishName === '红烧') || null
  }
  if (dishName.includes('糖醋')) {
    return funFacts.find(f => f.dishName === '糖醋鱼') || null
  }
  if (dishName.includes('蒜蓉') || dishName.includes('蒜')) {
    return funFacts.find(f => f.dishName === '蒜蓉') || null
  }
  if (dishName.includes('辣') || dishName.includes('麻辣')) {
    return funFacts.find(f => f.dishName === '辣椒') || null
  }
  if (dishName.includes('饺')) {
    return funFacts.find(f => f.dishName === '饺子') || null
  }
  if (dishName.includes('鸭')) {
    return funFacts.find(f => f.dishName === '老鸭汤') || null
  }
  if (dishName.includes('小龙虾')) {
    return funFacts.find(f => f.dishName === '小龙虾') || null
  }
  if (dishName.includes('白切') || dishName.includes('白斩')) {
    return funFacts.find(f => f.dishName === '白切鸡') || null
  }
  
  return null
}

// 根据食材列表获取营养知识
export function getNutritionFactsByIngredients(ingredientNames: string[]): NutritionFact[] {
  const facts: NutritionFact[] = []
  
  ingredientNames.forEach(name => {
    // 精确匹配
    if (nutritionFacts[name]) {
      facts.push(nutritionFacts[name])
      return
    }
    
    // 模糊匹配
    for (const key of Object.keys(nutritionFacts)) {
      if (name.includes(key) || key.includes(name)) {
        if (!facts.find(f => f.ingredient === nutritionFacts[key].ingredient)) {
          facts.push(nutritionFacts[key])
        }
        return
      }
    }
    
    // 特殊匹配
    if (name.includes('鱼') || name.includes('鲤') || name.includes('鲈') || name.includes('鲫')) {
      if (!facts.find(f => f.ingredient === '鱼')) {
        facts.push(nutritionFacts['鱼'])
      }
    }
    if (name.includes('虾')) {
      if (!facts.find(f => f.ingredient === '虾')) {
        facts.push(nutritionFacts['虾'])
      }
    }
  })
  
  return facts.slice(0, 4) // 最多返回4条
}
