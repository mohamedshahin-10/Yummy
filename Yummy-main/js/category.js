let url = window.location.href;
let parts = url.split("=");
let categoryName = parts[1];
// console.log(categoryName);
(async function(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    let data=await response.json();
    let meals=data.meals;
    let row=$(".row");
    for (const meal of meals) {
        // console.log(meal);
        $(row).append(`
         <div class="col-md-3 my-2">
                <div class="inner-box  position-relative" onClick="displayMeal(${meal.idMeal})">
                    <div class="layout align-items-center position-absolute   w-100 h-100 rounded-2">
                        <h4 class="text-capitalize ps-2 ">${meal.strMeal}</h4>
                    </div>
                    <img class="w-100 rounded-2" src=${meal.strMealThumb} alt="meel" />
                </div>
            </div>
        `);

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
function displayMeal(mealId){
    window.open(`./meal.html?id=${mealId}`,"_self");
}