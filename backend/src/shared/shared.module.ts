import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserImages } from 'src/modules/entity/user_images.entity';
import { Services } from './services';



const Entity = [
  UserImages,

];

@Module({
  imports: [TypeOrmModule.forFeature(Entity)],
  exports: [...Services, TypeOrmModule.forFeature(Entity)],
  providers: [...Services],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [...Services],
    };
  }
}
