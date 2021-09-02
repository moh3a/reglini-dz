export interface IEmailOptions {
  from?: string;
  to?: string | null;
  subject: string;
  text: string;
}
