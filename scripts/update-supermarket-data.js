// 德国超市食材数据更新脚本
// 每日自动运行，抓取 Penny/Kaufland/REWE 的促销食材

const fs = require('fs');
const path = require('path');

// 基础食材数据 - 可以从超市API或网页抓取更新
// 由于超市网站可能有反爬虫措施，这里提供一个可扩展的框架
async function fetchPennyOffers() {
  // TODO: 实现 Penny 促销数据抓取
  // 可以使用 puppeteer 或调用其 API
  return [
    { name: '土豆', nameDE: 'Speisekartoffeln', category: 'vegetable', onSale: true },
    { name: '番茄', nameDE: 'Rispentomaten', category: 'vegetable', onSale: true },
    { name: '鸡腿', nameDE: 'Hähnchen Oberschenkel', category: 'meat', onSale: true },
    { name: '猪排', nameDE: 'Schweine-Stielkotelett', category: 'meat', onSale: false },
    { name: '洋葱', nameDE: 'Zwiebeln', category: 'vegetable', onSale: false },
    { name: '胡萝卜', nameDE: 'Speisemöhren', category: 'vegetable', onSale: false },
    { name: '蘑菇', nameDE: 'Champignons', category: 'vegetable', onSale: false },
    { name: '虾', nameDE: 'Garnelen', category: 'seafood', onSale: true },
    { name: '鸡蛋', nameDE: 'Eier', category: 'dairy', onSale: false },
  ];
}

async function fetchKauflandOffers() {
  // TODO: 实现 Kaufland 促销数据抓取
  return [
    { name: '抱子甘蓝', nameDE: 'Rosenkohl', category: 'vegetable', onSale: true },
    { name: '西兰花', nameDE: 'Broccoli', category: 'vegetable', onSale: true },
    { name: '土豆', nameDE: 'Speisekartoffeln', category: 'vegetable', onSale: false },
    { name: '生姜', nameDE: 'Ingwer', category: 'vegetable', onSale: false },
    { name: '洋葱', nameDE: 'Zwiebeln', category: 'vegetable', onSale: false },
    { name: '迷你黄瓜', nameDE: 'Mini-Gurken', category: 'vegetable', onSale: false },
    { name: '大葱', nameDE: 'Lauchzwiebeln', category: 'vegetable', onSale: false },
    { name: '菠菜', nameDE: 'Babyspinat', category: 'vegetable', onSale: true },
    { name: '番茄', nameDE: 'Rispentomaten', category: 'vegetable', onSale: false },
    { name: '白萝卜', nameDE: 'Rettich', category: 'vegetable', onSale: false },
    { name: '鸡翅', nameDE: 'Chicken Wings', category: 'meat', onSale: true },
    { name: '牛肉', nameDE: 'Rinder-Braten', category: 'meat', onSale: false },
    { name: '牛肉卷', nameDE: 'Rinder-Rouladen', category: 'meat', onSale: false },
    { name: '猪排', nameDE: 'Schweine-Stielkotelett', category: 'meat', onSale: false },
    { name: '五花肉', nameDE: 'Schweinebauch', category: 'meat', onSale: false },
    { name: '排骨', nameDE: 'Spareribs', category: 'meat', onSale: false },
    { name: '羊肉', nameDE: 'Lammfleisch', category: 'meat', onSale: false },
    { name: '三文鱼', nameDE: 'Lachs', category: 'seafood', onSale: false },
    { name: '鱼片', nameDE: 'Fischfilet', category: 'seafood', onSale: false },
    { name: '豆腐', nameDE: 'Tofu', category: 'other', onSale: false },
  ];
}

async function fetchReweOffers() {
  // TODO: 实现 REWE 促销数据抓取
  return [
    { name: '西兰花', nameDE: 'Broccoli', category: 'vegetable', onSale: false },
    { name: '土豆', nameDE: 'Speisekartoffeln', category: 'vegetable', onSale: false },
    { name: '生姜', nameDE: 'Ingwer', category: 'vegetable', onSale: false },
    { name: '洋葱', nameDE: 'Zwiebeln', category: 'vegetable', onSale: false },
    { name: '大葱', nameDE: 'Lauchzwiebeln', category: 'vegetable', onSale: false },
    { name: '菠菜', nameDE: 'Babyspinat', category: 'vegetable', onSale: false },
    { name: '番茄', nameDE: 'Rispentomaten', category: 'vegetable', onSale: false },
    { name: '胡萝卜', nameDE: 'Speisemöhren', category: 'vegetable', onSale: false },
    { name: '四季豆', nameDE: 'Prinzessbohnen', category: 'vegetable', onSale: false },
    { name: '生菜', nameDE: 'Salat', category: 'vegetable', onSale: false },
    { name: '白菜', nameDE: 'Chinakohl', category: 'vegetable', onSale: false },
    { name: '蘑菇', nameDE: 'Champignons', category: 'vegetable', onSale: false },
    { name: '青椒', nameDE: 'Paprika', category: 'vegetable', onSale: false },
    { name: '茄子', nameDE: 'Aubergine', category: 'vegetable', onSale: false },
    { name: '芹菜', nameDE: 'Sellerie', category: 'vegetable', onSale: false },
    { name: '火鸡肉', nameDE: 'Puten-Schnitzel', category: 'meat', onSale: true },
    { name: '牛肉', nameDE: 'Rinder-Braten', category: 'meat', onSale: false },
    { name: '小牛排', nameDE: 'Kalbs-Steaks', category: 'meat', onSale: false },
    { name: '培根', nameDE: 'Bacon', category: 'meat', onSale: false },
    { name: '五花肉', nameDE: 'Schweinebauch', category: 'meat', onSale: false },
    { name: '三文鱼', nameDE: 'Lachs', category: 'seafood', onSale: false },
    { name: '虾', nameDE: 'Garnelen', category: 'seafood', onSale: true },
    { name: '豆腐', nameDE: 'Tofu', category: 'other', onSale: false },
  ];
}

