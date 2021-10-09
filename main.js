






let seats=document.querySelectorAll(".row .seat");
let theselect=document.querySelector("select");
let alloptions=document.querySelectorAll("option");
let prices=document.querySelectorAll("span");


let tenet=[15,16,43]
let joker=[11,16,19,35,36,37]
let toystory4=[17,46,14,18,19,20,5,41,42]
let thelionking=[2,5,11,17,16,35,47]

function seatTaker(movieArr){
    seats.forEach( (item)=>{
        item.classList.remove("occupied");
    })
    movieArr.forEach( (item)=>{
        seats[item].className="seat occupied";
    } )
};
let selectedValue;

theselect.addEventListener('change',(e)=>{
    localStorage.removeItem('selectedSeats')
    selectedValue=e.target.value;
    saveMovieInfo(e.target.selectedIndex,e.target.value)
    prices[0].innerHTML="0";
    prices[1].innerHTML="0";
    
    seats.forEach(function(item){
        item.classList.remove("selected");
    })

    if (selectedValue==10){
        seatTaker(tenet);
    } else if (selectedValue==12){
        seatTaker(joker)
    } else if (selectedValue==8){
        seatTaker(toystory4)
    } else {
        seatTaker(thelionking)
    }

})
function populateUi(){
    let getTheSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    let getTheMovie=localStorage.getItem('selectedMovieIndex')
    theselect.selectedIndex=getTheMovie;
    if (getTheSeats.length>0 && getTheSeats !== null){
        seats.forEach( (item,index) =>{
            if (getTheSeats.indexOf(index)>-1){
                item.classList.add('selected');
                priceCalculator();
            }
        })
    }
}


function isItAvailable(input){
    boolvalue= input.classList.contains("occupied");
    return !boolvalue
}

function priceCalculator(){
    let allSelected=document.querySelectorAll('.selected');
    let total=selectedValue*(allSelected.length-1)
    prices[0].innerHTML=allSelected.length-1;
    prices[1].innerHTML=total;

}
function saveSeats() {
    let allSelected=document.querySelectorAll('.selected');
    let copiedSelectedSeats=[...allSelected];
    copiedSelectedSeats.shift();
    
    let indexes=copiedSelectedSeats.map(function(item){return [...seats].indexOf(item)} )

    localStorage.setItem('selectedSeats',JSON.stringify(indexes))

}
function saveMovieInfo (input1,input2){
    localStorage.setItem('selectedMovieIndex',input1)
    localStorage.setItem('selectedMoviePrice',input2)
}


seats.forEach( (item)=>{
    item.addEventListener('click', (theseat)=>{
        if ( isItAvailable(theseat.target) ){
        theseat.target.classList.toggle('selected')
        priceCalculator()
        saveSeats()
        }
    })
} )

function init(){
    let getTheMovie=localStorage.getItem('selectedMovieIndex');
    if (getTheMovie==0){
        seatTaker(tenet)
    } else if (getTheMovie==1){
        seatTaker(joker)
    } else if (getTheMovie==2){
        seatTaker(toystory4)
    } else{
        seatTaker(thelionking)
    }
    selectedValue=10

    populateUi();
}
init();
