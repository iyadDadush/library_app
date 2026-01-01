import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Alert,
    TouchableOpacity,
    Text,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addBook } from "./db/controller";

export function AddScreen() {
    const [data, setData] = useState({
        BookName: "",
        BookCode: "",
        StudentName: "",
        BorrowDate: "",
        ReturnDate: "",
    });

    // حالتي عرض المودال
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pickerTarget, setPickerTarget] = useState<"borrow" | "return">(
        "borrow"
    );

    const showPicker = (target: "borrow" | "return") => {
        setPickerTarget(target);
        setPickerVisible(true);
    };

    const hidePicker = () => setPickerVisible(false);

    const handleDateConfirm = (date: Date) => {
        const formatted = date.toISOString().split("T")[0]; // YYYY-MM-DD

        if (pickerTarget === "borrow") {
            setData((p) => ({ ...p, BorrowDate: formatted }));
        } else {
            setData((p) => ({ ...p, ReturnDate: formatted }));
        }

        hidePicker();
    };

    const handleSubmit = async () => {
        if (!data.BookName.trim() || !data.StudentName.trim()) {
            return Alert.alert("تنبيه", "يرجى تعبئة اسم الكتاب واسم الطالب ⚠️");
        }

        try {
            await addBook({
                StudentName: data.StudentName,
                BookName: data.BookName,
                BookCode: data.BookCode || null,
                BorrowDate: data.BorrowDate ? new Date(data.BorrowDate) : null,
                ReturnDate: data.ReturnDate ? new Date(data.ReturnDate) : null,
            });

            Alert.alert("نجاح", `تم إضافة الكتاب "${data.BookName}" بنجاح!`);

            setData({
                BookName: "",
                BookCode: "",
                StudentName: "",
                BorrowDate: "",
                ReturnDate: "",
            });
        } catch (error) {
            console.log("Add Error:", error);
            Alert.alert("خطأ", "حدث خطأ أثناء الإضافة ❌");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                textAlign="right"
                placeholder="اسم الكتاب"
                value={data.BookName}
                onChangeText={(text) =>
                    setData((p) => ({ ...p, BookName: text }))
                }
            />

            <TextInput
                style={styles.input}
                textAlign="right"
                placeholder="اسم الطالب"
                value={data.StudentName}
                onChangeText={(text) =>
                    setData((p) => ({ ...p, StudentName: text }))
                }
            />

            <TextInput
                style={styles.input}
                textAlign="right"
                placeholder="كود الكتاب (اختياري)"
                value={data.BookCode}
                onChangeText={(text) =>
                    setData((p) => ({ ...p, BookCode: text }))
                }
            />

            {/* زر يفتح مودال اختيار تاريخ الاستعارة */}
            <TouchableOpacity
                style={styles.input}
                onPress={() => showPicker("borrow")}
            >
                <Text
                    style={{
                        textAlign: "right",
                        color: data.BorrowDate ? "#000" : "#999",
                    }}
                >
                    {data.BorrowDate || "تاريخ الاستعارة"}
                </Text>
            </TouchableOpacity>

            {/* زر مودال لتاريخ الإرجاع */}
            <TouchableOpacity
                style={styles.input}
                onPress={() => showPicker("return")}
            >
                <Text
                    style={{
                        textAlign: "right",
                        color: data.ReturnDate ? "#000" : "#999",
                    }}
                >
                    {data.ReturnDate || "تاريخ الإرجاع"}
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginTop: 10,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginRight: 5,
                        backgroundColor: "#007bff",

                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                    onPress={handleSubmit}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            writingDirection: "rtl",
                            textAlign: "right",
                        }}
                    >
                        إضافة الكتاب
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: 5,
                        backgroundColor: "#6c757d",

                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                    onPress={() => {
                        setData({
                            BookName: "",
                            BookCode: "",
                            StudentName: "",
                            BorrowDate: "",
                            ReturnDate: "",
                        });
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            writingDirection: "rtl",
                            textAlign: "right",
                        }}
                    >
                        تنظيف
                    </Text>
                </TouchableOpacity>
            </View>

            {/* مودال اختيار التاريخ */}
            <DateTimePickerModal
                isVisible={pickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hidePicker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        writingDirection: "rtl",
        textAlign: "right",

        width: "80%",
        color: "#6c757d",
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#007bff",
        borderRadius: 10,
        alignItems: "center",
    },
});
