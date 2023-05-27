import type { Timestamp } from 'firebase/firestore';

export type UserEntity = {
  isAnonymous: boolean;
  liked: boolean;
  lastVisitTime: Timestamp;
};

export type Properties = {
  about: string;
  startDateTime: Timestamp;
  email: string;
  subtitle: string;
  title: string;
};

export type Link = {
  icon: string;
  text: string;
  url: string;
};
