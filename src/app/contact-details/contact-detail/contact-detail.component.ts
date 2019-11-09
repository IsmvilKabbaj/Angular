import { Component, OnInit } from '@angular/core';
import { ContactDetailService } from 'src/app/shared/contact-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styles: []
})

export class ContactDetailComponent implements OnInit {

  //Déclaration + Instantiation des booléens
  showA2=false;
  showA3=false;
  showB1=true;
  showB2=true;

  constructor(private service : ContactDetailService,
    private toastr : ToastrService) { }

  //Initialisation permettant de vider le formulaire
  ngOnInit() {
    this.resetForm();
  }
  
  //Initialisation permettant de vider le formulaire et 
  //de set des valeurs par défaut pour pouvoir poster
  resetForm(form?:NgForm){
  if(form != null)
    form.resetForm();
  this.service.formData={
    id:0,
    firstName:'',
    lastName:'',
    address1:'',
    cityPostalCode1:'',
    city1:'',
    address2:'null',
    cityPostalCode2:'null',
    city2:'null',
    address3:'null',
    cityPostalCode3:'null',
    city3:'null'
    }
    this.showA2=false;
    this.showA3=false;
    this.showB1=true;
    this.showB2=true;
  }

  //Click sur le bouton ENREGISTRER 
  onSubmit(form?:NgForm){
    //Insertion d'un nouveau contact
    if(this.service.formData.id==0) 
      this.insertRecord(form);    
    //Mise à jour des informations d'un contact
    else 
      this.updateRecord(form);
  }

  //Insertion d'un nouveau contact
  insertRecord(form:NgForm){
    this.service.postContactDetail().subscribe( //Appel + subscribe à la fonction POST 
      res => {
        this.resetForm(form);
        this.toastr.success('Contact enregisté', "Carnet d'adresses");
        this.service.refreshList();
      },
      err => {
        console.log(err); //Detection d'erreurs
      }
    )
  }
  
  //Mise à jour des informations d'un contact
  updateRecord(form:NgForm){
    this.service.putContactDetail().subscribe( //Appel + subscribe à la fonction PUT
      res => {
        this.resetForm(form);
        this.toastr.info('Contact modifié et enregisté', "Carnet d'adresses");
        this.service.refreshList();
      },
      err => {
        console.log(err); //Detection d'erreurs
      }
    )
  }
  
  //Ajout d'une deuxième adresse
  showAddress2(){
    this.showA2 = true;
    this.showB1 = false;
    //Reset des valeurs par défaut 
    this.service.formData.address2 ='';
    this.service.formData.cityPostalCode2 ='';  
    this.service.formData.city2 =''; 
    console.log("TEST OK");
  }
  showAddress3(){
    this.showA3 = true;
    this.showB2 = false;
    //Reset des valeurs par défaut
    this.service.formData.address3 ='';
    this.service.formData.cityPostalCode3 ='';  
    this.service.formData.city3 ='';
  }

  // Set de la ville correspondant au code postal entré par l'utilisateur  
  setCity1Name(code){
    this.service.getCityByPostalCode(code).subscribe((data)=>{ //Appel + écoute de la fonction GET
      console.log(data[0].nom); //Verification
      this.service.formData.city1  = data[0].nom; //Set de la ville 
    });   
  }
  setCity2Name(code){
    this.service.getCityByPostalCode(code).subscribe((data)=>{ //Appel + écoute de la fonction GET
      console.log(data[0].nom); //Verification
      this.service.formData.city2  = data[0].nom; //Set de la ville 
    });   
  }
  setCity3Name(code){
    this.service.getCityByPostalCode(code).subscribe((data)=>{ //Appel + écoute de la fonction GET
      console.log(data[0].nom); //Verification
      this.service.formData.city3  = data[0].nom; //Set de la ville 
    });   
  }

  submitAfterSupress(){
    this.onSubmit();
  }

}
