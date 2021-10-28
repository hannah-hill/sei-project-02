import { TickerBoard } from 'ticker-board'
import { useEffect, useState } from 'react'
import Flights from './Flights.js'

const Results = ({ result, data, oneway, submitted }) => {
  console.log(result)
  console.log(data)
  console.log(oneway)
  const [legs, setLegs] = useState('')
  const [message, setMessage] = useState({})
  const [ticker, setTicker] = useState(false)
  console.log(oneway)

  useEffect(() => {
    oneway ? setLegs('one way') : setLegs('return')
  }, submitted)

  useEffect(() => {
    setMessage({
      journeyType: legs,
      departure_airport: data.legs[0].departure_airport,
      destination_airport: data.legs[0].destination_airport,
      distance: result.distance_value,
      carbon: result.carbon_kg,
    })
  }, [result])

  useEffect(() => {
    if (message.distance) {
      setTicker(true)
    } else {
      setTicker(false)
      return
    }
  }, [message])

  useEffect(() => {
    new TickerBoard('.create-ticker')
  }, [ticker])

  console.log(message)


  return (
    <div className='tickerboard'>
      {ticker ? (
        <ul className='create-ticker'>
          <li>
            {message.journeyType} trip from {message.departure_airport} to{' '}
            {message.destination_airport}
          </li>
          <li>{message.distance} miles</li>
          <li>{message.carbon}kg co2</li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Results
