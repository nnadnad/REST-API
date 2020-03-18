// Update with your config settings.

module.exports = {

  migrations: {
    directory: __dirname+'/db/migrations'
  },
  seeds: {
    directory: __dirname+'/db/seeds/test'
  },
  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      database: 'Matagi',
      user:     'root@localhost'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URLs,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }

};
