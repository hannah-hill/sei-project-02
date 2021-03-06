import { getEstimate } from '../helpers/api'
import { useState } from 'react'

const Car = () => {
  const toyotaPriusEco2017 = 'b34f13ff-a7d8-43dc-adc9-7792163d94c7'
  const audiQ7 = 'a80df211-f91e-4e0c-b56a-618eb391cb6f'
  const fordFiesta = '50410886-c2d3-40a1-9c3c-be9c39dbb479'
  const volvoV60 = 'fc245465-fab0-4a94-b567-5619c204a2df'
  const mercedesS550 = '890ab03b-e909-45dc-8e65-9be6f0445cb6'

  const [errorMessage, setErrorMessage] = useState({})
  const [error, setError] = useState(false)
  const [result, setResult] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState({
    type: 'vehicle',
    distance_unit: 'mi',
    distance_value: 100,
    vehicle_model_id: '7268a9b7-17e8-4c8d-acca-57059252afe9',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    getEstimate(data).then(setResult).catch(handleError)
    setSubmitted(true)
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='car-form'>
          <div className='field'>
            <label for='distance_value'>Distance in miles: </label>
            <input
              type='number'
              name='distance_value'
              placeholder='e.g. 100'
              onChange={handleModelSelection}
            />
          </div>
          {/* Small car, Estate car, Luxury car, Hybrid, 4x4 */}
          <div className='radio'>
            <div>
              <label for='small-car'>Small car </label>
              <input
                type='radio'
                id='small-car'
                name='vehicle_model_id'
                value={fordFiesta}
                onChange={handleModelSelection}
              />
            </div>
            <div>
              <label for='estate-car'>Estate Car</label>
              <input
                type='radio'
                id='estate-car'
                name='vehicle_model_id'
                value={volvoV60}
                onChange={handleModelSelection}
              />
            </div>
            <div>
              <label for='luxury-car'>Luxury car</label>
              <input
                type='radio'
                id='luxury-car'
                name='vehicle_model_id'
                value={mercedesS550}
                onChange={handleModelSelection}
              />
            </div>
            <div>
              <label for='hybrid'>Hybrid</label>
              <input
                type='radio'
                id='hybrid'
                name='vehicle_model_id'
                value={toyotaPriusEco2017}
                onChange={handleModelSelection}
              />
            </div>
            <div>
              <label for='4x4'>4X4</label>
              <input
                type='radio'
                id='4x4'
                name='vehicle_model_id'
                value={audiQ7}
                onChange={handleModelSelection}
              />
            </div>
          </div>
          <input className='submit-button' type='submit' value='submit' />
        </div>
      </form>
      {submitted ? (
        <div className='car-result-section'>
          <div className='car-tree'></div>
          <div className='car-result-text'>
            <p>Carbon footprint for this journey: {result.carbon_kg}kg</p>
            <p className='car-result'>
              To offset this journey you would need to plant{' '}
              <span>{(result.carbon_kg / 24).toFixed(2)} trees</span>
            </p>
          </div>
          <div className='car-tree'></div>
        </div>
      ) : (
        <> </>
      )}
    </div>
  )
}

export default Car
