const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associando o CustomerLocation com Customer
      CustomerLocation.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });


    }
  }
  CustomerLocation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer', // Garanta que isto corresponde ao nome do modelo definido para 'Customer'
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    x: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    y: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CustomerLocation',
    tableName: 'customer_locations', // Certifique-se de que isto corresponde ao nome real da tabela no banco de dados
    timestamps: false
  });
  return CustomerLocation;
};
