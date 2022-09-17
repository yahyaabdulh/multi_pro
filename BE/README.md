# Intruksi

#Install dependensi
```sh
cd MultiPro/BE
yarn
```
#ubah/ tambahkan .env
```sh
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sia_SOFT!2020
DB_DIALECT=postgres
DB_NAME_DEVELOPMENT=jobs
DB_NAME_TEST=jobs
DB_NAME_PRODUCTION=jobs
JWTKEY=SIA2021hamid
TOKEN_EXPIRATION=30 days
PORT=5000
```
#Jalankan Docker dan Container
_*nb : jika tidak ada database postgres di local_
```sh
open docker desktop
cd MultiPro/BE
docker-compose up -d
```

#Open DBMS menggunakan adminer docker
_*nb : jika tidak ada DBMS postgres di local_
```sh
browse di http:localhost:8080
```

#Create database 
```sh
open sql command
create database jobs;
```

#menjalankan Migration
```sh
npx sequelize db:migrate
```

#menjalankan Seeder
_*nb : mengambil data dari API dan membuat user default_
```sh
npx sequelize db:seed:all
```
#menjalankan BE
```sh
yarn start
or
npm start
```

