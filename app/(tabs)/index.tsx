import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";
import { useShop } from "../../context/ShopContext";

export default function HomeScreen() {
    const { products, categories, fetchProducts, fetchCategories, user } =
        useShop();
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [loadingRefresh, setLoadingRefresh] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoadingRefresh(true);
            await Promise.all([fetchProducts(), fetchCategories()]);
            setLoadingRefresh(false);
        };
        loadData();
        // Fetch once when the home screen mounts; context actions are not memoized.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredProducts = products.filter((p) => {
        const matchSearch = p.productName
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchCat =
            selectedCategory === "Semua" ||
            p.categoryId ===
                categories.find((c) => c.categoryName === selectedCategory)?.id;
        return matchSearch && matchCat;
    });

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#f8fafc", "#ecfeff", "#fff7ed"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.screenGradient}
            >
                <FlatList
                    data={loadingRefresh ? [] : filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.gridRow}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={
                        <View>
                            <LinearGradient
                                colors={["#101820", "#0f766e", "#d97706"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.header}
                            >
                                <View style={styles.headerTop}>
                                    <View style={styles.headerTextGroup}>
                                        <Text style={styles.subGreeting}>
                                            Halo, {user?.name || "Mahasiswa"}
                                        </Text>
                                        <Text style={styles.mainGreeting}>
                                            Proyek Akhir Kelompok
                                        </Text>
                                    </View>
                                    <View style={styles.headerBadge}>
                                        <FontAwesome
                                            name="star"
                                            size={12}
                                            color="#facc15"
                                        />
                                        <Text style={styles.headerBadgeText}>
                                            Premium
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.headerCopy}>
                                    Pilih produk terbaik dengan tampilan katalog
                                    yang lebih elegan.
                                </Text>

                                <View style={styles.summaryRow}>
                                    <View style={styles.summaryItem}>
                                        <Text style={styles.summaryValue}>
                                            {products.length}
                                        </Text>
                                        <Text style={styles.summaryLabel}>
                                            Produk
                                        </Text>
                                    </View>
                                    <View style={styles.summaryDivider} />
                                    <View style={styles.summaryItem}>
                                        <Text style={styles.summaryValue}>
                                            {Math.max(categories.length - 1, 0)}
                                        </Text>
                                        <Text style={styles.summaryLabel}>
                                            Kategori
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>

                            <View style={styles.searchShell}>
                                <FontAwesome
                                    name="search"
                                    size={16}
                                    color="#64748b"
                                />
                                <TextInput
                                    placeholder="Cari produk di proyek ini..."
                                    placeholderTextColor="#94a3b8"
                                    value={search}
                                    onChangeText={setSearch}
                                    style={styles.searchInput}
                                />
                            </View>

                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Kategori
                                </Text>
                                <Text style={styles.sectionMeta}>
                                    {filteredProducts.length} item
                                </Text>
                            </View>

                            <View style={styles.categoryContainer}>
                                <FlatList
                                    data={categories}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        const isActive =
                                            selectedCategory ===
                                            item.categoryName;

                                        return (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setSelectedCategory(
                                                        item.categoryName,
                                                    )
                                                }
                                                activeOpacity={0.85}
                                                style={styles.categoryTouch}
                                            >
                                                {isActive ? (
                                                    <LinearGradient
                                                        colors={[
                                                            "#0f766e",
                                                            "#4f46e5",
                                                        ]}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={
                                                            styles.categoryBadge
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.categoryTextActive
                                                            }
                                                        >
                                                            {item.categoryName}
                                                        </Text>
                                                    </LinearGradient>
                                                ) : (
                                                    <View
                                                        style={[
                                                            styles.categoryBadge,
                                                            styles.categoryBadgeInactive,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.categoryText
                                                            }
                                                        >
                                                            {item.categoryName}
                                                        </Text>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </View>

                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Katalog Produk
                                </Text>
                                <Text style={styles.sectionMeta}>
                                    {selectedCategory}
                                </Text>
                            </View>
                        </View>
                    }
                    ListEmptyComponent={
                        loadingRefresh ? (
                            <View style={styles.loadingState}>
                                <ActivityIndicator
                                    size="large"
                                    color="#0f766e"
                                />
                                <Text style={styles.loadingText}>
                                    Memuat katalog...
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.emptyState}>
                                <LinearGradient
                                    colors={["#f8fafc", "#ecfeff"]}
                                    style={styles.emptyIcon}
                                >
                                    <FontAwesome
                                        name="shopping-bag"
                                        size={28}
                                        color="#0f766e"
                                    />
                                </LinearGradient>
                                <Text style={styles.emptyTitle}>
                                    Produk belum ditemukan
                                </Text>
                                <Text style={styles.emptyCopy}>
                                    Coba ganti kata kunci atau pilih kategori
                                    lain.
                                </Text>
                            </View>
                        )
                    }
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() =>
                                router.push({
                                    pathname: "/product/[id]",
                                    params: { id: item.id },
                                })
                            }
                        />
                    )}
                />
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    screenGradient: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 28,
    },
    header: {
        borderRadius: 28,
        padding: 20,
        marginBottom: 16,
        overflow: "hidden",
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
        elevation: 8,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 14,
    },
    headerTextGroup: {
        flex: 1,
    },
    subGreeting: {
        color: "#d1fae5",
        fontSize: 13,
        fontWeight: "600",
    },
    mainGreeting: {
        color: "#ffffff",
        fontSize: 26,
        fontWeight: "800",
        marginTop: 4,
    },
    headerBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255, 255, 255, 0.16)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.22)",
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    headerBadgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "700",
    },
    headerCopy: {
        color: "#ecfeff",
        fontSize: 14,
        lineHeight: 21,
        marginTop: 14,
        maxWidth: 280,
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.14)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.18)",
        borderRadius: 18,
        marginTop: 18,
        paddingVertical: 14,
    },
    summaryItem: {
        flex: 1,
        alignItems: "center",
    },
    summaryValue: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "800",
    },
    summaryLabel: {
        color: "#d1fae5",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 2,
    },
    summaryDivider: {
        width: 1,
        height: 34,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    searchShell: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#ffffff",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        paddingHorizontal: 14,
        marginBottom: 18,
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 18,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "600",
        paddingVertical: 13,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    sectionTitle: {
        color: "#0f172a",
        fontSize: 17,
        fontWeight: "800",
    },
    sectionMeta: {
        color: "#64748b",
        fontSize: 12,
        fontWeight: "700",
    },
    categoryContainer: {
        marginBottom: 18,
    },
    categoryTouch: {
        marginRight: 10,
    },
    categoryBadge: {
        minHeight: 38,
        justifyContent: "center",
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 9,
    },
    categoryBadgeInactive: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    categoryText: {
        color: "#475569",
        fontWeight: "700",
        fontSize: 13,
    },
    categoryTextActive: {
        color: "#ffffff",
        fontWeight: "800",
        fontSize: 13,
    },
    gridRow: {
        justifyContent: "space-between",
        gap: 12,
    },
    loadingState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 54,
    },
    loadingText: {
        color: "#64748b",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 12,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        padding: 24,
        marginTop: 6,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    emptyTitle: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
    },
    emptyCopy: {
        color: "#64748b",
        fontSize: 13,
        lineHeight: 19,
        textAlign: "center",
        marginTop: 6,
    },
});
