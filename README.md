## Akhenaten security
#### Time for changing the world

Visit this [link](https://security-monitoring-orpin.vercel.app/dashboard) to see the live version of the app.

## Screen Shots
### Desktop
![Alt text](screenshots/desktop-dark.png)
![Alt text](screenshots/desktop-light.png)
![Alt text](screenshots/desktop-error.png)

### Mobile
![Alt text](screenshots/mobile/2.png)
![Alt text](screenshots/mobile/3.png)
![Alt text](screenshots/mobile/4.png)
![Alt text](screenshots/mobile/1.png)

#### Error message
![Alt text](screenshots/mobile/5.png)

## Installation and Setup Instructions

[Backend](https://github.com/mivashchenko/express-openai-app/tree/security-dashboard) - setup the backend

Once the backend server is running please follow the instructions below:

`git clone https://github.com/mivashchenko/security-monitoring.git`

`pnpm install`

`pnpm run start`  

Once the server is running, visit:

`localhost:3000/dashboard`

# Project details

## Charts
The dashboard features two key charts:
- Severity Chart – Displays the severity levels of vulnerabilities based on real-time data.
- Severity Trend Chart – Tracks severity trends using mock data.

## Dashboard cards
Two summary cards provide key insights:
- total messages
- potential violations

## Messages table

### Toolbar
- Search messages
- Filter messages
- Toggle column visibility

### Table Functionality
- Displays all messages
- Efficient handling of large datasets
- Real-time updates

All the messages are filtered/sorted on the client side. The messages are fetched from the server and then filtered/sorted on the client side. The messages are updated in real-time using web sockets.

## Development Challenges & Solutions
The messages table was one of the most interesting yet challenging parts of the project. Initially, I considered using data virtualization, but I ultimately opted for pagination due to memory issues with real-time updates.
 
The pagination pattern is a good solution for the table with a large amount of data. It allows you to load only a small part of the data at a time.
But the backend should be able to provide the data for the table. In current implementation the backend provides the data for the table by running json-server. I just fetch the first 100 messages and then use web sockets to get a new data.
Ideally the backend should provide the data for the table by running a query to the database, after the new data processed by LLM and put into DB, and then send the data to the frontend through sockets as an option. But I didn't have time to implement this.
So I just use json-server to simulate the backend and sockets to get the new data by sending messages content to OpenAi.

One idea to enhance user experience is to pause WebSocket updates when the user is navigating through different pages of the table or selecting a row. Instead, the table could display a “Refresh Data” button to allow users to resume real-time updates. This would require a more structured architecture and additional development time.

## Other features

The project shows error messages in the snackbar, has a dark mode, and a responsive design.

## LLM part
I've create a openai assistant that can help with messages analyzing. It's not perfect, but it's a good start. For some reason it does make mistakes. I need to play with the functions calling more to understand how it works.
Basically I ask GPT to analyze a message and call a function with a single parameter "violationType". the function does nothing but i use the parameter to understand what kind of violation it is.