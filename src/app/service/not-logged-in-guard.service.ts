import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {getSortHeaderNotContainedWithinSortError} from "@angular/material/sort/sort-errors";
import {ifStmt} from "@angular/compiler/src/output/output_ast";
import {AuthService} from "./auth.service";

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
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
      if (tickDate <= new Date()) {
        return true
      }
    } else {
      let access = localStorage.getItem("accessExp")
      if (access != null) {
        // @ts-ignore
        var ticksToMicrotimea = access / 10000;
        var epochMicrotimeDiffa = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var tickDatea = new Date(ticksToMicrotimea - epochMicrotimeDiffa);
        if (tickDatea <= new Date()) {
          return true
        }
      } else {
        return true
      }
    }
    this.router.navigate(['/logged']);
    return false;
  }


}
