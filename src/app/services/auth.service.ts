import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider,getAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireFunctions} from "@angular/fire/compat/functions";


// import * as admin from 'firebase-admin';
//
//
// const serviceAccount = require('service_account.json');
// admin.initializeApp(
//
//     {credential: admin.credential.cert(serviceAccount)}
// );



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;

  isAdmin: boolean = false;

  userEmail: string | null | undefined = "";






  // const admin = require('firebase-admin');

  constructor(private fireauth: AngularFireAuth,
              private router: Router,
              private functions: AngularFireFunctions,
              private db: AngularFireDatabase
  ) {
  }







  //  async listAllUsers(nextPageToken: any| undefined): Promise<void> {
  //   try {
  //     // List batch of users, 1000 at a time.
  //     const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
  //
  //     listUsersResult.users.forEach((userRecord) => {
  //       console.log('user', userRecord.toJSON());
  //     });
  //
  //     if (listUsersResult.pageToken) {
  //       // List next batch of users.
  //       await this.listAllUsers(listUsersResult.pageToken);
  //     }
  //   } catch (error) {
  //     console.log('Error listing users:', error);
  //   }
  // }






  // login method
  login(email: string, password: string) {

    if (email === "rachidjarmouni1972@gmail.com" && password === "admin1234") {
      this.isLogin = true;
      console.log("Login successful!");
      this.router.navigate(["home"])
      this.isAdmin = true;
      return
    }

    console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      if (res.user?.emailVerified == true) {
        this.isLogin = true;
        console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(this.isLogin)
        this.router.navigate(['home']);
      } else {
        console.log("You are not loged by any Account")
      }

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string) {
    console.log("rachid @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      // this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      // this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.isAdmin = false;
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.isLogin = false;
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  // forgotPassword(email : string) {
  //     this.fireauth.sendPasswordResetEmail(email).then(() => {
  //       this.router.navigate(['/varify-email']);
  //     }, err => {
  //       alert('Something went wrong');
  //     })
  // }

  // email varification
  // sendEmailForVarification(user : any) {
  //   console.log(user);
  //   user.sendEmailVerification().then((res : any) => {
  //     this.router.navigate(['/varify-email']);
  //   }, (err : any) => {
  //     alert('Something went wrong. Not able to send mail to your email.')
  //   })
  // }

  //sign in with google
  googleSignIn() {

    this.isAdmin = true;
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


      this.isLogin = true;
      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }


  // getUsers(): Observable<any[]> {
  //   // Fetch users from Firebase Authentication
  //   return this.fireauth.authState.pipe();
  // }


  // async getUsers(): Promise<Observable<any>> {
  //
  //   console.log("==============================")
  //
  //     // Fetch all users from Firebase Authentication
  //     const users = await this.fireauth.authState.pipe(take(1)).toPromise();
  //     const lista:Observable<any>
  //     if (users) {
  //       console.log("=============@@@@@@@@@@@@@@@@@@================")
  //       // @ts-ignore
  //       for (const user of users) {
  //         lista.add(user)
  //         const userId = user.uid;
  //         console.log("User ID: ", userId);
  //
  //
  //       }
  //       return lista
  //     } else {
  //       console.error('Error creating carts for all users:');
  //       // Handle the error as needed
  //     }
  //
  //
  // }







  // deleteUser(uid: string): Promise<void> {
  //   // Delete a user by UID
  //   return getAuth()
  //       .deleteUser(uid)
  //       .then(() => {
  //         // Also, you might want to remove the user from your database or any other related data
  //         return this.db.object(`/users/${uid}`).remove();
  //       })
  //       .catch((error) => {
  //         console.error('Error deleting user:', error);
  //         throw error;
  //       });
  // }
  //
  // disableUser(uid: string): Promise<void> {
  //   // Disable a user by UID
  //   return this.fireauth
  //       .updateUser(uid, { disabled: true })
  //       .then(() => {
  //         // Also, you might want to update the user's status in your database or any other related data
  //         return this.db.object(`/users/${uid}`).update({ disabled: true });
  //       })
  //       .catch((error) => {
  //         console.error('Error disabling user:', error);
  //         throw error;
  //       });
  // }




}
