/////FUNCIONES PARA SACAR EL REPORTE DE LOS ESTADOS DE LAS RESERVAS
function getStatus(){
    $.ajax({
        url:"http://192.9.147.170:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
            console.log(respuesta);
        }
    });
}

function pintarStatus(respuesta){
    let myTable="<table class='table-auto w-1/2 text-center whitespace-no-wrap'>";
        myTable+="<th> COMPLETADAS </th>";
        myTable+="<th> CANCELADAS </th>";
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";   
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

/////FUNCIONES PARA SACAR EL REPORTE POR RANGO DE FECHAS
function getFechas(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();
    $.ajax({
        url:"http://192.9.147.170:8080/api/Reservation/report-dates/"+dato1+"/"+dato2,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarFechas(respuesta);
            console.log(respuesta);
        }
    });
}

function pintarFechas(respuesta){
    let myTable="<table class='table-auto w-1/2 text-center whitespace-no-wrap'>";
    myTable+="<th> FECHA INICIO </th>";
    myTable+="<th> FECHA DEVOLUCION</th>";
    myTable+="<th> ESTADO </th>";
    myTable+="<th> NOMBRE DEL CLIENTE </th>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado7").html(myTable);
}


/////FUNCIONES PARA SACAR EL REPORTE DE CANTIDAD DE RESERVAS X CLIENTE
function getClientes(){
    $.ajax({
        url:"http://192.9.147.170:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarClientes(respuesta);
            console.log(respuesta);
        }
    });
}

function pintarClientes(respuesta){
    let myTable="<table class='table-auto w-1/2 text-center whitespace-no-wrap'>";
    myTable+="<th> NOMBRE CLIENTE </th>";
    myTable+="<th> TOTAL RESERVAS</th>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado8").html(myTable);
}