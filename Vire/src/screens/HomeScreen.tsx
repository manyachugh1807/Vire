import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FontAwesome6, MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "My First Project",
      content: "React Native Portfolio App",
      date: new Date(),
    },
  ]);

  // Load profile image on app start
  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) setProfileImage(savedImage);
    };
    loadImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem("profileImage", uri);
    }
  };

  const addPost = () => {
    const newPost = {
      id: Date.now().toString(),
      title: "New Project",
      content: "Built with Expo + React Native",
      date: new Date(),
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const navItems = [
    { id: "home", type: "normal", label: "Home" },
    { id: "buildings", type: "normal", label: "Places" },
    { id: "add", type: "fab", label: "" },
    { id: "favorites", type: "normal", label: "Saved" },
    { id: "search", type: "normal", label: "Search" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fb" />

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarButton}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={20} color="#888" />
            </View>
          )}
          <View style={styles.onlineDot} />
        </TouchableOpacity>

        <View style={styles.greetingBlock}>
          <Text style={styles.greetingSmall}>Good morning 👋</Text>
          <Text style={styles.greetingName}>Welcome back</Text>
        </View>

        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={22} color="#222" />
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Posts Feed ── */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text style={styles.postDate}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
      />

      {/* ── Bottom Navigation ── */}
      <View style={styles.navWrapper}>
        <View style={styles.navBar}>
          {navItems.map((item) => {
            if (item.type === "fab") {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.centerFab}
                  onPress={addPost}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={28} color="#fff" />
                </TouchableOpacity>
              );
            }

            const isActive = activeTab === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.navItem}
                onPress={() => setActiveTab(item.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.navIconWrap,
                    isActive && styles.navIconActive,
                  ]}
                >
                  {item.id === "home" && (
                    <MaterialIcons
                      name="home"
                      size={26}
                      color={isActive ? "#fff" : "#aaa"}
                    />
                  )}

                  {item.id === "buildings" && (
                    <FontAwesome6
                      name="building"
                      size={22}
                      color={isActive ? "#fff" : "#aaa"}
                    />
                  )}

                  {item.id === "favorites" && (
                    <FontAwesome6
                      name="heart"
                      size={22}
                      color={isActive ? "#fff" : "#aaa"}
                    />
                  )}

                  {item.id === "search" && (
                    <MaterialIcons
                      name="search"
                      size={26}
                      color={isActive ? "#fff" : "#aaa"}
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.navLabel,
                    isActive && styles.navLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fb" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  avatarButton: { position: "relative", marginRight: 12 },

  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  avatarPlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ececec",
    justifyContent: "center",
    alignItems: "center",
  },

  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#34c759",
    borderWidth: 2,
    borderColor: "#f8f9fb",
  },

  greetingBlock: { flex: 1 },

  greetingSmall: { fontSize: 12, color: "#999" },

  greetingName: { fontSize: 16, fontWeight: "700" },

  notifButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  notifBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
  },

  notifBadgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "800",
  },

  postCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  postTitle: { fontSize: 16, fontWeight: "bold" },

  postDate: { fontSize: 12, color: "gray", marginTop: 5 },

  navWrapper: { paddingHorizontal: 20, paddingBottom: 20 },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 36,
    paddingVertical: 10,
  },

  navItem: { flex: 1, alignItems: "center" },

  navIconWrap: {
    width: 42,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  navIconActive: {
    backgroundColor: "#3a3a3a",
  },

  navLabel: {
    fontSize: 10,
    color: "#666",
  },

  navLabelActive: {
    color: "#fff",
    fontWeight: "700",
  },

  centerFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3a3a3a",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
    elevation: 8,
  },
});