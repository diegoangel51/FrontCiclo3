// GET, POST, PUT Y DELETE

function getMensajes(){
    $.ajax({
        url:"http://192.9.147.170:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){
    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            messageText:$("#messageText").val()
        
        };
        console.log(cajas);
        
        $.ajax({
            url:"http://192.9.147.170:8080/api/Message/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente el Mensaje");
                window.location.reload();
            }
        });
    }
}

function putMensajes(idBotonActualizar){

    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            idMessage:idBotonActualizar,
            messageText:$("#messageText").val()
        }
        console.log(cajas);
    
        $.ajax({
            url:"http://192.9.147.170:8080/api/Message/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Mensaje actualizado correctamente");
                window.location.reload();
            }
        });
    }
}

function deleteMensajes(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de borrar el cliente?',
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
                url:"http://192.9.147.170:8080/api/Message/"+ idBotonBorrar,
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
            'El Mensaje ha sido eliminada.',
            'Completado'
          )
        }
    })


}


/////////////////
function pintarMensajes(respuesta){
    let myTable="<table class='table-auto w-1/2 text-center whitespace-no-wrap'>";
    myTable+="<th> ID </th>";
    myTable+="<th> MENSAJE </th>";
    myTable+="<th> ACTUALIZAR </th>"; 
    myTable+="<th> BORRAR </th>"; 
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick='putMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}