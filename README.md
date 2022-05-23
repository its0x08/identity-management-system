# Identity Management System

[![Semgrep](https://github.com/its0x08/identity-management-system/actions/workflows/semgrep.yml/badge.svg)](https://github.com/its0x08/identity-management-system/actions/workflows/semgrep.yml)
[![CodeQL](https://github.com/its0x08/identity-management-system/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/its0x08/identity-management-system/actions/workflows/codeql-analysis.yml)

## Requirements

1. NodeJS (>=v14)
2. MongoDB (Either install locally or using `docker-compose up -d`)

## Features

- ExpressJS backend
- Logging capabilities using winston
- Authentication using bcrypt and JWT
- Simple authorization (normal users and admin users)
- Users can register, login, edit profile and logout
- Admins can do all the above and also modify other users info
- Securely create admins via script
- Rate limiting to prevent DoS and Bruteforce


## Usage

### Build & Run
```
npm run build
npm start
```

### Environment variables
- PORT - Server port
- MONGO_URI - MongoDB connection URI
- COMBINED_LOGFILE - File for combined logs
- ERROR_LOGFILE - File for error logs
- JWT_SECRET_KEY - JWT secret

### Trying endpoints
To try out the endpoints you can install __REST Client__ *VSCode* extension and send request from __rest.http__ file

## Testing
```
npm test
```

Server will be running on [http://localhost:3000/](http://localhost:3000/)
