//evento para que cuando cargue la página comience a cargar toda la información
window.addEventListener('load', allFunctions);

//función para que funcionen los tabs de informaciópn y de estudiantes
function openPage(evnt, options) {
  var  tabs, opcionesPestaña;
  tabs = document.getElementsByClassName('tabs');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none';
  }
  //de acuerdo al elemento que se selcciones de las pestaññas se ,mostrara l información contenida en cada una
  opcionesPestaña = document.getElementsByClassName('opcionesPestaña');
  for (i = 0; i < opcionesPestaña.length; i++) {
    opcionesPestaña[i].className = opcionesPestaña[i].className.replace('active', '');
  }
  document.getElementById(options).style.display = 'block';
  evnt.currentTarget.className += 'active';
}
document.getElementById('default').click();

//función que ayudará a conseguir los datos de generación y sede que se seleccione de la lista
function allFunctions() {
  var porSede = document.getElementById('sede');
  var porGeneracion = document.getElementById('generacion');
  //evento para que cambie la información cuando se seleccione la sede
  porSede.addEventListener('change', generaciones);
  document.addEventListener('change', info);


  /*funció n que nos ayuda a llamar la data de las generaciones*/
  function generaciones(event) {
    /*hacer iteración de la data, se usará el object keys para solicitar los datos de la data*/
    for (var i = 0; i < Object.keys('data').length; i++) {
      if (event.target.value === Object.keys('data')[i]) {
        porGeneracion.innerHTML = '';
        //llamar los datos de acuerdo a la sede y generación
        var listaGeneracion = Object.keys(data[porSede.value]);
        //se usara un for  para hacer iteración de los elementos que se encuentran en la lista de generaciones
        for (var j = 0; j < listaGeneracion.length; j++) {
          var optionsionPromo = document.createElement('optionsion');
          optionsionPromo.value = listaGeneracion[j];
          optionsionPromo.textContent = listaGeneracion[j];
          porGeneracion.appendChild(optionsionPromo);
        }
      }
    }
  }

  /*función que desplegará los datos en pantalla de acuerdo a lo solicitado en este caso primero mostraremos
  las estudientes activas y el porcentaje de deserción*/

  function info(event) {
    if (event.target === porSede || event.target === porGeneracion) {
      var students = data[porSede.value][porGeneracion.value].students; //veriable para estudientes
      var activeStudents = 0; //estudiantes activas
      var dropoutStudents = 0; //estudientes desertoras
      var overcomeStudents = 0;
      var techTarget = 0;
      var hseTarget = 0;

      //se hace una iteración para conocer las estudientes que se encuentran activas
      for (var i = 0; i < students.length; i++) {
        if (students[i]['active'] === true) {
          // si están activas entonces se aumentara el contador de
          activeStudents++;
          //si es falso aumentará el contador de desertoras
        } else {
          dropoutStudents++;
        }
      }
      //mostrar datos en pantalla la primera es para etsudiantes activa y la segunda muestra el porcentaje de desertoras
      document.getElementById('current-students').textContent = activeStudents;
      document.getElementById('dropout').textContent = Math.round((dropoutStudents / students.length) * 100);
    }
  }




};