async function mergeAndGenerateData() {
  const pennyItems = await fetchPennyOffers();
  const kauflandItems = await fetchKauflandOffers();
  const reweItems = await fetchReweOffers();
  
  // 合并数据，跟踪每个食材在哪些超市有售
  const itemMap = new Map();
  
  pennyItems.forEach(item => {
    const key = item.name;
    if (itemMap.has(key)) {
      itemMap.get(key).supermarkets.push('penny');
      if (item.onSale) itemMap.get(key).onSale = true;
    } else {
      itemMap.set(key, { ...item, supermarkets: ['penny'] });
    }
  });
  
  kauflandItems.forEach(item => {
    const key = item.name;
    if (itemMap.has(key)) {
      if (!itemMap.get(key).supermarkets.includes('kaufland')) {
        itemMap.get(key).supermarkets.push('kaufland');
      }
      if (item.onSale) itemMap.get(key).onSale = true;
    } else {
      itemMap.set(key, { ...item, supermarkets: ['kaufland'] });
    }
  });
  
  reweItems.forEach(item => {
    const key = item.name;
    if (itemMap.has(key)) {
      if (!itemMap.get(key).supermarkets.includes('rewe')) {
        itemMap.get(key).supermarkets.push('rewe');
      }
      if (item.onSale) itemMap.get(key).onSale = true;
    } else {
      itemMap.set(key, { ...item, supermarkets: ['rewe'] });
    }
  });
  
  return Array.from(itemMap.values());
}

function generateTypeScriptFile(items) {
  const today = new Date().toISOString().split('T')[0];
  
  const content = `// 德国超市当前上市食材数据
// 最后更新: ${today}
// 数据来源: Penny, Kaufland, REWE 本周促销

export interface SupermarketItem {
  name: string           // 中文名称
  nameDE: string         // 德文名称
  category: 'vegetable' | 'meat' | 'seafood' | 'fruit' | 'dairy' | 'other'
  supermarkets: ('penny' | 'kaufland' | 'rewe')[]
  price?: string         // 参考价格
  onSale?: boolean       // 是否特价
}

export const supermarketItems: SupermarketItem[] = ${JSON.stringify(items, null, 2)};

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
};

// 获取在某超市有售的食材
export function getItemsBySupermarket(supermarket: 'penny' | 'kaufland' | 'rewe'): SupermarketItem[] {
  return supermarketItems.filter(item => item.supermarkets.includes(supermarket));
}

// 获取所有特价食材
export function getOnSaleItems(): SupermarketItem[] {
  return supermarketItems.filter(item => item.onSale);
}

// 获取食材的超市信息
export function getItemSupermarkets(itemName: string): typeof supermarketInfo[keyof typeof supermarketInfo][] {
  const item = supermarketItems.find(i => i.name === itemName || i.nameDE.toLowerCase().includes(itemName.toLowerCase()));
  if (!item) return [];
  return item.supermarkets.map(s => supermarketInfo[s]);
}

// 检查食材是否在德国超市有售
export function isAvailableInGermanSupermarket(ingredientName: string): SupermarketItem | null {
  return supermarketItems.find(item => 
    ingredientName.includes(item.name) || 
    item.name.includes(ingredientName) ||
    ingredientName.toLowerCase().includes(item.nameDE.toLowerCase())
  ) || null;
}
`;
  
  return content;
}

async function main() {
  console.log('开始更新德国超市食材数据...');
  
  try {
    const items = await mergeAndGenerateData();
    const content = generateTypeScriptFile(items);
    
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'german-supermarket.ts');
    fs.writeFileSync(outputPath, content, 'utf8');
    
    console.log(`成功更新 ${items.length} 个食材数据`);
    console.log(`文件已保存到: ${outputPath}`);
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
}

main();
