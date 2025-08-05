import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import type { KeycloakProfile, KeycloakLoginOptions } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly keycloakService: KeycloakService) {}

  /**
   * Inicia el proceso de login.
   * Redirige al usuario a la página de login de Keycloak.
   * @param options Opciones de login, como el URI de redirección.
   */
  async login(options?: KeycloakLoginOptions): Promise<void> {
    await this.keycloakService.login(options);
  }

  /**
   * Cierra la sesión del usuario.
   * @param redirectUri URI opcional para redirigir después del logout.
   */
  async logout(redirectUri?: string): Promise<void> {
    // Si no se provee un redirectUri, por defecto usa la página actual.
    await this.keycloakService.logout(redirectUri || window.location.origin);
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns Una promesa que resuelve a `true` si el usuario está logueado, `false` en caso contrario.
   */
  async isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  /**
   * Carga el perfil del usuario desde Keycloak.
   * @param forceReload Si es `true`, fuerza la recarga desde el servidor.
   * @returns Una promesa que resuelve con el perfil del usuario.
   */
  loadUserProfile(forceReload = false): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile(forceReload);
  }

  /**
   * Obtiene los roles del usuario.
   * @returns Un array de strings con los roles del usuario.
   */
  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  /**
   * Obtiene el token de autenticación.
   * `keycloak-angular` lo añade automáticamente a las peticiones HTTP,
   * pero puedes obtenerlo manualmente si es necesario.
   * @returns Una promesa que resuelve con el token en formato string.
   */
  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }
}