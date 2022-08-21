import executeQuery from '../../../lib/db'

export default function handler (req, res) {
  return new Promise(async (resolve) => {
    await executeQuery({
      query: 'SELECT * FROM `settings` WHERE `settings`.`setting`="quotation"',
      values: null
    }).then(r => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'max-age=1')
      res.end(JSON.stringify(r))
      resolve()
    })
  })
}
