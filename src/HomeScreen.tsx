import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { shareDatabase } from "./db/exportDB";
import { useState } from "react";

type RootStackParamList = {
    Home: undefined;
    TableScreen: undefined;
    AddScreen: undefined; // أضف هذه
};

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: { navigation: HomeScreenNavProp }) {
    const [showExport, setShowExport] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>مرحبًا بك في المكتبة 👋</Text>

            <Image
                source={require("../assets/icon.png")}
                style={styles.mainImage}
            />

            <View style={styles.buttonsRow}>
                {/* زر الجدول */}
                <Pressable
                    onPress={() => navigation.navigate("TableScreen")}
                    style={({ pressed }) => [
                        styles.buttonBlue,
                        pressed && styles.pressed,
                    ]}
                >
                    <Image
                        source={require("../assets/table.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.buttonText}>الجدول</Text>
                </Pressable>

                {/* زر الإضافة */}
                <Pressable
                    onPress={() => navigation.navigate("AddScreen")}
                    style={({ pressed }) => [
                        styles.buttonGreen,
                        pressed && styles.pressed,
                    ]}
                >
                    <Image
                        source={require("../assets/add.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.buttonText}>الإضافة</Text>
                </Pressable>
            </View>
            <Pressable
                onPress={() => shareDatabase()}
                style={({ pressed }) => [
                    styles.buttonGrey,
                    pressed && styles.pressed,
                    { marginTop: 40 }, // يمكنك وضع أي ستايل إضافي هنا
                ]}
            >
                <Text style={styles.buttonText}>تصدير قاعدة البيانات</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginBottom: 24,
        fontWeight: "600",
        color: "#333",
    },
    mainImage: {
        height: 96,
        width: 96,
        marginBottom: 32,
        borderRadius: 16,
        elevation: 5,
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingHorizontal: 20,
    },
    buttonBlue: {
        backgroundColor: "#3b82f6",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: 150,
        alignItems: "center",
        elevation: 3,
    },
    buttonGrey: {
        backgroundColor: "#6c757d",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: 150,
        alignItems: "center",
        elevation: 3,
    },
    buttonGreen: {
        backgroundColor: "#22c55e",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: 150,
        alignItems: "center",
        elevation: 3,
    },
    icon: {
        width: 48,
        height: 48,
        marginBottom: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
    },
    pressed: {
        transform: [{ scale: 0.95 }],
        opacity: 0.8,
    },
});
