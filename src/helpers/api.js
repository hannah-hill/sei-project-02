import axios from 'axios'

export const getFlightData = async (data) => {
  const config = {
    method: 'post',
    url: 'https://www.carboninterface.com/api/v1/estimates',
    headers: {
      Authorization: 'Bearer gJaaycEi2IcMN6y6x4Obdg',
      'Content-Type': 'application/json',
    },
    data,
  }
  const response = await axios(config)
  return response.data.data.attributes
}
