# Sample of Vue, Pinia, Vitest, TypeScript, SCSS, Firestore, Firebase and GitHub CI/CD 

## Introduction

This repository contains the codebase for a sample Vue.js web application developed by [Rodion Shlomo Solomonyk](https://www.linkedin.com/in/rodion-shlomo-solomonyk/). 
The application is built using a combination of modern web development technologies and practices including Vue.js, Pinia, TypeScript, SCSS, Firestore, Firebase, Vitest, and GitHub CI/CD.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
3. [Deployment](#deployment)
4. [Testing](#testing)
5. [Contributing](#contributing)
6. [License](#license)

## Technologies Used

- **Vue.js:** Vue.js is a progressive JavaScript framework for building user interfaces. It is designed from the ground up to be incrementally adoptable.
- **Pinia:** Pinia is a Vue.js state management library providing a straightforward, intuitive, and type-safe API for working with global and modular states in a Vue.js application.
- **TypeScript:** TypeScript is an open-source language that builds on JavaScript by adding static type definitions.
- **SCSS:** SCSS is a CSS extension language adding features like variables, nested rules, and mixins into regular CSS.
- **Firestore:** Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
- **Firebase:** Firebase provides a host of tools and services for developing high-quality apps, grow an engaged user base, and earn more profit.
- **Vitest:** Vitest is a Unit Testing Utility for Vue 3 Single-File Components, built to work hand-in-hand with Vite.
- **GitHub CI/CD:** GitHub provides built-in continuous integration and continuous deployment capabilities with GitHub Actions, enabling automated testing and deployment.

## Project Setup

To get started with this project, follow the steps below:

1. Clone this repository:
    ```
    git clone https://github.com/coddicat/i-m-looking-for-a-job.git
    ```

2. Change into the project directory:
    ```
    cd i-m-looking-for-a-job
    ```
3. Install the project dependencies:
    ```
    npm install
    ```
4. Copy your Firebase Config into src\firebase\config.env.json
    ```
    {
        "apiKey": "",
        "authDomain": "",
        "projectId": "",
        "storageBucket": "",
        "messagingSenderId": "",
        "appId": "",
        "measurementId": ""
    }
    ```
6. Start the local development server:
    ```
    npm run dev
    ```

## Deployment

The project uses GitHub CI/CD for deployment. A workflow file is available in the `.github/workflows` directory which deploys the application to Firebase Hosting on every push to the `main` branch.

Before deploying, ensure you have set up the following secrets in your GitHub repository:

- `FIREBASE_SERVICE_ACCOUNT_I_M_LOOKING_FOR_A_JOB`: The token generated from your Firebase project.
- `FIREBASE_CONFIG`: The Firebase Config of your project.

To deploy manually, run `npm run build` to build the application for production and then `firebase deploy` to deploy to Firebase Hosting.

## Testing

The project uses Vitest for unit tests. To run the tests, use the following command:

```
npm run test:unit
```

## Contributing

If you wish to contribute to this project, kindly follow the steps below:

1. Fork this repository.
2. Clone your forked repository.
3. Create a new branch with a descriptive name about the feature you will add.
4. Make your changes and commit them with a concise and descriptive commit message.
5. Push your changes to your fork.
6. Open a pull request against this repository.

Remember to follow the provided code style and ensure that your changes pass the existing tests and lint checks.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
