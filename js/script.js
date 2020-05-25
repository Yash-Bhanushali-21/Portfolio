//typewriter Constructor
const TypeWriter= function(txtElement,words,wait=3000) { //constuctor
	this.txtElement = txtElement; //text that is passed in
	this.words = words; //words
	this.txt = '';//empty str(the stuff thats typed)
	this.wordIndex = 0; //to keep a track of word
	this.wait = parseInt(wait,10); //waiting period after being written.
	this.type(); //main method of type writer
	this.isDeleting = false; //represents state whether it is currently deleteing.

}
TypeWriter.prototype.type = function() {
    // current index of word
    const current = this.wordIndex % this.words.length; //since its gonna be circular.. thus this sort of indexing.
    //getting full text of current word
    const fulltxt = this.words[current];
    //check if deleting
    if(this.isDeleting) {
    	//remove char
    	this.txt = fulltxt.substring(0,this.txt.length - 1);
    }
    else {
    	//add char
    	this.txt = fulltxt.substring(0,this.txt.length + 1);

    }
    //inserting the txt into element
    this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;

    //Innitial type Speed
    let typeSpeed = 200; //using let var for dynamic changes
    if(this.isDeleting) {
    	typeSpeed /= 2;
    }
    //if word is complete
    if(!this.isDeleting && this.txt === fulltxt) {
    	//make pause at end
    	typeSpeed = this.wait;
    	//set deleting to true
    	this.isDeleting = true;
    	 } 
    else if(this.isDeleting && this.txt === '') {
               //now that the stting is empty thus switch to next word
               this.isDeleting=false;
               //move to next word
               this.wordIndex++;
               //pause before start typing
               typeSpeed = 600;
    	 }



	setTimeout(() => this.type(),typeSpeed);
}


$(window).on("load",function(){
  $("#navbarNav").scrollspy();
	//preloader:-
	$("#content").fadeIn(3000);
    $("#content").fadeOut(2200);
    $("#preloader").delay(2200).fadeOut("slow");

    //TypeWriter Section
    setTimeout(function(){ //this function is triggered after the bove animation
    //do what you need here
    const txtElement = document.querySelector('.txt-type');
    const words=JSON.parse(txtElement.getAttribute('data-words'));
 	const wait = txtElement.getAttribute('data-wait');
	new TypeWriter(txtElement,words,wait);
	$('.circlechart').circlechart();
	$("body").removeClass("loading"); //after animation is done, remove overflow property as scrolling to webpage is required.
  $(".rotate").click(function () {
    $(this).toggleClass("down");
})
  //animation section 
  $("#home-heading-1").addClass("animated fadeInDown");
  $("#home-heading-2").addClass("animated fadeInLeft");
  $(".navbar-brand").addClass("animated fadeInDown");


}, 2300);
 });

/*============================
    portfolio filter section:
  =========================== */

 $(window).on('load',function() {
  	//initialize isotope
  	$(".isotope-container").isotope({
  	});
  	//perform filter on button click event
  	$("#isotope-filters").on('click','button',function(){
  		//get filter value
  		var filterValue = $(this).attr('data-filter');
  		$(".isotope-container").isotope({
  			filter: filterValue 
  		}); 
      //updating active button 
      /*1.find the current active elem. and remove it.
        2. update the new class.
      */
      $("#isotope-filters").find(".active").removeClass("active");
      $(this).addClass("active");

  	});
  }); 


/*============================
    portfolio image magnifier section:
  =========================== */
$(function() {
  $("#portfolio-wrapper").magnificPopup({
    delegate:'a',
    type:'image',
    gallery: {
      enabled:true
    }
  });
});

/*============================
  Navigation
  =========================== */

  /*show and hide white navigation */
/*500 is space. */
function showHide() {
   if($(window).scrollTop() > 50) {
    // alert("your scroll is greater ie."+$(window).scrollTop());
    //HowTO:attach the white nav class to nav.
    $("nav").addClass("white-nav-top");
    //show back to top button
    $("#back-to-top").fadeIn();
    }
    else {
      //hide white nav
      $("nav").removeClass("white-nav-top");
      //hide back to top button
      $("#back-to-top").fadeOut();
    }
    if($(window).scrollTop() < 500) { //solivng the home error. since body height:100% is present, automtically last element is selected. thus offset is increased such that it skips first element. Thus this manipulation.
      $("#temp").css("color","#f4c613");
    }
    else { //after swapping the color once, scrollspy works perfect. Thus removing additional css property.
      $("#temp").css("color","");
    }
    
   
}

$(function() {
  //first call on first load
    showHide();
$(window).scroll(function() {
    //second call when scroll
    showHide();

    });  /*WHY 2 calls? if page reloaded at a certain scrolled positon, the nav disappears.thus arrives need to load on initialization and not only on scroll */

});
 function validate(){

                var phone = document.getElementById("phone").value;
                var name = document.getElementById("name").value;
                var message = document.getElementById("message").value;
                var isValid = document.getElementById("isvalid");

                if(!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(name)){
                     alert("Name can only contain letters");
                     document.getElementById("name").focus();
                     isValid.value = "notvalid";
                 }
                if (phone.length > 11 || phone.length <6) {
                     alert("Please provide correct phone number");
                     document.getElementById("phone").focus();
                     isValid.value = "notvalid";
                }

                if (message.val === "") {
                  alert("empty message cannot be sent!");
                  document.getElementById("message").focus();
                  isValid.value = "notvalid";

                }

                else {
                  isValid.value = "valid";
                }
                alert(""+isValid.value);
            }


/*============================
  Animation
  =========================== */
  //initialize animate on scroll
$(function() {

new WOW().init();

});