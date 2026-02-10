import { useState } from 'react'
import { Calculator, User, Ruler, Scale, Activity, Zap, Beef, Wheat, Droplet } from 'lucide-react'
import { calculateDailyNutrition, cn } from '../lib/utils'

const activityLevels = [
  { value: 1.2, label: '久坐不动', description: '几乎不运动，办公室工作' },
  { value: 1.375, label: '轻度活动', description: '每周运动1-3次' },
  { value: 1.55, label: '中度活动', description: '每周运动3-5次' },
  { value: 1.725, label: '高度活动', description: '每周运动6-7次' },
  { value: 1.9, label: '极高活动', description: '专业运动员或体力劳动者' },
]

export default function NutritionCalculatorPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)
  const [activityLevel, setActivityLevel] = useState(1.55)
  const [showResults, setShowResults] = useState(false)
  
  const nutrition = calculateDailyNutrition(weight, height, age, gender, activityLevel)
  
  const handleCalculate = () => {
    setShowResults(true)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Calculator className="w-4 h-4" />
            <span className="font-medium">营养计算器</span>
          </div>
          <h1 className="section-title">计算每日营养需求</h1>
          <p className="section-subtitle mx-auto">
            输入您的身体数据，获取个性化的每日营养推荐
          </p>
        </div>
        
        {/* Calculator Form */}
        <div className="recipe-card p-6 md:p-8 mb-8">
          {/* Gender Selection */}
          <div className="mb-8">
            <label className="block font-medium mb-3">
              <User className="w-4 h-4 inline mr-2" />
              性别
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setGender('male')}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  gender === 'male'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="text-3xl mb-2">👨</div>
                <div className="font-medium">男性</div>
              </button>
              <button
                onClick={() => setGender('female')}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  gender === 'female'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="text-3xl mb-2">👩</div>
                <div className="font-medium">女性</div>
              </button>
            </div>
          </div>
          
          {/* Age, Height, Weight */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block font-medium mb-3">
                <User className="w-4 h-4 inline mr-2" />
                年龄
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min={1}
                  max={120}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">岁</span>
              </div>
            </div>
            
            <div>
              <label className="block font-medium mb-3">
                <Ruler className="w-4 h-4 inline mr-2" />
                身高
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={100}
                  max={250}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">cm</span>
              </div>
            </div>
            
            <div>
              <label className="block font-medium mb-3">
                <Scale className="w-4 h-4 inline mr-2" />
                体重
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  min={30}
                  max={200}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">kg</span>
              </div>
            </div>
          </div>
          
          {/* Activity Level */}
          <div className="mb-8">
            <label className="block font-medium mb-3">
              <Activity className="w-4 h-4 inline mr-2" />
              活动水平
            </label>
            <div className="space-y-3">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 transition-all text-left',
                    activityLevel === level.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-muted-foreground">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="btn-primary w-full py-4 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            计算每日营养需求
          </button>
        </div>
        
        {/* Results */}
        {showResults && (
          <div className="animate-slide-up">
            <div className="recipe-card p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center">您的每日营养需求</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-6 rounded-2xl bg-gradient-primary text-primary-foreground text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{nutrition.calories}</div>
                  <div className="text-sm opacity-80">千卡/天</div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-autumn text-primary-foreground text-center">
                  <Beef className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{nutrition.protein}g</div>
                  <div className="text-sm opacity-80">蛋白质</div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-summer text-primary-foreground text-center">
                  <Wheat className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{nutrition.carbs}g</div>
                  <div className="text-sm opacity-80">碳水化合物</div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-winter text-primary-foreground text-center">
                  <Droplet className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{nutrition.fat}g</div>
                  <div className="text-sm opacity-80">脂肪</div>
                </div>
              </div>
              
              {/* Macros Breakdown */}
              <div className="p-6 bg-muted/50 rounded-2xl">
                <h3 className="font-semibold mb-4">营养素占比</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>蛋白质</span>
                      <span>{Math.round((nutrition.protein * 4 / nutrition.calories) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-autumn rounded-full transition-all duration-500"
                        style={{ width: `${(nutrition.protein * 4 / nutrition.calories) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>碳水化合物</span>
                      <span>{Math.round((nutrition.carbs * 4 / nutrition.calories) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{ width: `${(nutrition.carbs * 4 / nutrition.calories) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>脂肪</span>
                      <span>{Math.round((nutrition.fat * 9 / nutrition.calories) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-winter rounded-full transition-all duration-500"
                        style={{ width: `${(nutrition.fat * 9 / nutrition.calories) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tips */}
            <div className="recipe-card p-6 md:p-8">
              <h3 className="font-bold mb-4">营养建议</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>将每日热量平均分配到两餐中，午餐约占60%，晚餐约占40%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>蛋白质尽量选择优质来源，如瘦肉、鱼、蛋、豆制品等</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>碳水化合物优先选择全谷物、蔬菜等复杂碳水</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>脂肪摄入以不饱和脂肪为主，减少反式脂肪摄入</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
