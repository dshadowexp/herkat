import { FirebaseService } from "@herkat/bolsters";

export async function sendPushHandler(data: any) {
    try {
        const { receiver, message } = data;

        if (!receiver || !message) {
            console.log('Invalid push request');
            return;
        }

        const deviceId = '';

        if (deviceId) {
            FirebaseService.getInstance().pushNotification(deviceId, {
                title: "Test Push",
                body: "Test push notification here live and colored",
            });
        }
    } catch (error) {
        console.log(error);
    }
}