import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, X, Clock, Flame, ChefHat, Sparkles, Carrot, Lightbulb, ShoppingCart } from 'lucide-react'
import { getAllRecipes, getAllTags, getAllFlavors, searchRecipes, getAllIngredients } from '../data'
import { supermarketItems } from '../data/german-supermarket'
import { cn } from '../lib/utils'

const typeFilters = [
  { value: 'all', label: '全部' },
  { value: 'main', label: '主菜' },
  { value: 'side', label: '配菜' },
]

const difficultyFilters = [
  { value: 'all', label: '全部难度' },
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' },
]

// 创意菜谱生成器
function generateCreativeRecipe(selectedIngredients: string[], selectedTags: string[], selectedFlavor: string): {
  name: string
  description: string
  ingredients: string[]
  steps: string[]
  tips: string
} {
  // 基础食材映射到烹饪方式
  const cookingMethods = ['清炒', '红烧', '煎', '炖', '蒸', '凉拌', '爆炒', '焖']
  const randomMethod = cookingMethods[Math.floor(Math.random() * cookingMethods.length)]
  
  // 根据口味选择调味
  const flavorSeasonings: Record<string, string[]> = {
    salty: ['盐', '生抽', '蚝油'],
    spicy: ['辣椒', '花椒', '豆瓣酱'],
    sour: ['醋', '柠檬汁', '番茄'],
    sweet: ['糖', '蜂蜜', '番茄酱'],
    light: ['盐', '鸡精', '香油'],
    rich: ['酱油', '豆瓣酱', '老抽'],
  }
  
  const seasonings = selectedFlavor !== 'all' 
    ? flavorSeasonings[selectedFlavor] || flavorSeasonings.salty
    : flavorSeasonings.salty
  
  // 生成菜名
  const mainIngredient = selectedIngredients[0] || '时蔬'
  const name = selectedIngredients.length > 1 
    ? `${randomMethod}${mainIngredient}${selectedIngredients[1]}`
    : `${randomMethod}${mainIngredient}`
  
  // 生成步骤
  const steps = [
    `准备食材：${selectedIngredients.length > 0 ? selectedIngredients.join('、') : '根据手边食材准备'}，洗净切好`,
    `调味准备：${seasonings.join('、')}适量备用`,
    `热锅凉油，${selectedIngredients.some(i => i.includes('肉') || i.includes('鸡') || i.includes('鱼')) ? '先将肉类炒至变色' : '先爆香葱姜蒜'}`,
    `加入主要食材翻炒均匀`,
    `加入调味料，${randomMethod.includes('炖') || randomMethod.includes('焖') ? '小火慢煮15-20分钟' : '大火快炒2-3分钟'}`,
    `出锅前调味，撒上葱花即可`
  ]
  
  return {
    name,
    description: `根据您选择的${selectedIngredients.length > 0 ? '食材' : '条件'}创意搭配，${selectedTags.length > 0 ? `融合${selectedTags.join('、')}特点，` : ''}一道简单美味的家常菜。`,
    ingredients: [...selectedIngredients, ...seasonings, '葱', '姜', '蒜', '食用油'],
    steps,
    tips: selectedFlavor === 'spicy' 
      ? '可根据个人口味调整辣度，怕辣可减少辣椒用量'
      : selectedFlavor === 'light'
      ? '清淡口味注意少油少盐，保留食材原味'
      : '调味可根据个人喜好适当调整'
  }
}

