export interface SendEmailCommand {
  readonly to: string;
  readonly subject: string;
  readonly htmlBody: string;
}
