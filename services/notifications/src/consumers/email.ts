import { FirebaseService } from "@herkat/bolsters";

export async function consumeAuthEmails(data: any) {
    try {
        const { receiver, template, props } = data;

        if (!receiver || !template) {
            console.log('Invalid email request');
            return;
        }

        const user = await FirebaseService.getInstance().getAuthUser(receiver);
        const { email } = user;

        if (email) {
            const entity = { ...user, ...props };
            // const { subject, body } = await emailEngine(template, entity);
            // await EmailService.getInstance().sendMail(email, subject, body);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function consumeUserEmails(data: any) {

}

export async function consumeBookingEmails(data: any) {

}