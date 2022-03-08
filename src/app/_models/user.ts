import {Photo} from 'src/app/_models/photo';

export interface User {
    id: number;
    username: string;
    knowsAs: string;
    age: number;
    gender: string;
    created: string;
    lastActive: string;
    photoUrl: string;
    city: string;
    country: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo [];
    roles: string [];
}