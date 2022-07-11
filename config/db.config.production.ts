export default {
  connection: {
    attempts: 1,
  },
  database: 'core_production',
  hostname: '0.0.0.0',
  host_type: 'tcp',
  password: 'postgrespw',
  options: {
    max_index_keys: '32',
  },
  port: 5432,
  user: 'postgres',
  tls: {
    enforce: true,
  },
};
