import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private keycloak: KeycloakService) {}

  // This interceptor is automatically managed by keycloak-angular if you set bearerExcludedUrls.
  // However, creating it manually gives more control.
  // Note: keycloak-angular automatically adds the token to requests. This is here for demonstration
  // in case you need to customize headers or handle specific cases.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // The keycloak-angular library automatically adds the bearer token.
    // No manual intervention is needed for basic scenarios.
    return next.handle(request);
  }
}