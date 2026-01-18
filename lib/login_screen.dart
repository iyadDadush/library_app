import 'package:flutter/material.dart';
import 'package:library_app/home_screen.dart';
import 'package:library_app/obscured_text_field_sample.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

checkpassword(_passwordController, _correctPassword, context) {
  // Add password checking logic here
  if (_passwordController.text == _correctPassword) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const HomeScreen()),
    );
  } else {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('THE PASSWORD IS INCORRECT')));
  }
}

class _LoginScreenState extends State<LoginScreen> {
  final String _correctPassword = '1234';
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              decoration: const InputDecoration(
                hintText: 'كلمة السر...',

                border: OutlineInputBorder(),
              ),
              onSubmitted: (_) {
                checkpassword(_passwordController, _correctPassword, context);
              },
              controller: _passwordController,
            ),
            const SizedBox(height: 20),
            TextButton(
              style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                backgroundColor: Colors.blue,
                padding: const EdgeInsets.symmetric(
                  horizontal: 50,
                  vertical: 15,
                ),
              ),
              onPressed: () {
                checkpassword(_passwordController, _correctPassword, context);
              },
              child: const Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}
