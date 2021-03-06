const tableExists = require('../utils/tableExists')
const query = require('../utils/query')
const { isEmpty } = require('../../../src/utils')

const users = database => (
  new Promise((resolve, reject) => {
    tableExists(database, 'users')
      .then((res) => {
        if (res === false) {
          return query(
            database,
            'CREATE TABLE `users` '
            + '( '
            + '  `id` INT NOT NULL AUTO_INCREMENT , '
            + '  `username` VARCHAR(255) NOT NULL , '
            + '  `firstname` VARCHAR(255) NOT NULL , '
            + '  `lastname` VARCHAR(255) NOT NULL , '
            + '  `email` VARCHAR(255) NOT NULL , '
            + '  `password` VARCHAR(255) NOT NULL , '
            + '  `salt` VARCHAR(255) NOT NULL , '
            + '  `creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , '
            + '  `birthday` DATE , '
            + '  `popularity` INT NOT NULL DEFAULT 0, '
            + '  `biography` TEXT, '
            + '  `is_connected` BOOLEAN NOT NULL DEFAULT false, '
            + '  `last_connection` DATETIME , '
            + '  `is_account_confirmed` BOOLEAN NOT NULL DEFAULT false, '
            + '  `is_profile_complete` BOOLEAN NOT NULL DEFAULT false, '
            + '  `is_geolocation_allowed` BOOLEAN NOT NULL DEFAULT false, '
            + '  `latitude` VARCHAR(255) , '
            + '  `longitude` VARCHAR(255) , '
            + '  `id_gender` INT , '
            + '   UNIQUE (`username`),'
            + '   UNIQUE (`email`),'
            + '   PRIMARY KEY (`id`)'
            + ') '
            + 'ENGINE = InnoDB;'
          )
        }
        throw new Error('[mysql] users table already exists')
      })
      .then((res) => {
        if (!isEmpty(res)) console.log('[mysql] users table has been created')
        resolve()
      })
      .catch(err => reject(err))
  })
)

module.exports = users
