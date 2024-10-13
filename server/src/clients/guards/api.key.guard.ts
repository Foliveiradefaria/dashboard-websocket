import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.header('AUTH-KEY')

    if (apiKey !== 'VALID-AUTH-KEY') {
      return false
    }
    return true
  }
}
