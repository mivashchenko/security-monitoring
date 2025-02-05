'use server'

export const getMessages = async () => {
  const response = await fetch(`https://vast-retreat-05206-d317ca74ea03.herokuapp.com/api/json/messages?_sort=timestamp&_order=desc&_limit=100`)
  return await response.json()
}