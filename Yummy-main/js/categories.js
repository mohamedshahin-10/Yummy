let categories=[] ;
(async function(){
    let response=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data=await response.json();
    categories=data.categories;
    let row=$(".row");
    for (const category of categories) {
        
        $(row).append(`
         <div class="col-md-3 my-2">
                <div class="inner-box  position-relative" onClick="displayCategory(${category.idCategory})">
                    <div class="layout  flex-column align-items-center position-absolute p-2 w-100 h-100 rounded-2">
                        <h4 class="text-capitalize ps-2 ">${category.strCategory}</h4>
                        <p class="px-2 overflow-hidden">${category.strCategoryDescription}</p>
                    </div>
                    <img class="w-100 rounded-2" src=${category.strCategoryThumb} alt="meel" />
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
function displayCategory(id){
    let categoryName='';
    // console.log(id);
    for (const category of categories) {
        if(category.idCategory == id){
            categoryName=category.strCategory;
            break;
        }
    }
    //  console.log(categoryName);
     window.open(`./category.html?c=${categoryName}`,"_self");
}