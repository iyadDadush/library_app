import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { DB_NAME } from "./database";

export async function shareDatabase() {
    try {
        const dbUri =
            (FileSystem as any).documentDirectory + "SQLite/" + DB_NAME;
        const info = await FileSystem.getInfoAsync(dbUri);
        if (!info.exists) {
            alert("❌ ملف قاعدة البيانات غير موجود!");
            return false;
        }

        await Sharing.shareAsync(dbUri);
        return true;
    } catch (e) {
        console.log("Share Error:", e);
        alert("حدث خطأ أثناء مشاركة قاعدة البيانات.");
        return false;
    }
}
