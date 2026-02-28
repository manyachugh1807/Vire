import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import bcrypt from "bcryptjs";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function signin(){
    console.log(email);
  }


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.buttonDecoration}
          onPress={signin}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 10 }}>
          Don't have an account?
          <Text
            style={styles.signin}
            onPress={() => console.log("Sign Up")}
          >
            {" "}
            Sign up
          </Text>
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "grey" }}>
          Or Sign in With
        </Text>
      </View>
    </View>
  );
}

// styles same as yours (unchanged)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#cccce8",
        justifyContent: "center",
        alignItems: "center",
    },

    box: {
        height: 300,
        width: 300,
        backgroundColor: "#E6E6FA",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        elevation: 6,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4b4a74",
        marginBottom: 20,
    },

    input: {
        width: "100%",
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    signin: {
        position: 'relative',
        top: 3.8,
        color: "blue",
        textDecorationLine: 'underline'

    },
    buttonDecoration: {
        width: "100%",
        height: 50,
        backgroundColor: "#4b4a74",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});