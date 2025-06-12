import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabParamList } from '../types';

// 导入屏幕组件
import NewsScreen from '../screens/NewsScreen';
import HardwareScreen from '../screens/HardwareScreen';
import ARScreen from '../screens/ARScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Hardware') {
            iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
          } else if (route.name === 'AR') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="News" 
        component={NewsScreen}
        options={{
          title: '新闻资讯',
          tabBarLabel: '新闻'
        }}
      />
      <Tab.Screen 
        name="Hardware" 
        component={HardwareScreen}
        options={{
          title: '硬件控制',
          tabBarLabel: '硬件'
        }}
      />
      <Tab.Screen 
        name="AR" 
        component={ARScreen}
        options={{
          title: 'AR场景',
          tabBarLabel: 'AR'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: '个人中心',
          tabBarLabel: '我的'
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
