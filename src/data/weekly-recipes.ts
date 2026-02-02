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
    steps: ['牛腩切块焯水', '番茄土豆切块', '爆香姜片八角', '加牛腩翻炒', '加番茄炒出汁', '炖1.5小时', '加土豆炖30分钟'],
    nutrition: { calories: 450, protein: 35, carbs: 25, fat: 24 }, cookTime: 120, difficulty: 'medium', tags: ['炖菜', '高蛋白']
  },
  {
    id: 'w1-stir-fry-yam', name: '清炒山药木耳', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '山药', amount: '300g', category: 'vegetable', storageDays: 14 },
      { name: '黑木耳', amount: '50g(干)', category: 'vegetable', storageDays: 365 },
      { name: '胡萝卜', amount: '半根', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['山药去皮切片', '木耳泡发', '胡萝卜切片', '爆香蒜末', '翻炒出锅'],
    nutrition: { calories: 120, protein: 4, carbs: 25, fat: 2 }, cookTime: 15, difficulty: 'easy', tags: ['清淡', '养生']
  },
  {
    id: 'w1-braised-lamb', name: '红烧羊肉萝卜', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '羊肉', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '白萝卜', amount: '1根', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['羊肉焯水', '萝卜切块', '炒糖色', '炖1小时', '加萝卜炖30分钟'],
    nutrition: { calories: 420, protein: 38, carbs: 12, fat: 26 }, cookTime: 100, difficulty: 'medium', tags: ['温补', '冬季']
  },
  {
    id: 'w1-garlic-broccoli', name: '蒜蓉西兰花', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '西兰花', amount: '1颗', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['西兰花切小朵焯水', '爆香蒜末', '加蚝油翻炒'],
    nutrition: { calories: 80, protein: 6, carbs: 8, fat: 3 }, cookTime: 12, difficulty: 'easy', tags: ['清淡', '快手']
  },
  {
    id: 'w1-fish-sauerkraut', name: '酸菜鱼', type: 'main', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '草鱼', amount: '1条', category: 'seafood', storageDays: 2 },
      { name: '酸菜', amount: '200g', category: 'vegetable', storageDays: 30 },
    ],
    steps: ['鱼片腌制', '酸菜炒香', '煮汤下鱼片', '淋热油'],
    nutrition: { calories: 350, protein: 40, carbs: 8, fat: 18 }, cookTime: 40, difficulty: 'medium', tags: ['川菜', '开胃']
  },
  {
    id: 'w1-home-tofu', name: '家常豆腐', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '北豆腐', amount: '1块', category: 'tofu', storageDays: 5 },
      { name: '五花肉', amount: '100g', category: 'meat', storageDays: 3 },
    ],
    steps: ['豆腐煎金黄', '爆香肉片', '加豆瓣酱', '焖煮入味'],
    nutrition: { calories: 280, protein: 18, carbs: 8, fat: 20 }, cookTime: 25, difficulty: 'easy', tags: ['家常', '下饭']
  },
  {
    id: 'w1-sweet-sour-ribs', name: '糖醋排骨', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '肋排', amount: '500g', category: 'meat', storageDays: 3 },
    ],
    steps: ['排骨焯水', '调糖醋汁', '炒上色', '焖煮收汁'],
    nutrition: { calories: 480, protein: 28, carbs: 22, fat: 32 }, cookTime: 50, difficulty: 'medium', tags: ['经典', '酸甜']
  },
  {
    id: 'w1-mushroom-veggie', name: '香菇油菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '油菜', amount: '300g', category: 'vegetable', storageDays: 5 },
      { name: '香菇', amount: '6朵', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['油菜焯水摆盘', '香菇炒香', '淋汁上桌'],
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
    steps: ['豆腐切块焯水', '炒香肉末', '加豆瓣酱', '加豆腐焖煮', '勾芡撒花椒'],
    nutrition: { calories: 320, protein: 22, carbs: 12, fat: 22 }, cookTime: 20, difficulty: 'easy', tags: ['川菜', '下饭']
  },
  {
    id: 'w2-spinach-egg', name: '菠菜炒蛋', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '菠菜', amount: '300g', category: 'vegetable', storageDays: 3 },
      { name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 },
    ],
    steps: ['菠菜焯水切段', '鸡蛋炒散', '加入菠菜翻炒'],
    nutrition: { calories: 150, protein: 12, carbs: 5, fat: 10 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '营养']
  },
  {
    id: 'w2-braised-chicken', name: '黄焖鸡', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '三黄鸡', amount: '半只', category: 'meat', storageDays: 2 },
      { name: '香菇', amount: '8朵', category: 'vegetable', storageDays: 7 },
      { name: '青椒', amount: '2个', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['鸡肉剁块', '爆香姜蒜', '加鸡肉炒变色', '加调料焖煮', '加香菇青椒'],
    nutrition: { calories: 380, protein: 35, carbs: 10, fat: 22 }, cookTime: 45, difficulty: 'medium', tags: ['家常', '鲜香']
  },
  {
    id: 'w2-cold-kelp', name: '凉拌海带丝', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '海带丝', amount: '200g', category: 'vegetable', storageDays: 7 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['海带丝焯水', '加蒜末调料拌匀'],
    nutrition: { calories: 45, protein: 2, carbs: 8, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['凉菜', '开胃']
  },
  {
    id: 'w2-steamed-fish', name: '清蒸鲈鱼', type: 'main', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '鲈鱼', amount: '1条', category: 'seafood', storageDays: 1 },
      { name: '葱姜', amount: '适量', category: 'seasoning', storageDays: 7 },
    ],
    steps: ['鲈鱼处理干净', '铺葱姜', '蒸8分钟', '淋蒸鱼豉油', '泼热油'],
    nutrition: { calories: 180, protein: 32, carbs: 2, fat: 5 }, cookTime: 20, difficulty: 'easy', tags: ['清淡', '高蛋白']
  },
  {
    id: 'w2-tomato-egg', name: '番茄炒蛋', type: 'side', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '番茄', amount: '2个', category: 'vegetable', storageDays: 7 },
      { name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 },
    ],
    steps: ['番茄切块', '鸡蛋炒散盛出', '炒番茄出汁', '加回鸡蛋'],
    nutrition: { calories: 200, protein: 14, carbs: 12, fat: 12 }, cookTime: 15, difficulty: 'easy', tags: ['经典', '下饭']
  },
  {
    id: 'w2-kung-pao-chicken', name: '宫保鸡丁', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '鸡胸肉', amount: '300g', category: 'meat', storageDays: 2 },
      { name: '花生米', amount: '50g', category: 'other', storageDays: 90 },
      { name: '干辣椒', amount: '10个', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['鸡肉切丁腌制', '炸香花生', '爆香辣椒花椒', '炒鸡丁', '调味加花生'],
    nutrition: { calories: 350, protein: 35, carbs: 15, fat: 18 }, cookTime: 25, difficulty: 'medium', tags: ['川菜', '经典']
  },
  {
    id: 'w2-stir-beans', name: '干煸四季豆', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '四季豆', amount: '400g', category: 'vegetable', storageDays: 5 },
      { name: '肉末', amount: '50g', category: 'meat', storageDays: 2 },
    ],
    steps: ['四季豆切段', '油炸至皱皮', '爆香肉末', '加四季豆翻炒'],
    nutrition: { calories: 120, protein: 8, carbs: 12, fat: 5 }, cookTime: 20, difficulty: 'easy', tags: ['下饭', '家常']
  },
  {
    id: 'w2-pork-green-pepper', name: '青椒肉丝', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '猪里脊', amount: '250g', category: 'meat', storageDays: 3 },
      { name: '青椒', amount: '3个', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['肉丝腌制', '青椒切丝', '滑炒肉丝', '加青椒翻炒'],
    nutrition: { calories: 280, protein: 25, carbs: 8, fat: 17 }, cookTime: 15, difficulty: 'easy', tags: ['快手', '下饭']
  },
  {
    id: 'w2-seaweed-soup', name: '紫菜虾皮汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '紫菜', amount: '10g', category: 'vegetable', storageDays: 365 },
      { name: '虾皮', amount: '10g', category: 'seafood', storageDays: 90 },
    ],
    steps: ['烧开水', '下紫菜虾皮', '调味即可'],
    nutrition: { calories: 30, protein: 4, carbs: 3, fat: 1 }, cookTime: 5, difficulty: 'easy', tags: ['汤品', '快手']
  },
  {
    id: 'w2-twice-cooked', name: '回锅肉', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '五花肉', amount: '400g', category: 'meat', storageDays: 3 },
      { name: '蒜苗', amount: '200g', category: 'vegetable', storageDays: 5 },
    ],
    steps: ['五花肉煮熟切片', '爆香豆瓣酱', '加肉片煸炒', '加蒜苗翻炒'],
    nutrition: { calories: 450, protein: 22, carbs: 8, fat: 38 }, cookTime: 30, difficulty: 'medium', tags: ['川菜', '下饭']
  },
  {
    id: 'w2-winter-melon', name: '虾皮冬瓜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '冬瓜', amount: '500g', category: 'vegetable', storageDays: 14 },
      { name: '虾皮', amount: '20g', category: 'seafood', storageDays: 90 },
    ],
    steps: ['冬瓜切块', '爆香虾皮', '加冬瓜煮软'],
    nutrition: { calories: 60, protein: 5, carbs: 10, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['清淡', '养生']
  },
  {
    id: 'w2-fish-flavored', name: '鱼香肉丝', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '猪里脊', amount: '300g', category: 'meat', storageDays: 3 },
      { name: '木耳', amount: '50g', category: 'vegetable', storageDays: 365 },
      { name: '胡萝卜', amount: '1根', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['肉丝腌制', '配菜切丝', '调鱼香汁', '炒肉丝', '加配菜和汁'],
    nutrition: { calories: 320, protein: 28, carbs: 18, fat: 16 }, cookTime: 25, difficulty: 'medium', tags: ['川菜', '经典']
  },
  {
    id: 'w2-garlic-lettuce', name: '蒜蓉生菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '生菜', amount: '400g', category: 'vegetable', storageDays: 3 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['生菜洗净', '爆香蒜末', '快炒生菜'],
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
    steps: ['鲤鱼处理干净', '两面煎金黄', '加调料焖煮'],
    nutrition: { calories: 220, protein: 28, carbs: 5, fat: 10 }, cookTime: 35, difficulty: 'medium', tags: ['红烧', '鲜美']
  },
  {
    id: 'w3-cucumber-wood-ear', name: '黄瓜炒木耳', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '黄瓜', amount: '2根', category: 'vegetable', storageDays: 7 },
      { name: '木耳', amount: '50g', category: 'vegetable', storageDays: 365 },
    ],
    steps: ['黄瓜切片', '木耳泡发', '快炒出锅'],
    nutrition: { calories: 60, protein: 3, carbs: 10, fat: 1 }, cookTime: 10, difficulty: 'easy', tags: ['清爽', '快手']
  },
  {
    id: 'w3-curry-beef', name: '咖喱牛肉', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '牛腱子', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '咖喱块', amount: '100g', category: 'seasoning', storageDays: 180 },
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['牛肉切块焯水', '炖至软烂', '加土豆胡萝卜', '加咖喱块'],
    nutrition: { calories: 420, protein: 38, carbs: 25, fat: 20 }, cookTime: 90, difficulty: 'medium', tags: ['异域风味', '浓郁']
  },
  {
    id: 'w3-hot-sour-shreds', name: '酸辣土豆丝', type: 'side', season: 'winter', flavor: 'sour',
    ingredients: [
      { name: '土豆', amount: '2个', category: 'vegetable', storageDays: 14 },
      { name: '干辣椒', amount: '5个', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['土豆切丝泡水', '爆香辣椒', '快炒土豆丝', '加醋调味'],
    nutrition: { calories: 100, protein: 2, carbs: 20, fat: 2 }, cookTime: 12, difficulty: 'easy', tags: ['开胃', '下饭']
  },
  {
    id: 'w3-braised-duck', name: '啤酒鸭', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '鸭肉', amount: '半只', category: 'meat', storageDays: 2 },
      { name: '啤酒', amount: '1罐', category: 'other', storageDays: 180 },
    ],
    steps: ['鸭肉剁块焯水', '炒至金黄', '加啤酒焖煮'],
    nutrition: { calories: 380, protein: 30, carbs: 8, fat: 26 }, cookTime: 60, difficulty: 'medium', tags: ['特色', '软烂']
  },
  {
    id: 'w3-fried-cabbage', name: '手撕包菜', type: 'side', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '包菜', amount: '半颗', category: 'vegetable', storageDays: 14 },
      { name: '干辣椒', amount: '5个', category: 'seasoning', storageDays: 365 },
    ],
    steps: ['包菜手撕块', '爆香辣椒蒜', '大火快炒'],
    nutrition: { calories: 70, protein: 2, carbs: 12, fat: 2 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '下饭']
  },
  {
    id: 'w3-steamed-spare-ribs', name: '粉蒸排骨', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '排骨', amount: '500g', category: 'meat', storageDays: 3 },
      { name: '蒸肉粉', amount: '100g', category: 'seasoning', storageDays: 180 },
      { name: '红薯', amount: '1个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['排骨腌制', '裹蒸肉粉', '铺红薯蒸40分钟'],
    nutrition: { calories: 450, protein: 28, carbs: 30, fat: 26 }, cookTime: 50, difficulty: 'easy', tags: ['蒸菜', '软糯']
  },
  {
    id: 'w3-egg-drop-soup', name: '西红柿蛋汤', type: 'side', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '番茄', amount: '2个', category: 'vegetable', storageDays: 7 },
      { name: '鸡蛋', amount: '2个', category: 'egg', storageDays: 14 },
    ],
    steps: ['番茄切块炒软', '加水煮开', '淋蛋液'],
    nutrition: { calories: 100, protein: 8, carbs: 8, fat: 5 }, cookTime: 15, difficulty: 'easy', tags: ['汤品', '开胃']
  },
  {
    id: 'w3-salt-pepper-shrimp', name: '椒盐虾', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '基围虾', amount: '500g', category: 'seafood', storageDays: 1 },
    ],
    steps: ['虾处理干净', '油炸酥脆', '撒椒盐葱花'],
    nutrition: { calories: 250, protein: 35, carbs: 5, fat: 10 }, cookTime: 20, difficulty: 'easy', tags: ['宴客', '酥脆']
  },
  {
    id: 'w3-cold-tofu', name: '皮蛋豆腐', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '内酯豆腐', amount: '1盒', category: 'tofu', storageDays: 7 },
      { name: '皮蛋', amount: '2个', category: 'egg', storageDays: 30 },
    ],
    steps: ['豆腐切块', '皮蛋切瓣', '淋酱油香油'],
    nutrition: { calories: 150, protein: 12, carbs: 5, fat: 10 }, cookTime: 5, difficulty: 'easy', tags: ['凉菜', '简单']
  },
  {
    id: 'w3-lion-head', name: '红烧狮子头', type: 'main', season: 'winter', flavor: 'rich',
    ingredients: [
      { name: '猪肉馅', amount: '500g', category: 'meat', storageDays: 2 },
      { name: '荸荠', amount: '5个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['肉馅加荸荠调味', '搓成大丸子', '煎至金黄', '加汤焖煮'],
    nutrition: { calories: 480, protein: 30, carbs: 15, fat: 35 }, cookTime: 50, difficulty: 'medium', tags: ['经典', '宴客']
  },
  {
    id: 'w3-stir-bean-sprouts', name: '清炒绿豆芽', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '绿豆芽', amount: '400g', category: 'vegetable', storageDays: 2 },
    ],
    steps: ['豆芽洗净', '大火快炒', '加醋调味'],
    nutrition: { calories: 40, protein: 4, carbs: 6, fat: 1 }, cookTime: 5, difficulty: 'easy', tags: ['快手', '爽脆']
  },
  {
    id: 'w3-cola-chicken', name: '可乐鸡翅', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '鸡翅', amount: '12个', category: 'meat', storageDays: 2 },
      { name: '可乐', amount: '1罐', category: 'other', storageDays: 180 },
    ],
    steps: ['鸡翅划刀', '煎至金黄', '加可乐焖煮收汁'],
    nutrition: { calories: 350, protein: 28, carbs: 20, fat: 18 }, cookTime: 30, difficulty: 'easy', tags: ['简单', '孩子爱吃']
  },
  {
    id: 'w3-garlic-water-spinach', name: '蒜蓉空心菜', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '空心菜', amount: '400g', category: 'vegetable', storageDays: 2 },
      { name: '蒜', amount: '5瓣', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['空心菜洗净', '爆香蒜末', '大火快炒'],
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
    steps: ['五花肉煮熟炸皮', '切片码碗', '铺梅菜蒸2小时', '倒扣上桌'],
    nutrition: { calories: 550, protein: 25, carbs: 10, fat: 48 }, cookTime: 150, difficulty: 'hard', tags: ['宴客', '经典']
  },
  {
    id: 'w4-stir-fry-celery', name: '芹菜炒香干', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '芹菜', amount: '300g', category: 'vegetable', storageDays: 7 },
      { name: '香干', amount: '200g', category: 'tofu', storageDays: 5 },
    ],
    steps: ['芹菜切段', '香干切条', '快炒出锅'],
    nutrition: { calories: 120, protein: 10, carbs: 8, fat: 6 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '家常']
  },
  {
    id: 'w4-sweet-sour-fish', name: '糖醋鱼块', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '草鱼', amount: '1条', category: 'seafood', storageDays: 1 },
    ],
    steps: ['鱼切块腌制', '裹淀粉油炸', '淋糖醋汁'],
    nutrition: { calories: 320, protein: 30, carbs: 25, fat: 12 }, cookTime: 30, difficulty: 'medium', tags: ['酸甜', '宴客']
  },
  {
    id: 'w4-oyster-mushroom', name: '蚝油杏鲍菇', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '杏鲍菇', amount: '300g', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['杏鲍菇切片', '两面煎金黄', '加蚝油调味'],
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
    steps: ['食材分别处理', '过油炸熟', '爆香麻辣底料', '加食材翻炒'],
    nutrition: { calories: 520, protein: 28, carbs: 35, fat: 32 }, cookTime: 40, difficulty: 'medium', tags: ['麻辣', '下饭']
  },
  {
    id: 'w4-corn-soup', name: '玉米排骨汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '排骨', amount: '300g', category: 'meat', storageDays: 3 },
      { name: '玉米', amount: '2根', category: 'vegetable', storageDays: 7 },
    ],
    steps: ['排骨焯水', '加玉米炖1小时', '调味即可'],
    nutrition: { calories: 180, protein: 15, carbs: 15, fat: 8 }, cookTime: 70, difficulty: 'easy', tags: ['汤品', '滋补']
  },
  {
    id: 'w4-cumin-lamb', name: '孜然羊肉', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '羊肉片', amount: '400g', category: 'meat', storageDays: 2 },
      { name: '洋葱', amount: '1个', category: 'vegetable', storageDays: 14 },
    ],
    steps: ['羊肉腌制', '洋葱切丝', '大火爆炒', '撒孜然辣椒'],
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
    steps: ['猪蹄剁块焯水', '炒糖色', '加香料焖煮2小时'],
    nutrition: { calories: 450, protein: 35, carbs: 5, fat: 32 }, cookTime: 140, difficulty: 'medium', tags: ['胶原蛋白', '滋补']
  },
  {
    id: 'w5-dry-pot-cauliflower', name: '干锅花菜', type: 'side', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '花菜', amount: '1颗', category: 'vegetable', storageDays: 7 },
      { name: '五花肉', amount: '100g', category: 'meat', storageDays: 3 },
    ],
    steps: ['花菜掰小朵', '炒香五花肉', '加花菜煸炒', '加辣椒调味'],
    nutrition: { calories: 150, protein: 8, carbs: 12, fat: 9 }, cookTime: 20, difficulty: 'easy', tags: ['干锅', '下饭']
  },
  {
    id: 'w5-steamed-bass', name: '剁椒鱼头', type: 'main', season: 'winter', flavor: 'spicy',
    ingredients: [
      { name: '鱼头', amount: '1个', category: 'seafood', storageDays: 1 },
      { name: '剁椒', amount: '100g', category: 'seasoning', storageDays: 90 },
    ],
    steps: ['鱼头处理干净', '铺姜蒜剁椒', '大火蒸15分钟', '淋热油'],
    nutrition: { calories: 250, protein: 35, carbs: 5, fat: 10 }, cookTime: 25, difficulty: 'easy', tags: ['湘菜', '鲜辣']
  },
  {
    id: 'w5-egg-with-chives', name: '韭菜炒蛋', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '韭菜', amount: '300g', category: 'vegetable', storageDays: 3 },
      { name: '鸡蛋', amount: '3个', category: 'egg', storageDays: 14 },
    ],
    steps: ['韭菜切段', '鸡蛋炒散', '加韭菜快炒'],
    nutrition: { calories: 180, protein: 14, carbs: 6, fat: 12 }, cookTime: 10, difficulty: 'easy', tags: ['快手', '家常']
  },
  {
    id: 'w5-eggplant-pot', name: '鱼香茄子', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '茄子', amount: '3根', category: 'vegetable', storageDays: 5 },
      { name: '猪肉末', amount: '100g', category: 'meat', storageDays: 2 },
    ],
    steps: ['茄子切条过油', '炒香肉末', '调鱼香汁', '加茄子翻炒'],
    nutrition: { calories: 280, protein: 12, carbs: 25, fat: 16 }, cookTime: 25, difficulty: 'medium', tags: ['川菜', '下饭']
  },
  {
    id: 'w5-seaweed-tofu-soup', name: '海带豆腐汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '海带', amount: '100g', category: 'vegetable', storageDays: 7 },
      { name: '豆腐', amount: '1块', category: 'tofu', storageDays: 5 },
    ],
    steps: ['海带切丝', '豆腐切块', '煮汤调味'],
    nutrition: { calories: 80, protein: 8, carbs: 8, fat: 2 }, cookTime: 20, difficulty: 'easy', tags: ['汤品', '清淡']
  },
  {
    id: 'w5-sweet-sour-tenderloin', name: '糖醋里脊', type: 'main', season: 'winter', flavor: 'sweet',
    ingredients: [
      { name: '猪里脊', amount: '400g', category: 'meat', storageDays: 3 },
    ],
    steps: ['里脊切条腌制', '裹淀粉油炸', '调糖醋汁', '淋在肉上'],
    nutrition: { calories: 420, protein: 30, carbs: 28, fat: 22 }, cookTime: 30, difficulty: 'medium', tags: ['经典', '酸甜']
  },
  {
    id: 'w5-garlic-eggplant', name: '蒜泥茄子', type: 'side', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '茄子', amount: '2根', category: 'vegetable', storageDays: 5 },
      { name: '蒜', amount: '1头', category: 'seasoning', storageDays: 30 },
    ],
    steps: ['茄子蒸软', '调蒜泥汁淋上'],
    nutrition: { calories: 70, protein: 2, carbs: 14, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['凉菜', '蒜香']
  },
  {
    id: 'w5-fried-pork-belly', name: '蒜苔炒肉', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '五花肉', amount: '250g', category: 'meat', storageDays: 3 },
      { name: '蒜苔', amount: '300g', category: 'vegetable', storageDays: 5 },
    ],
    steps: ['五花肉切片', '蒜苔切段', '爆炒出锅'],
    nutrition: { calories: 350, protein: 18, carbs: 10, fat: 28 }, cookTime: 15, difficulty: 'easy', tags: ['家常', '下饭']
  },
  {
    id: 'w5-winter-melon-soup', name: '冬瓜丸子汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '冬瓜', amount: '400g', category: 'vegetable', storageDays: 14 },
      { name: '猪肉馅', amount: '200g', category: 'meat', storageDays: 2 },
    ],
    steps: ['肉馅调味做丸子', '冬瓜切块', '煮汤调味'],
    nutrition: { calories: 150, protein: 15, carbs: 8, fat: 8 }, cookTime: 30, difficulty: 'easy', tags: ['汤品', '鲜美']
  },
  {
    id: 'w5-spicy-tofu', name: '红烧豆腐', type: 'main', season: 'winter', flavor: 'salty',
    ingredients: [
      { name: '北豆腐', amount: '2块', category: 'tofu', storageDays: 5 },
    ],
    steps: ['豆腐切块煎金黄', '调红烧汁', '焖煮入味'],
    nutrition: { calories: 200, protein: 16, carbs: 10, fat: 12 }, cookTime: 20, difficulty: 'easy', tags: ['家常', '下饭']
  },
  {
    id: 'w5-spinach-soup', name: '菠菜粉丝汤', type: 'side', season: 'winter', flavor: 'light',
    ingredients: [
      { name: '菠菜', amount: '200g', category: 'vegetable', storageDays: 3 },
      { name: '粉丝', amount: '50g', category: 'staple', storageDays: 365 },
    ],
    steps: ['菠菜焯水', '粉丝泡软', '煮汤调味'],
    nutrition: { calories: 80, protein: 4, carbs: 15, fat: 1 }, cookTime: 15, difficulty: 'easy', tags: ['汤品', '清淡']
  },
]

