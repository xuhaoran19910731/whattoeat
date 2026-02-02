import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Shuffle, Sparkles, Clock, Flame, ChefHat, RefreshCw, Filter, Store, ArrowRight } from 'lucide-react'
import { getAllRecipes, getRecipeSupermarketMatch, type Recipe } from '../data'
import { supermarketItems } from '../data/german-supermarket'
import { cn } from '../lib/utils'

const flavorOptions = [
  { value: 'all', label: '不限口味' },
  { value: 'salty', label: '咸鲜' },
  { value: 'spicy', label: '麻辣' },
  { value: 'sour', label: '酸爽' },
  { value: 'sweet', label: '酸甜' },
  { value: 'light', label: '清淡' },
  { value: 'rich', label: '浓郁' },
]

const difficultyOptions = [
  { value: 'all', label: '不限难度' },
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' },
]

const flavorLabels: Record<string, string> = {
  salty: '咸鲜', spicy: '麻辣', sour: '酸爽', sweet: '酸甜', light: '清淡', rich: '浓郁'
}

const difficultyLabels: Record<string, { label: string; color: string }> = {
  easy: { label: '简单', color: 'text-green-500' },
  medium: { label: '中等', color: 'text-yellow-500' },
  hard: { label: '困难', color: 'text-red-500' },
}