export default function RecipeBrowserPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedFlavor, setSelectedFlavor] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showCreativeRecipe, setShowCreativeRecipe] = useState(false)
  
  const allRecipes = getAllRecipes()
  const allTags = getAllTags()
  const allFlavors = getAllFlavors()
  const allIngredients = getAllIngredients()
  
  // 获取食材的超市标注
  const getIngredientSupermarkets = (ingredientName: string): string[] => {
    const matched = supermarketItems.find(item => 
      ingredientName.includes(item.name) || 
      item.name.includes(ingredientName) ||
      ingredientName === item.name
    )
    return matched ? matched.supermarkets : []
  }
  
  // 合并原有食材和超市食材，生成带超市标注的食材列表
  const mergedIngredientCategories = useMemo(() => {
    // 用Map去重，key是食材名，value包含食材名和对应超市
    const ingredientMap = new Map<string, { name: string; supermarkets: string[] }>()
    
    // 添加原有食材
    allIngredients.forEach(ing => {
      if (!['盐', '糖', '酱油', '醋', '料酒', '葱', '姜', '蒜', '油', '粉', '淀粉', '米', '面', '水', '酒'].some(s => ing.includes(s))) {
        const supermarkets = getIngredientSupermarkets(ing)
        ingredientMap.set(ing, { name: ing, supermarkets })
      }
    })
    
    // 添加超市食材（如果原有食材中没有）
    supermarketItems.forEach(item => {
      if (!ingredientMap.has(item.name)) {
        ingredientMap.set(item.name, { name: item.name, supermarkets: item.supermarkets })
      }
    })
    
    // 分类
    const categories: Record<string, { name: string; supermarkets: string[] }[]> = {
      '肉类': [],
      '蔬菜': [],
      '海鲜': [],
      '豆制品': [],
      '其他': []
    }
    
    ingredientMap.forEach((item) => {
      const ing = item.name
      if (ing.includes('肉') || ing.includes('鸡') || ing.includes('鸭') || ing.includes('羊') || ing.includes('牛') || ing.includes('排骨') || ing.includes('火鸡') || ing.includes('培根') || ing.includes('香肠')) {
        categories['肉类'].push(item)
      } else if (ing.includes('鱼') || ing.includes('虾') || ing.includes('蟹') || ing.includes('贝') || ing.includes('三文鱼')) {
        categories['海鲜'].push(item)
      } else if (ing.includes('豆腐') || (ing.includes('豆') && !ing.includes('豆芽') && !ing.includes('四季豆'))) {
        categories['豆制品'].push(item)
      } else if (['白菜', '萝卜', '土豆', '番茄', '青椒', '西兰花', '山药', '木耳', '蘑菇', '黄瓜', '茄子', '洋葱', '胡萝卜', '芹菜', '菠菜', '生菜', '豆芽', '抱子甘蓝', '迷你黄瓜', '大葱', '四季豆', '生姜'].some(v => ing.includes(v))) {
        categories['蔬菜'].push(item)
      } else {
        categories['其他'].push(item)
      }
    })
    
    // 按是否有超市标注排序（有超市标注的排前面）
    Object.keys(categories).forEach(key => {
      categories[key].sort((a, b) => {
        if (a.supermarkets.length > 0 && b.supermarkets.length === 0) return -1
        if (a.supermarkets.length === 0 && b.supermarkets.length > 0) return 1
        return 0
      })
    })
    
    return categories
  }, [allIngredients])
  
  const filteredRecipes = useMemo(() => {
    let recipes = searchQuery ? searchRecipes(searchQuery) : allRecipes
    
    if (selectedType !== 'all') {
      recipes = recipes.filter(r => r.type === selectedType)
    }
    
    if (selectedFlavor !== 'all') {
      recipes = recipes.filter(r => r.flavor === selectedFlavor)
    }
    
    if (selectedDifficulty !== 'all') {
      recipes = recipes.filter(r => r.difficulty === selectedDifficulty)
    }
    
    if (selectedTags.length > 0) {
      recipes = recipes.filter(r => selectedTags.some(tag => r.tags.includes(tag)))
    }
    
    if (selectedIngredients.length > 0) {
      recipes = recipes.filter(r => 
        selectedIngredients.some(ing => 
          r.ingredients.some(i => i.name.includes(ing))
        )
      )
    }
    
    return recipes
  }, [searchQuery, selectedType, selectedFlavor, selectedDifficulty, selectedTags, selectedIngredients, allRecipes])
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    )
  }
  
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedFlavor('all')
    setSelectedDifficulty('all')
    setSelectedTags([])
    setSelectedIngredients([])
    setShowCreativeRecipe(false)
  }
  
  const hasActiveFilters = searchQuery || selectedType !== 'all' || selectedFlavor !== 'all' || selectedDifficulty !== 'all' || selectedTags.length > 0 || selectedIngredients.length > 0

  const flavorLabels: Record<string, string> = {
    salty: '咸鲜', spicy: '麻辣', sour: '酸爽', sweet: '酸甜', light: '清淡', rich: '浓郁'
  }

  const difficultyMap: Record<string, { label: string; color: string }> = {
    easy: { label: '简单', color: 'text-spring' },
    medium: { label: '中等', color: 'text-secondary' },
    hard: { label: '困难', color: 'text-autumn' },
  }

  // 生成创意菜谱
  const creativeRecipe = useMemo(() => {
    if (!showCreativeRecipe) return null
    return generateCreativeRecipe(selectedIngredients, selectedTags, selectedFlavor)
  }, [showCreativeRecipe, selectedIngredients, selectedTags, selectedFlavor])

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">食谱库</h1>
          <p className="section-subtitle mx-auto">
            浏览所有精选食谱，发现您喜爱的美味
          </p>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="recipe-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索食谱名称、食材..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                showFilters ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              )}
            >
              <Filter className="w-5 h-5" />
              筛选
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-secondary" />
              )}
            </button>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border animate-slide-up">
              {/* Type Filter */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-muted-foreground">类型</h4>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedType(filter.value)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        selectedType === filter.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Ingredient Filter - 合并食材库与超市食材 */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-muted-foreground flex items-center gap-2">
                  <Carrot className="w-4 h-4" />
                  食材
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    标注为德国超市本周在售
                  </span>
                </h4>
                <div className="space-y-3">
                  {Object.entries(mergedIngredientCategories).map(([category, ingredients]) => (
                    ingredients.length > 0 && (
                      <div key={category}>
                        <div className="text-xs text-muted-foreground mb-1.5">{category}</div>
                        <div className="flex flex-wrap gap-2">
                          {ingredients.slice(0, 12).map((item) => (
                            <button
                              key={item.name}
                              onClick={() => toggleIngredient(item.name)}
                              className={cn(
                                'relative px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                                selectedIngredients.includes(item.name)
                                  ? 'bg-primary text-primary-foreground'
                                  : item.supermarkets.length > 0
                                    ? 'bg-red-50 text-gray-700 border border-red-200 hover:border-red-400 hover:bg-red-100'
                                    : 'bg-muted hover:bg-muted/80'
                              )}
                            >
                              {item.name}
                              {item.supermarkets.length > 0 && (
                                <span className="absolute -bottom-1 -right-1 px-1 py-0.5 rounded text-[9px] font-bold bg-red-500 text-white leading-none">
                                  {item.supermarkets.map(s => s === 'penny' ? 'P' : s === 'kaufland' ? 'K' : 'R').join(',')}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              {/* Flavor Filter */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-muted-foreground">口味</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedFlavor('all')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      selectedFlavor === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    )}
                  >
                    全部口味
                  </button>
                  {allFlavors.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setSelectedFlavor(f.value)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        selectedFlavor === f.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Difficulty Filter */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-muted-foreground">难度</h4>
                <div className="flex flex-wrap gap-2">
                  {difficultyFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedDifficulty(filter.value)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        selectedDifficulty === filter.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-muted-foreground">标签</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                        selectedTags.includes(tag)
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  清除所有筛选
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Results Count & Creative Button */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="text-muted-foreground">
            共找到 <span className="font-semibold text-foreground">{filteredRecipes.length}</span> 道食谱
          </div>
          
          {/* Creative Recipe Button */}
          {hasActiveFilters && (
            <button
              onClick={() => setShowCreativeRecipe(!showCreativeRecipe)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                showCreativeRecipe 
                  ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-glow' 
                  : 'bg-gradient-to-r from-secondary/20 to-primary/20 hover:from-secondary/30 hover:to-primary/30'
              )}
            >
              <Sparkles className="w-5 h-5" />
              创意搭配
            </button>
          )}
        </div>
        
        {/* Creative Recipe Card */}
        {showCreativeRecipe && creativeRecipe && (
          <div className="recipe-card p-6 mb-8 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5 animate-scale-in">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary/20 text-secondary">创意推荐</span>
                </div>
                <h3 className="text-xl font-bold">{creativeRecipe.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{creativeRecipe.description}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Carrot className="w-4 h-4 text-primary" />
                  所需食材
                </h4>
                <div className="flex flex-wrap gap-2">
                  {creativeRecipe.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 bg-muted rounded-full text-sm">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-primary" />
                  烹饪步骤
                </h4>
                <ol className="space-y-1.5 text-sm">
                  {creativeRecipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-semibold text-primary">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm">
              <span className="font-semibold text-primary">小贴士：</span>
              <span className="text-muted-foreground">{creativeRecipe.tips}</span>
            </div>
          </div>
        )}
        
        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <Link 
                key={recipe.id} 
                to={`/recipe/${recipe.id}`}
                className="recipe-card overflow-hidden group animate-scale-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Recipe Image */}
                <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
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
                    <ChefHat className="w-12 h-12 text-primary/30" />
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    {recipe.type === 'main' ? '主菜' : '配菜'}
                  </div>
                  
                  {/* Flavor Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                    {flavorLabels[recipe.flavor]}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {recipe.name}
                  </h3>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.cookTime}分钟</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{recipe.nutrition.calories}kcal</span>
                    </div>
                    <span className={difficultyMap[recipe.difficulty].color}>
                      {difficultyMap[recipe.difficulty].label}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="nutrition-tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="recipe-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h4 className="text-xl font-semibold mb-2">未找到匹配的食谱</h4>
            <p className="text-muted-foreground mb-4">
              尝试点击"创意搭配"按钮，我们会根据您选择的条件生成一道菜谱
            </p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={clearFilters} className="btn-outline">
                清除筛选
              </button>
              <button 
                onClick={() => setShowCreativeRecipe(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                创意搭配
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
