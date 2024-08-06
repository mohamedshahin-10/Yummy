let url = window.location.href;
let parts = url.split("=");
let id = parts[1];
(async function () {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  let mealDetails = data.meals;
  $(".title").html(`
    <img class="w-100 rounded-2" src="${mealDetails[0].strMealThumb}" alt="meel" />
    <h3 class="fw-bolder mt-2">${mealDetails[0].strMeal}</h3>
    `);
  $(".details").html(`
    <h3 class="fw-bolder p-2">Instructions</h3>
    <p class="p-2">${mealDetails[0].strInstructions}</p>
    <h3 class="p-2">
        <sapn class="fw-bolder">Area</sapn> : ${mealDetails[0].strArea}
    </h3>
    <h3 class="p-2"><span class="fw-bolder">Category</span> : ${mealDetails[0].strCategory}</h3>
    <h3 class="p-2"><span class="fw-bolder">Recipes</span> :</h3>
    <ul class="list-unstyled recipes d-flex flex-wrap text-black">
    </ul>
    <h3 class="p-2">
    <span class="fw-bolder">Tags</span> :
    </h3>
    <ul class="list-unstyled tags d-flex text-danger">
    </ul>
    <div class="btns p-2">
    <button class="btn btn-success px-3 py-2 rounded-2"><a class="text-decoration-none text-white"  >Source</a></button>
    <button class="btn btn-danger px-3 py-2 rounded-2"><a class="text-decoration-none text-white"  >Youtube</a></button>
    </div>
    `);
    // recipes
    let recipes=[];
    let recipePart1 , recipePart2="" ,recipe="";
    
    for(let i=1;i<=20;i++){
        if(mealDetails[0]["strIngredient"+i] !==""){
            recipePart1=mealDetails[0]["strMeasure"+i];
            recipePart2=mealDetails[0]["strIngredient"+i];
            recipe=recipePart1+" "+recipePart2;
            recipes.push(recipe);
        }else{
            break;
        }
    }
    for (const recipe of recipes) {
       $("ul.recipes").append(`
       <li class="p-2 bg-primary-subtle mx-2 my-2 rounded-2">${recipe}</li>
       `)
    }
    // tags
    let tags=[];
    if((mealDetails[0].strTags)!==null){
        tags=(mealDetails[0].strTags).split(",");
    }else{
        tags=[];
    }
    
    // console.log(tags);
    for (const tag of tags) {
        $("ul.tags").append(`
        <li class="p-2 bg-danger-subtle mx-2 my-2 rounded-2">${tag}</li>
        `)
    }
    // buttons
    $(".btn-success a").attr('href',`${mealDetails[0].strSource}`);
    $(".btn-danger a").attr('href',`${mealDetails[0].strYoutube}`);

    // control side nav
    
    $("i.control").on("click",function(e){
         
        let ele=e.target;
      if($("nav").css("left") == "0px"){
       $(".links li").slideUp(200,function(){
           $("nav").animate({
               left:"-300px"
           },300);
           
             ele.classList.replace("fa-xmark","fa-bars");
       });
      }else{
       $("nav").animate({
           left:"0px"
       },300,function(){
           $(".links li").slideDown(200);
           ele.classList.replace("fa-bars","fa-xmark");
       });

      }
   });

})();
