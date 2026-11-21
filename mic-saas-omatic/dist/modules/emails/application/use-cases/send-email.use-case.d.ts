import { SendEmailDto } from '../../infrastructure/adapters/in/rest/dto/send-email.dto';
import { HtmlSanitizerService } from '../../domain/services/html-sanitizer.service';
export interface SendEmailResult {
    success: boolean;
    messageId: string;
    recipient: string;
    subject: string;
    sanitizedBodyLength: number;
    dispatchedAt: string;
}
export declare class SendEmailUseCase {
    private readonly sanitizer;
    private readonly logger;
    constructor(sanitizer: HtmlSanitizerService);
    execute(dto: SendEmailDto): Promise<SendEmailResult>;
}
