<h1>Compugraf's intership technical test</h1>

The test consists of developing a application for the register of persons, in the application it should be possible to search, update, delete and create (CRUD) these registers. <br> <br>
Those people should have the labels "Name", "Surname", "Nationality", "ZIP code", "CPF"(Only for id, hidden normally) (CPF is akin to Social Security number), "Address", "Estate", "City", "e-mail", "phone-number". <br> <br>
Also the application should be function by consuming an API and creating an endpoint in the format RESTful. <br> <br>
The technologies used are up for the participant to decide *(used in this project: React with Next.js and MongoDB, CSS done with Tailwind)*

To run the application in your desktop, make sure to add a .env file to the root of the project with a URI variable connecting to your mongoDB with a collection named "Register". The URI is "mongodb+srv://<username>:<password>@cluster0.19hld.mongodb.net/<database>?retryWrites=true&w=majority".
Then, run "yarn run dev" to start the developer build, or "yarn rund build" followed by "yarn run start" for production build.
