import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { useARStore } from '../store';

const { width, height } = Dimensions.get('window');

const ARScreen: React.FC = () => {
  const {
    scenes,
    currentScene,
    isARActive,
    loadScenes,
    setCurrentScene,
    startAR,
    stopAR,
  } = useARStore();

  const [isLoading, setIsLoading] = useState(false);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    loadScenes();
  }, []);

  const onContextCreate = async (gl: any) => {
    try {
      setIsLoading(true);

      // 创建渲染器
      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // 创建场景
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      // 添加光源
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // 创建一个旋转的立方体作为示例
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.8
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // 渲染循环
      const render = () => {
        requestAnimationFrame(render);

        // 旋转立方体
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      render();
      setIsLoading(false);
    } catch (error) {
      console.error('WebGL初始化失败:', error);
      setIsLoading(false);
      Alert.alert('错误', 'WebGL初始化失败');
    }
  };

  const handleStartAR = async () => {
    try {
      await startAR();
      Alert.alert('成功', 'AR模式已启动');
    } catch (error) {
      Alert.alert('错误', 'AR启动失败');
    }
  };

  const handleStopAR = () => {
    stopAR();
    Alert.alert('提示', 'AR模式已停止');
  };

  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        style={[styles.controlButton, isARActive && styles.activeButton]}
        onPress={isARActive ? handleStopAR : handleStartAR}
      >
        <Ionicons
          name={isARActive ? 'stop' : 'play'}
          size={20}
          color="#fff"
        />
        <Text style={styles.controlButtonText}>
          {isARActive ? '停止AR' : '启动AR'}
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AR 增强现实</Text>
        <Text style={styles.headerSubtitle}>
          {isARActive ? 'AR模式运行中' : '点击启动AR体验'}
        </Text>
      </View>

      <View style={styles.glContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>正在初始化3D场景...</Text>
          </View>
        )}

        <GLView
          style={styles.glView}
          onContextCreate={onContextCreate}
        />
      </View>

      {renderControls()}

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="cube" size={16} color="#2196F3" />
          <Text style={styles.infoText}>3D渲染: WebGL</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="camera" size={16} color="#2196F3" />
          <Text style={styles.infoText}>相机: {isARActive ? '已启用' : '未启用'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="layers" size={16} color="#2196F3" />
          <Text style={styles.infoText}>场景数: {scenes.length}</Text>
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
  glContainer: {
    flex: 1,
    position: 'relative',
  },
  glView: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-around',
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
