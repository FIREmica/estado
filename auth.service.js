var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor(keycloakService) {
        this.keycloakService = keycloakService;
    }
    /**
     * Inicia el proceso de login.
     * Redirige al usuario a la página de login de Keycloak.
     * @param options Opciones de login, como el URI de redirección.
     */
    async login(options) {
        await this.keycloakService.login(options);
    }
    /**
     * Cierra la sesión del usuario.
     * @param redirectUri URI opcional para redirigir después del logout.
     */
    async logout(redirectUri) {
        // Si no se provee un redirectUri, por defecto usa la página actual.
        await this.keycloakService.logout(redirectUri || window.location.origin);
    }
    /**
     * Verifica si el usuario está autenticado.
     * @returns Una promesa que resuelve a `true` si el usuario está logueado, `false` en caso contrario.
     */
    async isLoggedIn() {
        return this.keycloakService.isLoggedIn();
    }
    /**
     * Carga el perfil del usuario desde Keycloak.
     * @param forceReload Si es `true`, fuerza la recarga desde el servidor.
     * @returns Una promesa que resuelve con el perfil del usuario.
     */
    loadUserProfile(forceReload = false) {
        return this.keycloakService.loadUserProfile(forceReload);
    }
    /**
     * Obtiene los roles del usuario.
     * @returns Un array de strings con los roles del usuario.
     */
    getUserRoles() {
        return this.keycloakService.getUserRoles();
    }
    /**
     * Obtiene el token de autenticación.
     * `keycloak-angular` lo añade automáticamente a las peticiones HTTP,
     * pero puedes obtenerlo manualmente si es necesario.
     * @returns Una promesa que resuelve con el token en formato string.
     */
    getToken() {
        return this.keycloakService.getToken();
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AuthService);
export { AuthService };
