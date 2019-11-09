import { Injectable } from '@angular/core';
import { ContactDetail } from './contact-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactDetailService {

  formData : ContactDetail; // Données saisies dans le formulaire
  readonly rootURL = 'http://localhost:53022/api'; //URL de l'API qui gère la base de donnée
  readonly apiGouvURL = 'https://geo.api.gouv.fr/communes?codePostal='; //URL de l'API Gouv
  list : ContactDetail[]; // Modèle

  constructor(private http:HttpClient) { } //Injection pour les requêtes HTTP

  // Methode POST 
  postContactDetail(){
    return this.http.post(this.rootURL+'/ContactDetails', this.formData)
  }

  // Methode PUT
  putContactDetail(){
    return this.http.put(this.rootURL+'/ContactDetails/'+this.formData.id, this.formData)
  }

  // Methode DELETE
  deleteContactDetail(id){
    return this.http.delete(this.rootURL+'/ContactDetails/'+id)
  }

  // Methode GET 
  refreshList(){
    this.http.get(this.rootURL+'/ContactDetails')
    .toPromise() //Callback
    .then(res => this.list = res as ContactDetail[]) // Affectation des données reçues aux propriétés du contact pour l'affichage de la liste de contacts
  }

  // Methode GET POSTAL CODE 
  // Appel de l'API GOUV permettant de récupérer la ville à travers un code postal
  getCityByPostalCode(code){
     return this.http.get(this.apiGouvURL+code) 
  }
}
 