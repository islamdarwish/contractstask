import { Component, OnInit } from '@angular/core';
import {ContractModel} from '../models/contract.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  contract: ContractModel;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.contract = new ContractModel();
  }


  createContract (contractForm: FormData) {
    const formData = new FormData();
    formData.append('templateFile', this.contract.templateFile);
    formData.append('name', this.contract.name);
    formData.append('phone', this.contract.phone);
    formData.append('email', this.contract.email);
    formData.append('rentAmount', this.contract.rentAmount);

    this.http.post('http://localhost:3000/contracts', formData).subscribe(res => {
      const response: any = res;
      window.open('http://localhost:3000/contracts/' + response.fileName, '_blank');
    },
      error => {
      // alert(error);
      });
    console.log('form created', this.contract);
  }

  handleFileInput(files: FileList) {
    this.contract.templateFile = files.item(0);
  }

}
