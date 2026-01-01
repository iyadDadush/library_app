import 'package:flutter/material.dart';
import 'package:library_app/db/controller.dart';

class BookModal extends StatelessWidget {
  final Map<String, dynamic>? item;
  final bool visible;
  final VoidCallback onClose;
  final Future<void> Function(String id)? onDeleted;
  final Future<void> Function(String id, String date)? onReturned;

  const BookModal({
    super.key,
    required this.visible,
    required this.onClose,
    this.item,
    this.onDeleted,
    this.onReturned,
  });

  @override
  Widget build(BuildContext context) {
    if (!visible || item == null) return const SizedBox.shrink();

    return AlertDialog(
      title: Text(item!['BookName'] ?? '-'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Student: ${item!['StudentName'] ?? '-'}'),
          Text('Book Code: ${item!['BookCode'] ?? '-'}'),
          Text('Borrow Date: ${item!['BorrowDate']?.split('T')[0] ?? '-'}'),
          Text('Return Date: ${item!['ReturnDate']?.split('T')[0] ?? '-'}'),
        ],
      ),
      actions: [
        TextButton(onPressed: onClose, child: const Text('Close')),
        TextButton(
          onPressed: () async {
            if (item != null && onDeleted != null) {
              await onDeleted!(item!['id']);
              onClose();
            }
          },
          child: const Text('Delete', style: TextStyle(color: Colors.red)),
        ),
        TextButton(
          onPressed: () async {
            if (item != null && onReturned != null) {
              final now = DateTime.now().toIso8601String();
              await onReturned!(item!['id'], now);
              onClose();
            }
          },
          child: const Text('Return'),
        ),
      ],
    );
  }
}
