import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type State = { hasError: boolean; error?: any };

type Props = React.PropsWithChildren<{}>;

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.log("Global Error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>حدث خطأ غير متوقع</Text>
                    <Text style={styles.sub}>
                        أعد تشغيل التطبيق أو حاول لاحقًا
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ hasError: false })}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>إعادة المحاولة</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children ?? null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
    sub: { color: "#666", marginBottom: 16 },
    button: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
    buttonText: { color: "#fff" },
});
