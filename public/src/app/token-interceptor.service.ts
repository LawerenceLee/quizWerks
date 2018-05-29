import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthHttpService } from './auth-http.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authHttpService = this.injector.get(AuthHttpService)
    let tokenizedReq = req.clone({
      setHeaders: {Authorization: `Bearer ${authHttpService.getToken()}`}
    })
    return next.handle(tokenizedReq)
  }
}
