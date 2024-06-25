type Hair =   'straight' | 'wavy' | 'curly' | 'coily';

type Gender = 'male' | 'female';

type Age = 'elderly' | 'child' | 'adult';

type Session = 'inperson' | 'inoffice';

export interface Service {
    hairTypes: Hair[], 
    genderPrefs: Gender[], 
    agePrefs: Age[], 
    sessionPrefs: Session[], 
    duration: number,
    price: number,
    currency: string
}