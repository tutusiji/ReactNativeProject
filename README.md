# React Native AR Demo

## 目录结构

```
├── App.tsx                  # 应用入口，挂载主导航
├── index.ts                 # Expo/RN 启动入口
├── package.json             # 项目依赖与脚本
├── tsconfig.json            # TypeScript 配置
├── app.json                 # Expo 配置
├── assets/                  # 静态资源（图标、图片等）
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src/
│   ├── components/          # 通用 UI 组件
│   │   ├── EmptyState.tsx
│   │   └── LoadingSpinner.tsx
│   ├── data/                # 静态数据
│   │   └── newsData.json
│   ├── navigation/          # 导航相关
│   │   ├── AppNavigator.tsx
│   │   └── BottomTabNavigator.tsx
│   ├── screens/             # 页面组件
│   │   ├── ARScreen.tsx
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
```

## 主要功能

- 新闻资讯浏览与详情
- AR/VR 体验入口
- 硬件设备（如蓝牙）管理与控制
- 个人中心
- 支持底部 TabBar 快速切换主要模块

## 架构设计

- **导航**：采用 React Navigation，Stack + BottomTab 组合，主导航在 `AppNavigator.tsx`，底部导航在 `BottomTabNavigator.tsx`
- **状态管理**：使用 Zustand 进行全局状态管理
- **类型安全**：TypeScript 全面类型定义，类型集中在 `src/types`
- **服务层**：如蓝牙、网络等功能抽象为 service 层，便于扩展和测试
- **组件化**：通用 UI 组件放在 `components`，页面级组件在 `screens`
- **数据**：静态数据与 mock 数据集中在 `data` 目录

## 启动方式

```bash
pnpm install
npm run android # 或 npm run ios / npm run web
```

## 依赖

- React Native 0.79+
- Expo 53+
- React Navigation 7+
- Zustand
- TypeScript

## 备注

- AR/VR 相关功能需设备支持
- 如需扩展新模块，建议先在 `types` 中定义类型，再在 `screens`、`services` 等目录实现
