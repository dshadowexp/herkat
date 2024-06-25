// packages/user.ts
import { makeGenericClientConstructor } from "@grpc/grpc-js";
import _m02 from "protobufjs/minimal";

// packages/google/protobuf/timestamp.ts
import Long from "long";
import _m0 from "protobufjs/minimal";
function createBaseTimestamp() {
  return { seconds: 0, nanos: 0 };
}
var Timestamp = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.seconds = longToNumber(reader.int64());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.nanos = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      seconds: isSet(object.seconds) ? globalThis.Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? globalThis.Number(object.nanos) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.seconds !== 0) {
      obj.seconds = Math.round(message.seconds);
    }
    if (message.nanos !== 0) {
      obj.nanos = Math.round(message.nanos);
    }
    return obj;
  },
  create(base) {
    return Timestamp.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseTimestamp();
    message.seconds = (_a = object.seconds) != null ? _a : 0;
    message.nanos = (_b = object.nanos) != null ? _b : 0;
    return message;
  }
};
function longToNumber(long) {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long;
  _m0.configure();
}
function isSet(value) {
  return value !== null && value !== void 0;
}

// packages/user.ts
function createBaseGetUserRequest() {
  return { id: "" };
}
var GetUserRequest = {
  encode(message, writer = _m02.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m02.Reader ? input : _m02.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { id: isSet2(object.id) ? globalThis.String(object.id) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },
  create(base) {
    return GetUserRequest.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a;
    const message = createBaseGetUserRequest();
    message.id = (_a = object.id) != null ? _a : "";
    return message;
  }
};
function createBaseGetUserResponse() {
  return { user: void 0 };
}
var GetUserResponse = {
  encode(message, writer = _m02.Writer.create()) {
    if (message.user !== void 0) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m02.Reader ? input : _m02.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { user: isSet2(object.user) ? User.fromJSON(object.user) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.user !== void 0) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },
  create(base) {
    return GetUserResponse.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    const message = createBaseGetUserResponse();
    message.user = object.user !== void 0 && object.user !== null ? User.fromPartial(object.user) : void 0;
    return message;
  }
};
function createBaseUser() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deviceId: "",
    type: "",
    role: "",
    verified: false,
    createdAt: void 0,
    updatedAt: void 0
  };
}
var User = {
  encode(message, writer = _m02.Writer.create()) {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.phone !== "") {
      writer.uint32(34).string(message.phone);
    }
    if (message.deviceId !== "") {
      writer.uint32(42).string(message.deviceId);
    }
    if (message.type !== "") {
      writer.uint32(50).string(message.type);
    }
    if (message.role !== "") {
      writer.uint32(58).string(message.role);
    }
    if (message.verified !== false) {
      writer.uint32(64).bool(message.verified);
    }
    if (message.createdAt !== void 0) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.updatedAt !== void 0) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m02.Reader ? input : _m02.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.firstName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.lastName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.phone = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.deviceId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.type = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }
          message.role = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }
          message.verified = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }
          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      firstName: isSet2(object.firstName) ? globalThis.String(object.firstName) : "",
      lastName: isSet2(object.lastName) ? globalThis.String(object.lastName) : "",
      email: isSet2(object.email) ? globalThis.String(object.email) : "",
      phone: isSet2(object.phone) ? globalThis.String(object.phone) : "",
      deviceId: isSet2(object.deviceId) ? globalThis.String(object.deviceId) : "",
      type: isSet2(object.type) ? globalThis.String(object.type) : "",
      role: isSet2(object.role) ? globalThis.String(object.role) : "",
      verified: isSet2(object.verified) ? globalThis.Boolean(object.verified) : false,
      createdAt: isSet2(object.createdAt) ? fromJsonTimestamp(object.createdAt) : void 0,
      updatedAt: isSet2(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    if (message.deviceId !== "") {
      obj.deviceId = message.deviceId;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.role !== "") {
      obj.role = message.role;
    }
    if (message.verified !== false) {
      obj.verified = message.verified;
    }
    if (message.createdAt !== void 0) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.updatedAt !== void 0) {
      obj.updatedAt = message.updatedAt.toISOString();
    }
    return obj;
  },
  create(base) {
    return User.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const message = createBaseUser();
    message.firstName = (_a = object.firstName) != null ? _a : "";
    message.lastName = (_b = object.lastName) != null ? _b : "";
    message.email = (_c = object.email) != null ? _c : "";
    message.phone = (_d = object.phone) != null ? _d : "";
    message.deviceId = (_e = object.deviceId) != null ? _e : "";
    message.type = (_f = object.type) != null ? _f : "";
    message.role = (_g = object.role) != null ? _g : "";
    message.verified = (_h = object.verified) != null ? _h : false;
    message.createdAt = (_i = object.createdAt) != null ? _i : void 0;
    message.updatedAt = (_j = object.updatedAt) != null ? _j : void 0;
    return message;
  }
};
var UserServiceService = {
  getUser: {
    path: "/user.UserService/getUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value) => Buffer.from(GetUserRequest.encode(value).finish()),
    requestDeserialize: (value) => GetUserRequest.decode(value),
    responseSerialize: (value) => Buffer.from(GetUserResponse.encode(value).finish()),
    responseDeserialize: (value) => GetUserResponse.decode(value)
  }
};
var UserServiceClient = makeGenericClientConstructor(UserServiceService, "user.UserService");
function toTimestamp(date) {
  const seconds = Math.trunc(date.getTime() / 1e3);
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp(t) {
  let millis = (t.seconds || 0) * 1e3;
  millis += (t.nanos || 0) / 1e6;
  return new globalThis.Date(millis);
}
function fromJsonTimestamp(o) {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
function isSet2(value) {
  return value !== null && value !== void 0;
}

// packages/geo.ts
import { makeGenericClientConstructor as makeGenericClientConstructor2 } from "@grpc/grpc-js";
import _m03 from "protobufjs/minimal";
function createBaseEmpty() {
  return {};
}
var Empty = {
  encode(_, writer = _m03.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m03.Reader ? input : _m03.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return Empty.fromPartial(base != null ? base : {});
  },
  fromPartial(_) {
    const message = createBaseEmpty();
    return message;
  }
};
function createBaseInsertStylistAddressRequest() {
  return { uid: "", address: "" };
}
var InsertStylistAddressRequest = {
  encode(message, writer = _m03.Writer.create()) {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m03.Reader ? input : _m03.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInsertStylistAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      uid: isSet3(object.uid) ? globalThis.String(object.uid) : "",
      address: isSet3(object.address) ? globalThis.String(object.address) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },
  create(base) {
    return InsertStylistAddressRequest.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseInsertStylistAddressRequest();
    message.uid = (_a = object.uid) != null ? _a : "";
    message.address = (_b = object.address) != null ? _b : "";
    return message;
  }
};
var GeoServiceService = {
  insertStylistAddress: {
    path: "/geo.GeoService/insertStylistAddress",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value) => Buffer.from(InsertStylistAddressRequest.encode(value).finish()),
    requestDeserialize: (value) => InsertStylistAddressRequest.decode(value),
    responseSerialize: (value) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value) => Empty.decode(value)
  }
};
var GeoServiceClient = makeGenericClientConstructor2(GeoServiceService, "geo.GeoService");
function isSet3(value) {
  return value !== null && value !== void 0;
}

