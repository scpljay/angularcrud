import { Component } from '@angular/core';

import { Avenger } from "./avenger";
import { AvengerService } from "./app/avenger.service";
import { error } from 'protractor';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  avengers: Avenger[];
  error = '';
  success = '';
  avenger = new Avenger('', 0);
  constructor(private avengerService: AvengerService){}

  ngOnInit(){
    this.getAvengers();
  }
  
  //   Subscribe data from service 
  getAvengers(): void{
    this.avengerService.getAll().subscribe(
      (res: Avenger[]) => {
        console.log(res);
        this.avengers = res;
      }, (err) => {
        this.error = err;
      }
    );
  }

  // Save Avenger in Database , Call service 
  addAvenger(f){
    console.dir(this.avenger);
    this.error = '';
    this.success = '';

    this.avengerService.store(this.avenger).subscribe(
      (res: Avenger[]) => {
        // Update the list of avengers
        this.avengers = res;
        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        f.reset();
      },
      (err) => { this.error = err; }
    );
  }

  //  Update Avenger 
  updateAvenger(name, price, id){
    this.success = '';
    this.error = '';
    this.avengerService.update({model: name.value, price: price.value, id: +id}).subscribe(
      (res: Avenger[]) => {
        // Update the list of avengers
        this.avengers = res;
        // Inform the user
        this.success = 'updated successfully!!!';

      },
      (err) => { this.error = err; }
    );
  }

//  Delete Avenger from DB  
  deleteAvenger(id){
    this.success = '';
    this.error = '';
    this.avengerService.delete(+id)
      .subscribe(
        (res: Avenger[]) => {
          this.avengers = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }

}
