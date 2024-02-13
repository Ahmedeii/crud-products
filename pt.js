let tittle = document.getElementById("tittle")
let price = document.getElementById('price');
let taxs = document.getElementById("taxs")
let ads = document.getElementById("ads")
let discound = document.getElementById("discound")
let total = document.getElementById("total")
let count = document.getElementById("count")
let cat = document.getElementById("cat")
let create = document.getElementById("create")
let search = document.getElementById("search")
let mood=create;
let eee;
//get total//
function gettotal(){
  if(price.value !=''&taxs.value!=''&ads.value!=''){
    let result = (+price.value + +taxs.value + +ads.value) - +discound.value
    total.innerHTML = result;
    total.style.background = "green"
  }else {
   total.innerHTML = "";
   total.style.backgroundColor = 'red';
  }
}
let data;
if(localStorage.product !=null){
  data =JSON.parse(localStorage.product)
}else{
  data =[]
}

//create product//
create.onclick=function(){
  let newpro ={
    tittle:tittle.value.toLowerCase(),
    price:price.value,
    taxs:taxs.value,
    ads:ads.value,
    discound:discound.value,
    total:total.innerHTML,
    count:count.value,
    cat:cat.value.toLowerCase(),
    
  }
  if(tittle.value!=''&&price.value!=''&&cat.value!=''&&newpro.count<=100){
      if (mood == create) {
        if (newpro.count > 1) {
          for (let i = 0; i < newpro.count; i++) {
            data.push(newpro);
          }
        }
        else {
          data.push(newpro);
        }
    
      } else {
        data[eee] = newpro;
        mood = "create";
        count.style.display = "block";
        create.innerHTML = "create";
    
    
      }
    cleardata();
  }


  

  localStorage.setItem("product",JSON.stringify(data))
  
  showdata()
}
//clear data//
function cleardata(){
  tittle.value ="";
  price.value ="";
  ads.value ="";
  discound.value ="";
  count.value ="";
  taxs.value ="";
  total.innerHTML="";
  cat.value ="";
}
function showdata(){
  gettotal();
  let show ='';
  for(let i =0; i<data.length;i++){
       show +=`<tr>
                 <td>${[i]}</td>
                 <td>${data[i].tittle}</td>
                 <td>${data[i].price}</td>
                 <td>${data[i].ads}</td>
                 <td>${data[i].taxs}</td>
                 <td>${data[i].discound}</td>
                 <td> ${data[i].total }</td>
                 <td>${data[i].count}</td>
                 <td> ${data[i].cat}</td>
                 <td><button onclick="update(${i})" id="add">update</button></td>
                 <td><button onclick="clearelement(${i})" id="delete">delete</button></td>
               </tr>`
               
               
               
}
document.getElementById("tbody").innerHTML=show;
 let all = document.getElementById("deleteall");
 if(data.length>0){
   all.innerHTML=
     `<button onclick="cr()">delete all</button>`
     
   }else{
     all.innerHTML="";
   }
 }


showdata();
function clearelement(i){
  data.splice(i,1);
  localStorage.product = JSON.stringify(data)
  showdata();
}
function cr(){
  data.splice(0)
  localStorage.clear();
  showdata();
}
function update(i){
  tittle.value=data[i].tittle;
  price.value=data[i].price;
  ads.value=data[i].ads;
  discound.value=data[i].discound;
  gettotal();
  count.style.display="none";
  cat.value=data[i].cat;
  create.innerHTML="update";
  mood="update";
  eee=i;
  scroll({
    top:0,
    bahvior:"smooth"
  })
}

let searchmood="tittle";
function getsearchmood(id){
  if(id=="searchbytittle"){
    searchmood="tittle"
    
  }else{
    searchmood="catugary"
  }
  search.placeholder="search by"+searchmood
  search.focus();
  search.value="";
  showdata();
}
function searchdata(value){
  document.getElementById("search")
  let show="";
  if(searchmood=="tittle"){
    for(let i=0;i<data.length;i++){
      if(data[i].tittle.includes(value.toLowerCase())){
         show +=`<tr>
                 <td>${[i+1]}</td>
                 <td>${data[i].tittle}</td>
                 <td>${data[i].price}</td>
                 <td>${data[i].ads}</td>
                 <td>${data[i].taxs}</td>
                 <td>${data[i].discound}</td>
                 <td> ${data[i].total }</td>
                 <td>${data[i].count}</td>
                 <td> ${data[i].cat}</td>
                 <td><button onclick="update(${i})" id="add">update</button></td>
                 <td><button onclick="clearelement(${i})" id="delete">delete</button></td>
               </tr>`
               
               
        
      }
    }
    
    
    
    
  }else{
     for(let i=0;i<data.length;i++){
      if(data[i].cat.includes(value.toLowerCase())){
         show +=`<tr>
                 <td>${[i]}</td>
                 <td>${data[i].tittle}</td>
                 <td>${data[i].price}</td>
                 <td>${data[i].ads}</td>
                 <td>${data[i].taxs}</td>
                 <td>${data[i].discound}</td>
                 <td> ${data[i].total }</td>
                 <td>${data[i].count}</td>
                 <td> ${data[i].cat}</td>
                 <td><button onclick="update(${i})" id="add">update</button></td>
                 <td><button onclick="clearelement(${i})" id="delete">delete</button></td>
               </tr>`
               
               
        
    
  }
 }
}

  document.getElementById("tbody").innerHTML=show;
}