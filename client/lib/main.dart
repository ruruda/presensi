import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'app/routes/app_pages.dart';

Future main() async {
  await dotenv.load(fileName: ".env");
  await GetStorage.init();
  runApp(
    GetMaterialApp(
      title: "Application",
      initialRoute: AppPages.getInitRoute(),
      getPages: AppPages.routes,
      theme: ThemeData.light(),
    ),
  );
}
