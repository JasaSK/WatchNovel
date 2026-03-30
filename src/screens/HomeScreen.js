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
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";

import CategoryItem from "../components/home/CategoryItem";
import NovelCard from "../components/home/NovelCard";
import RecommendedCard from "../components/home/RecommendedCard";
import SectionHeader from "../components/home/SectionHeader";

import { CATEGORIES, FEATURED_NOVELS, RECOMMENDED_BOOKS } from "../data/novels";

export default function HomeScreen() {
  const [searchFocused, setSearchFocused] = useState(false);

  const renderCategory = ({ item }) => <CategoryItem item={item} />;
  const renderNovel = ({ item }) => <NovelCard item={item} />;

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* HEADER */}
      <View style={globalStyles.header}>
        <Image
          source={require("../../assets/logo.png")}
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
        {/* WELCOME */}
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

        {/* CATEGORIES */}
        <SectionHeader title="Categories" />

        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={globalStyles.categoriesList}
          contentContainerStyle={globalStyles.categoriesContent}
        />

        {/* FEATURED NOVELS */}
        <SectionHeader title="Featured Novels" />

        <FlatList
          data={FEATURED_NOVELS}
          renderItem={renderNovel}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={globalStyles.novelsList}
          contentContainerStyle={globalStyles.novelsContent}
        />

        {/* CONTINUE READING */}
        <SectionHeader title="Continue Reading" />

        <TouchableOpacity style={globalStyles.continueCard}>
          <Image
            source={require("../../assets/novel/novel4.jpg")}
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

        {/* RECOMMENDED */}
        <SectionHeader title="Recommended for You" />

        <View style={globalStyles.recommendedList}>
          {RECOMMENDED_BOOKS.map((item) => (
            <RecommendedCard key={item.id} item={item} />
          ))}
        </View>

        {/* SPACE UNTUK NAVBAR */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
//test