import Model from '../models/model';

const itemsModel = new Model('items');

export const itemsPage = async (req, res) => {
   var clause = null;
   if (req.params.id) {
      var id = req.params.id;
      clause = " WHERE items.id = " + id
   }
   console.log(clause);
   try {
      const data = await itemsModel.select('name, price, id', clause);
      res.status(200).json({ items: data.rows });
   } catch (err) {
      res.status(200).json({ items: err.stack });
   }
};

export const addItem = async (req, res) => {
   const { name, price } = req.body;
   var columns = 'name, price';
   var values = `'${name}', '${price}'`;
   if(req.body.id){
      const id = req.body.id;
      columns = columns.concat(', id');
      values = values.concat(`, '${id}'`);
   }
   try {
      const data = await itemsModel.insertWithReturn(columns, values);
      res.status(200).json({ items: data.rows });
   } catch (err) {
      res.status(200).json({ items: err.stack });
   }
};

export const deleteItem = async (req, res) => {
   const id = req.params.id;
   try {
      const data = await itemsModel.deleteWithReturn(id);
      res.status(200).json({ items: data.rows });
   } catch (err) {
      res.status(200).json({ items: err.stack });
   }
};

export const updateItem = async (req, res) => {
   var obj = req.body;
   var columns = [];
   var values = [];
   const id = req.params.id;
   for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
         var val = obj[key];
         columns.push(key)
         values.push(val)
      }
   }
   try {
      const data = await itemsModel.updateWithReturn(columns, values, id);
      res.status(200).json({ items: data.rows });
   } catch (err) {
      res.status(200).json({ items: err.stack });
   }
};
