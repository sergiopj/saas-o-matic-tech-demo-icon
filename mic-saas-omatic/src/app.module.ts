import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmSqliteConfig } from './shared/infrastructure/persistence/typeorm.config';
import { CustomersModule } from './modules/customers/customers.module';
import { SimulationsModule } from './modules/simulations/simulations.module';
import { EmailsModule } from './modules/emails/emails.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { AssistantModule } from './modules/assistant/assistant.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseSeederService } from './shared/infrastructure/persistence/database-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmSqliteConfig),
    CustomersModule,
    SimulationsModule,
    EmailsModule,
    InvoicesModule,
    AssistantModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseSeederService],
})
export class AppModule {}

