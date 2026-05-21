// screens/BookListScreen.js
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    Animated,
    Image,
    TextInput,
    ScrollView,
    Dimensions,
    StatusBar,
    RefreshControl,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { getBooks, deleteBook } from "../services/BookService";

const { width, height } = Dimensions.get("window");

export default function BookListScreen({ navigation }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    const headerScale = useRef(new Animated.Value(1)).current;

    const categories = [
        "Semua",
        "Fiksi",
        "Non-Fiksi",
        "Misteri",
        "Romance",
        "Science Fiction",
        "Fantasy",
        "Biografi",
        "Sejarah",
        "Self-Help",
        "Puisi",
        "Thriller",
        "Horror",
        "Komik",
        "Pendidikan",
        "Agama",
        "Lainnya",
    ];

    // Fungsi untuk mengambil data buku dari database
    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getBooks();
            setBooks(data || []);
        } catch (error) {
            console.error("Error fetching books:", error);
            Alert.alert("Error", "Gagal mengambil data buku");
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk refresh (pull to refresh)
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchBooks();
        setRefreshing(false);
    }, [fetchBooks]);

    // Effect untuk load data pertama kali
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Animasi masuk
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Refresh buku setiap kali kembali dari InputBookScreen
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchBooks(); // Refresh data saat kembali ke halaman ini
        });

        return unsubscribe;
    }, [navigation, fetchBooks]);

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(buttonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleAddBook = () => {
        animateButton();
        navigation.navigate('InputBook', { mode: 'add' });
    };

    const handleEditBook = (book) => {
        animateButton();
        navigation.navigate('InputBook', {
            mode: 'edit',
            bookData: book
        });
    };

    const handleDeleteBook = (bookId) => {
        Alert.alert(
            "Hapus Buku",
            "Apakah Anda yakin ingin menghapus buku ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteBook(bookId);
                            Alert.alert("Sukses", "Buku berhasil dihapus");
                            fetchBooks(); // Refresh data setelah hapus
                        } catch (error) {
                            console.error("Error deleting book:", error);
                            Alert.alert("Error", "Gagal menghapus buku");
                        }
                    },
                },
            ]
        );
    };

    // Filter buku berdasarkan search dan kategori
    const filteredBooks = books.filter(book => {
        const matchesSearch = searchQuery === "" ||
            (book.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "Semua" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const renderStars = (rating) => {
        let stars = [];
        const numRating = rating || 4;
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= numRating ? "star" : "star-outline"}
                    size={14}
                    color={i <= numRating ? "#FFB800" : "#ccc"}
                />
            );
        }
        return stars;
    };

    const renderBookItem = ({ item, index }) => (
        <Animated.View
            style={[
                globalStyles.newBookCard,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <TouchableOpacity
                onPress={() => handleEditBook(item)}
                activeOpacity={0.8}
            >
                <View style={globalStyles.newBookCardContent}>
                    <View style={globalStyles.newBookCoverContainer}>
                        {item.cover ? (
                            <Image source={{ uri: item.cover }} style={globalStyles.newBookThumbnail} />
                        ) : (
                            <View style={globalStyles.newBookCoverPlaceholder}>
                                <Ionicons name="book" size={45} color="#2200ff" />
                            </View>
                        )}
                    </View>

                    <View style={globalStyles.newBookInfo}>
                        <Text style={globalStyles.newBookTitle} numberOfLines={1}>
                            {item.title || "Tanpa Judul"}
                        </Text>
                        <Text style={globalStyles.newBookAuthor}>
                            <Ionicons name="person-outline" size={12} color="#666" /> {item.author || "Tanpa Penulis"}
                        </Text>

                        <View style={globalStyles.newBookRating}>
                            {renderStars(item.rating)}
                            <Text style={globalStyles.newBookRatingText}>
                                {item.rating || 4}
                            </Text>
                        </View>

                        {item.category && (
                            <View style={globalStyles.newBookCategoryBadge}>
                                <Text style={globalStyles.newBookCategoryText}>{item.category}</Text>
                            </View>
                        )}

                        <Text style={globalStyles.newBookDescription} numberOfLines={2}>
                            {item.description || "Tidak ada deskripsi"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={globalStyles.newDeleteButton}
                        onPress={() => handleDeleteBook(item.id)}
                    >
                        <Ionicons name="trash-outline" size={20} color="#ff4444" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView style={globalStyles.newContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            {/* Header */}
            <Animated.View style={[globalStyles.newHeader, {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: headerScale }],
            }]}>
                <View>
                    <Text style={globalStyles.newHeaderTitle}>📚 Perpustakaan Saya</Text>
                    <Text style={globalStyles.newHeaderSubtitle}>
                        {books.length} Buku • {filteredBooks.length} Tersedia
                    </Text>
                </View>

                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity
                        style={globalStyles.newAddButton}
                        onPress={handleAddBook}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {/* Search Bar */}
            <Animated.View style={[globalStyles.newSearchWrapper, {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }]}>
                <View style={[
                    globalStyles.newSearchContainer,
                    isSearchFocused && globalStyles.newSearchContainerFocused
                ]}>
                    <Ionicons name="search-outline" size={20} color="#999" />
                    <TextInput
                        style={globalStyles.newSearchInput}
                        placeholder="Cari buku atau penulis..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchQuery !== "" && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            {/* Category Filter */}
            <View style={globalStyles.newCategoryContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={globalStyles.newCategoryScroll}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                globalStyles.newFilterChip,
                                selectedCategory === category && globalStyles.newFilterChipActive,
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    globalStyles.newFilterChipText,
                                    selectedCategory === category && globalStyles.newFilterChipTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* List Buku atau Empty State */}
            {loading && books.length === 0 ? (
                <View style={globalStyles.newEmptyState}>
                    <Ionicons name="reload-outline" size={50} color="#ccc" />
                    <Text style={globalStyles.newEmptyStateText}>Memuat data...</Text>
                </View>
            ) : filteredBooks.length === 0 ? (
                <View style={globalStyles.newEmptyState}>
                    <View style={globalStyles.newEmptyStateIcon}>
                        <Ionicons name="book-outline" size={80} color="#ccc" />
                    </View>
                    <Text style={globalStyles.newEmptyStateText}>
                        {searchQuery || selectedCategory !== "Semua"
                            ? "Tidak ada buku yang ditemukan"
                            : "Belum ada buku di perpustakaan"}
                    </Text>
                    <Text style={globalStyles.newEmptyStateSubtext}>
                        {searchQuery || selectedCategory !== "Semua"
                            ? "Coba dengan kata kunci atau kategori yang berbeda"
                            : "Mulai tambahkan buku pertamamu sekarang!"}
                    </Text>
                    {(!searchQuery && selectedCategory === "Semua") && (
                        <TouchableOpacity
                            style={globalStyles.newEmptyStateButton}
                            onPress={handleAddBook}
                        >
                            <Ionicons name="add-circle-outline" size={20} color="#fff" />
                            <Text style={globalStyles.newEmptyStateButtonText}>Tambah Buku Baru</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <FlatList
                    data={filteredBooks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderBookItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={globalStyles.newBookList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#2200ff"]}
                            tintColor="#2200ff"
                        />
                    }
                />
            )}

            {/* Floating Action Button */}
            <TouchableOpacity
                style={globalStyles.newFabButton}
                onPress={handleAddBook}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}