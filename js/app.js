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
          /*se harael conteo de las etsudiantes que superaron las metas tanto de tech y de hse*/
          for (var j = 0; j < sprints; j++) {
            totalTech += students[i].sprints[j].score.tech;
            if (students[i].sprints[j].score.tech > 1000) {
              techGoal++;
            }
            totalHse += students[i].sprints[j].score.hse;
            if (students[i].sprints[j].score.hse > 800) {
              hseGoal++;
            }
          }
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
      console.log(techGoalAverage);
      var hseGoalAverage = hseGoal / sprints;
      console.log(hseGoalAverage);

      //mostrar datos en pantalla la primera es para etsudiantes activa y la segunda muestra el porcentaje de desertoras
      document.getElementById('current-students').textContent = activeStudents;
      document.getElementById('dropout').textContent = Math.round((dropoutStudents / students.length) * 100);
      document.getElementById('pass-average').textContent = passStudents;
      document.getElementById('pass-percent').textContent = Math.round((passStudents / activeStudents) * 100);
      document.getElementById('tech-target-average').textContent = Math.round(techGoalAverage);
      document.getElementById('hse-target-average').textContent = Math.round(hseGoalAverage);




      // Promedio NPS
      var ratings = data[porSede.value][porGeneracion.value].ratings;
      var sumNps = 0;
      var sumProm = 0;
      var sumPass = 0;
      var sumDet = 0;
      for (var i = 0; i < sprints; i++) {
        sumProm += ratings[i].nps.promoters;
        sumPass += ratings[i].nps.passive;
        sumDet += ratings[i].nps.detractors;
        sumNps += ratings[i].nps.promoters - ratings[i].nps.detractors;
      }
      // Mostrar datos en el documento
      document.getElementById('promoters').textContent = Math.round(sumProm / sprints) + '%';
      document.getElementById('passive').textContent = Math.round(sumPass / sprints) + '%';
      document.getElementById('detractors').textContent = Math.round(sumDet / sprints) + '%';

      document.getElementById('nps').textContent = Math.round(sumNps / sprints) + '%';

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
    var ratings = data[porSede.value][porGeneracion.value].ratings;
    document.getElementById('teachers-avrg').textContent = ratings[porSprint.value - 1].teacher;
    document.getElementById('jedi-avrg').textContent = ratings[porSprint.value - 1].jedi;
    var reachExp = ratings[porSprint.value - 1].student.cumple + ratings[porSprint.value - 1].student.supera;
    document.getElementById('satisfaction-percent').textContent = reachExp + '%';
  }

  google.charts.setOnLoadCallback(drawChart);
    // Draw the chart and set the chart values
    function drawChart() {
        //Create the data table5
        var data5 = google.visualization.arrayToDataTable([
            ['', ''],
            ['Above Score', techGoalAverage],
            ['Under Score', ss2],
        ]);
        // Optional; add a title and set the width and height of the chart
        var options = {
            'width': 390,
            'height': 290,
            is3D: true,
            colors: ['#FFC107', "#FF8F00", '#FFD54F', '#FFECB3'],
            backgroundColor: {
                fill: 'transparent'
            }
        };
        //Dibujamos el nuevo gráfico
        var chart5 = new google.visualization.PieChart(document.getElementById('piechart'));
        chart5.draw(data5, options);
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
      'title': 'Porcentaje',
      'width': 400,
      'height': 300,
      is3D: true,
      colors: ['#FFC107', "#FF8F00", '#FFD54F', '#FFECB3'],
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}
