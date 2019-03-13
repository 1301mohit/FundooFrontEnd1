import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatCard } from '@angular/material';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  @Input() color;
  @Output() colorEmit = new EventEmitter();
  @Output() colorchange = new EventEmitter();
 @Input() card;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  colorArray = [[{ 'color': '#FFFFFF', 'name': 'White' },
  { 'color': '#E53935', 'name': 'Red' },
  { 'color': '#EF6C00', 'name': 'Orange' },
  { 'color': '#FFEB3B', 'name': 'Yellow' }],

  [{ 'color': '#B2FF59', 'name': 'green' },
  { 'color': '#69F0AE', 'name': 'teal' },
  { 'color': '#81D4FA', 'name': 'blue' },
  { 'color': '#0288D1', 'name': 'darkblue' }],

  [{ 'color': '#B39DDB', 'name': 'purple' },
  { 'color': '#F48FB1', 'name': 'pink' },
  { 'color': '#FFAB40', 'name': 'brown' },
  { 'color': '#E0E0E0', 'name': 'gray' }

  ]]

  colorsEdit(id, card) {
    console.log('color is ',id);
    card.color=id;
    this.colorEmit.emit(id)

    console.log('color')
   //   this.card.type = 'color'
     
//        const reqData = {
//   "color": id,
//   "noteIdList": [card.id]
// }
    console.log("card:",card)
    this.httpService.postRequest('/color/card.id?color='+this.color.value,'').subscribe(data =>{
    this.colorchange.emit(id);
  })


      // this.noteService.postcolor({
      //   "color": id,
      // //  "noteIdList": [card.id]
      // }).subscribe(data => {
      //   console.log("color event reached ",data)
      //   // localStorage.setItem('colorId', this.color.id)
      //   this.colorchange.emit(id);
      // })
    
  }
}
