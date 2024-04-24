import axios from "axios";
import { useState } from "react"

interface FormProps {
    setNewData: (data: boolean) => void;
}

export default function Form(props: FormProps) {
    const [brand, setBarnd] = useState('');
    const [model, setModel] = useState('');
    const [plate, setPlate] = useState('');
    const [cost, setCost] = useState('');

    const [errorText, setErorText] = useState<string[]>([]);

    function handleSubmit(event: any) {
        event.preventDefault();

        axios.post('http://localhost:3000/api/cars', {
            plate_number: plate,
            brand: brand,
            model: model,
            daily_cost: parseInt(cost)
        }).then(() => {
            props.setNewData(true);
            setBarnd('');
            setModel('');
            setPlate('');
            setCost('');
        })
        .catch(error => {
           setErorText(error.response.data.message);
        });

    }

    return <form className="form" onSubmit={() => handleSubmit(event)}>
        <h1>Új jármű felvétele</h1>
        <div className="mb-3">
            <label className="form-label">Renszám</label>
            <input type="text" className="form-control" placeholder="Rendszám" value={plate} onChange={(e) => {setPlate(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Márka</label>
            <input type="text" className="form-control" placeholder="Márka" value={brand} onChange={(e) => {setBarnd(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Típus</label>
            <input type="text" className="form-control" placeholder="Típus" value={model} onChange={(e) => {setModel(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Napi ár(Ft)</label>
            <input type="number" className="form-control" placeholder="Napi ár(Ft)" value={cost} onChange={(e) => {setCost(e.target.value)}}/>
        </div>
        <div style={{color: 'red'}}>
            {errorText.map((err) => (
                <p>{err}</p>
            ))}
        </div>
        <button type="submit" className="btn btn-primary">Új autó</button>
    </form>
}