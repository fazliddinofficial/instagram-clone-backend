import { AuthService } from './auth.service';

export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
}
