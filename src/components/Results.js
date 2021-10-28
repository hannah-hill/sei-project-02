import { TickerBoard } from 'ticker-board'
import { useEffect, useState } from 'react'

const Results = ({carbon_kg, distance_value}) => {
 
  const [legs, setLegs] = useState('')
  const [message, setMessage] = useState({
    legs: '',
    departure_airport: '',
    destination_airport: '',
    distance: '',
    carbon: '',
  })


  // useEffect(
  //   (oneway, departure_airport, destination_airport, distance, carbon) => {
  //     new TickerBoard('.create-ticker')
  //     oneway ? setLegs('one way') : setLegs('return')
  //     setMessage({
  //       legs: legs,
  //       departure_airport: departure_airport,
  //       destination_airport: destination_airport,
  //       distance: distance,
  //       carbon: carbon,
  //     })
  //   },
  //   []
  // )

  return (
    <div>
      <ul className='create-ticker'>
        <li>
          {legs} trip from {message.departure_airport} to
          {message.destination_airport}
        </li>
        <li>{message.distance} miles</li>
        <li>{message.distance}kg carbon</li>
      </ul>
    </div>
  )
}

export default Results
