import { QuickPrompt } from '../models/ai-assistant.model';

export const QUICK_PROMPTS: readonly QuickPrompt[] = [
  {
    id: 'prompt_pricing',
    labelKey: 'assistant.prompts.pricing',
    icon: 'calculate',
  },
  {
    id: 'prompt_simulations',
    labelKey: 'assistant.prompts.simulations',
    icon: 'tune',
  },
  {
    id: 'prompt_fiscal',
    labelKey: 'assistant.prompts.fiscal',
    icon: 'verified_user',
  },
  {
    id: 'prompt_invoices',
    labelKey: 'assistant.prompts.invoices',
    icon: 'receipt_long',
  },
  {
    id: 'prompt_currencies',
    labelKey: 'assistant.prompts.currencies',
    icon: 'currency_exchange',
  },
  {
    id: 'prompt_architecture',
    labelKey: 'assistant.prompts.architecture',
    icon: 'lan',
  },
  {
    id: 'prompt_customers',
    labelKey: 'assistant.prompts.customers',
    icon: 'business',
  },
  {
    id: 'prompt_challenge',
    labelKey: 'assistant.prompts.challenge',
    icon: 'help_outline',
  },
];
