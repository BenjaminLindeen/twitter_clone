# Twitter Clone

[![My Skills](https://skillicons.dev/icons?i=twitter,express,nodejs,javascript,pug,html,css,mysql)](https://skillicons.dev)

## Introduction

This project is a clone of Twitter, built using Express.js, Node.js, JavaScript, Pug, CSS, and MySQL. It's a simple web
application where users can post tweets, view recent tweets, and sort them based on popularity.

## Features

- **Home Page**: Provides information about the website.
- **Post Tweet Page**: Allows users to post tweets with a maximum character length of 14.
- **Recent Tweets Page**: Displays the five most recent or most liked tweets per page. 
- **Sitewite darkmode**: Users can toggle between light and dark mode.

## Setup

- Before starting, ensure you have Node.js installed on your machine. If not, you can download
  it [here](https://nodejs.org/en/download/).
- You will also need to have access to MySQL, this project is centered around using it remotely via SSH. You can
  alternatively download it [here](https://dev.mysql.com/downloads/mysql/).

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following commands to set up the environment:
    ```bash
    npm install
    npm init -y
    npm install express
    npm install express pug
    npm install mysql-await
    ```
4. Set up the MySQL database using the provided `schema.sql` file.
5. Create a tunnel to the MySQL server using the following command:
    ```bash
    ssh -L 3306:cse-mysql-classes-01.cse.umn.edu:3306 <umnx500>@csel-remote-lnx-01.cselabs.umn.edu
    ```

## Running the Application

1. Start your MySQL server.
2. Open the terminal in your project directory.
3. Run `node server.js` to start the server.
4. Access the application through `http://localhost:4131/` in your browser.

## Testing

- To test the functionality, navigate through the various pages and try posting a tweet, viewing recent tweets, and
  sorting them.

## Additional Information

- The application runs on port 4131.
- For database configuration, modify `database.js` as per your MySQL setup.
