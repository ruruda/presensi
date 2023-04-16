import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class CodeController extends GetxController {
  final dio = Dio();
  final _token = GetStorage().read('access_token');
  var isLoading = false.obs;

  Future<void> onSubmit(String code) async {
    isLoading(true);
    try {
      var response = await dio.put(
        "${dotenv.env["API_URL"]}/user/kehadiran",
        data: {"code": code},
        options: Options(
          headers: {'Authorization': "Bearer $_token"},
        ),
      );
      Get.snackbar(
          "Success",
          response.data['message'],
          colorText: Colors.white,
          backgroundColor: Colors.green,
          margin: const EdgeInsets.all(12),
        );
    } on DioError catch (err) {
      if (err.response != null) {
        Get.snackbar(
          "Error",
          err.response!.data['message'],
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
