/*
 * Funcionalidad de tu producto
 */

 function openMe(inside) {
   var i, content;
   content = document.getElementsByClassName('content');
   for (i = 0; i<content.length; i++) {
     content[i].style.display= "none";
   }
   document.getElementById(inside).style.display= "block";
 }

// Puedes hacer uso de la base de datos a través de la variable `data`
//console.log(data);
