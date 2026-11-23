import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Invoice,
  InvoiceCreate,
  InvoiceListResponse,
  InvoiceSortBy,
  InvoiceStatus,
} from '../models/invoice.model';
import { ProblemDetail } from '../../../core/errors/problem-detail.model';
import { I18nService } from '../../../core/services/i18n.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceApiService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);
  private readonly baseUrl = `${environment.apiBaseUrl}/invoices`;

  readonly loading = signal<boolean>(false);
  readonly error = signal<ProblemDetail | null>(null);

  private normalizeProblem(err: unknown): ProblemDetail {
    if (err && typeof err === 'object' && 'title' in err && 'status' in err && 'detail' in err) {
      return err as ProblemDetail;
    }
    return {
      type: 'about:blank',
      title: this.i18n.t('error.communication.title'),
      status: (err as { status?: number })?.status || 500,
      detail: this.i18n.t('error.communication.detail'),
      instance: this.baseUrl,
      timestamp: new Date().toISOString(),
    };
  }

  search(options?: {
    customerId?: string;
    status?: InvoiceStatus;
    page?: number;
    limit?: number;
    sortBy?: InvoiceSortBy;
    sortOrder?: 'ASC' | 'DESC';
  }): Observable<InvoiceListResponse> {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    if (options?.customerId) params = params.set('customerId', options.customerId);
    if (options?.status) params = params.set('status', options.status);
    if (options?.page) params = params.set('page', options.page.toString());
    if (options?.limit) params = params.set('limit', options.limit.toString());
    if (options?.sortBy) params = params.set('sortBy', options.sortBy);
    if (options?.sortOrder) params = params.set('sortOrder', options.sortOrder);

    return this.http
      .get<Invoice[]>(this.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Invoice[]>) => {
          const totalHeader = res.headers.get('x-total-count');
          const total = totalHeader ? Number.parseInt(totalHeader, 10) : (res.body?.length ?? 0);
          return {
            items: res.body ?? [],
            total: Number.isNaN(total) ? 0 : total,
          };
        }),
        catchError((err) => {
          const problem = this.normalizeProblem(err);
          this.error.set(problem);
          return throwError(() => problem);
        }),
        finalize(() => this.loading.set(false)),
      );
  }

  getById(id: string): Observable<Invoice> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Invoice>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => {
        const problem = this.normalizeProblem(err);
        this.error.set(problem);
        return throwError(() => problem);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  create(payload: InvoiceCreate): Observable<Invoice> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.post<Invoice>(this.baseUrl, payload).pipe(
      catchError((err) => {
        const problem = this.normalizeProblem(err);
        this.error.set(problem);
        return throwError(() => problem);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  updateStatus(id: string, status: InvoiceStatus): Observable<Invoice> {
    this.loading.set(true);
    this.error.set(null);

    return this.http
      .patch<Invoice>(`${this.baseUrl}/${id}/status`, { status })
      .pipe(
        catchError((err) => {
          const problem = this.normalizeProblem(err);
          this.error.set(problem);
          return throwError(() => problem);
        }),
        finalize(() => this.loading.set(false)),
      );
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/pdf`, {
      responseType: 'blob',
    });
  }
}
