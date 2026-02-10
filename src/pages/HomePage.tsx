import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, UtensilsCrossed, Calculator, ShoppingCart, ArrowRight, Snowflake, ChefHat, Sun, Moon, CalendarDays } from 'lucide-react'
import { getWeeklyPlan, categorizeShoppingList, getMealByDate, getBerlinDate } from '../data'
import { getCurrentSeason, getSeasonName } from '../lib/utils'

const features = [
  {
    icon: Calendar,
    title: '按周规划',
    description: '每周采购一次，7天14餐科学搭配',
    link: '/weekly',
  },
  {
    icon: ShoppingCart,
    title: '智能采购清单',
    description: '自动生成购物清单，告别买菜烦恼',
    link: '/weekly',
  },
  {
    icon: UtensilsCrossed,
    title: '每餐两菜',
    description: '一主一配，营养均衡口味丰富',
    link: '/browse',
  },
  {
    icon: Calculator,
    title: '营养均衡',
    description: '科学计算每日营养，健康饮食无忧',
    link: '/calculator',
  },
]

export default function HomePage() {
  const currentSeason = getCurrentSeason()
  const berlinDate = getBerlinDate()
  const [selectedDate, setSelectedDate] = useState<Date>(berlinDate)
  
  const todayData = getMealByDate(selectedDate)
  const week1 = todayData?.weekPlan || getWeeklyPlan(1)
  const categorizedList = week1 ? categorizeShoppingList(week1.shoppingList) : {}

  // 格式化日期
  const dateStr = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekdayStr = weekdays[selectedDate.getDay()]
  
  // 判断是否是今天
  const isToday = selectedDate.toDateString() === berlinDate.toDateString()

  // 日期选择处理
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setSelectedDate(date)
  }
  
  // 格式化为input[type=date]所需格式
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDM0LDE5Nyw5NCwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft mb-8 animate-bounce-soft">
              <Snowflake className="w-5 h-5 text-winter" />
              <span className="font-medium">{getSeasonName(currentSeason)}时令菜谱</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">万能食谱</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-slide-up">
              每周采购一次，轻松搞定
            </p>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up animate-delay-100">
              <span className="text-foreground font-semibold">365天不重样</span> · 每餐两道菜 · 科学搭配营养均衡
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-200">
              <Link to="/weekly" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                查看本周食谱
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/calculator" className="btn-outline px-8 py-4 text-lg w-full sm:w-auto">
                计算营养需求
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Meal - 今日食谱 */}
      {todayData && (
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
                <Calendar className="w-5 h-5" />
                {isToday ? '今日' : dateStr} {weekdayStr}
              </div>
              <h2 className="section-title">{isToday ? '今日食谱' : `${dateStr}食谱`}</h2>
              <p className="section-subtitle mx-auto">第{todayData.weekNumber}周 · 为您精心搭配的美味</p>
              
              {/* 日期选择器 */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={formatDateForInput(selectedDate)}
                  onChange={handleDateChange}
                  min="2026-01-01"
                  max="2026-03-31"
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {!isToday && (
                  <button 
                    onClick={() => setSelectedDate(berlinDate)}
                    className="text-xs text-primary hover:underline"
                  >
                    返回今天
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* 午餐 */}
              <div className="recipe-card p-6 animate-slide-up">
                <Link to={`/weekly?date=${formatDateForInput(selectedDate)}`} className="flex items-center gap-3 mb-4 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                    <Sun className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">午餐</h3>
                    <p className="text-sm text-muted-foreground">主食: {todayData.todayMeal.lunch.staple === 'rice' ? '米饭' : todayData.todayMeal.lunch.staple === 'noodle' ? '面条' : '米饭/面条'}</p>
                  </div>
                </Link>
                <div className="space-y-3">
                  <Link to={`/recipe/${todayData.todayMeal.lunch.main.id}`} className="block p-4 bg-secondary/10 rounded-xl hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-secondary font-medium mb-1">主菜</div>
                        <div className="font-semibold text-lg">{todayData.todayMeal.lunch.main.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{todayData.todayMeal.lunch.main.cookTime}分钟 · {todayData.todayMeal.lunch.main.nutrition.calories}kcal</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                  <Link to={`/recipe/${todayData.todayMeal.lunch.side.id}`} className="block p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">配菜</div>
                        <div className="font-medium">{todayData.todayMeal.lunch.side.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{todayData.todayMeal.lunch.side.cookTime}分钟 · {todayData.todayMeal.lunch.side.nutrition.calories}kcal</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* 晚餐 */}
              <div className="recipe-card p-6 animate-slide-up animate-delay-100">
                <Link to={`/weekly?date=${formatDateForInput(selectedDate)}`} className="flex items-center gap-3 mb-4 group">
                  <div className="w-12 h-12 rounded-xl bg-winter/20 flex items-center justify-center group-hover:bg-winter/30 transition-colors">
                    <Moon className="w-6 h-6 text-winter" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">晚餐</h3>
                    <p className="text-sm text-muted-foreground">主食: {todayData.todayMeal.dinner.staple === 'rice' ? '米饭' : todayData.todayMeal.dinner.staple === 'noodle' ? '面条' : '米饭/面条'}</p>
                  </div>
                </Link>
                <div className="space-y-3">
                  <Link to={`/recipe/${todayData.todayMeal.dinner.main.id}`} className="block p-4 bg-winter/10 rounded-xl hover:bg-winter/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-winter font-medium mb-1">主菜</div>
                        <div className="font-semibold text-lg">{todayData.todayMeal.dinner.main.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{todayData.todayMeal.dinner.main.cookTime}分钟 · {todayData.todayMeal.dinner.main.nutrition.calories}kcal</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                  <Link to={`/recipe/${todayData.todayMeal.dinner.side.id}`} className="block p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">配菜</div>
                        <div className="font-medium">{todayData.todayMeal.dinner.side.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{todayData.todayMeal.dinner.side.cookTime}分钟 · {todayData.todayMeal.dinner.side.nutrition.calories}kcal</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="recipe-card p-6 text-center animate-slide-up hover:shadow-lg transition-shadow cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Weekly Preview */}
      {week1 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">本周食谱预览</h2>
              <p className="section-subtitle mx-auto">{week1.dateRange}</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {week1.meals.slice(0, 7).map((meal, index) => {
                // 从日期字符串解析日期用于链接
                const dateMatch = meal.date.match(/(\d+)月(\d+)日/)
                const linkDate = dateMatch ? `2026-${dateMatch[1].padStart(2, '0')}-${dateMatch[2].padStart(2, '0')}` : ''
                
                return (
                  <Link 
                    key={index} 
                    to={`/weekly?date=${linkDate}`}
                    className="recipe-card p-4 animate-scale-in hover:shadow-lg transition-shadow cursor-pointer" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="text-center mb-3">
                      <div className="text-xs text-muted-foreground">{meal.weekday}</div>
                      <div className="font-bold text-sm">{meal.date}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <div className="text-xs text-secondary font-medium mb-1">午餐</div>
                        <div className="font-medium truncate">{meal.lunch.main.name}</div>
                        <div className="text-muted-foreground truncate">{meal.lunch.side.name}</div>
                      </div>
                      <div className="p-2 bg-winter/10 rounded-lg">
                        <div className="text-xs text-winter font-medium mb-1">晚餐</div>
                        <div className="font-medium truncate">{meal.dinner.main.name}</div>
                        <div className="text-muted-foreground truncate">{meal.dinner.side.name}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            
            <div className="text-center">
              <Link to="/weekly" className="btn-primary">
                查看完整食谱
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Shopping List Preview */}
      {week1 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">本周采购清单</h2>
              <p className="section-subtitle mx-auto">一次采购，一周无忧</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(categorizedList).slice(0, 6).map(([category, items], index) => (
                <Link 
                  key={category} 
                  to="/weekly"
                  className="recipe-card p-5 animate-slide-up hover:shadow-lg transition-shadow cursor-pointer" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {category}
                    <span className="text-sm font-normal text-muted-foreground">({items.length}种)</span>
                  </h3>
                  <ul className="space-y-2">
                    {items.slice(0, 4).map((item, i) => (
                      <li key={i} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.totalAmount}</span>
                      </li>
                    ))}
                    {items.length > 4 && (
                      <li className="text-sm text-muted-foreground">还有 {items.length - 4} 种...</li>
                    )}
                  </ul>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/weekly" className="btn-outline">
                查看完整清单
                <ShoppingCart className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="recipe-card p-8 md:p-12 text-center bg-gradient-primary">
            <Link to="/browse" className="inline-block">
              <ChefHat className="w-16 h-16 mx-auto mb-4 text-primary-foreground/80 hover:scale-110 transition-transform" />
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              开始您的健康饮食之旅
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              万能食谱为您规划每一餐，让下厨变得简单又有趣
            </p>
            <Link to="/weekly" className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300">
              <Calendar className="w-5 h-5" />
              立即开始
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
