#  Handraiser Project
# Getting Started
1. Clone this repository
2. Run `docker-compose up db` as initial setup for the backend.
3. Next, execute `npm run migrate up` to setup the database.
4. Run `npm run dev` in the root folder to start the react-app.
## Prerequisites
   - Web Browser
   - Terminal
   - Internet
## Project Functionalities
 - STUDENT
    * Can register to a predefined class given that the class is still open for registration
    * Can ask assistance from a particular mentor given and present to each class
    * Can supplement additional context to a given concern by utilizing the chat functionality
 - MENTOR
    * Can register a class provided with its subject and initial description
    * Can supply codes to expected students that will attend a certain class
    * Can respond to a certain concern request, or deliberately closed a given one
 - SUPERADMIN - Manages mentor keys and monitor users
    * Register a mentor by supplying him/her a code for verification
    * Monitors current status of students, mentors and active classes
## Built With
- Material UI
- Axios
- React
- Socket.IO
- Node JS
## Members
- Christian Frecia
- Jeffrey Molleno
- Lyza Mirabete
- Jaymard Menor
- Jerommel Astillero
- Hamlet De Los Reyes
## Acknowledgements
- [Material UI]([https://material-ui.com/](https://material-ui.com/))
- [Node JS](https://nodejs.org/en/)
- [Socket IO](https://socket.io/)
- [PostgreSQL]([https://www.postgresql.org/](https://www.postgresql.org/))
