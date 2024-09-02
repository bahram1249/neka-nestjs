import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'PaymentStatuses' })
export class PaymentStatus extends Model {
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
