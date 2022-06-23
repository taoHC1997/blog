import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SvgModule } from './image/svg/svg.module';

@Module({
  imports: [SvgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
