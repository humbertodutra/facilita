const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associando o Customer com CustomerLocation
      Customer.hasOne(models.CustomerLocation, { foreignKey: 'customer_id', as: 'location' });





    }
  }
  Customer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers', 
    timestamps: false
  });
  return Customer;
};
