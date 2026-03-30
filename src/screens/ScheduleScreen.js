import React, { useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { globalStyles } from "../styles/globalStyles";
import ReleaseDayCard from "../components/schedule/ReleaseDayCard";
import { RELEASE_SCHEDULE } from "../data/releaseSchedule";

export default function ScheduleScreen() {
  const [schedule] = useState(RELEASE_SCHEDULE);
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.scheduleHeader}>
        <Text style={globalStyles.scheduleHeaderTitle}>Jadwal Rilis</Text>

        <TouchableOpacity style={globalStyles.scheduleAddButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setSelectedFilter(filter.id)}
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.scheduleScrollContent}
      >
        {filteredSchedule.length ? (
          filteredSchedule.map((day) => (
            <ReleaseDayCard key={day.id} dayData={day} />
          ))
        ) : (
          <View style={globalStyles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#ccc" />
            <Text style={globalStyles.emptyText}>
              Tidak ada jadwal rilis untuk filter ini
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
