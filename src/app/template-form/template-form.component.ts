import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    // nome:'xxxx',
    // email:'xxxxx@email.com
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form) {
    console.log(form);
    // console.log(this.usuario)
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(dados =>  dados))
    .subscribe(dados => console.log(dados))
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm(form);

        this.http
          .get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(map((dados) => dados))
          .subscribe((dados) => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, formulario) {

    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   cep: dados.cep,
    //   numero: '',
    //   complemento: dados.complemento,
    //   bairro: dados.bairro,
    //   cidade: dados.localidade,
    //   estado: dados.uf,
    //   rua: dados.logradouro,
    // });

    formulario.form.patchValue({
      cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
      rua: dados.logradouro,
    });
  }

    resetaDadosForm(formulario){
      formulario.form.patchValue({
        cep: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
        rua: null,
      });
    }
}
