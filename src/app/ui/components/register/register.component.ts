import { Create_User } from './../../../contracts/users/create_user';
import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/Common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 /**,Val
  *
  */
 constructor(private formBuilder :FormBuilder,private userService : UserService,private toastrService : CustomToastrService) {



 }
 frm:FormGroup
 ngOnInit(): void{
  this.frm = this.formBuilder.group({
    nameSurname: ["",[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
    username:["",[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
    email:["",[Validators.required,Validators.maxLength(250),Validators.email]],
    password:["",[Validators.required]],
    passwordConfirm:["",[Validators.required]]
  },{
    validators:(group:AbstractControl):ValidationErrors | null =>{
      let sifre = group.get("password").value;
      let sifreTekrar = group.get("passwordConfirm").value;
      return sifre === sifreTekrar ? null :{notSame:true};
    }
  })
 }
 submitted:boolean = false;
 async onSubmit(user:User){
this.submitted = true
if(this.frm.invalid)
  return;

 const result:Create_User =await this.userService.create(user);
 debugger;
 if(result.succeeded){
  this.toastrService.showMessage("Başarılı","",{toastMessageType:ToastrMessageType.Success,toastPosition:ToastrPosition.TopRight})
 }
 else
 {
  this.toastrService.showMessage("Başarısız","",{toastMessageType:ToastrMessageType.Error,toastPosition:ToastrPosition.TopRight})
 }

 }

 get component(){
  return this.frm.controls;
 }
}
