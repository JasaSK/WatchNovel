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

  // ========== JADWAL RILIS NOVEL ==========

  // Header Schedule
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  scheduleHeaderTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  scheduleHeaderSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  scheduleAddButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2200ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2200ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // Filter
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  filterButtonActive: {
    backgroundColor: "#2200ff",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
  },

  // Stats
  releaseStats: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 8,
  },

  // Legend
  legendContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  // Scroll Content
  scheduleScrollContent: {
    paddingHorizontal: 20,
  },

  // Day Card
  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fafafa",
  },
  dayName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dayDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  dayStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  statText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  dayContent: {
    padding: 8,
  },

  // Release Item
  releaseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fff",
  },
  releaseCover: {
    width: 50,
    height: 65,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
    marginRight: 12,
  },
  releaseCoverPlaceholder: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  releaseInfo: {
    flex: 1,
    marginRight: 8,
  },
  releaseTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  releaseAuthor: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  releaseMeta: {
    flexDirection: "row",
    gap: 12,
  },
  releaseMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  releaseMetaText: {
    fontSize: 11,
    color: "#999",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 65,
    alignItems: "center",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
  delayNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  delayNoteText: {
    fontSize: 10,
    color: "#FF9800",
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  emptyStateButton: {
    backgroundColor: "#2200ff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  emptyStateButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Add these to your existing globalStyles object

  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  backButton: {
    padding: 5,
  },

  profileHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  editButton: {
    padding: 5,
  },

  profileImageContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  profileImageWrapper: {
    position: "relative",
    marginBottom: 12,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#2200ff",
  },

  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2200ff",
    borderRadius: 20,
    padding: 8,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },

  profileBio: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 8,
  },

  profileJoinDate: {
    fontSize: 12,
    color: "#999",
  },

  editFieldsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 16,
  },

  editActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 12,
  },

  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },

  cancelButtonText: {
    color: "#666",
    fontWeight: "500",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  statCard: {
    alignItems: "center",
    flex: 1,
  },

  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  editGoalButton: {
    padding: 4,
  },

  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },

  goalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 6,
    width: 60,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },

  progressContainer: {
    width: "80%",
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },

  progressFillStat: {
    height: "100%",
    backgroundColor: "#2200ff",
    borderRadius: 2,
  },

  progressPercentage: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },

  menuSection: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  menuSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  // styles/globalStyles.js - Tambahkan style berikut:

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 4,
    minHeight: 60, // Penting: memastikan area touch memadai
  },

  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  menuItemIcon: {
    marginRight: 12,
  },

  menuItemTextContainer: {
    flex: 1,
  },

  menuItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },

  menuItemTitleDestructive: {
    color: "#ff4444",
  },

  menuItemSubtitle: {
    fontSize: 12,
    color: "#999",
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },

  // Tambahkan ke globalStyles.js
  // History Screen Styles
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  clearButton: {
    padding: 8,
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  historyTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  historyAuthor: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  historyProgressContainer: {
    marginBottom: 8,
  },
  historyProgressBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  historyProgressFill: {
    height: "100%",
    backgroundColor: "#2200ff",
    borderRadius: 2,
  },
  historyProgressText: {
    fontSize: 11,
    color: "#666",
  },
  historyMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  historyMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyMetaText: {
    fontSize: 11,
    color: "#999",
  },
  historyContinueButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#2200ff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Library Screen Styles
  libraryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 8,
  },
  libraryHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  libraryViewButton: {
    padding: 8,
  },
  librarySearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  librarySearchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0,
  },
  libraryStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  libraryStat: {
    alignItems: "center",
    flex: 1,
  },
  libraryStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2200ff",
  },
  libraryStatLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  libraryStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#f0f0f0",
  },
  libraryCategories: {
    marginVertical: 8,
  },
  libraryCategoriesContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  libraryCategoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 4,
  },
  libraryCategoryButtonActive: {
    backgroundColor: "#2200ff",
  },
  libraryCategoryText: {
    fontSize: 14,
    color: "#666",
  },
  libraryCategoryTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  // Card styles
  libraryCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  libraryImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    marginRight: 12,
  },
  libraryInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  // Card header
  libraryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  libraryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  libraryActions: {
    flexDirection: "row",
    gap: 12,
  },
  libraryAuthor: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  // Card meta info
  libraryMeta: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  libraryMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  libraryMetaText: {
    fontSize: 11,
    color: "#999",
  },
  // Card progress
  libraryProgressContainer: {
    marginTop: 4,
  },
  libraryProgressBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  libraryProgressFill: {
    height: "100%",
    backgroundColor: "#2200ff",
    borderRadius: 2,
  },
  libraryProgressText: {
    fontSize: 11,
    color: "#666",
  },

  inputBookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  inputBookTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  inputBookForm: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  halfField: {
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  genreScrollContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  genreChipActive: {
    backgroundColor: "#2200ff",
  },
  genreChipText: {
    fontSize: 14,
    color: "#666",
  },
  genreChipTextActive: {
    color: "#fff",
  },
  inputBookActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  cancelBookButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelBookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  submitBookButton: {
    flex: 2,
    backgroundColor: "#2200ff",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitBookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  // styles/globalStyles.js - Tambahkan style berikut:

  coverContainer: {
    marginBottom: 20,
  },
  coverPicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  coverPlaceholderText: {
    marginTop: 10,
    color: '#999',
    fontSize: 14,
  },
});

