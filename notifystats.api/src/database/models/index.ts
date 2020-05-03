import { pool } from '../index';


export const INIT_TABLES = () => {
  const query = `
  create table table_name
(
	id bigint,
	subs int,
	posts int,
	created_at int
);`
}