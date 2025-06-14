import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHardwareStore } from '../store';
import { BluetoothDevice } from '../types';

const HardwareScreen: React.FC = () => {
  const {
    bluetoothDevices,
    connectedDevices,
    hardwareStatus,
    isScanning,
    scanBluetoothDevices,
    connectToDevice,
    disconnectDevice,
    sendCommand,
  } = useHardwareStore();

  const [selectedTab, setSelectedTab] = useState<'bluetooth' | 'wifi'>('bluetooth');

  useEffect(() => {
    scanBluetoothDevices();
  }, []);

  const handleDevicePress = async (device: BluetoothDevice) => {
    if (device.isConnected) {
      Alert.alert(
        '设备操作',
        `设备: ${device.name}`,
        [
          { text: '断开连接', onPress: () => disconnectDevice(device.id) },
          { text: '发送测试命令', onPress: () => sendTestCommand(device.id) },
          { text: '取消', style: 'cancel' },
        ]
      );
    } else {
      try {
        await connectToDevice(device);
        Alert.alert('成功', `已连接到 ${device.name}`);
      } catch (error) {
        Alert.alert('错误', '连接失败');
      }
    }
  };

  const sendTestCommand = async (deviceId: string) => {
    try {
      await sendCommand(deviceId, 'test', { message: 'Hello from app!' });
      Alert.alert('成功', '命令已发送');
    } catch (error) {
      Alert.alert('错误', '命令发送失败');
    }
  };

  const renderBluetoothDevice = ({ item }: { item: BluetoothDevice }) => {
    const isConnected = connectedDevices.some(d => d.id === item.id);
    const status = hardwareStatus[item.id];

    return (
      <TouchableOpacity
        style={[styles.deviceItem, isConnected && styles.connectedDevice]}
        onPress={() => handleDevicePress({ ...item, isConnected })}
      >
        <View style={styles.deviceInfo}>
          <View style={styles.deviceHeader}>
            <Ionicons
              name={isConnected ? 'bluetooth' : 'bluetooth-outline'}
              size={24}
              color={isConnected ? '#4CAF50' : '#666'}
            />
            <Text style={styles.deviceName}>{item.name}</Text>
            {isConnected && (
              <View style={styles.connectedBadge}>
                <Text style={styles.connectedText}>已连接</Text>
              </View>
            )}
          </View>

          <Text style={styles.deviceAddress}>{item.address}</Text>

          {item.rssi && (
            <Text style={styles.deviceRssi}>信号强度: {item.rssi} dBm</Text>
          )}

          {status && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                电池: {status.battery}% | 温度: {status.temperature}°C
              </Text>
              <Text style={styles.statusText}>
                最后更新: {new Date(status.lastUpdate).toLocaleTimeString()}
              </Text>
            </View>
          )}
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#ccc"
        />
      </TouchableOpacity>
    );
  };

  const renderTabButton = (tab: 'bluetooth' | 'wifi', title: string, icon: string) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
      onPress={() => setSelectedTab(tab)}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={selectedTab === tab ? '#2196F3' : '#666'}
      />
      <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>设备管理</Text>
      <Text style={styles.headerSubtitle}>蓝牙设备连接与控制</Text>

      <View style={styles.tabContainer}>
        {renderTabButton('bluetooth', '蓝牙设备', 'bluetooth')}
        {renderTabButton('wifi', 'WiFi设备', 'wifi')}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanningButton]}
          onPress={scanBluetoothDevices}
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="refresh" size={20} color="#fff" />
          )}
          <Text style={styles.scanButtonText}>
            {isScanning ? '扫描中...' : '扫描设备'}
          </Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            已发现: {bluetoothDevices.length} | 已连接: {connectedDevices.length}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bluetooth-outline" size={64} color="#ccc" />
      <Text style={styles.emptyText}>未发现设备</Text>
      <Text style={styles.emptySubtext}>请确保设备已开启并处于可发现状态</Text>
      <TouchableOpacity style={styles.retryButton} onPress={scanBluetoothDevices}>
        <Text style={styles.retryButtonText}>重新扫描</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedTab === 'bluetooth' ? (
        <FlatList
          data={bluetoothDevices}
          renderItem={renderBluetoothDevice}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={bluetoothDevices.length === 0 ? styles.emptyList : undefined}
        />
      ) : (
        <View style={styles.container}>
          {renderHeader()}
          <View style={styles.wifiContainer}>
            <Text style={styles.comingSoonText}>WiFi设备管理功能即将推出</Text>
            <Ionicons name="construct-outline" size={64} color="#ccc" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#e3f2fd',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scanningButton: {
    backgroundColor: '#1976D2',
  },
  scanButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  deviceItem: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  connectedDevice: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  connectedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  connectedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  deviceAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  deviceRssi: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  wifiContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
});

export default HardwareScreen;
