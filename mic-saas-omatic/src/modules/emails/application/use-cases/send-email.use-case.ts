import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SendEmailCommand } from '../ports/in/send-email.command';
import { HtmlSanitizerService } from '../../domain/services/html-sanitizer.service';

export interface SendEmailResult {
  success: boolean;
  messageId: string;
  recipient: string;
  subject: string;
  sanitizedBodyLength: number;
  dispatchedAt: string;
}

@Injectable()
export class SendEmailUseCase {
  private readonly logger = new Logger(SendEmailUseCase.name);

  constructor(private readonly sanitizer: HtmlSanitizerService) {}

  async execute(command: SendEmailCommand): Promise<SendEmailResult> {
    const cleanHtml = this.sanitizer.sanitize(command.htmlBody);
    const messageId = `msg-${uuidv4()}`;
    const dispatchedAt = new Date().toISOString();

    this.logger.log(
      `Dispatched email to [${command.to}] with subject "${command.subject}" (messageId: ${messageId})`
    );

    return {
      success: true,
      messageId,
      recipient: command.to,
      subject: command.subject,
      sanitizedBodyLength: cleanHtml.length,
      dispatchedAt,
    };
  }
}
