import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { NewsItem, WiFiNetwork } from '../types';

/**
 * 网络服务类
 * 处理HTTP请求和WebSocket连接
 */
class NetworkService {
  private httpClient: AxiosInstance;
  private wsConnection: WebSocket | null = null;
  private wsReconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.httpClient = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置请求拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.httpClient.interceptors.request.use(
      (config) => {
        console.log(`发送请求: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('请求错误:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.httpClient.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`收到响应: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('响应错误:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 获取新闻列表
   */
  async fetchNews(): Promise<NewsItem[]> {
    try {
      // 模拟API调用
      await this.delay(1000);
      
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'AR技术在智能制造中的最新突破',
          content: '最新的AR技术正在为智能制造带来革命性的变化。通过将虚拟信息叠加到真实世界中，工人可以更直观地理解复杂的装配过程，提高生产效率和质量。',
          imageUrl: 'https://picsum.photos/300/200?random=1',
          publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          author: '技术编辑部',
          category: 'AR技术'
        },
        {
          id: '2',
          title: '蓝牙5.0在IoT设备连接中的优势分析',
          content: '蓝牙5.0技术相比前代产品在传输距离、速度和功耗方面都有显著提升，为物联网设备的大规模部署提供了更好的解决方案。',
          imageUrl: 'https://picsum.photos/300/200?random=2',
          publishDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          author: '硬件专家',
          category: '硬件技术'
        },
        {
          id: '3',
          title: 'React Native中WebGL性能优化实践',
          content: '在React Native应用中使用WebGL进行3D渲染时，需要注意内存管理、渲染循环优化等关键问题，本文分享了一些实用的优化技巧。',
          imageUrl: 'https://picsum.photos/300/200?random=3',
          publishDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          author: '前端开发团队',
          category: '开发技术'
        },
        {
          id: '4',
          title: 'VR/AR设备的未来发展趋势',
          content: '随着硬件技术的不断进步和成本的降低，VR/AR设备正在从专业领域走向消费市场，预计未来几年将迎来爆发式增长。',
          imageUrl: 'https://picsum.photos/300/200?random=4',
          publishDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          author: '行业分析师',
          category: 'VR/AR'
        },
        {
          id: '5',
          title: '智能硬件安全防护最佳实践',
          content: '随着智能硬件设备的普及，安全问题日益突出。本文介绍了从设备认证、数据加密到网络安全的全方位防护策略。',
          imageUrl: 'https://picsum.photos/300/200?random=5',
          publishDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          author: '安全专家',
          category: '安全技术'
        }
      ];

      return mockNews;
    } catch (error) {
      console.error('获取新闻失败:', error);
      throw new Error('网络请求失败，请检查网络连接');
    }
  }

  /**
   * 扫描WiFi网络
   */
  async scanWiFiNetworks(): Promise<WiFiNetwork[]> {
    try {
      // 模拟WiFi扫描
      await this.delay(2000);
      
      const mockNetworks: WiFiNetwork[] = [
        {
          ssid: 'SmartFactory_5G',
          bssid: '00:11:22:33:44:77',
          level: -30,
          frequency: 5180,
          capabilities: '[WPA2-PSK-CCMP][ESS]'
        },
        {
          ssid: 'IoT_Network_2.4G',
          bssid: '00:11:22:33:44:88',
          level: -50,
          frequency: 2437,
          capabilities: '[WPA2-PSK-CCMP][ESS]'
        },
        {
          ssid: 'AR_Lab_WiFi',
          bssid: '00:11:22:33:44:99',
          level: -40,
          frequency: 5240,
          capabilities: '[WPA3-SAE-CCMP][ESS]'
        },
        {
          ssid: 'Guest_Network',
          bssid: '00:11:22:33:44:AA',
          level: -65,
          frequency: 2462,
          capabilities: '[ESS]'
        }
      ];

      return mockNetworks;
    } catch (error) {
      console.error('WiFi扫描失败:', error);
      throw new Error('WiFi扫描失败');
    }
  }

  /**
   * 建立WebSocket连接
   */
  connectWebSocket(url: string, onMessage?: (data: any) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.wsConnection = new WebSocket(url);

        this.wsConnection.onopen = () => {
          console.log('WebSocket连接已建立');
          this.wsReconnectAttempts = 0;
          resolve();
        };

        this.wsConnection.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('收到WebSocket消息:', data);
            if (onMessage) {
              onMessage(data);
            }
          } catch (error) {
            console.error('解析WebSocket消息失败:', error);
          }
        };

        this.wsConnection.onclose = () => {
          console.log('WebSocket连接已关闭');
          this.attemptReconnect(url, onMessage);
        };

        this.wsConnection.onerror = (error) => {
          console.error('WebSocket错误:', error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 发送WebSocket消息
   */
  sendWebSocketMessage(data: any): void {
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify(data));
    } else {
      console.error('WebSocket连接未建立');
    }
  }

  /**
   * 关闭WebSocket连接
   */
  closeWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  /**
   * 尝试重连WebSocket
   */
  private attemptReconnect(url: string, onMessage?: (data: any) => void): void {
    if (this.wsReconnectAttempts < this.maxReconnectAttempts) {
      this.wsReconnectAttempts++;
      console.log(`尝试重连WebSocket (${this.wsReconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connectWebSocket(url, onMessage).catch(error => {
          console.error('WebSocket重连失败:', error);
        });
      }, 5000 * this.wsReconnectAttempts);
    } else {
      console.error('WebSocket重连次数已达上限');
    }
  }

  /**
   * 发送设备控制命令
   */
  async sendDeviceCommand(deviceId: string, command: string, parameters: any): Promise<any> {
    try {
      const response = await this.httpClient.post('/api/device/command', {
        deviceId,
        command,
        parameters,
        timestamp: Date.now()
      });

      return response.data;
    } catch (error) {
      console.error('发送设备命令失败:', error);
      throw error;
    }
  }

  /**
   * 获取设备状态
   */
  async getDeviceStatus(deviceId: string): Promise<any> {
    try {
      const response = await this.httpClient.get(`/api/device/${deviceId}/status`);
      return response.data;
    } catch (error) {
      console.error('获取设备状态失败:', error);
      throw error;
    }
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    this.closeWebSocket();
  }
}

// 导出单例实例
export const networkService = new NetworkService();
export default NetworkService;
