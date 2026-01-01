import React from "react";
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    StyleSheet,
} from "react-native";

export function PasswordComponent({statusPassword}: any) {
    const [Password, setPassword] = React.useState<string>("");
    const correctPassword = "1234";

    function handleCheckPassword() {
        if (Password === correctPassword) {
            statusPassword();
        } else {
            alert("كلمة المرور غير صحيحة. حاول مرة أخرى.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>أدخل كلمة المرور</Text>
            <TextInput
                secureTextEntry
                style={styles.input}
                textAlign="right"
                placeholder="كلمة السر"
                value={Password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleCheckPassword}
            >
                <Text style={styles.buttonText}>تسجيل الدخول</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "80%",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#007bff",
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        padding: 10,
    },
});
