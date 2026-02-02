// 1月食谱 - 按周组织，每餐两道菜
// 第1周到第5周，每天午餐+晚餐，每餐两道菜

export interface Recipe {
  id: string
  name: string
  type: 'main' | 'side' // 主菜或配菜
  season: 'winter' | 'spring' | 'summer' | 'autumn'
  ingredients: Ingredient[]
  steps: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  cookTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  flavor: 'salty' | 'spicy' | 'sour' | 'sweet' | 'light' | 'rich' // 口味
}

export interface Ingredient {
  name: string
  amount: string
  category: 'meat' | 'seafood' | 'vegetable' | 'tofu' | 'egg' | 'seasoning' | 'staple' | 'other'
  storageDays: number // 保鲜天数
}

export interface DailyMeal {
  day: number
  weekday: string
  lunch: {
    main: Recipe
    side: Recipe
    staple: 'rice' | 'noodle' | 'both'
  }
  dinner: {
    main: Recipe
    side: Recipe
    staple: 'rice' | 'noodle' | 'both'
  }
}

export interface WeeklyPlan {
  week: number
  month: number
  dateRange: string
  meals: DailyMeal[]
  shoppingList: ShoppingItem[]
  totalNutrition: {
    avgCalories: number
    avgProtein: number
    avgCarbs: number
    avgFat: number
  }
}

export interface ShoppingItem {
  name: string
  totalAmount: string
  category: Ingredient['category']
  usedIn: string[] // 用于哪些菜
  buyTip?: string
}

// ========== 第一周食谱 (1月1日-1月7日) ==========

