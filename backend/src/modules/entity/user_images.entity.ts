import {
  Column,
  CreateDateColumn, DeleteDateColumn, Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user_images')
export class UserImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;


  @DeleteDateColumn({ select: false })
  public deleted_at: Date;
}
