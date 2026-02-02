import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, X, Clock, Flame, ChefHat } from 'lucide-react'
import { getAllRecipes, getAllTags, getAllFlavors, searchRecipes } from '../data'
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

export default function RecipeBrowserPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedFlavor, setSelectedFlavor] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  
  const allRecipes = getAllRecipes()
  const allTags = getAllTags()
  const allFlavors = getAllFlavors()
  
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
    
    return recipes
  }, [searchQuery, selectedType, selectedFlavor, selectedDifficulty, selectedTags, allRecipes])
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedFlavor('all')
    setSelectedDifficulty('all')
    setSelectedTags([])
  }
  
  const hasActiveFilters = searchQuery || selectedType !== 'all' || selectedFlavor !== 'all' || selectedDifficulty !== 'all' || selectedTags.length > 0

  const flavorLabels: Record<string, string> = {
    salty: '咸鲜', spicy: '麻辣', sour: '酸爽', sweet: '酸甜', light: '清淡', rich: '浓郁'
  }

  const difficultyMap: Record<string, { label: string; color: string }> = {
    easy: { label: '简单', color: 'text-spring' },
    medium: { label: '中等', color: 'text-secondary' },
    hard: { label: '困难', color: 'text-autumn' },
  }

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
        
        {/* Results Count */}
        <div className="mb-6 text-muted-foreground">
          共找到 <span className="font-semibold text-foreground">{filteredRecipes.length}</span> 道食谱
        </div>
        
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
                {/* Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute inset-0 flex items-center justify-center">
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
              尝试调整搜索条件或清除筛选
            </p>
            <button onClick={clearFilters} className="btn-primary">
              清除筛选
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