export default function DailySurprisePage() {
  const [selectedFlavor, setSelectedFlavor] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [surpriseRecipes, setSurpriseRecipes] = useState<{ main: Recipe; side: Recipe } | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const allRecipes = getAllRecipes()
  
  // 获取超市食材可用的食谱，并按匹配度排序
  const eligibleRecipes = useMemo(() => {
    let recipes = allRecipes.map(recipe => ({
      recipe,
      match: getRecipeSupermarketMatch(recipe)
    }))
    
    // 优先选择超市匹配度高的食谱
    recipes = recipes.filter(r => r.match.matchRate >= 30)
    
    // 按口味筛选
    if (selectedFlavor !== 'all') {
      recipes = recipes.filter(r => r.recipe.flavor === selectedFlavor)
    }
    
    // 按难度筛选
    if (selectedDifficulty !== 'all') {
      recipes = recipes.filter(r => r.recipe.difficulty === selectedDifficulty)
    }
    
    return recipes
  }, [allRecipes, selectedFlavor, selectedDifficulty])
  
  const mainDishes = eligibleRecipes.filter(r => r.recipe.type === 'main')
  const sideDishes = eligibleRecipes.filter(r => r.recipe.type === 'side')
  
  // 随机选择食谱
  const generateSurprise = () => {
    setIsSpinning(true)
    
    // 动画效果
    setTimeout(() => {
      if (mainDishes.length > 0 && sideDishes.length > 0) {
        const randomMain = mainDishes[Math.floor(Math.random() * mainDishes.length)].recipe
        const randomSide = sideDishes[Math.floor(Math.random() * sideDishes.length)].recipe
        setSurpriseRecipes({ main: randomMain, side: randomSide })
      }
      setIsSpinning(false)
    }, 800)
  }
  
  // 获取今日可用的超市食材
  const todaySupermarketIngredients = supermarketItems.filter(item => item.onSale).slice(0, 8)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 mb-6">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="font-medium">基于德国超市当季食材</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">每日惊喜</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            让超市食材决定今天的美味！根据德国超市当前在售食材，随机组合一份充满惊喜的菜谱
          </p>
        </div>
        
        {/* Today's Available Ingredients */}
        <div className="recipe-card p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-red-500" />
            <h3 className="font-bold">今日超市热门食材</h3>
            <span className="px-2 py-0.5 rounded-full text-xs bg-red-500 text-white">促销中</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {todaySupermarketIngredients.map((item) => (
              <span
                key={item.name}
                className="px-3 py-1.5 rounded-full text-sm bg-red-50 text-red-700 border border-red-200"
              >
                {item.name}
                <span className="ml-1 text-xs opacity-60">
                  {item.supermarkets.map(s => s === 'penny' ? 'P' : s === 'kaufland' ? 'K' : 'R').join('·')}
                </span>
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full text-sm text-muted-foreground">
              +{supermarketItems.length - todaySupermarketIngredients.length}种更多
            </span>
          </div>
        </div>
        
        {/* Filters */}
        <div className="recipe-card p-5 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 w-full text-left font-medium"
          >
            <Filter className="w-5 h-5" />
            偏好设置
            <span className={cn(
              "ml-auto transition-transform",
              showFilters && "rotate-180"
            )}>▼</span>
          </button>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border animate-slide-up">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Flavor */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">口味偏好</h4>
                  <div className="flex flex-wrap gap-2">
                    {flavorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedFlavor(option.value)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                          selectedFlavor === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">难度偏好</h4>
                  <div className="flex flex-wrap gap-2">
                    {difficultyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedDifficulty(option.value)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                          selectedDifficulty === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                符合条件的食谱: <span className="font-semibold text-foreground">{mainDishes.length}</span> 道主菜 · <span className="font-semibold text-foreground">{sideDishes.length}</span> 道配菜
              </div>
            </div>
          )}
        </div>
        
        {/* Generate Button */}
        <div className="text-center mb-10">
          <button
            onClick={generateSurprise}
            disabled={isSpinning || mainDishes.length === 0 || sideDishes.length === 0}
            className={cn(
              "relative px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300",
              "bg-gradient-to-r from-secondary to-primary text-white",
              "hover:shadow-glow hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              isSpinning && "animate-pulse"
            )}
          >
            <span className={cn(
              "flex items-center gap-3",
              isSpinning && "animate-spin-slow"
            )}>
              {isSpinning ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  正在摇一摇...
                </>
              ) : (
                <>
                  <Shuffle className="w-6 h-6" />
                  摇出今日惊喜
                </>
              )}
            </span>
          </button>
          
          {mainDishes.length === 0 && (
            <p className="mt-3 text-sm text-red-500">
              当前筛选条件下没有符合的主菜，请调整偏好设置
            </p>
          )}
        </div>
        
        {/* Result */}
        {surpriseRecipes && (
          <div className="animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary font-semibold">
                <Sparkles className="w-5 h-5" />
                今日惊喜菜谱已揭晓！
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Dish */}
              <RecipeCard recipe={surpriseRecipes.main} type="主菜" />
              
              {/* Side Dish */}
              <RecipeCard recipe={surpriseRecipes.side} type="配菜" />
            </div>
            
            {/* Total Nutrition */}
            <div className="recipe-card p-5 mt-6">
              <h3 className="font-bold mb-4 text-center">本餐营养总计</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {surpriseRecipes.main.nutrition.calories + surpriseRecipes.side.nutrition.calories}
                  </div>
                  <div className="text-sm text-muted-foreground">千卡</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-autumn">
                    {surpriseRecipes.main.nutrition.protein + surpriseRecipes.side.nutrition.protein}g
                  </div>
                  <div className="text-sm text-muted-foreground">蛋白质</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {surpriseRecipes.main.nutrition.carbs + surpriseRecipes.side.nutrition.carbs}g
                  </div>
                  <div className="text-sm text-muted-foreground">碳水</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-winter">
                    {surpriseRecipes.main.nutrition.fat + surpriseRecipes.side.nutrition.fat}g
                  </div>
                  <div className="text-sm text-muted-foreground">脂肪</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={generateSurprise}
                className="btn-outline px-6 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                再摇一次
              </button>
              <Link to="/weekly" className="btn-primary px-6 py-3">
                查看本周计划
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {!surpriseRecipes && !isSpinning && (
          <div className="recipe-card p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-primary/50" />
            </div>
            <h3 className="text-xl font-bold mb-2">准备好迎接惊喜了吗？</h3>
            <p className="text-muted-foreground mb-6">
              点击上方按钮，让德国超市的当季食材为你决定今天吃什么！
            </p>
            <div className="text-sm text-muted-foreground">
              当前可用: {mainDishes.length} 道主菜 · {sideDishes.length} 道配菜
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 食谱卡片组件
function RecipeCard({ recipe, type }: { recipe: Recipe; type: string }) {
  const match = getRecipeSupermarketMatch(recipe)
  
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="recipe-card overflow-hidden group hover:shadow-glow transition-all"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
        <img 
          src={`/images/recipes/${recipe.id}.png`}
          alt={recipe.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden absolute inset-0 flex items-center justify-center">
          <ChefHat className="w-16 h-16 text-primary/30" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
            {type}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
            {flavorLabels[recipe.flavor]}
          </span>
        </div>
        
        {/* Supermarket Match */}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1',
            match.matchRate >= 80 ? 'bg-green-500 text-white' :
            match.matchRate >= 50 ? 'bg-yellow-500 text-white' :
            'bg-red-500 text-white'
          )}>
            <Store className="w-3 h-3" />
            {match.matchRate}%
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.cookTime}分钟
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            {recipe.nutrition.calories}kcal
          </span>
          <span className={difficultyLabels[recipe.difficulty].color}>
            {difficultyLabels[recipe.difficulty].label}
          </span>
        </div>
        
        {match.availableIngredients.length > 0 && (
          <div className="text-xs text-green-600">
            超市有售: {match.availableIngredients.slice(0, 4).join('、')}
            {match.availableIngredients.length > 4 && `等${match.availableIngredients.length}种`}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mt-3">
          {recipe.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-muted rounded">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
