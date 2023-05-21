import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/code_controller.dart';

class CodeView extends GetView<CodeController> {
  CodeView({Key? key}) : super(key: key);
  final codeC = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Kode Presensi'),
        centerTitle: true,
        elevation: 1,
      ),
      body: Center(
        child: Container(
          margin: const EdgeInsets.all(10),
          padding: const EdgeInsets.all(10),
          height: Get.height / 3.5,
          decoration:
              BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(20)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Text(
                    "Masukkan Kode Presensi",
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),
              TextField(
                controller: codeC,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: "Kode Presensi",
                ),
                autocorrect: false,
              ),
              Obx(
                () => ElevatedButton(
                  onPressed: controller.isLoading.value
                      ? null
                      : () {
                          controller.onSubmit(codeC.text.trim());
                        },
                  child: Text(controller.isLoading.value ? "Loading..." : "Submit"),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
