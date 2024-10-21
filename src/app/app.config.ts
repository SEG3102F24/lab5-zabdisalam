import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { routes } from './app.routes';
import { environment } from '../environments/environment'; // Import environment

// Initialize Firebase with the environment config
const firebaseApp = initializeApp(environment.firebaseConfig);
export const db = getFirestore(firebaseApp); // Export Firestore instance

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
