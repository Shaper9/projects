const innerContainer= document.querySelector(".inner_container");

const slike=document.querySelectorAll(".image_container");

innerContainer.addEventListener("mouseover",function(e){
    const target=e.target.closest(".image_container")
    console.log (target)
    slike.forEach(function(slika){
        if(slika !== target){
            slika.classList.add("blur")
        }
    })
})


slike.forEach(function (slika) {
    slika.addEventListener("mouseleave", function () {
      slike.forEach(function (slika) {
        slika.classList.remove("blur");
      });
    });
  });



