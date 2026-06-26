import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useShop } from "../../context/ShopContext";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { products, addToCart } = useShop();
  const router = useRouter();

  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <LinearGradient
        colors={["#f8fafc", "#ecfeff", "#fff7ed"]}
        style={styles.centerContainer}
      >
        <View style={styles.notFoundCard}>
          <FontAwesome name="exclamation-circle" size={30} color="#d97706" />
          <Text style={styles.notFoundText}>Produk Tidak Ditemukan</Text>
        </View>
      </LinearGradient>
    );
  }

  const handleAddToCart = async () => {
    if (qty > product.productStock) {
      Alert.alert("Gagal", "Jumlah melebihi batas stok aktif proyek.");
      return;
    }
    const success = await addToCart(product.id, qty);
    if (success) {
      Alert.alert("Sukses", "Item berhasil masuk ke keranjang belanja.", [
        { text: "Tetap Disini" },
        { text: "Lihat Cart", onPress: () => router.push("/(tabs)/cart") },
      ]);
    }
  };

  return (
    <LinearGradient
      colors={["#f8fafc", "#ecfeff", "#fff7ed"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#101820", "#0f766e", "#d97706"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.imageBigPlaceholder}
        >
          <View style={styles.productIconCircle}>
            <FontAwesome name="cube" size={42} color="#0f766e" />
          </View>
          <Text style={styles.imageBigText}>Pratinjau Gambar Produk</Text>
        </LinearGradient>

        <View style={styles.productHeader}>
          <View style={styles.titleBadge}>
            <FontAwesome name="diamond" size={12} color="#f59e0b" />
            <Text style={styles.titleBadgeText}>Produk Premium</Text>
          </View>
          <Text style={styles.title}>{product.productName}</Text>
          <Text style={styles.price}>
            Rp {product.productPrice.toLocaleString("id-ID")}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>Deskripsi</Text>
          <Text style={styles.description}>{product.productDescription}</Text>
        </View>

        <View style={styles.detailGrid}>
          <View style={styles.detailTile}>
            <View style={styles.detailIcon}>
              <FontAwesome name="archive" size={16} color="#0f766e" />
            </View>
            <Text style={styles.detailLabel}>Stok aktif</Text>
            <Text style={styles.detailValue}>{product.productStock}</Text>
          </View>

          <View style={styles.detailTile}>
            <View style={styles.detailIcon}>
              <FontAwesome name="tags" size={16} color="#4f46e5" />
            </View>
            <Text style={styles.detailLabel}>Kategori ID</Text>
            <Text style={styles.detailValue}>#{product.categoryId}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.qtyContainer}>
            <View style={styles.qtyCopy}>
              <Text style={styles.qtyLabel}>
                Atur Jumlah (Stok: {product.productStock})
              </Text>
              <Text style={styles.qtyHint}>
                Sesuaikan jumlah sebelum checkout.
              </Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                onPress={() => setQty(Math.max(1, qty - 1))}
                style={styles.qtyBtn}
                activeOpacity={0.82}
              >
                <FontAwesome name="minus" size={12} color="#0f172a" />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity
                onPress={() => setQty(qty + 1)}
                style={styles.qtyBtn}
                activeOpacity={0.82}
              >
                <FontAwesome name="plus" size={12} color="#0f172a" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleAddToCart} activeOpacity={0.88}>
            <LinearGradient
              colors={["#0f766e", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButton}
            >
              <FontAwesome name="cart-plus" size={16} color="#ffffff" />
              <Text style={styles.primaryButtonText}>
                Tambah Ke Keranjang Belanja
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 22,
    padding: 24,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  notFoundText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 10,
  },
  imageBigPlaceholder: {
    width: "100%",
    height: 260,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.2,
    shadowRadius: 28,
    elevation: 8,
  },
  productIconCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.58)",
    marginBottom: 14,
  },
  imageBigText: {
    color: "#ecfeff",
    fontWeight: "800",
    fontSize: 13,
  },
  productHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  titleBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#fff7ed",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  titleBadgeText: {
    color: "#92400e",
    fontSize: 11,
    fontWeight: "900",
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#0f172a",
    lineHeight: 31,
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f766e",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  sectionLabel: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    fontWeight: "500",
  },
  detailGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  detailTile: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    padding: 14,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    marginBottom: 12,
  },
  detailLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },
  detailValue: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4,
  },
  footer: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 24,
    padding: 16,
  },
  qtyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  qtyCopy: {
    flex: 1,
  },
  qtyLabel: {
    color: "#0f172a",
    fontSize: 13,
    fontWeight: "900",
  },
  qtyHint: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 999,
    padding: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  qtyValue: {
    minWidth: 34,
    color: "#0f172a",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 15,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#0f766e",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
  },
});
