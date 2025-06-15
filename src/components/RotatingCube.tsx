import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const RotatingCubeWithWaterTree: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isConeTrees, setIsConeTrees] = useState(false);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const treeObjectsRef = useRef<THREE.Object3D[]>([]);
    const controlsRef = useRef<any>(null);
    const [autoRotate, setAutoRotate] = useState(true);

    const toggleTreeType = () => {
        setIsConeTrees(prev => !prev);
    };

    useEffect(() => {
        if (!mountRef.current) return;

        // 颜色
        const Colors = {
            cyan: 0x248079,
            brown: 0xA98F78,
            brownDark: 0x9A6169,
            green: 0x65BB61,
            greenLight: 0xABD66A,
            blue: 0x6BC6FF
        };

        // 场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        sceneRef.current = scene;
        const h = window.innerHeight - 100;
        const w = window.innerWidth - 50;
        const aspectRatio = w / h;
        const camera = new THREE.PerspectiveCamera(25, aspectRatio, 0.1, 1000);
        camera.position.set(-5, 6, 8);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const dpi = window.devicePixelRatio;
        renderer.setSize(w * dpi, h * dpi);
        mountRef.current.appendChild(renderer.domElement);
        mountRef.current.style.width = `${w}px`;
        mountRef.current.style.height = `${h}px`;

        // 控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controlsRef.current = controls;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 1.0;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = true; // 允许手动旋转

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // 灯光
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        const shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
        shadowLight.position.set(200, 200, 200);
        shadowLight.castShadow = true;
        scene.add(shadowLight);
        const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
        backLight.position.set(-100, 200, 50);
        backLight.castShadow = true;
        scene.add(backLight);

        // 地面和河流
        const materialGrass = new THREE.MeshLambertMaterial({ color: Colors.greenLight });
        const groundLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 2), materialGrass);
        groundLeft.position.set(-1, 0.1, 0);
        scene.add(groundLeft);
        const materialRiver = new THREE.MeshLambertMaterial({ color: Colors.blue });
        const river = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 2), materialRiver);
        river.position.set(0.5, 0.1, 0);
        scene.add(river);

        // 立方体
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0, 1, 0);
        cube.castShadow = true;
        scene.add(cube);

        // 树相关
        const material_trunk = new THREE.MeshLambertMaterial({ color: Colors.brownDark });
        const material_leaves = new THREE.MeshLambertMaterial({ color: Colors.green });
        function cubeTree(x: number, z: number) {
            const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), material_trunk);
            trunk.position.set(x, 0.275, z);
            trunk.castShadow = true;
            scene.add(trunk);
            treeObjectsRef.current.push(trunk);
            const leaves = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.4, 0.25), material_leaves);
            leaves.position.set(x, 0.475, z);
            leaves.castShadow = true;
            scene.add(leaves);
            treeObjectsRef.current.push(leaves);
        }
        function coneTree(x: number, z: number) {
            const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.2, 8), material_trunk);
            trunk.position.set(x, 0.2, z);
            trunk.castShadow = true;
            scene.add(trunk);
            treeObjectsRef.current.push(trunk);
            const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 8), material_leaves);
            leaves.position.set(x, 0.45, z);
            leaves.castShadow = true;
            scene.add(leaves);
            treeObjectsRef.current.push(leaves);
        }
        function createTrees(useConeTrees: boolean) {
            treeObjectsRef.current.forEach(obj => scene.remove(obj));
            treeObjectsRef.current = [];
            const positions = [
                { x: -1.75, z: -0.85 }, { x: -1.75, z: -0.15 }, { x: -1.5, z: -0.5 }, { x: -1.5, z: 0.4 },
                { x: -1.25, z: -0.85 }, { x: -1.25, z: 0.75 }, { x: -0.75, z: -0.85 }, { x: -0.75, z: -0.25 },
                { x: -0.25, z: -0.85 }, { x: 1.25, z: -0.85 }, { x: 1.25, z: 0.75 }, { x: 1.5, z: -0.5 },
                { x: 1.75, z: -0.85 }, { x: 1.75, z: 0.35 }
            ];
            const treeFunc = useConeTrees ? coneTree : cubeTree;
            positions.forEach(pos => treeFunc(pos.x, pos.z));
        }
        createTrees(isConeTrees);

        // 动画
        let frameId: number;
        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.autoRotate = autoRotate;
            controls.update();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // 鼠标/手势交互：拖动时关闭自动旋转，松开后恢复
        const onStart = () => setAutoRotate(false);
        const onEnd = () => setAutoRotate(true);
        controls.addEventListener('start', onStart);
        controls.addEventListener('end', onEnd);

        // 自适应窗口
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width * dpi, height * dpi);
            if (mountRef.current) {
                mountRef.current.style.width = `${width}px`;
                mountRef.current.style.height = `${height}px`;
            }
        };
        window.addEventListener('resize', handleResize);

        // 清理
        return () => {
            window.removeEventListener('resize', handleResize);
            controls.removeEventListener('start', onStart);
            controls.removeEventListener('end', onEnd);
            cancelAnimationFrame(frameId);
            renderer.dispose();
            controls.dispose();
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [isConeTrees, autoRotate]);

    // 切换树类型按钮
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#f0f0f0', overflow: 'hidden' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
            <button
                onClick={toggleTreeType}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '10px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}
            >
                {isConeTrees ? '切换为立方体树' : '切换为圆锥体树'}
            </button>
        </div>
    );
};

export default RotatingCubeWithWaterTree;
