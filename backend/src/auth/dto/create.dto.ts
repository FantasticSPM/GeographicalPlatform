export class CreateDto {
  user_id: string;
  refresh_token_hash: string;
  ip_address: string;
  expires_at: Date;
}
