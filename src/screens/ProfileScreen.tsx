import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [autoConnectEnabled, setAutoConnectEnabled] = React.useState(true);

  const handleSettingPress = (title: string) => {
    Alert.alert('设置', `${title} 功能开发中...`);
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    rightComponent?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#2196F3" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 用户信息 */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>开发者</Text>
          <Text style={styles.userEmail}>developer@example.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* 设备管理 */}
      {renderSection('设备管理', (
        <>
          {renderSettingItem(
            'bluetooth',
            '蓝牙设备',
            '管理已连接的蓝牙设备',
            () => handleSettingPress('蓝牙设备')
          )}
          {renderSettingItem(
            'wifi',
            'WiFi设置',
            '配置网络连接',
            () => handleSettingPress('WiFi设置')
          )}
          {renderSettingItem(
            'hardware-chip',
            '硬件状态',
            '查看设备运行状态',
            () => handleSettingPress('硬件状态')
          )}
        </>
      ))}

      {/* AR设置 */}
      {renderSection('AR设置', (
        <>
          {renderSettingItem(
            'cube',
            'AR场景管理',
            '管理和配置AR场景',
            () => handleSettingPress('AR场景管理')
          )}
          {renderSettingItem(
            'camera',
            '相机权限',
            '管理相机访问权限',
            () => handleSettingPress('相机权限')
          )}
          {renderSettingItem(
            'eye',
            '显示设置',
            '调整AR显示参数',
            () => handleSettingPress('显示设置')
          )}
        </>
      ))}

      {/* 应用设置 */}
      {renderSection('应用设置', (
        <>
          {renderSettingItem(
            'notifications',
            '推送通知',
            '接收设备状态通知',
            undefined,
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#2196F3' : '#f4f3f4'}
            />
          )}
          {renderSettingItem(
            'moon',
            '深色模式',
            '切换应用主题',
            undefined,
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkModeEnabled ? '#2196F3' : '#f4f3f4'}
            />
          )}
          {renderSettingItem(
            'sync',
            '自动连接',
            '启动时自动连接设备',
            undefined,
            <Switch
              value={autoConnectEnabled}
              onValueChange={setAutoConnectEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={autoConnectEnabled ? '#2196F3' : '#f4f3f4'}
            />
          )}
        </>
      ))}

      {/* 其他 */}
      {renderSection('其他', (
        <>
          {renderSettingItem(
            'help-circle',
            '帮助与支持',
            '获取使用帮助',
            () => handleSettingPress('帮助与支持')
          )}
          {renderSettingItem(
            'information-circle',
            '关于应用',
            '版本信息和开发者',
            () => Alert.alert(
              '关于应用',
              'React Native AR Demo\n版本: 1.0.0\n开发者: 前端工程师团队'
            )
          )}
          {renderSettingItem(
            'star',
            '评价应用',
            '在应用商店评价',
            () => handleSettingPress('评价应用')
          )}
        </>
      ))}

      {/* 退出按钮 */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert(
            '确认退出',
            '确定要退出应用吗？',
            [
              { text: '取消', style: 'cancel' },
              { text: '确定', onPress: () => Alert.alert('提示', '退出功能开发中...') },
            ]
          );
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#f44336" />
        <Text style={styles.logoutText}>退出应用</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          React Native AR Demo v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userSection: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  logoutText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;
