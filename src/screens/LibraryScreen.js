import { View, Text, FlatList, TouchableOpacity, Image, Animated, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { animations, useScaleAnimation } from "../utils/animations";

// Data dummy untuk koleksi buku
const LIBRARY_DATA = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: require("../../assets/novel/novel4.jpg"),
    genre: "Classic",
    year: 2023,
    rating: 4.5,
    isDownloaded: true,
    isFavorite: true,
    progress: 75,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: require("../../assets/novel/novel4.jpg"),
    genre: "Classic",
    year: 2022,
    rating: 4.8,
    isDownloaded: true,
    isFavorite: false,
    progress: 45,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    cover: require("../../assets/novel/novel4.jpg"),
    genre: "Dystopian",
    year: 2023,
    rating: 4.6,
    isDownloaded: false,
    isFavorite: true,
    progress: 90,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: require("../../assets/novel/novel4.jpg"),
    genre: "Romance",
    year: 2021,
    rating: 4.7,
    isDownloaded: true,
    isFavorite: false,
    progress: 30,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: require("../../assets/novel/novel4.jpg"),
    genre: "Classic",
    year: 2023,
    rating: 4.3,
    isDownloaded: false,
    isFavorite: false,
    progress: 60,
  },
  {
    id: "6",
    title: "Moby Dick",
    author: "Herman Melville",
    cover: require("../../assets/novel/novel4.jpg"),
    genre: "Adventure",
    year: 2022,
    rating: 4.2,
    isDownloaded: true,
    isFavorite: true,
    progress: 20,
  },
];

// Kategori filter
const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "reading", label: "Sedang Dibaca" },
  { id: "completed", label: "Selesai" },
  { id: "favorites", label: "Favorit" },
  { id: "downloaded", label: "Tersimpan" },
];

// ==================== KOMPONEN ANIMASI ====================

