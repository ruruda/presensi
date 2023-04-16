import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/login_controller.dart';

class LoginView extends GetView<LoginController> {
  LoginView({Key? key}) : super(key: key);
  final _formKey = GlobalKey<FormState>();
  final emailC = TextEditingController();
  final passwordC = TextEditingController();
  @override
  Widget build(BuildContext context) {
    var keyHeight = context.mediaQueryViewInsets.bottom;
    return SafeArea(
      child: Scaffold(
        body: Stack(
          children: [
            Container(
              decoration: const BoxDecoration(color: Colors.blue),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                padding: const EdgeInsets.only(top: 18, left: 20, right: 20),
                height: keyHeight == 0 ? Get.height / 1.6 : Get.height / 2,
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                  ),
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      RichText(
                        textAlign: TextAlign.center,
                        text: const TextSpan(
                          text: "Login",
                          style: TextStyle(color: Colors.black, fontSize: 20),
                        ),
                      ),
                      const SizedBox(height: 18),
                      TextFormField(
                        controller: emailC,
                        decoration: const InputDecoration(
                          labelText: "Email",
                          border: OutlineInputBorder(),
                        ),
                        autocorrect: false,
                        keyboardType: TextInputType.emailAddress,
                        textInputAction: TextInputAction.next,
                        validator: (value) {
                          if (value?.isEmpty ?? true) return "Email is required";
                          if (!(value!.isEmail)) return "Email is not valid";
                          return null;
                        },
                      ),
                      const SizedBox(height: 18),
                      Obx(
                        () => TextFormField(
                          controller: passwordC,
                          decoration: InputDecoration(
                            labelText: "Password",
                            border: const OutlineInputBorder(),
                            suffixIcon: IconButton(
                                onPressed: () => controller.isHidden.toggle(),
                                icon: Icon(controller.isHidden.value
                                    ? Icons.remove_red_eye
                                    : Icons.remove_red_eye_outlined)),
                          ),
                          autocorrect: false,
                          textInputAction: TextInputAction.done,
                          obscureText: controller.isHidden.value,
                          validator: (value) {
                            if (value?.isEmpty ?? true) return "Password is required";
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 18),
                      Obx(
                        () => ElevatedButton(
                          onPressed: controller.isLoading.value
                              ? null
                              : () async {
                                  if (_formKey.currentState!.validate()) {
                                    await controller.onSubmit(
                                        emailC.text.trim(), passwordC.text.trim());
                                  }
                                },
                          child: Text(controller.isLoading.value ? "Loading..." : "Login"),
                        ),
                      ),
                      const SizedBox(height: 18),
                      RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(
                          text: "Lupa kata sandi?",
                          style: const TextStyle(color: Colors.black, fontSize: 14),
                          children: [
                            TextSpan(
                              text: " Bantuan",
                              style: const TextStyle(color: Colors.blue, fontSize: 14),
                              recognizer: TapGestureRecognizer()..onTap = () {},
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
