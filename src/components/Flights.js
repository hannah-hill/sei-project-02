import axios from 'axios'
import { useState, useEffect } from 'react'
import { getEstimate } from '../helpers/api.js'
import Results from './Results.js'

const Flights = () => {
  const [oneway, setOneway] = useState(true)
  const [errorMessage, setErrorMessage] = useState({})
  const [error, setError] = useState(false)
  const [result, setResult] = useState([])
  const [data, setData] = useState({
    type: 'flight',
    passengers: 2,
    legs: [
      {
        departure_airport: 'lhr',
        destination_airport: 'cdg',
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

  const handleDepartureAirportChange = (event) => {
    data.legs[0].departure_airport = event.target.value
  }

  const handleDestinationAirportChange = (event) => {
    data.legs[0].destination_airport = event.target.value
  }

  const handleReturnJourney = (event) => {
    if (event.target.value === 'one-way') {
      setOneway(true)
      return
    } else if (event.target.value === 'return') {
      setOneway(false)
      data.legs.push({
        departure_airport: data.legs[0].destination_airport,
        destination_airport: data.legs[0].departure_airport,
      })
    }
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data)
      setError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    getEstimate(data).then(setResult).catch(handleError)
  }

  console.log(result)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flight-form'>
          <label for='passengers'>Number of passengers:</label>
          <input
            type='number'
            name='passengers'
            value={data.passengers}
            onChange={handleFormChange}
          />
          <label for='departure airport'>Departure airport:</label>
          <input
            type='text'
            placeholder='Where are you flying from?'
            name='departure airport'
            onChange={handleDepartureAirportChange}
          />
          <label for='arrival airport'>Arrival airport:</label>
          <input
            type='text'
            placeholder='Where are you flying to?'
            name='arrival airport'
            onChange={handleDestinationAirportChange}
          />
          <div>
            <label for='one-way'>One-way</label>
            <input
              type='radio'
              id='one-way'
              name='legs'
              value='one-way'
              onChange={handleReturnJourney}
            />
            <label for='return'>Return</label>
            <input
              type='radio'
              id='return'
              name='legs'
              value='return'
              onChange={handleReturnJourney}
            />
          </div>
          <input type='submit' value='submit flight info' />
        </div>
      </form>
      <Results
        departureAirport={data.legs[0].departure_airport}
        destinationAirport={data.legs[0].destination_airport}
        oneway={oneway}
        distance={result.distance_value}
        carbon={result.carbon_kg}
      />
      <p>Flight distance: {result.distance_value}km</p>
      <p>Carbon footprint: {result.carbon_kg}kg</p>
    </div>
  )
}

export default Flights
