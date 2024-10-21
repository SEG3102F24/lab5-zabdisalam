// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';  // Make sure this path is correct

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Make sure your routes are imported
    provideFirebaseApp(() => initializeApp(environment.firebase)),  // Initialize Firebase with AngularFire
    provideFirestore(() => getFirestore())  // Provide Firestore with AngularFire
  ]
};
