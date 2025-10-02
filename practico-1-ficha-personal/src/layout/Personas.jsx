import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import Swal from "sweetalert2";
const PERSONAS_KEY ='personas'

const colorLabel = (c) => c ==='red' ? 'Rojo' : c=== 'yellow' ? 'Amarillo' : c === 'green' ? 'Verde': "Gris"


const Personas = () =>{
    const [personas, SetPersonas] = useState([])
    
    const navigate = useNavigate()

    const cargarPersonas = () => {
        const data = localStorage.getItem(PERSONAS_KEY)
        const formatedData = data ? JSON.parse(data) : []
        SetPersonas(formatedData)
    }

    useEffect(()=>{
        cargarPersonas()
    },[])

    const colorTemplate = (row) => colorLabel(row?.color)
    
    const fechaTemplate = (row) => row?.createdAt ? new Date(row?.createdAt).toLocaleString():row?.createdAt
    
    const borrarPersona = (id) => {
        Swal.fire({
            title : 'Estas seguro de eliminar el registro?',
            text: 'Esta accion no se puede desacer',
            icono: 'warning',
            showCancelButton: true,
            confirmButtonText:'Si, Eliminar',
            cancelButtonText:'Canselar' 
        }).then((action)=>{
            if(action.isConfirmed){
                const data = localStorage.getItem(PERSONAS_KEY)
                const arr = data ? JSON.parse(data) : []
                arr.splice(id,1)
                localStorage.setItem(PERSONAS_KEY, JSON.stringify(arr))
                SetPersonas(arr) // actualiza el 
            }
        })
    }






    const accionesTemplate = (row, opts) =>{
        const id = opts.rowIndex
        return(
            <div>
                <Button icon="pi pi-trash" label="Eliminar" onClick={()=> borrarPersona(id)}/>
                <Button icon="pi pi-pencil" label="Editar" onClick={() => navigate(`/tarjeta/${id}`)}/>
            </div>
        )
    }
    
    return(
        <Card title="Personas guardadas">
            <div>
                <Button label="Refrescar" onClick={()=>cargarPersonas()}/>

                <Button label="Ir a la Home" onClick={()=>navigate('/')}/>
                <Button label="Nueva persona" onClick={()=>navigate('/tarjeta')}/>
            </div>
            <DataTable value={personas} emptyMessage="No hay personas registradas">
                <Column field="nombre" header="nombre"/>
                <Column field="email" header="email"/>
                <Column header="color" body={colorTemplate} />
                <Column header="Fecha de creacion" body={fechaTemplate}/>
                <Column header="Acciones" body={accionesTemplate}/>
            </DataTable>
        </Card>
    )
}
export default Personas