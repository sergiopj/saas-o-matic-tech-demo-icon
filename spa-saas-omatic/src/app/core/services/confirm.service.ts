import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ConfirmDialogComponent,
  ConfirmDialogOptions,
} from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private readonly dialog = inject(MatDialog);

  confirm(options: ConfirmDialogOptions | string): Observable<boolean> {
    const data: ConfirmDialogOptions =
      typeof options === 'string' ? { message: options } : options;

    const dialogRef: MatDialogRef<ConfirmDialogComponent, boolean> = this.dialog.open(
      ConfirmDialogComponent,
      {
        data,
        width: '460px',
        maxWidth: '92vw',
        panelClass: 'omatic-confirm-dialog-panel',
        autoFocus: 'first-tabbable',
        restoreFocus: true,
      },
    );

    return dialogRef.afterClosed().pipe(map((result) => !!result));
  }
}
