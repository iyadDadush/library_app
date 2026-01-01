import 'package:flutter/material.dart';
import 'package:library_app/login_screen.dart';
import 'package:library_app/db/database.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initDB();
  runApp(const MyApp());
}

// التطبيق الرئيسي
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      home: const LoginScreen(),
    );
  }
}
