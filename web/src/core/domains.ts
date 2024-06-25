export type Availability = {
    day: string,
    startTime: string
    endTime: string
}

export type Service = {
    id:        string,
    uid:       string
    sid:       string
    type:      ServiceType
    focus:     ServiceFocus
    hairTypes: HairType[]
    genders:   Gender[]
    ages:      Age[]  
    sessions:  Session[]
    duration:  number
    price:     number
    currency:  string
}

export type HairType =
    'straight' |
    'wavy' |
    'curly' |
    'coily' |
    'kinky';

export type ServiceType  =
    'trim' |
    'braid' |
    'color' |
    'treatment';
  
export type ServiceFocus =
    'main' |
    'addon';
  
export type Gender =
    'male' |
    'female';
  
export type Age =
    'elderly' |
    'child' |
    'adult';
  
export type Session =
    'inoffice' |
    'inperson';