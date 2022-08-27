## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project][https://tfsg.code4.ro/en]. If you want to make any change to this repository, please **make a fork first**.

If you new to opensource development, you can check out this [guide][https://opensource.guide/how-to-contribute/] to learn all about contributing to open source projects.

If you would like to suggest new functionality, open an Issue and mark it as a __[Feature request]__. Please be specific about why you think this functionality will be of use. If you can, please include some visual description of what you would like the UI to look like, if you are suggesting new UI elements.

## Built With
This project is built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/).

## Local Development

*Note for Windows users:* If you are using Windows, please use [WSL](https://www.microsoft.com/en-us/windows/wsl/) to follow the instructions below. The instructions below consider that you are on a *nix type environment.

### Clone the repo

To get started , you will first have to clone the repo.

```bash
git clone https://github.com/code4romania/war-support-sprijin-de-urgenta-client
cd war-support-sprijin-de-urgenta-client
```
### Install dependencies

You can use any node package manager you prefer to install the dependencies (npm, yarn, pnpm, etc.)

- If you use npm please paste the command below in your terminal:

```bash
npm install
```
- If you use yarn please paste the command below in your terminal:

```bash
yarn install
```

- If you use pnpm please paste the command below in your terminal:

```bash
pnpm install
```
### Build the Project

- If you use npm please paste the command below in your terminal:

```bash
npm run build
```
- If you use yarn please paste the command below in your terminal:

```bash
yarn build
```

- If you use pnpm please paste the command below in your terminal:

```bash
pnpm run build
```

### Utility Scripts

#### i18n (Internationalization)
To generate the translation files you will need to run the following command:

```bash
npm run generate-translations-sheet
npm run translate
```
#### Visualize frontend components
We use [storybook](https://storybook.js.org/) to visualize the components.

```bash
npm run storybook
```
#### Testing
To run the E2E tests you will need to run the following command:

```bash
npm run e2e
```