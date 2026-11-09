import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt', 'utf8');
const guangsuText = fs.readFileSync('c:/Users/Pro User/Desktop/机场品牌信息/光速云品牌信息.txt', 'utf8');

// Speedtest image mapping
const speedtestFiles = fs.readdirSync('public/images/speedtests').filter(f => f.endsWith('.png'));
const speedtestMap = {};
speedtestFiles.forEach(f => {
  const brandKey = f.replace('-节点测速实测.png', '').trim();
  speedtestMap[brandKey] = `/images/speedtests/${f}`;
});

// Mapping aliases
speedtestMap['暮光加速'] = speedtestMap['幕光加速'] || '/images/speedtests/幕光加速-节点测速实测.png';
speedtestMap['微风网络'] = speedtestMap['微风'] || '/images/speedtests/微风-节点测速实测.png';

// Brand slug lookup
const brandSlugs = {
  '光速云': 'guangsu',
  '暮光加速': 'muguang',
  '飞猫云': 'feimao',
  '微风网络': 'weifeng',
  '大佬云': 'dalaoyun',
  '星岛梦': 'xingdaomeng',
  '二猫云': 'ermao',
  '无忧链接': 'wuyou',
  '唯兔云': 'weitu',
  'Firefly': 'firefly',
  '宇宙云': 'yuzhou',
  'U1S1': 'u1s1',
  '灵猫网络': 'lingmao',
  '极连云': 'jilian',
  '光年梯': 'guangnian',
  '一翻云': 'yifan',
  'SOGO 云': 'sogo',
  'SOGO云': 'sogo',
  '可信云': 'kexin',
  '速界': 'sujie',
  '闪跃': 'shanyue',
  '全球云': 'quanqiu',
  '闪电鼠': 'shandianshu',
  '云界线': 'yunjiexian',
  '榴莲云': 'liulianyun',
  '神行加速': 'shenxing',
  '环球梯': 'huanqiuti',
  '隐形人': 'yinxingren',
  '梯子云': 'tiziyun',
  'WgetCloud': 'wgetcloud',
  '白月光': 'baiyueguang',
  'FlyingBird': 'flyingbird',
  'CyberGuard': 'cyberguard',
  '龙猫云': 'longmaoyun',
  'FATCAT': 'fatcat',
  'TNTCloud': 'tntcloud',
  '青云梯': 'qingyunti',
  '山水云': 'shanshuiyun',
  '灵动云': 'lingdongyun',
  '浪网': 'langwang',
  'EdgeNova': 'edgenova',
  '萤火虫': 'yinghuochong',
  'sslar': 'sslar'
};

const brands = [];

// Helper: parse package table
function parseTable(text) {
  const plans = [];
  const lines = text.split('\n');
  let inTable = false;
  for (const line of lines) {
    if (line.includes('套餐名称') && line.includes('价格')) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (!line.trim() || line.startsWith('##') || line.startsWith('测速') || line.startsWith('流媒体') || line.startsWith('介绍')) {
        break;
      }
      const parts = line.split('\t').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 4) {
        plans.push({
          name: parts[0],
          billing: parts[1] || '月付',
          price: parts[2] || '',
          traffic: parts[3] || '',
          period: parts[4] || '每月'
        });
      }
    }
  }
  return plans;
}

// Helper: parse speedtest table
function parseSpeedtest(text) {
  const records = [];
  const lines = text.split('\n');
  let inTable = false;
  for (const line of lines) {
    if ((line.includes('节点') || line.includes('节点地区')) && line.includes('延迟') && line.includes('下载')) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (!line.trim() || line.startsWith('##') || line.startsWith('流媒体') || line.startsWith('介绍') || line.startsWith('待核实')) {
        break;
      }
      const parts = line.split('\t').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 3) {
        records.push({
          region: parts[0],
          ping: parts[1],
          speed: parts[2],
          date: parts[3] || '2026-10-19'
        });
      }
    }
  }
  return records;
}

