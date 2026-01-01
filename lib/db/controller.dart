import 'package:sqflite/sqflite.dart';
import 'package:uuid/uuid.dart';
import 'database.dart';

const _uuid = Uuid();

Future<bool> addBook(Map<String, dynamic> bookData) async {
  final db = getDB();
  final id = _uuid.v4();

  final row = {
    'id': id,
    'StudentName': bookData['StudentName'] ?? '',
    'BookName': bookData['BookName'] ?? '',
    'BookCode': bookData['BookCode'] ?? '',
    'BorrowDate': bookData['BorrowDate']?.toIso8601String() ?? '',
    'ReturnDate': bookData['ReturnDate']?.toIso8601String() ?? '',
  };

  await db.insert('books', row);
  return true;
}

Future<Map<String, dynamic>> getAllBooks({
  String sort = 'asc',
  String searchText = '',
  int page = 1,
  String sortBy = 'StudentName',
  int size = 1000000000,
}) async {
  final db = getDB();
  final offset = (page - 1) * size;
  final order = sort == 'desc' ? 'DESC' : 'ASC';

  String where = '';
  List<dynamic> whereArgs = [];
  if (searchText.trim().isNotEmpty) {
    final term = '%$searchText%';
    where = "WHERE StudentName LIKE ? OR BookName LIKE ? OR BookCode LIKE ?";
    whereArgs = [term, term, term];
  }

  final totalRes = await db.rawQuery(
    'SELECT COUNT(*) AS total FROM books $where',
    whereArgs,
  );
  final total = Sqflite.firstIntValue(totalRes) ?? 0;

  final data = await db.rawQuery(
    'SELECT * FROM books $where ORDER BY $sortBy $order LIMIT ? OFFSET ?',
    [...whereArgs, size, offset],
  );

  return {
    'data': data,
    'total': total,
    'page': page,
    'size': size,
    'pages': (total / size).ceil(),
  };
}

Future<bool> deleteBook(String id) async {
  final db = getDB();
  await db.delete('books', where: 'id = ?', whereArgs: [id]);
  return true;
}

Future<bool> updateBook(String id, Map<String, dynamic> updatedData) async {
  final db = getDB();
  final data = <String, dynamic>{};

  updatedData.forEach((key, value) {
    if (value is DateTime)
      data[key] = value.toIso8601String();
    else
      data[key] = value?.toString() ?? '';
  });

  await db.update('books', data, where: 'id = ?', whereArgs: [id]);
  return true;
}
