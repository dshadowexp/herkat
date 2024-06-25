import { Client, ServiceError, ClientUnaryCall, Metadata, CallOptions, ChannelCredentials, ClientOptions } from '@grpc/grpc-js';
import _m0 from 'protobufjs/minimal';

interface GetUserRequest {
    id: string;
}
declare const GetUserRequest: {
    encode(message: GetUserRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetUserRequest;
    fromJSON(object: any): GetUserRequest;
    toJSON(message: GetUserRequest): unknown;
    create<I extends {
        id?: string | undefined;
    } & {
        id?: string | undefined;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): GetUserRequest;
    fromPartial<I_1 extends {
        id?: string | undefined;
    } & {
        id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): GetUserRequest;
};
interface GetUserResponse {
    user: User | undefined;
}
declare const GetUserResponse: {
    encode(message: GetUserResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse;
    fromJSON(object: any): GetUserResponse;
    toJSON(message: GetUserResponse): unknown;
    create<I extends {
        user?: {
            firstName?: string | undefined;
            lastName?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            deviceId?: string | undefined;
            type?: string | undefined;
            role?: string | undefined;
            verified?: boolean | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
    } & {
        user?: ({
            firstName?: string | undefined;
            lastName?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            deviceId?: string | undefined;
            type?: string | undefined;
            role?: string | undefined;
            verified?: boolean | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            firstName?: string | undefined;
            lastName?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            deviceId?: string | undefined;
            type?: string | undefined;
            role?: string | undefined;
            verified?: boolean | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "user">]: never; }>(base?: I): GetUserResponse;
    fromPartial<I_1 extends {
        user?: {
            firstName?: string | undefined;
            lastName?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            deviceId?: string | undefined;
            type?: string | undefined;
            role?: string | undefined;
            verified?: boolean | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
    } & {
        user?: ({
            firstName?: string | undefined;
            lastName?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            deviceId?: string | undefined;
            type?: string | undefined;
            role?: string | undefined;
            verified?: boolean | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            firstName?: string | undefined;
            lastName?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            deviceId?: string | undefined;
            type?: string | undefined;
            role?: string | undefined;
            verified?: boolean | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, "user">]: never; }>(object: I_1): GetUserResponse;
};
interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deviceId: string;
    type: string;
    role: string;
    verified: boolean;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
declare const User: {
    encode(message: User, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    create<I extends {
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        deviceId?: string | undefined;
        type?: string | undefined;
        role?: string | undefined;
        verified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        deviceId?: string | undefined;
        type?: string | undefined;
        role?: string | undefined;
        verified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof User>]: never; }>(base?: I): User;
    fromPartial<I_1 extends {
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        deviceId?: string | undefined;
        type?: string | undefined;
        role?: string | undefined;
        verified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        deviceId?: string | undefined;
        type?: string | undefined;
        role?: string | undefined;
        verified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof User>]: never; }>(object: I_1): User;
};
type UserServiceService = typeof UserServiceService;
declare const UserServiceService: {
    readonly getUser: {
        readonly path: "/user.UserService/getUser";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: GetUserRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => GetUserRequest;
        readonly responseSerialize: (value: GetUserResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => GetUserResponse;
    };
};
interface UserServiceClient extends Client {
    getUser(request: GetUserRequest, callback: (error: ServiceError | null, response: GetUserResponse) => void): ClientUnaryCall;
    getUser(request: GetUserRequest, metadata: Metadata, callback: (error: ServiceError | null, response: GetUserResponse) => void): ClientUnaryCall;
    getUser(request: GetUserRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: GetUserResponse) => void): ClientUnaryCall;
}
declare const UserServiceClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UserServiceClient;
    service: typeof UserServiceService;
    serviceName: string;
};

interface Empty$1 {
}
declare const Empty$1: {
    encode(_: Empty$1, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Empty$1;
    fromJSON(_: any): Empty$1;
    toJSON(_: Empty$1): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): Empty$1;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): Empty$1;
};
interface InsertStylistAddressRequest {
    uid: string;
    address: string;
}
declare const InsertStylistAddressRequest: {
    encode(message: InsertStylistAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InsertStylistAddressRequest;
    fromJSON(object: any): InsertStylistAddressRequest;
    toJSON(message: InsertStylistAddressRequest): unknown;
    create<I extends {
        uid?: string | undefined;
        address?: string | undefined;
    } & {
        uid?: string | undefined;
        address?: string | undefined;
    } & { [K in Exclude<keyof I, keyof InsertStylistAddressRequest>]: never; }>(base?: I): InsertStylistAddressRequest;
    fromPartial<I_1 extends {
        uid?: string | undefined;
        address?: string | undefined;
    } & {
        uid?: string | undefined;
        address?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof InsertStylistAddressRequest>]: never; }>(object: I_1): InsertStylistAddressRequest;
};
type GeoServiceService = typeof GeoServiceService;
declare const GeoServiceService: {
    readonly insertStylistAddress: {
        readonly path: "/geo.GeoService/insertStylistAddress";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: InsertStylistAddressRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => InsertStylistAddressRequest;
        readonly responseSerialize: (value: Empty$1) => Buffer;
        readonly responseDeserialize: (value: Buffer) => Empty$1;
    };
};
interface GeoServiceClient extends Client {
    insertStylistAddress(request: InsertStylistAddressRequest, callback: (error: ServiceError | null, response: Empty$1) => void): ClientUnaryCall;
    insertStylistAddress(request: InsertStylistAddressRequest, metadata: Metadata, callback: (error: ServiceError | null, response: Empty$1) => void): ClientUnaryCall;
    insertStylistAddress(request: InsertStylistAddressRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Empty$1) => void): ClientUnaryCall;
}
declare const GeoServiceClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): GeoServiceClient;
    service: typeof GeoServiceService;
    serviceName: string;
};

