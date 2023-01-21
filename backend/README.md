# Tripful (Backend)

This repository contains the source code for the backend of the Tripful web application.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/)

### Installation

1. Clone this repository.
    ```bash
    git clone https://github.com/ethanratnofsky/Tripful.git
    ```
2. Navigate to the project directory.
    ```bash
    cd Tripful/backend
    ```
3. Create a `.env` file in the project directory.
    ```bash
    touch .env
    ```
4. Add the following environment variables to the `.env` file.
    ```
    MONGODB_URI=<your MongoDB URI>
    ```
5. Uncomment the following line in the `config/mongodb.js` file.
    ```javascript
    // mongoose.connect(process.env.MONGODB_URI);
    ```
3. Install the Node dependencies.
    ```bash
    npm install
    ```
4. Start the development server.
    ```bash
    npm start
    ```
5. Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
6. Navigate to [http://localhost:3000/example](http://localhost:3000/example) to test the `example` router.

## File Structure

-   `app.js` - The entry point for the application.
-   `config/` - Configuration files.
    -   `mongodb.js` - Configuration for MongoDB.
-   `controllers/` - Controller files.
-   `models/` - Mongoose model files.
-   `routes/` - Route files.

## Development Notes

### Prettier Formatting

To format your code with the Prettier formatter, run the following command:

```bash
npm run format
```

Prettier formatting configurations are stored in the `.prettierrc` file.
