import 'package:client/app/routes/app_pages.dart';
import 'package:dio/dio.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:intl/intl.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class HomeController extends GetxController {
  final _token = GetStorage().read('access_token');
  final dio = Dio();
  RxMap<String, dynamic> kehadiran = RxMap<String, dynamic>();

  @override
  void onInit() {
    getLastKehadiran();
    super.onInit();
  }

  String getDateNow() {
    var now = DateTime.now();
    return DateFormat.d().format(now).toString().padLeft(2, '0');
  }

  String getDateYesterday() {
    var now = DateTime.now();
    var yesterday = now.subtract(const Duration(days: 1));
    return DateFormat.d().format(yesterday).toString().padLeft(2, '0');
  }

  String getDateBfYesterday() {
    var now = DateTime.now();
    var yesterday = now.subtract(const Duration(days: 2));
    return DateFormat.d().format(yesterday).toString().padLeft(2, '0');
  }

  dynamic getUser() {
    bool hasExpired = JwtDecoder.isExpired(GetStorage().read("access_token"));
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
    return JwtDecoder.decode(GetStorage().read("access_token"));
  }

  Future getLastKehadiran() async {
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
        "${dotenv.env["API_URL"]}/user/lasthadir/${decode['uuid']}",
        options: Options(
          headers: {'Authorization': "Bearer $_token"},
        ),
      );
      kehadiran.addAll(response.data);
      return kehadiran;
    } catch (err) {
      rethrow;
    }
  }

  final menuItems = [
    {
      "title": "Scanner",
      "icon": Icons.qr_code_scanner,
      "color": const Color(0xff10A5D8),
      "onTap": () async {
        var barcode =
            await FlutterBarcodeScanner.scanBarcode("#000000", "Cancel", true, ScanMode.QR);
        if (barcode == '-1') return null;

        try {
          var response = await Dio().put(
            "${dotenv.env["API_URL"]}/user/kehadiran",
            data: {"code": barcode},
            options: Options(
              headers: {'Authorization': "Bearer ${GetStorage().read('access_token')}"},
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
      },
    },
    {
      "title": "Code",
      "icon": Icons.paste,
      "color": const Color(0xffF3B52A),
      "onTap": () => Get.toNamed(Routes.CODE),
    },
    {
      "title": "List Presensi",
      "icon": Icons.list_alt_rounded,
      "color": const Color(0xffF3745A),
      "onTap": () => Get.toNamed(Routes.LIST_PRESENSI),
    },
    {
      "title": "Account",
      "icon": Icons.person,
      "color": const Color(0xff065A4C),
      "onTap": () => Get.toNamed(Routes.ACCOUNT),
    },
  ];
}
