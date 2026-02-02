import { allWeeklyPlans, allRecipes, type Recipe, type WeeklyPlan, type DailyMeal, type ShoppingItem, type Ingredient } from './weekly-recipes'
import { supermarketItems } from './german-supermarket'

export type { Recipe, WeeklyPlan, DailyMeal, ShoppingItem, Ingredient }

// 检查食材是否在德国超市有售
export function isIngredientInSupermarket(ingredientName: string): { available: boolean; supermarkets: string[] } {
  const matched = supermarketItems.find(item => 
    ingredientName.includes(item.name) || 
    item.name.includes(ingredientName) ||
    ingredientName === item.name
  )
  return matched 
    ? { available: true, supermarkets: matched.supermarkets }
    : { available: false, supermarkets: [] }
}

// 计算食谱的超市匹配度
export function getRecipeSupermarketMatch(recipe: Recipe): {
  matchRate: number  // 匹配率 0-100
  availableCount: number  // 超市有售食材数
  totalCount: number  // 总食材数（不含调味料）
  availableIngredients: string[]  // 超市有售的食材
  unavailableIngredients: string[]  // 超市没有的食材
} {
  // 只统计非调味料的食材
  const mainIngredients = recipe.ingredients.filter(i => 
    i.category !== 'seasoning' && i.category !== 'staple'
  )
  
  const available: string[] = []
  const unavailable: string[] = []
  
  mainIngredients.forEach(ing => {
    const match = isIngredientInSupermarket(ing.name)
    if (match.available) {
      available.push(ing.name)
    } else {
      unavailable.push(ing.name)
    }
  })
  
  const totalCount = mainIngredients.length
  const matchRate = totalCount > 0 ? Math.round((available.length / totalCount) * 100) : 0
  
  return {
    matchRate,
    availableCount: available.length,
    totalCount,
    availableIngredients: available,
    unavailableIngredients: unavailable
  }
}

// 获取智能推荐食谱（优先超市食材）
export function getSmartRecommendedRecipes(count: number = 10): Recipe[] {
  const recipesWithMatch = allRecipes.map(recipe => ({
    recipe,
    match: getRecipeSupermarketMatch(recipe)
  }))
  
  // 按匹配度排序，高匹配度优先
  recipesWithMatch.sort((a, b) => {
    // 首先按匹配率排序
    if (b.match.matchRate !== a.match.matchRate) {
      return b.match.matchRate - a.match.matchRate
    }
    // 匹配率相同时，按营养评分（卡路里适中）
    const aCalories = a.recipe.nutrition.calories
    const bCalories = b.recipe.nutrition.calories
    const aScore = Math.abs(400 - aCalories) // 400kcal为理想值
    const bScore = Math.abs(400 - bCalories)
    return aScore - bScore
  })
  
  return recipesWithMatch.slice(0, count).map(r => r.recipe)
}

// 获取指定周的计划
export function getWeeklyPlan(week: number): WeeklyPlan | null {
  return allWeeklyPlans.find(p => p.week === week) || null
}

// 获取所有周计划
export function getAllWeeklyPlans(): WeeklyPlan[] {
  return allWeeklyPlans
}

// 获取所有食谱
export function getAllRecipes(): Recipe[] {
  return allRecipes
}

// 按ID获取食谱
export function getRecipeById(id: string): Recipe | null {
  return allRecipes.find(r => r.id === id) || null
}

// 按口味筛选
export function getRecipesByFlavor(flavor: Recipe['flavor']): Recipe[] {
  return allRecipes.filter(r => r.flavor === flavor)
}

// 按类型筛选
export function getRecipesByType(type: Recipe['type']): Recipe[] {
  return allRecipes.filter(r => r.type === type)
}

// 搜索食谱
export function searchRecipes(query: string): Recipe[] {
  const lowerQuery = query.toLowerCase()
  return allRecipes.filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.ingredients.some(i => i.name.toLowerCase().includes(lowerQuery)) ||
    r.tags.some(t => t.toLowerCase().includes(lowerQuery))
  )
}

// 获取所有标签
export function getAllTags(): string[] {
  const tags = new Set<string>()
  allRecipes.forEach(r => r.tags.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
}

// 获取所有口味
export function getAllFlavors(): { value: Recipe['flavor']; label: string }[] {
  return [
    { value: 'salty', label: '咸鲜' },
    { value: 'spicy', label: '麻辣' },
    { value: 'sour', label: '酸爽' },
    { value: 'sweet', label: '酸甜' },
    { value: 'light', label: '清淡' },
    { value: 'rich', label: '浓郁' },
  ]
}

// 获取所有食材列表
export function getAllIngredients(): string[] {
  const ingredients = new Set<string>()
  allRecipes.forEach(r => r.ingredients.forEach(i => ingredients.add(i.name)))
  return Array.from(ingredients).sort()
}

// 按食材筛选食谱
export function getRecipesByIngredient(ingredientName: string): Recipe[] {
  return allRecipes.filter(r => 
    r.ingredients.some(i => i.name.includes(ingredientName))
  )
}

// 按多个食材筛选食谱（包含任一食材）
export function getRecipesByIngredients(ingredientNames: string[]): Recipe[] {
  if (ingredientNames.length === 0) return allRecipes
  return allRecipes.filter(r => 
    ingredientNames.some(name => 
      r.ingredients.some(i => i.name.includes(name))
    )
  )
}

// 获取北京时间当前日期
export function getBeijingDate(): Date {
  const now = new Date()
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  return new Date(utc + (8 * 3600000))
}

// 根据北京时间获取当前对应的周和天的食谱
export function getTodayMeal(): { weekPlan: WeeklyPlan; todayMeal: DailyMeal; weekNumber: number; dayIndex: number } | null {
  const beijingDate = getBeijingDate()
  const year = beijingDate.getFullYear()
  const month = beijingDate.getMonth() + 1
  const day = beijingDate.getDate()
  
  // 2026年1月1日是周四，作为基准日期
  const baseDate = new Date(2026, 0, 1)
  const currentDate = new Date(year, month - 1, day)
  
  // 计算从2026年1月1日到今天的天数差
  const diffTime = currentDate.getTime() - baseDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  // 如果日期在范围外，返回null
  if (diffDays < 0) return null
  
  // 查找对应的周计划
  for (const weekPlan of allWeeklyPlans) {
    for (let i = 0; i < weekPlan.meals.length; i++) {
      const meal = weekPlan.meals[i]
      // 解析日期字符串，如"1月1日"
      const dateMatch = meal.date.match(/(\d+)月(\d+)日/)
      if (dateMatch) {
        const mealMonth = parseInt(dateMatch[1])
        const mealDay = parseInt(dateMatch[2])
        if (mealMonth === month && mealDay === day) {
          return { weekPlan, todayMeal: meal, weekNumber: weekPlan.week, dayIndex: i }
        }
      }
    }
  }
  
  return null
}

// 按食材分类汇总采购清单
export function categorizeShoppingList(items: ShoppingItem[]): Record<string, ShoppingItem[]> {
  const categoryLabels: Record<string, string> = {
    meat: '肉类',
    seafood: '海鲜水产',
    vegetable: '蔬菜',
    tofu: '豆制品',
    egg: '蛋类',
    seasoning: '调味料',
    staple: '主食',
    other: '其他'
  }
  
  const categorized: Record<string, ShoppingItem[]> = {}
  
  items.forEach(item => {
    const label = categoryLabels[item.category] || '其他'
    if (!categorized[label]) {
      categorized[label] = []
    }
    categorized[label].push(item)
  })
  
  return categorized
}
