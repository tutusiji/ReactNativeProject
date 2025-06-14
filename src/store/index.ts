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
          title: 'React Native在企业级应用中的最佳实践',
          content: 'React Native作为跨平台开发框架，在企业级应用开发中展现出了强大的优势。本文将分享一些在实际项目中总结的最佳实践经验...',
          imageUrl: 'https://picsum.photos/300/200?random=1',
          publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          author: '前端架构师',
          category: '技术分享'
        },
        {
          id: '2',
          title: '移动端UI设计趋势：从扁平化到新拟物化',
          content: '移动端UI设计正在经历新的变革，从早期的扁平化设计到现在流行的新拟物化设计，每一次变化都反映了用户体验的不断进步...',
          imageUrl: 'https://picsum.photos/300/200?random=2',
          publishDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          author: 'UI设计师',
          category: '设计趋势'
        },
        {
          id: '3',
          title: '蓝牙5.0在IoT设备连接中的技术优势',
          content: '蓝牙5.0技术相比前代产品在传输距离、速度和功耗方面都有显著提升，为物联网设备的大规模部署提供了更好的解决方案...',
          imageUrl: 'https://picsum.photos/300/200?random=3',
          publishDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          author: '硬件工程师',
          category: '硬件技术'
        },
        {
          id: '4',
          title: '前端性能优化：从理论到实践',
          content: '前端性能优化是一个系统性工程，涉及代码优化、资源加载、缓存策略等多个方面。本文将从实际项目出发，分享性能优化的具体方法...',
          imageUrl: 'https://picsum.photos/300/200?random=4',
          publishDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          author: '前端专家',
          category: '性能优化'
        },
        {
          id: '5',
          title: 'TypeScript在大型项目中的应用经验',
          content: 'TypeScript为JavaScript带来了静态类型检查，在大型项目开发中能够显著提高代码质量和开发效率。本文分享一些实用的应用技巧...',
          imageUrl: 'https://picsum.photos/300/200?random=5',
          publishDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          author: '全栈开发',
          category: '开发工具'
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
          name: '智能手环 Pro',
          address: '00:11:22:33:44:55',
          isConnected: false,
          rssi: -45
        },
        {
          id: 'device2',
          name: '无线耳机',
          address: '00:11:22:33:44:66',
          isConnected: false,
          rssi: -60
        },
        {
          id: 'device3',
          name: '智能音箱',
          address: '00:11:22:33:44:77',
          isConnected: false,
          rssi: -35
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
        battery: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 15) + 20,
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
          ssid: 'Office_WiFi_5G',
          bssid: '00:11:22:33:44:77',
          level: -30,
          frequency: 5180,
          capabilities: '[WPA2-PSK-CCMP][ESS]'
        },
        {
          ssid: 'Guest_Network',
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

// AR/VR状态管理（简化版，作为扩展功能）
interface ARVRState {
  isARActive: boolean;
  isVRActive: boolean;
  webGLSupported: boolean;
  cameraPermission: boolean;
  
  checkSupport: () => Promise<void>;
  toggleAR: () => void;
  toggleVR: () => void;
}

export const useARVRStore = create<ARVRState>((set, get) => ({
  isARActive: false,
  isVRActive: false,
  webGLSupported: true,
  cameraPermission: false,
  
  checkSupport: async () => {
    try {
      // 检查设备支持情况
      set({
        webGLSupported: true,
        cameraPermission: false // 需要实际权限检查
      });
    } catch (error) {
      console.error('检查设备支持失败:', error);
    }
  },
  
  toggleAR: () => {
    set(state => ({ isARActive: !state.isARActive }));
  },
  
  toggleVR: () => {
    set(state => ({ isVRActive: !state.isVRActive }));
  }
}));
