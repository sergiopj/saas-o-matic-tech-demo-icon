import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface ConfirmDialogOptions {
  title?: string;
  message: string;
  detail?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: string;
  isDestructive?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly data = inject<ConfirmDialogOptions>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  readonly title = this.data?.title ?? 'common.confirmTitle';
  readonly message = this.data?.message ?? '';
  readonly detail = this.data?.detail;
  readonly confirmLabel = this.data?.confirmLabel ?? 'common.confirm';
  readonly cancelLabel = this.data?.cancelLabel ?? 'common.cancel';
  readonly isDestructive = this.data?.isDestructive ?? false;
  readonly icon = this.data?.icon ?? (this.isDestructive ? 'warning' : 'help_outline');

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
