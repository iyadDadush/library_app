import 'dart:io';

import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';
import 'database.dart';

Future<bool> shareDatabase() async {
  try {
    final documentsDirectory = await getApplicationDocumentsDirectory();
    final dbPath = join(documentsDirectory.path, DB_NAME);

    final file = File(dbPath);
    if (!await file.exists()) {
      return false;
    }

    await Share.shareXFiles([XFile(dbPath)], text: 'Database export');
    return true;
  } catch (e) {
    print('Share Error: $e');
    return false;
  }
}
