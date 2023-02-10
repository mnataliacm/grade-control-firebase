import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DocumentData} from "firebase/firestore";
import { Auth, UserCredential, Unsubscribe, User } from "firebase/auth";

export interface FirebaseDocument{
  id:string;
  data:DocumentData;
}

export interface FirestoreImages{

}
export const FIRESTORE_GRADES_COLLECTION = 'controlnotas-ncm-grades';
export const FIRESTORE_MODULES_COLLECTION = 'controlnotas-ncm-modules';
export const FIRESTORE_STUDENTS_COLLECTION = 'controlnotas-ncm-students';
export const FIRESTORE_CLASSROOMS_COLLECTION = 'controlnotas-ncm-classroom';
export const FIRESTORE_TASKS_COLLECTION = 'controlnotas-ncm-tasks';
export const FIRESTORE_ASSIGNMENTS_COLLECTION = 'controlnotas-ncm-assignments';
export const FIRESTORE_IMAGES_COLLECTION = 'controlnotas-ncm-images';
export const FIRESTORAGE_PREFIX_PATH = 'controlnotas-ncm-images';


@Injectable({providedIn: 'root'})
export abstract class FirebaseService{

  protected active=false;
  protected app;
  protected db;
  protected webStorage;
  protected auth:Auth;
  protected analytics = null;
  protected user:User;
  protected _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();

  public abstract init();
  public abstract imageUpload(blob: Blob): Promise<any>;
  public abstract createDocument(collectionName:string, data:any):Promise<string>;
  public abstract createDocumentWithId(collectionName:string, data:any, docId:string):Promise<void>;
  public abstract updateDocument(collectionName:string, document:string, data:any):Promise<void>;
  public abstract getDocuments(collectionName:string):Promise<FirebaseDocument[]>;
  public abstract getDocument(collectionName:string, document:string):Promise<FirebaseDocument>;
  public abstract getDocumentsBy(collectionName:string, field:string, value:any):Promise<FirebaseDocument[]>;
  public abstract deleteDocument(collectionName:string, docId:string):Promise<void>;
  public abstract subscribeToCollection(collectionName: string, subject: BehaviorSubject<any[]>, mapFunction:(el:DocumentData)=>any):Unsubscribe
  public abstract setUserAndEmail(uid:string, email:string): any;
  public abstract createUserWithEmailAndPassword(email:string, password:string):Promise<UserCredential>;
  public abstract connectUserWithEmailAndPassword(email:string, password:string):Promise<UserCredential>;
  public abstract signOut();
  public abstract signOut(signInAnon:boolean);
  public abstract isUserConnected():Promise<boolean>;
  public abstract isUserConnectedAnonymously():Promise<boolean>;
  public abstract connectAnonymously():Promise<void>;
  public abstract deleteUser():Promise<void>;

  public getUser():User{
    return this.user;
  }

}
