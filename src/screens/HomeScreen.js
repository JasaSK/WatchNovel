  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    Easing,
    Dimensions,
  } from "react-native";
  import { useState, useRef, useEffect } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { globalStyles } from "../styles/globalStyles";

  import CategoryItem from "../components/home/CategoryItem";
  import NovelCard from "../components/home/NovelCard";
  import RecommendedCard from "../components/home/RecommendedCard";
  import SectionHeader from "../components/home/SectionHeader";

  import { CATEGORIES, FEATURED_NOVELS, RECOMMENDED_BOOKS } from "../data/novels";

  import {
    animations,
    useScaleAnimation
  } from "../utils/animations";

  const { width } = Dimensions.get("window");

  const AnimatedCategoryItem = ({ item }) => {
    const { scale, scalePress, scaleReset } = useScaleAnimation(1);

    const handlePressIn = () => scalePress(0.95);
    const handlePressOut = () => scaleReset();

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <CategoryItem item={item} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const AnimatedNovelCard = ({ item, index }) => {
    const translateY = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const timeout = setTimeout(() => {
        animations.parallel([
          animations.fadeIn(opacity, 500, index * 100),
          animations.slideInUp(translateY, 500, index * 100),
        ]).start();
      }, 600);

      return () => clearTimeout(timeout);
    }, [index]);

    return (
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        <NovelCard item={item} />
      </Animated.View>
    );
  };

  const AnimatedRecommendedCard = ({ item, index }) => {
    const translateY = useRef(new Animated.Value(30)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      const timeout = setTimeout(() => {
        animations.parallel([
          animations.fadeIn(opacity, 400, index * 150),
          animations.slideInUp(translateY, 400, index * 150),
        ]).start();
      }, 1000);

      return () => clearTimeout(timeout);
    }, [index]);

    const handlePressIn = () => animations.scalePress(scaleAnim, 0.97);
    const handlePressOut = () => animations.scalePress(scaleAnim, 1);

    return (
      <Animated.View
        style={{
          transform: [{ translateY }, { scale: scaleAnim }],
          opacity,
          width: (width - 48) / 2,
          marginHorizontal: 8,
        }}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <RecommendedCard item={item} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  export default function HomeScreen() {
    const [searchFocused, setSearchFocused] = useState(false);

    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerTranslateY = useRef(new Animated.Value(-50)).current;
    const welcomeOpacity = useRef(new Animated.Value(0)).current;
    const welcomeTranslateX = useRef(new Animated.Value(-30)).current;
    const categoriesScale = useRef(new Animated.Value(0.8)).current;
    const featuredScale = useRef(new Animated.Value(0.8)).current;
    const continueScale = useRef(new Animated.Value(0.95)).current;
    const recommendedScale = useRef(new Animated.Value(0.8)).current;
    const searchScale = useRef(new Animated.Value(1)).current;
    const notificationAnim = useRef(new Animated.Value(1)).current;
    const progressWidth = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      animations.parallel([
        animations.fadeIn(headerOpacity, 800),
        animations.slideInUp(headerTranslateY, 800),
      ]).start();

      const t1 = setTimeout(() => {
        animations.parallel([
          animations.fadeIn(welcomeOpacity, 600),
          animations.slideInLeft(welcomeTranslateX, 600),
        ]).start();
      }, 200);

      const t2 = setTimeout(() => {
        animations.scaleIn(categoriesScale).start();
      }, 400);

      const t3 = setTimeout(() => {
        animations.scaleIn(featuredScale).start();
      }, 600);

      const t4 = setTimeout(() => {
        animations.scaleIn(continueScale).start();
        Animated.timing(progressWidth, {
          toValue: 60,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }, 800);

      const t5 = setTimeout(() => {
        animations.scaleIn(recommendedScale).start();
      }, 1000);

      animations.pulse(pulseAnim);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }, []);

    const handleSearchFocus = () => {
      setSearchFocused(true);
      animations.scalePress(searchScale, 1.05);
    };

    const handleSearchBlur = () => {
      setSearchFocused(false);
      animations.scalePress(searchScale, 1);
    };

    const handleNotificationPress = () => {
      animations.sequence([
        animations.fadeOut(notificationAnim, 100),
        animations.scaleIn(notificationAnim, 1, 200),
      ]).start();
    };

    const handleProfilePress = () => {
      animations.shake(welcomeTranslateX).start();
    };

    const renderCategory = ({ item }) => <AnimatedCategoryItem item={item} />;
    const renderNovel = ({ item, index }) => <AnimatedNovelCard item={item} index={index} />;
    const renderRecommended = ({ item, index }) => <AnimatedRecommendedCard item={item} index={index} />;

    const sections = [
      { id: "welcome", type: "welcome" },
      { id: "categories", type: "categories", data: CATEGORIES },
      { id: "featured", type: "featured", data: FEATURED_NOVELS },
      { id: "continue", type: "continue" },
      { id: "recommended", type: "recommended", data: RECOMMENDED_BOOKS },
      { id: "bottomSpace", type: "space" },
    ];

    const renderSection = ({ item }) => {
      switch (item.type) {
        case "welcome":
          return (
            <Animated.View
              style={[
                globalStyles.welcomeSection,
                {
                  opacity: welcomeOpacity,
                  transform: [{ translateX: welcomeTranslateX }],
                },
              ]}
            >
              <View>
                <Text style={globalStyles.greeting}>Hello, User! 👋</Text>
                <Text style={globalStyles.subGreeting}>
                  What novel will you read today?
                </Text>
              </View>

              <TouchableOpacity
                style={globalStyles.profileBtn}
                onPress={handleProfilePress}
              >
                <Ionicons name="person-circle-outline" size={40} color="#2200ff" />
              </TouchableOpacity>
            </Animated.View>
          );

        case "categories":
          return (
            <Animated.View style={{ transform: [{ scale: categoriesScale }] }}>
              <SectionHeader title="Categories" />
              <FlatList
                data={item.data}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={globalStyles.categoriesList}
                contentContainerStyle={globalStyles.categoriesContent}
                scrollEnabled={false}
              />
            </Animated.View>
          );

        case "featured":
          return (
            <Animated.View style={{ transform: [{ scale: featuredScale }] }}>
              <SectionHeader title="Featured Novels" />
              <FlatList
                data={item.data}
                renderItem={renderNovel}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={globalStyles.novelsList}
                contentContainerStyle={globalStyles.novelsContent}
                scrollEnabled={false}
              />
            </Animated.View>
          );

        case "continue":
          const progressInterpolate = progressWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          });

          return (
            <Animated.View style={{ transform: [{ scale: continueScale }] }}>
              <SectionHeader title="Continue Reading" />
              <TouchableOpacity style={globalStyles.continueCard}>
                <Image
                  source={require("../../assets/novel/novel4.jpg")}
                  style={globalStyles.continueImage}
                />
                <View style={globalStyles.continueInfo}>
                  <Text style={globalStyles.continueTitle}>The Great Gatsby</Text>
                  <Text style={globalStyles.continueAuthor}>
                    F. Scott Fitzgerald
                  </Text>
                  <View style={globalStyles.progressBar}>
                    <Animated.View
                      style={[
                        globalStyles.progressFill,
                        { width: progressInterpolate },
                      ]}
                    />
                  </View>
                  <Text style={globalStyles.progressText}>
                    {Math.round(progressWidth._value)}% completed
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );

        case "recommended":
          return (
            <Animated.View style={{ transform: [{ scale: recommendedScale }] }}>
              <SectionHeader title="Recommended for You" />
              <View style={globalStyles.recommendedList}>
                <FlatList
                  data={item.data}
                  renderItem={renderRecommended}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                />
              </View>
            </Animated.View>
          );

        case "space":
          return <View style={{ height: 80 }} />;

        default:
          return null;
      }
    };

    return (
      <SafeAreaView style={globalStyles.container}>
        <Animated.View
          style={[
            globalStyles.header,
            {
              opacity: headerOpacity,
              transform: [{ translateY: headerTranslateY }],
            },
          ]}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={globalStyles.logo}
          />

          <Animated.View
            style={[
              globalStyles.searchContainer,
              searchFocused && globalStyles.searchContainerFocused,
              { transform: [{ scale: searchScale }] },
            ]}
          >
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput
              placeholder="Search novel, author, or genre..."
              style={globalStyles.search}
              placeholderTextColor="#999"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </Animated.View>

          <TouchableOpacity
            style={globalStyles.notificationBtn}
            onPress={handleNotificationPress}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </Animated.View>
            <View style={globalStyles.notificationBadge} />
          </TouchableOpacity>
        </Animated.View>

        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    );
  }