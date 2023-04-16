import 'dart:convert';
import 'package:client/app/data/models/login_models.dart';
import 'package:client/app/routes/app_pages.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:get/get.dart';
import 'package:dio/dio.dart';
import 'package:get_storage/get_storage.dart';

class LoginController extends GetxController {
  final dio = Dio();
  final box = GetStorage();
  var isHidden = true.obs;
  var isLoading = false.obs;

  Future<void> onSubmit(String email, String password) async {
    isLoading(true);
    var credential = {'email': email, 'password': password};
    dio.options.connectTimeout = const Duration(seconds: 5);
    try {
      var response = await dio.post("${dotenv.env["API_URL"]}/auth/login", data: credential);
      Login login = loginFromJson(json.encode(response.data));
      // print(login.data.accessToken);
      box.write('access_token', login.data.accessToken);
      Get.offNamed(Routes.HOME);
    } on DioError catch (err) {
      if (err.type == DioErrorType.connectionTimeout || err.type == DioErrorType.sendTimeout) {
        Get.snackbar(
          "Error",
          "Request Timeout",
          colorText: Colors.white,
          backgroundColor: Colors.red,
          margin: const EdgeInsets.all(12),
        );
      } else if (err.response != null) {
        Get.snackbar(
          "Error",
          err.response!.data['message'],
          colorText: Colors.white,
          backgroundColor: Colors.red,
          margin: const EdgeInsets.all(12),
        );
      } else {
        Get.snackbar(
          "Error",
          "Something went wrong",
          colorText: Colors.white,
          backgroundColor: Colors.red,
          margin: const EdgeInsets.all(12),
        );
      }
    } catch (err) {
      rethrow;
    }
    isLoading(false);
  }
}
