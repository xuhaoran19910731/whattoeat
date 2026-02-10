import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Sun, Moon, ShoppingCart, Check, Copy, Printer, Clock, Flame, Store, CalendarDays } from 'lucide-react'
import { getWeeklyPlan, categorizeShoppingList, getRecipeSupermarketMatch, isIngredientInSupermarket, getBerlinDate, getMealByDate, type Recipe } from '../data'
import { cn } from '../lib/utils'

const stapleLabels = {
  rice: '米饭',
  noodle: '面条',
  both: '米饭/面条'
}

export default function WeeklyPlanPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const berlinDate = useMemo(() => getBerlinDate(), [])
  const todayData = useMemo(() => getMealByDate(berlinDate), [berlinDate])
  
  // 从URL参数获取初始日期
  const urlDate = searchParams.get('date')
  const initialMealData = urlDate ? getMealByDate(new Date(urlDate)) : todayData
  
  const [currentWeek, setCurrentWeek] = useState(initialMealData?.weekNumber || todayData?.weekNumber || 1)
  const [activeTab, setActiveTab] = useState<'meals' | 'shopping'>('meals')
  const [selectedDayIndex, setSelectedDayIndex] = useState(initialMealData?.dayIndex || todayData?.dayIndex || 0)
  const [copiedList, setCopiedList] = useState(false)
  
  // 使用ref来追踪是否跳过下一次自动重置（避免state导致的重复渲染）
  const skipNextResetRef = useRef(!!urlDate)
  
  const weekPlan = getWeeklyPlan(currentWeek)
  
  // 处理URL参数变化
  useEffect(() => {
    if (urlDate) {
      const mealData = getMealByDate(new Date(urlDate))
      if (mealData) {
        skipNextResetRef.current = true
        setCurrentWeek(mealData.weekNumber)
        setSelectedDayIndex(mealData.dayIndex)
      }
      // 清除URL参数，保持URL干净
      setSearchParams({}, { replace: true })
    }
  }, [urlDate, setSearchParams])
  
  // 当周改变时，重置selectedDayIndex（仅当不是手动选择时）
  useEffect(() => {
    if (skipNextResetRef.current) {
      // 跳过这次重置
      skipNextResetRef.current = false
      return
    }
    const newWeekPlan = getWeeklyPlan(currentWeek)
    if (newWeekPlan) {
      // 如果是当前周且今天在这周内，跳转到今天
      if (todayData && todayData.weekNumber === currentWeek) {
        setSelectedDayIndex(todayData.dayIndex)
      } else {
        setSelectedDayIndex(0)
      }
    }
  }, [currentWeek, todayData])
  
  if (!weekPlan) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="recipe-card p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h1 className="text-2xl font-bold mb-2">该周暂无食谱</h1>
            <p className="text-muted-foreground">目前仅提供1月食谱</p>
          </div>
        </div>
      </div>
    )
  }
  
  const categorizedList = categorizeShoppingList(weekPlan.shoppingList)
  const selectedMeal = weekPlan.meals[selectedDayIndex]
  
  const copyShoppingList = () => {
    const text = Object.entries(categorizedList)
      .map(([category, items]) => 
        `【${category}】\n${items.map(i => `${i.name} ${i.totalAmount}`).join('\n')}`
      )
      .join('\n\n')
    
    navigator.clipboard.writeText(text)
    setCopiedList(true)
    setTimeout(() => setCopiedList(false), 2000)
  }

  const handleWeekChange = (newWeek: number) => {
    setCurrentWeek(newWeek)
  }
  
  // 日期选择处理
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    const mealData = getMealByDate(date)
    if (mealData) {
      skipNextResetRef.current = true
      setCurrentWeek(mealData.weekNumber)
      setSelectedDayIndex(mealData.dayIndex)
    }
  }
  
  // 获取当前选中日期
  const getSelectedDateString = () => {
    if (!weekPlan) return ''
    const meal = weekPlan.meals[selectedDayIndex]
    const dateMatch = meal.date.match(/(\d+)月(\d+)日/)
    if (dateMatch) {
      const month = dateMatch[1].padStart(2, '0')
      const day = dateMatch[2].padStart(2, '0')
      return `2026-${month}-${day}`
    }
    return ''
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="section-title">每周食谱计划</h1>
          <p className="section-subtitle mx-auto">每周采购一次，科学搭配每一餐</p>
        </div>
        
        {/* Week Navigation */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleWeekChange(Math.max(1, currentWeek - 1))}
              disabled={currentWeek === 1}
              className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="recipe-card px-8 py-3">
              <div className="font-bold text-lg">2026年 · 第{currentWeek}周</div>
              <div className="text-sm text-muted-foreground">{weekPlan.dateRange}</div>
            </div>
            <button
              onClick={() => handleWeekChange(Math.min(13, currentWeek + 1))}
              disabled={currentWeek >= 13}
              className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* 日期选择器 */}
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">快速跳转:</span>
            <input
              type="date"
              value={getSelectedDateString()}
              onChange={handleDateChange}
              min="2026-01-01"
              max="2026-03-31"
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {todayData && (currentWeek !== todayData.weekNumber || selectedDayIndex !== todayData.dayIndex) && (
              <button 
                onClick={() => {
                  setCurrentWeek(todayData.weekNumber)
                  setSelectedDayIndex(todayData.dayIndex)
                }}
                className="text-xs text-primary hover:underline"
              >
                返回今天
              </button>
            )}
          </div>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-muted rounded-xl">
            <button
              onClick={() => setActiveTab('meals')}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all',
                activeTab === 'meals' ? 'bg-primary text-primary-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Sun className="w-4 h-4 inline mr-2" />
              每日餐单
            </button>
            <button
              onClick={() => setActiveTab('shopping')}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all',
                activeTab === 'shopping' ? 'bg-primary text-primary-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              采购清单
            </button>
          </div>
        </div>
        
        {activeTab === 'meals' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Day Selector - 移动端横向滚动，桌面端垂直列表 */}
            <div className="lg:col-span-1">
              <div className="recipe-card p-4 lg:sticky lg:top-24">
                <h3 className="font-bold mb-4 hidden lg:block">选择日期</h3>
                {/* 移动端横向滚动日期选择器 */}
                <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                  {weekPlan.meals.map((meal, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      className={cn(
                        'flex-shrink-0 px-4 py-2 rounded-xl text-center transition-all min-w-[80px]',
                        selectedDayIndex === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 hover:bg-muted'
                      )}
                    >
                      <div className="text-sm font-medium">{meal.date}</div>
                      <div className="text-xs opacity-80">{meal.weekday}</div>
                    </button>
                  ))}
                </div>
                {/* 桌面端垂直日期列表 */}
                <div className="hidden lg:block space-y-2">
                  {weekPlan.meals.map((meal, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      className={cn(
                        'w-full p-3 rounded-xl text-left transition-all',
                        selectedDayIndex === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 hover:bg-muted'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{meal.date}</span>
                          <span className="ml-2 text-sm opacity-80">{meal.weekday}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </div>
                      <div className={cn(
                        'text-xs mt-1',
                        selectedDayIndex === index ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}>
                        {meal.lunch.main.name} · {meal.dinner.main.name}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Nutrition Summary */}
                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <h4 className="font-medium text-sm mb-3">本周平均营养</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">热量</div>
                      <div className="font-bold text-primary">{weekPlan.totalNutrition.avgCalories}kcal</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">蛋白质</div>
                      <div className="font-bold text-autumn">{weekPlan.totalNutrition.avgProtein}g</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">碳水</div>
                      <div className="font-bold text-secondary">{weekPlan.totalNutrition.avgCarbs}g</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">脂肪</div>
                      <div className="font-bold text-winter">{weekPlan.totalNutrition.avgFat}g</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Meal Detail */}
            <div className="lg:col-span-2">
              {selectedMeal && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{selectedMeal.date} · {selectedMeal.weekday}</h2>
                  </div>
                  
                  {/* Lunch */}
                  <MealCard
                    title="午餐"
                    icon={<Sun className="w-5 h-5" />}
                    bgClass="bg-gradient-summer"
                    main={selectedMeal.lunch.main}
                    side={selectedMeal.lunch.side}
                    staple={selectedMeal.lunch.staple}
                  />
                  
                  {/* Dinner */}
                  <MealCard
                    title="晚餐"
                    icon={<Moon className="w-5 h-5" />}
                    bgClass="bg-gradient-winter"
                    main={selectedMeal.dinner.main}
                    side={selectedMeal.dinner.side}
                    staple={selectedMeal.dinner.staple}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Shopping List */
          <div className="max-w-4xl mx-auto">
            {/* Actions */}
            <div className="flex justify-end gap-3 mb-6">
              <button
                onClick={copyShoppingList}
                className={cn(
                  'btn-outline px-4 py-2 text-sm',
                  copiedList && 'bg-primary text-primary-foreground'
                )}
              >
                {copiedList ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    复制清单
                  </>
                )}
              </button>
              <button onClick={() => window.print()} className="btn-outline px-4 py-2 text-sm">
                <Printer className="w-4 h-4 mr-2" />
                打印
              </button>
            </div>
            
            {/* Shopping List */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(categorizedList).map(([category, items], index) => (
                <div key={category} className="recipe-card p-5 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    {category}
                    <span className="text-sm font-normal text-muted-foreground ml-auto">{items.length}种</span>
                  </h3>
                  <ul className="space-y-3">
                    {items.map((item, i) => {
                      const supermarketInfo = isIngredientInSupermarket(item.name)
                      return (
                        <li key={i} className="flex items-start justify-between gap-2 pb-3 border-b border-border last:border-0 last:pb-0">
                          <div className="flex-1">
                            <div className="font-medium flex items-center gap-2">
                              {item.name}
                              {supermarketInfo.available && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white">
                                  {supermarketInfo.supermarkets.map(s => s === 'penny' ? 'P' : s === 'kaufland' ? 'K' : 'R').join(',')}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              用于: {item.usedIn.join('、')}
                            </div>
                            {item.buyTip && (
                              <div className="text-xs text-primary mt-1">
                                💡 {item.buyTip}
                              </div>
                            )}
                            {supermarketInfo.available && (
                              <div className="text-xs text-green-600 mt-1">
                                ✓ 德国超市有售
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-primary whitespace-nowrap">
                            {item.totalAmount}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Tips */}
            <div className="recipe-card p-6 mt-8">
              <h3 className="font-bold mb-4">采购小贴士</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  肉类和海鲜建议周末采购，保证新鲜度
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  叶菜类蔬菜保鲜期较短，可以周中补购
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  调味料可以一次性多买，长期保存
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  鸡蛋和豆制品放冰箱可保存1-2周
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 餐卡组件
function MealCard({ 
  title, 
  icon, 
  bgClass, 
  main, 
  side, 
  staple 
}: { 
  title: string
  icon: React.ReactNode
  bgClass: string
  main: Recipe
  side: Recipe
  staple: 'rice' | 'noodle' | 'both'
}) {
  return (
    <div className="recipe-card overflow-hidden">
      <div className={cn('px-5 py-3 flex items-center gap-2 text-primary-foreground', bgClass)}>
        {icon}
        <span className="font-bold">{title}</span>
        <span className="ml-auto text-sm opacity-80">配{stapleLabels[staple]}</span>
      </div>
      <div className="p-5 grid md:grid-cols-2 gap-4">
        <RecipePreview recipe={main} type="主菜" />
        <RecipePreview recipe={side} type="配菜" />
      </div>
      <div className="px-5 pb-5">
        <div className="p-3 bg-muted/50 rounded-lg grid grid-cols-4 text-center text-sm">
          <div>
            <div className="text-muted-foreground text-xs">总热量</div>
            <div className="font-bold text-primary">{main.nutrition.calories + side.nutrition.calories}kcal</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">蛋白质</div>
            <div className="font-bold text-autumn">{main.nutrition.protein + side.nutrition.protein}g</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">碳水</div>
            <div className="font-bold text-secondary">{main.nutrition.carbs + side.nutrition.carbs}g</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">脂肪</div>
            <div className="font-bold text-winter">{main.nutrition.fat + side.nutrition.fat}g</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 食谱预览组件
function RecipePreview({ recipe, type }: { recipe: Recipe; type: string }) {
  const flavorLabels: Record<string, string> = {
    salty: '咸鲜',
    spicy: '麻辣',
    sour: '酸爽',
    sweet: '酸甜',
    light: '清淡',
    rich: '浓郁',
  }
  
  const supermarketMatch = getRecipeSupermarketMatch(recipe)
  
  return (
    <Link to={`/recipe/${recipe.id}`} className="block p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary font-medium">{type}</span>
        <span className="px-2 py-0.5 rounded text-xs bg-secondary/10 text-secondary font-medium">{flavorLabels[recipe.flavor]}</span>
        {supermarketMatch.matchRate > 0 && (
          <span className={cn(
            'px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1',
            supermarketMatch.matchRate >= 80 ? 'bg-green-100 text-green-700' :
            supermarketMatch.matchRate >= 50 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          )}>
            <Store className="w-3 h-3" />
            {supermarketMatch.matchRate}%
          </span>
        )}
      </div>
      <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{recipe.name}</h4>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {recipe.cookTime}分钟
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3 h-3" />
          {recipe.nutrition.calories}kcal
        </span>
      </div>
      {supermarketMatch.availableIngredients.length > 0 && (
        <div className="mt-2 text-xs text-green-600">
          超市有售: {supermarketMatch.availableIngredients.slice(0, 3).join('、')}
          {supermarketMatch.availableIngredients.length > 3 && `等${supermarketMatch.availableIngredients.length}种`}
        </div>
      )}
      <div className="flex flex-wrap gap-1 mt-2">
        {recipe.tags.slice(0, 2).map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-background rounded">{tag}</span>
        ))}
      </div>
    </Link>
  )
}
