import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewsItem, RootStackParamList } from '../types';
import newsData from '../data/newsData.json';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<RootStackParamList, 'NewsDetail'>;

const NewsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const categoryAnimation = useRef(new Animated.Value(0)).current;

  const categories = ['全部', '前端', '移动端', '设计'];

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [selectedCategory, news]);

  const loadNews = async () => {
    setLoading(true);
    try {
      // 模拟加载延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      setNews(newsData.news);
    } catch (error) {
      console.error('加载新闻失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    if (selectedCategory === '全部') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.category === selectedCategory));
    }
  };

  const handleCategoryPress = (category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);

      // 分类切换动画
      Animated.sequence([
        Animated.timing(categoryAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(categoryAnimation, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleNewsPress = (item: NewsItem) => {
    navigation.navigate('NewsDetail', { newsItem: item });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => {
    return (
      <View style={styles.newsItemContainer}>
        <Pressable
          style={styles.newsItem}
          onPress={() => handleNewsPress(item)}
          android_ripple={{
            color: 'rgba(33, 150, 243, 0.1)',
            borderless: false,
          }}
        >
          <View style={styles.newsContent}>
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.newsImage}
              />
            )}
            <View style={styles.newsText}>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.newsMetaContainer}>
                <Text style={styles.newsAuthor}>{item.author}</Text>
                <Text style={styles.newsDot}>•</Text>
                <Text style={styles.newsCategory}>{item.category}</Text>
                <Text style={styles.newsDot}>•</Text>
                <Text style={styles.newsDate}>{formatDate(item.publishDate)}</Text>
              </View>
              <Text style={styles.newsPreview} numberOfLines={2}>
                {item.content}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderCategoryTabs = () => (
    <Animated.View
      style={[
        styles.categoryTabs,
        {
          transform: [
            {
              scale: categoryAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95],
              }),
            },
          ],
        },
      ]}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryTab,
            selectedCategory === category && styles.activeTab,
          ]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.activeCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>技术资讯</Text>
      <Text style={styles.headerSubtitle}>前端开发 · 移动应用 · 技术趋势</Text>
      {renderCategoryTabs()}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>暂无{selectedCategory}相关新闻</Text>
      <TouchableOpacity style={styles.retryButton} onPress={loadNews}>
        <Text style={styles.retryButtonText}>重新加载</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadNews}
            colors={['#2196F3']}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={filteredNews.length === 0 ? styles.emptyList : undefined}
      />
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
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    minWidth: 60,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  newsItemContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  newsContent: {
    flexDirection: 'row',
    padding: 15,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  newsText: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsAuthor: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  newsCategory: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  newsDate: {
    fontSize: 12,
    color: '#999',
  },
  newsDot: {
    fontSize: 12,
    color: '#ccc',
    marginHorizontal: 6,
  },
  newsPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
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
});

export default NewsScreen;
