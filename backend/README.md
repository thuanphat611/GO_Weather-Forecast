# Local Running Guide

## How to run backend locally:

1. Open terminal at the `backend` directory.
2. Run the command `npm i` to install all necessary packages.
3. Create a `.env` file in the `backend` directory with the following content:
    - `PORT=<port for NodeJS to run on>`
    - `FRONTEND_URL=<frontend url>` (e.g., `localhost:4000`)
    - `DATABASE_URI=<MongoDB connection string, used to connect to a MongoDB cluster on MongoDB Atlas or local>`
    - `WEATHER_API_KEY=<weatherapi.com API key>`
    - `MAILER_EMAIL=<email address that will send confirmation emails to verify subscription/unsubscription requests>` (Backend uses Nodemailer to send emails)
    - `MAILER_PASSWORD=<app password for the above email>` (how to create an app password can be found [here](https://support.google.com/accounts/answer/185833))
    - `EMAIL_HOST=smtp.gmail.com`
    - `EMAIL_PORT=587`
4. Run the command `npm run dev` to start the backend with nodemon.