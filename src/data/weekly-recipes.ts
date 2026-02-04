// 2026年1月食谱 - 按周组织，每餐两道菜
// 2026年1月1日是周四

export interface Recipe {
  id: string
  name: string
  type: 'main' | 'side'
  season: 'winter' | 'spring' | 'summer' | 'autumn'
  ingredients: Ingredient[]
  steps: string[]
  nutrition: { calories: number; protein: number; carbs: number; fat: number }
  cookTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  flavor: 'salty' | 'spicy' | 'sour' | 'sweet' | 'light' | 'rich'
}

export interface Ingredient {
  name: string
  amount: string
  category: 'meat' | 'seafood' | 'vegetable' | 'tofu' | 'egg' | 'seasoning' | 'staple' | 'other'
  storageDays: number
}

export interface DailyMeal {
  date: string // 格式: "1月1日"
  weekday: string
  lunch: { main: Recipe; side: Recipe; staple: 'rice' | 'noodle' | 'both' }
  dinner: { main: Recipe; side: Recipe; staple: 'rice' | 'noodle' | 'both' }
}

export interface WeeklyPlan {
  week: number
  month: number
  year: number
  dateRange: string
  meals: DailyMeal[]
  shoppingList: ShoppingItem[]
  totalNutrition: { avgCalories: number; avgProtein: number; avgCarbs: number; avgFat: number }
}

export interface ShoppingItem {
  name: string
  totalAmount: string
  category: Ingredient['category']
  usedIn: string[]
  buyTip?: string
}

// ========== 第一周食谱 (1月1日周四 - 1月4日周日) ==========
const week1Recipes: Recipe[] = [
  {
    id: 'w1-tomato-beef', name: '番茄牛腩', type: 'main', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '牛腩', amount: '400g', category: 'meat', storageDays: 3 },
      { name: '番茄', amount: '3个', category: 'vegetable', storageDays: 7 },
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
      { name: '洋葱', amount: '半个', category: 'vegetable', storageDays: 14 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
    ],
    steps: ['牛腩切3cm块冷水下锅焯水5分钟捞出', '番茄划十字开水烫去皮切块，土豆切滚刀块', '热锅冷油爆香姜片和八角30秒', '加入牛腩翻炒2分钟上色', '加番茄炒出汁约3分钟', '加开水没过食材，大火烧开转小火炖1.5小时', '加土豆继续炖30分钟至软烂，加盐调味'],
    nutrition: { calories: 450, protein: 35, carbs: 25, fat: 24 }, cookTime: 120, difficulty: 'medium', tags: ['炖菜', '高蛋白']
  },
  {
    id: 'w1-stir-fry-yam', name: '清炒山药木耳', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '山药', amount: '300g', category: 'vegetable', storageDays: 14 },
      { name: '黑木耳', amount: '50g(干)', category: 'vegetable', storageDays: 365 },
      { name: '胡萝卜', amount: '半根', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['木耳提前泡发2小时洗净撕小朵', '山药去皮切3mm薄片泡醋水防氧化', '胡萝卜切菱形片', '热锅加油2勺爆香蒜末10秒', '先下胡萝卜翻炒1分钟', '加山药木耳大火翻炒2分钟', '加盐1/2茶匙、鸡精少许调味出锅'],
    nutrition: { calories: 120, protein: 4, carbs: 25, fat: 2 }, cookTime: 15, difficulty: 'easy', tags: ['清淡', '养生']
  },
  {
    id: 'w1-braised-lamb', name: '红烧羊肉萝卜', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '羊肉', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '白萝卜', amount: '1根', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['羊肉切4cm块冷水下锅加姜片料酒焯水5分钟去膻', '白萝卜去皮切滚刀块', '热锅加油炒糖色至枣红色约1分钟', '加羊肉翻炒上色3分钟', '加生抽2勺老抽1勺、八角桂皮香叶', '加开水没过羊肉，大火烧开转小火炖1小时', '加萝卜继续炖30分钟至软烂，大火收汁'],
    nutrition: { calories: 420, protein: 38, carbs: 12, fat: 26 }, cookTime: 100, difficulty: 'medium', tags: ['温补', '冬季']
  },
  {
    id: 'w1-garlic-broccoli', name: '蒜蓉西兰花', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '西兰花', amount: '1颗', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['西兰花切小朵盐水浸泡10分钟洗净', '烧开水加少许油盐焯西兰花2分钟捞出沥干', '蒜切末备用', '热锅加油2勺小火爆香蒜末20秒', '加入西兰花大火翻炒1分钟', '加蚝油1勺、盐少许调味即可出锅'],
    nutrition: { calories: 80, protein: 6, carbs: 8, fat: 3 }, cookTime: 12, difficulty: 'easy', tags: ['清淡', '快手']
  },
  {
    id: 'w1-fish-sauerkraut', name: '酸菜鱼', type: 'main', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '草鱼', amount: '1条', category: 'seafood', storageDays: 2 },
      { name: '酸菜', amount: '200g', category: 'vegetable', storageDays: 30 },
    ],
    steps: ['草鱼片成薄片加蛋清淀粉盐腌制15分钟', '酸菜切丝挤干水分', '热锅加油3勺爆香姜蒜、干辣椒、花椒30秒', '加酸菜翻炒出香味2分钟', '加开水1升煮开后小火煮10分钟出酸味', '开大火下鱼片快速拨散约30秒变白即熟', '盛入碗中，另起锅烧热油淋在表面'],
    nutrition: { calories: 350, protein: 40, carbs: 8, fat: 18 }, cookTime: 40, difficulty: 'medium', tags: ['川菜', '开胃']
  },
  {
    id: 'w1-home-tofu', name: '家常豆腐', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '北豆腐', amount: '1块', category: 'tofu', storageDays: 5 },
      { name: '五花肉', amount: '100g', category: 'meat', storageDays: 3 },
    ],
    steps: ['北豆腐切1.5cm厚片，五花肉切薄片', '热锅加油3勺中火煎豆腐至两面金黄约5分钟盛出', '锅留底油爆香葱姜蒜和肉片2分钟', '加豆瓣酱1勺炒出红油30秒', '加入豆腐、生抽1勺、水小半碗焖煮3分钟', '大火收汁撒葱花出锅'],
    nutrition: { calories: 280, protein: 18, carbs: 8, fat: 20 }, cookTime: 25, difficulty: 'easy', tags: ['家常', '下饭']
  },
  {
    id: 'w1-sweet-sour-ribs', name: '糖醋排骨', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '肋排', amount: '500g', category: 'meat', storageDays: 3 },
    ],
    steps: ['排骨剁3cm段冷水下锅焯水5分钟去血沫捞出', '调糖醋汁：醋3勺、糖2勺、生抽2勺、番茄酱1勺混合', '热锅加油炒糖色至枣红起泡', '快速下排骨翻炒均匀上色1分钟', '加开水没过排骨，大火烧开转中火焖煮30分钟', '加入糖醋汁大火收汁至浓稠约5分钟', '撒白芝麻出锅装盘'],
    nutrition: { calories: 480, protein: 28, carbs: 22, fat: 32 }, cookTime: 50, difficulty: 'medium', tags: ['经典', '酸甜']
  },
  {
    id: 'w1-mushroom-veggie', name: '香菇油菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '油菜', amount: '300g', category: 'vegetable', storageDays: 5 },
      { name: '香菇', amount: '6朵', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['油菜洗净切去根部，香菇洗净切片', '烧开水加少许油盐焯油菜1分钟捞出摆盘', '热锅加油2勺爆香蒜末葱白15秒', '加香菇翻炒2分钟至软', '加蚝油1勺、水2勺、盐少许调味', '勾薄芡淋在油菜上即可'],
    nutrition: { calories: 70, protein: 4, carbs: 8, fat: 3 }, cookTime: 15, difficulty: 'easy', tags: ['清淡', '素菜']
  },
]

