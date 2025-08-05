import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment'; // Asumiendo una configuración de entorno
import { AuthService } from './auth.service';
// import { Router } from '@angular/router'; // Para redirigir

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
    // private router: Router // Ejemplo: Inyectar Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado. Por favor, intente de nuevo.';

        if (error.status === 0) {
          // Error de red o del lado del cliente.
          errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
        } else if (error.error?.violations) {
          // Captura de errores de validación específicos de Quarkus.
          errorMessage = error.error.violations.map((v: { message: string }) => v.message).join('\n');
        } else {
          // Errores del lado del servidor.
          switch (error.status) {
            case 401:
              errorMessage = 'No autorizado. Su sesión puede haber expirado.';
              // Keycloak maneja el refresh token. Si aún así falla, un logout es apropiado.
              this.authService.logout();
              break;
            case 403:
              errorMessage = 'Acceso denegado. No tiene permisos para realizar esta acción.';
              break;
            case 404:
              errorMessage = 'El recurso solicitado no fue encontrado.';
              break;
            case 500:
              errorMessage = 'Error interno del servidor. Contacte al administrador.';
              break;
          }
        }

        // Log del error en la consola solo para entornos de desarrollo
        if (!environment.production) {
          console.error('HTTP Error Interceptado:', { error, request });
        }

        // TODO: En producción, considera enviar el error a un servicio de logging (ej. Sentry, LogRocket).

        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 7000, // Duración más larga para que el usuario pueda leer el error.
          panelClass: ['mat-toolbar', 'mat-warn'] // Estilo visual de error.
        });

        return throwError(() => error);
      })
    );
  }
}