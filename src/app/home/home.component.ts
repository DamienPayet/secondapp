import {Component, ElementRef, OnInit} from '@angular/core';
import {interval, Observable} from "rxjs";
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Token} from "../models/token.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  authorizationToken : string;
  authorizationExpire : number;
  tcolor = "transparent";
  btnColor = "transparent";
  btnBgColor = "transparent";
  loading = false;
  constructor( private authService : AuthService , private route: ActivatedRoute ,private router: Router, private toastr: ToastrService) {
    document.body.style.backgroundColor = "#191919";
    this.authorizationToken = "" ;
    this.authorizationExpire = 0 ;
    this.route.queryParams.subscribe(params => {
      this.authorizationToken = params['bearer'];
      this.authorizationExpire = params['expire'];
    });
    if (this.authorizationToken){
      localStorage.setItem("bearer", this.authorizationToken);
      localStorage.setItem("bearerExp",this.authorizationExpire.toString());
      window.close();
    }
  }


  ngOnInit(): void {

  }

  rgb() {
    this.tcolor = this.generateColor();
    this.btnColor = "rgb(131,58,180)"
    this.btnBgColor = " linear-gradient(90deg, rgba(131,58,180,0.5690476874343487) 0%, rgba(253,29,29,0.23571435410101538) 50%, rgba(252,176,69,0.5550420851934523) 100%)"
  }

  gOAuth() {
    this.loading = true
    window.open("http://localhost:51595/auth?appId=45166135321651351");
    this.authService.login()
      .then(res =>
    {
      console.log(res);
      this.router.navigate(['/logged']);
    }).catch(errr => {
      this.toastr.error('Veuillez réessayer!', 'Echec de l\'authentification !');
      this.loading =false;
    });
  }

  generateColor() {
    let randomColor = (Math.floor(Math.random() * 0xFFFFFF)).toString(16);
    return "#" + randomColor;
  }

}