export const week1Plan: WeeklyPlan = {
  week: 1, month: 1, year: 2026, dateRange: '1月1日(周四) - 1月4日(周日)',
  meals: [
    { date: '1月1日', weekday: '周四', lunch: { main: week1Recipes[0], side: week1Recipes[1], staple: 'rice' }, dinner: { main: week1Recipes[4], side: week1Recipes[5], staple: 'rice' } },
    { date: '1月2日', weekday: '周五', lunch: { main: week1Recipes[2], side: week1Recipes[3], staple: 'noodle' }, dinner: { main: week1Recipes[6], side: week1Recipes[7], staple: 'rice' } },
    { date: '1月3日', weekday: '周六', lunch: { main: week1Recipes[0], side: week1Recipes[7], staple: 'rice' }, dinner: { main: week1Recipes[2], side: week1Recipes[1], staple: 'noodle' } },
    { date: '1月4日', weekday: '周日', lunch: { main: week1Recipes[4], side: week1Recipes[3], staple: 'rice' }, dinner: { main: week1Recipes[6], side: week1Recipes[5], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '牛腩', totalAmount: '400g', category: 'meat', usedIn: ['番茄牛腩'], buyTip: '选带筋的' },
    { name: '羊肉', totalAmount: '500g', category: 'meat', usedIn: ['红烧羊肉萝卜'], buyTip: '羊腿肉最佳' },
    { name: '肋排', totalAmount: '500g', category: 'meat', usedIn: ['糖醋排骨'] },
    { name: '草鱼', totalAmount: '1条', category: 'seafood', usedIn: ['酸菜鱼'], buyTip: '让店家片好' },
    { name: '番茄', totalAmount: '3个', category: 'vegetable', usedIn: ['番茄牛腩'] },
    { name: '土豆', totalAmount: '2个', category: 'vegetable', usedIn: ['番茄牛腩'] },
    { name: '山药', totalAmount: '300g', category: 'vegetable', usedIn: ['清炒山药木耳'] },
    { name: '西兰花', totalAmount: '1颗', category: 'vegetable', usedIn: ['蒜蓉西兰花'] },
    { name: '白萝卜', totalAmount: '1根', category: 'vegetable', usedIn: ['红烧羊肉萝卜'] },
    { name: '油菜', totalAmount: '300g', category: 'vegetable', usedIn: ['香菇油菜'] },
    { name: '香菇', totalAmount: '6朵', category: 'vegetable', usedIn: ['香菇油菜'] },
    { name: '北豆腐', totalAmount: '1块', category: 'tofu', usedIn: ['家常豆腐'] },
    { name: '大米', totalAmount: '2kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '500g', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: { avgCalories: 1400, avgProtein: 80, avgCarbs: 110, avgFat: 70 }
}

// ========== 第二周食谱 (1月5日周一 - 1月11日周日) ==========
const week2Recipes: Recipe[] = [
  {
    id: 'w2-mapo-tofu', name: '麻婆豆腐', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '嫩豆腐', amount: '2块', category: 'tofu', storageDays: 5 },
      { name: '猪肉末', amount: '150g', category: 'meat', storageDays: 2 },
    ],
    steps: ['嫩豆腐切2cm方块开水焯1分钟捞出沥干', '热锅加油2勺炒散肉末至变色约2分钟', '加豆瓣酱1勺炒出红油30秒', '加水1碗烧开放入豆腐小火煮3分钟入味', '加生抽1/2勺调味', '水淀粉勾芡撒花椒粉和葱花出锅'],
    nutrition: { calories: 320, protein: 22, carbs: 12, fat: 22 }, cookTime: 20, difficulty: 'easy', tags: ['川菜', '下饭']
  },
  {
    id: 'w2-spinach-egg', name: '菠菜炒蛋', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '菠菜', amount: '300g', category: 'vegetable', storageDays: 3 },
      { name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 },
    ],
    steps: ['菠菜洗净开水焯30秒捞出切段沥干', '鸡蛋打散加少许盐搅匀', '热锅加油3勺炒蛋至凝固盛出', '锅留底油加蒜末爆香10秒', '下菠菜翻炒1分钟', '加入炒蛋翻匀加盐调味出锅'],
    nutrition: { calories: 150, protein: 12, carbs: 5, fat: 10 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '营养']
  },
  {
    id: 'w2-braised-chicken', name: '黄焖鸡', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '三黄鸡', amount: '半只', category: 'meat', storageDays: 2 },
      { name: '香菇', amount: '8朵', category: 'vegetable', storageDays: 7 },
      { name: '青椒', amount: '2个', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['三黄鸡剁3cm块洗净沥干，香菇泡发切半，青椒切块', '热锅加油3勺爆香姜蒜和干辣椒20秒', '下鸡块大火翻炒至变色约3分钟', '加生抽2勺老抽1勺料酒1勺翻匀', '加水没过鸡肉，大火烧开转中火焖煮20分钟', '加香菇继续焖10分钟', '加青椒翻炒2分钟大火收汁出锅'],
    nutrition: { calories: 380, protein: 35, carbs: 10, fat: 22 }, cookTime: 45, difficulty: 'medium', tags: ['家常', '鲜香']
  },
  {
    id: 'w2-cold-kelp', name: '凉拌海带丝', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '海带丝', amount: '200g', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['海带丝浸泡30分钟洗净', '烧开水焯海带丝3分钟捞出过凉水沥干', '蒜切末加生抽2勺醋2勺糖1/2勺香油1勺调成料汁', '海带丝加料汁拌匀', '撒白芝麻和香菜即可'],
    nutrition: { calories: 45, protein: 2, carbs: 8, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '开胃']
  },
  {
    id: 'w2-steamed-fish', name: '清蒸鲈鱼', type: 'main', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '鲈鱼', amount: '1条', category: 'seafood', storageDays: 1 },
      { name: '葱姜', amount: '适量', category: 'seasoning', storageDays: 7 },
    ],
    steps: ['鲈鱼去鳞去内脏洗净两面划刀', '鱼身抹少许盐和料酒腌制10分钟', '鱼身铺姜片和葱段', '水开后大火蒸8分钟关火虚蒸2分钟', '倒掉蒸出的汤汁铺新鲜葱丝姜丝', '淋蒸鱼豉油2勺', '热油3勺烧至冒烟泼在葱姜上'],
    nutrition: { calories: 180, protein: 32, carbs: 2, fat: 5 }, cookTime: 20, difficulty: 'easy', tags: ['清淡', '高蛋白']
  },
  {
    id: 'w2-tomato-egg', name: '番茄炒蛋', type: 'side', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '番茄', amount: '2个', category: 'vegetable', storageDays: 7 },
      { name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 },
    ],
    steps: ['番茄划十字开水烫去皮切块', '鸡蛋打散加少许盐搅匀', '热锅加油3勺大火炒蛋至刚凝固盛出', '锅加油1勺下番茄翻炒出汁约2分钟', '加糖1/2勺盐少许调味', '倒入炒蛋翻匀即可出锅'],
    nutrition: { calories: 200, protein: 14, carbs: 12, fat: 12 }, cookTime: 15, difficulty: 'easy', tags: ['经典', '下饭']
  },
  {
    id: 'w2-kung-pao-chicken', name: '宫保鸡丁', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '鸡胸肉', amount: '300g', category: 'meat', storageDays: 2 },
      { name: '花生米', amount: '50g', category: 'other', storageDays: 90 },
      { name: '干辣椒', amount: '10个', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['鸡胸切2cm丁加蛋清淀粉盐腌制15分钟', '调碗汁：醋2勺糖1勺生抽1勺淀粉1勺水2勺', '花生米小火炸至金黄捞出备用', '热锅加油3勺下鸡丁滑散至变白盛出', '锅留底油小火爆香干辣椒花椒20秒', '下鸡丁翻炒30秒', '倒入碗汁翻炒至浓稠加花生米出锅'],
    nutrition: { calories: 350, protein: 35, carbs: 15, fat: 18 }, cookTime: 25, difficulty: 'medium', tags: ['川菜', '经典']
  },
  {
    id: 'w2-stir-beans', name: '干煸四季豆', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '四季豆', amount: '400g', category: 'vegetable', storageDays: 5 },
      { name: '肉末', amount: '50g', category: 'meat', storageDays: 2 },
    ],
    steps: ['四季豆去筋切5cm段洗净沥干', '热锅多油中火炸四季豆至皱皮约5分钟捞出', '锅留底油爆香蒜末姜末和肉末2分钟', '下四季豆加盐1/2茶匙生抽1勺翻炒1分钟', '加少许水焖1分钟大火收干出锅'],
    nutrition: { calories: 120, protein: 8, carbs: 12, fat: 5 }, cookTime: 20, difficulty: 'easy', tags: ['下饭', '家常']
  },
  {
    id: 'w2-pork-green-pepper', name: '青椒肉丝', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '猪里脊', amount: '250g', category: 'meat', storageDays: 3 },
      { name: '青椒', amount: '3个', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['猪里脊切丝加蛋清淀粉盐腌制10分钟', '青椒去籽切丝', '热锅加油3勺下肉丝滑散至变白盛出', '锅加油1勺下青椒大火翻炒1分钟至断生', '下肉丝加生抽1勺盐少许翻炒30秒出锅'],
    nutrition: { calories: 280, protein: 25, carbs: 8, fat: 17 }, cookTime: 15, difficulty: 'easy', tags: ['快手', '下饭']
  },
  {
    id: 'w2-seaweed-soup', name: '紫菜虾皮汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '紫菜', amount: '10g', category: 'vegetable', storageDays: 365 },
      { name: '虾皮', amount: '10g', category: 'seafood', storageDays: 90 },
    ],
    steps: ['紫菜撕小块虾皮洗净', '烧开水2碗', '下紫菜和虾皮煮1分钟', '加盐少许香油几滴调味', '撒葱花即可出锅'],
    nutrition: { calories: 30, protein: 4, carbs: 3, fat: 1 }, cookTime: 5, difficulty: 'easy', tags: ['汤品', '快手']
  },
  {
    id: 'w2-twice-cooked', name: '回锅肉', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '五花肉', amount: '400g', category: 'meat', storageDays: 3 },
      { name: '蒜苗', amount: '200g', category: 'vegetable', storageDays: 5 },
    ],
    steps: ['五花肉整块冷水下锅加姜片葱段煮20分钟捞出晾凉', '五花肉切3mm薄片，蒜苗切斜段', '热锅不加油下肉片中火煸至出油卷曲约3分钟', '加豆瓣酱1勺炒出红油30秒', '加豆豉少许甜面酱1/2勺翻炒上色', '下蒜苗大火翻炒1分钟至断生出锅'],
    nutrition: { calories: 450, protein: 22, carbs: 8, fat: 38 }, cookTime: 30, difficulty: 'medium', tags: ['川菜', '下饭']
  },
  {
    id: 'w2-winter-melon', name: '虾皮冬瓜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '冬瓜', amount: '500g', category: 'vegetable', storageDays: 14 },
      { name: '虾皮', amount: '20g', category: 'seafood', storageDays: 90 },
    ],
    steps: ['冬瓜去皮去籽切薄片，虾皮洗净沥干', '热锅加油1勺爆香虾皮30秒', '下冬瓜翻炒1分钟', '加水小半碗盖盖焖煮8分钟至透明', '加盐少许调味撒葱花出锅'],
    nutrition: { calories: 60, protein: 5, carbs: 10, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['清淡', '养生']
  },
  {
    id: 'w2-fish-flavored', name: '鱼香肉丝', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '猪里脊', amount: '300g', category: 'meat', storageDays: 3 },
      { name: '木耳', amount: '50g', category: 'vegetable', storageDays: 365 },
      { name: '胡萝卜', amount: '1根', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['猪里脊切丝加蛋清淀粉盐腌制10分钟', '木耳泡发切丝，胡萝卜切丝', '调鱼香汁：醋2勺糖1.5勺生抽1勺淀粉1勺水2勺', '热锅加油3勺滑散肉丝至变白盛出', '锅加油爆香泡椒和蒜末姜末30秒', '下配菜翻炒1分钟加肉丝', '倒入鱼香汁翻炒至浓稠出锅'],
    nutrition: { calories: 320, protein: 28, carbs: 18, fat: 16 }, cookTime: 25, difficulty: 'medium', tags: ['川菜', '经典']
  },
  {
    id: 'w2-garlic-lettuce', name: '蒜蓉生菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '生菜', amount: '400g', category: 'vegetable', storageDays: 3 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['生菜洗净掰成大片沥干', '蒜切末备用', '热锅加油2勺大火爆香蒜末10秒', '快速下生菜大火翻炒30秒至微软', '加盐1/3茶匙蚝油1/2勺翻匀出锅'],
    nutrition: { calories: 50, protein: 2, carbs: 6, fat: 2 }, cookTime: 8, difficulty: 'easy', tags: ['快手', '清淡']
  },
]

export const week2Plan: WeeklyPlan = {
  week: 2, month: 1, year: 2026, dateRange: '1月5日(周一) - 1月11日(周日)',
  meals: [
    { date: '1月5日', weekday: '周一', lunch: { main: week2Recipes[0], side: week2Recipes[1], staple: 'rice' }, dinner: { main: week2Recipes[2], side: week2Recipes[3], staple: 'rice' } },
    { date: '1月6日', weekday: '周二', lunch: { main: week2Recipes[4], side: week2Recipes[5], staple: 'rice' }, dinner: { main: week2Recipes[6], side: week2Recipes[7], staple: 'rice' } },
    { date: '1月7日', weekday: '周三', lunch: { main: week2Recipes[8], side: week2Recipes[9], staple: 'noodle' }, dinner: { main: week2Recipes[10], side: week2Recipes[11], staple: 'rice' } },
    { date: '1月8日', weekday: '周四', lunch: { main: week2Recipes[12], side: week2Recipes[13], staple: 'rice' }, dinner: { main: week2Recipes[0], side: week2Recipes[5], staple: 'rice' } },
    { date: '1月9日', weekday: '周五', lunch: { main: week2Recipes[2], side: week2Recipes[1], staple: 'noodle' }, dinner: { main: week2Recipes[4], side: week2Recipes[7], staple: 'rice' } },
    { date: '1月10日', weekday: '周六', lunch: { main: week2Recipes[6], side: week2Recipes[3], staple: 'rice' }, dinner: { main: week2Recipes[8], side: week2Recipes[11], staple: 'noodle' } },
    { date: '1月11日', weekday: '周日', lunch: { main: week2Recipes[10], side: week2Recipes[9], staple: 'rice' }, dinner: { main: week2Recipes[12], side: week2Recipes[13], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '三黄鸡', totalAmount: '半只', category: 'meat', usedIn: ['黄焖鸡'] },
    { name: '鸡胸肉', totalAmount: '300g', category: 'meat', usedIn: ['宫保鸡丁'] },
    { name: '猪里脊', totalAmount: '600g', category: 'meat', usedIn: ['青椒肉丝', '鱼香肉丝'] },
    { name: '五花肉', totalAmount: '400g', category: 'meat', usedIn: ['回锅肉'] },
    { name: '猪肉末', totalAmount: '200g', category: 'meat', usedIn: ['麻婆豆腐', '干煸四季豆'] },
    { name: '鲈鱼', totalAmount: '1条', category: 'seafood', usedIn: ['清蒸鲈鱼'] },
    { name: '嫩豆腐', totalAmount: '2块', category: 'tofu', usedIn: ['麻婆豆腐'] },
    { name: '鸡蛋', totalAmount: '12个', category: 'egg', usedIn: ['菠菜炒蛋', '番茄炒蛋'] },
    { name: '菠菜', totalAmount: '300g', category: 'vegetable', usedIn: ['菠菜炒蛋'] },
    { name: '番茄', totalAmount: '4个', category: 'vegetable', usedIn: ['番茄炒蛋'] },
    { name: '青椒', totalAmount: '5个', category: 'vegetable', usedIn: ['黄焖鸡', '青椒肉丝'] },
    { name: '四季豆', totalAmount: '400g', category: 'vegetable', usedIn: ['干煸四季豆'] },
    { name: '蒜苗', totalAmount: '200g', category: 'vegetable', usedIn: ['回锅肉'] },
    { name: '生菜', totalAmount: '400g', category: 'vegetable', usedIn: ['蒜蓉生菜'] },
    { name: '冬瓜', totalAmount: '500g', category: 'vegetable', usedIn: ['虾皮冬瓜'] },
    { name: '海带丝', totalAmount: '200g', category: 'vegetable', usedIn: ['凉拌海带丝'] },
    { name: '香菇', totalAmount: '8朵', category: 'vegetable', usedIn: ['黄焖鸡'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '500g', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: { avgCalories: 1350, avgProtein: 78, avgCarbs: 105, avgFat: 68 }
}

// ========== 第三周食谱 (1月12日周一 - 1月18日周日) ==========
const week3Recipes: Recipe[] = [
  {
    id: 'w3-braised-carp', name: '红烧鲤鱼', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '鲤鱼', amount: '1条', category: 'seafood', storageDays: 1 },
    ],
    steps: ['鲤鱼去鳞去内脏洗净，两面划3刀方便入味', '鱼身抹盐和料酒腌制10分钟', '热锅加油4勺中火煎鱼至两面金黄约5分钟', '加葱姜蒜、生抽2勺、老抽1勺、料酒1勺、糖1/2勺', '加水没过鱼身大火烧开转小火焖15分钟', '大火收汁至浓稠撒葱花出锅'],
    nutrition: { calories: 220, protein: 28, carbs: 5, fat: 10 }, cookTime: 35, difficulty: 'medium', tags: ['红烧', '鲜美']
  },
  {
    id: 'w3-cucumber-wood-ear', name: '黄瓜炒木耳', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '黄瓜', amount: '2根', category: 'vegetable', storageDays: 7 },
      { name: '木耳', amount: '50g', category: 'vegetable', storageDays: 365 },
    ],
    steps: ['木耳提前泡发2小时洗净撕小朵', '黄瓜斜切薄片', '热锅加油2勺爆香蒜末10秒', '先下木耳翻炒1分钟', '加黄瓜大火翻炒1分钟', '加盐1/3茶匙调味出锅'],
    nutrition: { calories: 60, protein: 3, carbs: 10, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['清爽', '快手']
  },
  {
    id: 'w3-curry-beef', name: '咖喱牛肉', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '牛腱子', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '咖喱块', amount: '100g', category: 'seasoning', storageDays: 180 },
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['牛腱子切3cm块冷水下锅焯水5分钟捞出', '土豆胡萝卜去皮切滚刀块', '热锅加油炒香洋葱末2分钟', '加牛肉翻炒3分钟', '加开水没过食材大火烧开转小火炖1小时至牛肉软烂', '加土豆胡萝卜继续炖20分钟', '放入咖喱块搅拌至融化煮5分钟'],
    nutrition: { calories: 420, protein: 38, carbs: 25, fat: 20 }, cookTime: 90, difficulty: 'medium', tags: ['异域风味', '浓郁']
  },
  {
    id: 'w3-hot-sour-shreds', name: '酸辣土豆丝', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
      { name: '干辣椒', amount: '5个', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['土豆去皮切细丝泡水10分钟洗去淀粉沥干', '干辣椒切段、蒜切片', '热锅加油2勺小火爆香辣椒花椒蒜片15秒', '开大火倒入土豆丝快速翻炒2分钟', '加醋2勺、盐1/3茶匙翻炒均匀', '撒葱花出锅'],
    nutrition: { calories: 100, protein: 2, carbs: 20, fat: 2 }, cookTime: 12, difficulty: 'easy', tags: ['开胃', '下饭']
  },
  {
    id: 'w3-braised-duck', name: '啤酒鸭', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '鸭肉', amount: '半只', category: 'meat', storageDays: 2 },
      { name: '啤酒', amount: '1罐', category: 'other', storageDays: 180 },
    ],
    steps: ['鸭肉剁3cm块冷水下锅焯水5分钟去血沫捞出', '热锅加油2勺爆香姜片八角桂皮20秒', '加鸭肉翻炒至表面金黄约5分钟', '加生抽2勺老抽1勺糖1/2勺翻炒上色', '倒入整罐啤酒大火烧开', '转小火盖盖焖煮40分钟', '加青红椒块大火收汁5分钟出锅'],
    nutrition: { calories: 380, protein: 30, carbs: 8, fat: 26 }, cookTime: 60, difficulty: 'medium', tags: ['特色', '软烂']
  },
  {
    id: 'w3-fried-cabbage', name: '手撕包菜', type: 'side', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '包菜', amount: '半颗', category: 'vegetable', storageDays: 14 },
      { name: '干辣椒', amount: '5个', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['包菜去硬芯手撕成小块洗净沥干', '干辣椒切段，蒜切片', '热锅加油3勺大火爆香干辣椒蒜片花椒10秒', '倒入包菜大火翻炒2分钟至微软', '加醋1勺生抽1/2勺盐少许翻炒均匀出锅'],
    nutrition: { calories: 70, protein: 2, carbs: 12, fat: 2 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '下饭']
  },
  {
    id: 'w3-steamed-spare-ribs', name: '粉蒸排骨', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '排骨', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '蒸肉粉', amount: '100g', category: 'seasoning', storageDays: 180 },
      { name: '红薯', amount: '1个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['排骨剁小块加生抽1勺料酒1勺盐少许腌制20分钟', '加蒸肉粉拌匀让每块排骨裹上粉', '红薯去皮切厚片铺在蒸碗底', '把裹粉的排骨码在红薯上', '蒸锅水开后大火蒸40分钟', '出锅撒葱花和红辣椒圈'],
    nutrition: { calories: 450, protein: 28, carbs: 30, fat: 26 }, cookTime: 50, difficulty: 'easy', tags: ['蒸菜', '软糯']
  },
  {
    id: 'w3-egg-drop-soup', name: '西红柿蛋汤', type: 'side', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '番茄', amount: '2个', category: 'vegetable', storageDays: 7 },
      { name: '鸡蛋', amount: '2个', category: 'egg', storageDays: 14 },
    ],
    steps: ['番茄划十字开水烫去皮切小块', '鸡蛋打散备用', '热锅加油1勺炒番茄至出汁约2分钟', '加水3碗大火煮开', '加盐1/2茶匙调味', '关火用筷子搅动汤水同时淋入蛋液', '撒葱花和香油几滴出锅'],
    nutrition: { calories: 100, protein: 8, carbs: 8, fat: 5 }, cookTime: 15, difficulty: 'easy', tags: ['汤品', '开胃']
  },
  {
    id: 'w3-salt-pepper-shrimp', name: '椒盐虾', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '基围虾', amount: '500g', category: 'seafood', storageDays: 1 },
    ],
    steps: ['基围虾剪须去虾线洗净沥干', '加少许盐和料酒腌5分钟', '热锅加油烧至七成热约180度', '下虾炸至壳酥脆约3分钟捞出', '锅留少许底油爆香蒜末姜末10秒', '加炸好的虾翻炒30秒', '撒椒盐粉和葱花翻匀出锅'],
    nutrition: { calories: 250, protein: 35, carbs: 5, fat: 10 }, cookTime: 20, difficulty: 'easy', tags: ['宴客', '酥脆']
  },
  {
    id: 'w3-cold-tofu', name: '皮蛋豆腐', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '内酯豆腐', amount: '1盒', category: 'tofu', storageDays: 7 },
      { name: '皮蛋', amount: '2个', category: 'egg', storageDays: 30 },
    ],
    steps: ['内酯豆腐倒扣切块摆盘', '皮蛋剥壳切成6瓣摆在豆腐周围', '蒜切末、香菜切碎', '调汁：生抽2勺醋1勺香油1勺蒜末拌匀', '淋在豆腐皮蛋上', '撒香菜即可'],
    nutrition: { calories: 150, protein: 12, carbs: 5, fat: 10 }, cookTime: 5, difficulty: 'easy', tags: ['凉菜', '简单']
  },
  {
    id: 'w3-lion-head', name: '红烧狮子头', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '猪肉馅', amount: '500g', category: 'meat', storageDays: 2 },
      { name: '荸荠', amount: '5个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['猪肉馅加切碎荸荠、葱姜末、蛋清1个、盐1茶匙、生抽1勺顺一个方向搅打上劲', '手沾水取肉馅搓成直径5cm的大丸子约4个', '热锅加油4勺中火煎丸子至四面金黄约5分钟', '加生抽2勺老抽1勺糖1/2勺和开水没过丸子', '大火烧开转小火焖煮30分钟至软烂', '大火收汁撒葱花出锅'],
    nutrition: { calories: 480, protein: 30, carbs: 15, fat: 35 }, cookTime: 50, difficulty: 'medium', tags: ['经典', '宴客']
  },
  {
    id: 'w3-stir-bean-sprouts', name: '清炒绿豆芽', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '绿豆芽', amount: '400g', category: 'vegetable', storageDays: 2 },
    ],
    steps: ['绿豆芽掐去根须洗净沥干', '热锅加油2勺大火爆香蒜末10秒', '快速倒入豆芽大火翻炒1分钟', '加醋1勺盐1/3茶匙翻炒30秒', '撒葱花出锅不可炒太久'],
    nutrition: { calories: 40, protein: 4, carbs: 6, fat: 1 }, cookTime: 5, difficulty: 'easy', tags: ['快手', '爽脆']
  },
  {
    id: 'w3-cola-chicken', name: '可乐鸡翅', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '鸡翅', amount: '12个', category: 'meat', storageDays: 2 },
      { name: '可乐', amount: '1罐', category: 'other', storageDays: 180 },
    ],
    steps: ['鸡翅洗净两面各划2刀方便入味', '热锅加油2勺中火煎鸡翅至两面金黄约5分钟', '加姜片生抽1勺老抽1/2勺翻炒上色', '倒入可乐没过鸡翅大火烧开', '转中小火焖煮15分钟', '开大火收汁至浓稠油亮撒芝麻出锅'],
    nutrition: { calories: 350, protein: 28, carbs: 20, fat: 18 }, cookTime: 30, difficulty: 'easy', tags: ['简单', '孩子爱吃']
  },
  {
    id: 'w3-garlic-water-spinach', name: '蒜蓉空心菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '空心菜', amount: '400g', category: 'vegetable', storageDays: 2 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['空心菜掐去老梗洗净沥干切段', '蒜切末备用', '热锅加油2勺大火爆香蒜末10秒', '倒入空心菜大火翻炒1分钟至微软', '加盐1/3茶匙鸡精少许翻炒均匀出锅'],
    nutrition: { calories: 50, protein: 3, carbs: 6, fat: 2 }, cookTime: 8, difficulty: 'easy', tags: ['快手', '清爽']
  },
]

