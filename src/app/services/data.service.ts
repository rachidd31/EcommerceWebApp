import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {Client} from "../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add student
  addStudent(student : Client) {
    student.id = parseInt(this.afs.createId());
    return this.afs.collection('/Students').add(student);
  }

  // get all students
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  // delete student
  deleteStudent(student : Client) {
     this.afs.doc('/Students/'+student.id).delete();
  }

  // update student
  updateStudent(student : Client) {
    this.deleteStudent(student);
    this.addStudent(student);
  }

}
