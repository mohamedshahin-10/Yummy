let ingredients;
(async function(){
    let response=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let data=await response.json();
    ingredients=data.meals;
    // console.log(meals);
    let row=$(".row");
    for (const ingredient of ingredients) {
      
        if(ingredient.strDescription != null && ingredient.strDescription != "" ){
            // console.log(ingredient.strDescription);
            $(row).append(`
            <div class="col-md-3 my-2">
                <div class="inner-box w-100  d-flex flex-column justify-content-center align-items-center position-relative" onClick="displayAreaMeals(${ingredient.idIngredient})">
                    <i class="fa-solid fa-drumstick-bite  fa-5x fw-bolder text-white"></i>
                    <p class="text-white">${ingredient.strIngredient}</p>
                    <p class="ingredientparagraph text-white overflow-hidden w-100">${ingredient.strDescription}</p>
                </div>
            </div>
        `);
       
        }else{
            continue;
        }

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
function displayAreaMeals(ingredientId){
    //  console.log(ingredientId);
    var ingredientName="";
    for (const ingredient of ingredients) {
        if(ingredient.idIngredient == ingredientId){
            ingredientName = ingredient.strIngredient;
            break;
        }
    }
     window.open(`./ingredientMeals.html?gredient=${ingredientName}`,"_self");
}