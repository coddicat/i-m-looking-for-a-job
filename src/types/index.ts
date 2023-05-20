import type { Timestamp } from "firebase/firestore";

export type UserEntity = {
    isAnonymous: boolean;
    liked: boolean;
    lastVisitTime: Timestamp;
}

export type Properties = {
    JobSearchStartDateTime: Timestamp
} 