// packages/auth.ts
import { makeGenericClientConstructor as makeGenericClientConstructor3 } from "@grpc/grpc-js";
import _m04 from "protobufjs/minimal";
function createBaseEmpty2() {
  return {};
}
var Empty2 = {
  encode(_, writer = _m04.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m04.Reader ? input : _m04.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEmpty2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return Empty2.fromPartial(base != null ? base : {});
  },
  fromPartial(_) {
    const message = createBaseEmpty2();
    return message;
  }
};
function createBaseCreateAuthRequest() {
  return { uid: "", role: "", type: "" };
}
var CreateAuthRequest = {
  encode(message, writer = _m04.Writer.create()) {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.role !== "") {
      writer.uint32(18).string(message.role);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m04.Reader ? input : _m04.Reader.create(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.role = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      uid: isSet4(object.uid) ? globalThis.String(object.uid) : "",
      role: isSet4(object.role) ? globalThis.String(object.role) : "",
      type: isSet4(object.type) ? globalThis.String(object.type) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.role !== "") {
      obj.role = message.role;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },
  create(base) {
    return CreateAuthRequest.fromPartial(base != null ? base : {});
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseCreateAuthRequest();
    message.uid = (_a = object.uid) != null ? _a : "";
    message.role = (_b = object.role) != null ? _b : "";
    message.type = (_c = object.type) != null ? _c : "";
    return message;
  }
};
var AuthServiceService = {
  createAuth: {
    path: "/auth.AuthService/createAuth",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value) => Buffer.from(CreateAuthRequest.encode(value).finish()),
    requestDeserialize: (value) => CreateAuthRequest.decode(value),
    responseSerialize: (value) => Buffer.from(Empty2.encode(value).finish()),
    responseDeserialize: (value) => Empty2.decode(value)
  }
};
var AuthServiceClient = makeGenericClientConstructor3(AuthServiceService, "auth.AuthService");
function isSet4(value) {
  return value !== null && value !== void 0;
}
export {
  AuthServiceClient,
  AuthServiceService,
  CreateAuthRequest,
  Empty,
  GeoServiceClient,
  GeoServiceService,
  GetUserRequest,
  GetUserResponse,
  InsertStylistAddressRequest,
  User,
  UserServiceClient,
  UserServiceService
};
