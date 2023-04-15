# TKD Cadet Height

## Dev mode

Start frontend:

```shell
cd my-app
npm run serve
```

Start backend:

```shell
cd api
npm run dev
```

## Production with Docker

Build docker container:

```shell
docker build -t tkd-cadet-heights .
docker run -d -p 3070:3070 tkd-cadet-heights
```