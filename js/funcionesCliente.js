// GET, POST, PUT Y DELETE

function getCliente(){
    $.ajax({
        url:"http://192.9.147.170:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }
    });
}

function postCliente(){
    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
    
        $.ajax({
            url:"http://192.9.147.170:8080/api/Client/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente el cliente");
                window.location.reload();
            }
        });
    }
}

function putCliente(idBotonActualizar){
    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
    
        let cajas = {
            idClient:idBotonActualizar,
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        console.log(cajas);
    
    $.ajax({
        url:"http://192.9.147.170:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Cliente actualizado correctamente");
            window.location.reload();
        }
    });
    }
}

function deleteCliente(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de borrar el cliente?',
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
                url:"http://192.9.147.170:8080/api/Client/"+ idBotonBorrar,
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
function pintarCliente(respuesta){
    let myTable="<table 'class='table-auto w-1/2 text-center whitespace-no-wrap'>";
    myTable+="<th> ID </th>";
    myTable+="<th> EMAIL </th>";
    myTable+="<th> PASSWORD </th>"; 
    myTable+="<th> NOMBRE </th>"; 
    myTable+="<th> EDAD </th>";
    myTable+="<th> ACTUALIZAR </th>"; 
    myTable+="<th> BORRAR </th>"; 
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='putCliente("+respuesta[i].idClient+")'class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteCliente("+respuesta[i].idClient+")'class='flex mx-auto text-white bg-cyan-900 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded text-lg'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}
