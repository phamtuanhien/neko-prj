import User from '../../users-module/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
class NftEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, name: 'nft_address' })
  public nftAddress: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ name: 'image_url' })
  public imageUrl: string;

  @ManyToOne(() => User, (owner: User) => owner.id)
  @JoinColumn({ name: 'owner_id' })
  public owner: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}

export default NftEntity;
