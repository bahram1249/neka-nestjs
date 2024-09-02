import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'FactorStatuses' })
export class FactorStatus extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title?: string;
}
