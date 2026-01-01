import 'package:flutter/material.dart';
import 'package:library_app/add_screen.dart';
import 'package:library_app/table_screen.dart';
import 'package:library_app/db/export_db.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الصفحة الرئيسية')),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'مرحبًا بك في المكتبة 👋',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // main image (from assets) with elevation
                    Material(
                      elevation: 5,
                      borderRadius: BorderRadius.circular(16),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Image.asset(
                          'assets/icon.png',
                          width: 96,
                          height: 96,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) => Container(
                            width: 96,
                            height: 96,
                            color: Colors.grey[200],
                            child: const Icon(
                              Icons.photo,
                              size: 48,
                              color: Colors.grey,
                            ),
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 32),

                    // Row of main buttons (full width, space around)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          IconTextButton(
                            imageAsset: 'assets/table.png',
                            label: 'الجدول',
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const TableScreen()),
                              );
                            },
                            color: Colors.blue,
                          ),
                          IconTextButton(
                            imageAsset: 'assets/add.png',
                            label: 'الإضافة',
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const AddScreen()),
                              );
                            },
                            color: Colors.green,
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 40),
                    SizedBox(
                      width: 150,
                      child: _PressableExportButton(),
                    ),
                  ],
                ),
              ),

            // Footer similar to Expo
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Text('صنع بواسطة اياد دعدوش ومحمد اسماعيل', style: TextStyle(fontSize: 14, color: Colors.grey[700])),
            ),
          ],
        ),
      ),
    );
  }
}

// -----------------------------------------------------------
//  Widget مخصص لزر يحتوي صورة + نص مع تأثير الضغط
// -----------------------------------------------------------
class IconTextButton extends StatefulWidget {
  final String? imageAsset;
  final IconData? icon;
  final String label;
  final VoidCallback onPressed;
  final Color? color;

  const IconTextButton({
    super.key,
    this.imageAsset,
    this.icon,
    required this.label,
    required this.onPressed,
    this.color,
  });

  @override
  State<IconTextButton> createState() => _IconTextButtonState();
}

class _IconTextButtonState extends State<IconTextButton>
    with SingleTickerProviderStateMixin {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) {
        setState(() => _pressed = false);
        widget.onPressed();
      },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.95 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: AnimatedOpacity(
          opacity: _pressed ? 0.8 : 1.0,
          duration: const Duration(milliseconds: 100),
          child: Container(
            width: 150,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: widget.color ?? Colors.green,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.08),
                  blurRadius: 6,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              children: [
                if (widget.imageAsset != null)
                  Image.asset(
                    widget.imageAsset!,
                    width: 48,
                    height: 48,
                    errorBuilder: (context, error, stackTrace) => Icon(
                      widget.icon ?? Icons.image,
                      size: 40,
                      color: Colors.white,
                    ),
                  )
                else
                  Icon(widget.icon ?? Icons.image, size: 40, color: Colors.white),
                const SizedBox(height: 8),
                Text(
                  widget.label,
                  style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Export button with press animation and snackbar
class _PressableExportButton extends StatefulWidget {
  const _PressableExportButton({super.key});

  @override
  State<_PressableExportButton> createState() => _PressableExportButtonState();
}

class _PressableExportButtonState extends State<_PressableExportButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) async {
        setState(() => _pressed = false);
        final success = await shareDatabase();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(success ? 'تم تصدير قاعدة البيانات' : 'فشل التصدير')),
        );
      },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.95 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: AnimatedOpacity(
          opacity: _pressed ? 0.8 : 1.0,
          duration: const Duration(milliseconds: 100),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 12),
            decoration: BoxDecoration(
              color: const Color(0xFF6C757D),
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 6, offset: const Offset(0, 3)),
              ],
            ),
            alignment: Alignment.center,
            child: const Text('تصدير قاعدة البيانات', style: TextStyle(color: Colors.white, fontSize: 16)),
          ),
        ),
      ),
    );
  }
}
