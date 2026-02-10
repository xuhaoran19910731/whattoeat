// 德国超市当前上市食材数据
// 数据来源: Penny, Kaufland, REWE 本周促销

export interface SupermarketItem {
  name: string           // 中文名称
  nameDE: string         // 德文名称
  category: 'vegetable' | 'meat' | 'seafood' | 'fruit' | 'dairy' | 'other'
  supermarkets: ('penny' | 'kaufland' | 'rewe')[]
  price?: string         // 参考价格
  onSale?: boolean       // 是否特价
}

export const supermarketItems: SupermarketItem[] = [
  // 蔬菜类 - Gemüse
  { name: '抱子甘蓝', nameDE: 'Rosenkohl', category: 'vegetable', supermarkets: ['kaufland'], onSale: true },
  { name: '西兰花', nameDE: 'Broccoli', category: 'vegetable', supermarkets: ['kaufland', 'rewe'], onSale: true },
  { name: '土豆', nameDE: 'Speisekartoffeln', category: 'vegetable', supermarkets: ['kaufland', 'penny', 'rewe'] },
  { name: '生姜', nameDE: 'Ingwer', category: 'vegetable', supermarkets: ['kaufland', 'rewe'] },
  { name: '洋葱', nameDE: 'Zwiebeln', category: 'vegetable', supermarkets: ['kaufland', 'penny', 'rewe'] },
  { name: '迷你黄瓜', nameDE: 'Mini-Gurken', category: 'vegetable', supermarkets: ['kaufland'] },
  { name: '大葱', nameDE: 'Lauchzwiebeln', category: 'vegetable', supermarkets: ['kaufland', 'rewe'] },
  { name: '菠菜', nameDE: 'Babyspinat', category: 'vegetable', supermarkets: ['kaufland', 'rewe'], onSale: true },
  { name: '番茄', nameDE: 'Rispentomaten', category: 'vegetable', supermarkets: ['kaufland', 'rewe', 'penny'] },
  { name: '胡萝卜', nameDE: 'Speisemöhren', category: 'vegetable', supermarkets: ['rewe', 'penny'] },
  { name: '四季豆', nameDE: 'Prinzessbohnen', category: 'vegetable', supermarkets: ['rewe'] },
  { name: '生菜', nameDE: 'Salat', category: 'vegetable', supermarkets: ['rewe', 'kaufland'] },
  { name: '白菜', nameDE: 'Chinakohl', category: 'vegetable', supermarkets: ['kaufland', 'rewe'] },
  { name: '蘑菇', nameDE: 'Champignons', category: 'vegetable', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '青椒', nameDE: 'Paprika', category: 'vegetable', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '茄子', nameDE: 'Aubergine', category: 'vegetable', supermarkets: ['rewe', 'kaufland'] },
  { name: '芹菜', nameDE: 'Sellerie', category: 'vegetable', supermarkets: ['rewe', 'kaufland'] },
  { name: '白萝卜', nameDE: 'Rettich', category: 'vegetable', supermarkets: ['kaufland'] },
  
  // 肉类 - Fleisch
  { name: '火鸡肉', nameDE: 'Puten-Schnitzel', category: 'meat', supermarkets: ['penny', 'rewe'], price: '9.99€', onSale: true },
  { name: '鸡翅', nameDE: 'Chicken Wings', category: 'meat', supermarkets: ['kaufland', 'penny'], price: '1.99€', onSale: true },
  { name: '牛肉', nameDE: 'Rinder-Braten', category: 'meat', supermarkets: ['kaufland', 'rewe'], price: '1.79€/100g' },
  { name: '牛肉卷', nameDE: 'Rinder-Rouladen', category: 'meat', supermarkets: ['kaufland'], price: '1.89€' },
  { name: '小牛排', nameDE: 'Kalbs-Steaks', category: 'meat', supermarkets: ['rewe'], price: '3.29€' },
  { name: '鸡腿', nameDE: 'Hähnchen Oberschenkel', category: 'meat', supermarkets: ['penny', 'kaufland'], price: '0.79€/100g', onSale: true },
  { name: '猪排', nameDE: 'Schweine-Stielkotelett', category: 'meat', supermarkets: ['kaufland', 'penny'], price: '0.88€/100g' },
  { name: '猪肉糜', nameDE: 'Hackfleisch', category: 'meat', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '香肠', nameDE: 'Würstchen', category: 'meat', supermarkets: ['penny', 'rewe', 'kaufland'], price: '3.49€' },
  { name: '培根', nameDE: 'Bacon', category: 'meat', supermarkets: ['rewe', 'kaufland'] },
  { name: '五花肉', nameDE: 'Schweinebauch', category: 'meat', supermarkets: ['kaufland', 'rewe'] },
  { name: '排骨', nameDE: 'Spareribs', category: 'meat', supermarkets: ['kaufland', 'penny'] },
  { name: '羊肉', nameDE: 'Lammfleisch', category: 'meat', supermarkets: ['kaufland'] },
  
  // 海鲜 - Meeresfrüchte
  { name: '三文鱼', nameDE: 'Lachs', category: 'seafood', supermarkets: ['rewe', 'kaufland'] },
  { name: '虾', nameDE: 'Garnelen', category: 'seafood', supermarkets: ['rewe', 'penny'], onSale: true },
  { name: '鱼片', nameDE: 'Fischfilet', category: 'seafood', supermarkets: ['penny', 'kaufland'] },
  
  // 水果 - Obst
  { name: '苹果', nameDE: 'Äpfel', category: 'fruit', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '香蕉', nameDE: 'Bananen', category: 'fruit', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '橙子', nameDE: 'Orangen', category: 'fruit', supermarkets: ['penny', 'rewe'] },
  { name: '葡萄', nameDE: 'Trauben', category: 'fruit', supermarkets: ['rewe', 'kaufland'] },
  
  // 乳制品 - Milchprodukte
  { name: '鸡蛋', nameDE: 'Eier', category: 'dairy', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '牛奶', nameDE: 'Milch', category: 'dairy', supermarkets: ['penny', 'rewe', 'kaufland'] },
  { name: '奶酪', nameDE: 'Käse', category: 'dairy', supermarkets: ['rewe', 'kaufland'] },
  { name: '酸奶', nameDE: 'Joghurt', category: 'dairy', supermarkets: ['penny', 'rewe'] },
  
  // 豆制品
  { name: '豆腐', nameDE: 'Tofu', category: 'other', supermarkets: ['rewe', 'kaufland'] },
]

