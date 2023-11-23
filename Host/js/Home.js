const icon = document.getElementById("icon")
var card = document.querySelector(".card")
console.log(icon)

card.addEventListener("mouseover", ()=>{
    icon.style.color = "#013446"
})

card.addEventListener('mouseout', () => {
    // Change the button's background color back to its original color
    icon.style.color = "#01182e"
  });