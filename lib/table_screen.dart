import 'package:flutter/material.dart';
import 'package:library_app/appbar.dart';

class TableScreen extends StatelessWidget {
  const TableScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarCustom(title: const Text('Table Screen')),
      body: const Center(
        child: Text(
          'This is the Table Screen',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
