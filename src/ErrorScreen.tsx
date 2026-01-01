import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Password: undefined;
  Error: { message?: string } | undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Error">;

export function ErrorScreen({ route, navigation }: Props) {
  const message = route.params?.message ?? "حدث خطأ غير معروف.";
  return (
    <View style={styles.container}>
      <Text style={styles.title}>حدث خطأ</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="العودة" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 8 },
  message: { fontSize: 16, marginBottom: 16, textAlign: "center" },
});
