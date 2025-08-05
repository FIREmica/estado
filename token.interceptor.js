var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
let TokenInterceptor = class TokenInterceptor {
    constructor(keycloak) {
        this.keycloak = keycloak;
    }
    // This interceptor is automatically managed by keycloak-angular if you set bearerExcludedUrls.
    // However, creating it manually gives more control.
    // Note: keycloak-angular automatically adds the token to requests. This is here for demonstration
    // in case you need to customize headers or handle specific cases.
    intercept(request, next) {
        // The keycloak-angular library automatically adds the bearer token.
        // No manual intervention is needed for basic scenarios.
        return next.handle(request);
    }
};
TokenInterceptor = __decorate([
    Injectable()
], TokenInterceptor);
export { TokenInterceptor };
