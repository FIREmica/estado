<div class="container">
  <div class="header">
    <h1>Catálogo de Bienes y Servicios</h1>
    <button mat-raised-button color="primary" routerLink="/catalog/new">
      <mat-icon>add</mat-icon>
      Agregar Nuevo Ítem
    </button>
  </div>

  <mat-table [dataSource]="items$ | async" class="mat-elevation-z8">

    <!-- Code Column -->
    <ng-container matColumnDef="code">
      <mat-header-cell *matHeaderCellDef> Código </mat-header-cell>
      <mat-cell *matCellDef="let item"> {{item.code}} </mat-cell>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
      <mat-cell *matCellDef="let item"> {{item.name}} </mat-cell>
    </ng-container>

    <!-- Description Column -->
    <ng-container matColumnDef="description">
      <mat-header-cell *matHeaderCellDef> Descripción </mat-header-cell>
      <mat-cell *matCellDef="let item"> {{item.description}} </mat-cell>
    </ng-container>

    <!-- Actions Column -->
    <ng-container matColumnDef="actions">
        <mat-header-cell *matHeaderCellDef> Acciones </mat-header-cell>
        <mat-cell *matCellDef="let item">
            <button mat-icon-button color="primary" [routerLink]="['/catalog/edit', item.id]" aria-label="Editar ítem">
                <mat-icon>edit</mat-icon>
            </button>
        </mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
</div>