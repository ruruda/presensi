import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/list_presensi_controller.dart';

class ListPresensiView extends GetView<ListPresensiController> {
  const ListPresensiView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('List Presensi'),
        centerTitle: true,
        elevation: 1,
      ),
      body: Stack(
        children: [
          Container(
            height: Get.height / 4.3,
            decoration: const BoxDecoration(color: Colors.blue),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              Text(
                controller.getDate(),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Expanded(
                child: Container(
                  margin: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: Colors.grey[100],
                  ),
                  child: FutureBuilder(
                    future: controller.getKehadiran(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasData) {
                        var kehadiran = snapshot.data;
                        // print();
                        return ListView.separated(
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 20),
                          separatorBuilder: (context, index) => const SizedBox(height: 20),
                          itemCount: 31,
                          itemBuilder: (context, index) {
                            return Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Tanggal ${(index + 1).toString().padLeft(2, "0")}",
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                  ),
                                ),
                                Text(
                                  "${kehadiran['data']['hari_${(index + 1).toString().padLeft(2, '0')}'] ?? '-'}",
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            );
                          },
                        );
                      } else {
                        return const Center(child: Text('No data found'));
                      }
                    },
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
