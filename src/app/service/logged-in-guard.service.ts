import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router, private httpClient: HttpClient) {
  }


   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /**
     * Test si un bearer existe, si oui on recupere un access
     */
    let bearer = localStorage.getItem("bearerExp")
    if (bearer != null) {
      // @ts-ignore
      var ticksToMicrotime = bearer / 10000;
      var epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
      var tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
      if (tickDate > new Date()) {
         this.authService.getAccessToken(<string>localStorage.getItem("bearer"))
          .then(r => {console.log("token ok")})
          .catch(err => {console.error("impossible de recuperer le token")})
        return true;


      }
    }
    /**
     * Test si un access token existe
     */
    let access = localStorage.getItem("accessExp")
    if (access != null) {
      // @ts-ignore
      var ticksToMicrotimea = access / 10000;
      var epochMicrotimeDiffa = Math.abs(new Date(0, 0, 1).setFullYear(1));
      var tickDatea = new Date(ticksToMicrotimea - epochMicrotimeDiffa);
      if (tickDatea > new Date()) {
        return true
      }
    }
    this.router.navigate(['']);
    return false
  }
}