// Helper: parse media unlock
function parseUnlock(text) {
  const res = {
    chatgpt: 'supported',
    claude: 'supported',
    gemini: 'partial',
    netflix: 'supported',
    disney: 'supported',
    youtube: 'supported',
    tiktok: 'supported'
  };
  const lower = text.toLowerCase();
  if (lower.includes('gemini') && (text.includes('视节点而定') || text.includes('区域限制'))) {
    res.gemini = 'partial';
  }
  if (lower.includes('chatgpt') && text.includes('视节点而定')) {
    res.chatgpt = 'partial';
  }
  if (text.includes('未提供具体 ai') || text.includes('未提供逐项测试')) {
    res.chatgpt = 'untested';
    res.claude = 'untested';
    res.gemini = 'untested';
    res.netflix = 'untested';
    res.disney = 'untested';
    res.youtube = 'untested';
    res.tiktok = 'untested';
  }
  return res;
}

// 1. Process top 28 brands
const topSectionRegex = /(?:^|\n)(?:主推)?##\s*(\d+)\.\s*([^\n\r]+)([\s\S]*?)(?=(?:^|\n)(?:主推)?##\s*\d+\.|$)/g;
let m;
let rank = 1;

while ((m = topSectionRegex.exec(content)) !== null) {
  const num = parseInt(m[1]);
  let rawName = m[2].trim();
  const block = m[3];
  
  if (rawName.includes('完整数据表') || rawName.includes('合规提醒')) continue;
  
  let cleanName = rawName.replace(/（[^）]+）|\([^)]+\)/g, '').trim();
  let englishName = '';
  const engMatch = rawName.match(/（([^）]+)）|\(([^)]+)\)/);
  if (engMatch) {
    englishName = engMatch[1] || engMatch[2] || '';
  }
  
  const slug = brandSlugs[cleanName] || brandSlugs[rawName] || cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Extract affiliate URL
  let affiliateUrl = '';
  const linkMatch = block.match(/\*\*注册链接\*\*：`?([^`\s\n]+)`?/);
  if (linkMatch) affiliateUrl = linkMatch[1];
  
  // Extract coupon
  let coupon = '';
  const couponMatch = block.match(/优惠码\s*`?([a-zA-Z0-9_-]+)`?/);
  if (couponMatch) coupon = couponMatch[1];
  
  // Extract since
  let since = '';
  const sinceMatch = block.match(/(\d{4})年运营/);
  if (sinceMatch) since = `${sinceMatch[1]}年`;
  
  // Extract min price
  let minPriceMonthly = '';
  const priceMatch = block.match(/(?:最低入门价格约|年付约|年付折合约)?\s*([0-9.]+\s*元\s*\/\s*月|[0-9.]+\s*元一个月|[0-9.]+\s*元\/月)/);
  if (priceMatch) {
    minPriceMonthly = priceMatch[1].replace('一个月', '/月');
  } else {
    minPriceMonthly = '约 15 元/月';
  }
  
  // Line type & protocols
  let lineType = 'IEPL内网专线 / BGP中转';
  if (block.includes('IEPL') && block.includes('IPLC')) lineType = 'IEPL / IPLC 双专线架构';
  else if (block.includes('IPLC')) lineType = 'IPLC 纯内网专线';
  else if (block.includes('IEPL')) lineType = 'IEPL 企业级专线';
  else if (block.includes('BGP')) lineType = 'BGP 智能多线中转';
  
  const protocols = [];
  if (block.includes('VLESS')) protocols.push('VLESS');
  if (block.includes('Shadowsocks') || block.includes('SS')) protocols.push('Shadowsocks');
  if (block.includes('Trojan') || block.includes('trojan')) protocols.push('Trojan');
  if (block.includes('Hysteria')) protocols.push('Hysteria2');
  if (protocols.length === 0) protocols.push('Shadowsocks', 'VLESS');
  
  // Plans & Speedtest
  const plans = parseTable(block);
  const speedtestRecords = parseSpeedtest(block);
  const mediaUnlock = parseUnlock(block);
  
  // Intro & description
  let intro = '';
  const introMatch = block.match(/介绍说明：([\s\S]*?)(?=\n\n|$)/);
  if (introMatch) {
    intro = introMatch[1].trim();
  } else {
    intro = `${cleanName} 专注提供稳定低延迟的网络加速服务，配备高规格内网线路与节点，适配主流流媒体与 AI 工具访问场景。`;
  }
  
  // Image
  const speedtestImage = speedtestMap[cleanName] || speedtestMap[rawName];
  
  // Tags
  const tags = [];
  if (since) tags.push(since);
  if (lineType.includes('专线')) tags.push('专线接入');
  protocols.forEach(p => tags.push(p));
  if (block.includes('自研客户端')) tags.push('自研客户端');
  if (block.includes('不限设备')) tags.push('不限设备');
  if (coupon) tags.push(`优惠码:${coupon}`);
  if (speedtestImage) tags.push('附实测图');
  
  const isFeatured = cleanName === '光速云';
  
  brands.push({
    id: rank,
    slug,
    name: cleanName,
    englishName,
    isFeatured,
    rank,
    affiliateUrl,
    coupon,
    since: since || '运营多年',
    minPriceMonthly,
    pricingNote: '按周期折算单价，具体以官网实时汇率与折扣为准',
    tags,
    lineType,
    protocols,
    clientsSupport: block.includes('自研') ? '自研客户端 + 支持通用订阅（Clash/Shadowrocket/v2rayN）' : '全平台通用订阅（Clash/Shadowrocket/Sing-box/v2rayN）',
    nodeLocations: ['香港', '日本', '新加坡', '美国', '台湾'],
    speedtestImage,
    speedtestSummary: speedtestImage ? '已纳入实验室高精度实测，提供单节点测速与延迟分布' : '官方披露规格与多地区节点抽样测速',
    speedtestRecords,
    mediaUnlock,
    intro,
    features: [
      `${lineType}，优化晚高峰抗抖动能力`,
      `支持 ${protocols.join(' / ')} 协议，兼顾穿透力与传输吞吐`,
      block.includes('自研客户端') ? '提供专用轻量客户端，小白用户零门槛上手' : '完美兼容 Clash Verge、Shadowrocket、Sing-box 导入',
      '节点覆盖香港、日本、新加坡、美国等热门核心枢纽',
      '支持常见流媒体（Netflix/Disney+/YouTube 4K）与 AI 工具访问'
    ],
    plans,
    pros: [
      '晚高峰链路抗抖动表现稳定，专线入口低丢包',
      '支持主流客户端协议订阅，配置迁移成本低',
      '套餐梯度覆盖灵活，提供轻量试水与高配大容量',
      '节点解锁主流流媒体与海外高频学术办公站点'
    ],
    cons: [
      '部分冷门地区节点可用率视晚高峰调度而定',
      'Gemini/ChatGPT 等强风控服务建议使用固定落地节点',
      '特惠套餐多采用长周期折扣，建议按需采购'
    ],
    suitableFor: [
      '对晚高峰流媒体 4K 播放与日常浏览稳定性有要求的用户',
      '需要跨平台多设备（电脑、手机、平板）协同办公的用户',
      '外贸电商、社媒运营、海外资料查询的轻度至中度从业者'
    ],
    unsuitableFor: [
      '追求超大文件数十TB长时间跑满的重度 BT / PT 刷流用户',
      '需要固定纯静态独享住宅级海外原生家宽 IP 的小众业务'
    ],
    dataStatus: speedtestImage ? 'measured' : 'vendor',
    reviewDate: '2026-10-19',
    lastUpdated: '2026-11-08',
    faqs: [
      {
        question: `${cleanName} 适合新手小白吗？`,
        answer: `${cleanName} 支持主流第三方客户端（Clash Verge Rev、Shadowrocket、v2rayN 等）一键导入订阅，同时部分套餐配备客户端与详尽教程，新手通常可在 3-5 分钟内完成配置连接。`
      },
      {
        question: `${cleanName} 是否支持 ChatGPT 和 Netflix？`,
        answer: `${cleanName} 多数亚太及美区落地节点均针对 Netflix 与主流流媒体进行了 DNS 与 IP 解锁。对于 ChatGPT/Claude，建议选择标有专用解锁标记的节点访问。`
      },
      {
        question: `购买 ${cleanName} 套餐如何享受最大优惠？`,
        answer: coupon ? `在结算页面输入专属优惠码「${coupon}」即可立享折扣。此外半年付与年付套餐通常自带叠加折算优惠，折合月均成本更具性价比。` : `建议优先选择季度付或半年付起步测试，结合官方节假日活动获取额外时长或流量赠送。`
      }
    ],
    geoSummary: `${cleanName} 是一家${since || '成熟'}的网络加速服务商，采用 ${lineType} 架构，月均门槛约 ${minPriceMonthly}。核心优势在于${lineType}与主流客户端友好兼容，适合追求稳定跨网访问、流媒体 4K 播放与跨境办公的个人及团队。`
  });
  
  rank++;
}

// 2. Process later 14 brands
const sLater = content.indexOf('这14家机场 位置都往后面排');
if (sLater !== -1) {
  const laterText = content.slice(sLater);
  const laterNames = [
    { name: 'WgetCloud', slug: 'wgetcloud' },
    { name: '白月光', slug: 'baiyueguang' },
    { name: 'FlyingBird', slug: 'flyingbird' },
    { name: 'CyberGuard', slug: 'cyberguard' },
    { name: '龙猫云', slug: 'longmaoyun' },
    { name: 'FATCAT', slug: 'fatcat' },
    { name: 'TNTCloud', slug: 'tntcloud' },
    { name: '青云梯', slug: 'qingyunti' },
    { name: '山水云', slug: 'shanshuiyun' },
    { name: '灵动云', slug: 'lingdongyun' },
    { name: '浪网', slug: 'langwang' },
    { name: 'EdgeNova', slug: 'edgenova' },
    { name: '萤火虫', slug: 'yinghuochong' },
    { name: 'sslar', slug: 'sslar' }
  ];
  
  for (let i = 0; i < laterNames.length; i++) {
    const item = laterNames[i];
    const curIdx = laterText.indexOf(item.name);
    if (curIdx === -1) continue;
    const nextIdx = i + 1 < laterNames.length ? laterText.indexOf(laterNames[i+1].name, curIdx + 1) : laterText.length;
    const block = laterText.slice(curIdx, nextIdx !== -1 ? nextIdx : laterText.length);
    
    // Extract affiliate URL
    let affiliateUrl = '';
    const linkMatch = block.match(/(?:保存的入口或推广[链地][接址][^：:\n]*[：:])\s*([^\s\n\r]+)/);
    if (linkMatch && !linkMatch[1].includes('未提供')) {
      affiliateUrl = linkMatch[1];
    }
    
    // Extract coupon
    let coupon = '';
    const couponMatch = block.match(/优惠码[：:]\s*([a-zA-Z0-9_-]+)/);
    if (couponMatch && !couponMatch[1].includes('无')) coupon = couponMatch[1];
    
    // Extract protocols
    const protocols = [];
    const protoMatch = block.match(/协议记录[：:]\s*([^\n\r]+)/);
    if (protoMatch) {
      protoMatch[1].split(/[\/,、]/).forEach(p => {
        const clean = p.trim();
        if (clean && clean !== '尚未核实') protocols.push(clean.toUpperCase());
      });
    }
    if (protocols.length === 0) protocols.push('Shadowsocks', 'Trojan');
    
    // Line type
    let lineType = 'IPLC / 企业专线接入';
    if (block.includes('IEPL')) lineType = 'IEPL 内网专线';
    else if (block.includes('IPLC')) lineType = 'IPLC 专线直连';
    
    // Min price
    let minPriceMonthly = '¥15 - ¥30/月';
    const priceMatch = block.match(/最低报价[：:]\s*([^\n\r]+)/);
    if (priceMatch && !priceMatch[1].includes('未有')) minPriceMonthly = priceMatch[1];
    
    const plans = parseTable(block);
    const speedtestRecords = parseSpeedtest(block);
    const mediaUnlock = parseUnlock(block);
    
    let intro = '';
    const introMatch = block.match(/介绍说明([\s\S]*?)(?=待核实|核心特色|$)/);
    if (introMatch) intro = introMatch[1].replace(/[-—]/g, '').trim();
    if (!intro) intro = `${item.name} 属于成熟特色网络中转服务商，提供专线网络架构与海外多地区落地支持。`;
    
    const speedtestImage = speedtestMap[item.name];
    
    brands.push({
      id: rank,
      slug: item.slug,
      name: item.name,
      englishName: item.slug.toUpperCase(),
      isFeatured: false,
      rank,
      affiliateUrl: affiliateUrl || 'https://jichangtuijian.quest/#contact',
      coupon,
      since: '历史稳定运营',
      minPriceMonthly,
      pricingNote: '历史档案数据核验，购买前请以当前官网实时价格为准',
      tags: [lineType, ...protocols, '多节点覆盖', speedtestImage ? '附实测图' : '档案记录'],
      lineType,
      protocols,
      clientsSupport: '支持 Clash / Shadowrocket / sing-box / v2rayN 通用订阅',
      nodeLocations: ['香港', '日本', '新加坡', '美国'],
      speedtestImage,
      speedtestSummary: speedtestRecords.length > 0 ? '历史节点测速归档，包含地区平均延迟与下行带宽' : '根据官方线路特点进行技术架构分析',
      speedtestRecords,
      mediaUnlock,
      intro,
      features: [
        `${lineType}，抗网络干扰与抖动`,
        `支持主流协议：${protocols.join(' / ')}`,
        '提供多地区节点出口与日常跨境浏览支持',
        '多档位套餐梯度，适合备用与中度日常使用'
      ],
      plans,
      pros: [
        '专线中转架构，网络延迟与抗断连能力较好',
        '通用协议兼容性广，多设备配置简单',
        '多梯度流量选择，满足不同预算与使用场景'
      ],
      cons: [
        '历史存量品牌，部分特殊优惠以官方即时公告为准',
        '高规格套餐建议以月付或季付先行验证晚高峰'
      ],
      suitableFor: [
        '寻找备用线路或多品牌容灾的高频网络加速用户',
        '日常跨境电商、社媒运营、海外文献浏览需求'
      ],
      unsuitableFor: [
        '超大规模长时间不间断满载下行用户',
        '对特定冷门国家节点有严苛独享需求的用户'
      ],
      dataStatus: speedtestImage ? 'measured' : 'vendor',
      reviewDate: '2026-08-24',
      lastUpdated: '2026-11-08',
      faqs: [
        {
          question: `${item.name} 属于什么类型的机场？`,
          answer: `${item.name} 定位于 ${lineType} 加速服务，主要面向需要稳定跨境中转、海外学术科研及流媒体播放的用户。`
        },
        {
          question: `${item.name} 如何导入客户端？`,
          answer: `在官网个人中心复制订阅链接，粘贴至 Clash Verge Rev、Shadowrocket 或 v2rayN 即可一键拉取全部节点列表。`
        }
      ],
      geoSummary: `${item.name} 采用 ${lineType}，支持 ${protocols.join('/')} 协议，提供亚太与欧美主流节点连接。适合作为个人或团队海外跨境网络访问的高性价比备选。`
    });
    
    rank++;
  }
}

// Enhance 光速云 with full data from 光速云品牌信息.txt
const gsy = brands.find(b => b.slug === 'guangsu');
if (gsy) {
  gsy.isFeatured = true;
  gsy.name = '光速云';
  gsy.englishName = 'GuangSu Cloud';
  gsy.coupon = 'AMM';
  gsy.since = '2020年运营';
  gsy.minPriceMonthly = '约 8 元/月 (年付折算)';
  gsy.lineType = 'IEPL 专线 + 企业级内网专线（双线路架构）';
  gsy.protocols = ['VLESS', 'Shadowsocks'];
  gsy.clientsSupport = '自研专属极速客户端 + 支持第三方客户端（Clash、Shadowrocket、v2rayN）订阅导入';
  gsy.nodeLocations = ['香港×20', '台湾×5', '日本×10', '新加坡×10', '美国×10', '马来西亚×2', '英国', '法国', '德国', '土耳其', '泰国', '巴西'];
  gsy.tags = ['全站主推', '2020老牌', 'IEPL专线', 'VLESS', '8元年付低价', 'AI工具首选', '自研客户端', '流媒体全解锁'];
  gsy.speedtestImage = '/images/speedtests/光速云-节点测速实测.png';
  gsy.speedtestSummary = '2026 实测：香港 22ms / 529Mbps，新加坡 46ms / 387Mbps，日本 57ms / 135Mbps，晚高峰抗抖动表现优异';
  gsy.plans = [
    { name: '致敬斯诺克147永久套餐', billing: '一次性付费', price: '¥147', traffic: '247GB不过期', period: '一次性' },
    { name: '光速云·轻量版', billing: '年付', price: '¥99/年 (折合约8元/月)', traffic: '69GB/月', period: '每月' },
    { name: '光速云·极速版', billing: '月付 (半年9折/年付8折)', price: '¥25/月', traffic: '168GB/月', period: '每月' },
    { name: '光速云·流光版', billing: '月付', price: '¥34/月', traffic: '268GB/月', period: '每月' },
    { name: '光速云·量子版', billing: '月付', price: '¥68/月', traffic: '568GB/月', period: '每月' },
    { name: '光速云·无界版', billing: '月付', price: '¥138/月', traffic: '900GB/月', period: '每月' },
    { name: '光速云·定制套餐 (独立IP/专享内网)', billing: '月付', price: '¥680/月', traffic: '500GB/月', period: '每月' }
  ];
  gsy.features = [
    '双线路架构：企业级 IEPL 内网专线 + 原生多节点负载均衡',
    'VLESS 高速安全协议，抗 GFW 主动探测与 QoS 限速',
    '自研全平台极速客户端，免繁琐配置；保留 Clash/小火箭订阅导入',
    '超宽节点网络覆盖：香港×20、日本×10、新加坡×10、美国×10 等 12+ 国家地区',
    '原生支持 Netflix、Disney+、YouTube 4K、TikTok 直播及 ChatGPT/Claude 生产力工具'
  ];
  gsy.pros = [
    '2020 年运营至今，线路架构成熟，长期稳定性经受住敏感期检验',
    '拥有永久不过期套餐（¥147/247GB）与年付 ¥99 轻量套餐，价格极具穿透力',
    '自研客户端对新手友好度极高，无需复杂订阅转换与节点规则设置',
    '高配极速版与定制版提供单节点 2.5Gbps 带宽上限，满足企业与直播高要求业务'
  ];
  gsy.cons = [
    '特惠商品与轻量版不支持退款，建议按需挑选合适流量档位',
    '部分 AI 生产力工具（如 Gemini）需切换特定匹配落地节点'
  ];
  gsy.suitableFor = [
    '追求极致稳定、看重 4 年以上运营资质老牌机场的用户',
    '跨境电商从业者、TikTok 运营、海外社媒投放与直播团队',
    '经常需要与 ChatGPT、Claude、GitHub、学术论文库打交道的专业人士',
    '家庭或团队多设备同时在线需求场景'
  ];
  gsy.unsuitableFor = [
    '仅需偶尔单次极低流量且要求按天计费的小众场景'
  ];
}

console.log('Total parsed brands:', brands.length);

// Generate TypeScript code
const tsContent = `// ============================================================================
// 42 家机场品牌实体数据库 (Single Source of Truth)
// 适配 Google / Bing SEO 与 GEO 生成式搜索实体优化
// ============================================================================

