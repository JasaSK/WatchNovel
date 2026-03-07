import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

const STATUS_CONFIG = {
  released: { color: "#4CAF50", text: "Rilis", bgColor: "#E8F5E9" },
  upcoming: { color: "#2196F3", text: "Akan Datang", bgColor: "#E3F2FD" },
  delayed: { color: "#FF9800", text: "Tunda", bgColor: "#FFF3E0" },
};

export default function ReleaseItem({ item }) {
  if (!item) return null;

  const status = STATUS_CONFIG[item.status] ?? {
    color: "#999",
    text: item.status ?? "Unknown",
    bgColor: "#F5F5F5",
  };

  return (
    <TouchableOpacity style={globalStyles.releaseItem} activeOpacity={0.7}>
      {item.cover ? (
        <Image source={item.cover} style={globalStyles.releaseCover} />
      ) : (
        <View
          style={[
            globalStyles.releaseCover,
            globalStyles.releaseCoverPlaceholder,
          ]}
        >
          <Ionicons name="image-outline" size={24} color="#ccc" />
        </View>
      )}

      <View style={globalStyles.releaseInfo}>
        <Text style={globalStyles.releaseTitle} numberOfLines={2}>
          {item.title ?? "Judul Tidak Tersedia"}
        </Text>

        <Text style={globalStyles.releaseAuthor} numberOfLines={1}>
          {item.author ?? "Penulis Tidak Diketahui"}
        </Text>

        <View style={globalStyles.releaseMeta}>
          <View style={globalStyles.releaseMetaItem}>
            <Ionicons name="book-outline" size={12} color="#999" />
            <Text style={globalStyles.releaseMetaText}>
              {item.chapter ?? "Chapter ?"}
            </Text>
          </View>

          <View style={globalStyles.releaseMetaItem}>
            <Ionicons name="time-outline" size={12} color="#999" />
            <Text style={globalStyles.releaseMetaText}>
              {item.time ?? "Waktu ?"}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[globalStyles.statusBadge, { backgroundColor: status.bgColor }]}
      >
        <Text style={[globalStyles.statusText, { color: status.color }]}>
          {status.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