export const week3Plan: WeeklyPlan = {
  week: 3, month: 1, year: 2026, dateRange: '1月12日(周一) - 1月18日(周日)',
  meals: [
    { date: '1月12日', weekday: '周一', lunch: { main: week3Recipes[0], side: week3Recipes[1], staple: 'rice' }, dinner: { main: week3Recipes[2], side: week3Recipes[3], staple: 'rice' } },
    { date: '1月13日', weekday: '周二', lunch: { main: week3Recipes[4], side: week3Recipes[5], staple: 'rice' }, dinner: { main: week3Recipes[6], side: week3Recipes[7], staple: 'rice' } },
    { date: '1月14日', weekday: '周三', lunch: { main: week3Recipes[8], side: week3Recipes[9], staple: 'rice' }, dinner: { main: week3Recipes[10], side: week3Recipes[11], staple: 'noodle' } },
    { date: '1月15日', weekday: '周四', lunch: { main: week3Recipes[12], side: week3Recipes[13], staple: 'rice' }, dinner: { main: week3Recipes[0], side: week3Recipes[3], staple: 'rice' } },
    { date: '1月16日', weekday: '周五', lunch: { main: week3Recipes[2], side: week3Recipes[1], staple: 'noodle' }, dinner: { main: week3Recipes[4], side: week3Recipes[9], staple: 'rice' } },
    { date: '1月17日', weekday: '周六', lunch: { main: week3Recipes[6], side: week3Recipes[5], staple: 'rice' }, dinner: { main: week3Recipes[8], side: week3Recipes[7], staple: 'rice' } },
    { date: '1月18日', weekday: '周日', lunch: { main: week3Recipes[10], side: week3Recipes[11], staple: 'rice' }, dinner: { main: week3Recipes[12], side: week3Recipes[13], staple: 'noodle' } },
  ],
  shoppingList: [
    { name: '鲤鱼', totalAmount: '1条', category: 'seafood', usedIn: ['红烧鲤鱼'] },
    { name: '基围虾', totalAmount: '500g', category: 'seafood', usedIn: ['椒盐虾'] },
    { name: '牛腱子', totalAmount: '500g', category: 'meat', usedIn: ['咖喱牛肉'] },
    { name: '鸭肉', totalAmount: '半只', category: 'meat', usedIn: ['啤酒鸭'] },
    { name: '排骨', totalAmount: '500g', category: 'meat', usedIn: ['粉蒸排骨'] },
    { name: '猪肉馅', totalAmount: '500g', category: 'meat', usedIn: ['红烧狮子头'] },
    { name: '鸡翅', totalAmount: '12个', category: 'meat', usedIn: ['可乐鸡翅'] },
    { name: '内酯豆腐', totalAmount: '1盒', category: 'tofu', usedIn: ['皮蛋豆腐'] },
    { name: '鸡蛋', totalAmount: '6个', category: 'egg', usedIn: ['西红柿蛋汤'] },
    { name: '皮蛋', totalAmount: '2个', category: 'egg', usedIn: ['皮蛋豆腐'] },
    { name: '黄瓜', totalAmount: '2根', category: 'vegetable', usedIn: ['黄瓜炒木耳'] },
    { name: '土豆', totalAmount: '4个', category: 'vegetable', usedIn: ['咖喱牛肉', '酸辣土豆丝'] },
    { name: '包菜', totalAmount: '半颗', category: 'vegetable', usedIn: ['手撕包菜'] },
    { name: '番茄', totalAmount: '4个', category: 'vegetable', usedIn: ['西红柿蛋汤'] },
    { name: '绿豆芽', totalAmount: '400g', category: 'vegetable', usedIn: ['清炒绿豆芽'] },
    { name: '空心菜', totalAmount: '400g', category: 'vegetable', usedIn: ['蒜蓉空心菜'] },
    { name: '红薯', totalAmount: '1个', category: 'vegetable', usedIn: ['粉蒸排骨'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '500g', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: { avgCalories: 1380, avgProtein: 82, avgCarbs: 108, avgFat: 72 }
}

// ========== 第四周食谱 (1月19日周一 - 1月25日周日) ==========
const week4Recipes: Recipe[] = [
  {
    id: 'w4-braised-pork-belly', name: '梅菜扣肉', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '五花肉', amount: '600g', category: 'meat', storageDays: 3 },
      { name: '梅菜', amount: '200g', category: 'vegetable', storageDays: 180 },
    ],
    steps: ['五花肉整块冷水下锅煮20分钟捞出擦干', '趁热在肉皮上抹老抽和蜂蜜', '热锅多油将肉皮朝下炸至金黄起泡约3分钟', '肉切1cm厚片皮朝下码在碗底', '梅菜洗净切碎加蒜末炒香铺在肉上', '加生抽2勺老抽1勺盐1/2茶匙', '大火蒸2小时至软烂倒扣装盘'],
    nutrition: { calories: 550, protein: 25, carbs: 10, fat: 48 }, cookTime: 150, difficulty: 'hard', tags: ['宴客', '经典']
  },
  {
    id: 'w4-stir-fry-celery', name: '芹菜炒香干', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '芹菜', amount: '300g', category: 'vegetable', storageDays: 7 },
      { name: '香干', amount: '200g', category: 'tofu', storageDays: 5 },
    ],
    steps: ['芹菜去叶切4cm段，香干切条', '热锅加油2勺爆香蒜末10秒', '先下香干翻炒1分钟至微黄', '加芹菜大火翻炒2分钟至断生', '加盐1/3茶匙生抽1/2勺翻匀出锅'],
    nutrition: { calories: 120, protein: 10, carbs: 8, fat: 6 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '家常']
  },
  {
    id: 'w4-sweet-sour-fish', name: '糖醋鱼块', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '草鱼', amount: '1条', category: 'seafood', storageDays: 1 },
    ],
    steps: ['草鱼切3cm块加盐料酒腌制15分钟', '鱼块裹干淀粉', '热锅多油烧至七成热炸鱼块至金黄酥脆约4分钟捞出', '调糖醋汁：番茄酱2勺醋2勺糖2勺生抽1勺淀粉1勺水3勺', '锅留底油炒香葱姜，倒入糖醋汁煮开', '下炸好的鱼块翻匀挂汁出锅'],
    nutrition: { calories: 320, protein: 30, carbs: 25, fat: 12 }, cookTime: 30, difficulty: 'medium', tags: ['酸甜', '宴客']
  },
  {
    id: 'w4-oyster-mushroom', name: '蚝油杏鲍菇', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '杏鲍菇', amount: '300g', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['杏鲍菇切1cm厚片两面划十字花刀', '热锅加油2勺中火煎杏鲍菇至两面金黄约3分钟', '加蚝油1勺生抽1/2勺水2勺', '煮1分钟让菇吸收酱汁', '撒葱花出锅'],
    nutrition: { calories: 80, protein: 4, carbs: 10, fat: 3 }, cookTime: 15, difficulty: 'easy', tags: ['素菜', '鲜美']
  },
  {
    id: 'w4-spicy-pot', name: '麻辣香锅', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '五花肉', amount: '200g', category: 'meat', storageDays: 3 },
      { name: '藕片', amount: '200g', category: 'vegetable', storageDays: 7 },
      { name: '土豆', amount: '1个', category: 'vegetable', storageDays: 14 },
      { name: '午餐肉', amount: '1罐', category: 'meat', storageDays: 365 },
    ],
    steps: ['五花肉、藕片、土豆片、午餐肉分别切片', '烧热油分批将食材炸至断生捞出', '锅留2勺油小火爆香麻辣香锅底料2勺和蒜末姜末', '加干辣椒花椒炒香20秒', '倒入所有炸好的食材大火翻炒2分钟', '撒芝麻香菜出锅'],
    nutrition: { calories: 520, protein: 28, carbs: 35, fat: 32 }, cookTime: 40, difficulty: 'medium', tags: ['麻辣', '下饭']
  },
  {
    id: 'w4-corn-soup', name: '玉米排骨汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '排骨', amount: '300g', category: 'meat', storageDays: 3 },
      { name: '玉米', amount: '2根', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['排骨剁小块冷水下锅焯水5分钟捞出洗净', '玉米切段', '砂锅加排骨姜片和开水没过食材', '大火烧开转小火炖40分钟', '加玉米继续炖20分钟', '加盐1茶匙调味撒葱花出锅'],
    nutrition: { calories: 180, protein: 15, carbs: 15, fat: 8 }, cookTime: 70, difficulty: 'easy', tags: ['汤品', '滋补']
  },
  {
    id: 'w4-cumin-lamb', name: '孜然羊肉', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '羊肉片', amount: '400g', category: 'meat', storageDays: 2 },
      { name: '洋葱', amount: '1个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['羊肉片加料酒生抽淀粉腌制10分钟', '洋葱切丝，青红椒切丝', '热锅加油3勺大火快速滑散羊肉至变色盛出', '锅加油爆香洋葱丝1分钟', '下羊肉大火翻炒30秒', '撒孜然粉2茶匙辣椒粉1茶匙盐少许翻匀出锅'],
    nutrition: { calories: 380, protein: 35, carbs: 8, fat: 24 }, cookTime: 15, difficulty: 'easy', tags: ['新疆风味', '下饭']
  },
  {
    id: 'w4-cold-fungus', name: '凉拌木耳', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '木耳', amount: '100g', category: 'vegetable', storageDays: 365 },
    ],
    steps: ['木耳泡发焯水', '加蒜醋调味'],
    nutrition: { calories: 50, protein: 2, carbs: 10, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '爽口']
  },
  {
    id: 'w4-pork-mushroom', name: '滑蛋牛肉', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '牛肉', amount: '250g', category: 'meat', storageDays: 3 },
      { name: '鸡蛋', amount: '4个', category: 'egg', storageDays: 14 },
    ],
    steps: ['牛肉切片腌制', '鸡蛋打散', '滑炒牛肉', '加蛋液翻炒'],
    nutrition: { calories: 350, protein: 35, carbs: 5, fat: 22 }, cookTime: 15, difficulty: 'medium', tags: ['嫩滑', '下饭']
  },
  {
    id: 'w4-bok-choy', name: '蒜炒小白菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '小白菜', amount: '400g', category: 'vegetable', storageDays: 3 },
    ],
    steps: ['小白菜洗净', '爆香蒜末', '快炒出锅'],
    nutrition: { calories: 45, protein: 3, carbs: 6, fat: 1 }, cookTime: 8, difficulty: 'easy', tags: ['快手', '清淡']
  },
  {
    id: 'w4-garlic-shrimp', name: '蒜蓉粉丝蒸虾', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '大虾', amount: '12只', category: 'seafood', storageDays: 1 },
      { name: '粉丝', amount: '100g', category: 'staple', storageDays: 365 },
    ],
    steps: ['虾开背', '粉丝铺底', '放虾淋蒜蓉', '蒸8分钟'],
    nutrition: { calories: 280, protein: 30, carbs: 25, fat: 6 }, cookTime: 20, difficulty: 'easy', tags: ['清蒸', '鲜美']
  },
  {
    id: 'w4-cucumber-salad', name: '拍黄瓜', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '黄瓜', amount: '2根', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['黄瓜拍碎切段', '加蒜醋辣油拌匀'],
    nutrition: { calories: 40, protein: 1, carbs: 8, fat: 1 }, cookTime: 5, difficulty: 'easy', tags: ['凉菜', '开胃']
  },
  {
    id: 'w4-spicy-chicken', name: '辣子鸡', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '鸡腿', amount: '3个', category: 'meat', storageDays: 2 },
      { name: '干辣椒', amount: '50g', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['鸡肉切块腌制', '油炸酥脆', '爆香辣椒花椒', '加鸡块翻炒'],
    nutrition: { calories: 420, protein: 32, carbs: 12, fat: 28 }, cookTime: 35, difficulty: 'medium', tags: ['川菜', '香辣']
  },
  {
    id: 'w4-hot-sour-soup', name: '酸辣汤', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '豆腐', amount: '1块', category: 'tofu', storageDays: 5 },
      { name: '木耳', amount: '30g', category: 'vegetable', storageDays: 365 },
      { name: '鸡蛋', amount: '1个', category: 'egg', storageDays: 14 },
    ],
    steps: ['配料切丝', '煮汤调酸辣', '淋蛋液'],
    nutrition: { calories: 120, protein: 10, carbs: 8, fat: 6 }, cookTime: 20, difficulty: 'easy', tags: ['汤品', '开胃']
  },
]

