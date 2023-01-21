# Tripful (Frontend)

This repository contains the source code for the frontend of the Tripful web application.

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
    cd Tripful/frontend
    ```
3. Install the Node dependencies.
    ```bash
    npm install
    ```
4. Start the development server.
    ```bash
    npm start
    ```
5. Navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Development Notes

### Prettier Formatting

To format your code with the Prettier formatter, run the following command:

```bash
npm run format
```

Prettier formatting configurations are stored in the `.prettierrc` file.

### Custom Favicon

1. Navigate to [https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/).
2. Upload your desired image.
3. Download the generated favicon.
4. Extract the contents of the downloaded archive.
5. Copy (and replace) the contents of the `favicon` directory to the `public` directory in your project.
