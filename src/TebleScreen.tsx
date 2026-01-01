import React, { useEffect, useState, useCallback } from "react";
import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    TextInput,
    StyleSheet,
} from "react-native";
import { deleteBook, getAllBooks, updateBook } from "./db/controller";
import { BookModal } from "./components/ModalView"; // ← رجعنا المودال
import { BookController } from "./components/BookController";

const LIMIT = 20;

export const TableScreen = () => {
    const [totalBooks, setTotalBooks] = useState(0);

    const [search, setSearch] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageData, setPageData] = useState(0);

    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: "asc" | "desc";
    }>({
        key: "StudentName",
        direction: "asc",
    });

    const sortableKeys = [
        "StudentName",
        "BookName",
        "BookCode",
        "BorrowDate",
        "ReturnDate",
    ];
    const formatDate = (d: any) => (d ? String(d).split("T")[0] : "-");
    const returnBook = async (id: string, date: string) => {
        await updateBook(id, { ReturnDate: date });

        // تحديث القائمة مباشرة
        setData((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ReturnDate: date } : b))
        );
    };

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const safePage = Math.max(0, Math.floor(Number(pageData)));

            const response = await getAllBooks({
                searchText: search,
                sortBy: sortConfig.key,
                sort: sortConfig.direction,
                page: safePage + 1,
                size: LIMIT,
            });

            setData(response.data);
            setTotalBooks(response.total);
        } catch (error) {
            console.log("❌ fetchData error:", error);
            setData([]);
        }

        setLoading(false);
    }, [pageData, sortConfig, search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSort = (key: string) => {
        if (!sortableKeys.includes(key)) return;
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const openModal = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    return (
        <View
            style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
                flex: 1,
            }}
        >
            {/* 🔍 البحث */}
            <TextInput
                style={styles.input}
                textAlign="right"
                placeholder="بحث..."
                value={search}
                onChangeText={setSearch}
            />

            {/* 📋 جدول البيانات */}
            <ScrollView>
                <ScrollView horizontal>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 10,
                        }}
                    >
                        {/* عناوين الأعمدة */}
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            {[
                                { key: "BookCode", label: "Code" },
                                { key: "BookName", label: "Book Name" },
                                { key: "StudentName", label: "Student" },
                                { key: "BorrowDate", label: "Borrow Date" },
                                { key: "ReturnDate", label: "Return Date" },
                            ].map((col) => (
                                <TouchableOpacity
                                    key={col.key}
                                    onPress={() => handleSort(col.key)}
                                    style={{
                                        width: 120,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: 10,
                                        borderRightWidth: 1,
                                        borderColor: "#ccc",
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold" }}>
                                        {col.label}
                                    </Text>
                                    <Text>
                                        {sortConfig.key === col.key
                                            ? sortConfig.direction === "asc"
                                                ? "⬆"
                                                : "⬇"
                                            : "⬍"}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* البيانات */}
                        {loading ? (
                            <View
                                style={{
                                    padding: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ActivityIndicator size="large" />
                                <Text style={{ marginTop: 10 }}>
                                    Loading...
                                </Text>
                            </View>
                        ) : data.length === 0 ? (
                            <View style={{ padding: 20 }}>
                                <Text style={{ color: "#888" }}>
                                    No data available
                                </Text>
                            </View>
                        ) : (
                            data.map((item, idx) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor:
                                            idx % 2 === 0 ? "#fff" : "#fafafa",
                                    }}
                                    onPress={() => openModal(item)} // ← المودال هنا
                                >
                                    <Text style={styles.cell}>
                                        {item.BookCode || "-"}
                                    </Text>
                                    <Text style={styles.cell}>
                                        {item.BookName}
                                    </Text>
                                    <Text style={styles.cell}>
                                        {item.StudentName}
                                    </Text>
                                    <Text style={styles.cell}>
                                        {formatDate(item.BorrowDate)}
                                    </Text>
                                    <Text style={styles.cell}>
                                        {formatDate(item.ReturnDate)}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>
            </ScrollView>

            {/* 🟦 المودال */}
            <BookModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                item={selectedItem}
                onDeleted={async (id: any) => {
                    if (await deleteBook(id)) {
                        fetchData();
                    } else {
                        alert("حدث خطأ أثناء حذف الكتاب.");
                    }
                }}
                onReturned={returnBook}
            />
            <BookController
                pageData={pageData}
                previousPageHandler={() => setPageData(pageData - 1)}
                nextPageHandler={() => setPageData(pageData + 1)}
                hasNextPage={pageData + 1 < Math.ceil(totalBooks / LIMIT)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "80%",
        padding: 10,
        margin: 20,
        borderRadius: 10,
    },
    cell: {
        width: 120,
        padding: 10,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },
});
