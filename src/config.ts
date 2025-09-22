export default () => ({
  database: {
    type: 'postgres' as const,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'tasksdb',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/src/migrations/*.js'],
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
  },
});