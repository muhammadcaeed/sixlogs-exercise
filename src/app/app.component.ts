import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form;
  users;
  edit=false;
  alert = {};
  submit;
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService
  ) {
    this.alert = {
      status: false,
      text: '',
      bg: 'alert-primary'
    }
    this.getUsers();
    this.setSubmit();

    this.form = fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }
  get name() { return this.form.get('name'); }
  get address() { return this.form.get('address'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }

  setSubmit() {
    if (this.edit) this.submit = 'Update User';
    else this.submit = 'Create New User';
  }

  setAlert(text) {
    this.alert = {
      status: true,
      text: text
    }

    setTimeout(() =>{
      this.alert = {};
    }, 2000)
  }

  submitForm() {
    if(this.edit) {
      this.crudService.updateUser(localStorage.getItem('editId'), this.form._value)
        .subscribe(
          data  => {
            this.setAlert('User updated successfully');
            this.getUsers();
            this.edit = false;
            this.setSubmit();
            this.form.reset();
          },
          error => console.error('error :', error)
        )
    }

    else {
      this.crudService.newUser(this.form._value)
        .subscribe(
          data => {
            this.setAlert('User created successfully');
            this.getUsers();
          },
          error => console.error('error :', error)
        );
        this.form.reset();
    }

  }

  getUsers() {
    this.crudService.getUsers()
      .subscribe(
        data => {
          console.log('data: ', data);
          this.users = data;
        },
        error => console.error('error :', error)
      )
  }

  editValues(user) {
    this.edit = true;
    this.setSubmit();

    localStorage.setItem('editId', user._id);

    (<FormGroup>this.form)
      .setValue({
        name: user.name,
        address: user.address,
        username: user.username,
        email: user.email
      })
  }

  deleteUser(id) {
    this.crudService.deleteUser(id)
      .subscribe(
        data => {
          this.setAlert('User deleted successfully');
          this.getUsers();
        },
        error => console.error('error :', error)
      )
  }
}
