import { InvoicesModule } from './invoices.module';

describe('InvoicesModule', () => {
  it('should be defined and instantiable', () => {
    expect(InvoicesModule).toBeDefined();
    const module = new InvoicesModule();
    expect(module).toBeInstanceOf(InvoicesModule);
  });
});

