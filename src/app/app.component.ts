import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
// import { * } from '@angular/fire/compat/firestore';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items!:Observable<any[]>;
  newValue!:string;

  title = 'testApp';
  clnRef = this.firestore.collection('items');
 
  constructor(private firestore: AngularFirestore){
    this.items = firestore.collection('items').valueChanges({idField:"id"});
    console.log(this.items)
  }

  delete(item:any){
    this.clnRef.doc(item.id).delete()
   this.clnRef.doc(item.id).delete().then(e=>{
     alert("deleted "+item.id);
   })
  }
  
  deleteField(fieldName:string,item:any){
     this.clnRef.doc(item.id).update({
     [fieldName]:null
     })
  }

  insert(){
    alert("inserting start")
    this.firestore.collection('items').add({
      itemName:this.newValue
    }).then(e=>{
      console.log(e)
      this.newValue = ""
      alert("done")
    })
  }

  update(item:any){
   this.clnRef.doc(item.id).update({
    itemName:item.itemName
   }).then(result=>{
     alert("updated")
   })
  }

  getData(item:any){
   this.clnRef.doc(item.id).get()
  }
  

}
