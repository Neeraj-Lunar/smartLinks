import { Module } from '@nestjs/common';
import databaseConfig  from './database/config/database.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CONNECTION_NAME } from './config/constants';
import { HomeModule } from './home/home.module';
import { DatabaseConfig } from './database/config/database-config.type';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';
import { TemplateModule } from './templates/templates.module';
import { ApplicationModule } from './application/application.module';
import { LinkModule } from './links/links.module';
import { ProjectModule } from './projects/projects.module';
import { DomainModule } from './domains/domains.module';


const infrastructureDatabaseModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
? MongooseModule.forRootAsync({
    useClass: MongooseConfigService,
    connectionName: CONNECTION_NAME,
  })
: TypeOrmModule.forRootAsync({
    name: CONNECTION_NAME,
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      return new DataSource(options).initialize();
    },
  });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [
        databaseConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    HomeModule,
    ProjectModule,
    DomainModule,
    ApplicationModule,
    TemplateModule,
    LinkModule
  ],
})

export class AppModule {}