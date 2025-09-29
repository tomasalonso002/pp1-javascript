import { useRef, useState, Fragment } from "react";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext"
import { SelectButton } from "primereact/selectbutton";
import {Button} from  "primereact/button";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2"
import { Checkbox } from 'primereact/checkbox';
        

const opcionesColor =[
    {label:'Rojo', value:'red'},
    {label:'Verde', value:'green'},
    {label:'Amarillo', value:'yellow'}
]

const Tarjeta = () =>{
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [color, setColor] = useState("grey")
    const [terminos, setTerminos] = useState(false)
    const toast = useRef(null)


    const formularioValido = nombre && email && terminos && color.value != 'grey'

    const limpiar = ()=>{
        setNombre("")
        setEmail('')
        setTerminos(false)
        setColor('gray')
    }
    const confirmarFormulario =() =>{
        Swal.fire({
            title:'confirmar formulario?',
            text: `Nombre ${nombre || "Sin nombre"} Color: ${color}`,
            showCancelButton:true,
            confirmButtonText:'Si Guardar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed){
                toast.current?.show({
                    severity:'success',
                    summary:'Guardado',
                    detail:'Tarjeta guardada'
                })
            }
            limpiar()
        })
    }
    
    return(
        <Fragment>
            <Toast ref={toast}></Toast>
            <Card title='Tarjeta de presentacin'>
                <div className="p-fuild">
                    <span className="p-float-label">
                        <InputText id="nombre"
                        value={nombre}
                        onChange = {(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    <div className="p-float-label">
                        <InputText 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <small>Definir el fondo</small>
                        <SelectButton
                        value={color}
                        onChange={(e)=> setColor(e.value)}
                        options={opcionesColor}
                        />
                    </div>
                    <div style={{
                        backgroundColor: color,
                        borderRadius:12,
                        
                    }}>
                        <h2>Hola soy {nombre || '______'}</h2>
                        <h3>Mi email es {email || '_______'}</h3>
                        <p>Mi color favorito es {color}</p>
                    </div>

                    <div>
                        <Checkbox
                        id="terminos"
                        checked={terminos}
                        onChange={(e) => setTerminos(e.checked)}
                        />
                        <label htmlFor="terminos">Acepto los terminos y condiciones</label>
                    </div>
                    <div
                        style={{
                        display:'flex',
                        }}>
                        <Button label="Guardar"
                        onClick={()=>confirmarFormulario()}
                        disabled={!formularioValido}
                        />
                        <Button
                        label="Limpiar"
                        onClick={()=>limpiar()}
    
                        />
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}
export default Tarjeta;
