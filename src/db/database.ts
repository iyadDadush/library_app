import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
export const DB_NAME = "books_v1.db";

export async function initDB() {
    try {
        db = await SQLite.openDatabaseAsync(DB_NAME);

        console.log("🔵 DB opened");

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS books (
                id TEXT PRIMARY KEY,
                StudentName TEXT,
                BookName TEXT,
                BookCode TEXT,
                BorrowDate TEXT,
                ReturnDate TEXT
            );
        `);

        console.log("🟢 Table ready");
    } catch (e) {
        console.log("❌ initDB error:", e);
        throw e;
    }
}


export function getDB() {
    if (!db) throw new Error("DB not initialized! Call initDB() first.");
    return db;
}
