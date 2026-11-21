export interface CustomerProperties {
    id: string;
    companyName: string;
    taxId: string;
    email: string;
    country: string;
    selectedPlan: string;
    createdAt: Date;
}
export interface CreateCustomerPayload {
    id?: string;
    companyName: string;
    taxId: string;
    email: string;
    country: string;
    selectedPlan: string;
}
export interface UpdateCustomerPayload {
    companyName?: string;
    taxId?: string;
    email?: string;
    country?: string;
    selectedPlan?: string;
}
export declare class Customer {
    private readonly id;
    private readonly companyName;
    private readonly taxId;
    private readonly email;
    private readonly country;
    private readonly selectedPlan;
    private readonly createdAt;
    private constructor();
    static create(payload: CreateCustomerPayload, idGenerator: () => string): Customer;
    static reconstitute(props: CustomerProperties): Customer;
    update(payload: UpdateCustomerPayload): Customer;
    private static validateCompanyName;
    private static validateCountry;
    private static validateTaxId;
    private static validateEmail;
    private static validatePlan;
    getId(): string;
    getCompanyName(): string;
    getTaxId(): string;
    getEmail(): string;
    getCountry(): string;
    getSelectedPlan(): string;
    getCreatedAt(): Date;
    toJSON(): CustomerProperties;
}
