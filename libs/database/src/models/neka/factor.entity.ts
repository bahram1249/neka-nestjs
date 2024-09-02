import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { FactorStatus } from './factor-status.entity';

@Table({ tableName: 'Factors' })
export class Factor extends Model {
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
    type: DataType.STRING,
  })
  terminalSim: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deltasibUserId?: string;
  @Column({
    type: DataType.BIGINT,
  })
  price: bigint;
  @Column({
    type: DataType.STRING,
  })
  deltasibServiceId: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deltasibServiceName?: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deltasibServiceDescription?: string;
  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => FactorStatus)
  factorStatusId: number;

  @BelongsTo(() => FactorStatus, {
    as: 'factorStatus',
    foreignKey: 'factorStatusId',
  })
  factorStatus?: FactorStatus;
}
