// GET, POST, PUT Y DELETE

function getCategoria(){
    $.ajax({
        url:"http://192.9.147.170:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        }
    });
}

function postCategoria(){
    if ($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        
        $.ajax({
            url:"http://192.9.147.170:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
        });
    } 
}

function putCategoria(idBotonActualizar){
    if ($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };
    
    $.ajax({
        url:"http://192.9.147.170:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Categoria actualizada correctamente");
            window.location.reload();
        }
    });
    }
}

function deleteCategoria(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de borrar la categoria?',
        text: "No es posible recuperar el registro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '008B8B',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Eliminar'
        
    }).then((result) => {
        if (result.isConfirmed) {
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://192.9.147.170:8080/api/Category/"+ idBotonBorrar,
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

/////////////////////////////////////////////////////
function pintarCategoria(respuesta){
    let myTable="<table class='table-auto w-1/2 text-center whitespace-no-wrap'>";
    myTable+="<th> ID </th>";
    myTable+="<th> NOMBRE </th>";
    myTable+="<th> CATEGORIA </th>"; 
    myTable+="<th> ACTUALIZAR </th>"; 
    myTable+="<th> BORRAR </th>"; 
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='putCategoria("+respuesta[i].id+")' class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteCategoria("+respuesta[i].id+")' class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}
