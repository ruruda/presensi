import 'package:client/app/routes/app_pages.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:intl/intl.dart';

class ListPresensiController extends GetxController {
  final dio = Dio();
  final _token = GetStorage().read("access_token");

  String getDate() {
    var now = DateTime.now();
    return DateFormat.yMMMM().format(now).toString();
  }

  Future getKehadiran() async {
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
      var decode = JwtDecoder.decode(_token);
      var response = await dio.get(
        "${dotenv.env["API_URL"]}/user/kehadiran/${decode['uuid']}",
        options: Options(
          headers: {'Authorization': "Bearer $_token"},
        ),
      );
      var kehadiran = response.data;
      return kehadiran;
    } catch (err) {
      rethrow;
    }
  }
}
