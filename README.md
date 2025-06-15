# React Native AR Demo

## 目录结构

```
├── App.tsx                  # 应用入口，挂载主导航/平台适配
├── index.ts                 # Expo/RN 启动入口
├── package.json             # 项目依赖与脚本
├── tsconfig.json            # TypeScript 配置
├── app.json                 # Expo 配置
├── metro.config.js          # Metro 打包配置
├── babel.config.js          # Babel 配置
├── assets/                  # 静态资源（图标、图片等）
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src/
│   ├── components/          # 通用 UI 组件 & WebGL 场景
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── RotatingCube.tsx # Three.js 场景（自动旋转立方体+地形+树+交互）
│   │   └── RotatingCube2.tsx
│   ├── data/                # 静态数据
│   │   └── newsData.json
│   ├── navigation/          # 导航相关
│   │   ├── AppNavigator.tsx
│   │   └── BottomTabNavigator.tsx
│   ├── screens/             # 页面组件
│   │   ├── ARScreen.tsx     # 集成 WebGL/Three.js 场景
│   │   ├── ARVRScreen.tsx
│   │   ├── HardwareScreen.tsx
│   │   ├── NewsDetailScreen.tsx
│   │   ├── NewsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/            # 业务服务（如蓝牙、网络）
│   │   ├── BluetoothService.ts
│   │   └── NetworkService.ts
│   ├── store/               # 状态管理
│   │   └── index.ts
│   ├── types/               # 类型定义
│   │   └── index.ts
│   └── utils/               # 工具函数
├── android/                 # Android 原生工程（可选）
├── ios/                     # iOS 原生工程（可选）
```

## 主要功能

- 新闻资讯浏览与详情
- AR/VR 体验入口（集成 Three.js WebGL 场景，支持自动旋转与手势交互）
- 硬件设备（如蓝牙）管理与控制
- 个人中心
- 支持底部 TabBar 快速切换主要模块

## 系统架构设计方案

- **导航**：采用 React Navigation，Stack + BottomTab 组合，主导航在 `AppNavigator.tsx`，底部导航在 `BottomTabNavigator.tsx`
- **状态管理**：使用 Zustand 进行全局状态管理
- **类型安全**：TypeScript 全面类型定义，类型集中在 `src/types`
- **服务层**：如蓝牙、网络等功能抽象为 service 层，便于扩展和测试
- **组件化**：通用 UI 组件放在 `components`，页面级组件在 `screens`
- **WebGL 场景**：`src/components/RotatingCube.tsx` 基于 Three.js 实现，支持自动旋转、手势交互、地形与树切换，集成于 `ARScreen.tsx`
- **数据**：静态数据与 mock 数据集中在 `data` 目录
- **平台适配**：`App.tsx` 针对 Web/原生平台自动适配，避免 gesture-handler 报错

## 启动方式

```bash
pnpm install
npm run android # 或 npm run ios / npm run web
```

## 依赖

- React Native 0.73+
- Expo 50+
- React Navigation 6+
- Zustand
- TypeScript
- three

## 备注

- AR/VR 相关功能需设备支持，WebGL 场景可在 Web 端直接体验
- 如需扩展新模块，建议先在 `types` 中定义类型，再在 `screens`、`services` 等目录实现
