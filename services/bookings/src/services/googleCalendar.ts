import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export class GoogleCalendarService {
    private static _instance: GoogleCalendarService;
    private _oauth;
    private _calendar;

    private constructor() {
        this._oauth = new google.auth.OAuth2({
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            redirectUri: 'http://localhost:3007/api/v0/calendar/redirect'
        });

        this._calendar = google.calendar({
            version: 'v3', 
            auth: this._oauth
        });

        this._oauth.on('tokens', (tokens) => {
            if (tokens.refresh_token) {
                // store the refresh_token in your secure persistent database
                console.log(tokens.refresh_token);
            }
            console.log(tokens.access_token);
        });
    }

    public static getInstance() {
        if (!GoogleCalendarService._instance) {
            GoogleCalendarService._instance = new GoogleCalendarService();
        }

        return GoogleCalendarService._instance; 
    }

    public getAuthUrl(email: string) {
        try {
            return this._oauth.generateAuthUrl({
                scope: SCOPES,
                login_hint: email,
                access_type: 'offline',
                include_granted_scopes: true,
            })
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async setTokenCredential(code: string) {
        try {
            const { tokens } = await this._oauth.getToken(code);
            console.log(tokens);
            this._oauth.setCredentials(tokens);

            await this._oauth.getTokenInfo(tokens.access_token!);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async listEvents() {
        const res = await this._calendar.events.list({
            auth: this._oauth,
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        // console.log(res.data);
        const events = res.data.items;
        // console.log(events);
        if (!events || events.length === 0) {
            console.log('No upcoming events found.');
            return;
        }
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
            const start = event.start?.dateTime || event.start?.date;
            console.log(`${start} - ${event.summary}`);
        });
      }

    public async createEvent() {
        // const event = {
        //     'summary': summary,
        //     'description': description,
        //     'start': {
        //         'dateTime': start_date,     // Format: '2015-05-28T09:00:00-07:00'
        //         'timeZone': 'Asia/Calcutta',
        //     },
        //     'end': {
        //         'dateTime': end_date,
        //         'timeZone': 'Asia/Calcutta',
        //     },
        //     'attendees': [
        //         {'email': 'awuahclement497@gmail.com'},
        //         {'email': 'samkofi.appiahkubi@gmail.com'},
        //     ],
        //     'reminders': {
        //         'useDefault': false,
        //         'overrides': [
        //             {'method': 'email', 'minutes': 24 * 60},
        //             {'method': 'popup', 'minutes': 15},
        //         ],
        //     },
        // };
        const event = {
            'summary': 'Herkat with Samuel',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'Powered by @Herkat',
            'start': {
                'dateTime': '2024-05-02T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': '2024-05-02T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'attendees': [
                {'email': 'awuahclement497@gmail.com'},
                {'email': 'samkofi.appiahkubi@gmail.com'},
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        };
          
        const evResp = await this._calendar.events.insert({
            auth: this._oauth,
            calendarId: 'awuahclement497@gmail.com',
            sendNotifications: true,
            requestBody: event,
        });
        
        console.log(evResp);
    }

}