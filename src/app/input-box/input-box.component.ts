import { Component, NgModule } from '@angular/core'

@Component({
  selector: 'app-input-box',
  template: `
  <p>  {{prompt}} </p>
  <mat-slide-toggle [(ngModel)]="maxorsmall">Toggle QuickSelectMax</mat-slide-toggle>
  <p></p>
  <input #box 
  (keyup.enter)="onEnter(box.value); box.value = ''"
  
  >
  
  <p>{{display}}</p>
  <p>{{display2}}</p>
  <p>{{answer}}</p>
`,
  styleUrls: ['./input-box.component.scss']
})

export class InputBoxComponent{
  prompt = "Quick Select! Enter a positive number"
  value = '';
  display = '';
  display2 = '';
  array:number[] = [];
  nums = 0;
  answer = ''
  firstinput = true;
  maxorsmall = false;
  randomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  onEnter(value: string) { 
    this.value = value;
    this.nums = parseInt(value)
    if(this.firstinput){
      
      for(var i =0; i <this.nums;i++){
        this.array.push(this.randomInt(-100,100));
      }
      this.display = this.array.toString();
      var temp  = this.array.slice(0) 
      this.display2 = "Sorted array for refrence:"+temp.sort((n1,n2)=>n1-n2).toString();
      this.prompt = "Please Enter a number from 1 to "+this.nums
      this.firstinput = false;
    }else{
      if(!this.maxorsmall){
        this.answer = `The ${this.nums} smallest number is :` + quickselect(this.nums,this.array,0,this.array.length-1).toString();
      }else{
        this.answer = `The ${this.nums} largest number are :` + quickselectMax(this.array.length - this.nums,this.array,0,this.array.length-1).toString();
      }
      //this.display = partition(this.array,0,this.array.length-1) +"|"+ this.array.toString();
    }
  }


}
function quickselectMax(n:number,array:number[],start:number,end:number):number[]{
  var pivot = partition(array,start,end)
  console.log(n)
  if(n<pivot+1){
    return quickselectMax(n,array,start,pivot)
  }else if(n>pivot+1){
    return quickselectMax(n,array,pivot,end)
  }else{
    return array.slice(pivot+1)
  }
}
function quickselect(n:number,array:number[],start:number,end:number):number{
  
  var pivot = partition(array,start,end)
  console.log("stuck?")
  if(n<pivot+1){
    return quickselect(n,array,start,pivot)
  }else if(n>pivot+1){
    return quickselect(n,array,pivot,end)
  }else{
    return array[pivot];
  }
  
}
function partition(array:number[],start:number,end:number):number{
  var lcrawler = start
  var rcrawler = end-1
  var pivot = array[end]
  var overshoot = false;
  while(lcrawler<rcrawler){
    while(array[lcrawler]<pivot){
      lcrawler++
    }

    while(array[rcrawler]>pivot && rcrawler>lcrawler){
      rcrawler--;
    }
    [array[lcrawler],array[rcrawler]] = [array[rcrawler],array[lcrawler]]
  }
  [array[lcrawler],array[end]] = [array[end],array[lcrawler]]
  return lcrawler
  
  
  
  
  
  // while(!(lcrawler>=rcrawler)){

  //   for(;lcrawler<rcrawler;lcrawler++){
  //       if(array[lcrawler]>pivot){
  //         overshoot = true;
  //         break;
  //       }
  //   }
  //   for(;rcrawler>lcrawler;rcrawler--){
  //     if(array[rcrawler]<pivot){
  //       overshoot = false;
  //       break;
  //     }
      
  //   }
  // var temp = array[lcrawler];
  // array[lcrawler] = array[rcrawler];
  // array[rcrawler] = temp;


  // }
  // if(overshoot){
  //   var temp = array[lcrawler];
  //   array[lcrawler] = array[end];
  //   array[end] = temp;
  //   return lcrawler
  // }else{
  //   var temp = array[lcrawler+1];
  //   array[lcrawler+1] = array[end];
  //   array[end] = temp;
  //   return lcrawler+1
  // }
  




  
}