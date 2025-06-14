import { BluetoothDevice, HardwareCommand } from '../types';

/**
 * 蓝牙服务类
 * 处理蓝牙设备的扫描、连接和通信
 */
class BluetoothService {
  private connectedDevices: Map<string, BluetoothDevice> = new Map();
  private isScanning: boolean = false;

  /**
   * 扫描蓝牙设备
   */
  async scanDevices(): Promise<BluetoothDevice[]> {
    if (this.isScanning) {
      throw new Error('已在扫描中');
    }

    this.isScanning = true;
    
    try {
      // 模拟扫描过程
      await this.delay(2000);
      
      const mockDevices: BluetoothDevice[] = [
        {
          id: 'ar_glasses_001',
          name: 'AR智能眼镜 Pro',
          address: '00:11:22:33:44:55',
          isConnected: false,
          rssi: -45
        },
        {
          id: 'sensor_hub_001',
          name: '智能传感器集线器',
          address: '00:11:22:33:44:66',
          isConnected: false,
          rssi: -60
        },
        {
          id: 'controller_001',
          name: 'AR控制器',
          address: '00:11:22:33:44:77',
          isConnected: false,
          rssi: -35
        },
        {
          id: 'beacon_001',
          name: '定位信标',
          address: '00:11:22:33:44:88',
          isConnected: false,
          rssi: -70
        }
      ];

      return mockDevices;
    } finally {
      this.isScanning = false;
    }
  }

  /**
   * 连接到指定设备
   */
  async connectToDevice(device: BluetoothDevice): Promise<void> {
    if (this.connectedDevices.has(device.id)) {
      throw new Error('设备已连接');
    }

    try {
      // 模拟连接过程
      await this.delay(1500);
      
      // 模拟连接失败的情况
      if (Math.random() < 0.1) {
        throw new Error('连接失败：设备不可达');
      }

      const connectedDevice: BluetoothDevice = {
        ...device,
        isConnected: true
      };

      this.connectedDevices.set(device.id, connectedDevice);
      
      // 启动心跳检测
      this.startHeartbeat(device.id);
      
      console.log(`已连接到设备: ${device.name}`);
    } catch (error) {
      console.error(`连接设备失败: ${device.name}`, error);
      throw error;
    }
  }

  /**
   * 断开设备连接
   */
  async disconnectDevice(deviceId: string): Promise<void> {
    const device = this.connectedDevices.get(deviceId);
    if (!device) {
      throw new Error('设备未连接');
    }

    try {
      // 模拟断开过程
      await this.delay(500);
      
      this.connectedDevices.delete(deviceId);
      console.log(`已断开设备: ${device.name}`);
    } catch (error) {
      console.error(`断开设备失败: ${device.name}`, error);
      throw error;
    }
  }

  /**
   * 发送命令到设备
   */
  async sendCommand(deviceId: string, command: HardwareCommand): Promise<any> {
    const device = this.connectedDevices.get(deviceId);
    if (!device) {
      throw new Error('设备未连接');
    }

    try {
      // 模拟命令发送
      await this.delay(200);
      
      console.log(`发送命令到 ${device.name}:`, command);
      
      // 模拟不同类型的响应
      switch (command.command) {
        case 'get_status':
          return {
            battery: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 40) + 20,
            isOnline: true,
            timestamp: Date.now()
          };
        
        case 'set_led':
          return {
            success: true,
            message: 'LED状态已更新'
          };
        
        case 'calibrate':
          return {
            success: true,
            calibrationData: {
              x: Math.random(),
              y: Math.random(),
              z: Math.random()
            }
          };
        
        default:
          return {
            success: true,
            message: '命令执行成功'
          };
      }
    } catch (error) {
      console.error(`发送命令失败:`, error);
      throw error;
    }
  }

  /**
   * 获取已连接的设备列表
   */
  getConnectedDevices(): BluetoothDevice[] {
    return Array.from(this.connectedDevices.values());
  }

  /**
   * 检查设备是否已连接
   */
  isDeviceConnected(deviceId: string): boolean {
    return this.connectedDevices.has(deviceId);
  }

  /**
   * 获取扫描状态
   */
  getScanningStatus(): boolean {
    return this.isScanning;
  }

  /**
   * 启动设备心跳检测
   */
  private startHeartbeat(deviceId: string): void {
    const heartbeatInterval = setInterval(async () => {
      try {
        const device = this.connectedDevices.get(deviceId);
        if (!device) {
          clearInterval(heartbeatInterval);
          return;
        }

        // 发送心跳命令
        await this.sendCommand(deviceId, {
          deviceId,
          command: 'heartbeat',
          parameters: {},
          timestamp: Date.now()
        });
      } catch (error) {
        console.error(`设备心跳失败: ${deviceId}`, error);
        // 心跳失败，断开设备
        this.connectedDevices.delete(deviceId);
        clearInterval(heartbeatInterval);
      }
    }, 30000); // 30秒心跳间隔
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
    this.connectedDevices.clear();
    this.isScanning = false;
  }
}

// 导出单例实例
export const bluetoothService = new BluetoothService();
export default BluetoothService;
