import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Data constants
const CATEGORIES = [
  { id: 1, name: "Fiction", icon: "book" },
  { id: 2, name: "Mystery", icon: "eye" },
  { id: 3, name: "Romance", icon: "heart" },
  { id: 4, name: "Sci-Fi", icon: "rocket" },
  { id: 5, name: "Biography", icon: "person" },
];

const FEATURED_NOVELS = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.5,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.3,
    image: "https://via.placeholder.com/150",
  },
];

const RECOMMENDED_BOOKS = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.5,
    image: "https://via.placeholder.com/100x140",
  },
  {
    id: 2,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.5,
    image: "https://via.placeholder.com/100x140",
  },
];

// Component untuk Category Item
const CategoryItem = ({ item }) => (
  <TouchableOpacity style={globalStyles.categoryItem}>
    <View style={globalStyles.categoryIcon}>
      <Ionicons name={item.icon} size={24} color="#2200ff" />
    </View>
    <Text style={globalStyles.categoryName}>{item.name}</Text>
  </TouchableOpacity>
);

// Component untuk Novel Card
const NovelCard = ({ item }) => (
  <TouchableOpacity style={globalStyles.novelCard}>
    <Image source={{ uri: item.image }} style={globalStyles.novelImage} />
    <View style={globalStyles.novelInfo}>
      <Text style={globalStyles.novelTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={globalStyles.novelAuthor}>{item.author}</Text>
      <View style={globalStyles.ratingContainer}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={globalStyles.ratingText}>{item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Component untuk Recommended Card
const RecommendedCard = ({ item }) => (
  <TouchableOpacity style={globalStyles.recommendedCard}>
    <Image source={{ uri: item.image }} style={globalStyles.recommendedImage} />
    <Text style={globalStyles.recommendedTitle} numberOfLines={2}>
      {item.title}
    </Text>
    <Text style={globalStyles.recommendedAuthor}>{item.author}</Text>
    <View style={globalStyles.recommendedRating}>
      <Ionicons name="star" size={12} color="#FFD700" />
      <Text style={globalStyles.recommendedRatingText}>{item.rating}</Text>
    </View>
  </TouchableOpacity>
);

// Component untuk Section Header
const SectionHeader = ({ title, onSeeAll }) => (
  <View style={globalStyles.sectionHeader}>
    <Text style={globalStyles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onSeeAll}>
      <Text style={globalStyles.seeAllText}>See All</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={globalStyles.logo}
        />

        <View
          style={[
            globalStyles.searchContainer,
            searchFocused && globalStyles.searchContainerFocused,
          ]}
        >
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search novel, author, or genre..."
            style={globalStyles.search}
            placeholderTextColor="#999"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </View>

        <TouchableOpacity style={globalStyles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={globalStyles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={globalStyles.welcomeSection}>
          <View>
            <Text style={globalStyles.greeting}>Hello, User! 👋</Text>
            <Text style={globalStyles.subGreeting}>
              What novel will you read today?
            </Text>
          </View>
          <TouchableOpacity style={globalStyles.profileBtn}>
            <Ionicons name="person-circle-outline" size={40} color="#2200ff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <SectionHeader title="Categories" />
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => <CategoryItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={globalStyles.categoriesList}
          contentContainerStyle={globalStyles.categoriesContent}
        />

        {/* Featured Novels */}
        <SectionHeader title="Featured Novels" />
        <FlatList
          data={FEATURED_NOVELS}
          renderItem={({ item }) => <NovelCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={globalStyles.novelsList}
          contentContainerStyle={globalStyles.novelsContent}
        />

        {/* Continue Reading */}
        <SectionHeader title="Continue Reading" />
        <TouchableOpacity style={globalStyles.continueCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }}
            style={globalStyles.continueImage}
          />
          <View style={globalStyles.continueInfo}>
            <Text style={globalStyles.continueTitle}>The Great Gatsby</Text>
            <Text style={globalStyles.continueAuthor}>F. Scott Fitzgerald</Text>
            <View style={globalStyles.progressBar}>
              <View style={[globalStyles.progressFill, { width: "60%" }]} />
            </View>
            <Text style={globalStyles.progressText}>60% completed</Text>
          </View>
        </TouchableOpacity>

        {/* Recommended */}
        <SectionHeader title="Recommended for You" />
        <View style={globalStyles.recommendedList}>
          {RECOMMENDED_BOOKS.map((item) => (
            <RecommendedCard key={item.id} item={item} />
          ))}
        </View>

        {/* Bottom spacing untuk floating navbar */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
