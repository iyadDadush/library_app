import 'package:flutter/material.dart';

class BookController extends StatelessWidget {
  final int pageData;
  final bool hasNextPage;
  final VoidCallback? previousPageHandler;
  final VoidCallback? nextPageHandler;

  const BookController({
    super.key,
    required this.pageData,
    this.hasNextPage = false,
    this.previousPageHandler,
    this.nextPageHandler,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: 0,
      right: 0,
      bottom: 30,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
              onPressed: pageData == 0 ? null : previousPageHandler,
              icon: Icon(Icons.arrow_back),
            ),
            FloatingActionButton(
              onPressed: () {},
              mini: true,
              child: const Icon(Icons.add),
            ),
            IconButton(
              onPressed: hasNextPage ? nextPageHandler : null,
              icon: Icon(Icons.arrow_forward),
            ),
          ],
        ),
      ),
    );
  }
}
