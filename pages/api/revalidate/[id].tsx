import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating details page.....')
  const {
    query: { id },
  } = req
  let revalidated = false

  try {
    await res.revalidate(`/task/${id}`)
    revalidated = true
  } catch (err) {
    console.log(err)
  }

  res.json({
    revalidated,
  })
}
