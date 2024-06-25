import * as admin from "firebase-admin";
import * as serviceAccount from "../../service-account.json";

class FirebaseService {
    private _app: admin.app.App;
    private static _instance: FirebaseService;

    private constructor() {
        this._app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
    }

    public static getInstance() {
        if (!FirebaseService._instance) {
            this._instance = new FirebaseService();
        }

        return FirebaseService._instance;
    }

    public async decodeToken(token: string) {
        const response = await this._app.auth().verifyIdToken(token);
        const { uid } = response;
        let isStylist = response.hasOwnProperty('stylist') && response.stylist === true;
        let isAdmin = response.hasOwnProperty('admin') && response.admin === true;
        const type = isStylist ? 'stylist' : 'client';
        const role = isAdmin ? 'admin' : 'user';
        return { uid, type, role };
    }

    public async setUserClaims(uid: string, claims: object) {
        return await this._app.auth().setCustomUserClaims(uid, claims);
    }

    public async getAuthUser(uid: string) {
        return await this._app.auth().getUser(uid);
    }

    public async pushNotification(
        deviceID: string, 
        notificationBody: { title?: string, body?: string, imageUrl?: string }
    ) {
        const response = await this._app?.messaging().send({
            token: deviceID,
            notification: notificationBody
        });

        console.log(response);
    }
}

export default FirebaseService;