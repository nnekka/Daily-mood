import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "../components/auth-block/auth.service";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuthorized()){
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      })
    }

    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login'], {
              queryParams: {
                sessionFailed: true
              }
            })
          }
          return throwError(error)
        }
      )
    )
  }

}
