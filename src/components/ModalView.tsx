import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function BookModal(props: any) {
    const { visible, onClose, item, onDeleted, onReturned } = props;
    if (!item) return null;

    const formatDate = (d: any) => (d ? String(d).split("T")[0] : "-");

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        borderRadius: 12,
                        width: "90%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                            textAlign: "right",
                            writingDirection: "rtl",
                        }}
                    >
                        تفاصيل الكتاب
                    </Text>

                    <Text style={styles.rtl}>
                        📘 اسم الكتاب: {item.BookName}
                    </Text>
                    <Text style={styles.rtl}>
                        📕 كود الكتاب: {item.BookCode}
                    </Text>
                    <Text style={styles.rtl}>
                        👤 الطالب: {item.StudentName}
                    </Text>
                    <Text style={styles.rtl}>
                        📅 تاريخ الاستعارة: {formatDate(item.BorrowDate)}
                    </Text>
                    <Text style={styles.rtl}>
                        📅 تاريخ الإرجاع: {formatDate(item.ReturnDate)}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                            marginTop: 20,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#007bff",
                                padding: 10,
                                borderRadius: 10,
                                width: "30%",
                                alignItems: "center",
                            }}
                            onPress={onClose}
                        >
                            <Text style={{ color: "#fff" }}>إغلاق</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "red",
                                padding: 10,
                                borderRadius: 10,
                                width: "30%",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                if (onDeleted) onDeleted(item.id);
                                onClose();
                            }}
                        >
                            <Text style={{ color: "#fff" }}>حذف</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "green",
                                padding: 10,
                                borderRadius: 10,
                                width: "30%",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                const today = new Date()
                                    .toISOString()
                                    .split("T")[0];
                                onReturned(item.id, today);
                                onClose();
                            }}
                        >
                            <Text style={{ color: "#fff" }}>إرجاع الكتاب </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    rtl: {
        textAlign: "right" as const,
        writingDirection: "rtl" as any as any,
        marginBottom: 5,
        fontSize: 16,
    },
});
