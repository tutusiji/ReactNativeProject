import { create } from 'zustand';
import { NewsItem, BluetoothDevice, WiFiNetwork, HardwareStatus, ARScene } from '../types';

// 新闻状态管理
interface NewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
  refreshNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  news: [],
  loading: false,
  error: null,
  
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      // 模拟API调用
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'AR技术在智能制造中的应用',
          content: '增强现实技术正在革命性地改变智能制造行业...',
          imageUrl: 'https://example.com/ar-manufacturing.jpg',
          publishDate: new Date().toISOString(),
          author: '技术编辑',
          category: 'AR技术'
        },
        {
          id: '2',
          title: '蓝牙5.0在IoT设备中的优势',
          content: '最新的蓝牙5.0技术为物联网设备带来了更好的连接性...',
          imageUrl: 'https://example.com/bluetooth-iot.jpg',
          publishDate: new Date().toISOString(),
          author: '硬件专家',
          category: '硬件技术'
        },
        {
          id: '3',
          title: 'WebGL在移动端的性能优化',
          content: 'React Native中使用WebGL进行3D渲染的最佳实践...',
          imageUrl: 'https://example.com/webgl-mobile.jpg',
          publishDate: new Date().toISOString(),
          author: '前端开发',
          category: '开发技术'
        }
      ];
      
      set({ news: mockNews, loading: false });
    } catch (error) {
      set({ error: '获取新闻失败', loading: false });
    }
  },
  
  refreshNews: async () => {
    await get().fetchNews();
  }
}));

// 硬件设备状态管理
interface HardwareState {
  bluetoothDevices: BluetoothDevice[];
  wifiNetworks: WiFiNetwork[];
  connectedDevices: BluetoothDevice[];
  hardwareStatus: Record<string, HardwareStatus>;
  isScanning: boolean;
  
  scanBluetoothDevices: () => Promise<void>;
  connectToDevice: (device: BluetoothDevice) => Promise<void>;
  disconnectDevice: (deviceId: string) => Promise<void>;
  sendCommand: (deviceId: string, command: string, params: any) => Promise<void>;
  scanWiFiNetworks: () => Promise<void>;
}

export const useHardwareStore = create<HardwareState>((set, get) => ({
  bluetoothDevices: [],
  wifiNetworks: [],
  connectedDevices: [],
  hardwareStatus: {},
  isScanning: false,
  
  scanBluetoothDevices: async () => {
    set({ isScanning: true });
    try {
      // 模拟蓝牙扫描
      const mockDevices: BluetoothDevice[] = [
        {
          id: 'device1',
          name: 'AR智能眼镜',
          address: '00:11:22:33:44:55',
          isConnected: false,
          rssi: -45
        },
        {
          id: 'device2',
          name: '智能传感器',
          address: '00:11:22:33:44:66',
          isConnected: false,
          rssi: -60
        }
      ];
      
      set({ bluetoothDevices: mockDevices, isScanning: false });
    } catch (error) {
      set({ isScanning: false });
    }
  },
  
  connectToDevice: async (device: BluetoothDevice) => {
    try {
      // 模拟连接过程
      const updatedDevice = { ...device, isConnected: true };
      const connectedDevices = [...get().connectedDevices, updatedDevice];
      
      set({ connectedDevices });
      
      // 更新设备状态
      const status: HardwareStatus = {
        deviceId: device.id,
        isOnline: true,
        battery: 85,
        temperature: 25,
        lastUpdate: Date.now()
      };
      
      set(state => ({
        hardwareStatus: {
          ...state.hardwareStatus,
          [device.id]: status
        }
      }));
    } catch (error) {
      console.error('连接设备失败:', error);
    }
  },
  
  disconnectDevice: async (deviceId: string) => {
    const connectedDevices = get().connectedDevices.filter(d => d.id !== deviceId);
    set({ connectedDevices });
    
    set(state => ({
      hardwareStatus: {
        ...state.hardwareStatus,
        [deviceId]: {
          ...state.hardwareStatus[deviceId],
          isOnline: false
        }
      }
    }));
  },
  
  sendCommand: async (deviceId: string, command: string, params: any) => {
    try {
      // 模拟发送命令
      console.log(`发送命令到设备 ${deviceId}: ${command}`, params);
      
      // 更新设备状态
      set(state => ({
        hardwareStatus: {
          ...state.hardwareStatus,
          [deviceId]: {
            ...state.hardwareStatus[deviceId],
            lastUpdate: Date.now()
          }
        }
      }));
    } catch (error) {
      console.error('发送命令失败:', error);
    }
  },
  
  scanWiFiNetworks: async () => {
    try {
      // 模拟WiFi扫描
      const mockNetworks: WiFiNetwork[] = [
        {
          ssid: 'SmartFactory_5G',
          bssid: '00:11:22:33:44:77',
          level: -30,
          frequency: 5180,
          capabilities: '[WPA2-PSK-CCMP][ESS]'
        },
        {
          ssid: 'IoT_Network',
          bssid: '00:11:22:33:44:88',
          level: -50,
          frequency: 2437,
          capabilities: '[WPA2-PSK-CCMP][ESS]'
        }
      ];
      
      set({ wifiNetworks: mockNetworks });
    } catch (error) {
      console.error('WiFi扫描失败:', error);
    }
  }
}));

// AR场景状态管理
interface ARState {
  scenes: ARScene[];
  currentScene: ARScene | null;
  isARActive: boolean;
  
  loadScenes: () => Promise<void>;
  setCurrentScene: (scene: ARScene) => void;
  startAR: () => Promise<void>;
  stopAR: () => void;
}

export const useARStore = create<ARState>((set, get) => ({
  scenes: [],
  currentScene: null,
  isARActive: false,
  
  loadScenes: async () => {
    try {
      // 模拟加载AR场景
      const mockScenes: ARScene[] = [
        {
          id: 'scene1',
          name: '设备调试场景',
          objects: [
            {
              id: 'obj1',
              type: 'cube',
              position: { x: 0, y: 0, z: -2 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 },
              material: {
                color: '#ff0000',
                opacity: 0.8,
                metalness: 0.5,
                roughness: 0.2
              }
            }
          ],
          lighting: {
            ambient: {
              color: '#ffffff',
              intensity: 0.4
            },
            directional: {
              color: '#ffffff',
              intensity: 0.8,
              position: { x: 1, y: 1, z: 1 }
            }
          }
        }
      ];
      
      set({ scenes: mockScenes });
    } catch (error) {
      console.error('加载AR场景失败:', error);
    }
  },
  
  setCurrentScene: (scene: ARScene) => {
    set({ currentScene: scene });
  },
  
  startAR: async () => {
    try {
      set({ isARActive: true });
    } catch (error) {
      console.error('启动AR失败:', error);
    }
  },
  
  stopAR: () => {
    set({ isARActive: false });
  }
}));
