import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../context/ShopContext";

const { width } = Dimensions.get("window");
const cardWidth = (width - 44) / 2;

// Interface mendefinisikan prop yang diterima oleh komponen ProductCard
interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

/**
 * Komponen Reusable ProductCard
 * Digunakan untuk merender item produk secara grid di HomeScreen.
 * Dilengkapi dengan pratinjau gambar placeholder abu-abu serta informasi stok & harga.
 */
export default function ProductCard({ product, onPress }: ProductCardProps) {
  const isLowStock = product.productStock <= 5;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.productCard}
      testID={`product-card-${product.id}`}
      activeOpacity={0.86}
    >
      <LinearGradient
        colors={["#ecfeff", "#fef3c7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.imagePlaceholder}
      >
        <View style={styles.productIconCircle}>
          <FontAwesome name="cube" size={24} color="#0f766e" />
        </View>
        <Text style={styles.imagePlaceholderText}>No Image Frame</Text>
      </LinearGradient>

      <Text style={styles.productName} numberOfLines={1}>
        {product.productName}
      </Text>

      <Text style={styles.productPrice}>
        Rp {product.productPrice.toLocaleString("id-ID")}
      </Text>

      <View style={[styles.stockBadge, isLowStock && styles.stockBadgeLow]}>
        <FontAwesome
          name="circle"
          size={6}
          color={isLowStock ? "#f97316" : "#10b981"}
        />
        <Text
          style={[styles.productStock, isLowStock && styles.productStockLow]}
        >
          Stok aktif: {product.productStock}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 20,
    width: cardWidth,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  imagePlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  productIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(15, 118, 110, 0.12)",
    marginBottom: 8,
  },
  imagePlaceholderText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
  },
  productName: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 19,
  },
  productPrice: {
    color: "#0f766e",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
  },
  stockBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ecfdf5",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 10,
  },
  stockBadgeLow: {
    backgroundColor: "#fff7ed",
  },
  productStock: {
    color: "#047857",
    fontSize: 10,
    fontWeight: "800",
  },
  productStockLow: {
    color: "#c2410c",
  },
});
