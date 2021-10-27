import axios from 'axios'
import { useState, useEffect } from 'react'
import { getFlightData } from '../helpers/api.js'

const Flights = () => {
  const [errorMessage, setErrorMessage] = useState({})
  const [error, setError] = useState(false)
  const [result, setResult] = useState([])
  const [data, setData] = useState({
    type: 'flight',
    passengers: 2,
    legs: [
      {
        departure_airport: 'lhr',
        destination_airport: 'jfk',
      },
    ],
  })

  // useEffect(() => {
  //   getFlightData(data).then(setResult)
  // }, [data])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data)
      setError(true)
    }
  }

  const handleSubmit = async (event) => {
    // event.preventDefault()
    // getFlightData(data).then(setResult).catch(handleError)

    event.preventDefault()
    getFlightData(data).then(setResult).catch(handleError)

    //   try {
    //     const response = await axios(config).catch(handleError)
    //   }
  }

  console.log(result)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label for='passengers'>Number of passengers:</label>
          <input
            type='number'
            name='passengers'
            value={data.passengers}
            onChange={handleFormChange}
          />
          <input type='submit' value='submit flight info' />
        </div>
      </form>

      <p>Flight distance: {result.distance_value}km</p>
      <p>Carbon footprint: {result.carbon_kg}kg</p>
    </div>
  )
}

export default Flights
