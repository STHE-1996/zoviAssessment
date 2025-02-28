Before you begin, make sure you have the following installed on your machine:

Node.js (version 14.x or above) – Download here
npm (Node Package Manager) – Installed automatically with Node.js
Angular CLI – Install globally using the following command:
bash
Copy
npm install -g @angular/cli
Getting Started
Follow these steps to run the Angular application locally:

1. Clone the Repository
Clone this repository to your local machine using Git:

bash
Copy
git clone <repository-url>
Or download the ZIP and extract it.

2. Install Dependencies
Navigate to the project directory and install the necessary dependencies:

bash
Copy
cd ZoviAssessment
npm install
3. Run the Development Server
Once the dependencies are installed, start the development server by running:

bash
Copy
ng serve
This will start the Angular development server, and you can view the app in your browser at:

arduino
Copy
http://localhost:4200
The application will automatically reload if you change any source files.

Available Commands
Code Scaffolding
To generate components, directives, services, or other Angular entities, use the following command:

bash
Copy
ng generate <entity-type> <entity-name>
For example, to generate a new component:

bash
Copy
ng generate component component-name
You can replace <entity-type> with one of the following to generate:

component
directive
pipe
service
class
guard
interface
enum
module
Build the Project
To build the project for production, use:

bash
Copy
ng build --prod
The build artifacts will be stored in the dist/ directory.

Run Unit Tests
To run the unit tests using Karma, execute the following command:

bash
Copy
ng test
This will launch the Karma test runner and execute all unit tests in the project.

Run End-to-End Tests
To run end-to-end tests (e2e), execute the following command:

bash
Copy
ng e2e
To use this command, you may need to set up an end-to-end testing framework. The default end-to-end testing setup uses Protractor, but other tools can be configured.

Further Help
To get more help on the Angular CLI, run:

bash
Copy
ng help
You can also visit the Angular CLI Overview and Command Reference page for more information.

