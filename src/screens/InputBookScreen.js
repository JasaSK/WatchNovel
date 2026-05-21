// screens/InputBookScreen.js
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Animated,
    Platform,
    Image,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { globalStyles } from "../styles/globalStyles";
import { addBook, updateBook } from "../services/BookService";

export default function InputBookScreen({ navigation, route }) {
    const { mode, bookData } = route.params || { mode: 'add', bookData: null };
    const isEditMode = mode === 'edit';

    const [formData, setFormData] = useState({
        id: bookData?.id || null,
        title: bookData?.title || "",
        author: bookData?.author || "",
        description: bookData?.description || "",
        cover: bookData?.cover || null,
        category: bookData?.category || "",
        rating: bookData?.rating || 4,
    });

    const [loading, setLoading] = useState(false);

    const animations = {
        container: {
            opacity: useRef(new Animated.Value(0)).current,
            translateY: useRef(new Animated.Value(50)).current,
        },
        header: {
            opacity: useRef(new Animated.Value(0)).current,
            translateY: useRef(new Animated.Value(-30)).current,
        },
        buttonScale: useRef(new Animated.Value(1)).current,
    };

    useEffect(() => {
        // Request permission untuk akses gallery
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Needed', 'Please grant permission to access your photos');
            }
        })();

        Animated.parallel([
            Animated.timing(animations.container.opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(animations.container.translateY, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(animations.header.opacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(animations.header.translateY, {
                toValue: 0,
                friction: 7,
                tension: 35,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData((prev) => ({ ...prev, cover: result.assets[0].uri }));
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Needed', 'Please grant camera permission');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData((prev) => ({ ...prev, cover: result.assets[0].uri }));
        }
    };

    const showImagePickerOptions = () => {
        Alert.alert(
            "Pilih Cover Buku",
            "Pilih sumber gambar",
            [
                { text: "Batal", style: "cancel" },
                { text: "Ambil Foto", onPress: takePhoto },
                { text: "Pilih dari Galeri", onPress: pickImage },
            ]
        );
    };

    const animateButton = () => {
        return Animated.sequence([
            Animated.timing(animations.buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(animations.buttonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleSubmit = async () => {
        animateButton();

        if (!formData.title) {
            Alert.alert("Error", "Mohon isi nama buku");
            return;
        }

        if (!formData.author) {
            Alert.alert("Error", "Mohon isi nama penulis");
            return;
        }

        setLoading(true);

        try {
            if (isEditMode) {
                // Update buku yang sudah ada
                await updateBook(formData.id, {
                    title: formData.title,
                    author: formData.author,
                    description: formData.description,
                    cover: formData.cover,
                    category: formData.category,
                    rating: formData.rating,
                });

                Alert.alert("Sukses", `Buku "${formData.title}" berhasil diperbarui!`, [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]);
            } else {
                // Tambah buku baru
                await addBook({
                    title: formData.title,
                    author: formData.author,
                    description: formData.description,
                    cover: formData.cover,
                    category: formData.category,
                    rating: formData.rating,
                });

                Alert.alert("Sukses", `Buku "${formData.title}" berhasil ditambahkan!`, [
                    {
                        text: "OK",
                        onPress: () => {
                            setFormData({
                                id: null,
                                title: "",
                                author: "",
                                description: "",
                                cover: null,
                                category: "",
                                rating: 4,
                            });
                            navigation.goBack();
                        },
                    },
                ]);
            }
        } catch (error) {
            console.error("Error saving book:", error);
            Alert.alert("Error", isEditMode ? "Gagal memperbarui buku" : "Gagal menambahkan buku");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        animateButton();
        Alert.alert(
            "Batal",
            "Apakah Anda yakin ingin membatalkan?",
            [
                { text: "Tidak", style: "cancel" },
                {
                    text: "Ya",
                    style: "destructive",
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    const categories = [
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

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Platform.OS === "ios" ? 120 : 100,
                }}
            >
                <Animated.View
                    style={[
                        globalStyles.inputBookHeader,
                        {
                            opacity: animations.header.opacity,
                            transform: [{ translateY: animations.header.translateY }],
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={handleCancel}
                        style={globalStyles.backButton}
                    >
                        <Ionicons name="close-outline" size={28} color="#333" />
                    </TouchableOpacity>
                    <Text style={globalStyles.inputBookTitle}>
                        {isEditMode ? "Edit Buku" : "Tambah Buku Baru"}
                    </Text>
                    <View style={{ width: 40 }} />
                </Animated.View>

                <Animated.View
                    style={[
                        globalStyles.inputBookForm,
                        {
                            opacity: animations.container.opacity,
                            transform: [{ translateY: animations.container.translateY }],
                        },
                    ]}
                >
                    <View style={globalStyles.formCard}>
                        {/* Cover Buku */}
                        <View style={globalStyles.coverContainer}>
                            <Text style={globalStyles.inputLabel}>Cover Buku</Text>
                            <TouchableOpacity
                                style={globalStyles.coverPicker}
                                onPress={showImagePickerOptions}
                            >
                                {formData.cover ? (
                                    <Image
                                        source={{ uri: formData.cover }}
                                        style={globalStyles.coverImage}
                                    />
                                ) : (
                                    <View style={globalStyles.coverPlaceholder}>
                                        <Ionicons name="camera-outline" size={50} color="#ccc" />
                                        <Text style={globalStyles.coverPlaceholderText}>
                                            Tap untuk pilih cover
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Nama Buku */}
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>
                                Nama Buku <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Masukkan nama buku"
                                placeholderTextColor="#999"
                                value={formData.title}
                                onChangeText={(text) => handleInputChange("title", text)}
                                editable={!loading}
                            />
                        </View>

                        {/* Nama Penulis */}
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>
                                Nama Penulis <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Masukkan nama penulis"
                                placeholderTextColor="#999"
                                value={formData.author}
                                onChangeText={(text) => handleInputChange("author", text)}
                                editable={!loading}
                            />
                        </View>

                        {/* Rating Buku */}
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>Rating Buku</Text>
                            <View style={globalStyles.ratingContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => handleInputChange("rating", star)}
                                        disabled={loading}
                                    >
                                        <Ionicons
                                            name={star <= formData.rating ? "star" : "star-outline"}
                                            size={32}
                                            color={star <= formData.rating ? "#FFB800" : "#ccc"}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Kategori Buku */}
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>Kategori Buku</Text>
                            <View style={globalStyles.pickerContainer}>
                                <View style={globalStyles.genreScrollContainer}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {categories.map((category) => (
                                            <TouchableOpacity
                                                key={category}
                                                style={[
                                                    globalStyles.genreChip,
                                                    formData.category === category && globalStyles.genreChipActive,
                                                ]}
                                                onPress={() => handleInputChange("category", category)}
                                                disabled={loading}
                                            >
                                                <Text
                                                    style={[
                                                        globalStyles.genreChipText,
                                                        formData.category === category &&
                                                        globalStyles.genreChipTextActive,
                                                    ]}
                                                >
                                                    {category}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                        {/* Deskripsi Buku */}
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>Deskripsi Buku</Text>
                            <TextInput
                                style={[globalStyles.input, globalStyles.textArea]}
                                placeholder="Masukkan deskripsi buku"
                                placeholderTextColor="#999"
                                value={formData.description}
                                onChangeText={(text) => handleInputChange("description", text)}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                editable={!loading}
                            />
                        </View>

                        <View style={globalStyles.inputBookActions}>
                            <TouchableOpacity
                                style={globalStyles.cancelBookButton}
                                onPress={handleCancel}
                                disabled={loading}
                            >
                                <Text style={globalStyles.cancelBookButtonText}>Batal</Text>
                            </TouchableOpacity>

                            <Animated.View
                                style={{ transform: [{ scale: animations.buttonScale }], flex: 2 }}
                            >
                                <TouchableOpacity
                                    style={[globalStyles.submitBookButton, loading && { opacity: 0.7 }]}
                                    onPress={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Ionicons name="reload-outline" size={24} color="#fff" />
                                    ) : (
                                        <Ionicons
                                            name={isEditMode ? "save-outline" : "add-circle-outline"}
                                            size={24}
                                            color="#fff"
                                        />
                                    )}
                                    <Text style={globalStyles.submitBookButtonText}>
                                        {loading ? "Memproses..." : (isEditMode ? "Update Buku" : "Simpan Buku")}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}