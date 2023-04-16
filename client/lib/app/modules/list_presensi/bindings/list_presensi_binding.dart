import 'package:get/get.dart';

import '../controllers/list_presensi_controller.dart';

class ListPresensiBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ListPresensiController>(
      () => ListPresensiController(),
    );
  }
}
