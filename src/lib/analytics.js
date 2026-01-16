import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

export const trackEvent = (eventName, eventParams) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  } else {
    console.error("Firebase Analytics is not initialized.");
  }
};
