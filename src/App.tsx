import { useEffect, useState } from 'react'
import { Car } from './dtos/Car.dto'
import axios from 'axios';
import Card from './components/Card';
import Form from './components/Form';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newData, setNewData] = useState(true);

  useEffect(() => {
      axios.get('http://localhost:3000/api/cars')
      .then((res) => {
        setCars(res.data);
      })
      setNewData(false);
  }, [newData])

  return (
    <div className='container'>
      <header>
        <a href="#form">Új autó felvétele</a>
        <a href="https://petrik.hu/" target='blank'>Petrik honlap</a>
      </header>
      <h1>Petrik Autókölcsönző</h1>
      <div className="row">
        {cars.map((car) => (
          <Card key={car.id} car={car}/>
        ))}
      </div>
      <div id='form' className="row">
        <Form setNewData={setNewData}/>
      </div>
      <footer>Készítette: Donkó Hunor</footer>
    </div>
  )
}

export default App
