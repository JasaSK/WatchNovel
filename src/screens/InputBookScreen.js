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

export default function InputBookScreen({ navigation }) {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        description: "",
        cover: null,
        category: "",
    });

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
        setBookData((prev) => ({ ...prev, [field]: value }));
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setBookData((prev) => ({ ...prev, cover: result.assets[0].uri }));
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
            setBookData((prev) => ({ ...prev, cover: result.assets[0].uri }));
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

    const handleSubmit = () => {
        animateButton();

        if (!bookData.title) {
            Alert.alert("Error", "Mohon isi nama buku");
            return;
        }

        if (!bookData.author) {
            Alert.alert("Error", "Mohon isi nama penulis");
            return;
        }

        Alert.alert(
            "Sukses",
            `Buku "${bookData.title}" berhasil ditambahkan!`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        setBookData({
                            title: "",
                            author: "",
                            description: "",
                            cover: null,
                            category: "",
                        });
                        navigation.goBack();
                    },
                },
            ]
        );
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
                    <Text style={globalStyles.inputBookTitle}>Tambah Buku Baru</Text>
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
                                {bookData.cover ? (
                                    <Image
                                        source={{ uri: bookData.cover }}
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
                                value={bookData.title}
                                onChangeText={(text) => handleInputChange("title", text)}
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
                                value={bookData.author}
                                onChangeText={(text) => handleInputChange("author", text)}
                            />
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
                                                    bookData.category === category && globalStyles.genreChipActive,
                                                ]}
                                                onPress={() => handleInputChange("category", category)}
                                            >
                                                <Text
                                                    style={[
                                                        globalStyles.genreChipText,
                                                        bookData.category === category &&
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
                                value={bookData.description}
                                onChangeText={(text) => handleInputChange("description", text)}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>

                        <View style={globalStyles.inputBookActions}>
                            <TouchableOpacity
                                style={globalStyles.cancelBookButton}
                                onPress={handleCancel}
                            >
                                <Text style={globalStyles.cancelBookButtonText}>Batal</Text>
                            </TouchableOpacity>

                            <Animated.View
                                style={{ transform: [{ scale: animations.buttonScale }], flex: 2 }}
                            >
                                <TouchableOpacity
                                    style={globalStyles.submitBookButton}
                                    onPress={handleSubmit}
                                >
                                    <Ionicons name="add-circle-outline" size={24} color="#fff" />
                                    <Text style={globalStyles.submitBookButtonText}>
                                        Simpan Buku
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