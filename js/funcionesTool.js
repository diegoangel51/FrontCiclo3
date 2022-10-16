////////////////GET,POST,PUT Y DELETE

function getTool(){
    $.ajax({
        url:"http://192.9.147.170:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarTool(respuesta);
        }
    });
}

function postTool(){
    if ($("#brand").val().length==0 || $("#year").val().length==0 || $("#name").val().length==0 || $("#description").val().length==0 || $("#select-category").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        brand:$("#brand").val(),
        year:$("#year").val(),
        name:$("#name").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()}
    };
    console.log(cajas);
    
    $.ajax({
        url:"http://192.9.147.170:8080/api/Tool/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el Tool");
            window.location.reload();
        }
    });
}
}

function putTool(idBotonActualizar){


    if ($("#brand").val().length==0 || $("#year").val().length==0 || $("#name").val().length==0 || $("#description").val().length==0 || $("#select-category").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
    
        let cajas = {
            id:idBotonActualizar,
            brand:$("#brand").val(),
            year:$("#year").val(),
            name:$("#name").val(),
            description:$("#description").val(),
            category:{id: +$("#select-category").val()}
        };
    console.log(cajas);
    
    $.ajax({
        url:"http://192.9.147.170:8080/api/Tool/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Herramienta actualizada correctamente");
            window.location.reload();
        }
    });
    }



}

function deleteTool(idBotonBorrar){


    Swal.fire({
        title: 'Esta seguro de borrar la herramienta?',
        text: "No es posible recuperar el registro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008B8B',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Eliminar'
        
    }).then((result) => {
        if (result.isConfirmed) {
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://192.9.147.170:8080/api/Tool/"+ idBotonBorrar,
                type:"DELETE",
                datatype:"JSON",
                data: JSON.stringify(myData),
                contentType:"application/json",
                success:function(respuesta){
                   window.location.reload();
                }
            });
        Swal.fire(
            'Eliminado!',
            'La categoria ha sido eliminada.',
            'Completado'
          )
        }
    })
}

/////////////////
function getTool_Category(){
    //console.log("hola desde tool")
    $.ajax({
        url:"http://192.9.147.170:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });

}


/////////////////////////////////////////////////////
function pintarTool(respuesta){
    let myTable="<table class='table-auto w-1/2 text-center whitespace-no-wrap'>";
    myTable+="<th> ID </th>";
    myTable+="<th> MARCA </th>";
    myTable+="<th> AÑO </th>"; 
    myTable+="<th> NOMBRE </th>";
    myTable+="<th> DESCRIPCION </th>"; 
    myTable+="<th> CATEGORIA </th>";
    myTable+="<th> ACTUALIZAR </th>"; 
    myTable+="<th> BORRAR </th>"; 
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.description+"</td>";
        myTable+="<td> <button onclick='putTool("+respuesta[i].id+")'class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteTool("+respuesta[i].id+")'class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}