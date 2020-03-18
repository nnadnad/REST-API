
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(()=> {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          Name: "Yudy Valentino", 
          ID: '3173081402990001',
          Birhtday:'1999-02-14 00:00:00'
        },
        {
          Name: "Valentino", 
          ID: '3173081402990002',
          Birhtday:'1999-02-14 00:00:00'
        },
        {
          Name: "Karin", 
          ID: '3173081402990333',
          Birhtday:'1998-12-22 00:00:00'
        },
      ]);
    });
};
