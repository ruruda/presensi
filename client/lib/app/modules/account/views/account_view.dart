import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/account_controller.dart';

class AccountView extends GetView<AccountController> {
  AccountView({Key? key}) : super(key: key);
  final nopegC = TextEditingController();
  final namaC = TextEditingController();
  final emailC = TextEditingController();
  final noHpC = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Account Details'),
        centerTitle: true,
        elevation: 1,
      ),
      body: FutureBuilder(
        future: controller.getUserData(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasData) {
            var user = snapshot.data!;
            nopegC.text = user.data.nopeg;
            namaC.text = user.data.name;
            emailC.text = user.data.email;
            noHpC.text = user.data.noHp;

            return ListView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      radius: 60,
                      backgroundColor: Colors.grey[300],
                      child: Text(
                        namaC.text.substring(0, 2).toUpperCase(),
                        style: const TextStyle(
                            fontSize: 35, color: Colors.black, fontWeight: FontWeight.w500),
                      ),
                    )
                  ],
                ),
                const SizedBox(height: 20),
                Container(
                  constraints: const BoxConstraints(minHeight: 300),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextField(
                        readOnly: true,
                        controller: nopegC,
                        style: const TextStyle(fontSize: 18),
                        decoration: const InputDecoration(
                          labelText: "No Pegawai",
                          labelStyle: TextStyle(fontSize: 18),
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                      const SizedBox(height: 20),
                      TextField(
                        readOnly: true,
                        controller: namaC,
                        style: const TextStyle(fontSize: 18),
                        decoration: const InputDecoration(
                          labelText: "Nama",
                          labelStyle: TextStyle(fontSize: 18),
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                      const SizedBox(height: 20),
                      TextField(
                        readOnly: true,
                        controller: emailC,
                        style: const TextStyle(fontSize: 18),
                        decoration: const InputDecoration(
                          labelText: "Email",
                          labelStyle: TextStyle(fontSize: 18),
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                      const SizedBox(height: 20),
                      TextField(
                        readOnly: true,
                        controller: noHpC,
                        style: const TextStyle(fontSize: 18),
                        decoration: const InputDecoration(
                          labelText: "No HP",
                          labelStyle: TextStyle(fontSize: 18),
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 50),
                ElevatedButton.icon(
                  onPressed: () {
                    Get.defaultDialog(
                      title: "Confirm",
                      middleText: "Are you sure want to log out?",
                      confirm: ElevatedButton(
                        onPressed: () {
                          controller.logout();
                        },
                        child: const Text("Yes"),
                      ),
                      cancel: OutlinedButton(
                        onPressed: () {
                          Get.back();
                        },
                        child: const Text("No"),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
                  icon: Transform(
                    alignment: Alignment.center,
                    transform: Matrix4.rotationY(3.1415),
                    child: const Icon(Icons.logout),
                  ),
                  label: const Text(
                    "Logout",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            );
          } else {
            return const Center(child: Text('No data found'));
          }
        },
      ),
    );
  }
}
