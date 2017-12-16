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
 console.log(data.CDMX['2017-1'.studentes.active);
 /*Declaración de Laboratoriables con los datos proporcionados por el cliente*/
 var alumnasActivas=0;
 var total=0;
 var desertoras=0;
 var meta=0;
 var nps=0;
 var metaTec=0;
 var metaHse=0;
 var alumnasSatisfechas=0;
 var promedioProfes=0;
 var promedioJedi=0;
 /*evento de click cuando se selecciona ciudad de México generación 2017-1*/
 document.getElementById('ciudad de mexico generacion20171buscar en html').addEventListener('click',function()){
 /*Variables usadas para ciudad y generación 2017-1, todas van inicializadas en cero*/
   var desertoras171=0;
   var hse=0;
   var tech=0;
   var total=0;
   var sprint=0;

   /*conocer total de alumnas generación 2017-1*/
   document.getElementById(buscartotalde alumnas en html).innerHTML = totalGen4.length;
   /*se hara el redondeo del total de desertoras total entre el total de alumnas
   registradas en la base de datos*/
   desertoras = Math.round((desertoras171 * 100) / totalGen4.length);
   document.getElementById(buscar donde van desertoras en html).innerHTML = desertoras;

 /*conocer la cantidad de alumnas de la primera
 generación de 2017 en CDMX; esto se  hará atraves de itearciones
 de la base de datos*/
   var totalGen4= data.CDMX['2017-1'].students;
   for(var i=0; i< totalGen4.length; i++){
     /*se realizará un if por si la alumna aparace como false en
     'active' entnces la sume a las desertoras171*/
     if(totalGen4[i].active === false){
       desertoras171++;
     }
   }
