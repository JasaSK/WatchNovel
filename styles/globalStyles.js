import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchContainerFocused: {
    borderWidth: 1,
    borderColor: "#2200ff",
    backgroundColor: "#fff",
  },
  search: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    padding: 0,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff4444",
  },

  // Welcome Section
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  profileBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#2200ff",
  },

  // Categories
  categoriesList: {
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: "center",
    width: 64,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: "#666",
  },

  // Novel Cards
  novelsList: {
    marginBottom: 8,
  },
  novelsContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  novelCard: {
    width: 130,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  novelImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f5f5f5",
  },
  novelInfo: {
    padding: 8,
  },
  novelTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  novelAuthor: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: "#666",
  },

  // Continue Reading
  continueCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 8,
  },
  continueImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
  continueInfo: {
    flex: 1,
    marginLeft: 12,
  },
  continueTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  continueAuthor: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2200ff",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: "#999",
  },

  // Recommended
  recommendedList: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 16,
  },
  recommendedCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  recommendedImage: {
    width: "100%",
    height: 110,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    marginBottom: 6,
  },
  recommendedTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  recommendedAuthor: {
    fontSize: 10,
    color: "#999",
    marginBottom: 4,
  },
  recommendedRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  recommendedRatingText: {
    fontSize: 10,
    color: "#666",
  },
});
