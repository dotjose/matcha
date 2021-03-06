const tableExists = require('../utils/tableExists')
const query = require('../utils/query')
const { isEmpty } = require('../../../src/utils')

const auth = database => (
  new Promise((resolve, reject) => {
    tableExists(database, 'auth')
      .then((res) => {
        if (res === false) {
          return query(
            database,
            'CREATE TABLE `auth` '
            + '( '
            + '  `id` INT NOT NULL AUTO_INCREMENT , '
            + '  `user_id` INT NOT NULL , '
            + '  `client_id` VARCHAR(255) NOT NULL , '
            + '  `client_secret` VARCHAR(255) NOT NULL , '
            + '  PRIMARY KEY (`id`)'
            + ') '
            + 'ENGINE = InnoDB;'
          )
        }
        throw new Error('[mysql] auth table already exists')
      })
      .then((res) => {
        if (!isEmpty(res)) console.log('[mysql] auth table has been created')
        resolve()
      })
      .catch(err => reject(err))
  })
)

module.exports = auth
