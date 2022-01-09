//fetching the dis element 
let favouriteSection = document.getElementById("displayFavourites");

//****** */

//creating and acessing local storage for user's seemless experience

var myLocalStorage = window.localStorage;

var arr = JSON.parse(myLocalStorage.getItem("superheroID"));

for(let hero_id of arr){
    
    var url = 'https://superheroapi.com/api.php/1500237820345742/'+hero_id;

    //creating a new XML HTTP request

    var apiRequest = new XMLHttpRequest();


apiRequest.onreadystatechange = function(){
    console.log(this.status);
    //if request is made successfully with status as 200 and in ready state 4
    if(this.readyState == 4 && this.status == 200){

        //fetching data from the api in data variable
        var data = JSON.parse(this.responseText);
        console.log(data);

        let favHeroCard = document.createElement('div');
       

        favHeroCard.className='favourite-hero-card';

        favHeroCard.id = 'favourite-hero-card'+hero_id;

        //adding on click to every hero's displayed hero so that it redirects to the clicked hero's page

        favHeroCard.onclick = function(){currHero(hero_id)};

        //adding hero's details 

        let nameOfHero = document.createElement('span');

        let infoOfHero = document.createTextNode(data.name);

        nameOfHero.appendChild(infoOfHero);


        let imageOfHero = document.createElement('img');
   

        imageOfHero.setAttribute(
          "src",
          data.image.url ?? "default-hero-image.jpeg"
        );
        // if(data.image.response=="success"){
        //     imageOfHero.setAttribute('src',data.image.url);

        // }else{
        //     imageOfHero.setAttribute('src','default-hero-image.jpeg');
        // }

        //adding delete button

        let delBtn = document.createElement("BUTTON");

        delBtn.className = 'del-btn';
        delBtn.innerHTML = '<span> <i class = "fas fa-trash"> </i> </span>';
        delBtn.onclick = function (event) {
            deleteHeroFromFavourites(event, hero_id, favHeroCard.id);
          };
        favHeroCard.appendChild(nameOfHero);
        favHeroCard.appendChild(imageOfHero);
        favHeroCard.appendChild(delBtn);

        favouriteSection.appendChild(favHeroCard);



}
}
apiRequest.open('get',url,true);
apiRequest.send();
}


function deleteHeroFromFavourites(event, id, favHeroCard) {
    for (let he in arr) {
      if (arr[he] == id) {
        var tempArr = arr[he];
        arr.splice(he, 1);
        console.log("deleting", tempArr);
        break;
      }
      console.log(arr);
    }
  
    myLocalStorage.setItem("superheroID", JSON.stringify(arr));
    var card = document.getElementById(favHeroCard);
    card.remove();
    event.stopPropagation();
  }

function currHero(heroID){
    myLocalStorage.setItem('showSuperHero',heroID);
    window.location.assign("heroInfo.html");
}




