import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Token} from "../models/token.model";
import {interval} from "rxjs";


@Injectable()
export class AuthService {

  url = "http://localhost:7071";
  isAuth: boolean;
  bearer: Token | undefined;
  access: Token | undefined;
  refresh: Token | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.isAuth = false;
  }

  login() {
    return new Promise((resolve, reject) => {
      let waiter = interval(1000);
      let subwait = waiter.subscribe({
        next: value => {
          console.log(value)
          if (value > 120) {
            reject();
            subwait.unsubscribe();
          }
          if (localStorage.getItem("bearer")) {
            this.getAccessToken(localStorage.getItem("bearer"))
              .then(res => {
                resolve(true)
                subwait.unsubscribe();
              })
              .catch(reject)
          }
        }
      })
    })
  }

  getAccessToken(bearer: string | null) {
    let params = new HttpParams();
    // @ts-ignore
    params = params.append('bearer', bearer);
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(this.url + '/api/ForgeToken', {params: params})
        .subscribe({
          next: val => {
            localStorage.clear();
            this.access = new Token(val.token, this.GetExpiration(val.token));
            localStorage.setItem("access", this.access.content);
            localStorage.setItem("accessExp", this.access.expir.toString());
            this.refresh = new Token(val.refreshToken, this.GetExpiration(val.refreshToken));
            localStorage.setItem("refresh", this.refresh.content);
            localStorage.setItem("refreshExp", this.refresh.expir.toString());
            resolve(true);
          },
          error: err => reject(err)
        })
    })
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(["/auth"]);
  }


  private GetExpiration(token: string) {
    return JSON.parse(this.b64DecodeUnicode(this.replaceBadCaractere(token.split('.')[1]))).ExDate;
  }

  private b64DecodeUnicode(str: string) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  private replaceBadCaractere(str: string) {
    let newString = str.replace('_', '/').replace('-', '+');
    switch (newString.length % 4) {
      case 2 :
        newString = newString + "==";
        break;
      case 3 :
        newString = newString + "=";
        break
    }
    return newString;
  }

}
