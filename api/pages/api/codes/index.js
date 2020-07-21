import { rastro } from 'rastrojs'

export default async (req, res) => {
  const { codes: query } = req.query
  const codes = query.split('|')

  const tracks = codes.map(async function (code, index) {
    const res = await rastro.track(code)

    return res[0]
  })

  const result = await Promise.all(tracks)

  res.statusCode = 200
  res.json(result)
}
