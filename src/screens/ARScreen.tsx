import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useARVRStore } from '../store';
import RotatingCube from '../components/RotatingCube';

const { width, height } = Dimensions.get('window');

const ARScreen: React.FC = () => {
  const { isARActive, toggleAR } = useARVRStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartAR = async () => {
    setIsLoading(true);
    setTimeout(() => {
      toggleAR();
      setIsLoading(false);
      Alert.alert('成功', 'AR模式已启动');
    }, 1000);
  };

  const handleStopAR = () => {
    toggleAR();
    Alert.alert('提示', 'AR模式已停止');
  };

  const renderControls = () => (
    <View style={styles.controlsContainer}>
      {/* 立方体展示区域 */}
      <View style={styles.cubeContainer}>
        <Text style={styles.cubeTitle}>交互式3D立方体</Text>
        <RotatingCube size={60} autoRotate={true} />
        <Text style={styles.cubeHint}>拖拽可控制旋转</Text>
      </View>

      {/* 控制按钮行 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.controlButton, isARActive && styles.activeButton]}
          onPress={isARActive ? handleStopAR : handleStartAR}
          disabled={isLoading}
        >
          <Ionicons
            name={isARActive ? 'stop' : 'play'}
            size={20}
            color="#fff"
          />
          <Text style={styles.controlButtonText}>
            {isLoading ? '启动中...' : (isARActive ? '停止AR' : '启动AR')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            Alert.alert('场景选择', '选择AR场景功能开发中...');
          }}
        >
          <Ionicons name="cube-outline" size={20} color="#fff" />
          <Text style={styles.controlButtonText}>场景</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            Alert.alert('设置', 'AR设置功能开发中...');
          }}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.controlButtonText}>设置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AR 增强现实</Text>
        <Text style={styles.headerSubtitle}>
          {isARActive ? 'AR模式运行中' : '点击启动AR体验'}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>正在初始化AR场景...</Text>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <View style={styles.placeholderView}>
              <Ionicons name="cube" size={100} color="#666" />
              <Text style={styles.placeholderText}>
                {isARActive ? 'AR场景运行中' : '3D场景预览'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {renderControls()}

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="cube" size={16} color="#2196F3" />
          <Text style={styles.infoText}>3D渲染: 简化版</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="camera" size={16} color="#2196F3" />
          <Text style={styles.infoText}>相机: {isARActive ? '已启用' : '未启用'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="layers" size={16} color="#2196F3" />
          <Text style={styles.infoText}>场景数: 1</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  controlsContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  cubeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cubeTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cubeHint: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#f44336',
  },
  controlButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#ccc',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ARScreen;
