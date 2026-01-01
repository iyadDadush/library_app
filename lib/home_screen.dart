import 'package:flutter/material.dart';
import 'package:library_app/add_screen.dart';
import 'package:library_app/table_screen.dart';
import 'package:library_app/db/export_db.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // const Text('Welcome to the Home Screen!'),
            const SizedBox(height: 20),

            // قائمة الأزرار
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconTextButton(
                  icon: Icons.home,
                  label: 'Home',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const TableScreen(),
                      ),
                    );
                  },
                  color: Colors.blue,
                ),
                const SizedBox(width: 20),
                IconTextButton(
                  icon: Icons.add,
                  label: 'Add',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const AddScreen(),
                      ),
                    );
                  },
                ),
                const SizedBox(width: 20),
                IconTextButton(
                  icon: Icons.share,
                  label: 'Export',
                  onPressed: () async {
                    final success = await shareDatabase();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          success ? 'Database exported' : 'Export failed',
                        ),
                      ),
                    );
                  },
                  color: Colors.grey,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// -----------------------------------------------------------
//  Widget مخصص لزر يحتوي أيقونة + نص
// -----------------------------------------------------------
class IconTextButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onPressed;
  final Color? color;

  const IconTextButton({
    super.key,
    required this.icon,
    required this.label,
    required this.onPressed,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        foregroundColor: Colors.white,
        backgroundColor: color ?? Colors.green,
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 20),

        // ✔️ الشكل الصحيح للحدود الدائرية
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
      child: Column(children: [Icon(icon, size: 40), Text(label)]),
    );
  }
}
