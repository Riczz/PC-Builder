import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Build} from '../model/Build';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  collectionPath = 'builds';

  constructor(private afs: AngularFirestore) {
  }

  async createBuild(build: Build) {
    build.id = this.afs.createId();
    await this.afs.collection<Build>(this.collectionPath).doc(build.id).set(build).catch(console.error);
  }

  getBuilds() {
    return this.afs.collection<Build>(this.collectionPath).valueChanges();
  }

  getBuildsForUser(userId: string) {
    return this.afs
      .collection<Build>(this.collectionPath, ref => ref
        .where('user', '==', userId).orderBy('modify_time')).valueChanges();
  }

  deleteBuild(id: string) {
    return this.afs.collection(this.collectionPath).doc(id).delete().catch(console.error);
  }
}
