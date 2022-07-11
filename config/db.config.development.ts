export default {
  connection: {
    attempts: 3,
  },
  database: 'core_development',
  hostname: '0.0.0.0',
  host_type: 'tcp',
  password: 'postgrespw',
  options: {
    max_index_keys: '32',
  },
  port: 5432,
  user: 'postgres',
  tls: {
    enforce: false,
  },
};
