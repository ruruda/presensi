// To parse this JSON data, do
//
//     final login = loginFromJson(jsonString);

import 'dart:convert';

Login loginFromJson(String str) => Login.fromJson(json.decode(str));

String loginToJson(Login data) => json.encode(data.toJson());

class Login {
    Login({
        required this.message,
        required this.data,
    });

    String message;
    Data data;

    factory Login.fromJson(Map<String, dynamic> json) => Login(
        message: json["message"],
        data: Data.fromJson(json["data"]),
    );

    Map<String, dynamic> toJson() => {
        "message": message,
        "data": data.toJson(),
    };
}

class Data {
    Data({
        required this.name,
        required this.role,
        required this.accessToken,
        required this.refreshToken,
    });

    String name;
    String role;
    String accessToken;
    String refreshToken;

    factory Data.fromJson(Map<String, dynamic> json) => Data(
        name: json["name"],
        role: json["role"],
        accessToken: json["accessToken"],
        refreshToken: json["refreshToken"],
    );

    Map<String, dynamic> toJson() => {
        "name": name,
        "role": role,
        "accessToken": accessToken,
        "refreshToken": refreshToken,
    };
}
