import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, of } from 'rxjs';
import { ConfirmService } from './confirm.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogOptions,
} from '../../shared/components/confirm-dialog/confirm-dialog.component';

describe('ConfirmService', () => {
  let service: ConfirmService;
  let dialog: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    dialog = {
      open: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ConfirmService,
        { provide: MatDialog, useValue: dialog },
      ],
    });

    service = TestBed.inject(ConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog with string message and emit true on confirmation', async () => {
    dialog.open.mockReturnValue({
      afterClosed: () => of(true),
    });

    const result = await firstValueFrom(service.confirm('Are you sure?'));

    expect(result).toBe(true);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      data: { message: 'Are you sure?' },
      width: '460px',
      maxWidth: '92vw',
      panelClass: 'omatic-confirm-dialog-panel',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    });
  });

  it('should open dialog with full options object and emit false when cancelled', async () => {
    dialog.open.mockReturnValue({
      afterClosed: () => of(false),
    });

    const options: ConfirmDialogOptions = {
      title: 'invoices.actions.cancelTitle',
      message: 'invoices.actions.cancelConfirm',
      detail: 'invoices.actions.cancelWarning',
      confirmLabel: 'invoices.actions.cancel',
      cancelLabel: 'common.cancel',
      icon: 'block',
      isDestructive: true,
    };

    const result = await firstValueFrom(service.confirm(options));

    expect(result).toBe(false);
    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      data: options,
      width: '460px',
      maxWidth: '92vw',
      panelClass: 'omatic-confirm-dialog-panel',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    });
  });

  it('should emit false when dialog is closed via backdrop dismissal (undefined)', async () => {
    dialog.open.mockReturnValue({
      afterClosed: () => of(undefined),
    });

    const result = await firstValueFrom(service.confirm('Confirm delete'));

    expect(result).toBe(false);
  });
});
