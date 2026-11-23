import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  {
    path: '/home',
    labelKey: 'sidebar.home',
    icon: 'home',
  },
  {
    path: '/customers',
    labelKey: 'sidebar.customers',
    icon: 'groups',
  },
  {
    path: '/simulations',
    labelKey: 'sidebar.simulations',
    icon: 'calculate',
  },
  {
    path: '/invoices',
    labelKey: 'sidebar.invoices',
    icon: 'receipt_long',
  },
] as const;

export const BOTTOM_NAV_ITEMS: readonly NavItem[] = [
  {
    path: '/guide',
    labelKey: 'sidebar.guide',
    icon: 'menu_book',
  },
  {
    path: '/contact',
    labelKey: 'sidebar.contact',
    icon: 'support_agent',
  },
] as const;

export const APP_NAV_ITEMS: readonly NavItem[] = [
  ...MAIN_NAV_ITEMS,
  ...BOTTOM_NAV_ITEMS,
] as const;

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly isCollapsed = signal<boolean>(false);
  readonly currentYear = new Date().getFullYear();
  readonly mainNavItems = MAIN_NAV_ITEMS;
  readonly bottomNavItems = BOTTOM_NAV_ITEMS;
  readonly navItems = APP_NAV_ITEMS;

  toggleCollapse(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
