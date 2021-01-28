# Pictionary App

A Web based Pictionary application using WebSockers and NodeJS.

---

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

  ```bash
  $ sudo apt install nodejs
  $ sudo apt install npm
  ```

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

```bash
$ node --version
v13.3.0
```

```bash
$ npm --version
6.14.8
```

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

```bash
$ npm install npm -g
```

---

## Install

```bash
$ git clone https://github.com/DuyTranTennant/pictionary-app
$ cd pictionary-app
$ npm install
```

## Running the project

```bash
$ npm start
```

## Running in development mode

```bash
$ npm run dev
```

## Deploy to heroku

```bash
git push heroku master
```