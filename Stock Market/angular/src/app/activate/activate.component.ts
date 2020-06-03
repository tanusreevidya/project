import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  msg;
  constructor(@Inject(ServiceService) private service) { }

  ngOnInit() {
    this.checkActivation()
  }

  checkActivation(){
    var urlad = document.URL
    var strarr = urlad.split("?")
    var str = strarr[1]
    str = str.substring(0, str.length-1);
    this.service.serviceActivation({email:str}).subscribe(dt => {
      if(dt.result==1){
        this.msg="activation successfull"
      }
      else{
        this.msg="already activated"
      }
    });
  }

}
