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
