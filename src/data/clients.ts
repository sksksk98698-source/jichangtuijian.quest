// ============================================================================
// 第三方代理客户端知识库与下载指引 (全平台)
// ============================================================================

export interface ClientApp {
  name: string;
  category: "Windows" | "macOS" | "iOS" | "Android" | "Linux" | "OpenWrt";
  core: string;
  features: string;
  isRecommended?: boolean;
  platformBadges: string[];
  license: "开源免费" | "付费应用" | "免费带内购";
  githubOrDocUrl: string;
  guideSteps: string[];
}

export const CLIENT_PLATFORMS = [
  { id: "all", name: "全部平台" },
  { id: "windows", name: "Windows 电脑" },
  { id: "android", name: "Android 安卓" },
  { id: "ios", name: "iPhone / iPad" },
  { id: "macos", name: "macOS 苹果电脑" },
  { id: "linux", name: "Linux 系统" },
  { id: "openwrt", name: "OpenWrt / 软路由" },
] as const;

export const CLIENT_APPS: ClientApp[] = [
  // Windows
  {
    name: "Clash Verge Rev",
    category: "Windows",
    core: "Mihomo (Meta) 内核",
    features: "现代化界面、规则分流、TUN 模式网卡接管、多订阅智能管理，Windows 端首选推荐。",
    isRecommended: true,
    platformBadges: ["Win10/11", "64位", "TUN模式", "首选推荐"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/clash-verge-rev/clash-verge-rev",
    guideSteps: [
      "下载并运行 Clash Verge Rev 安装包，首次启动建议勾选「系统代理」；",
      "在机场后台复制 Clash 订阅链接，粘贴至客户端「订阅/配置」页并点击导入；",
      "在「代理」页选择延迟较低的专线节点（如香港、日本）；",
      "如需游戏或终端全局加速，可在设置中开启「TUN 模式」。"
    ]
  },
  {
    name: "v2rayN",
    category: "Windows",
    core: "Xray / sing-box / Mihomo 多内核",
    features: "老牌经典客户端，底层支持 VLESS、Trojan、Shadowsocks 等全部主流协议，适合高阶配置调试。",
    isRecommended: true,
    platformBadges: ["多协议支持", "Xray核心", "极低资源占用"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/2dust/v2rayN",
    guideSteps: [
      "解压 release 包，以管理员权限运行 v2rayN.exe；",
      "点击顶部菜单「订阅分组」->「订阅分组设置」，新建并填入机场提供的 V2Ray/Xray 订阅地址；",
      "按 Ctrl+U 更新全部节点，右键选中目标节点设为活动服务器，任务栏右下角设为「自动配置系统代理」。"
    ]
  },
  {
    name: "FlClash",
    category: "Windows",
    core: "Mihomo 内核",
    features: "基于 Flutter 构建的极简跨平台代理客户端，UI 优雅流畅，规则分流与测速响应敏捷。",
    platformBadges: ["轻量极简", "跨平台", "极简UI"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/chen08209/FlClash",
    guideSteps: [
      "安装并打开 FlClash，点击导航栏 Profiles 添加机场订阅 URL；",
      "刷新节点列表，选择对应代理模式（Rule 规则分流或 Global 全局）；",
      "点击首页连接开关即可畅享网络加速。"
    ]
  },
  {
    name: "Hiddify",
    category: "Windows",
    core: "sing-box 内核",
    features: "支持全协议与智能路由判定，开箱即用，界面现代且具备全自动测速优选功能。",
    platformBadges: ["sing-box内核", "全协议", "自动优选"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/hiddify/hiddify-next",
    guideSteps: [
      "安装客户端，点击「新建配置」或直接从剪贴板导入机场订阅链接；",
      "自动测试各节点延迟，选择绿色低延迟节点开启连接。"
    ]
  },

  // Android
  {
    name: "v2rayNG",
    category: "Android",
    core: "Xray 核心",
    features: "安卓端普及度极高、性能稳健的通用代理工具，分应用代理与订阅更新功能完善。",
    isRecommended: true,
    platformBadges: ["安卓首选", "分应用代理", "后台稳定保活"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/2dust/v2rayNG",
    guideSteps: [
      "安装 APK，点击左侧菜单「订阅分组设置」-> 点击右上角「+」粘贴机场订阅；",
      "返回主界面点击右上角三点菜单「更新订阅」；",
      "点击右下角「V」图标启动连接，在侧边栏开启「分应用代理」排除国内常用软件。"
    ]
  },
  {
    name: "FlClash for Android",
    category: "Android",
    core: "Mihomo 内核",
    features: "Flutter 界面优雅精致，与电脑端交互统一，分流规则清晰。",
    isRecommended: true,
    platformBadges: ["高颜值", "Mihomo内核", "规则分流"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/chen08209/FlClash",
    guideSteps: [
      "安装 APK 后在配置中心导入 Clash 订阅；",
      "允许 VPN 配置权限后点击中心主开关开始代理。"
    ]
  },
  {
    name: "Karing for Android",
    category: "Android",
    core: "sing-box 内核",
    features: "面向新手的零配置体验，多订阅聚合管理与分流策略切换简单。",
    platformBadges: ["小白友好", "多订阅聚合"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/KaringX/karing",
    guideSteps: [
      "添加订阅链接，支持自动定时拉取最新可用节点；",
      "一键测试真连接延迟并智能选择最低延迟链路。"
    ]
  },

  // iOS
  {
    name: "Shadowrocket（小火箭）",
    category: "iOS",
    core: "自研多协议规则引擎",
    features: "iOS 生态最受欢迎且功能全面的网络工具，支持扫描二维码与直链导入，分流规则极为强大。",
    isRecommended: true,
    platformBadges: ["iOS必备", "扫码导入", "规则分流", "按需连接"],
    license: "付费应用",
    githubOrDocUrl: "https://apps.apple.com/app/shadowrocket/id932747118",
    guideSteps: [
      "需登录美区或非国区 Apple ID 前往 App Store 下载（售价 2.99 美元）；",
      "打开小火箭，点击右上角「+」，类型选择「Subscribe」，粘贴机场订阅链接并保存；",
      "在「全局路由」推荐选择「配置」，点击顶部未连接开关，系统提示添加 VPN 权限后完成连接。"
    ]
  },
  {
    name: "Stash",
    category: "iOS",
    core: "Clash for iOS 原生替代",
    features: "将 Clash 完整的策略组与覆写逻辑带入 iOS，UI 优雅精巧，支持高级脚本与网络分析。",
    isRecommended: true,
    platformBadges: ["Clash生态", "策略组覆写", "On Demand"],
    license: "付费应用",
    githubOrDocUrl: "https://apps.apple.com/app/stash-rule-based-proxy/id1596063349",
    guideSteps: [
      "从海外 App Store 获取，在「配置」页直接导入 Clash 链接或本地上传；",
      "支持按 SSID Wi-Fi 与蜂窝网络自动切换代理策略。"
    ]
  },
  {
    name: "Quantumult X（圈X）",
    category: "iOS",
    core: "原生网络分流引擎",
    features: "极高自由度的规则控制、HTTP 请求重写、多策略组切换，适合网络玩家与深度定制用户。",
    platformBadges: ["硬核高自由度", "脚本重写", "极致省电"],
    license: "付费应用",
    githubOrDocUrl: "https://apps.apple.com/app/quantumult-x/id1453926364",
    guideSteps: [
      "海外 App Store 购买下载，在设置中添加节点资源链接；",
      "拉取节点后配置相应的策略分流图标即可启动。"
    ]
  },

  // macOS
  {
    name: "Clash Verge Rev for Mac",
    category: "macOS",
    core: "Mihomo 内核",
    features: "完美支持 Intel 与 Apple Silicon (M1/M2/M3/M4) 原生芯片架构，菜单栏常驻与快捷分流。",
    isRecommended: true,
    platformBadges: ["M系列芯片适配", "TUN全局模式", "原生体验"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/clash-verge-rev/clash-verge-rev",
    guideSteps: [
      "下载 DMG 安装包（M 系列芯片选 aarch64，Intel 芯片选 x64）；",
      "拖入应用程序后启动，在配置页添加机场订阅，开启「系统代理」；",
      "开发人员在终端使用时可开启「TUN 模式」实现全系统命令行流量接管。"
    ]
  },

  // Linux
  {
    name: "Clash Verge Rev for Linux",
    category: "Linux",
    core: "Mihomo 内核",
    features: "支持 AppImage、DEB 与 RPM 等打包格式，提供桌面图形化管理与全局透明转发能力。",
    isRecommended: true,
    platformBadges: ["AppImage/DEB", "图形化GUI", "系统服务运行"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/clash-verge-rev/clash-verge-rev",
    guideSteps: [
      "下载对应发行版的 AppImage 或 deb 安装包赋予执行权限；",
      "启动 GUI，输入机场订阅链接即可统一管理 Linux 桌面端代理。"
    ]
  },

  // OpenWrt
  {
    name: "OpenClash",
    category: "OpenWrt",
    core: "Mihomo / Clash Meta 核心",
    features: "全家智能设备、游戏主机（PS5/Switch/Xbox）与 Apple TV 免安装客户端全屋科学上网利器。",
    isRecommended: true,
    platformBadges: ["全屋无感翻墙", "游戏主机加速", "旁路由/主路由"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/vernesong/OpenClash",
    guideSteps: [
      "在 OpenWrt 路由器后台上传 OpenClash IPK 插件安装；",
      "在「配置订阅」页面填入机场订阅链接并下载配置文件；",
      "运行模式推荐选择 Fake-IP (TUN 混合) 模式，开启全局流媒体与分流防护。"
    ]
  },
  {
    name: "Nikki",
    category: "OpenWrt",
    core: "Mihomo 透明代理",
    features: "针对新版 OpenWrt 24.10+ 原生设计的现代化轻量透明代理界面，内存与 CPU 占用极低。",
    platformBadges: ["OpenWrt 24+", "轻量高效", "透明代理"],
    license: "开源免费",
    githubOrDocUrl: "https://github.com/nikkinet/nikki",
    guideSteps: [
      "确保路由器运行 OpenWrt 24.10 或更高版本并更新包管理器；",
      "导入机场订阅后即可由防火墙接管所有设备外网流量。"
    ]
  }
];
