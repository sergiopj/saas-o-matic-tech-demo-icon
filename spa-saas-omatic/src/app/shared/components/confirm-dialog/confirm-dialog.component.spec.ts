import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import {
  ConfirmDialogComponent,
  ConfirmDialogOptions,
} from './confirm-dialog.component';
import { I18nService } from '../../../core/services/i18n.service';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef: { close: ReturnType<typeof vi.fn> };

  const defaultData: ConfirmDialogOptions = {
    message: 'Are you sure you want to proceed?',
  };

  const createComponent = async (data: ConfirmDialogOptions) => {
    mockDialogRef = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: mockDialogRef },
        I18nService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create with default options and fallbacks', async () => {
    await createComponent(defaultData);

    expect(component).toBeTruthy();
    expect(component.title).toBe('common.confirmTitle');
    expect(component.message).toBe('Are you sure you want to proceed?');
    expect(component.confirmLabel).toBe('common.confirm');
    expect(component.cancelLabel).toBe('common.cancel');
    expect(component.isDestructive).toBe(false);
    expect(component.icon).toBe('help_outline');
  });

  it('should render custom destructive options and badge', async () => {
    const customData: ConfirmDialogOptions = {
      title: 'invoices.actions.cancelTitle',
      message: 'invoices.actions.cancelConfirm',
      detail: 'invoices.actions.cancelWarning',
      confirmLabel: 'invoices.actions.cancel',
      cancelLabel: 'common.cancel',
      icon: 'block',
      isDestructive: true,
    };

    await createComponent(customData);

    expect(component.isDestructive).toBe(true);
    expect(component.icon).toBe('block');

    const container = fixture.debugElement.query(By.css('.confirm-dialog-container'));
    expect(container.nativeElement.classList.contains('is-destructive')).toBe(true);

    const badge = fixture.debugElement.query(By.css('.header-icon-badge'));
    expect(badge.nativeElement.classList.contains('destructive-badge')).toBe(true);

    const detail = fixture.debugElement.query(By.css('.detail-box'));
    expect(detail).toBeTruthy();
    expect(detail.nativeElement.classList.contains('destructive-detail')).toBe(true);

    const confirmBtn = fixture.debugElement.query(By.css('.confirm-btn'));
    expect(confirmBtn.nativeElement.classList.contains('destructive-btn')).toBe(true);
  });

  it('should close with true when onConfirm is called', async () => {
    await createComponent(defaultData);

    const confirmBtn = fixture.debugElement.query(By.css('.confirm-btn'));
    confirmBtn.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close with false when onCancel is called', async () => {
    await createComponent(defaultData);

    const cancelBtn = fixture.debugElement.query(By.css('.cancel-btn'));
    cancelBtn.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close with false when clicking the header close button', async () => {
    await createComponent(defaultData);

    const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
    closeBtn.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
