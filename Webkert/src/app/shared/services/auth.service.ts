import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {emailPattern} from '../regex';
import {firstValueFrom} from 'rxjs';
import {openDatabase} from 'ngx-indexed-db/lib/ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore) {
  }

  async login(username: string, password: string) {
    // Login with e-mail
    if (new RegExp(emailPattern).test(username)) {
      await this.auth.signInWithEmailAndPassword(username, password).catch(() => {
        throw Error('Wrong credentials.');
      });
      return;
    }

    // Login with username
    const observable$ = this.getUserByUsername(username);
    await firstValueFrom(observable$).then(value => {
      if (value.empty) {
        throw Error('No e-mail found for username.');
      }
      username = value.docs[0].get('email');
    });
    await this.auth.signInWithEmailAndPassword(username, password).catch(() => {
      throw Error('Wrong credentials.');
    });
  }


  async register(username: string, email: string, password: string): Promise<void> {
    await this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.afs.collection('user_ids').add({
        username: username,
        email: email
      });
    });
  }

  public getUserByEmail(email: string) {
    return this.afs.collection('user_ids', ref => ref.where('email', '==', email).limit(1)).get();
  }

  public getUserByUsername(username: string) {
    return this.afs.collection('user_ids', ref => ref.where('username', '==', username).limit(1)).get();
  }

  isAuthenticated() {
    return this.auth.user;
  }

  logout() {
    this.auth.signOut().catch(console.error);
  }
}
