import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const addheaderInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  if(token){
    const clone = req.clone({
      headers:req.headers.set('Authorization',`Bearer ${token}`)
    })
    return next(clone)
  }else{
  return next(req);
  }
};
