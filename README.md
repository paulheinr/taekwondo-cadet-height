# TKD Cadet Height

## Init Database

Copy SQLite3 Database file named `cadets.db` to `./api`. Table `Fighter` must contain fields

* number (PK)
* lastname
* club
* (tournamendUid)
* height
* lastUpdate

## Dev mode

Start frontend:

```shell
cd my-app
npm install 
npm run serve
```

Start backend:

```shell
cd api
npm install
npm run dev
```

## Production with Docker

Build docker container:

```shell
docker build -t tkd-cadet-heights .
docker run -d -p 3070:3070 tkd-cadet-heights
```

Copy database to local file `backup.db`:

```shell
docker cp <container-id>:/root/cadets.db ./backup.db
```