import { Component, OnInit } from '@angular/core';
import { ContactDetailService } from 'src/app/shared/contact-detail.service';
import { ContactDetail } from 'src/app/shared/contact-detail.model';
import { ToastrService } from 'ngx-toastr';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-contact-detail-list',
  templateUrl: './contact-detail-list.component.html',
  styles: []
})
export class ContactDetailListComponent implements OnInit {
   
  constructor(private service : ContactDetailService,
  public settings : ContactDetailComponent,
  private toastr : ToastrService) {}

  //Initilisation 
  ngOnInit() {
    this.service.refreshList();
  }

  //Methode permettant de SET les informations d'un contact dans le formulaire afin de le modifier 
  populateForm(cd:ContactDetail){
    this.service.formData= Object.assign({},cd);
  }

  //Methode DELETE permet de supprimer un contact avec confirmation
  onDelete(id){
    if (confirm('Êtes-vous sûr de supprimer ce contact ?')){
      this.service.deleteContactDetail(id)
      .subscribe(res =>{
        this.service.refreshList();
        this.toastr.warning('Contact supprimé', "Carnet d'adresses")
      },
        err=>{
          console.log(err)
        })
    }
  }

  // Methode permettant l'affichage dynamique des adresses : 
  // -> si les adresses sont "null", elle ne s'afficheront pas 
  dynamicDisplay(address){
    if(address=='null')
      return false; 
    else
      return true;    
  }

  onSubmit (){
    this.settings.submitAfterSupress();
  }

}