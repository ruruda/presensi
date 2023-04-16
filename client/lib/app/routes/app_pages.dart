import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import '../modules/account/bindings/account_binding.dart';
import '../modules/account/views/account_view.dart';
import '../modules/code/bindings/code_binding.dart';
import '../modules/code/views/code_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/list_presensi/bindings/list_presensi_binding.dart';
import '../modules/list_presensi/views/list_presensi_view.dart';
import '../modules/login/bindings/login_binding.dart';
import '../modules/login/views/login_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static String getInitRoute() {
    final token = GetStorage().read("access_token");
    return token != null ? Routes.HOME : Routes.LOGIN;
  }

  static const INITIAL = Routes.LOGIN;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => const HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.LOGIN,
      page: () => LoginView(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: _Paths.ACCOUNT,
      page: () => AccountView(),
      binding: AccountBinding(),
    ),
    GetPage(
      name: _Paths.CODE,
      page: () => CodeView(),
      binding: CodeBinding(),
    ),
    GetPage(
      name: _Paths.LIST_PRESENSI,
      page: () => const ListPresensiView(),
      binding: ListPresensiBinding(),
    ),
  ];
}
