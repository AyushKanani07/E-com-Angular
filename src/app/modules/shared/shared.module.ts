import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgSwitch } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterLink, MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, NgIf, NgFor, NgSwitch, MatCardModule
  ],
  exports:[
    CommonModule, RouterLink, MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, NgIf, NgFor, NgSwitch, MatCardModule
  ]
})
export class SharedModule { }
