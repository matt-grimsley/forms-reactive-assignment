import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  reservedProjects = ["Test"];
  projectStatuses = ["Stable", "Critical", "Finished"];

  constructor() {}

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectData: new FormGroup({
        projectName: new FormControl(null, [
          Validators.required,
          //this.reservedProjectNames.bind(this),
        ], this.reservedProjectNamesAsync.bind(this)),
        projectEmail: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
        projectStatus: new FormControl(null),
      }),
    });
  }

  reservedProjectNames(control: FormControl): { [s: string]: boolean } {
    if (this.reservedProjects.indexOf(control.value) !== -1) {
      return { nameIsReserved: true };
    }
    return null;
  }

  reservedProjectNamesAsync(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.reservedProjects.indexOf(control.value) !== -1) {
          resolve({nameIsReserved: true});
        } else {
        resolve(null);}
      }, 1000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