const AnimatedLibraryCard = ({ item, index, onPress, onFavoritePress, onDownloadPress }) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { scale, scalePress, scaleReset } = useScaleAnimation(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      animations.parallel([
        animations.fadeIn(opacity, 500, index * 100),
        animations.slideInUp(translateY, 500, index * 100),
      ]).start();
    }, 300);

    return () => clearTimeout(timeout);
  }, [index]);

  const handlePressIn = () => scalePress(0.98);
  const handlePressOut = () => scaleReset();

  const getProgressStatus = () => {
    if (item.progress === 100) return "Completed";
    if (item.progress > 0) return `${item.progress}% Read`;
    return "Not Started";
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY }, { scale }],
        opacity,
        marginHorizontal: 16,
        marginVertical: 8,
      }}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        onPress={() => onPress(item)}
      >
        <View style={globalStyles.libraryCard}>
          <Image source={item.cover} style={globalStyles.libraryImage} />

          <View style={globalStyles.libraryInfo}>
            <View style={globalStyles.libraryHeader}>
              <Text style={globalStyles.libraryTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={globalStyles.libraryActions}>
                <TouchableOpacity onPress={() => onFavoritePress(item)}>
                  <Ionicons
                    name={item.isFavorite ? "heart" : "heart-outline"}
                    size={20}
                    color={item.isFavorite ? "#ff4444" : "#999"}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDownloadPress(item)}>
                  <Ionicons
                    name={item.isDownloaded ? "download" : "download-outline"}
                    size={20}
                    color={item.isDownloaded ? "#2200ff" : "#999"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={globalStyles.libraryAuthor}>{item.author}</Text>

            <View style={globalStyles.libraryMeta}>
              <View style={globalStyles.libraryMetaItem}>
                <Ionicons name="book-outline" size={12} color="#999" />
                <Text style={globalStyles.libraryMetaText}>{item.genre}</Text>
              </View>
              <View style={globalStyles.libraryMetaItem}>
                <Ionicons name="calendar-outline" size={12} color="#999" />
                <Text style={globalStyles.libraryMetaText}>{item.year}</Text>
              </View>
              <View style={globalStyles.libraryMetaItem}>
                <Ionicons name="star" size={12} color="#ffd700" />
                <Text style={globalStyles.libraryMetaText}>{item.rating}</Text>
              </View>
            </View>

            <View style={globalStyles.libraryProgressContainer}>
              <View style={globalStyles.libraryProgressBar}>
                <View
                  style={[
                    globalStyles.libraryProgressFill,
                    { width: `${item.progress}%` },
                  ]}
                />
              </View>
              <Text style={globalStyles.libraryProgressText}>
                {getProgressStatus()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==================== LIBRARY SCREEN ====================

export default function LibraryScreen({ navigation }) {
  const [libraryData, setLibraryData] = useState(LIBRARY_DATA);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Animasi values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-50)).current;
  const searchScale = useRef(new Animated.Value(1)).current;
  const categoryOpacity = useRef(new Animated.Value(0)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;
  const emptyStateScale = useRef(new Animated.Value(0.5)).current;

  // Filter data berdasarkan kategori dan search
  const getFilteredData = () => {
    let filtered = libraryData;

    // Filter by category
    if (selectedCategory === "reading") {
      filtered = filtered.filter(item => item.progress > 0 && item.progress < 100);
    } else if (selectedCategory === "completed") {
      filtered = filtered.filter(item => item.progress === 100);
    } else if (selectedCategory === "favorites") {
      filtered = filtered.filter(item => item.isFavorite);
    } else if (selectedCategory === "downloaded") {
      filtered = filtered.filter(item => item.isDownloaded);
    }

    // Filter by search
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  useEffect(() => {
    // Header animation
    animations.parallel([
      animations.fadeIn(headerOpacity, 600),
      animations.slideInUp(headerTranslateY, 600),
    ]).start();

    // Category animation
    setTimeout(() => {
      animations.fadeIn(categoryOpacity, 500).start();
    }, 200);

    // Empty state animation
    if (filteredData.length === 0) {
      setTimeout(() => {
        animations.scaleIn(emptyStateScale, 1, 500).start();
      }, 500);
    }
  }, [filteredData.length]);

  const handleBackPress = () => {
    Animated.sequence([
      Animated.timing(backButtonScale, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(backButtonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleSearchFocus = () => {
    Animated.spring(searchScale, {
      toValue: 1.02,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleSearchBlur = () => {
    Animated.spring(searchScale, {
      toValue: 1,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBookPress = (item) => {
    Alert.alert("Open Book", `Opening ${item.title}`, [
      { text: "Cancel", style: "cancel" },
      { text: "Read", onPress: () => console.log("Reading", item.title) },
    ]);
  };

  const handleFavoritePress = (item) => {
    const updatedData = libraryData.map(book =>
      book.id === item.id ? { ...book, isFavorite: !book.isFavorite } : book
    );
    setLibraryData(updatedData);

    Alert.alert(
      item.isFavorite ? "Removed from Favorites" : "Added to Favorites",
      `${item.title} has been ${item.isFavorite ? "removed from" : "added to"} your favorites`
    );
  };

  const handleDownloadPress = (item) => {
    const updatedData = libraryData.map(book =>
      book.id === item.id ? { ...book, isDownloaded: !book.isDownloaded } : book
    );
    setLibraryData(updatedData);

    Alert.alert(
      item.isDownloaded ? "Removed from Downloads" : "Downloaded",
      `${item.title} has been ${item.isDownloaded ? "removed from" : "downloaded to"} your device`
    );
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.id}
      onPress={() => handleCategoryChange(category.id)}
      style={[
        globalStyles.libraryCategoryButton,
        selectedCategory === category.id && globalStyles.libraryCategoryButtonActive,
      ]}
    >
      <Text
        style={[
          globalStyles.libraryCategoryText,
          selectedCategory === category.id && globalStyles.libraryCategoryTextActive,
        ]}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <Animated.View
      style={[
        globalStyles.emptyContainer,
        {
          transform: [{ scale: emptyStateScale }],
          marginTop: 80,
        },
      ]}
    >
      <Ionicons name="library-outline" size={80} color="#ccc" />
      <Text style={globalStyles.emptyText}>No books found</Text>
      <Text style={[globalStyles.emptySubText, { textAlign: "center" }]}>
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : "Your library is empty. Start reading to add books!"}
      </Text>
      {!searchQuery && (
        <TouchableOpacity
          style={globalStyles.emptyButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={globalStyles.emptyButtonText}>Browse Novels</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderLibraryCard = ({ item, index }) => (
    <AnimatedLibraryCard
      item={item}
      index={index}
      onPress={handleBookPress}
      onFavoritePress={handleFavoritePress}
      onDownloadPress={handleDownloadPress}
    />
  );

  // Hitung statistik
  const stats = {
    total: libraryData.length,
    reading: libraryData.filter(b => b.progress > 0 && b.progress < 100).length,
    completed: libraryData.filter(b => b.progress === 100).length,
    favorites: libraryData.filter(b => b.isFavorite).length,
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <Animated.View
        style={[
          globalStyles.libraryHeader,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
            marginTop: 8, // Tambahan margin top
          },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: backButtonScale }] }}>
          <TouchableOpacity onPress={handleBackPress} style={globalStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </Animated.View>

        <Text style={globalStyles.libraryHeaderTitle}>My Library</Text>

        <TouchableOpacity
          style={globalStyles.libraryViewButton}
          onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          <Ionicons
            name={viewMode === "grid" ? "grid-outline" : "list-outline"}
            size={24}
            color="#2200ff"
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View
        style={[
          globalStyles.librarySearchContainer,
          {
            transform: [{ scale: searchScale }],
            marginTop: 12, // Tambahan margin top
          },
        ]}
      >
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Search by title or author..."
          style={globalStyles.librarySearchInput}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Stats Badge */}
      <View style={[globalStyles.libraryStatsContainer, { marginTop: 8 }]}>
        <View style={globalStyles.libraryStat}>
          <Text style={globalStyles.libraryStatNumber}>{stats.total}</Text>
          <Text style={globalStyles.libraryStatLabel}>Total</Text>
        </View>
        <View style={globalStyles.libraryStatDivider} />
        <View style={globalStyles.libraryStat}>
          <Text style={globalStyles.libraryStatNumber}>{stats.reading}</Text>
          <Text style={globalStyles.libraryStatLabel}>Reading</Text>
        </View>
        <View style={globalStyles.libraryStatDivider} />
        <View style={globalStyles.libraryStat}>
          <Text style={globalStyles.libraryStatNumber}>{stats.completed}</Text>
          <Text style={globalStyles.libraryStatLabel}>Completed</Text>
        </View>
        <View style={globalStyles.libraryStatDivider} />
        <View style={globalStyles.libraryStat}>
          <Text style={globalStyles.libraryStatNumber}>{stats.favorites}</Text>
          <Text style={globalStyles.libraryStatLabel}>Favorites</Text>
        </View>
      </View>

      {/* Categories */}
      <Animated.View style={[globalStyles.libraryCategories, { opacity: categoryOpacity, marginTop: 8 }]}>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => renderCategoryButton(item)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={globalStyles.libraryCategoriesContent}
        />
      </Animated.View>

      {/* Book List */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderLibraryCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 16, // Tambahan padding top
          }}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
}