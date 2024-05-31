# Fresh Test App

Interview project of Renan Alves.

Bootstrapped with `create-t3-app` and using:
- [Next.js v14](https://nextjs.org)
- [React](https://react.dev)
- [MUI](https://mui.com/material-ui)


## Requirements

Application should contain 2 screens to login and display account details.

**Login Screen**<br>
Login screen should contain email and password text inputs and login button.
On login button click the inputs should be validated according to the rules below:
- email - required, matches email pattern
- password - required

Please use the login GraphQL mutation with provided credentials and please don’t forget about handling backend errors in case of wrong email / password provided. Successful login should lead to the Account screen.

**Account Screen**<br>
Account screen should contain 2 non-editable text fields displaying logged-in user first name and last name and logout button. Please use user GraphQL query to get user’s firstName and lastName data.
Clicking the logout button should logout the user and switch the application to the login screen.


## My choises

I choose to use Next.js v14 because of it's powerfull set of features, like App Router, and also because it supports the new React Server Components and React Server Actions.<br>
Combined with Reac Hook Form and Zod, make them an incredible stack.

Some more explanations:
- middleware.ts from Next.js runs on every request and is protecting the /profile route, allowing only logged users
- use mostly React Server Components
- ApolloClient is the most famous but still has experimental support for RSC


## How to test on your machine?

Please clone this repository and run the folloing commands:

`npm install`<br>
`cp .env.example .env`<br>
`npm run build`<br>
`npm run start`
