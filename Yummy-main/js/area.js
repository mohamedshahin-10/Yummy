let meals;
(async function(){
    let response=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let data=await response.json();
    meals=data.meals;
    // console.log(meals);
    let row=$(".row");
    var index=0;
    for (const meal of meals) {
        // console.log(meal);
       var ele=$(row).append(`
            <div class="col-md-3 my-2">
                <div class="inner-box d-flex flex-column justify-content-center align-items-center position-relative" onClick="displayAreaMeals(${index})">
                    <i class="fa-solid fa-house-laptop  fa-5x fw-bolder text-white"></i>
                    <p class="text-white">${meal.strArea}</p>
                </div>
            </div>
        `);
       index++;
    }
    $(".inner-box").mouseenter(function(){
        // $(this).slideToggle(200);
        // console.log($(this).find('.layout').css('top'));
       
            $(this).find('.layout').animate({
                top:0,
                opacity:1
              },200);
        
      
    });

    $(".inner-box").mouseleave(function(){
        // $(this).slideToggle(200);
        // console.log($(this).find('.layout').css('top'));
            $(this).find('.layout').animate({
                top:150,
                opacity:0
              },200);
        
      
    });



    //control side nav
    $("i.control").on("click",function(e){
         
         let ele=e.target;
       if($("nav").css("left") == "0px"){
        $(".links li").slideUp(300,function(){
            $("nav").animate({
                left:"-300px"
            },300);
            
              ele.classList.replace("fa-xmark","fa-bars");
        });
       }else{
        $("nav").animate({
            left:"0px"
        },300,function(){
            $(".links li").slideDown(300);
            ele.classList.replace("fa-bars","fa-xmark");
        });

       }
    });

})();


//display meal function
function displayAreaMeals(index){
    //  console.log(meals[index].strArea);
    window.open(`./areaMeal.html?area=${meals[index].strArea}`,"_self");
}