import { photo } from "./photo"

export interface Member{
    id:number,
    userName:string,
    photoUrl:string,
    age:number,
    knownAs:string,
    created:Date,
    lastActive:Date,
    gender:string,
    introduction:string,
    lookingFor:string,
    interest:string,
    city:string,
    country:string,
    photos:photo[],
    instaUrl:string,
    twitterUrl:string
}