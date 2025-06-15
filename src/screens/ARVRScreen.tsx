import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

const ARVRScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'webgl',
      title: 'WebGL 3D渲染',
      description: '基于Three.js的实时3D场景渲染',
      icon: 'cube',
      status: '可用',
      color: '#4CAF50'
    },
    {
      id: 'ar',
      title: 'AR 增强现实',
      description: '相机实时预览 + 3D物体叠加',
      icon: 'camera',
      status: '开发中',
      color: '#FF9800'
    },
    {
      id: 'vr',
      title: 'VR 虚拟现实',
      description: '沉浸式虚拟环境体验',
      icon: 'glasses',
      status: '计划中',
      color: '#9C27B0'
    },
    {
      id: 'motion',
      title: '手势识别',
      description: '基于相机的手势控制',
      icon: 'hand-left',
      status: '计划中',
      color: '#2196F3'
    }
  ];

  const handleFeaturePress = (feature: any) => {
    setSelectedFeature(feature.id);

    switch (feature.id) {
      case 'webgl':
        navigation.navigate('ARScreen');
        break;
      case 'ar':
        Alert.alert(
          'AR 增强现实',
          '此功能正在开发中，敬请期待！\n\n计划功能：\n• 实时相机预览\n• 3D物体叠加\n• 物体追踪\n• 手势交互'
        );
        break;
      case 'vr':
        Alert.alert(
          'VR 虚拟现实',
          '此功能在规划中，将包括：\n\n• 360度全景视图\n• 沉浸式环境\n• 头部追踪\n• 虚拟交互'
        );
        break;
      case 'motion':
        Alert.alert(
          '手势识别',
          '此功能在规划中，将包括：\n\n• 手势检测\n• 动作识别\n• 空中操作\n• 体感控制'
        );
        break;
    }
  };

  const startWebGLDemo = () => {
    Alert.alert('提示', 'WebGL演示功能开发中...\n\n将包括：\n• 旋转立方体\n• 光照效果\n• 材质渲染\n• 动画系统');
  };

  const renderFeatureCard = (feature: any) => (
    <TouchableOpacity
      key={feature.id}
      style={[
        styles.featureCard,
        selectedFeature === feature.id && styles.selectedCard
      ]}
      onPress={() => handleFeaturePress(feature)}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
          <Ionicons name={feature.icon as any} size={24} color="#fff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: feature.color }]}>
          <Text style={styles.statusText}>{feature.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>快速操作</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('相机权限', '检查相机权限...')}
        >
          <Ionicons name="camera-outline" size={20} color="#2196F3" />
          <Text style={styles.actionText}>相机权限</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('性能测试', '检测设备性能...')}
        >
          <Ionicons name="speedometer-outline" size={20} color="#4CAF50" />
          <Text style={styles.actionText}>性能测试</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('设置', 'AR/VR设置选项...')}
        >
          <Ionicons name="settings-outline" size={20} color="#FF9800" />
          <Text style={styles.actionText}>设置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTechInfo = () => (
    <View style={styles.techInfo}>
      <Text style={styles.sectionTitle}>技术信息</Text>
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>WebGL支持</Text>
          <Text style={styles.infoValue}>✅ 可用</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>相机API</Text>
          <Text style={styles.infoValue}>✅ 支持</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>陀螺仪</Text>
          <Text style={styles.infoValue}>⚠️ 检测中</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>加速度计</Text>
          <Text style={styles.infoValue}>⚠️ 检测中</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AR/VR 扩展功能</Text>
        <Text style={styles.headerSubtitle}>
          探索增强现实和虚拟现实技术
        </Text>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>功能模块</Text>
        {features.map(renderFeatureCard)}
      </View>

      {renderQuickActions()}
      {renderTechInfo()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 提示：AR/VR功能需要设备支持相机和传感器
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
  header: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
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
  },
  featuresSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickActions: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    minWidth: 80,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  techInfo: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ARVRScreen;