const week1Recipes: Recipe[] = [
  // 主菜
  {
    id: 'w1-tomato-beef',
    name: '番茄牛腩',
    type: 'main',
    season: 'winter',
    flavor: 'sour',
    ingredients: [
      { name: '牛腩', amount: '400g', category: 'meat', storageDays: 3 },
      { name: '番茄', amount: '3个', category: 'vegetable', storageDays: 7 },
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
      { name: '洋葱', amount: '半个', category: 'vegetable', storageDays: 14 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
      { name: '八角', amount: '2个', category: 'seasoning', storageDays: 365 },
      { name: '生抽', amount: '2勺', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '牛腩切块冷水下锅焯水，捞出洗净',
      '番茄切块，土豆切块，洋葱切丝',
      '热锅下油，爆香姜片、八角',
      '加入牛腩翻炒，加料酒去腥',
      '加入番茄炒出汁，加开水没过食材',
      '大火烧开转小火炖1.5小时',
      '加入土豆继续炖30分钟，调味即可'
    ],
    nutrition: { calories: 450, protein: 35, carbs: 25, fat: 24 },
    cookTime: 120,
    difficulty: 'medium',
    tags: ['炖菜', '高蛋白', '番茄']
  },
  {
    id: 'w1-stir-fry-yam',
    name: '清炒山药木耳',
    type: 'side',
    season: 'winter',
    flavor: 'light',
    ingredients: [
      { name: '山药', amount: '300g', category: 'vegetable', storageDays: 14 },
      { name: '黑木耳', amount: '50g(干)', category: 'vegetable', storageDays: 365 },
      { name: '胡萝卜', amount: '半根', category: 'vegetable', storageDays: 14 },
      { name: '蒜', amount: '3瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: [
      '山药去皮切片，泡水防氧化',
      '黑木耳提前泡发，撕小朵',
      '胡萝卜切片',
      '热锅下油，爆香蒜末',
      '加入山药、胡萝卜翻炒2分钟',
      '加入木耳继续翻炒，调味出锅'
    ],
    nutrition: { calories: 120, protein: 4, carbs: 25, fat: 2 },
    cookTime: 15,
    difficulty: 'easy',
    tags: ['清淡', '养生', '素菜']
  },
  {
    id: 'w1-braised-lamb',
    name: '红烧羊肉萝卜',
    type: 'main',
    season: 'winter',
    flavor: 'rich',
    ingredients: [
      { name: '羊肉', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '白萝卜', amount: '1根', category: 'vegetable', storageDays: 14 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
      { name: '葱', amount: '2根', category: 'vegetable', storageDays: 7 },
      { name: '八角', amount: '2个', category: 'seasoning', storageDays: 365 },
      { name: '桂皮', amount: '1小块', category: 'seasoning', storageDays: 365 },
      { name: '干辣椒', amount: '3个', category: 'seasoning', storageDays: 365 },
      { name: '冰糖', amount: '30g', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '羊肉切块，冷水下锅加姜片、料酒焯水',
      '白萝卜去皮切滚刀块',
      '热锅下油，加冰糖炒糖色',
      '加入羊肉翻炒上色',
      '加入香料爆香，加开水炖1小时',
      '加入萝卜继续炖30分钟，调味收汁'
    ],
    nutrition: { calories: 420, protein: 38, carbs: 12, fat: 26 },
    cookTime: 100,
    difficulty: 'medium',
    tags: ['温补', '冬季进补', '炖菜']
  },
  {
    id: 'w1-garlic-broccoli',
    name: '蒜蓉西兰花',
    type: 'side',
    season: 'winter',
    flavor: 'light',
    ingredients: [
      { name: '西兰花', amount: '1颗', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
      { name: '蚝油', amount: '1勺', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '西兰花切小朵，盐水浸泡10分钟',
      '烧开水焯烫1分钟捞出',
      '热锅下油，爆香蒜末',
      '加入西兰花翻炒',
      '加蚝油、盐调味即可'
    ],
    nutrition: { calories: 80, protein: 6, carbs: 8, fat: 3 },
    cookTime: 12,
    difficulty: 'easy',
    tags: ['清淡', '快手菜', '维生素']
  },
  {
    id: 'w1-fish-sauerkraut',
    name: '酸菜鱼',
    type: 'main',
    season: 'winter',
    flavor: 'sour',
    ingredients: [
      { name: '草鱼', amount: '1条(约800g)', category: 'seafood', storageDays: 2 },
      { name: '酸菜', amount: '200g', category: 'vegetable', storageDays: 30 },
      { name: '泡椒', amount: '50g', category: 'seasoning', storageDays: 90 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
      { name: '花椒', amount: '1勺', category: 'seasoning', storageDays: 365 },
      { name: '鸡蛋', amount: '1个', category: 'egg', storageDays: 14 },
    ],
    steps: [
      '草鱼去骨切片，加蛋清、淀粉腌制15分钟',
      '酸菜切丝，泡椒切碎',
      '热锅下油，爆香姜蒜、花椒',
      '加入酸菜炒香，加水煮开',
      '先下鱼骨煮10分钟，再下鱼片',
      '鱼片变色即熟，撒香菜淋热油'
    ],
    nutrition: { calories: 350, protein: 40, carbs: 8, fat: 18 },
    cookTime: 40,
    difficulty: 'medium',
    tags: ['川菜', '开胃', '高蛋白']
  },
  {
    id: 'w1-home-tofu',
    name: '家常豆腐',
    type: 'side',
    season: 'winter',
    flavor: 'salty',
    ingredients: [
      { name: '北豆腐', amount: '1块', category: 'tofu', storageDays: 5 },
      { name: '五花肉', amount: '100g', category: 'meat', storageDays: 3 },
      { name: '青红椒', amount: '各1个', category: 'vegetable', storageDays: 7 },
      { name: '豆瓣酱', amount: '1勺', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '豆腐切厚片，五花肉切片',
      '豆腐两面煎至金黄盛出',
      '热锅爆香五花肉',
      '加入豆瓣酱炒出红油',
      '加入豆腐，加少许水焖煮',
      '加入青红椒，调味出锅'
    ],
    nutrition: { calories: 280, protein: 18, carbs: 8, fat: 20 },
    cookTime: 25,
    difficulty: 'easy',
    tags: ['家常', '下饭菜', '豆腐']
  },
  {
    id: 'w1-potato-chicken',
    name: '土豆炖鸡',
    type: 'main',
    season: 'winter',
    flavor: 'salty',
    ingredients: [
      { name: '鸡腿', amount: '3个', category: 'meat', storageDays: 3 },
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
      { name: '青椒', amount: '2个', category: 'vegetable', storageDays: 7 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
      { name: '八角', amount: '2个', category: 'seasoning', storageDays: 365 },
      { name: '生抽', amount: '2勺', category: 'seasoning', storageDays: 365 },
      { name: '老抽', amount: '1勺', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '鸡腿剁块焯水，土豆切块',
      '热锅下油，爆香姜、八角',
      '加入鸡块翻炒至变色',
      '加调料和开水，炖30分钟',
      '加入土豆继续炖20分钟',
      '加青椒，收汁出锅'
    ],
    nutrition: { calories: 400, protein: 30, carbs: 28, fat: 20 },
    cookTime: 60,
    difficulty: 'easy',
    tags: ['家常', '炖菜', '下饭']
  },
  {
    id: 'w1-vinegar-cabbage',
    name: '醋溜白菜',
    type: 'side',
    season: 'winter',
    flavor: 'sour',
    ingredients: [
      { name: '大白菜', amount: '半颗', category: 'vegetable', storageDays: 14 },
      { name: '干辣椒', amount: '5个', category: 'seasoning', storageDays: 365 },
      { name: '花椒', amount: '1勺', category: 'seasoning', storageDays: 365 },
      { name: '陈醋', amount: '2勺', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '白菜洗净，叶和帮分开切块',
      '调汁：醋、生抽、糖、盐',
      '热锅下油，爆香干辣椒、花椒',
      '先下白菜帮翻炒1分钟',
      '再下白菜叶快速翻炒',
      '倒入调好的汁，翻炒均匀即可'
    ],
    nutrition: { calories: 60, protein: 2, carbs: 10, fat: 2 },
    cookTime: 10,
    difficulty: 'easy',
    tags: ['开胃', '快手菜', '素菜']
  },
  {
    id: 'w1-sweet-sour-ribs',
    name: '糖醋排骨',
    type: 'main',
    season: 'winter',
    flavor: 'sweet',
    ingredients: [
      { name: '肋排', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
      { name: '陈醋', amount: '3勺', category: 'seasoning', storageDays: 365 },
      { name: '白糖', amount: '3勺', category: 'seasoning', storageDays: 365 },
      { name: '番茄酱', amount: '2勺', category: 'seasoning', storageDays: 90 },
    ],
    steps: [
      '肋排剁小块焯水',
      '调糖醋汁：生抽、老抽、醋、糖、番茄酱',
      '热锅下油，爆香姜片',
      '加入排骨翻炒，加料酒',
      '倒入糖醋汁和适量水',
      '小火焖30分钟，大火收汁'
    ],
    nutrition: { calories: 480, protein: 28, carbs: 22, fat: 32 },
    cookTime: 50,
    difficulty: 'medium',
    tags: ['经典', '宴客菜', '酸甜']
  },
  {
    id: 'w1-mushroom-veggie',
    name: '香菇油菜',
    type: 'side',
    season: 'winter',
    flavor: 'light',
    ingredients: [
      { name: '油菜', amount: '300g', category: 'vegetable', storageDays: 5 },
      { name: '香菇', amount: '6朵', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '3瓣', category: 'seasoning', storageDays: 30 },
      { name: '蚝油', amount: '1勺', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '油菜洗净，香菇切片',
      '烧开水焯烫油菜30秒摆盘',
      '热锅下油，爆香蒜末',
      '加入香菇翻炒',
      '加蚝油、生抽、少许水煮开',
      '淋在油菜上即可'
    ],
    nutrition: { calories: 70, protein: 4, carbs: 8, fat: 3 },
    cookTime: 15,
    difficulty: 'easy',
    tags: ['清淡', '素菜', '快手菜']
  },
  {
    id: 'w1-braised-pork',
    name: '红烧肉',
    type: 'main',
    season: 'winter',
    flavor: 'rich',
    ingredients: [
      { name: '五花肉', amount: '600g', category: 'meat', storageDays: 3 },
      { name: '姜', amount: '1块', category: 'seasoning', storageDays: 14 },
      { name: '葱', amount: '2根', category: 'vegetable', storageDays: 7 },
      { name: '八角', amount: '3个', category: 'seasoning', storageDays: 365 },
      { name: '桂皮', amount: '1块', category: 'seasoning', storageDays: 365 },
      { name: '冰糖', amount: '40g', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '五花肉切麻将块焯水',
      '热锅下油，放冰糖炒糖色',
      '加入五花肉翻炒上色',
      '加入香料爆香',
      '加料酒、生抽、老抽、开水',
      '小火炖1小时，大火收汁'
    ],
    nutrition: { calories: 550, protein: 24, carbs: 8, fat: 48 },
    cookTime: 90,
    difficulty: 'medium',
    tags: ['经典', '硬菜', '下饭']
  },
  {
    id: 'w1-cucumber-salad',
    name: '凉拌黄瓜',
    type: 'side',
    season: 'winter',
    flavor: 'sour',
    ingredients: [
      { name: '黄瓜', amount: '2根', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
      { name: '香醋', amount: '2勺', category: 'seasoning', storageDays: 365 },
      { name: '辣椒油', amount: '1勺', category: 'seasoning', storageDays: 90 },
    ],
    steps: [
      '黄瓜拍碎切段',
      '加盐腌制10分钟，挤出水分',
      '调汁：生抽、香醋、白糖、香油',
      '热油泼在蒜末上',
      '将所有调料倒入黄瓜中拌匀'
    ],
    nutrition: { calories: 50, protein: 2, carbs: 8, fat: 2 },
    cookTime: 15,
    difficulty: 'easy',
    tags: ['凉菜', '开胃', '快手菜']
  },
  {
    id: 'w1-boiled-meat',
    name: '水煮肉片',
    type: 'main',
    season: 'winter',
    flavor: 'spicy',
    ingredients: [
      { name: '里脊肉', amount: '300g', category: 'meat', storageDays: 3 },
      { name: '豆芽', amount: '200g', category: 'vegetable', storageDays: 3 },
      { name: '莴笋', amount: '1根', category: 'vegetable', storageDays: 7 },
      { name: '豆瓣酱', amount: '2勺', category: 'seasoning', storageDays: 365 },
      { name: '干辣椒', amount: '10个', category: 'seasoning', storageDays: 365 },
      { name: '花椒', amount: '1勺', category: 'seasoning', storageDays: 365 },
      { name: '鸡蛋', amount: '1个', category: 'egg', storageDays: 14 },
    ],
    steps: [
      '里脊肉切片，加蛋清、淀粉腌制',
      '豆芽、莴笋焯水铺底',
      '热锅下油，爆香豆瓣酱',
      '加水煮开，下肉片滑熟',
      '将肉片和汤倒入碗中',
      '撒蒜末、干辣椒、花椒，热油泼上'
    ],
    nutrition: { calories: 380, protein: 32, carbs: 10, fat: 24 },
    cookTime: 30,
    difficulty: 'medium',
    tags: ['川菜', '麻辣', '下饭']
  },
  {
    id: 'w1-egg-soup',
    name: '紫菜蛋花汤',
    type: 'side',
    season: 'winter',
    flavor: 'light',
    ingredients: [
      { name: '鸡蛋', amount: '2个', category: 'egg', storageDays: 14 },
      { name: '紫菜', amount: '10g', category: 'vegetable', storageDays: 365 },
      { name: '虾皮', amount: '10g', category: 'seafood', storageDays: 90 },
      { name: '葱', amount: '1根', category: 'vegetable', storageDays: 7 },
      { name: '香油', amount: '少许', category: 'seasoning', storageDays: 365 },
    ],
    steps: [
      '鸡蛋打散备用',
      '烧开水，加入紫菜、虾皮',
      '用筷子搅动，缓缓倒入蛋液',
      '蛋花成型后关火',
      '加盐调味，淋香油撒葱花'
    ],
    nutrition: { calories: 100, protein: 8, carbs: 3, fat: 6 },
    cookTime: 10,
    difficulty: 'easy',
    tags: ['汤品', '快手菜', '清淡']
  },
]

// 第一周每日餐单
export const week1Plan: WeeklyPlan = {
  week: 1,
  month: 1,
  dateRange: '1月1日 - 1月7日',
  meals: [
    {
      day: 1,
      weekday: '周一',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-tomato-beef')!,
        side: week1Recipes.find(r => r.id === 'w1-stir-fry-yam')!,
        staple: 'rice'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-fish-sauerkraut')!,
        side: week1Recipes.find(r => r.id === 'w1-home-tofu')!,
        staple: 'rice'
      }
    },
    {
      day: 2,
      weekday: '周二',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-braised-lamb')!,
        side: week1Recipes.find(r => r.id === 'w1-garlic-broccoli')!,
        staple: 'noodle'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-potato-chicken')!,
        side: week1Recipes.find(r => r.id === 'w1-vinegar-cabbage')!,
        staple: 'rice'
      }
    },
    {
      day: 3,
      weekday: '周三',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-sweet-sour-ribs')!,
        side: week1Recipes.find(r => r.id === 'w1-mushroom-veggie')!,
        staple: 'rice'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-boiled-meat')!,
        side: week1Recipes.find(r => r.id === 'w1-egg-soup')!,
        staple: 'rice'
      }
    },
    {
      day: 4,
      weekday: '周四',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-braised-pork')!,
        side: week1Recipes.find(r => r.id === 'w1-cucumber-salad')!,
        staple: 'rice'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-tomato-beef')!, // 复用牛腩（周一煮的可以吃两顿）
        side: week1Recipes.find(r => r.id === 'w1-garlic-broccoli')!,
        staple: 'noodle'
      }
    },
    {
      day: 5,
      weekday: '周五',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-fish-sauerkraut')!,
        side: week1Recipes.find(r => r.id === 'w1-stir-fry-yam')!,
        staple: 'rice'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-braised-lamb')!,
        side: week1Recipes.find(r => r.id === 'w1-vinegar-cabbage')!,
        staple: 'noodle'
      }
    },
    {
      day: 6,
      weekday: '周六',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-potato-chicken')!,
        side: week1Recipes.find(r => r.id === 'w1-mushroom-veggie')!,
        staple: 'rice'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-sweet-sour-ribs')!,
        side: week1Recipes.find(r => r.id === 'w1-home-tofu')!,
        staple: 'rice'
      }
    },
    {
      day: 7,
      weekday: '周日',
      lunch: {
        main: week1Recipes.find(r => r.id === 'w1-braised-pork')!,
        side: week1Recipes.find(r => r.id === 'w1-egg-soup')!,
        staple: 'rice'
      },
      dinner: {
        main: week1Recipes.find(r => r.id === 'w1-boiled-meat')!,
        side: week1Recipes.find(r => r.id === 'w1-cucumber-salad')!,
        staple: 'noodle'
      }
    }
  ],
  shoppingList: [
    // 肉类
    { name: '牛腩', totalAmount: '400g', category: 'meat', usedIn: ['番茄牛腩'], buyTip: '选择带筋的牛腩，炖出来更香' },
    { name: '羊肉', totalAmount: '500g', category: 'meat', usedIn: ['红烧羊肉萝卜'], buyTip: '羊腿肉最佳，膻味小' },
    { name: '五花肉', totalAmount: '700g', category: 'meat', usedIn: ['红烧肉', '家常豆腐'], buyTip: '选择五花三层的' },
    { name: '肋排', totalAmount: '500g', category: 'meat', usedIn: ['糖醋排骨'], buyTip: '选择小排，肉嫩' },
    { name: '里脊肉', totalAmount: '300g', category: 'meat', usedIn: ['水煮肉片'], buyTip: '猪里脊或牛里脊都可' },
    { name: '鸡腿', totalAmount: '3个', category: 'meat', usedIn: ['土豆炖鸡'], buyTip: '鸡腿肉质嫩，比鸡胸好吃' },
    // 海鲜
    { name: '草鱼', totalAmount: '1条(约800g)', category: 'seafood', usedIn: ['酸菜鱼'], buyTip: '让店家片好鱼片' },
    { name: '虾皮', totalAmount: '50g', category: 'seafood', usedIn: ['紫菜蛋花汤'], buyTip: '买淡干虾皮' },
    // 蔬菜
    { name: '番茄', totalAmount: '6个', category: 'vegetable', usedIn: ['番茄牛腩'], buyTip: '选红透的，炒出汁多' },
    { name: '土豆', totalAmount: '4个', category: 'vegetable', usedIn: ['番茄牛腩', '土豆炖鸡'] },
    { name: '白萝卜', totalAmount: '1根', category: 'vegetable', usedIn: ['红烧羊肉萝卜'] },
    { name: '山药', totalAmount: '300g', category: 'vegetable', usedIn: ['清炒山药木耳'], buyTip: '铁棍山药最好' },
    { name: '西兰花', totalAmount: '2颗', category: 'vegetable', usedIn: ['蒜蓉西兰花'] },
    { name: '大白菜', totalAmount: '1颗', category: 'vegetable', usedIn: ['醋溜白菜'] },
    { name: '油菜', totalAmount: '600g', category: 'vegetable', usedIn: ['香菇油菜'] },
    { name: '香菇', totalAmount: '12朵', category: 'vegetable', usedIn: ['香菇油菜'] },
    { name: '黄瓜', totalAmount: '4根', category: 'vegetable', usedIn: ['凉拌黄瓜'] },
    { name: '豆芽', totalAmount: '200g', category: 'vegetable', usedIn: ['水煮肉片'], buyTip: '绿豆芽为佳' },
    { name: '莴笋', totalAmount: '1根', category: 'vegetable', usedIn: ['水煮肉片'] },
    { name: '青椒', totalAmount: '4个', category: 'vegetable', usedIn: ['土豆炖鸡', '家常豆腐'] },
    { name: '红椒', totalAmount: '2个', category: 'vegetable', usedIn: ['家常豆腐'] },
    { name: '胡萝卜', totalAmount: '2根', category: 'vegetable', usedIn: ['清炒山药木耳'] },
    { name: '洋葱', totalAmount: '1个', category: 'vegetable', usedIn: ['番茄牛腩'] },
    { name: '葱', totalAmount: '1把', category: 'vegetable', usedIn: ['多道菜'] },
    // 豆制品
    { name: '北豆腐', totalAmount: '2块', category: 'tofu', usedIn: ['家常豆腐'] },
    // 蛋类
    { name: '鸡蛋', totalAmount: '10个', category: 'egg', usedIn: ['酸菜鱼', '水煮肉片', '紫菜蛋花汤'] },
    // 干货调料
    { name: '黑木耳(干)', totalAmount: '50g', category: 'vegetable', usedIn: ['清炒山药木耳'] },
    { name: '紫菜', totalAmount: '20g', category: 'vegetable', usedIn: ['紫菜蛋花汤'] },
    { name: '酸菜', totalAmount: '200g', category: 'vegetable', usedIn: ['酸菜鱼'] },
    { name: '泡椒', totalAmount: '50g', category: 'seasoning', usedIn: ['酸菜鱼'] },
    // 主食
    { name: '大米', totalAmount: '3kg', category: 'staple', usedIn: ['米饭'] },
    { name: '面条', totalAmount: '1kg', category: 'staple', usedIn: ['面条'] },
  ],
  totalNutrition: {
    avgCalories: 1450,
    avgProtein: 85,
    avgCarbs: 120,
    avgFat: 75
  }
}

export const januaryWeeklyPlans: WeeklyPlan[] = [week1Plan]
export const allRecipes = week1Recipes

export default { week1Plan, allRecipes }
