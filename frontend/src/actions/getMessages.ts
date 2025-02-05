'use server'

export const getMessages = async () => {

  console.log( 'process.env.API_URL',process.env.API_URL)
  const response = await fetch(`${process.env.API_URL}/api/json/messages?_sort=timestamp&_order=desc&_limit=100`)
  return await response.json()
}