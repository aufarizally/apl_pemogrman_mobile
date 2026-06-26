import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ShopProvider, useShop } from "../context/ShopContext";

function RootContent() {
  const { token, login, register, loading } = useShop();
  const [isLoginView, setIsLoginView] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || (!isLoginView && !name)) {
      alert("Mohon isi semua bidang form!");
      return;
    }
    if (isLoginView) {
      await login(email, password);
    } else {
      const success = await register(name, email, password);
      if (success) setIsLoginView(true);
    }
  };

  if (!token) {
    return (
      <LinearGradient
        colors={["#101820", "#0f766e", "#d97706"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.authGradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.authKeyboard}
        >
          <ScrollView
            contentContainerStyle={styles.authContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.authHero}>
              <View style={styles.authMark}>
                <FontAwesome name="shopping-bag" size={24} color="#0f766e" />
              </View>
              <Text style={styles.authEyebrow}>Premium Commerce</Text>
              <Text style={styles.authHeadline}>
                {isLoginView ? "Selamat Datang Kembali" : "Buat Akun Baru"}
              </Text>
              <Text style={styles.authHeroCopy}>
                Sistem Multi-tenant E-Commerce API
              </Text>
            </View>

            <View style={styles.authCard}>
              <Text style={styles.authTitle}>
                {isLoginView ? "Sign In Kelompok" : "Register Akun Baru"}
              </Text>
              <Text style={styles.authSubtitle}>
                Akses katalog, keranjang, dan transaksi dalam satu dashboard.
              </Text>

              {!isLoginView && (
                <View style={styles.inputShell}>
                  <FontAwesome name="user-o" size={16} color="#64748b" />
                  <TextInput
                    placeholder="Nama Lengkap"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                  />
                </View>
              )}

              <View style={styles.inputShell}>
                <FontAwesome name="envelope-o" size={15} color="#64748b" />
                <TextInput
                  placeholder="Alamat Email"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputShell}>
                <FontAwesome name="lock" size={18} color="#64748b" />
                <TextInput
                  placeholder="Kata Sandi"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#0f766e"
                  style={styles.authLoading}
                />
              ) : (
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88}>
                  <LinearGradient
                    colors={["#0f766e", "#4f46e5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.authBtn}
                  >
                    <Text style={styles.authBtnText}>
                      {isLoginView ? "Masuk Sekarang" : "Daftarkan Akun"}
                    </Text>
                    <FontAwesome name="arrow-right" size={14} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => setIsLoginView(!isLoginView)}
                style={styles.switchBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.switchText}>
                  {isLoginView
                    ? "Belum punya akun? Daftar disini"
                    : "Sudah terdaftar? Silakan Login"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f8fafc" },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: true,
          title: "Detail Produk",
          headerStyle: { backgroundColor: "#101820" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "800" },
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerShown: true,
          title: "Pengiriman & Pembayaran",
          headerStyle: { backgroundColor: "#101820" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "800" },
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ShopProvider>
      <RootContent />
    </ShopProvider>
  );
}

const styles = StyleSheet.create({
  authGradient: {
    flex: 1,
  },
  authKeyboard: {
    flex: 1,
  },
  authContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingVertical: 36,
  },
  authHero: {
    marginBottom: 22,
  },
  authMark: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 18,
  },
  authEyebrow: {
    color: "#d1fae5",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  authHeadline: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
    marginTop: 8,
  },
  authHeroCopy: {
    color: "#ecfeff",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
    marginTop: 10,
  },
  authCard: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.56)",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.2,
    shadowRadius: 28,
    elevation: 10,
  },
  authTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0f172a",
    textAlign: "center",
  },
  authSubtitle: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
    marginTop: 6,
  },
  inputShell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: "#0f172a",
    paddingVertical: 13,
    fontSize: 14,
    fontWeight: "600",
  },
  authLoading: {
    marginVertical: 10,
  },
  authBtn: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    shadowColor: "#0f766e",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  authBtnText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
  },
  switchBtn: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  switchText: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "800",
  },
});
