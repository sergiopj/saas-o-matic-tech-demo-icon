import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { SlideOverDrawerComponent } from '../../../../shared/components/slide-over-drawer/slide-over-drawer.component';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { Invoice, InvoiceStatus } from '../../models/invoice.model';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { InvoiceCreateDialogComponent } from '../../components/invoice-create-dialog/invoice-create-dialog.component';

@Component({
  selector: 'app-invoice-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    TranslatePipe,
    PaginatorComponent,
    SlideOverDrawerComponent,
  ],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent implements OnInit {
  private readonly invoiceApi = inject(InvoiceApiService);
  private readonly toast = inject(ToastService);
  private readonly i18n = inject(I18nService);
  private readonly dialog = inject(MatDialog);

  readonly invoices = signal<Invoice[]>([]);
  readonly totalInvoices = signal<number>(0);
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly selectedStatus = signal<InvoiceStatus | 'ALL'>('ALL');
  readonly selectedInvoice = signal<Invoice | null>(null);
  readonly isDrawerOpen = signal<boolean>(false);
  readonly loading = this.invoiceApi.loading;

  readonly totalInvoiced = computed(() =>
    this.invoices().reduce((acc, inv) => acc + inv.totalAmount, 0),
  );

  readonly pendingAmount = computed(() =>
    this.invoices()
      .filter((inv) => inv.status === 'ISSUED')
      .reduce((acc, inv) => acc + inv.totalAmount, 0),
  );

  readonly paidAmount = computed(() =>
    this.invoices()
      .filter((inv) => inv.status === 'PAID')
      .reduce((acc, inv) => acc + inv.totalAmount, 0),
  );

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    const status = this.selectedStatus() === 'ALL' ? undefined : this.selectedStatus();
    this.invoiceApi
      .search({
        status: status as InvoiceStatus | undefined,
        page: this.currentPage(),
        limit: this.pageSize(),
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      })
      .subscribe({
        next: (res) => {
          this.invoices.set(res.items);
          this.totalInvoices.set(res.total);
        },
      });
  }

  filterByStatus(status: InvoiceStatus | 'ALL'): void {
    this.selectedStatus.set(status);
    this.currentPage.set(1);
    this.loadInvoices();
  }

  openDrawer(invoice: Invoice): void {
    this.selectedInvoice.set(invoice);
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
    this.selectedInvoice.set(null);
  }

  markAsPaid(invoice: Invoice): void {
    this.invoiceApi.updateStatus(invoice.id, 'PAID').subscribe({
      next: (updated) => {
        this.toast.success(this.i18n.t('invoices.actions.paidSuccess'));
        this.invoices.update((list) =>
          list.map((inv) => (inv.id === updated.id ? updated : inv)),
        );
        if (this.selectedInvoice()?.id === updated.id) {
          this.selectedInvoice.set(updated);
        }
      },
    });
  }

  downloadPdf(invoice: Invoice): void {
    this.invoiceApi.downloadPdf(invoice.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${invoice.invoiceNumber}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.toast.success(this.i18n.t('invoices.actions.pdfDownloaded'));
      },
      error: () => {
        this.toast.error(this.i18n.t('invoices.actions.pdfDownloadError'));
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(InvoiceCreateDialogComponent, {
      width: '620px',
      maxWidth: '95vw',
      panelClass: 'corporate-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.currentPage.set(1);
        this.loadInvoices();
      }
    });
  }
}
