# Schedule.friends 
**Description** 

Schedule.friends is a mobile app that helps you know when your friends are free on an easy to view interface. Aimed towards students, we hope to clear out some of the hassle of coordinating meetups when everyone has a different schedule.

## Navigation
* [Before Setup](#before-setup)
* [First Time Frontend Setup](#first-time-frontend-setup)
	* [Environment Setup](#environment-setup)
	* [Dependencies](#installing-frontend-dependencies)
* [First Time Backend Setup](#first-time-backend-setup)
* [Running The Application](#running)

## Before Setup
1. Note that we will be using the terminal on Mac/Linux and Powershell on Windows. 
2. Clone the repository using Git or download the repository zip file. 
###
	git clone https://github.com/Alyssa-Ma/Schedule.friends.git
[Back to top](#navigation)
## First Time Frontend Setup

### Environment Setup
1. If you do not have Node.js installed, install the LTS version. 

	https://nodejs.org/en/
	
1. Go to the link below to set up the environment. 

	https://reactnative.dev/docs/environment-setup
3. Choose `React Native CLI Quickstart`
4. Choose your OS and Android as the target OS.
5. Follow all steps in the `Installing dependencies` section.
6. Follow all steps in the `Android development environment` section.
7. Skip the `Creating a new application` section.
8. Follow all steps in the `Preparing the Android device` section for either a physical or virtual device. 

### Installing Frontend Dependencies
1. Navigate into the frontend folder inside the repository using your terminal of choice.
###
	cd .\frontend\
2. Your terminal should have \Schedule.friends\frontend as the path now. Now we need to install the dependencies.
###
	npm install
3. We also need a .env file in the frontend to connect to the backend. Create a file in the frontend file named `.env` Edit the file, paste and save the following:
###
	BASE_URL=http://10.0.2.2:8000/api/sf_users
***Congratulations you are now done setting up the frontend!***

To run with an Android Studio virtual device: 

**Frontend**  
First, navigate to the 'frontend' folder.
1. Open a terminal in the frontend terminal
`npx react-native start`

2. Open another terminal in the frontend terminal
`npx react-native run-android`

**Backend**  
Setting Up Django Backend
If you don’t have python, version 3 or up installed, you’ll need to set that up first. Installation will vary based on your OS/terminal. For windows users, make sure you can use python in your command line terminal as a PATH variable.

NOTE: It’s very likely you have it installed. Typically you can check by going into your terminal and typing `python --version`. Could also be `python3 --version`. Otherwise, google how to check if you do.

After that, if you don’t have postgresql installed, you’ll need to do that, and it will vary based on what OS/environment you want to use. It’s less likely you have this installed already, but may be good to check, especially if you’ve done other projects in the past.

https://www.postgresql.org/download/

When you install and start your postgreSQL service, make note of the port number,  we will need this later when we set up our dotenv file.

After that’s done, you’ll need to create your database manually, which requires going into postgresql shell. After you do that, you can follow step 1 of these instructions (ignore the rest).

https://www.section.io/engineering-education/django-app-using-postgresql-database/

REMEMBER: All commands must end with a semicolon.

NOTE: I personally didn’t do this command:
ALTER ROLE <yourname> SET default_transaction_isolation TO 'read committed';
Because I didn’t understand what it did. ¯\\_(ツ)_/¯

Be sure to remember the following things when you create your database for later:
Name of database
Name of user with permissions created
Password of the user

Once the database is set up, we need to create our python environment. After starter-backend has merged with main, pull from main. Then navigate in your terminal to `/Schedule.friends/backend`

From there, create your virtual environment by typing
`python -m venv venv`
(you may need to type python3 depending on your setup).
	
Then you need to activate it by inputting 
 `. venv/bin/activate`

If you are using powershell/windows, the command will be
`.\venv\Scripts\activate`
	
You’ll know it works when there’s a (venv) in the start of your terminal path. To get out of your env, just type deactivate
While your virtual environment is still activated, you will install all the dependencies needed for the django app to run. Type:
`pip install -r requirements.txt`
NOTE: if you use python3 as your command instead of python, you will use pip3 instead of pip.

Congrats! You’re almost done with setting up the backend. Now we need to create an dotenv file. In the same directory (/Schedule.friends/backend), create a file named .env (exactly as it is written). Open the file in any plain text editor and put in the following variables:

	SECRET_KEY_DJANGO='django-insecure-wa=kucz290j!8wnr8k5$aezj2woc$xu@^qz5m=d%6nx!9k_vt2'
	NAME_PSQL=<Name of database you created in step 4>
	USER_PSQL=<Name of user you created in step 4>
	PASSWORD_PSQL=<Password of user you created in step 4>
	HOST_PSQL=localhost
	PORT_PSQL=<Port your PostgreSQL service runs on>

Save the file.

You then need to run migrations to configure your postgresql database to work with the model schema we’ve created. Navigate into `/Schedule.friends/backend/sf_api` and type the following:

`python manage.py migrate`

At this point you should be able to run the backend. Navigate into /Schedule.friends/backend/sf_api and type the following command:

`python manage.py runserver`

If all works, django will run without any errors. You can test to see if the database is working as intended by typing http://127.0.0.1:8000/api/sf_users/ into your web browser.
	
Try adding to the database by inserting into the post field:

	{
		“first_name”: “John”,
		“last_name”: “Doe”,
		“email” : “hello@home.com”,
		“password”: “password”
  	}
  
After hitting POST, it should let you know if it’s successful or not. You can then click on GET in the upper right corner to see the contents of your database.

In order to test the other paths, I suggest using a program like Postman in order to use the other methods, such as PUT and DELETE. 

As of now, the paths for GET and POST is http://127.0.0.1:8000/api/sf_users/ 
For PUT and DELETE path, http://127.0.0.1:8000/api/sf_users/([0-9]) (an int variable, used to represent the id of the object in the database)


