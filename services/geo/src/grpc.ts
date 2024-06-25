import * as grpc from "@grpc/grpc-js";

import { GeoServiceService, Empty, InsertStylistAddressRequest } from "@herkat/protos";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";

const GRPC_PORT = Number(process.env.GRPC_PORT) || 50059;

const grpcServer = new grpc.Server();

grpcServer.addService(GeoServiceService, {
    insertStylistAddress: async (
        call: ServerUnaryCall<InsertStylistAddressRequest, Empty>,
        callback: sendUnaryData<Empty>
    ) => {
        try {
            const { uid, address } = call.request;

            if (uid) {
                const response: Empty = {};
                callback(null, response);
            } else {
                callback(
                    {
                      code: status.NOT_FOUND,
                      message: `User ${call.request.uid} not found`,
                    },
                    null
                );
            }
        } catch (error) {
            callback({ code: status.INTERNAL }, null);
            console.error(error);
        }
    }
});

function startGrpc() {
    grpcServer.bindAsync(
        `0.0.0.0:${GRPC_PORT}`, 
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.log('Geo Grpc server error', err);
                return;
            }
            console.log(`Geo Grpc Server: 0.0.0.0:${port}`);
        }
    );
}

export default startGrpc;