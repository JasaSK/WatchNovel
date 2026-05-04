import { View, Text, FlatList, TouchableOpacity, Image, Animated, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { animations, useScaleAnimation } from "../utils/animations";

// Data dummy untuk riwayat bacaan
const HISTORY_DATA = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: require("../../assets/novel/novel4.jpg"),
    lastRead: "2 hours ago",
    progress: 75,
    pagesRead: 150,
    totalPages: 200,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: require("../../assets/novel/novel4.jpg"),
    lastRead: "Yesterday",
    progress: 45,
    pagesRead: 112,
    totalPages: 250,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    cover: require("../../assets/novel/novel4.jpg"),
    lastRead: "2 days ago",
    progress: 90,
    pagesRead: 270,
    totalPages: 300,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: require("../../assets/novel/novel4.jpg"),
    lastRead: "3 days ago",
    progress: 30,
    pagesRead: 90,
    totalPages: 300,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: require("../../assets/novel/novel4.jpg"),
    lastRead: "1 week ago",
    progress: 60,
    pagesRead: 120,
    totalPages: 200,
  },
];

// ==================== KOMPONEN ANIMASI ====================

const AnimatedHistoryCard = ({ item, index, onPress }) => {
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
        <View style={globalStyles.historyCard}>
          <Image source={item.cover} style={globalStyles.historyImage} />

          <View style={globalStyles.historyInfo}>
            <Text style={globalStyles.historyTitleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={globalStyles.historyAuthor}>{item.author}</Text>

            <View style={globalStyles.historyProgressContainer}>
              <View style={globalStyles.historyProgressBar}>
                <View
                  style={[
                    globalStyles.historyProgressFill,
                    { width: `${item.progress}%` },
                  ]}
                />
              </View>
              <Text style={globalStyles.historyProgressText}>
                {item.progress}% completed
              </Text>
            </View>

            <View style={globalStyles.historyMeta}>
              <View style={globalStyles.historyMetaItem}>
                <Ionicons name="time-outline" size={14} color="#999" />
                <Text style={globalStyles.historyMetaText}>
                  Last read: {item.lastRead}
                </Text>
              </View>
              <View style={globalStyles.historyMetaItem}>
                <Ionicons name="book-outline" size={14} color="#999" />
                <Text style={globalStyles.historyMetaText}>
                  {item.pagesRead} / {item.totalPages} pages
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={globalStyles.historyContinueButton}>
            <Ionicons name="play-circle" size={32} color="#2200ff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==================== HISTORY SCREEN ====================

export default function HistoryScreen({ navigation }) {
  const [historyData, setHistoryData] = useState(HISTORY_DATA);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Animasi values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-50)).current;
  const titleTranslateX = useRef(new Animated.Value(-30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const filterContainerOpacity = useRef(new Animated.Value(0)).current;
  const emptyStateScale = useRef(new Animated.Value(0.5)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;

  const filters = [
    { id: "all", label: "Semua" },
    { id: "week", label: "Minggu Ini" },
    { id: "month", label: "Bulan Ini" },
  ];

  // Filter data berdasarkan pilihan
  const getFilteredData = () => {
    if (selectedFilter === "all") return historyData;

    // Simulasi filter berdasarkan waktu
    const filtered = historyData.filter((item) => {
      if (selectedFilter === "week") {
        return item.lastRead.includes("hour") ||
          item.lastRead.includes("Yesterday") ||
          item.lastRead.includes("days");
      }
      if (selectedFilter === "month") {
        return item.lastRead.includes("week");
      }
      return true;
    });

    return filtered;
  };

  const filteredData = getFilteredData();

  useEffect(() => {
    // Header animation
    animations.parallel([
      animations.fadeIn(headerOpacity, 600),
      animations.slideInUp(headerTranslateY, 600),
    ]).start();

    // Title animation
    setTimeout(() => {
      animations.parallel([
        animations.fadeIn(titleOpacity, 500),
        animations.slideInLeft(titleTranslateX, 500),
      ]).start();
    }, 200);

    // Filter animation
    setTimeout(() => {
      animations.fadeIn(filterContainerOpacity, 500).start();
    }, 400);

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

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
  };

  const handleCardPress = (item) => {
    Alert.alert("Continue Reading", `Continue reading ${item.title}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Continue", onPress: () => console.log("Continue reading", item.title) },
    ]);
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all reading history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => setHistoryData([]),
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <Animated.View
      style={[
        globalStyles.emptyContainer,
        {
          transform: [{ scale: emptyStateScale }],
          marginTop: 60,
        },
      ]}
    >
      <Ionicons name="book-outline" size={80} color="#ccc" />
      <Text style={globalStyles.emptyText}>No reading history yet</Text>
      <Text style={[globalStyles.emptySubText, { textAlign: "center" }]}>
        Start reading novels to see your history here
      </Text>
      <TouchableOpacity
        style={globalStyles.emptyButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={globalStyles.emptyButtonText}>Browse Novels</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <Animated.View
        style={[
          globalStyles.historyHeader,
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

        <Animated.View
          style={{
            transform: [{ translateX: titleTranslateX }],
            opacity: titleOpacity,
          }}
        >
          <Text style={globalStyles.historyHeaderTitle}>Reading History</Text>
        </Animated.View>

        {historyData.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory} style={globalStyles.clearButton}>
            <Ionicons name="trash-outline" size={22} color="#ff4444" />
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Filter Buttons */}
      <Animated.View
        style={[
          globalStyles.filterContainer,
          {
            opacity: filterContainerOpacity,
            marginTop: 12, // Tambahan margin top
            marginBottom: 8, // Tambahan margin bottom
          },
        ]}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => handleFilterChange(filter.id)}
            style={[
              globalStyles.filterButton,
              selectedFilter === filter.id && globalStyles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                globalStyles.filterText,
                selectedFilter === filter.id && globalStyles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* History List */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={({ item, index }) => (
            <AnimatedHistoryCard
              item={item}
              index={index}
              onPress={handleCardPress}
            />
          )}
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