export const week4Plan: WeeklyPlan = {
  week: 4, month: 1, year: 2026, dateRange: '1月19日(周一) - 1月25日(周日)',
  meals: [
    { date: '1月19日', weekday: '周一', lunch: { main: week4Recipes[0], side: week4Recipes[1], staple: 'rice' }, dinner: { main: week4Recipes[2], side: week4Recipes[3], staple: 'rice' } },
    { date: '1月20日', weekday: '周二', lunch: { main: week4Recipes[4], side: week4Recipes[5], staple: 'rice' }, dinner: { main: week4Recipes[6], side: week4Recipes[7], staple: 'noodle' } },
    { date: '1月21日', weekday: '周三', lunch: { main: week4Recipes[8], side: week4Recipes[9], staple: 'rice' }, dinner: { main: week4Recipes[10], side: week4Recipes[11], staple: 'rice' } },
    { date: '1月22日', weekday: '周四', lunch: { main: week4Recipes[12], side: week4Recipes[13], staple: 'rice' }, dinner: { main: week4Recipes[0], side: week4Recipes[3], staple: 'rice' } },
    { date: '1月23日', weekday: '周五', lunch: { main: week4Recipes[2], side: week4Recipes[1], staple: 'noodle' }, dinner: { main: week4Recipes[4], side: week4Recipes[9], staple: 'rice' } },
    { date: '1月24日', weekday: '周六', lunch: { main: week4Recipes[6], side: week4Recipes[5], staple: 'rice' }, dinner: { main: week4Recipes[8], side: week4Recipes[7], staple: 'rice' } },
    { date: '1月25日', weekday: '周日', lunch: { main: week4Recipes[10], side: week4Recipes[11], staple: 'rice' }, dinner: { main: week4Recipes[12], side: week4Recipes[13], staple: 'noodle' } },
  ],
  shoppingList: [
    { name: '五花肉', totalAmount: '800g', category: 'meat', usedIn: ['梅菜扣肉', '麻辣香锅'] },
    { name: '草鱼', totalAmount: '1条', category: 'seafood', usedIn: ['糖醋鱼块'] },
    { name: '大虾', totalAmount: '12只', category: 'seafood', usedIn: ['蒜蓉粉丝蒸虾'] },
    { name: '羊肉片', totalAmount: '400g', category: 'meat', usedIn: ['孜然羊肉'] },
    { name: '牛肉', totalAmount: '250g', category: 'meat', usedIn: ['滑蛋牛肉'] },
    { name: '鸡腿', totalAmount: '3个', category: 'meat', usedIn: ['辣子鸡'] },
    { name: '排骨', totalAmount: '300g', category: 'meat', usedIn: ['玉米排骨汤'] },
    { name: '香干', totalAmount: '200g', category: 'tofu', usedIn: ['芹菜炒香干'] },
    { name: '豆腐', totalAmount: '1块', category: 'tofu', usedIn: ['酸辣汤'] },
    { name: '鸡蛋', totalAmount: '10个', category: 'egg', usedIn: ['滑蛋牛肉', '酸辣汤'] },
    { name: '芹菜', totalAmount: '300g', category: 'vegetable', usedIn: ['芹菜炒香干'] },
    { name: '杏鲍菇', totalAmount: '300g', category: 'vegetable', usedIn: ['蚝油杏鲍菇'] },
    { name: '藕片', totalAmount: '200g', category: 'vegetable', usedIn: ['麻辣香锅'] },
    { name: '玉米', totalAmount: '2根', category: 'vegetable', usedIn: ['玉米排骨汤'] },
    { name: '洋葱', totalAmount: '1个', category: 'vegetable', usedIn: ['孜然羊肉'] },
    { name: '黄瓜', totalAmount: '2根', category: 'vegetable', usedIn: ['拍黄瓜'] },
    { name: '小白菜', totalAmount: '400g', category: 'vegetable', usedIn: ['蒜炒小白菜'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '500g', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: { avgCalories: 1420, avgProtein: 85, avgCarbs: 112, avgFat: 74 }
}

// ========== 第五周食谱 (1月26日周一 - 1月31日周六) ==========
const week5Recipes: Recipe[] = [
  {
    id: 'w5-braised-trotters', name: '红烧猪蹄', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '猪蹄', amount: '2个', category: 'meat', storageDays: 2 },
    ],
    steps: ['猪蹄剁小块冷水下锅焯水5分钟捞出洗净', '热锅加油2勺炒糖色至枣红色起泡', '快速下猪蹄翻炒上色2分钟', '加生抽2勺老抽1勺料酒2勺、八角桂皮香叶', '加开水没过猪蹄大火烧开转小火焖煮2小时', '大火收汁至浓稠撒葱花出锅'],
    nutrition: { calories: 450, protein: 35, carbs: 5, fat: 32 }, cookTime: 140, difficulty: 'medium', tags: ['胶原蛋白', '滋补']
  },
  {
    id: 'w5-dry-pot-cauliflower', name: '干锅花菜', type: 'side', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '花菜', amount: '1颗', category: 'vegetable', storageDays: 7 },
      { name: '五花肉', amount: '100g', category: 'meat', storageDays: 3 },
    ],
    steps: ['花菜掰小朵洗净沥干，五花肉切薄片', '热锅加油2勺煸五花肉至出油卷曲约3分钟', '加干辣椒蒜片爆香20秒', '下花菜大火翻炒3分钟至边缘微焦', '加生抽1勺盐少许翻炒均匀', '撒葱花出锅'],
    nutrition: { calories: 150, protein: 8, carbs: 12, fat: 9 }, cookTime: 20, difficulty: 'easy', tags: ['干锅', '下饭']
  },
  {
    id: 'w5-steamed-bass', name: '剁椒鱼头', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '鱼头', amount: '1个', category: 'seafood', storageDays: 1 },
      { name: '剁椒', amount: '100g', category: 'seasoning', storageDays: 90 },
    ],
    steps: ['鱼头劈开洗净沥干抹盐和料酒腌10分钟', '盘底铺姜片葱段放鱼头', '剁椒加蒜末拌匀铺在鱼头上', '蒸锅水开后大火蒸12分钟', '出锅撒葱花', '热油3勺烧至冒烟泼在鱼头上'],
    nutrition: { calories: 250, protein: 35, carbs: 5, fat: 10 }, cookTime: 25, difficulty: 'easy', tags: ['湘菜', '鲜辣']
  },
  {
    id: 'w5-egg-with-chives', name: '韭菜炒蛋', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '韭菜', amount: '300g', category: 'vegetable', storageDays: 3 },
      { name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 },
    ],
    steps: ['韭菜洗净切3cm段沥干', '鸡蛋打散加少许盐', '热锅加油3勺大火炒蛋至刚凝固盛出', '锅加油1勺下韭菜大火翻炒30秒', '加炒蛋翻匀加盐少许调味', '快速出锅韭菜不可炒太久'],
    nutrition: { calories: 180, protein: 14, carbs: 6, fat: 12 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '家常']
  },
  {
    id: 'w5-eggplant-pot', name: '鱼香茄子', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '茄子', amount: '3根', category: 'vegetable', storageDays: 5 },
      { name: '猪肉末', amount: '100g', category: 'meat', storageDays: 2 },
    ],
    steps: ['茄子切滚刀块撒盐腌10分钟挤水', '调鱼香汁：醋2勺糖1.5勺生抽1勺淀粉1勺水2勺', '热锅多油炸茄子至软捞出', '锅留底油炒散肉末2分钟', '加豆瓣酱1勺蒜末姜末炒香', '下茄子翻炒倒入鱼香汁收汁出锅'],
    nutrition: { calories: 280, protein: 12, carbs: 25, fat: 16 }, cookTime: 25, difficulty: 'medium', tags: ['川菜', '下饭']
  },
  {
    id: 'w5-seaweed-tofu-soup', name: '海带豆腐汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '海带', amount: '100g', category: 'vegetable', storageDays: 7 },
      { name: '豆腐', amount: '1块', category: 'tofu', storageDays: 5 },
    ],
    steps: ['海带泡发洗净切丝，豆腐切1.5cm方块', '锅加水3碗烧开', '下海带煮5分钟', '加豆腐煮3分钟', '加盐1/2茶匙香油几滴调味', '撒葱花出锅'],
    nutrition: { calories: 80, protein: 8, carbs: 8, fat: 2 }, cookTime: 20, difficulty: 'easy', tags: ['汤品', '清淡']
  },
  {
    id: 'w5-sweet-sour-tenderloin', name: '糖醋里脊', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '猪里脊', amount: '400g', category: 'meat', storageDays: 3 },
    ],
    steps: ['里脊切1cm粗条加盐料酒腌10分钟', '裹蛋液再裹淀粉', '热锅多油烧至七成热炸肉条至金黄约3分钟捞出', '复炸一次30秒更酥脆捞出', '调糖醋汁：番茄酱2勺醋2勺糖2勺生抽1勺淀粉1勺水3勺煮开', '下肉条快速翻匀出锅撒芝麻'],
    nutrition: { calories: 420, protein: 30, carbs: 28, fat: 22 }, cookTime: 30, difficulty: 'medium', tags: ['经典', '酸甜']
  },
  {
    id: 'w5-garlic-eggplant', name: '蒜泥茄子', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '茄子', amount: '2根', category: 'vegetable', storageDays: 5 },
      { name: '蒜', amount: '1头', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['茄子洗净切两半放蒸锅', '大火蒸15分钟至软烂', '蒜切末加生抽2勺醋1勺香油1勺辣椒油1勺糖少许调成蒜泥汁', '茄子撕条摆盘', '淋上蒜泥汁撒香菜即可'],
    nutrition: { calories: 70, protein: 2, carbs: 14, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['凉菜', '蒜香']
  },
  {
    id: 'w5-fried-pork-belly', name: '蒜苔炒肉', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '五花肉', amount: '250g', category: 'meat', storageDays: 3 },
      { name: '蒜苔', amount: '300g', category: 'vegetable', storageDays: 5 },
    ],
    steps: ['五花肉切薄片，蒜苔切4cm段', '热锅加油2勺煸五花肉至出油卷曲约3分钟', '加生抽1勺翻炒上色', '下蒜苔大火翻炒2分钟至断生', '加盐少许翻匀出锅'],
    nutrition: { calories: 350, protein: 18, carbs: 10, fat: 28 }, cookTime: 15, difficulty: 'easy', tags: ['家常', '下饭']
  },
  {
    id: 'w5-winter-melon-soup', name: '冬瓜丸子汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '冬瓜', amount: '400g', category: 'vegetable', storageDays: 14 },
      { name: '猪肉馅', amount: '200g', category: 'meat', storageDays: 2 },
    ],
    steps: ['肉馅加葱姜末盐料酒蛋清淀粉搅打上劲', '用勺子挤成小丸子', '冬瓜去皮切薄片', '锅加水4碗烧开下丸子煮至浮起约5分钟', '加冬瓜煮5分钟至透明', '加盐调味撒葱花香油出锅'],
    nutrition: { calories: 150, protein: 15, carbs: 8, fat: 8 }, cookTime: 30, difficulty: 'easy', tags: ['汤品', '鲜美']
  },
  {
    id: 'w5-spicy-tofu', name: '红烧豆腐', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '北豆腐', amount: '2块', category: 'tofu', storageDays: 5 },
    ],
    steps: ['北豆腐切2cm厚块', '热锅加油3勺中火煎豆腐至两面金黄约5分钟', '加葱姜蒜末爆香', '加生抽2勺老抽1/2勺糖少许水小半碗', '中火焖煮5分钟让豆腐入味', '大火收汁撒葱花出锅'],
    nutrition: { calories: 200, protein: 16, carbs: 10, fat: 12 }, cookTime: 20, difficulty: 'easy', tags: ['家常', '下饭']
  },
  {
    id: 'w5-spinach-soup', name: '菠菜粉丝汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '菠菜', amount: '200g', category: 'vegetable', storageDays: 3 },
      { name: '粉丝', amount: '50g', category: 'staple', storageDays: 365 },
    ],
    steps: ['菠菜洗净切段，粉丝温水泡软', '锅加水3碗烧开', '下粉丝煮2分钟', '加菠菜煮1分钟至变色', '加盐1/2茶匙香油几滴调味', '撒葱花出锅'],
    nutrition: { calories: 80, protein: 4, carbs: 15, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['汤品', '清淡']
  },
]