// 超市信息
export const supermarketInfo = {
  penny: {
    name: 'Penny',
    color: '#E31E24',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    bgLight: 'bg-red-50',
  },
  kaufland: {
    name: 'Kaufland', 
    color: '#E10915',
    bgColor: 'bg-rose-600',
    textColor: 'text-rose-600',
    bgLight: 'bg-rose-50',
  },
  rewe: {
    name: 'REWE',
    color: '#CC0A1A',
    bgColor: 'bg-red-600',
    textColor: 'text-red-600', 
    bgLight: 'bg-red-50',
  },
}

// 获取在某超市有售的食材
export function getItemsBySupermarket(supermarket: 'penny' | 'kaufland' | 'rewe'): SupermarketItem[] {
  return supermarketItems.filter(item => item.supermarkets.includes(supermarket))
}

// 获取所有特价食材
export function getOnSaleItems(): SupermarketItem[] {
  return supermarketItems.filter(item => item.onSale)
}

// 获取食材的超市信息
export function getItemSupermarkets(itemName: string): typeof supermarketInfo[keyof typeof supermarketInfo][] {
  const item = supermarketItems.find(i => i.name === itemName || i.nameDE.toLowerCase().includes(itemName.toLowerCase()))
  if (!item) return []
  return item.supermarkets.map(s => supermarketInfo[s])
}

// 检查食材是否在德国超市有售
export function isAvailableInGermanSupermarket(ingredientName: string): SupermarketItem | null {
  return supermarketItems.find(item => 
    ingredientName.includes(item.name) || 
    item.name.includes(ingredientName) ||
    ingredientName.toLowerCase().includes(item.nameDE.toLowerCase())
  ) || null
}
