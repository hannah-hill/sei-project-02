import axios from 'axios'
import { useState, useEffect } from 'react'
import { getEstimate } from '../helpers/api.js'
import Results from './Results.js'

const Flights = () => {
  const [oneway, setOneway] = useState(true)
  const [submitted, setSubmitted] = useState(false)
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
    setSubmitted(true)
  }

  console.log(result)
  console.log(data)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flight-form'>
          <div className='field'>
            <label for='passengers'>Passengers:</label>
            <input
              type='number'
              name='passengers'
              value={data.passengers}
              onChange={handleFormChange}
            />
          </div>
          <div className='field'>
            <label for='departure airport'>Departure airport:</label>
            <input
              type='text'
              placeholder='IATA code here e.g LAX'
              name='departure airport'
              onChange={handleDepartureAirportChange}
            />
          </div>
          <div className='field'>
            <label for='arrival airport'>Arrival airport:</label>
            <input
              type='text'
              placeholder='IATA code here e.g LHR'
              name='arrival airport'
              onChange={handleDestinationAirportChange}
            />
          </div>
          <div className='field radio'>
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
          <div className='field submit'>
            <input className='submit-button' type='submit' value='submit' />
          </div>
        </div>
      </form>

      {submitted ? (
        <Results
          oneway={oneway}
          result={result}
          data={data}
          submitted={submitted}
        />
      ) : (
        <></>
      )}


    <div className="result-section">
      <div className="tree"></div>
      <p className='result'>To offset this journey you would need to plant {(result.carbon_kg / 24).toFixed(2)} trees</p>
      <div className="tree"></div>
      </div>
      <button className="reload-button">Search Another Flight?</button>
    </div>
  )
}
export default Flights

// departureAirport={data.legs[0].departure_airport}
// destinationAirport={data.legs[0].destination_airport}
// distance={result.distance_value}
// carbon={result.carbon_kg}
