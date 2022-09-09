// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import executeQuery from '../../lib/db'

async function createTable (sql, res) {
  await executeQuery({
    query: sql,
    values: null
  }).then(() => {
    res.statusCode = 200
    res.end()
  })
}

export default async function handler (req, res) {
  try {
    await createTable(
      'CREATE TABLE IF NOT EXISTS `voting`.`motions` ( `id` INT NOT NULL AUTO_INCREMENT, `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `yes` INT , `no` INT , `abstention` INT , `active` TINYINT(1), `title` TEXT NOT NULL, PRIMARY KEY (id))',
      res
    )

    await createTable(
      'CREATE TABLE IF NOT EXISTS `voting`.`speakers` ( `id` INT NOT NULL AUTO_INCREMENT, `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `name` TEXT NOT NULL, `gender` TEXT NOT NULL, PRIMARY KEY (id))',
      res
    )

    await createTable(
      'CREATE TABLE IF NOT EXISTS `voting`.`agendaitems` ( `id` INT NOT NULL AUTO_INCREMENT , `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `title` TEXT NOT NULL, `active` TINYINT(1), PRIMARY KEY (id))',
      res
    )

    await createTable(
      'CREATE TABLE IF NOT EXISTS `voting`.`settings` (`setting` TEXT NOT NULL, `bool` TINYINT(1))',
      res
    )

    await createTable(
      'CREATE TABLE IF NOT EXISTS `voting`.`voters` (`user` VARCHAR(250) NOT NULL, `weight` INT NOT NULL, `voted` INT NOT NULL, `expires` TIMESTAMP, `loggedin` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user))',
      res
    )
  } catch (error) {
  }
}
