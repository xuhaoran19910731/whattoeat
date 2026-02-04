import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Flame, ChefHat, CheckCircle2, Circle, BookOpen, Lightbulb } from 'lucide-react'
import { getRecipeById } from '../data'
import { getFunFactByDish, getNutritionFactsByIngredients } from '../data/nutrition-facts'
import { cn } from '../lib/utils'
import { useState } from 'react'

const difficultyMap = {
  easy: { label: '简单', color: 'text-spring', bg: 'bg-spring/10' },
  medium: { label: '中等', color: 'text-secondary', bg: 'bg-secondary/10' },
  hard: { label: '困难', color: 'text-autumn', bg: 'bg-autumn/10' },
}

const flavorLabels: Record<string, string> = {
  salty: '咸鲜', spicy: '麻辣', sour: '酸爽', sweet: '酸甜', light: '清淡', rich: '浓郁'
}

const categoryLabels: Record<string, string> = {
  meat: '肉类', seafood: '海鲜', vegetable: '蔬菜', tofu: '豆制品', 
  egg: '蛋类', seasoning: '调味料', staple: '主食', other: '其他'
}

export default function RecipeDetailPage() {
  const { id } = useParams()
  const recipe = id ? getRecipeById(id) : null
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  if (!recipe) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="recipe-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold mb-2">食谱未找到</h1>
            <p className="text-muted-foreground mb-6">
              抱歉，该食谱不存在或已被删除
            </p>
            <Link to="/browse" className="btn-primary">
              返回食谱库
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // 按分类整理食材
  const ingredientsByCategory: Record<string, typeof recipe.ingredients> = {}
  recipe.ingredients.forEach(ing => {
    const cat = categoryLabels[ing.category] || '其他'
    if (!ingredientsByCategory[cat]) ingredientsByCategory[cat] = []
    ingredientsByCategory[cat].push(ing)
  })
  
  // 获取营养知识和趣味文化
  const ingredientNames = recipe.ingredients.map(ing => ing.name)
  const nutritionFacts = getNutritionFactsByIngredients(ingredientNames)
  const funFact = getFunFactByDish(recipe.name)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回食谱库
        </Link>
        
        {/* Recipe Header */}
        <div className="recipe-card overflow-hidden mb-8">
          {/* Image */}
          <div className="relative h-64 md:h-72 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
            <img 
              src={`/images/recipes/${recipe.id}.jpeg`}
              alt={recipe.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                // 如果jpeg失败，尝试png
                if (target.src.endsWith('.jpeg')) {
                  target.src = `/images/recipes/${recipe.id}.png`
                } else {
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }
              }}
            />
            <div className="hidden absolute inset-0 flex items-center justify-center">
              <ChefHat className="w-24 h-24 text-primary/30" />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                {recipe.type === 'main' ? '主菜' : '配菜'}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground">
                {flavorLabels[recipe.flavor]}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.name}</h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>{recipe.cookTime}分钟</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Flame className="w-5 h-5" />
                <span>{recipe.nutrition.calories}千卡</span>
              </div>
              <div className={cn(
                'flex items-center gap-2 px-3 py-1 rounded-full',
                difficultyMap[recipe.difficulty].bg,
                difficultyMap[recipe.difficulty].color
              )}>
                <ChefHat className="w-4 h-4" />
                <span className="font-medium">{difficultyMap[recipe.difficulty].label}</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="nutrition-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Ingredients & Nutrition */}
          <div className="space-y-8">
            {/* Ingredients */}
            <div className="recipe-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🥬</span>
                食材清单
              </h2>
              <div className="space-y-4">
                {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
                  <div key={category}>
                    <div className="text-sm font-medium text-muted-foreground mb-2">{category}</div>
                    <ul className="space-y-2">
                      {ingredients.map((ing, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span>{ing.name}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Nutrition */}
            <div className="recipe-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                营养成分
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">热量</span>
                  <span className="font-bold text-primary">{recipe.nutrition.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">蛋白质</span>
                  <span className="font-bold text-autumn">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">碳水化合物</span>
                  <span className="font-bold text-secondary">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">脂肪</span>
                  <span className="font-bold text-winter">{recipe.nutrition.fat}g</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Steps */}
          <div className="md:col-span-2">
            <div className="recipe-card p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">👨‍🍳</span>
                烹饪步骤
                <span className="text-sm font-normal text-muted-foreground ml-auto">
                  {completedSteps.length}/{recipe.steps.length} 完成
                </span>
              </h2>
              
              {/* Progress Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(completedSteps.length / recipe.steps.length) * 100}%` }}
                />
              </div>
              
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => {
                  const isCompleted = completedSteps.includes(index)
                  return (
                    <li
                      key={index}
                      onClick={() => toggleStep(index)}
                      className={cn(
                        'flex gap-4 p-4 rounded-xl cursor-pointer transition-all',
                        isCompleted ? 'bg-primary/10' : 'bg-muted/50 hover:bg-muted'
                      )}
                    >
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className={cn(
                          'font-medium mb-1',
                          isCompleted && 'line-through text-muted-foreground'
                        )}>
                          步骤 {index + 1}
                        </div>
                        <p className={cn(
                          'text-muted-foreground',
                          isCompleted && 'line-through'
                        )}>
                          {step}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
              
              {completedSteps.length === recipe.steps.length && (
                <div className="mt-6 p-4 bg-primary/10 rounded-xl text-center animate-scale-in">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="font-bold text-primary">恭喜完成！</div>
                  <div className="text-sm text-muted-foreground">享受您的美味佳肴吧</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 营养知识和趣味文化 */}
        {(nutritionFacts.length > 0 || funFact) && (
          <div className="mt-8 space-y-6">
            {/* 趣味文化知识 */}
            {funFact && (
              <div className="recipe-card p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <span className="gradient-text">{funFact.title}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {funFact.content}
                </p>
                {funFact.source && (
                  <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    来源：{funFact.source}
                  </p>
                )}
              </div>
            )}
            
            {/* 食材营养知识 */}
            {nutritionFacts.length > 0 && (
              <div className="recipe-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔬</span>
                  食材营养解读
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {nutritionFacts.map((fact, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-xl">
                      <h3 className="font-bold text-lg mb-2 text-primary">{fact.ingredient}</h3>
                      
                      <div className="mb-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1">主要营养</div>
                        <div className="flex flex-wrap gap-1">
                          {fact.nutrients.slice(0, 3).map((nutrient, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                              {nutrient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="text-xs font-medium text-muted-foreground mb-1">健康益处</div>
                        <ul className="text-sm text-muted-foreground space-y-0.5">
                          {fact.benefits.slice(0, 2).map((benefit, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-spring">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {fact.source && (
                        <p className="text-xs text-muted-foreground/60 mt-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {fact.source}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