interface Empty {
}
declare const Empty: {
    encode(_: Empty, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Empty;
    fromJSON(_: any): Empty;
    toJSON(_: Empty): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): Empty;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): Empty;
};
interface CreateAuthRequest {
    uid: string;
    role: string;
    type: string;
}
declare const CreateAuthRequest: {
    encode(message: CreateAuthRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CreateAuthRequest;
    fromJSON(object: any): CreateAuthRequest;
    toJSON(message: CreateAuthRequest): unknown;
    create<I extends {
        uid?: string | undefined;
        role?: string | undefined;
        type?: string | undefined;
    } & {
        uid?: string | undefined;
        role?: string | undefined;
        type?: string | undefined;
    } & { [K in Exclude<keyof I, keyof CreateAuthRequest>]: never; }>(base?: I): CreateAuthRequest;
    fromPartial<I_1 extends {
        uid?: string | undefined;
        role?: string | undefined;
        type?: string | undefined;
    } & {
        uid?: string | undefined;
        role?: string | undefined;
        type?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CreateAuthRequest>]: never; }>(object: I_1): CreateAuthRequest;
};
type AuthServiceService = typeof AuthServiceService;
declare const AuthServiceService: {
    readonly createAuth: {
        readonly path: "/auth.AuthService/createAuth";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: CreateAuthRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => CreateAuthRequest;
        readonly responseSerialize: (value: Empty) => Buffer;
        readonly responseDeserialize: (value: Buffer) => Empty;
    };
};
interface AuthServiceClient extends Client {
    createAuth(request: CreateAuthRequest, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
    createAuth(request: CreateAuthRequest, metadata: Metadata, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
    createAuth(request: CreateAuthRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
}
declare const AuthServiceClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AuthServiceClient;
    service: typeof AuthServiceService;
    serviceName: string;
};

export { AuthServiceClient, AuthServiceService, CreateAuthRequest, Empty$1 as Empty, GeoServiceClient, GeoServiceService, GetUserRequest, GetUserResponse, InsertStylistAddressRequest, User, UserServiceClient, UserServiceService };
