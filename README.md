# Reproduction Repo for 'ReferenceError: WebSocket is not defined' error

## Abstract

This repo contains the code for reproducing the error `ReferenceError: WebSocket is not defined`.
This error occurs, when using Angular Universal for SSR (Server-Side Rendering) along with RxJs websockets.

## Build instructions

In order to reproduce the error, follow these steps:

```
# install dependencies
npm install

# build angular bundles for browser and server platforms
npm run build:client-and-server-bundles

# build the webserver
npm run webpack:server

# start the webserver
npm run serve:ssr

# the app is now being served at http://localhost:8081/
# open it in the browser and the error will occur: 'ReferenceError: WebSocket is not defined'
```

# Additional info

I'm aware of https://github.com/ReactiveX/rxjs/issues/3692, which is why I tried more recent versions but it didn't fix the issue.
