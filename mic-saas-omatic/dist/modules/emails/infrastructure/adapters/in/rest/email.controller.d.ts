import { SendEmailDto } from './dto/send-email.dto';
import type { SendEmailResult } from '../../../../application/use-cases/send-email.use-case';
import { SendEmailUseCase } from '../../../../application/use-cases/send-email.use-case';
export declare class EmailController {
    private readonly sendEmailUseCase;
    constructor(sendEmailUseCase: SendEmailUseCase);
    sendEmail(dto: SendEmailDto): Promise<SendEmailResult>;
}
