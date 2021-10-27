import { getEstimate } from '../helpers/api'
import { useState } from 'react'
import { getDefaultNormalizer } from '@testing-library/dom'

const Car = () => {
  const toyotaPriusEco2017 = 'b34f13ff-a7d8-43dc-adc9-7792163d94c7'
  const audiQ7HannahLovesAudis = 'a80df211-f91e-4e0c-b56a-618eb391cb6f'
  const fordFiestaSuperFastExtra = '50410886-c2d3-40a1-9c3c-be9c39dbb479'
  const volvoAnythingWithV60 = 'fc245465-fab0-4a94-b567-5619c204a2df'
  const mercedesS550DefinitelyAConvertible =
    '890ab03b-e909-45dc-8e65-9be6f0445cb6'

  const [errorMessage, setErrorMessage] = useState({})
  const [error, setError] = useState(false)
  const [result, setResult] = useState([])
  const [data, setData] = useState({
    type: 'vehicle',
    distance_unit: 'mi',
    distance_value: 100,
    vehicle_model_id: '7268a9b7-17e8-4c8d-acca-57059252afe9',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    getEstimate(data).then(setResult).catch(handleError)
  }
  const handleError = () => {
    return
  }

  const handleModelSelection = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  //   switch (event.target.value) {
  //     case 'small-car':
  //       console.log(event.target.value)
  //       //   data.vehicle_model_id = '50410886-c2d3-40a1-9c3c-be9c39dbb479'
  //       break
  //     case 'estate-car':
  //       console.log(event.target.value)
  //       break
  //     case 'luxury-car':
  //       console.log(event.target.value)
  //       break
  //     case 'hybrid':
  //       console.log(event.target.value)
  //       //   data.vehicle_model_id = 'b34f13ff-a7d8-43dc-adc9-7792163d94c7'
  //       break
  //     case '4x4':
  //       console.log(event.target.value)
  //       break
  //   }

  console.log(result)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for='distance_value'>How far is your journey?</label>
        <input
          type='number'
          name='distance_value'
          onChange={handleModelSelection}
        />
        {/* Small car, Estate car, Luxury car, Hybrid, 4x4 */}
        <div>
          <label for='small-car'>Small car </label>
          <input
            type='radio'
            id='small-car'
            name='vehicle_model_id'
            value={fordFiestaSuperFastExtra}
            onChange={handleModelSelection}
          />
          <label for='estate-car'>Estate Car</label>
          <input
            type='radio'
            id='estate-car'
            name='vehicle_model_id'
            value={volvoAnythingWithV60}
            onChange={handleModelSelection}
          />
          <label for='luxury-car'>Luxury car</label>
          <input
            type='radio'
            id='luxury-car'
            name='vehicle_model_id'
            value={mercedesS550DefinitelyAConvertible}
            onChange={handleModelSelection}
          />
          <label for='hybrid'>Hybrid</label>
          <input
            type='radio'
            id='hybrid'
            name='vehicle_model_id'
            value={toyotaPriusEco2017}
            onChange={handleModelSelection}
          />
          <label for='4x4'>4X4</label>
          <input
            type='radio'
            id='4x4'
            name='vehicle_model_id'
            value={audiQ7HannahLovesAudis}
            onChange={handleModelSelection}
          />
        </div>
        <input type='submit' value='submit journey info' />
      </form>
      <p>Carbon footprint: {result.carbon_kg}kg</p>
    </div>
  )
}

export default Car
