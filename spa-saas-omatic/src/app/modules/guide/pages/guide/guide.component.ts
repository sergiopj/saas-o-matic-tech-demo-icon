import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

export interface GuideStep {
  stepNumber: string;
  titleKey: string;
  descKey: string;
  icon: string;
  route: string;
  routeLabelKey: string;
}

export interface GuideFeature {
  icon: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  route?: string;
}

export interface GuideFaq {
  questionKey: string;
  answerKey: string;
  icon: string;
}

@Component({
  selector: 'app-guide',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent {
  readonly steps: readonly GuideStep[] = [
    {
      stepNumber: '01',
      titleKey: 'guide.step1.title',
      descKey: 'guide.step1.desc',
      icon: 'domain',
      route: '/customers',
      routeLabelKey: 'guide.step1.action',
    },
    {
      stepNumber: '02',
      titleKey: 'guide.step2.title',
      descKey: 'guide.step2.desc',
      icon: 'tune',
      route: '/simulations',
      routeLabelKey: 'guide.step2.action',
    },
    {
      stepNumber: '03',
      titleKey: 'guide.step3.title',
      descKey: 'guide.step3.desc',
      icon: 'receipt_long',
      route: '/invoices',
      routeLabelKey: 'guide.step3.action',
    },
  ];

  readonly features: readonly GuideFeature[] = [
    {
      icon: 'speed',
      titleKey: 'guide.featDashboard.title',
      descKey: 'guide.featDashboard.desc',
      tagKey: 'guide.featDashboard.tag',
      route: '/home',
    },
    {
      icon: 'verified_user',
      titleKey: 'guide.featCustomers.title',
      descKey: 'guide.featCustomers.desc',
      tagKey: 'guide.featCustomers.tag',
      route: '/customers',
    },
    {
      icon: 'trending_up',
      titleKey: 'guide.featSimulations.title',
      descKey: 'guide.featSimulations.desc',
      tagKey: 'guide.featSimulations.tag',
      route: '/simulations',
    },
    {
      icon: 'request_quote',
      titleKey: 'guide.featInvoices.title',
      descKey: 'guide.featInvoices.desc',
      tagKey: 'guide.featInvoices.tag',
      route: '/invoices',
    },
    {
      icon: 'currency_exchange',
      titleKey: 'guide.featCurrency.title',
      descKey: 'guide.featCurrency.desc',
      tagKey: 'guide.featCurrency.tag',
    },
    {
      icon: 'security',
      titleKey: 'guide.featSecurity.title',
      descKey: 'guide.featSecurity.desc',
      tagKey: 'guide.featSecurity.tag',
    },
  ];

  readonly faqs: readonly GuideFaq[] = [
    {
      questionKey: 'guide.faq1.question',
      answerKey: 'guide.faq1.answer',
      icon: 'help_outline',
    },
    {
      questionKey: 'guide.faq2.question',
      answerKey: 'guide.faq2.answer',
      icon: 'euro_symbol',
    },
    {
      questionKey: 'guide.faq3.question',
      answerKey: 'guide.faq3.answer',
      icon: 'cancel',
    },
  ];
}
