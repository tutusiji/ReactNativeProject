import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewsItem } from '../types';

const { width } = Dimensions.get('window');

type NewsDetailRouteProp = RouteProp<{ NewsDetail: { newsItem: NewsItem } }, 'NewsDetail'>;
type NewsDetailNavigationProp = StackNavigationProp<{ NewsDetail: { newsItem: NewsItem } }, 'NewsDetail'>;

interface NewsDetailScreenProps {
  route: NewsDetailRouteProp;
  navigation: NewsDetailNavigationProp;
}

const NewsDetailScreen: React.FC<NewsDetailScreenProps> = ({ route, navigation }) => {
  const { newsItem } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>新闻详情</Text>
      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="share-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* 标题 */}
      <Text style={styles.title}>{newsItem.title}</Text>
      
      {/* 元信息 */}
      <View style={styles.metaInfo}>
        <View style={styles.metaRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.metaText}>{newsItem.author}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.metaText}>{formatDate(newsItem.publishDate)}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="pricetag-outline" size={16} color="#666" />
          <Text style={styles.metaText}>{newsItem.category}</Text>
        </View>
      </View>

      {/* 图片 */}
      {newsItem.imageUrl && (
        <Image 
          source={{ uri: newsItem.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* 标签 */}
      {newsItem.tags && (
        <View style={styles.tagsContainer}>
          {newsItem.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 正文 */}
      <Text style={styles.contentText}>{newsItem.content}</Text>

      {/* 操作按钮 */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionText}>点赞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>评论</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={20} color="#666" />
          <Text style={styles.actionText}>收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
          <Text style={styles.actionText}>分享</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2196F3',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  shareButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 32,
    marginBottom: 15,
  },
  metaInfo: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default NewsDetailScreen;
