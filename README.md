# Cromwell Tools - Digital Node Test

## Installation

`npm install`
`npm run dev`

## Features

### Pages

- Home page: `/`
- Registration page: `/register`
- Login page: `/login`
- Landing page: `/landing` (inaccessible until logged in)

### REST API

| Name         | Description                                     | Method | Endpoint         |
| ------------ | ----------------------------------------------- | ------ | ---------------- |
| Login        | Logs the user in and sets a token cookie        | POST   | `/user/login`    |
| Registration | Create an account for the user                  | POST   | `/user/register` |
| Logout       | Logs the user out and unsets their token cookie | GET    | `/user/logout`   |
| User         | Retrieves and returns the user's data           | GET    | `/user`          |

### Redux

Redux Toolkit is used to store a slice of state for the "toast" notification. This allows any page or component to activate the toast notification and set its message and variant.

### Database

SQLite is used for the database. The Prisma ORM is used to interface with the database.

Use `npm prisma studio` to view the database.

### Validation

Frontend validation is implemented using HTML form properties such as `required` and `minlength`.

Backend validation is implemented by manually checking the data to ensure it really is valid.

### JWT

JWTs are used to store user data and for authentication.

The secret key used to sign tokens is stored in an environment variable in .env.local (in a real application this file wouldn't be uploaded to GitHub).

JWTs are stored in an HTTP-Only cookie, meaning that client-side scripts cannot access it. This mitigates the risk of XSS attacks.

### Responsive

All pages are fully mobile-friendly.

<img height="400" src="responsive.png">
