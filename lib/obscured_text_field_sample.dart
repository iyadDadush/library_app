import 'package:flutter/material.dart';

class ObscuredTextFieldSample extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  
  const ObscuredTextFieldSample({
    super.key,
    required this.labelText,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 250,
      child: TextField(
        controller: controller,
        obscureText: true,
        decoration: InputDecoration(
          border: const OutlineInputBorder(),
          labelText: labelText,
        ),
      ),
    );
  }
}
