import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Factor } from './factor.entity';
import { PaymentStatus } from './payment-status.entity';

@Table({ tableName: 'Payments' })
export class Payment extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: bigint;
  @Column({
    type: DataType.STRING,
  })
  crmUserId: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstname?: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastname?: string;
  @Column({
    type: DataType.BIGINT,
  })
  price: bigint;

  @Column({
    type: DataType.BIGINT,
  })
  @ForeignKey(() => Factor)
  factorId: bigint;

  @BelongsTo(() => Factor, { as: 'factor', foreignKey: 'factorId' })
  factor?: Factor;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => PaymentStatus)
  paymentStatusId: number;

  @BelongsTo(() => PaymentStatus, {
    as: 'paymentStatus',
    foreignKey: 'paymentStatusId',
  })
  paymentStatus?: PaymentStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentToken?: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentResult?: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentReciept?: string;
}
