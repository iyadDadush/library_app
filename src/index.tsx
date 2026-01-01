import React, { useEffect, useState } from "react";
import { PasswordComponent } from "./Password";
import { HomeScreen } from "./HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddScreen } from "./AddScreen";
import { View, ActivityIndicator } from "react-native";
import { TableScreen } from "./TebleScreen";
import { initDB } from "./db/database";

const Stack = createNativeStackNavigator();

export function Index() {
    const [password, setPassword] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function setup() {
            try {
                await initDB();
                console.log("DB initialized");

                // مثال: لا تقم به في التطبيق النهائي

                console.log("Test book added");

                setReady(true);
            } catch (error) {
                console.log("DB Error:", error);
            }
        }

        setup();
    }, []);

    // ❌ لا نعرض شيء قبل جاهزية قاعدة البيانات
    if (!ready) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <>
            {password ? (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: "white" },
                            headerTitleStyle: { fontSize: 24 },
                            headerTitleAlign: "center",
                            animation: "slide_from_right",
                            
                        }}
                    >
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: "الصفحة الرئيسية" , }}
                        />
                        <Stack.Screen
                            name="AddScreen"
                            component={AddScreen}
                            options={{ title: "صفحة الاضافة" }}
                        />
                        <Stack.Screen
                            name="TableScreen"
                            component={TableScreen}
                            options={{ title: "صفحة الجدول" }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <PasswordComponent
                    statusPassword={() => {
                        setPassword(true);
                    }}
                />
            )}
        </>
    );
}