export const week5Plan: WeeklyPlan = {
  week: 5, month: 1, year: 2026, dateRange: '1月26日(周一) - 2月1日(周日)',
  meals: [
    { date: '1月26日', weekday: '周一', lunch: { main: week5Recipes[0], side: week5Recipes[1], staple: 'rice' }, dinner: { main: week5Recipes[2], side: week5Recipes[3], staple: 'rice' } },
    { date: '1月27日', weekday: '周二', lunch: { main: week5Recipes[4], side: week5Recipes[5], staple: 'rice' }, dinner: { main: week5Recipes[6], side: week5Recipes[7], staple: 'rice' } },
    { date: '1月28日', weekday: '周三', lunch: { main: week5Recipes[8], side: week5Recipes[9], staple: 'noodle' }, dinner: { main: week5Recipes[10], side: week5Recipes[11], staple: 'rice' } },
    { date: '1月29日', weekday: '周四', lunch: { main: week5Recipes[0], side: week5Recipes[3], staple: 'rice' }, dinner: { main: week5Recipes[4], side: week5Recipes[1], staple: 'rice' } },
    { date: '1月30日', weekday: '周五', lunch: { main: week5Recipes[2], side: week5Recipes[5], staple: 'rice' }, dinner: { main: week5Recipes[6], side: week5Recipes[9], staple: 'noodle' } },
    { date: '1月31日', weekday: '周六', lunch: { main: week5Recipes[8], side: week5Recipes[7], staple: 'rice' }, dinner: { main: week5Recipes[10], side: week5Recipes[11], staple: 'rice' } },
    { date: '2月1日', weekday: '周日', lunch: { main: week5Recipes[0], side: week5Recipes[11], staple: 'rice' }, dinner: { main: week5Recipes[6], side: week5Recipes[3], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '猪蹄', totalAmount: '2个', category: 'meat', usedIn: ['红烧猪蹄'] },
    { name: '五花肉', totalAmount: '350g', category: 'meat', usedIn: ['干锅花菜', '蒜苔炒肉'] },
    { name: '猪里脊', totalAmount: '400g', category: 'meat', usedIn: ['糖醋里脊'] },
    { name: '猪肉馅', totalAmount: '300g', category: 'meat', usedIn: ['鱼香茄子', '冬瓜丸子汤'] },
    { name: '鱼头', totalAmount: '1个', category: 'seafood', usedIn: ['剁椒鱼头'] },
    { name: '北豆腐', totalAmount: '3块', category: 'tofu', usedIn: ['红烧豆腐', '海带豆腐汤'] },
    { name: '鸡蛋', totalAmount: '6个', category: 'egg', usedIn: ['韭菜炒蛋'] },
    { name: '花菜', totalAmount: '1颗', category: 'vegetable', usedIn: ['干锅花菜'] },
    { name: '韭菜', totalAmount: '300g', category: 'vegetable', usedIn: ['韭菜炒蛋'] },
    { name: '茄子', totalAmount: '5根', category: 'vegetable', usedIn: ['鱼香茄子', '蒜泥茄子'] },
    { name: '蒜苔', totalAmount: '300g', category: 'vegetable', usedIn: ['蒜苔炒肉'] },
    { name: '冬瓜', totalAmount: '400g', category: 'vegetable', usedIn: ['冬瓜丸子汤'] },
    { name: '菠菜', totalAmount: '200g', category: 'vegetable', usedIn: ['菠菜粉丝汤'] },
    { name: '海带', totalAmount: '100g', category: 'vegetable', usedIn: ['海带豆腐汤'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '500g', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: { avgCalories: 1360, avgProtein: 76, avgCarbs: 100, avgFat: 70 }
}

// 导出所有计划
export const januaryWeeklyPlans: WeeklyPlan[] = [week1Plan, week2Plan, week3Plan, week4Plan, week5Plan]

// ========== 第六周食谱 (2月2日周一 - 2月8日周日) ==========
const week6Recipes: Recipe[] = [
  { id: 'w6-beef-noodles', name: '红烧牛肉面', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [{ name: '牛腱子', amount: '500g', category: 'meat', storageDays: 3 }],
    steps: ['牛腱子切3cm块冷水下锅焯水5分钟捞出', '热锅加油爆香葱姜八角桂皮', '加牛肉翻炒3分钟', '加生抽3勺老抽1勺料酒2勺糖1勺', '加开水没过牛肉大火烧开转小火焖2小时至软烂', '另起锅煮面条捞入碗中', '舀牛肉和汤汁浇在面上撒香菜葱花'],
    nutrition: { calories: 550, protein: 40, carbs: 50, fat: 20 }, cookTime: 150, difficulty: 'medium', tags: ['面食', '经典'] },
  { id: 'w6-cold-cucumber', name: '凉拌腐竹', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '腐竹', amount: '200g', category: 'tofu', storageDays: 365 }],
    steps: ['腐竹温水泡发2小时至软切5cm段', '烧开水焯腐竹2分钟捞出过凉水沥干', '蒜切末香菜切碎', '调汁：生抽2勺醋1勺香油1勺辣椒油1勺蒜末', '腐竹加调料汁拌匀撒香菜即可'],
    nutrition: { calories: 150, protein: 12, carbs: 10, fat: 8 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '素食'] },
  { id: 'w6-steamed-chicken', name: '白切鸡', type: 'main', season: 'winter', flavor: 'light',
    ingredients: [{ name: '三黄鸡', amount: '半只', category: 'meat', storageDays: 2 }],
    steps: ['三黄鸡洗净放入大锅加葱姜料酒', '水烧开后关火盖盖浸泡30分钟', '捞出立即放入冰水浸泡10分钟使皮脆', '取出沥干切块摆盘', '调蘸料：姜蓉葱油酱油拌匀', '鸡肉蘸酱食用'],
    nutrition: { calories: 280, protein: 35, carbs: 0, fat: 15 }, cookTime: 40, difficulty: 'easy', tags: ['广式', '原味'] },
  { id: 'w6-stir-pea-shoots', name: '蒜炒豌豆尖', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '豌豆尖', amount: '400g', category: 'vegetable', storageDays: 2 }],
    steps: ['豌豆尖摘洗干净沥干', '蒜切末备用', '热锅加油2勺大火爆香蒜末10秒', '倒入豌豆尖大火翻炒30秒至微软', '加盐1/3茶匙翻匀出锅'],
    nutrition: { calories: 50, protein: 4, carbs: 6, fat: 2 }, cookTime: 5, difficulty: 'easy', tags: ['时令', '清爽'] },
  { id: 'w6-braised-tofu', name: '红烧日本豆腐', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '日本豆腐', amount: '4条', category: 'tofu', storageDays: 7 }],
    steps: ['日本豆腐从包装取出切2cm厚段', '热锅加油3勺中火煎豆腐至两面金黄约3分钟', '小心翻面避免碎裂', '调汁：生抽1勺蚝油1勺糖少许水3勺淀粉1/2勺', '倒入调料汁中火烧开煮2分钟至汤汁浓稠', '撒葱花出锅'],
    nutrition: { calories: 200, protein: 10, carbs: 15, fat: 12 }, cookTime: 20, difficulty: 'easy', tags: ['嫩滑', '下饭'] },
  { id: 'w6-carrot-corn-soup', name: '胡萝卜玉米汤', type: 'side', season: 'winter', flavor: 'sweet',
    ingredients: [{ name: '胡萝卜', amount: '2根', category: 'vegetable', storageDays: 14 }, { name: '玉米', amount: '1根', category: 'vegetable', storageDays: 7 }],
    steps: ['胡萝卜去皮切滚刀块，玉米切段', '锅加水1升放入胡萝卜玉米和姜片', '大火烧开转小火煮40分钟', '加盐少许调味即可出锅'],
    nutrition: { calories: 80, protein: 3, carbs: 18, fat: 1 }, cookTime: 60, difficulty: 'easy', tags: ['汤品', '甜'] },
  { id: 'w6-pepper-steak', name: '黑椒牛柳', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [{ name: '牛里脊', amount: '300g', category: 'meat', storageDays: 3 }],
    steps: ['牛里脊切1cm粗条加蛋清淀粉盐腌制15分钟', '彩椒洋葱切条备用', '热锅加油3勺大火滑散牛肉至变色盛出', '锅加油爆香洋葱1分钟', '下彩椒翻炒30秒', '加牛肉和黑椒汁2勺翻炒均匀出锅'],
    nutrition: { calories: 350, protein: 35, carbs: 8, fat: 20 }, cookTime: 15, difficulty: 'medium', tags: ['西餐', '牛肉'] },
  { id: 'w6-garlic-spinach', name: '上汤菠菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '菠菜', amount: '400g', category: 'vegetable', storageDays: 3 }],
    steps: ['菠菜洗净开水焯30秒捞出沥干摆盘', '蒜切末皮蛋切小块', '热锅加油1勺爆香蒜末', '加高汤或水1碗烧开', '加盐少许调味倒入皮蛋', '把汤汁淋在菠菜上即可'],
    nutrition: { calories: 60, protein: 5, carbs: 6, fat: 2 }, cookTime: 10, difficulty: 'easy', tags: ['清淡', '营养'] },
  { id: 'w6-sweet-sour-meatballs', name: '糖醋丸子', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [{ name: '猪肉馅', amount: '400g', category: 'meat', storageDays: 2 }],
    steps: ['肉馅加葱姜末蛋清淀粉盐料酒搅打上劲', '用虎口挤出丸子', '热锅多油炸丸子至金黄酥脆约4分钟捞出', '调糖醋汁：番茄酱2勺醋2勺糖2勺生抽1勺淀粉1勺水3勺', '锅加少许油倒入糖醋汁煮开', '下丸子翻匀出锅撒芝麻'],
    nutrition: { calories: 400, protein: 25, carbs: 25, fat: 24 }, cookTime: 30, difficulty: 'medium', tags: ['宴客', '酸甜'] },
  { id: 'w6-cold-lotus', name: '凉拌莲藕', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '莲藕', amount: '300g', category: 'vegetable', storageDays: 7 }],
    steps: ['莲藕去皮切薄片', '烧开水加少许醋焯藕片2分钟保持爽脆', '捞出过凉水沥干', '调汁：生抽1勺醋2勺糖1/2勺蒜末香油辣椒油', '藕片加调料汁拌匀', '撒葱花香菜即可'],
    nutrition: { calories: 70, protein: 2, carbs: 15, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['凉菜', '爽脆'] },
  { id: 'w6-soy-sauce-chicken', name: '豉油鸡', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '三黄鸡', amount: '半只', category: 'meat', storageDays: 2 }],
    steps: ['三黄鸡洗净沥干', '调豉油汁：生抽4勺老抽2勺糖2勺水1碗', '锅加少许油爆香葱姜', '放入鸡加豉油汁大火烧开', '盖盖转小火焖煮30分钟翻面1次', '大火收汁至浓稠取出切块', '淋上锅中酱汁即可'],
    nutrition: { calories: 320, protein: 35, carbs: 5, fat: 18 }, cookTime: 40, difficulty: 'easy', tags: ['广式', '下饭'] },
  { id: 'w6-mushroom-soup', name: '菌菇汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '各种菌菇', amount: '300g', category: 'vegetable', storageDays: 5 }],
    steps: ['香菇平菇金针菇等洗净切片撕条', '锅加水4碗烧开', '下菌菇煮10分钟', '加盐1/2茶匙胡椒粉少许调味', '撒葱花香油出锅'],
    nutrition: { calories: 50, protein: 4, carbs: 8, fat: 1 }, cookTime: 20, difficulty: 'easy', tags: ['汤品', '鲜美'] },
]

