import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin:boolean=false;

  userEmail:string | null | undefined="";

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // login method
  login(email : string, password : string) {
    console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
      console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        if(res.user?.emailVerified == true) {
          this.isLogin=true;
          console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          console.log(this.isLogin)
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['/varify-email']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string) {
    console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      // this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.isLogin=false;
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

      const user = res.user;
       this.userEmail = user?.email;

      // Set email as a label or use it as needed
      if (this.userEmail) {
        // Assuming you have a property for the email in your component
        // this.userEmailLabel = userEmail;

        // If you want to store the email in localStorage
        localStorage.setItem('userEmail', this.userEmail);
      }


      this.isLogin=true;
      this.router.navigate(['/home']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }




}
