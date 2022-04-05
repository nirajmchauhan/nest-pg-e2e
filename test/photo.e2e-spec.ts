import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataType, newDb } from 'pg-mem';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmConnectionFactory } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Photo } from '../src/photo/photo.entity';

describe('PhotoController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Photo>;

  beforeAll(async () => {
    const db = newDb();
    // Register current_database function
    db.public.registerFunction({
      name: 'current_database',
      args: [],
      returns: DataType.text,
      implementation: (x) => `hello world ${x}`,
    });

    // Get PG in memory DB connection
    const connection = (await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [Photo],
      synchronize: true,
    })) as TypeOrmConnectionFactory;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Connection)
      .useValue(connection)
      .compile();

    app = moduleFixture.createNestApplication();
    repository = moduleFixture.get(getRepositoryToken(Photo));

    await app.init();
  });

  afterEach(async () => {
    await repository.query('DELETE from photo;');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/photo').expect(200).expect([]);
  });
});