export const week6Plan: WeeklyPlan = {
  week: 6, month: 2, year: 2026, dateRange: '2月2日(周一) - 2月8日(周日)',
  meals: [
    { date: '2月2日', weekday: '周一', lunch: { main: week6Recipes[0], side: week6Recipes[1], staple: 'noodle' }, dinner: { main: week6Recipes[2], side: week6Recipes[3], staple: 'rice' } },
    { date: '2月3日', weekday: '周二', lunch: { main: week6Recipes[4], side: week6Recipes[5], staple: 'rice' }, dinner: { main: week6Recipes[6], side: week6Recipes[7], staple: 'rice' } },
    { date: '2月4日', weekday: '周三', lunch: { main: week6Recipes[8], side: week6Recipes[9], staple: 'rice' }, dinner: { main: week6Recipes[10], side: week6Recipes[11], staple: 'rice' } },
    { date: '2月5日', weekday: '周四', lunch: { main: week6Recipes[0], side: week6Recipes[3], staple: 'noodle' }, dinner: { main: week6Recipes[4], side: week6Recipes[1], staple: 'rice' } },
    { date: '2月6日', weekday: '周五', lunch: { main: week6Recipes[2], side: week6Recipes[5], staple: 'rice' }, dinner: { main: week6Recipes[6], side: week6Recipes[9], staple: 'rice' } },
    { date: '2月7日', weekday: '周六', lunch: { main: week6Recipes[8], side: week6Recipes[7], staple: 'rice' }, dinner: { main: week6Recipes[10], side: week6Recipes[11], staple: 'noodle' } },
    { date: '2月8日', weekday: '周日', lunch: { main: week6Recipes[0], side: week6Recipes[9], staple: 'noodle' }, dinner: { main: week6Recipes[2], side: week6Recipes[3], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '牛腱子', totalAmount: '500g', category: 'meat', usedIn: ['红烧牛肉面'] },
    { name: '牛里脊', totalAmount: '300g', category: 'meat', usedIn: ['黑椒牛柳'] },
    { name: '三黄鸡', totalAmount: '1只', category: 'meat', usedIn: ['白切鸡', '豉油鸡'] },
    { name: '猪肉馅', totalAmount: '400g', category: 'meat', usedIn: ['糖醋丸子'] },
    { name: '日本豆腐', totalAmount: '8条', category: 'tofu', usedIn: ['红烧日本豆腐'] },
    { name: '腐竹', totalAmount: '200g', category: 'tofu', usedIn: ['凉拌腐竹'] },
    { name: '豌豆尖', totalAmount: '400g', category: 'vegetable', usedIn: ['蒜炒豌豆尖'] },
    { name: '菠菜', totalAmount: '400g', category: 'vegetable', usedIn: ['上汤菠菜'] },
    { name: '莲藕', totalAmount: '300g', category: 'vegetable', usedIn: ['凉拌莲藕'] },
    { name: '菌菇', totalAmount: '300g', category: 'vegetable', usedIn: ['菌菇汤'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '1kg', category: 'staple', usedIn: ['牛肉面'] },
  ],
  totalNutrition: { avgCalories: 1380, avgProtein: 78, avgCarbs: 105, avgFat: 68 }
}

// ========== 第七周食谱 (2月9日周一 - 2月15日周日) ==========
const week7Recipes: Recipe[] = [
  { id: 'w7-dumplings', name: '猪肉白菜饺子', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '猪肉馅', amount: '400g', category: 'meat', storageDays: 2 }, { name: '大白菜', amount: '500g', category: 'vegetable', storageDays: 14 }],
    steps: ['白菜剁碎撒盐腌10分钟挤干水分', '肉馅加葱姜末生抽料酒盐香油顺时针搅打上劲', '加白菜碎拌匀成馅', '取饺子皮包入馅料捏紧', '水开下饺子煮至浮起再煮2分钟', '捞出蘸醋蒜汁食用'],
    nutrition: { calories: 450, protein: 25, carbs: 45, fat: 20 }, cookTime: 60, difficulty: 'medium', tags: ['面食', '家常'] },
  { id: 'w7-vinegar-peanuts', name: '老醋花生', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '花生米', amount: '200g', category: 'other', storageDays: 90 }],
    steps: ['花生米冷油下锅小火炸至酥脆金黄约5分钟捞出晾凉', '洋葱青红椒切小丁', '调汁：醋3勺糖2勺生抽1勺香油1勺', '花生米加蔬菜丁和调料汁拌匀', '撒香菜即可'],
    nutrition: { calories: 200, protein: 8, carbs: 10, fat: 15 }, cookTime: 15, difficulty: 'easy', tags: ['下酒', '开胃'] },
  { id: 'w7-braised-fish', name: '家常红烧鱼', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '鲫鱼', amount: '2条', category: 'seafood', storageDays: 1 }],
    steps: ['鲫鱼去鳞去内脏洗净两面划刀', '抹少许盐腌10分钟', '热锅加油4勺中火煎鱼至两面金黄约5分钟', '加葱姜蒜爆香', '加生抽2勺老抽1勺料酒1勺糖少许水没过鱼', '大火烧开转中火焖煮10分钟', '大火收汁撒葱花出锅'],
    nutrition: { calories: 250, protein: 35, carbs: 5, fat: 10 }, cookTime: 30, difficulty: 'medium', tags: ['家常', '鲜美'] },
  { id: 'w7-stir-lettuce', name: '蚝油生菜', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '生菜', amount: '400g', category: 'vegetable', storageDays: 3 }],
    steps: ['生菜洗净掰开沥干', '烧开水加少许油盐焯生菜20秒捞出摆盘', '调汁：蚝油1勺生抽1/2勺糖少许水2勺', '锅加少许油烧热倒入调料汁煮开', '淋在生菜上即可'],
    nutrition: { calories: 50, protein: 2, carbs: 6, fat: 2 }, cookTime: 8, difficulty: 'easy', tags: ['清淡', '快手'] },
  { id: 'w7-braised-eggplant', name: '酱烧茄子', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '茄子', amount: '3根', category: 'vegetable', storageDays: 5 }],
    steps: ['茄子切滚刀块撒盐腌10分钟挤水', '热锅多油炸茄子至金黄软烂约3分钟捞出', '锅留底油爆香蒜末', '加甜面酱1勺生抽1勺糖少许水3勺', '下茄子翻炒均匀', '大火收汁撒葱花出锅'],
    nutrition: { calories: 200, protein: 5, carbs: 20, fat: 12 }, cookTime: 25, difficulty: 'easy', tags: ['下饭', '素食'] },
  { id: 'w7-egg-soup', name: '鸡蛋羹', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 }],
    steps: ['鸡蛋打散加1.5倍温水和少许盐搅匀', '过滤去泡沫', '盖保鲜膜扎几个小孔', '蒸锅水开后中火蒸12分钟', '出锅淋生抽1/2勺香油几滴', '撒葱花即可'],
    nutrition: { calories: 150, protein: 12, carbs: 2, fat: 10 }, cookTime: 15, difficulty: 'easy', tags: ['嫩滑', '营养'] },
  { id: 'w7-braised-pork-belly', name: '东坡肉', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [{ name: '五花肉', amount: '500g', category: 'meat', storageDays: 3 }],
    steps: ['五花肉切5cm方块冷水下锅焯水5分钟', '砂锅底铺葱姜', '放入肉块加黄酒200ml老抽2勺冰糖50g', '加水刚没过肉大火烧开', '盖盖转最小火焖煮2小时', '开盖大火收汁至浓稠出锅'],
    nutrition: { calories: 520, protein: 25, carbs: 15, fat: 42 }, cookTime: 150, difficulty: 'medium', tags: ['江浙', '经典'] },
  { id: 'w7-cold-bean-sprouts', name: '凉拌豆芽', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '绿豆芽', amount: '400g', category: 'vegetable', storageDays: 2 }],
    steps: ['豆芽掐去根须洗净', '烧开水焯豆芽1分钟捞出过凉水沥干', '蒜切末香菜切碎', '调汁：醋2勺生抽1勺香油1勺蒜末辣椒油', '豆芽加调料汁拌匀撒香菜'],
    nutrition: { calories: 50, protein: 4, carbs: 6, fat: 2 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '爽脆'] },
  { id: 'w7-steamed-ribs', name: '豆豉蒸排骨', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '排骨', amount: '500g', category: 'meat', storageDays: 3 }],
    steps: ['排骨剁小块洗净沥干', '加生抽1勺料酒1勺淀粉1勺蒜末姜末腌20分钟', '加豆豉1勺拌匀', '放入盘中铺平', '蒸锅水开后大火蒸25分钟', '出锅撒葱花红辣椒圈'],
    nutrition: { calories: 400, protein: 28, carbs: 5, fat: 30 }, cookTime: 35, difficulty: 'easy', tags: ['蒸菜', '广式'] },
  { id: 'w7-cabbage-soup', name: '白菜豆腐汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '大白菜', amount: '300g', category: 'vegetable', storageDays: 14 }, { name: '豆腐', amount: '1块', category: 'tofu', storageDays: 5 }],
    steps: ['大白菜洗净切块，豆腐切2cm方块', '锅加水4碗烧开', '下白菜煮3分钟至软', '加豆腐煮2分钟', '加盐1/2茶匙胡椒粉少许调味', '撒葱花香油出锅'],
    nutrition: { calories: 80, protein: 8, carbs: 8, fat: 2 }, cookTime: 20, difficulty: 'easy', tags: ['汤品', '清淡'] },
  { id: 'w7-kung-pao-shrimp', name: '宫保虾仁', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [{ name: '虾仁', amount: '300g', category: 'seafood', storageDays: 2 }],
    steps: ['虾仁加蛋清淀粉盐腌10分钟', '调碗汁：醋2勺糖1勺生抽1勺淀粉1勺水2勺', '花生米小火炸至金黄捞出', '热锅加油3勺滑散虾仁至变色盛出', '锅留底油爆香干辣椒花椒葱姜20秒', '下虾仁翻炒倒入碗汁加花生米出锅'],
    nutrition: { calories: 280, protein: 30, carbs: 12, fat: 12 }, cookTime: 20, difficulty: 'medium', tags: ['川菜', '高蛋白'] },
  { id: 'w7-stir-bamboo', name: '油焖笋', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '冬笋', amount: '300g', category: 'vegetable', storageDays: 7 }],
    steps: ['冬笋去壳切薄片', '烧开水焯笋2分钟去涩味捞出', '热锅加油2勺爆香葱姜', '下笋片翻炒1分钟', '加生抽1勺老抽1/2勺糖少许水小半碗', '中火焖煮5分钟至入味', '大火收汁出锅'],
    nutrition: { calories: 80, protein: 3, carbs: 10, fat: 4 }, cookTime: 20, difficulty: 'easy', tags: ['时令', '鲜嫩'] },
]

