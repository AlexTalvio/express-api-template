import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    query += ' ORDER BY id ASC';
    console.log(query)
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
     const query = `
           INSERT INTO ${this.table}(${columns})
           VALUES (${values})
           RETURNING id, ${columns}
       `;
     return this.pool.query(query);
   }

   async deleteWithReturn(id) {
      const query = `
         DELETE FROM ${this.table}
         WHERE ${this.table}.id = ${id}
         RETURNING *
      `;
      return this.pool.query(query);
   }

   async updateWithReturn(columns, values, id){
      var setClause = 'SET '+ columns[0] + ' = \'' + values[0] + '\'' ;
      for (var i = 1; i < columns.length; i++){
         setClause = setClause + ', ' + columns[i] + ' = \'' + values[i] + '\'';
      }

      const query = `
         UPDATE ${this.table}
         ${setClause}
         WHERE ${this.table}.id = ${id}
         RETURNING *
      `;

      return this.pool.query(query)
   }
}
export default Model;
