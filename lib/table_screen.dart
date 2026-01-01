import 'package:flutter/material.dart';
import 'package:library_app/appbar.dart';
import 'package:library_app/db/controller.dart';
import 'package:library_app/book_modal.dart';
import 'package:library_app/book_controller.dart';

class TableScreen extends StatefulWidget {
  const TableScreen({super.key});

  @override
  State<TableScreen> createState() => _TableScreenState();
}

class _TableScreenState extends State<TableScreen> {
  final int limit = 20;
  int totalBooks = 0;
  String search = '';
  List<Map<String, dynamic>> data = [];
  bool loading = false;
  int pageData = 0;

  Map<String, dynamic>? selectedItem;
  bool modalVisible = false;

  String sortKey = 'StudentName';
  String sortDirection = 'asc';

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    setState(() {
      loading = true;
    });

    try {
      final res = await getAllBooks(
        searchText: search,
        sortBy: sortKey,
        sort: sortDirection,
        page: pageData + 1,
        size: limit,
      );

      setState(() {
        data = List<Map<String, dynamic>>.from(res['data']);
        totalBooks = res['total'];
      });
    } catch (e) {
      setState(() {
        data = [];
        totalBooks = 0;
      });
    }

    setState(() {
      loading = false;
    });
  }

  void handleSort(String key) {
    setState(() {
      if (sortKey == key) {
        sortDirection = sortDirection == 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = key;
        sortDirection = 'asc';
      }
      pageData = 0;
    });

    fetchData();
  }

  void openModal(Map<String, dynamic> item) {
    setState(() {
      selectedItem = item;
      modalVisible = true;
    });

    showDialog(
      context: context,
      builder: (_) => BookModal(
        visible: true,
        item: item,
        onClose: () {
          Navigator.of(context).pop();
          setState(() {
            modalVisible = false;
            selectedItem = null;
          });
        },
        onDeleted: (id) async {
          await deleteBook(id);
          await fetchData();
        },
        onReturned: (id, date) async {
          await updateBook(id, {'ReturnDate': date});
          await fetchData();
        },
      ),
    );
  }

  String formatDate(String? d) =>
      (d == null || d.isEmpty) ? '-' : d.split('T')[0];

  @override
  Widget build(BuildContext context) {
    final hasNext = pageData + 1 < (totalBooks / limit).ceil();

    return Scaffold(
      appBar: AppBarCustom(title: const Text('Table Screen')),
      body: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 16),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.9,
                child: TextField(
                  decoration: const InputDecoration(
                    hintText: 'بحث...',
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (v) {
                    search = v;
                  },
                  onSubmitted: (_) {
                    pageData = 0;
                    fetchData();
                  },
                ),
              ),
              const SizedBox(height: 12),
              Expanded(
                child: loading
                    ? const Center(child: CircularProgressIndicator())
                    : data.isEmpty
                    ? const Center(child: Text('No data available'))
                    : SingleChildScrollView(
                        padding: const EdgeInsets.all(16),
                        child: SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  _headerCell('BookCode'),
                                  _headerCell('BookName'),
                                  _headerCell('StudentName'),
                                  _headerCell('BorrowDate'),
                                  _headerCell('ReturnDate'),
                                ],
                              ),
                              ...data.asMap().entries.map((e) {
                                final idx = e.key;
                                final item = e.value;
                                return InkWell(
                                  onTap: () => openModal(item),
                                  child: Row(
                                    children: [
                                      _cell(item['BookCode'] ?? '-'),
                                      _cell(item['BookName'] ?? '-'),
                                      _cell(item['StudentName'] ?? '-'),
                                      _cell(formatDate(item['BorrowDate'])),
                                      _cell(formatDate(item['ReturnDate'])),
                                    ],
                                  ),
                                );
                              }),
                            ],
                          ),
                        ),
                      ),
              ),
            ],
          ),

          // pagination / controller
          BookController(
            pageData: pageData,
            hasNextPage: hasNext,
            previousPageHandler: () {
              setState(() {
                pageData = (pageData - 1).clamp(0, 999999);
              });
              fetchData();
            },
            nextPageHandler: () {
              setState(() {
                pageData = pageData + 1;
              });
              fetchData();
            },
          ),
        ],
      ),
    );
  }

  Widget _headerCell(String t) {
    return GestureDetector(
      onTap: () => handleSort(t),
      child: Container(
        width: 120,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(color: Colors.grey[200]),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(t, style: const TextStyle(fontWeight: FontWeight.bold)),
            Text(sortKey == t ? (sortDirection == 'asc' ? '⬆' : '⬇') : '⬍'),
          ],
        ),
      ),
    );
  }

  Widget _cell(String t) =>
      Container(width: 120, padding: const EdgeInsets.all(10), child: Text(t));
}