export const week5Plan: WeeklyPlan = {
  week: 5, month: 1, year: 2026, dateRange: '1月26日(周一) - 1月31日(周六)',
  meals: [
    { date: '1月26日', weekday: '周一', lunch: { main: week5Recipes[0], side: week5Recipes[1], staple: 'rice' }, dinner: { main: week5Recipes[2], side: week5Recipes[3], staple: 'rice' } },
    { date: '1月27日', weekday: '周二', lunch: { main: week5Recipes[4], side: week5Recipes[5], staple: 'rice' }, dinner: { main: week5Recipes[6], side: week5Recipes[7], staple: 'rice' } },
    { date: '1月28日', weekday: '周三', lunch: { main: week5Recipes[8], side: week5Recipes[9], staple: 'noodle' }, dinner: { main: week5Recipes[10], side: week5Recipes[11], staple: 'rice' } },
    { date: '1月29日', weekday: '周四', lunch: { main: week5Recipes[0], side: week5Recipes[3], staple: 'rice' }, dinner: { main: week5Recipes[4], side: week5Recipes[1], staple: 'rice' } },
    { date: '1月30日', weekday: '周五', lunch: { main: week5Recipes[2], side: week5Recipes[5], staple: 'rice' }, dinner: { main: week5Recipes[6], side: week5Recipes[9], staple: 'noodle' } },
    { date: '1月31日', weekday: '周六', lunch: { main: week5Recipes[8], side: week5Recipes[7], staple: 'rice' }, dinner: { main: week5Recipes[10], side: week5Recipes[11], staple: 'rice' } },
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
export const allRecipes = [...week1Recipes, ...week2Recipes, ...week3Recipes, ...week4Recipes, ...week5Recipes]

export default { januaryWeeklyPlans, allRecipes }
