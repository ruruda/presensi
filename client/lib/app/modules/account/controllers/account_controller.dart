import 'dart:convert';
import 'package:client/app/data/models/user_models.dart';
import 'package:client/app/routes/app_pages.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AccountController extends GetxController {
  final dio = Dio();
  final _token = GetStorage().read("access_token");

  Future getUserData() async {
    try {
      bool hasExpired = JwtDecoder.isExpired(_token);
      if (hasExpired) {
        GetStorage().remove("access_token");
        Get.snackbar(
          "Expired",
          "Session Expired, please login",
          colorText: Colors.white,
          backgroundColor: Colors.blue,
          margin: const EdgeInsets.all(12),
        );
        return Get.offAllNamed(Routes.LOGIN);
      }
      var response = await dio.get(
        "${dotenv.env["API_URL"]}/auth/me",
        options: Options(
          headers: {'Authorization': "Bearer $_token"},
        ),
      );
      User user = userFromJson(jsonEncode(response.data));
      return user;
    } catch (err) {
      // print(err.toString());
      rethrow;
    }
  }

  void logout() {
    GetStorage().remove("access_token");
    Get.offAllNamed(Routes.LOGIN);
  }
}
