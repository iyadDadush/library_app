import 'package:flutter/material.dart';
import 'package:library_app/appbar.dart';
import 'package:library_app/obscured_text_field_sample.dart';
import 'package:library_app/db/controller.dart';

class AddScreen extends StatefulWidget {
  // تغيير إلى StatefulWidget
  const AddScreen({super.key});

  @override
  _AddScreenState createState() => _AddScreenState(); // إنشاء State
}

class _AddScreenState extends State<AddScreen> {
  // تعريف State
  final _studentNameController = TextEditingController();
  final _bookNameController = TextEditingController();
  final _bookCodeController = TextEditingController();
  final _getDateController = TextEditingController();
  final _backDateController = TextEditingController();

  // دالة اختيار التاريخ
  Future<void> _selectDate(
    BuildContext context,
    TextEditingController controller,
  ) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (pickedDate != null) {
      controller.text =
          "${pickedDate.year}-${pickedDate.month.toString().padLeft(2, '0')}-${pickedDate.day.toString().padLeft(2, '0')}";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarCustom(title: Text('Add Screen')),
      body: Center(
        child: SingleChildScrollView(
          // لجعل الشاشة قابلة للتمرير
          padding: const EdgeInsets.all(16.0),
          child: Container(
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.blueAccent),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment:
                  CrossAxisAlignment.start, // محاذاة العناصر لليسار
              children: [
                _buildTextField("Student Name", _studentNameController),
                _buildTextField("Book Name", _bookNameController),
                _buildTextField("Book Code", _bookCodeController),
                _buildDateField("Get Date", _getDateController, context),
                _buildDateField(
                  "Back Date (optional)",
                  _backDateController,
                  context,
                ),
                const SizedBox(height: 20),
                Center(
                  child: ElevatedButton(
                    onPressed: () async {
                      // Save the book to local DB
                      try {
                        final borrow = _getDateController.text.isNotEmpty
                            ? DateTime.parse(_getDateController.text)
                            : null;
                        final back = _backDateController.text.isNotEmpty
                            ? DateTime.parse(_backDateController.text)
                            : null;

                        await addBook({
                          'StudentName': _studentNameController.text,
                          'BookName': _bookNameController.text,
                          'BookCode': _bookCodeController.text.isNotEmpty
                              ? _bookCodeController.text
                              : null,
                          'BorrowDate': borrow,
                          'ReturnDate': back,
                        });

                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Data saved successfully'),
                          ),
                        );

                        setState(() {
                          _studentNameController.clear();
                          _bookNameController.clear();
                          _bookCodeController.clear();
                          _getDateController.clear();
                          _backDateController.clear();
                        });
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Error saving data')),
                        );
                      }
                    },
                    child: const Text('Save', style: TextStyle(fontSize: 18)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors
                          .blueAccent, // تغيير primary إلى backgroundColor
                      padding: const EdgeInsets.symmetric(
                        horizontal: 50,
                        vertical: 20,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // حقل نصي مع بعض التنسيق (أيقونة، borders)
  Widget _buildTextField(String label, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: const Icon(Icons.text_fields), // إضافة أيقونة النص
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.blueAccent),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.blue, width: 2),
          ),
        ),
      ),
    );
  }

  // حقل تاريخ مع تصميم خاص
  Widget _buildDateField(
    String label,
    TextEditingController controller,
    BuildContext context,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: const Icon(Icons.calendar_today), // إضافة أيقونة للتاريخ
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.blueAccent),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.blue, width: 2),
          ),
        ),
        readOnly: true,
        onTap: () => _selectDate(context, controller),
      ),
    );
  }
}
