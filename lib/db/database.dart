import 'dart:io';

import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

Database? _db;
const String DB_NAME = 'books_v1.db';

Future<void> initDB() async {
  if (_db != null) return;

  final documentsDirectory = await getApplicationDocumentsDirectory();
  final path = join(documentsDirectory.path, DB_NAME);

  _db = await openDatabase(
    path,
    version: 1,
    onCreate: (db, version) async {
      await db.execute('''
        CREATE TABLE books (
          id TEXT PRIMARY KEY,
          StudentName TEXT,
          BookName TEXT,
          BookCode TEXT,
          BorrowDate TEXT,
          ReturnDate TEXT
        );
      ''');
    },
  );
}

Database getDB() {
  if (_db == null) throw Exception('DB not initialized! Call initDB() first.');
  return _db!;
}
