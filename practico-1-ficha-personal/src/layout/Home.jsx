import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Button } from"primereact/button"

const Home = ()=>{
    const navigate = useNavigate()
    return(
        <Fragment>
            <h2>Mi home</h2>
            <Button onClick={() => navigate('/tarjeta')} label="Ir al formulario"></Button>
            <Button onClick={() => navigate('/personas')} label="Ver total de personas"></Button>
        </Fragment>
    )
}
export default Home