export const week7Plan: WeeklyPlan = {
  week: 7, month: 2, year: 2026, dateRange: '2月9日(周一) - 2月15日(周日)',
  meals: [
    { date: '2月9日', weekday: '周一', lunch: { main: week7Recipes[0], side: week7Recipes[1], staple: 'both' }, dinner: { main: week7Recipes[2], side: week7Recipes[3], staple: 'rice' } },
    { date: '2月10日', weekday: '周二', lunch: { main: week7Recipes[4], side: week7Recipes[5], staple: 'rice' }, dinner: { main: week7Recipes[6], side: week7Recipes[7], staple: 'rice' } },
    { date: '2月11日', weekday: '周三', lunch: { main: week7Recipes[8], side: week7Recipes[9], staple: 'rice' }, dinner: { main: week7Recipes[10], side: week7Recipes[11], staple: 'rice' } },
    { date: '2月12日', weekday: '周四', lunch: { main: week7Recipes[0], side: week7Recipes[3], staple: 'both' }, dinner: { main: week7Recipes[4], side: week7Recipes[1], staple: 'rice' } },
    { date: '2月13日', weekday: '周五', lunch: { main: week7Recipes[2], side: week7Recipes[5], staple: 'rice' }, dinner: { main: week7Recipes[6], side: week7Recipes[9], staple: 'noodle' } },
    { date: '2月14日', weekday: '周六', lunch: { main: week7Recipes[8], side: week7Recipes[7], staple: 'rice' }, dinner: { main: week7Recipes[10], side: week7Recipes[11], staple: 'rice' } },
    { date: '2月15日', weekday: '周日', lunch: { main: week7Recipes[0], side: week7Recipes[9], staple: 'both' }, dinner: { main: week7Recipes[2], side: week7Recipes[3], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '猪肉馅', totalAmount: '400g', category: 'meat', usedIn: ['饺子'] },
    { name: '五花肉', totalAmount: '400g', category: 'meat', usedIn: ['回锅肉'] },
    { name: '排骨', totalAmount: '500g', category: 'meat', usedIn: ['豆豉蒸排骨'] },
    { name: '鲫鱼', totalAmount: '2条', category: 'seafood', usedIn: ['红烧鱼'] },
    { name: '虾仁', totalAmount: '300g', category: 'seafood', usedIn: ['宫保虾仁'] },
    { name: '豆腐', totalAmount: '1块', category: 'tofu', usedIn: ['白菜豆腐汤'] },
    { name: '鸡蛋', totalAmount: '6个', category: 'egg', usedIn: ['鸡蛋羹'] },
    { name: '大白菜', totalAmount: '800g', category: 'vegetable', usedIn: ['饺子', '白菜豆腐汤'] },
    { name: '生菜', totalAmount: '400g', category: 'vegetable', usedIn: ['蚝油生菜'] },
    { name: '茄子', totalAmount: '3根', category: 'vegetable', usedIn: ['酱烧茄子'] },
    { name: '绿豆芽', totalAmount: '400g', category: 'vegetable', usedIn: ['凉拌豆芽'] },
    { name: '冬笋', totalAmount: '300g', category: 'vegetable', usedIn: ['油焖笋'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '饺子皮', totalAmount: '500g', category: 'staple', usedIn: ['饺子'] },
  ],
  totalNutrition: { avgCalories: 1350, avgProtein: 75, avgCarbs: 100, avgFat: 72 }
}

// ========== 第八周食谱 (2月16日周一 - 2月22日周日) ==========
const week8Recipes: Recipe[] = [
  { id: 'w8-kung-pao-tofu', name: '宫保豆腐', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [{ name: '北豆腐', amount: '2块', category: 'tofu', storageDays: 5 }],
    steps: ['北豆腐切2cm方块，用厨房纸吸干水分', '锅中放油烧至六成热，放入豆腐块中火煎至六面金黄约8分钟，盛出备用', '调宫保汁：2勺生抽、1勺醋、1勺白糖、半勺淀粉、3勺水混合', '另起锅放油，小火爆香干辣椒段5-6个、花椒1小撮约30秒', '放入葱段、姜末、蒜末爆香，加入煎好的豆腐', '淋入宫保汁快速翻炒均匀，撒花生米装盘'],
    nutrition: { calories: 280, protein: 18, carbs: 15, fat: 18 }, cookTime: 25, difficulty: 'easy', tags: ['川菜', '素食'] },
  { id: 'w8-cucumber-salad', name: '凉拌黄瓜', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '黄瓜', amount: '2根', category: 'vegetable', storageDays: 7 }],
    steps: ['黄瓜洗净去头尾，用刀面拍松后切成3cm小段', '蒜3瓣切成蒜末', '调味汁：2勺生抽、1勺陈醋、1勺白糖、少许盐混合', '将黄瓜段放入碗中，加入蒜末和调味汁', '淋上1勺红油辣椒（可选），拌匀腌5分钟即可食用'],
    nutrition: { calories: 40, protein: 1, carbs: 8, fat: 1 }, cookTime: 5, difficulty: 'easy', tags: ['凉菜', '开胃'] },
  { id: 'w8-steamed-sea-bass', name: '清蒸鲈鱼', type: 'main', season: 'winter', flavor: 'light',
    ingredients: [{ name: '鲈鱼', amount: '1条', category: 'seafood', storageDays: 1 }],
    steps: ['鲈鱼去鳞去内脏洗净，在鱼身两面各划3刀便于入味', '用料酒1勺抹遍鱼身内外去腥，腌制10分钟', '盘底铺葱段姜片，鱼身上也放葱姜丝', '蒸锅水开后放入鱼，大火蒸8-9分钟（根据鱼大小调整）', '取出倒掉蒸鱼水，捡去旧葱姜，重新铺上新鲜葱丝', '淋2勺蒸鱼豉油，烧热3勺油泼在葱丝上激发香味'],
    nutrition: { calories: 180, protein: 32, carbs: 2, fat: 5 }, cookTime: 20, difficulty: 'easy', tags: ['清淡', '高蛋白'] },
  { id: 'w8-garlic-bok-choy', name: '蒜蓉青菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '小青菜', amount: '400g', category: 'vegetable', storageDays: 3 }],
    steps: ['小青菜掰开洗净沥干，蒜4瓣切成蒜末', '锅中放油烧至七成热，先下一半蒜末爆香10秒', '立即放入青菜大火快炒，翻炒约1分钟至叶片变软', '加盐半小勺、少许鸡精调味', '出锅前撒入剩余蒜末增加蒜香，翻匀即可装盘'],
    nutrition: { calories: 45, protein: 3, carbs: 6, fat: 1 }, cookTime: 8, difficulty: 'easy', tags: ['快手', '清淡'] },
  { id: 'w8-curry-chicken', name: '咖喱鸡', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [{ name: '鸡腿', amount: '3个', category: 'meat', storageDays: 2 }, { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 }],
    steps: ['鸡腿剔骨切3cm块，用料酒、盐腌制15分钟', '土豆去皮切滚刀块，胡萝卜切块，洋葱切丁', '锅中放油烧热，下鸡块中火煎至两面金黄约5分钟', '加入洋葱丁炒出香味，放入咖喱块2块炒化', '加入土豆、胡萝卜和开水没过食材，大火烧开', '转小火焖煮25分钟至土豆软烂，汤汁浓稠即可'],
    nutrition: { calories: 420, protein: 35, carbs: 25, fat: 22 }, cookTime: 45, difficulty: 'medium', tags: ['异域', '浓郁'] },
  { id: 'w8-seaweed-egg-soup', name: '紫菜蛋花汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '紫菜', amount: '10g', category: 'vegetable', storageDays: 365 }, { name: '鸡蛋', amount: '2个', category: 'egg', storageDays: 14 }],
    steps: ['紫菜用手撕成小块，鸡蛋打散备用', '锅中加水600ml烧开，放入紫菜煮30秒', '加盐1小勺、少许白胡椒粉调味', '关火后沿锅边缓慢淋入蛋液，静置10秒', '用筷子轻轻搅散形成蛋花，淋少许香油即可'],
    nutrition: { calories: 100, protein: 8, carbs: 3, fat: 6 }, cookTime: 10, difficulty: 'easy', tags: ['汤品', '快手'] },
  { id: 'w8-braised-pork-ribs', name: '红烧排骨', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [{ name: '排骨', amount: '500g', category: 'meat', storageDays: 3 }],
    steps: ['排骨斩小段冷水下锅，加料酒焯水5分钟捞出洗净', '锅中放油和冰糖30g，小火炒至焦糖色', '放入排骨快速翻炒上色，加入葱段、姜片、八角2个、桂皮1小块', '加2勺生抽、1勺老抽、1勺料酒，翻炒均匀', '加开水没过排骨，大火烧开转小火焖煮45分钟', '大火收汁至浓稠挂在排骨上，撒葱花装盘'],
    nutrition: { calories: 450, protein: 30, carbs: 10, fat: 32 }, cookTime: 60, difficulty: 'medium', tags: ['经典', '下饭'] },
  { id: 'w8-cold-spinach', name: '凉拌菠菜', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '菠菜', amount: '400g', category: 'vegetable', storageDays: 3 }],
    steps: ['菠菜去根洗净，切成10cm长段', '烧开水加少许盐和油，放入菠菜焯烫30秒至变软', '立即捞出过冷水保持翠绿，沥干水分', '蒜4瓣切末，加2勺生抽、1勺陈醋、少许白糖调成料汁', '菠菜装盘，淋上料汁，再淋1勺香油拌匀即可'],
    nutrition: { calories: 55, protein: 4, carbs: 6, fat: 2 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '营养'] },
  { id: 'w8-shredded-pork', name: '京酱肉丝', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '猪里脊', amount: '300g', category: 'meat', storageDays: 3 }],
    steps: ['猪里脊切成5cm长的细丝，加1勺料酒、半勺淀粉、少许盐腌制15分钟', '大葱白切10cm长丝，豆腐皮或荷叶饼准备好', '锅中宽油烧至五成热，下肉丝滑散变色后捞出沥油', '锅留底油，放入2大勺甜面酱、1勺白糖，小火炒出香味', '倒入肉丝快速翻炒裹匀酱汁约30秒', '装盘后铺上葱丝，用豆腐皮卷着肉丝和葱丝吃'],
    nutrition: { calories: 340, protein: 28, carbs: 12, fat: 20 }, cookTime: 20, difficulty: 'easy', tags: ['京菜', '经典'] },
  { id: 'w8-tomato-soup', name: '番茄豆腐汤', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '番茄', amount: '2个', category: 'vegetable', storageDays: 7 }, { name: '豆腐', amount: '1块', category: 'tofu', storageDays: 5 }],
    steps: ['番茄去皮切块（可用开水烫后剥皮），豆腐切1.5cm小方块', '锅中放油烧热，放入番茄块中火炒2分钟至出汁变软', '加入开水500ml，大火煮开后放入豆腐块', '转中火煮5分钟让豆腐入味', '加盐1小勺、少许白胡椒粉调味，撒葱花淋香油出锅'],
    nutrition: { calories: 100, protein: 8, carbs: 10, fat: 4 }, cookTime: 20, difficulty: 'easy', tags: ['汤品', '开胃'] },
  { id: 'w8-sweet-sour-pork', name: '锅包肉', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [{ name: '猪里脊', amount: '400g', category: 'meat', storageDays: 3 }],
    steps: ['猪里脊切成5mm厚大片，用刀背轻轻敲松', '调淀粉糊：淀粉80g、水60ml、少许盐混合成浓稠糊', '肉片裹匀淀粉糊，宽油烧至六成热，放入肉片炸3分钟定型捞出', '油温升至八成热，复炸1分钟至金黄酥脆捞出', '调糖醋汁：3勺白糖、2勺白醋、1勺番茄酱、少许盐', '锅中少许油炒香葱姜丝，倒入糖醋汁煮开，放入炸好的肉片快速翻炒裹匀出锅'],
    nutrition: { calories: 450, protein: 28, carbs: 30, fat: 26 }, cookTime: 35, difficulty: 'medium', tags: ['东北', '酸甜'] },
  { id: 'w8-stir-snow-peas', name: '清炒荷兰豆', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '荷兰豆', amount: '300g', category: 'vegetable', storageDays: 5 }],
    steps: ['荷兰豆去两头老筋，洗净沥干', '蒜3瓣切片，准备姜丝少许', '锅中放油烧至七成热，下蒜片姜丝爆香10秒', '立即放入荷兰豆大火快炒，不停翻炒约2分钟至断生变色', '加盐半小勺、少许鸡精调味，翻炒均匀即可出锅'],
    nutrition: { calories: 60, protein: 4, carbs: 8, fat: 2 }, cookTime: 8, difficulty: 'easy', tags: ['清爽', '快手'] },
]

