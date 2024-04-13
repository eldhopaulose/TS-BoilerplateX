# TS-BoilerplateX

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

TS-BoilerplateX is a meticulously crafted boilerplate tailored for developers seeking a seamless starting point for building powerful web applications with TypeScript and Express.js. With TS-BoilerplateX, harness the combined benefits of TypeScript's static typing and Express.js' flexibility to expedite your development process while ensuring code integrity and maintainability.

## Features

- TypeScript support
- Express.js integration
- ESLint for code linting
- Example controllers and routes
- Comprehensive documentation
- EditorConfig for consistent coding style

## Installation

To quickly create an application skeleton, you can utilize the TS-BoilerplateX tool. You can run the application generator using the npx command.

```bash
npx ts-boilerplatex

```

To install TS-BoilerplateX, you can use npm:

```bash
npm install ts-boilerplatex

```

- `dev`: Start the development server with nodemon.
- `start`: Start the application using ts-node to execute src/main.ts.
- `lint`: Run ESLint to lint source files in the src/ directory.
- `docs`: Generate documentation using Typedoc from src/main.ts.
- `build`: Compile TypeScript files using the TypeScript compiler (tsc) based on the tsconfig.json configuration.
- `build-all`: Clean the build directory, then run build, esbuild-node, and esbuild-browser scripts.
- `clean`: Remove build artifacts and generated documentation.

# Project Structure

The project structure is organized as follows:

```bash
TS-BoilerplateX/
|-- bin/
|   -- server.ts
|-- controller/
|   -- indexController.ts
|-- routes/
|   -- index.ts
|-- README.md
|-- package.json
|-- tsconfig.json
`-- ...
```

- bin/: Contains the server configuration.
- controller/: Contains controller functions to handle route logic.
- routes/: Contains route definitions.

# Middleware

- Morgan

  Morgan middleware is used for logging HTTP requests. It's configured to log requests in the "dev" format.

- bodyParser

  bodyParser middleware is used to parse incoming JSON and URL-encoded requests. It's configured to handle JSON and URL-encoded requests with extended mode enabled.

- compression

  compression middleware compresses HTTP responses before sending them to the client.

- cookieParser

  cookieParser middleware is used to parse cookies attached to incoming requests.

# Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

Licensed under the Apache-2.0. See the [LICENSE](https://github.com/eldhopaulose/TS-BoilerplateX/blob/main/LICENSE) file for details.
