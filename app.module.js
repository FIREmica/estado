var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './error.interceptor';
import { TokenInterceptor } from './token.interceptor';
function initializeKeycloak(keycloak) {
    return () => keycloak.init({
        config: {
            url: 'http://localhost:8080', // Your keycloak server
            realm: 'sicetwo', // Your realm
            clientId: 'catalog-ui-client' // Your client ID for the frontend
        },
        initOptions: {
            onLoad: 'login-required', // Can be 'check-sso' or 'login-required'
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
        },
        // Bearer prefix is added by default, can be customized here
        bearerPrefix: 'Bearer',
    });
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            HttpClientModule,
            KeycloakAngularModule
        ],
        providers: [
            {
                provide: APP_INITIALIZER,
                useFactory: initializeKeycloak,
                multi: true,
                deps: [KeycloakService]
            },
            { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
