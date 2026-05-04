import React, { useState, useMemo, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { globalStyles } from "../styles/globalStyles";
import ReleaseDayCard from "../components/schedule/ReleaseDayCard";
import { RELEASE_SCHEDULE } from "../data/releaseSchedule";

import { animations, useScaleAnimation } from "../utils/animations";

const AnimatedFilterButton = ({ filter, selected, onPress, index }) => {
  const { scale, scalePress, scaleReset } = useScaleAnimation(1);
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      animations.parallel([
        animations.fadeIn(opacity, 400, index * 100),
        animations.slideInUp(translateY, 400, index * 100),
      ]).start();
    }, 300);

    return () => clearTimeout(timeout);
  }, [index]);

  const handlePressIn = () => scalePress(0.95);
  const handlePressOut = () => scaleReset();

  return (
    <Animated.View
      style={{
        transform: [{ translateY }, { scale }],
        opacity,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          handlePressIn();
          setTimeout(() => {
            handlePressOut();
            onPress();
          }, 100);
        }}
        style={[
          globalStyles.filterButton,
          selected && globalStyles.filterButtonActive,
        ]}
      >
        <Text
          style={[
            globalStyles.filterText,
            selected && globalStyles.filterTextActive,
          ]}
        >
          {filter.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const AnimatedEmptyState = () => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotateZ = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animations.parallel([
      animations.scaleIn(scale, 1, 500),
      animations.fadeIn(opacity, 500),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateZ, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateZ, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotateZ.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        globalStyles.emptyContainer,
        {
          transform: [{ scale }, { rotate: rotateInterpolate }],
          opacity,
        },
      ]}
    >
      <Ionicons name="calendar-outline" size={64} color="#ccc" />
      <Text style={globalStyles.emptyText}>
        Tidak ada jadwal rilis untuk filter ini
      </Text>
    </Animated.View>
  );
};

const AnimatedReleaseDayCard = ({ dayData, index }) => {
  const translateX = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      animations.parallel([
        animations.fadeIn(opacity, 500, index * 150),
        animations.slideInLeft(translateX, 500, index * 150),
        animations.scaleIn(cardScale, 1, 400, index * 150),
      ]).start();
    }, 500);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX }, { scale: cardScale }],
        opacity,
      }}
    >
      <ReleaseDayCard dayData={dayData} />
    </Animated.View>
  );
};

export default function ScheduleScreen() {
  const [schedule] = useState(RELEASE_SCHEDULE);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-50)).current;
  const headerButtonScale = useRef(new Animated.Value(0)).current;

  const filters = [
    { id: "all", label: "Semua" },
    { id: "today", label: "Hari Ini" },
    { id: "week", label: "Minggu Ini" },
  ];

  const filteredSchedule = useMemo(() => {
    if (selectedFilter === "all") return schedule;

    const today = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
    });

    const todayName =
      today.charAt(0).toUpperCase() + today.slice(1).toLowerCase();

    if (selectedFilter === "today") {
      return schedule.filter((day) => day.day === todayName);
    }

    if (selectedFilter === "week") {
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];

      const todayIndex = days.indexOf(todayName);

      return schedule.filter((day) => {
        const dayIndex = days.indexOf(day.day);

        let diff = dayIndex - todayIndex;
        if (diff < 0) diff += 7;

        return diff >= 0 && diff < 7;
      });
    }

    return schedule;
  }, [schedule, selectedFilter]);

  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFilterChange = (filterId) => {
    Animated.parallel([
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedFilter(filterId);

      Animated.parallel([
        Animated.timing(fadeOutAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  useEffect(() => {
    animations.parallel([
      animations.fadeIn(headerOpacity, 600),
      animations.slideInUp(headerTranslateY, 600),
    ]).start();

    Animated.spring(headerButtonScale, {
      toValue: 1,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Animated.View
        style={[
          globalStyles.scheduleHeader,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <Text style={globalStyles.scheduleHeaderTitle}>Jadwal Rilis</Text>

        <Animated.View style={{ transform: [{ scale: headerButtonScale }] }}>
          <TouchableOpacity
            style={globalStyles.scheduleAddButton}
            onPress={() => {
              Animated.sequence([
                Animated.timing(headerButtonScale, {
                  toValue: 0.7,
                  duration: 100,
                  useNativeDriver: true,
                }),
                Animated.spring(headerButtonScale, {
                  toValue: 1,
                  friction: 3,
                  tension: 40,
                  useNativeDriver: true,
                }),
              ]).start();
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <View style={globalStyles.filterContainer}>
        {filters.map((filter, index) => (
          <AnimatedFilterButton
            key={filter.id}
            filter={filter}
            selected={selectedFilter === filter.id}
            onPress={() => handleFilterChange(filter.id)}
            index={index}
          />
        ))}
      </View>

      <Animated.View
        style={{
          flex: 1,
          opacity: fadeOutAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={globalStyles.scheduleScrollContent}
        >
          {filteredSchedule.length ? (
            filteredSchedule.map((day, index) => (
              <AnimatedReleaseDayCard key={day.id} dayData={day} index={index} />
            ))
          ) : (
            <AnimatedEmptyState />
          )}

          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}