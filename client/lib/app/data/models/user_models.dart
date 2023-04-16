// To parse this JSON data, do
//
//     final user = userFromJson(jsonString);

import 'dart:convert';

User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
    User({
        required this.success,
        required this.data,
    });

    bool success;
    Data data;

    factory User.fromJson(Map<String, dynamic> json) => User(
        success: json["success"],
        data: Data.fromJson(json["data"]),
    );

    Map<String, dynamic> toJson() => {
        "success": success,
        "data": data.toJson(),
    };
}

class Data {
    Data({
        required this.uuid,
        required this.nopeg,
        required this.name,
        required this.email,
        required this.noHp,
        required this.role,
        required this.iat,
        required this.exp,
    });

    String uuid;
    String nopeg;
    String name;
    String email;
    String noHp;
    String role;
    int iat;
    int exp;

    factory Data.fromJson(Map<String, dynamic> json) => Data(
        uuid: json["uuid"],
        nopeg: json["nopeg"],
        name: json["name"],
        email: json["email"],
        noHp: json["noHp"],
        role: json["role"],
        iat: json["iat"],
        exp: json["exp"],
    );

    Map<String, dynamic> toJson() => {
        "uuid": uuid,
        "nopeg": nopeg,
        "name": name,
        "email": email,
        "noHp": noHp,
        "role": role,
        "iat": iat,
        "exp": exp,
    };
}
