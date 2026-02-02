import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

export function getSeasonName(season: string): string {
  const names: Record<string, string> = {
    spring: '春季',
    summer: '夏季',
    autumn: '秋季',
    winter: '冬季'
  }
  return names[season] || season
}

export function calculateDailyNutrition(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: number
): { calories: number; protein: number; carbs: number; fat: number } {
  // Harris-Benedict公式计算BMR
  let bmr: number
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
  }
  
  const calories = Math.round(bmr * activityLevel)
  const protein = Math.round(weight * 1.6) // 1.6g/kg体重
  const fat = Math.round((calories * 0.25) / 9) // 25%热量来自脂肪
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4) // 剩余为碳水
  
  return { calories, protein, carbs, fat }
}
