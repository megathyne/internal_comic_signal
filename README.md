# internal_comic_signal

## SETUP LOCAL DEVELOPMENT

Create a .env file in the root directory with the following variables

### Client

```
CLIENT_SERVER_PORT=3001
CLIENT_NEW_SERVER_PORT=3004
```

### API

```
API_SERVER_PORT=3000
API_DB_PASSWORD=postgres
API_DB_PORT=5432
API_DB_USERNAME=postgres
API_DB_DATABASE_NAME=dev
```

### Ebay-API

```
EBAY_API_SERVER_PORT=3003
EBAY_API_APPID
EBAY_DB_PASSWORD=postgres
EBAY_DB_PORT=5433
EBAY_DB_USERNAME=postgres
EBAY_DB_DATABASE_NAME=dev
EBAY_API_MIGRATION_PORT=3005
```

### AWS

```
AWS_S3_BUCKET_NAME=foo
AWS_ACCESS_KEY_ID=foo
AWS_SECRET_ACCESS_KEY=foo
```

### PG Admin

```
PG_ADMIN_SERVER_PORT=3002
PGADMIN_USERNAME=ceej989@email.com
PGADMIN_PASSWORD=postgres123
```

## SEED DATA (API-DATABASE)
From ```/utilities/src```
Run ```node index.js > index.txt```
Copy files from txt and run in sql for api-database


### GCD 

```
GCD_DB_PASSWORD=postgres
GCD_DB_PORT=3306
GCD_DB_USERNAME=postgres
GCD_DB_DATABASE_NAME=gcddev
GCD_DB_ROOT=password
GCD_API_SERVER_PORT=3007
```
Download GCD data (need a login)
https://www.comics.org/download/
Save to folder at top level called 'gcdb'
Start the GCD container
At this point the data will get copied
Wait as this takes time!
