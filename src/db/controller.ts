import { getDB } from "./database";
import { randomUUID } from "expo-crypto";

// إضافة كتاب جديد
export async function addBook(bookData: any) {
    const db = getDB();
    const id = randomUUID();

    await db.execAsync(`
        INSERT INTO books (id, StudentName, BookName, BookCode, BorrowDate, ReturnDate)
        VALUES (
            '${id}',
            '${bookData.StudentName}',
            '${bookData.BookName}',
            '${bookData.BookCode ?? ""}',
            '${bookData.BorrowDate ? bookData.BorrowDate.toISOString() : ""}',
            '${bookData.ReturnDate ? bookData.ReturnDate.toISOString() : ""}'
        );
    `);

    return true;
}

// جلب الكتب مع الترتيب والبحث والصفحات
export async function getAllBooks({
    sort = "asc",
    searchText = "",
    page = 1,
    sortBy = "StudentName",
    size = 1000000000,
}) {
    const db = getDB();

    const offset = (page - 1) * size;
    const order = sort === "desc" ? "DESC" : "ASC";

    // WHERE
    let where = "";
    if (searchText.trim() !== "") {
        const term = `%${searchText}%`;
        where = `
            WHERE StudentName LIKE '${term}'
            OR BookName LIKE '${term}'
            OR BookCode LIKE '${term}'
        `;
    }

    // إجمالي النتائج
    const totalRow: any = await db.getFirstAsync(
        `SELECT COUNT(*) AS total FROM books ${where}`
    );
    const total = totalRow.total;

    // البيانات
    const data = await db.getAllAsync(
        `SELECT *
         FROM books
         ${where}
         ORDER BY ${sortBy} ${order}
         LIMIT ${size}
         OFFSET ${offset}`
    );

    return {
        data,
        total,
        page,
        size,
        pages: Math.ceil(total / size),
    };
}

// حذف كتاب
export async function deleteBook(id: string) {
    const db = getDB();

    await db.execAsync(`
        DELETE FROM books WHERE id = '${id}';
    `);

    return true;
}

// تحديث كتاب
export async function updateBook(id: string, updatedData: any) {
    const db = getDB();

    const fields: string[] = [];

    Object.keys(updatedData).forEach((key) => {
        let value = updatedData[key];

        // تحويل التاريخ في حال كان Date
        if (value instanceof Date) {
            value = value.toISOString();
        }

        // منع أخطاء الاقتباس داخل النص
        if (typeof value === "string") {
            value = value.replace(/'/g, "''");
        }

        fields.push(`${key}='${value}'`);
    });

    await db.execAsync(`
        UPDATE books 
        SET ${fields.join(", ")}
        WHERE id = '${id}';
    `);

    return true;
}
