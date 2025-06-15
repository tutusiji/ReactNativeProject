// 新闻相关类型
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishDate: string;
  author: string;
  category: string;
  tags?: string[];
}

// 硬件设备相关类型
export interface BluetoothDevice {
  id: string;
  name: string;
  address: string;
  isConnected: boolean;
  rssi?: number;
}

export interface WiFiNetwork {
  ssid: string;
  bssid: string;
  level: number;
  frequency: number;
  capabilities: string;
}

// AR/VR 相关类型
export interface ARScene {
  id: string;
  name: string;
  objects: ARObject[];
  lighting: LightingConfig;
}

export interface ARObject {
  id: string;
  type: "cube" | "sphere" | "plane" | "model";
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  material: MaterialConfig;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface MaterialConfig {
  color: string;
  texture?: string;
  opacity: number;
  metalness?: number;
  roughness?: number;
}

export interface LightingConfig {
  ambient: {
    color: string;
    intensity: number;
  };
  directional: {
    color: string;
    intensity: number;
    position: Vector3;
  };
}

// 硬件控制相关类型
export interface HardwareCommand {
  deviceId: string;
  command: string;
  parameters: Record<string, any>;
  timestamp: number;
}

export interface HardwareStatus {
  deviceId: string;
  isOnline: boolean;
  battery?: number;
  temperature?: number;
  lastUpdate: number;
}

// 导航相关类型
export type RootStackParamList = {
  Main: undefined;
  NewsDetail: { newsItem: NewsItem };
  ARScreen: undefined;
  ARScene: { sceneId: string };
  DeviceControl: { deviceId: string };
  Settings: undefined;
};

export type BottomTabParamList = {
  News: undefined;
  ARVR: undefined; // 更新为ARVR
  Hardware: undefined;
  Profile: undefined;
};