export const week8Plan: WeeklyPlan = {
  week: 8, month: 2, year: 2026, dateRange: '2月16日(周一) - 2月22日(周日)',
  meals: [
    { date: '2月16日', weekday: '周一', lunch: { main: week8Recipes[0], side: week8Recipes[1], staple: 'rice' }, dinner: { main: week8Recipes[2], side: week8Recipes[3], staple: 'rice' } },
    { date: '2月17日', weekday: '周二', lunch: { main: week8Recipes[4], side: week8Recipes[5], staple: 'rice' }, dinner: { main: week8Recipes[6], side: week8Recipes[7], staple: 'rice' } },
    { date: '2月18日', weekday: '周三', lunch: { main: week8Recipes[8], side: week8Recipes[9], staple: 'noodle' }, dinner: { main: week8Recipes[10], side: week8Recipes[11], staple: 'rice' } },
    { date: '2月19日', weekday: '周四', lunch: { main: week8Recipes[0], side: week8Recipes[3], staple: 'rice' }, dinner: { main: week8Recipes[4], side: week8Recipes[1], staple: 'rice' } },
    { date: '2月20日', weekday: '周五', lunch: { main: week8Recipes[2], side: week8Recipes[5], staple: 'rice' }, dinner: { main: week8Recipes[6], side: week8Recipes[9], staple: 'rice' } },
    { date: '2月21日', weekday: '周六', lunch: { main: week8Recipes[8], side: week8Recipes[7], staple: 'noodle' }, dinner: { main: week8Recipes[10], side: week8Recipes[11], staple: 'rice' } },
    { date: '2月22日', weekday: '周日', lunch: { main: week8Recipes[0], side: week8Recipes[9], staple: 'rice' }, dinner: { main: week8Recipes[2], side: week8Recipes[3], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '猪里脊', totalAmount: '700g', category: 'meat', usedIn: ['鱼香肉丝', '锅包肉'] },
    { name: '鸡腿', totalAmount: '3个', category: 'meat', usedIn: ['咖喱鸡'] },
    { name: '排骨', totalAmount: '500g', category: 'meat', usedIn: ['红烧排骨'] },
    { name: '鲈鱼', totalAmount: '1条', category: 'seafood', usedIn: ['清蒸鲈鱼'] },
    { name: '嫩豆腐', totalAmount: '4块', category: 'tofu', usedIn: ['麻婆豆腐', '番茄豆腐汤'] },
    { name: '鸡蛋', totalAmount: '4个', category: 'egg', usedIn: ['紫菜蛋花汤'] },
    { name: '黄瓜', totalAmount: '4根', category: 'vegetable', usedIn: ['凉拌黄瓜'] },
    { name: '小青菜', totalAmount: '400g', category: 'vegetable', usedIn: ['蒜蓉青菜'] },
    { name: '土豆', totalAmount: '2个', category: 'vegetable', usedIn: ['咖喱鸡'] },
    { name: '番茄', totalAmount: '4个', category: 'vegetable', usedIn: ['番茄豆腐汤'] },
    { name: '荷兰豆', totalAmount: '300g', category: 'vegetable', usedIn: ['清炒荷兰豆'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '500g', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: { avgCalories: 1400, avgProtein: 80, avgCarbs: 108, avgFat: 70 }
}

// ========== 第九周食谱 (2月23日周一 - 2月28日周六) ==========
const week9Recipes: Recipe[] = [
  { id: 'w9-fried-rice', name: '扬州炒饭', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '米饭', amount: '3碗', category: 'staple', storageDays: 1 }, { name: '虾仁', amount: '100g', category: 'seafood', storageDays: 2 }],
    steps: ['隔夜米饭用手拨散，虾仁去虾线用盐和料酒腌制10分钟', '鸡蛋2个打散，火腿肠、黄瓜、胡萝卜切小丁', '热锅凉油，倒入蛋液炒散成蛋碎盛出', '锅中再放油，下虾仁滑炒变色捞出', '放入火腿、胡萝卜丁炒1分钟，加入米饭大火翻炒3分钟', '加入虾仁、蛋碎、黄瓜丁、青豆，调入1勺生抽、盐翻炒均匀出锅'],
    nutrition: { calories: 450, protein: 18, carbs: 55, fat: 18 }, cookTime: 20, difficulty: 'easy', tags: ['主食', '经典'] },
  { id: 'w9-cold-jellyfish', name: '凉拌海蜇', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '海蜇', amount: '200g', category: 'seafood', storageDays: 7 }],
    steps: ['海蜇头用清水浸泡2小时去咸味，中途换水2-3次', '捞出海蜇切成细丝，用70度热水快速烫10秒捞出（不能用开水）', '立即过冷水降温保持爽脆口感，沥干水分', '蒜4瓣切末，调味汁：2勺陈醋、1勺生抽、1勺白糖、少许香油', '海蜇丝装盘，加入黄瓜丝、香菜段，淋上调味汁拌匀即可'],
    nutrition: { calories: 50, protein: 8, carbs: 3, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '爽脆'] },
  { id: 'w9-sweet-sour-carp', name: '糖醋鲤鱼', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [{ name: '鲤鱼', amount: '1条', category: 'seafood', storageDays: 1 }],
    steps: ['鲤鱼去鳞去内脏洗净，在鱼身两面斜切菱形花刀深至骨', '用盐、料酒抹匀腌制15分钟，然后拍满干淀粉', '宽油烧至七成热，提起鱼尾将鱼头先入油炸定型', '慢慢将整条鱼放入油中，中火炸8分钟至金黄酥脆捞出装盘', '调糖醋汁：4勺白糖、3勺白醋、2勺番茄酱、1勺生抽、半碗水', '另起锅将糖醋汁煮开，加水淀粉勾芡成浓稠状，均匀淋在鱼身上'],
    nutrition: { calories: 350, protein: 30, carbs: 25, fat: 15 }, cookTime: 40, difficulty: 'hard', tags: ['宴客', '传统'] },
  { id: 'w9-stir-celery', name: '西芹炒百合', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '西芹', amount: '200g', category: 'vegetable', storageDays: 7 }, { name: '百合', amount: '100g', category: 'vegetable', storageDays: 7 }],
    steps: ['西芹去老筋切斜刀片，新鲜百合掰成瓣洗净', '烧开水加少许盐，西芹焯烫30秒捞出过冷水保脆', '百合焯烫15秒即可捞出（百合易熟不要久煮）', '锅中放油烧热，下蒜片爆香5秒', '放入西芹和百合大火快炒1分钟', '加盐少许、鸡精调味，淋少许水淀粉使菜品更亮泽出锅'],
    nutrition: { calories: 60, protein: 3, carbs: 12, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['清淡', '养生'] },
  { id: 'w9-tomato-beef', name: '番茄炖牛肉', type: 'main', season: 'winter', flavor: 'sour',
    ingredients: [{ name: '牛腩', amount: '500g', category: 'meat', storageDays: 3 }, { name: '番茄', amount: '3个', category: 'vegetable', storageDays: 7 }],
    steps: ['牛腩切3cm方块，冷水下锅加姜片料酒焯水5分钟捞出洗净', '番茄去皮切大块（用开水烫后容易剥皮）', '锅中放油烧热，下葱姜八角桂皮炒香，放入牛肉块煸炒3分钟', '加入一半番茄炒出汤汁，倒入开水没过肉块', '大火烧开撇去浮沫，转小火炖1.5小时至牛肉软烂', '加入剩余番茄块再炖20分钟，加盐调味，大火收汁即可'],
    nutrition: { calories: 420, protein: 38, carbs: 15, fat: 24 }, cookTime: 150, difficulty: 'medium', tags: ['炖菜', '暖胃'] },
  { id: 'w9-garlic-greens', name: '蒜蓉油麦菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '油麦菜', amount: '400g', category: 'vegetable', storageDays: 3 }],
    steps: ['油麦菜去根洗净，切成8cm长段', '蒜5瓣切成蒜末，分成两份', '锅中放油烧至七成热，下一半蒜末爆香10秒', '立即放入油麦菜大火快炒，不停翻炒约1分钟', '加盐半小勺调味，出锅前撒入剩余生蒜末增加蒜香', '快速翻炒均匀即可装盘（全程不超过2分钟保持脆嫩）'],
    nutrition: { calories: 45, protein: 2, carbs: 6, fat: 2 }, cookTime: 8, difficulty: 'easy', tags: ['快手', '清淡'] },
  { id: 'w9-fried-noodles', name: '炒面', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [{ name: '面条', amount: '400g', category: 'staple', storageDays: 3 }, { name: '猪肉丝', amount: '150g', category: 'meat', storageDays: 3 }],
    steps: ['面条煮至八成熟捞出，淋少许油拌匀防粘连', '猪肉丝用生抽、料酒、淀粉腌制10分钟', '圆白菜切丝，胡萝卜切丝，豆芽洗净备用', '锅中放油滑炒肉丝变色捞出，再炒胡萝卜和圆白菜2分钟', '放入面条，加2勺生抽、1勺老抽、少许盐调色调味', '大火翻炒2分钟，加入肉丝和豆芽炒匀，出锅前淋香油'],
    nutrition: { calories: 480, protein: 20, carbs: 60, fat: 18 }, cookTime: 25, difficulty: 'easy', tags: ['面食', '家常'] },
  { id: 'w9-bean-sprouts-soup', name: '豆芽汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '黄豆芽', amount: '300g', category: 'vegetable', storageDays: 3 }],
    steps: ['黄豆芽掐去根须洗净沥干（去根口感更好）', '锅中放少许油，下姜丝爆香10秒', '放入豆芽翻炒1分钟至微软', '加入开水500ml，大火煮开后转中火煮8分钟', '加盐1小勺、少许白胡椒粉调味', '撒上葱花，淋少许香油即可出锅'],
    nutrition: { calories: 40, protein: 4, carbs: 5, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['汤品', '清淡'] },
  { id: 'w9-braised-duck', name: '老鸭汤', type: 'main', season: 'winter', flavor: 'light',
    ingredients: [{ name: '鸭肉', amount: '半只', category: 'meat', storageDays: 2 }],
    steps: ['鸭肉斩块洗净，冷水下锅加姜片料酒焯水5分钟去腥，捞出洗净', '砂锅中放入鸭块，加入姜片5片、葱结1个', '加入开水没过鸭肉，大火烧开后撇去浮沫', '转小火慢炖1.5小时至鸭肉软烂', '加入酸萝卜或冬瓜块再炖30分钟（可选）', '出锅前加盐1小勺调味，撒葱花枸杞点缀'],
    nutrition: { calories: 350, protein: 30, carbs: 5, fat: 24 }, cookTime: 150, difficulty: 'medium', tags: ['汤品', '滋补'] },
  { id: 'w9-cold-tofu', name: '小葱拌豆腐', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '嫩豆腐', amount: '1块', category: 'tofu', storageDays: 5 }],
    steps: ['嫩豆腐从盒中取出，切成2cm方块轻放入盘中', '小葱2根切成葱花', '调味汁：2勺生抽、1勺香油、少许白糖混合', '将调味汁均匀淋在豆腐块上', '撒上葱花即可食用（不要拌动以保持豆腐完整）'],
    nutrition: { calories: 80, protein: 8, carbs: 4, fat: 4 }, cookTime: 5, difficulty: 'easy', tags: ['简单', '清淡'] },
  { id: 'w9-spicy-crawfish', name: '麻辣小龙虾', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [{ name: '小龙虾', amount: '1kg', category: 'seafood', storageDays: 1 }],
    steps: ['小龙虾用刷子刷洗干净，去除虾线（捏住尾部中间拉出）', '准备香料：干辣椒20个、花椒1大勺、八角3个、桂皮1块、香叶3片', '锅中多放油烧热，下香料小火炒出香味约2分钟', '放入姜片、蒜瓣20颗、郫县豆瓣酱2勺炒出红油', '倒入小龙虾大火翻炒5分钟至虾壳变红', '加入啤酒1罐或开水没过虾，加盐、糖调味，盖盖焖煮15分钟', '大火收汁至浓稠，撒葱花香菜出锅'],
    nutrition: { calories: 300, protein: 35, carbs: 8, fat: 15 }, cookTime: 40, difficulty: 'medium', tags: ['夜宵', '麻辣'] },
  { id: 'w9-radish-ribs-soup', name: '萝卜排骨汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [{ name: '排骨', amount: '300g', category: 'meat', storageDays: 3 }, { name: '白萝卜', amount: '1根', category: 'vegetable', storageDays: 14 }],
    steps: ['排骨冷水下锅焯水3分钟', '萝卜去皮切滚刀块', '排骨加姜片炖40分钟', '加萝卜再炖20分钟', '加盐调味即可'],
    nutrition: { calories: 160, protein: 14, carbs: 10, fat: 8 }, cookTime: 70, difficulty: 'easy', tags: ['汤品', '滋补'] },
]

export const week9Plan: WeeklyPlan = {
  week: 9, month: 2, year: 2026, dateRange: '2月23日(周一) - 2月28日(周六)',
  meals: [
    { date: '2月23日', weekday: '周一', lunch: { main: week9Recipes[0], side: week9Recipes[1], staple: 'rice' }, dinner: { main: week9Recipes[2], side: week9Recipes[3], staple: 'rice' } },
    { date: '2月24日', weekday: '周二', lunch: { main: week9Recipes[4], side: week9Recipes[5], staple: 'rice' }, dinner: { main: week9Recipes[6], side: week9Recipes[7], staple: 'noodle' } },
    { date: '2月25日', weekday: '周三', lunch: { main: week9Recipes[8], side: week9Recipes[9], staple: 'rice' }, dinner: { main: week9Recipes[10], side: week9Recipes[11], staple: 'rice' } },
    { date: '2月26日', weekday: '周四', lunch: { main: week9Recipes[0], side: week9Recipes[3], staple: 'rice' }, dinner: { main: week9Recipes[4], side: week9Recipes[1], staple: 'rice' } },
    { date: '2月27日', weekday: '周五', lunch: { main: week9Recipes[2], side: week9Recipes[5], staple: 'rice' }, dinner: { main: week9Recipes[6], side: week9Recipes[9], staple: 'noodle' } },
    { date: '2月28日', weekday: '周六', lunch: { main: week9Recipes[8], side: week9Recipes[7], staple: 'rice' }, dinner: { main: week9Recipes[10], side: week9Recipes[11], staple: 'rice' } },
  ],
  shoppingList: [
    { name: '牛腩', totalAmount: '500g', category: 'meat', usedIn: ['番茄炖牛肉'] },
    { name: '猪肉丝', totalAmount: '150g', category: 'meat', usedIn: ['炒面'] },
    { name: '排骨', totalAmount: '300g', category: 'meat', usedIn: ['萝卜排骨汤'] },
    { name: '鸭肉', totalAmount: '半只', category: 'meat', usedIn: ['老鸭汤'] },
    { name: '鲤鱼', totalAmount: '1条', category: 'seafood', usedIn: ['糖醋鲤鱼'] },
    { name: '虾仁', totalAmount: '100g', category: 'seafood', usedIn: ['扬州炒饭'] },
    { name: '小龙虾', totalAmount: '1kg', category: 'seafood', usedIn: ['麻辣小龙虾'] },
    { name: '海蜇', totalAmount: '200g', category: 'seafood', usedIn: ['凉拌海蜇'] },
    { name: '嫩豆腐', totalAmount: '1块', category: 'tofu', usedIn: ['小葱拌豆腐'] },
    { name: '番茄', totalAmount: '3个', category: 'vegetable', usedIn: ['番茄炖牛肉'] },
    { name: '西芹', totalAmount: '200g', category: 'vegetable', usedIn: ['西芹炒百合'] },
    { name: '油麦菜', totalAmount: '400g', category: 'vegetable', usedIn: ['蒜蓉油麦菜'] },
    { name: '白萝卜', totalAmount: '1根', category: 'vegetable', usedIn: ['萝卜排骨汤'] },
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭', '炒饭'] },
    { name: '面条', totalAmount: '800g', category: 'staple', usedIn: ['炒面'] },
  ],
  totalNutrition: { avgCalories: 1380, avgProtein: 78, avgCarbs: 110, avgFat: 68 }
}

// 导出所有二月计划
export const februaryWeeklyPlans: WeeklyPlan[] = [week6Plan, week7Plan, week8Plan, week9Plan]
export const allWeeklyPlans: WeeklyPlan[] = [...januaryWeeklyPlans, ...februaryWeeklyPlans]
export const allRecipes = [...week1Recipes, ...week2Recipes, ...week3Recipes, ...week4Recipes, ...week5Recipes, ...week6Recipes, ...week7Recipes, ...week8Recipes, ...week9Recipes]

// ========== 菜品查重机制 ==========
// 检查是否有重复的菜名（跨周重复）
export function checkDuplicateRecipes(): { duplicates: string[], isValid: boolean } {
  const nameCount = new Map<string, string[]>()
  
  allRecipes.forEach(recipe => {
    const existing = nameCount.get(recipe.name) || []
    existing.push(recipe.id)
    nameCount.set(recipe.name, existing)
  })
  
  const duplicates: string[] = []
  nameCount.forEach((ids, name) => {
    if (ids.length > 1) {
      duplicates.push(`"${name}" 出现在: ${ids.join(', ')}`)
    }
  })
  
  return { duplicates, isValid: duplicates.length === 0 }
}

export default { allWeeklyPlans, allRecipes, checkDuplicateRecipes }
