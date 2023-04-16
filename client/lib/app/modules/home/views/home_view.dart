import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(80),
        child: Container(
          padding: const EdgeInsets.fromLTRB(20, 60, 20, 0),
          alignment: Alignment.centerLeft,
          color: Colors.blue,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Welcom back,",
                style: TextStyle(color: Colors.white, fontSize: 18),
              ),
              const SizedBox(height: 7),
              Text(
                "${controller.getUser()['name']}",
                style:
                    const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ],
          ),
        ),
      ),
      body: Stack(
        children: [
          Container(
            height: Get.height / 5,
            decoration: const BoxDecoration(color: Colors.blue),
          ),
          ListView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
            children: [
              const SizedBox(height: 10),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.blue[600],
                ),
                alignment: Alignment.topLeft,
                height: Get.height / 3.8,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () {
                        controller.getLastKehadiran();
                      },
                      child: const Text(
                        "Kehadiran Terakhir",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold, fontSize: 17),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Expanded(
                      child: FutureBuilder(
                        future: controller.getLastKehadiran(),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState == ConnectionState.waiting) {
                            return const Center(child: CircularProgressIndicator());
                          } else if (snapshot.hasData) {
                            return Obx(
                              () => ListView(
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        DateFormat.yMMMMd().format(DateTime.now()),
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 17,
                                        ),
                                      ),
                                      Text(
                                        controller.kehadiran['data']
                                                ["hari_${controller.getDateNow()}"] ??
                                            '-',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 17,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        DateFormat.yMMMMd().format(
                                            DateTime.now().subtract(const Duration(days: 1))),
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 17,
                                        ),
                                      ),
                                      Text(
                                        controller.kehadiran['data']
                                                ["hari_${controller.getDateYesterday()}"] ??
                                            '-',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 17,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        DateFormat.yMMMMd().format(
                                            DateTime.now().subtract(const Duration(days: 2))),
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 17,
                                        ),
                                      ),
                                      Text(
                                        controller.kehadiran['data']
                                                ["hari_${controller.getDateBfYesterday()}"] ??
                                            '-',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 17,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            );
                          } else {
                            return const Center(child: Text('No data found'));
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              Container(
                constraints: BoxConstraints(minHeight: Get.height / 2.1),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Main Menu",
                      style:
                          TextStyle(fontSize: 16, color: Colors.black, fontWeight: FontWeight.bold),
                    ),
                    GridView.builder(
                      // padding: const EdgeInsets.only(top: 20),
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: controller.menuItems.length,
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        mainAxisSpacing: 25,
                        crossAxisSpacing: 25,
                        childAspectRatio: 10 / 8,
                      ),
                      itemBuilder: (context, index) {
                        final Map<String, dynamic> item = controller.menuItems[index];

                        return Material(
                          color: item['color'],
                          borderRadius: BorderRadius.circular(20),
                          child: InkWell(
                            onTap: item['onTap'],
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SizedBox(
                                  width: 50,
                                  height: 50,
                                  child: Icon(item['icon'], size: 40, color: Colors.white),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  item['title'],
                                  style: const TextStyle(color: Colors.white, fontSize: 15),
                                )
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
