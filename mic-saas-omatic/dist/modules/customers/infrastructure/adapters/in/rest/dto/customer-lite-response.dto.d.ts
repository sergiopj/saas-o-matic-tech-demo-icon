import { Customer } from '../../../../../domain/entities/customer.entity';
export declare class CustomerLiteResponseDto {
    id: string;
    companyName: string;
    country: string;
    static fromDomain(customer: Customer): CustomerLiteResponseDto;
}
