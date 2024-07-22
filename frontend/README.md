# Local Running Guide

## How to run frontend locally:

1. Open terminal at the `frontend` directory.
2. Run the command `npm i` to install all necessary packages.
3. Create a `.env` file in the `frontend` directory with the following content:
    - `REACT_APP_BACKEND_URL=<backend url>` (e.g., `http://localhost:3000`)
4. Create a `.env.local` file to specify the `PORT` for the web to run (to avoid conflicts with the backend).
5. Run the command `npm start` to start the frontend.