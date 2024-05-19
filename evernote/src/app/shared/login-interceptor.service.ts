import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastr.error("Incorrect username or password", "Login error");
          this.router.navigate(['/login']);
        }
      }
    }));
  }
}
