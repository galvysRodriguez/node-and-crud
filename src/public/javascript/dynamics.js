const icon = document.getElementById("myTopnav");
const myfunction = ()=>{
if (icon.className === "topnav") icon.className += " responsive";
else icon.className = "topnav";
}