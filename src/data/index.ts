import { januaryWeeklyPlans, allRecipes, type Recipe, type WeeklyPlan, type DailyMeal, type ShoppingItem, type Ingredient } from './weekly-recipes'

export type { Recipe, WeeklyPlan, DailyMeal, ShoppingItem, Ingredient }

// 获取指定周的计划
export function getWeeklyPlan(month: number, week: number): WeeklyPlan | null {
  if (month === 1) {
    return januaryWeeklyPlans.find(p => p.week === week) || null
  }
  return null
}

// 获取所有周计划
export function getAllWeeklyPlans(): WeeklyPlan[] {
  return januaryWeeklyPlans
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
