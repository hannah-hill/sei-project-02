# FOOTPRINT - GA PROJECT 02

This is my second project for the General Assembly Software Engineering Immersive course. The project was pair-coded with my classmate [James Rogers](https://github.com/james92rogers) in a 48-hour hackathon.

This app is deployed with Netlify and is available [here](https://footprint-app.netlify.app/).

Footprint allows users to calculate the carbon footprint of their plane and car journeys.
![footprint](readme_images/image1.png)

## TABLE OF CONTENTS

- [Overview](#overview)
  - [Brief](#brief)
  - [Technologies Used](#technologies)
  - [Getting Started](#getting-started)
- [Planning](#planning)
  - [The Carbon Interface API](#api)
  - [Pseudocode & Wireframing](#pseudocode)
- [Development](#development)
  - [Main Structure & API](#main)
  - [Forms](#forms)
  - [Displaying CO2 Estimates](#estimates)
  - [Styling](#styling)
- [Bugs & Known Errors](#bugs)
- [Future Improvements](#improvements)
- [Key Learnings](#learnings)

## <a name='overview'>OVERVIEW</a>

### <a name='brief'>BRIEF</a>

Our brief was to create a React app leveraging a public API.

### <a name='technologies'>TECHNOLOGIES USED</a>

- HTML5
- CSS/Sass
- JavaScript (ES6)
- React
- Axios
- Git / GitHub
- React-router
- Insomnia / Postman
- [Carbon Interface API](https://docs.carboninterface.com/#/)

### <a name='getting-started'>GETTING STARTED</a>

Clone or download this repository.
In Terminal, run `yarn` at the project root to download any dependencies.
In Terminal, run `yarn start` to start the server in your local environment .

## PLANNING

### <a name='api'>THE CARBON INTERFACE API</a>

The first step in our project was to choose a public API to use with our React app. James and I were both determined to do more than simply display a database, we wanted to create a genuinely useful and relevant app with user interaction. So despite being momentarily tempted by a [cocktail database](https://www.thecocktaildb.com/api.php), we settled on the [Carbon Interface API](https://docs.carboninterface.com/#/).

Carbon Interface offers an Estimates API to generate accurate emissions estimates for common CO2 emitting activities, such as flights, vehicles, shipping, electricity combustion, and fuel combustion.

We started by using Insomnia REST Client to test the API and see how the data would come back. This was our first project using an API so it took us a moment to get to grips with the documentation. Carbon Interface requires Bearer authorization so we registered for an API key and began sending some test requests. After a few attempts, we figured out the JSON formatting for POST requests and got back our first accurate estimate for a flight!

![Insomnia](readme_images/image5.png)

With only 48 hours to build the app, we decided to keep it simple and offer CO2 estimates for travel data, leveraging the API’s flight and vehicle endpoints.

### <a name='pseudocode'>PSEUDOCODE & WIREFRAMING</a>

We worked together to sketch out some wireframes on paper to envision the HTML layout and decide what pages we need. We then drafted some pseudocode together for the main site elements to ensure we followed and understood the logic before we split the workload and started branching.

During the planning process, we checked in with our Lead Instructor, Robin Kerrison. He mentioned that he had developed a [tickerboard](https://rjkerrison.co.uk/ticker-board/) plugin which could match our travel theme. I hadn’t used a plugin before and was keen to give it a go, so we planned to use the tickerboard to show the calculated results.

## <a name='development'>DEVELOPMENT</a>

### <a name='main'>MAIN STRUCTURE & API</a>

Time to start coding! We decided to start by working together over Zoom and using VSCode’s LiveShare feature, so we could collaborate on the same file. We wanted to establish the main site structure together and get the api working with React. After creating the React app, we created functional components with a placeholder h2 element for all the pages. These were saved in a components folder to keep things organised.

With our page components defined and exported, we installed React Router to create routing in our main `App.js` file. We defined and returned the main HTML structure with `header`, `main`, and `footer` elements, before wrapping the HTML in a `BrowserRouter` component and adding in Routes for each page, defining paths and components.

```
<Router>
        <div className='App'>
          <header className='App-header'>
            <div className='plane'></div>
            <Nav />
          </header>
          <div className='logo'></div>
          <main>
            <Route path='/flight' component={Flights} />
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/car' component={Car} />
            <Route path='/results' component={Results} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
```

Next, we created a `helpers` folder and an `api.js` file, where we coded and exported our api call to make it available to multiple components. Conveniently, the Carbon Interface API uses the same url for both the flight and vehicle estimates, but with different JSON bodies. From this file, both the vehicle and flight page components could import the API call function.

We opted to use Axios for HTTP requests, so we installed it to our dependencies before writing out our request. We wrote a POST request with Axios, with a data parameter for the request body and added an Authorization header for our bearer token. Axios automatically transforms JSON data so there was no need to parse the response, and we used dot notation to return just the required data nested in our response object.

```
import axios from 'axios'

export const getEstimate = async (data) => {
  const config = {
    method: 'post',
    url: 'https://www.carboninterface.com/api/v1/estimates',
    headers: {
      Authorization: 'Bearer Pnzk90BwOSNgzTAucaepg',
      'Content-Type': 'application/json',
    },
    data,
  }
  const response = await axios(config)
  return response.data.data.attributes
}
```

### <a name='forms'>FORMS</a>

With the API call ready, we started building our form elements for users to input their journey information and receive CO2 calculations.

#### Flights

We leveraged React’s State Hook to store form data as an object. Each of our HTML form inputs contained an onChange event handler to update the data variable’s state object with the relevant value.

```
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
```

To get results for a return flight, the Carbon Interface API requires two trips as separate objects in the `legs` array, i.e. LHR -> LAX, LAX -> LHR. To achieve this, an event handler for the radio inputs contains an if statement that will push the second trip to the `legs` array if return is selected.

```

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
```

The form’s `onSubmit` event handler is an async function to enable Axios to return a promise. Inside, we call our imported API function (getEstimate) with the data object as an argument. The chained `then()` and `catch()` methods handle the response, either setting the response data to a result state variable or throwing an error.

```
 const handleSubmit = async (event) => {
    event.preventDefault()
    getEstimate(data).then(setResult).catch(handleError)
    setSubmitted(true)
  }
```

The onSubmit handler also triggers a state change for a ‘submitted’ variable, which renders a component containing the user’s results displayed on a tickerboard.

#### Car Journey

The form for car journeys functions very similarly to that for flights, with a few changes. The submit event handler is identical and State Hooks are used again to store form data for the request body, as well as the API response data.

However, the API vehicle endpoint required a very specific vehicle model ID to be included in the request body. Realising this was an unrealistic expectation for users, we opted instead to create five options for different car types. Neither James nor I know much about cars, but after extensive research we selected a common car model to represent each of the five categories. Each of these is saved to a variable, and an event handler for the radio inputs updates the data state variable with the correct model id.

As a result, the user receives an approximate result based on their distance in miles and car type.

```
const toyotaPriusEco2017 = 'b34f13ff-a7d8-43dc-adc9-7792163d94c7'
  const audiQ7 = 'a80df211-f91e-4e0c-b56a-618eb391cb6f'
  const fordFiesta = '50410886-c2d3-40a1-9c3c-be9c39dbb479'
  const volvoV60 = 'fc245465-fab0-4a94-b567-5619c204a2df'
  const mercedesS550 = '890ab03b-e909-45dc-8e65-9be6f0445cb6'

...

const handleModelSelection = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }
```

As the forms are the central part of our app, it was important they looked professional. I owned the form styling and aimed to replicate the feel of forms on airline and hotel websites, to align with ideas of travel.

![form](readme_images/image4.png)
![form](readme_images/image2.png)

### <a name='estimates'>DISPLAYING CO2 ESTIMATES</a>

Returning CO2 estimates for the user’s journey details is the central function of our app. We created a separate functional component for the results HTML, including the ticker board. Once the user submits a form, the component is rendered. Since the API call is in the Flight / Car component, the request data for the POST request, as well as the response, are passed as props to the Results component.

At this point, James and I stopped using VSCode LiveShare and instead started working on separate git branches. James focussed on styling, including the airplane animation, while I was responsible for completing the Results component, including the ticker board on the Flight page.

I initially had some difficulty with the ticker board. The current version was built for Vanilla JavaScript and therefore did not work easily with state changes in React - it would render before the API response data was set and load a ticker board of empty estimates. In the end, I implemented three Effect Hooks to stagger the rendering and ensure the ticker board displayed the correct estimate.

Apart from the React integration issues, the ticker board documentation set out clearly how to use the ticker board to display content. The flight information, distance, and CO2 emission are all loaded and displayed to the user.

To put the CO2 weight into context, we added a div under the ticker board displaying the number of trees that would have to be planted to offset this journey. This was not included in the API so we found the correct calculation and wrote it into our JS.

```
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
    new TickerBoard('.create-ticker', {
      theme: 'dark',
    })
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
```

![gif](readme_images/image3.gif)

### <a name='styling'>STYLING</a>

Since this was a Hackathon, we decided to keep the styling very simple as we knew we would not have much time to style. We learnt Sass the previous week on our course and were keen to use the extension in this project, particularly to keep things organised while working as a pair.

We created partial Sass files to modularize our CSS, making it easier to work collaboratively while keeping our code dry. We also used Sass variables, particularly for fonts and colours we were reusing often, to keep our styling consistent.

## <a name='bugs'> BUGS & KNOWN ERRORS</a>

The ticker board is currently only live on the flights page to show response data. As I mentioned above, we had issues with using the plugin in a React environment and did not have sufficient time to get it active on both pages. Since finishing our project, Robin has released a React version of his ticker board which works with state changes, which should make the installation easier.

The div that displays the number of trees needed to offset the journey, on first render it displays ‘NaN trees’. Currently, the div renders when the submitted state changes, but instead it should be tied to the API response data coming through.

## <a name='improvements'>FUTURE IMPROVEMENTS</a>

This project was a Hackathon and as a result, the code is far from perfect. It could do with being refactored in places and there are many features we would have liked to add given more time.

At the top of our list was adding in an airport code plugin. The Carbon Interface API only accepts three-letter airport IATA codes (e.g. LHR or JFK), but it’s unrealistic to expect users to always know these codes. We would have liked to add in a predictive search element to the form, where it finds the airport code based on the inputted city. We found a public repository with a full database of airport codes and their respective cities here, and would have loved to leverage this to enhance our UX.

We weren’t left with much time for styling, and as a result we did not have time to add in any responsive styling for mobile/tablet views.

I would have liked to have added in a bit more information on what the CO2 result means in comparable terms. We translate the response into the equivalent number of trees, however it would have been great to suggest other activities or measures users could take to offset their emissions.

My first experience using Git and GitHub to work collaboratively, I realised the importance of commit messages (especially when you take into account potential employers seeing the below).

![image](readme_images/image6.png)

## <a name='learnings'>KEY LEARNINGS</a>

This was my first project using React and was a great way to consolidate my understanding, particularly when it came to conditional rendering and React Hooks.

This project was also my first real experience of pair programming on a significant project. James and I really enjoyed working together and it was a great opportunity to learn different approaches from one another, and get some experience with LiveShare and git.

Finally, working with an external API and a plugin, I gained some really useful grounding in understanding and using documentation for external resources.
