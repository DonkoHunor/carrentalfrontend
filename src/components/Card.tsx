import axios from "axios"
import { Car } from "../dtos/Car.dto"

interface CardProps {
    car: Car
}

export default function Card(props: CardProps) {
    const url = `/${props.car.brand.toLowerCase()}_${props.car.model.toLowerCase()}.png`

    function rent(){
        axios.post(`http://localhost:3000/api/cars/${props.car.id}/rent`)
        .then(() => {
            alert('Sikeres kölcsönzés')
        })
        .catch((error) => {
            alert(error.response.data.message);
        })
    }

    return <div className="col-3 m-1 col-md-6 col-sm-12 col-xs-12 card" style={{width: '400px'}}>
        <div className="car-body">
            <h1 className="card-title">{props.car.license_plate_number}</h1>
            <p>Márka: {props.car.brand}</p>
            <p>Típus: {props.car.model}</p>
            <p>Napi ár: {props.car.daily_cost} Ft</p>
            <button className="btn btn-primary" onClick={rent}>Kölcsönzés</button>
            <img src={url} alt="No image" className="card-img-bottom" />
        </div>
    </div>
}