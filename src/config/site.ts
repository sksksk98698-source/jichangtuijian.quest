// ============================================================================
// SITE CONFIG — 机场baby (jichangtuijian.quest)
// 高端 SEO / GEO 转化站全局中央配置
// ============================================================================

export const SITE = {
  // --- 身份与规范域名 --------------------------------------------------------
  url: "https://jichangtuijian.quest",
  lang: "zh-CN",
  ogLocale: "zh_CN",
  name: "机场baby",
  tagline: "42家高速稳定专线机场推荐与流媒体AI评测导航",
  description:
    "机场baby专注收录与评测 42 家优质网络加速与跨境专线服务。提供真实晚高峰测速图、Netflix/ChatGPT 解锁状态矩阵、全平台客户端（Clash/小火箭/v2rayN）配置指南与防跑路选型建议。",

  // --- 实体与品牌信息 (JSON-LD) ----------------------------------------------
  business: {
    schemaType: "Organization",
    phone: "",
    email: "contact@jichangtuijian.quest",
    address: {
      street: "Central Cyberport",
      postalCode: "999077",
      city: "Hong Kong",
      country: "HK",
    },
    geo: { latitude: 22.3193, longitude: 114.1694 },
    priceRange: "¥¥",
    googleBusinessUrl: "",
    socialProfiles: [] as string[],
  },

  // --- 搜索引擎站长平台所有权验证代码预留 (上线后填入相应 Key 即可全站生效) ---
  verification: {
    google: "",  // Google Search Console (google-site-verification)
    bing: "",    // Bing Webmaster Tools (msvalidate.01)
    shenma: "",  // 神马站长平台 (shenma-site-verification)
    baidu: "",   // 百度搜索资源平台 (baidu-site-verification)
  },

  // --- 实验室监控与支持时段 --------------------------------------------------
  openingHours: [
    { label: "工作日 (工单技术支持)", days: [0, 1, 2, 3, 4], opens: "09:00", closes: "24:00" },
    { label: "周末 (节点巡检与更新)", days: [5, 6], opens: "10:00", closes: "24:00" },
    { label: "晚高峰重点测速时段", days: [0, 1, 2, 3, 4, 5, 6], opens: "20:00", closes: "23:30" },
  ],

  // --- 全局导航栏体系 (支持门户型多级下拉) -----------------------------------
  navigation: [
    { label: "首页", href: "/" },
    {
      label: "机场推荐",
      href: "/recommend/",
      children: [
        { label: "42家机场全景天梯榜", href: "/recommend/", desc: "万字横向对比、速率丢包全景透视" },
        { label: "42家品牌检索库", href: "/brand/", desc: "按专线/低价/测速多维实时检索" },
        { label: "全站首推：光速云", href: "/brand/guangsu/", desc: "2020年老牌、IEPL双专线、8折码 AMM" },
      ],
    },
    {
      label: "免费资源",
      href: "/free-nodes/",
      children: [
        { label: "免费节点与公益订阅现状", href: "/free-nodes/", desc: "全网公共节点抓取、安全与蜜罐防范" },
        { label: "免费试用与1元测速清单", href: "/free-trial/", desc: "支持0元试用与低门槛体验的靠谱机场" },
      ],
    },
    {
      label: "避坑风控",
      href: "/risk-warning/",
      children: [
        { label: "跑路预警与资金盘黑名单", href: "/risk-warning/", desc: "五大失联前兆、失联平台复盘档案" },
        { label: "选型避坑全景指南", href: "/guide/", desc: "1.2万字网络工程底层与防套牢铁律" },
      ],
    },
    {
      label: "疑难FAQ",
      href: "/faq/",
      children: [
        { label: "科学加速百问全景百科", href: "/faq/", desc: "全链路报错排障与底层网络机制问答" },
        { label: "全平台客户端下载中心", href: "/clients/", desc: "Win/Mac/iOS/Android/软路由软件教程" },
      ],
    },
    { label: "客户端", href: "/clients/" },
  ],

  // --- 首页首屏 Hero ---------------------------------------------------------
  hero: {
    layout: "immersive" as "immersive" | "split",
    title: "专线级网络加速实测，认准 机场baby",
    titleHighlight: "机场baby",
    subtitle:
      "拒绝虚标与盲目跟风。我们对收录的 42 家机场品牌进行全方位协议、延迟、晚高峰吞吐与流媒体/ChatGPT 解锁验证，助您挑出真正靠谱的高速专线。",
    image: "/images/hero.webp",
    imageAlt: "机场baby 高速网络测速实验室监控看板",
    primaryCta: { label: "查看全站主推：光速云", href: "/brand/guangsu/" },
    secondaryCta: { label: "浏览 42 家品牌库", href: "/brand/" },
    highlights: ["42家品牌真实建档", "17份实验室晚高峰测速图", "全平台客户端免折腾教程"],
  },

  // --- 核心评测维度 ----------------------------------------------------------
  services: {
    eyebrow: "评测体系与实测标准",
    title: "四大核心可观测性评测维度",
    intro: "基于自研自动化监控与实机抓包，拒绝无根据的主观推荐，只以数据说话。",
    items: [
      {
        title: "IEPL / IPLC 专线抗抖动",
        description:
          "全程内网专线不过公网 GFW，针对晚高峰 20:00-23:00 黄金拥堵时段进行持续丢包率与抖动压力测试。",
        icon: "bread",
      },
      {
        title: "流媒体与 AI 生产力解锁",
        description:
          "针对 Netflix 原创与非原创剧集、Disney+、YouTube 4K，以及 ChatGPT、Claude、Gemini 的 IP 纯净度检测。",
        icon: "croissant",
      },
      {
        title: "全平台客户端与自研系统",
        description:
          "全面兼容 Clash Verge Rev、v2rayN、Shadowrocket 小火箭、sing-box，并对自研客户端的新手零门槛体验进行实机评定。",
        icon: "cake",
      },
      {
        title: "多梯度性价比与防跑路风控",
        description:
          "核验运营年限、退款政策与工单响应速度，优先推荐月付/季付灵活、价格透明合规的良心品牌。",
        icon: "sandwich",
      },
    ],
  },

  // --- 关于本站 --------------------------------------------------------------
  about: {
    eyebrow: "关于 机场baby",
    title: "致力于打造高可信度的网络评测知识库",
    paragraphs: [
      "「机场baby」由长期从事跨境网络工程、云计算与分布式架构测试的工程师团队独立运营。面对市场上鱼龙混杂的机场广告与泛滥的代理商信息，我们坚持以真实网络数据为底座，为广大科研学者、跨境电商从业者、外贸业务员及多媒体创作者提供客观公正的选择参考。",
      "全站评测内容涵盖 42 家主流与新锐品牌，建立结构化参数矩阵与持续更新的实测图谱，所有推广链接均标注 rel='nofollow sponsored' 商业披露，确保内容中立可检索。",
    ],
    image: "/images/about.webp",
    imageAlt: "机场baby 网络架构工程师分析抓包数据",
  },

  // --- 常见问答 FAQ (GEO & SEO 优化) -----------------------------------------
  faq: {
    eyebrow: "新手避坑与核心问答",
    title: "关于机场选购与使用的核心问题",
    items: [
      {
        question: "什么是 IEPL / IPLC 专线？相比普通中转有何区别？",
        answer:
          "IPLC（国际私有租用线路）和 IEPL（国际以太网专线）均属于不经过公网 GFW 防火墙的点对点物理专线传输。相比普通公网直连或普通 BGP 隧道中转，专线最大的优势在于敏感时期极低被封概率、物理级低抖动，以及晚高峰带宽稳定不卡顿。"
      },
      {
        question: "为什么我买的节点无法使用 ChatGPT 或 Claude？",
        answer:
          "OpenAI 和 Anthropic 对机房 IP、代理出口进行了极其严苛的欺诈风控（Fraud Score）。很多廉价机场多人共用出口导致 IP 被封禁或强制弹出验证码。建议选择「机场baby」评测中明确标有「ChatGPT 专线原生解锁」的节点，或使用住宅原生 IP 节点访问。"
      },
      {
        question: "新手应该选月付还是年付？如何防范跑路风险？",
        answer:
          "强烈建议所有新手在初次使用新品牌时优先选择「月付」或「季付」！即使年付折扣低至 5-7 折，也应在实测 1-2 个月晚高峰确实稳定、工单响应迅速后再考虑长周期续费，避免因商家线路更迭或运营风险造成资金损失。"
      },
      {
        question: "手机和电脑上推荐使用哪款客户端导入订阅？",
        answer:
          "Windows 和 Mac 电脑首选「Clash Verge Rev」（基于开源 Mihomo 内核，支持 TUN 模式）；iPhone/iPad 推荐在海外 App Store 获取「Shadowrocket（小火箭）」或「Stash」；Android 安卓手机首选「v2rayNG」或「FlClash」。各客户端安装包与详细图文教程可点击导航栏「客户端下载」免费获取。"
      },
      {
        question: "光速云为什么被列为全站首推？适合哪些场景？",
        answer:
          "光速云自 2020 年稳定运营至今，配备企业级 IEPL 专线与 VLESS 协议，拥有独特的 147 永久不过期套餐与 99 元/年轻量入门包，既有极高性价比，又配备自研小白专属客户端与全平台通用订阅，对晚高峰 4K 播放、跨境电商直播与外贸办公的适配度极高。"
      }
    ],
  },

  // --- CTA 横幅 --------------------------------------------------------------
  ctaBanner: {
    title: "找不到最适合您业务场景的稳定线路？",
    text: "查阅 42 家机场品牌库完整参数表，按专线、协议、月付单价与设备限制一键筛选。",
    button: { label: "立即前往品牌库筛选", href: "/brand/" },
  },

  // --- 联系我们 --------------------------------------------------------------
  contact: {
    eyebrow: "商务合作与线路收录",
    title: "与 机场baby 取得联系",
    intro:
      "如需提交新品牌实测数据、纠错参数或咨询收录流程，请发送邮件至官方联络邮箱，我们将在 1 个工作日内回复。",
    endpoint: "",
    honeypotField: "website",
  },

  // --- 法律合规与透明声明 ----------------------------------------------------
  legal: {
    companyType: "Network Observatory Lab & Research Media",
    registrationNumber: "HK-CYBER-2026-8802",
    publisher: "机场baby 评测运维团队",
    host: {
      name: "Global Anycast Edge Network",
      address: "101 Townsend St, San Francisco, CA 94107",
      url: "https://jichangtuijian.baby",
    },
  },

  // --- 界面文本国际化 / 本地化 ----------------------------------------------
  ui: {
    skipToContent: "跳转到正文",
    menuOpenLabel: "展开菜单",
    closedLabel: "暂停营业",
    hoursTitle: "测速监控时段",
    findUsTitle: "评测实验室声明",
    infoEyebrow: "合规与数据说明",
    infoTitle: "测速与推广披露",
    directionsLabel: "查看实验室位置",
    googleProfileLabel: "查看官方评测主页",
    readAllReviews: "浏览全部 42 家品牌评测 →",
    ratingLabel: "综合评级：",
    ratingOutOf: "满分 5.0",
    reviewsScoreLabel: "基于实验室节点测速数据汇总",
    formNameLabel: "您的称呼",
    formEmailLabel: "联系邮箱",
    formMessageLabel: "留言内容或评测需求",
    formSubmitLabel: "发送留言",
    formHoneypotLabel: "请保留此项为空",
    legalNoticeLabel: "免责声明与服务条款",
    privacyPolicyLabel: "隐私保护政策",
    allRightsReserved: "保留所有权利",
    notFoundTitle: "页面未找到",
    notFoundText: "您访问的评测报告或专题页面不存在，可能已重命名或迁移。",
    notFoundCta: "返回 机场baby 首页",
  },
} as const;

export type SiteConfig = typeof SITE;
