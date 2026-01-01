import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { Index } from "./src";
import { ErrorBoundary } from "./src/ErrorBoundary";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        // Catch unhandled promise rejections
        if (typeof (global as any).process !== "undefined") {
            (global as any).process.on?.(
                "unhandledRejection",
                (reason: any) => {
                    console.log("Unhandled Rejection:", reason);
                }
            );
        }

        // Fallback for other environments
        (global as any).onunhandledrejection = (e: any) => {
            console.log("Unhandled Promise Rejection:", e);
        };
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.container}>
                    <ErrorBoundary>
                        <Index />
                    </ErrorBoundary>

                    {/* Footer */}
                    <View style={styles.footerFixed}>
                        <Text style={styles.footerText}>
                            صنع بواسطة اياد دعدوش ومحمد اسماعيل
                        </Text>
                    </View>

                    <StatusBar style="auto" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    footerFixed: {
        paddingVertical: 10,
        alignItems: "center",
    },

    footerText: {
        fontSize: 14,
        color: "#333",
    },
});
