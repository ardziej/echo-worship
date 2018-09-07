# ECHO Worship v0.1


## Installation

```bash
npm install
```
## Running

node.js server
```bash
npm run start
```

WebSockets server

```bash
npm run ws
```

Default admin URL 
```
http://localhost:50780/master
```

Default presentation URL
```
http://localhost:50780
```

### Config file - ENV
If you wanted to change IP or PORT for app. It's very easy with .env

```bash
cp .env.dist .env
```

Then change values in .env file (remember to reload app)
### Node as Windows services

https://github.com/coreybutler/node-windows
