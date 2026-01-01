import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function BookController({
    pageData,
    hasNextPage,
    previousPageHandler,
    nextPageHandler,
}: {
    pageData: number;
    hasNextPage?: boolean;
    previousPageHandler?: () => void;
    nextPageHandler?: () => void;
}) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                bottom: 30,
                left: 0,
                right: 0,
                paddingHorizontal: 40,
            }}
        >
            {/* سهم يسار */}
            <TouchableOpacity
                disabled={pageData === 0}
                onPress={previousPageHandler}
                style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 50,
                    padding: 12,
                    elevation: 3,
                }}
            >
                <Ionicons
                    name="arrow-back"
                    size={28}
                    color={pageData === 0 ? "#ccc" : "#333"}
                />
            </TouchableOpacity>

            {/* ايكون زائد */}
            <TouchableOpacity
                onPress={() => {}}
                style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 50,
                    padding: 12,
                    elevation: 3,
                }}
            >
                <Ionicons name="add" size={28} color="#333" />
            </TouchableOpacity>

            {/* سهم يمين */}
            <TouchableOpacity
                disabled={!hasNextPage}
                onPress={nextPageHandler}
                style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 50,
                    padding: 12,
                    elevation: 3,
                }}
            >
                <Ionicons
                    name="arrow-forward"
                    size={28}
                    color={!hasNextPage ? "#ccc" : "#333"}
                />
            </TouchableOpacity>
        </View>
    );
}
