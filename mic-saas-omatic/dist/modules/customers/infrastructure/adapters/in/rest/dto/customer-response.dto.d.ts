import { Customer } from "../../../../../domain/entities/customer.entity";
export declare class CustomerResponseDto {
    id: string;
    companyName: string;
    taxId: string;
    email: string;
    country: string;
    selectedPlan: string;
    createdAt: string;
    static fromDomain(customer: Customer): CustomerResponseDto;
}
