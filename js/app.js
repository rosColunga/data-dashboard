//evento para que cuando cargue la página comience a cargar toda la información
window.addEventListener('load', allFunctions);
//función para que funcionen los tabs de informaciópn y de estudiantes
function openPage(evnt, options) {
  var tabs, opcionesPestaña;
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
  var porSprint = document.getElementById('sprint')
  //evento para que cambie la información cuando se seleccione la sede
  porSede.addEventListener('change', generaciones);
document.addEventListener('change', fillSprints);
  document.addEventListener('change', info);
  document.addEventListener('change', infoSprint);


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
          var selectGen = document.createElement('option');
          selectGen.value = listaGeneracion[j];
          selectGen.textContent = listaGeneracion[j];
          porGeneracion.appendChild(selectGen);
        }
      }
    }
  }

  function fillSprints(event) {
    if (event.target === porSede || event.target === porGeneracion) {

      var sprints = data[porSede.value][porGeneracion.value].ratings.length;
      porSprint.innerHTML = '';
      for (var i = sprints; 0 < i; i--) {
        var optionSprint = document.createElement('option');
        optionSprint.value = i;
        optionSprint.textContent = 'sprint ' + (i);
        porSprint.appendChild(optionSprint);
      }
    }
  }

  /*función que desplegará los datos en pantalla de acuerdo a lo solicitado en este caso primero mostraremos
  las estudientes activas y el porcentaje de deserción*/

  function info(event) {
    if (event.target === porSede || event.target === porGeneracion) {
      var students = data[porSede.value][porGeneracion.value].students;
      //veriable para estudientes
      var sprints = data[porSede.value][porGeneracion.value].ratings.length;
      var activeStudents = 0; //estudiantes activas
      var dropoutStudents = 0; //estudientes desertoras
      var passStudents = 0;
      var techGoal = 0;
      var hseGoal = 0;

      //se hace una iteración para conocer las estudiantes que se encuentran activas
      for (var i = 0; i < students.length; i++) {
        if (students[i]['active'] === true) {
          // si están activas entonces se aumentara el contador de
          activeStudents++;
          /*con estos mismos datos se harán las operaciones para sacar los promedios tech y hse*/
          var totalTech = 0;
          var totalHse = 0;
          /*se hara el conteo de las estudiantes que superaron las metas tanto de tech y de hse*/
          for (var j = 0; j < sprints; j++) {
            //esta es la operación para aumentar la meta tech
            totalTech += students[i].sprints[j].score.tech;
            if (students[i].sprints[j].score.tech > 1000) {
              techGoal++;
            }
            //operación para meta hse
            totalHse += students[i].sprints[j].score.hse;
            if (students[i].sprints[j].score.hse > 800) {
              hseGoal++;
            }
          }
          //operaciones para sacar los promedios tech y los hse
          var techAverage = Math.floor(totalTech / sprints);
          var hseAverage = Math.floor(totalHse / sprints);
          console.log(hseAverage);
          // Alumnas que superan meta de puntos general
          if (techAverage > 1000 && hseAverage > 800) {
            passStudents++;
          }

          //si es falso aumentará el contador de desertoras
        } else {
          dropoutStudents++;
        }
      }

      var techGoalAverage = techGoal / sprints;
      var hseGoalAverage = hseGoal / sprints;

      //mostrar datos en pantalla la primera es para etsudiantes activa y la segunda muestra el porcentaje de desertoras
      document.getElementById('current-students').textContent = activeStudents;
      document.getElementById('dropout').textContent = Math.round((dropoutStudents / students.length) * 100);
      document.getElementById('pass-average').textContent = passStudents;
      document.getElementById('pass-percent').textContent = Math.round((passStudents / activeStudents) * 100);
      document.getElementById('tech-target-average').textContent = Math.round(techGoalAverage);
      document.getElementById('hse-target-average').textContent = Math.round(hseGoalAverage);


      // Promedio NPS
      var scores = data[porSede.value][porGeneracion.value].ratings;
      var totalNps = 0;
      var totalProm = 0;
      var totalPassive = 0;
      var totalDetractors = 0;
      for (var i = 0; i < sprints; i++) {
        totalProm += scores[i].nps.promoters;
        totalPassive += scores[i].nps.passive;
        totalDetractors += scores[i].nps.detractors;
        totalNps += scores[i].nps.promoters - scores[i].nps.detractors;
      }
      // Mostrar datos en el documento
      document.getElementById('promoters').textContent = Math.round(totalProm / sprints) + '%';
      document.getElementById('passive').textContent = Math.round(totalPassive / sprints) + '%';
      document.getElementById('detractors').textContent = Math.round(totalDetractors / sprints) + '%';

      document.getElementById('nps').textContent = Math.round(totalNps / sprints) + '%';

}
  }

  function infoSprint(event) {
    var students = data[porSede.value][porGeneracion.value].students;
    // Estudiantes que superan el 70% por sprint
    var techTarget = 0;
    var hseGoal = 0;
    for (var i = 0; i < students.length; i++) {
      if (students[i]['active'] === true && students[i].sprints[porSprint.value - 1].score.tech > 1000) {
        techTarget++;
      }
      if (students[i]['active'] === true && students[i].sprints[porSprint.value - 1].score.hse > 800) {
        hseGoal++;
      }
    }
    document.getElementById('tech-target-sprint').textContent = techTarget;
    document.getElementById('hse-target-sprint').textContent = hseGoal;
    // Alumnas satisfechas con Exp laboratoria
    var scores = data[porSede.value][porGeneracion.value].ratings;
    document.getElementById('teachers-avrg').textContent = scores[porSprint.value - 1].teacher;
    document.getElementById('jedi-avrg').textContent = scores[porSprint.value - 1].jedi;
    var reachExp = scores[porSprint.value - 1].student.cumple + scores[porSprint.value - 1].student.supera;
    document.getElementById('satisfaction-percent').textContent = reachExp + '%';
  }


};



function logOut() {
  if (window.confirm('¿Quieres cerrar la sesión?')) {
    window.location.href = 'http://www.laboratoria.la/';
  }
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.ham-menu')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  //graficos

  // Load google charts
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Generación', 'Porcentaje'],
      ['Alumnas Activas', 46],
      ['Alumnas Desertoras', 54],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
      'title': '',
      'width': 400,
      'height': 300,
      is3D: true,
      colors: ['#005260', "#047a8e", '#12b786', '#087c5a'],
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}
