import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { KeycloakService } from 'keycloak-angular';

import { ErrorInterceptor } from './error.interceptor';

// Asumiendo que tus rutas están en un archivo app.routes.ts
// import { routes } from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        // IMPORTANTE: Reemplaza estos valores con los de tu servidor Keycloak
        url: 'http://localhost:8080', // Ejemplo: URL de tu servidor Keycloak
        realm: 'your-realm',          // Ejemplo: 'master' o tu realm específico
        clientId: 'your-client-id'    // Ejemplo: 'angular-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes), // Descomenta cuando tengas tus rutas
    provideHttpClient(withInterceptors([])), // Habilita el nuevo sistema de interceptores
    provideAnimationsAsync(),

    // Proveedores para Keycloak y el ErrorInterceptor
    KeycloakService,
    { provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService] },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
};