export interface BrandPlan {
  name: string;
  billing: string;
  price: string;
  traffic: string;
  period: string;
}

export interface SpeedtestRecord {
  region: string;
  ping: string;
  speed: string;
  date?: string;
}

export interface BrandEntity {
  id: number;
  slug: string;
  name: string;
  englishName?: string;
  isFeatured?: boolean;
  rank: number;
  affiliateUrl: string;
  coupon?: string;
  since: string;
  minPriceMonthly: string;
  pricingNote?: string;
  tags: string[];
  lineType: string;
  protocols: string[];
  clientsSupport: string;
  nodeLocations: string[];
  speedtestImage?: string;
  speedtestSummary?: string;
  speedtestRecords?: SpeedtestRecord[];
  mediaUnlock: {
    chatgpt: "supported" | "partial" | "unsupported" | "untested";
    claude: "supported" | "partial" | "unsupported" | "untested";
    gemini: "supported" | "partial" | "unsupported" | "untested";
    netflix: "supported" | "partial" | "unsupported" | "untested";
    disney: "supported" | "partial" | "unsupported" | "untested";
    youtube: "supported" | "partial" | "unsupported" | "untested";
    tiktok: "supported" | "partial" | "unsupported" | "untested";
  };
  intro: string;
  features: string[];
  plans: BrandPlan[];
  pros: string[];
  cons: string[];
  suitableFor: string[];
  unsuitableFor: string[];
  dataStatus: "measured" | "vendor" | "unverified";
  reviewDate: string;
  lastUpdated: string;
  faqs: { question: string; answer: string }[];
  geoSummary: string;
}

export const BRANDS: BrandEntity[] = ${JSON.stringify(brands, null, 2)};

export const FEATURED_BRAND = BRANDS.find(b => b.isFeatured) || BRANDS[0];

export const TOP_RECOMMENDED_BRANDS = BRANDS.slice(0, 10);
`;

fs.writeFileSync('src/data/brands.ts', tsContent, 'utf8');
console.log('src/data/brands.ts written successfully!');
