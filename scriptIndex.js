//fetching the search Bar element and adding key up event listener to it
let searchBar = document.getElementById("searchHero");
console.log(searchBar.value);
searchBar.addEventListener('keyup',getSearchedSuperHeroes);

//****** */


//creating and acessing local storage for user's seemless experience

let myLocalStorage = window.localStorage;

if(!myLocalStorage.getItem('superheroID')){
    let arr = [];
    myLocalStorage.setItem('superheroID',JSON.stringify(arr));
    console.log("Storage Created");

}

myLocalStorage.setItem('showSuperHero','');

//****** */

//function display all the search suggested super heroes

function getSearchedSuperHeroes(){

    var displaySearchedHeroesResult = document.getElementById('displayHeroSearchResults');

    displaySearchedHeroesResult.innerHTML = `
    <h1 class = "loading-and-error-font"> Loading Super Heroes .... 
    </h1>
`;



    //api's url to search heroes according to the name
    let url = 'https://superheroapi.com/api.php/1500237820345742/search/'+searchBar.value;

    //creating a new XML HTTP request

    var apiRequest = new XMLHttpRequest();


apiRequest.onreadystatechange = function(){
    console.log(this.status)
    //if request is made successfully with status as 200 and in ready state 4
    if(this.readyState == 4 && this.status == 200){

        //fetching data from the api in data variable
        var data = JSON.parse(this.responseText);
        console.log(data);


        //to handle backspace or no input value errors in the search Bar

        if(data.response==="error"){
            displaySearchedHeroesResult.innerHTML = '<h2 class = "loading-and-error-font"> Oops ! There is no super hero with such name, please make sure that you are spelling it correctly :/ </h2> ';
            return;

        }

        //exit if searched query does not match the displayd result

        if(searchBar.value!=data["results-for"]){
            return;
        }

        //reset the display container after showing results

        displaySearchedHeroesResult.innerHTML='';


        //adding all the results to the DOM

        for(let hero of data.results){

            let heroCard = document.createElement('div');
            heroCard.setAttribute('id','heroCard');
            heroCard.className='hero-card';

            //adding on click to ebery hero's displayed hero so that it redirects to the clicked hero's page

            heroCard.onclick = function(){currSelectedHero(hero.id)};

            //adding hero's details 

            let nameOfHero = document.createElement('span');

            let infoOfHero = document.createTextNode(hero.name);

            nameOfHero.appendChild(infoOfHero);


            let imageOfHero = document.createElement('img');
            
            imageOfHero.setAttribute(
                "src",
                hero.image.url ?? "default-hero-image.jpeg"
              );
            


           

            //adding favourites button
            let favButton = document.createElement("BUTTON");
            favButton.className = 'fav-btn';

            //here in this section, going to create an array and check if the super hero is already added to favourites and style the colour of the favorite button accordingly

            var arr = JSON.parse(myLocalStorage.getItem('superheroID'));


            if(arr.includes(hero.id)){
                favButton.style.color = '#460b0b';

                favButton.style.backgroundColor = "white";

                favButton.innerHTML ='<span> Favourite <i class = "fas fa-heart"></i> </span> ';
                
            }else{
                favButton.style.color = "white";

                favButton.style.backgroundColor = '#460b0b';

                favButton.innerHTML ='<span> Add to Favourites <i class = "fas fa-heart"></i> </span> ';

            }

            //onClicking, remove or add superhero from favourites

            favButton.onclick = function(event){ toggleFavourite(event,hero.id,favButton)};


            //appending hero's details the superhero card

            heroCard.appendChild(nameOfHero);
            heroCard.appendChild(imageOfHero);
            heroCard.appendChild(favButton);

            //appending the superhero card to the display results

            displaySearchedHeroesResult.appendChild(heroCard);
        }
    }


};
apiRequest.open('get',url,true);
apiRequest.send();
}

function toggleFavourite(event,heroID,favButton){
    var data = JSON.parse(myLocalStorage.getItem('superheroID'));

    //delete it , if it already exists, else add it to favs

    if(data.includes(heroID)){
        deleteHero(data,heroID);
        favButton.style.color = "white";
        favButton.style.backgroundColor = '#460b0b';
        favButton.innerHTML ='<span> Add to Favourites </span> <i class = "fas fa-heart"></i>';
    }else{
        
        favButton.style.color = '#460b0b';

        favButton.style.backgroundColor = "white";
     
        favButton.innerHTML ='<span> Favourite </span> <i class = "fas fa-heart"></i>';
        data.push(heroID);
    }
    myLocalStorage.setItem('superheroID',JSON.stringify(data));

    event.stopPropagation();

}

function  deleteHero(arr,heroID){
    for(let h in arr){
        if(arr[h]==heroID){
            var tempArr = arr[h];
            tempArr.splice(h,1);
            break; 
        }
    }
    myLocalStorage.setItem('superheroID',JSON.stringify(arr));
    
 
}

function currSelectedHero(heroID){
    myLocalStorage.setItem('showSuperHero',heroID);
    document.getElementById("searchHero").value = '';
    window.location.assign("heroInfo.html");

}



