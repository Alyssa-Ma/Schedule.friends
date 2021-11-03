# Schedule.friends 
**Description** 

Schedule.friends is a mobile app that helps you know when your friends are free on an easy to view interface. Aimed towards students, we hope to clear out some of the hassle of coordinating meetups when everyone has a different schedule.

## Navigation
* [Before Setup](#before-setup)
* [First Time Frontend Setup](#first-time-frontend-setup)
	* [Environment Setup](#environment-setup)
	* [Dependencies](#installing-frontend-dependencies)
* [First Time Backend Setup](#first-time-backend-setup)
	* [Django Setup](#django-setup)
	* [Virtual Environment Setup](#virtual-environment-setup)
* [Running The Application](#running-the-application)
	* [Frontend](#frontend) 
	* [Backend](#backend) 

## Before Setup
1. Note that we will be using the terminal on Mac/Linux and Powershell on Windows. 
2. Clone the repository using Git or download the repository zip file. 
###
	git clone https://github.com/Alyssa-Ma/Schedule.friends.git 
	
[Back to Navigation](#navigation)

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

[Back to Navigation](#navigation)

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

[Back to Navigation](#navigation)

## First Time Backend Setup

### Django Setup
1. If you do not have Python version 3 or higher installed, install it. If you are using Windows, Make sure Python can be used in your terminal as a PATH variable. NOTE: It’s very likely you have it installed. Typically you can check by going into your terminal and typing `python --version`. Could also be `python3 --version`. Otherwise, google how to check if you do.

	https://www.python.org/downloads/

2. After that, if you don’t have postgresql installed, you’ll need to do that, and it will vary based on what OS/environment you want to use. When you install and start your postgreSQL service, make note of the port number,  we will need this later when we set up our dotenv file.

	https://www.postgresql.org/download/

3. After that’s done, you’ll need to create your database manually, which requires going into postgresql(psql) shell. 
4. After you do that, you can follow step 1 of these instructions (ignore the rest). REMEMBER: All commands must end with a semicolon. You do not have to do `ALTER ROLE <yourname> SET default_transaction_isolation TO 'read committed';`

	https://www.section.io/engineering-education/django-app-using-postgresql-database/

5. Be sure to remember the following things when you create your database for later:  
	`Name of database`  
	`Name of user with permissions created`  
	`Password of the user`  

[Back to Navigation](#navigation)

### Virtual Environment Setup

1. Once the database is set up, we need to create our python environment. Navigate in your terminal to 
###
	/Schedule.friends/backend

2. From there, create your virtual environment by using the command below. (You may need to type python3 depending on your setup).
###
	python -m venv venv

3. Then you need to activate it by using the command below. 
#### Mac/Linux
	. venv/bin/activate
	
#### Windows
	.\venv\Scripts\activate
	
You’ll know it works when there’s a (venv) in the start of your terminal path. To get out of your env, just type `deactivate`
4. While your virtual environment is still activated, install all the dependencies needed for the django app to run by using the command below. NOTE: if you use python3 as your command instead of python, you will use pip3 instead of pip.
###
	pip install -r requirements.txt

5. Congrats! You’re almost done with setting up the backend. Now we need to create an dotenv file. In the same directory `(/Schedule.friends/backend)`, create a file named .env (exactly as it is written). 
6. Open the file in any plain text editor and put in the following variables:
###
	SECRET_KEY_DJANGO='django-insecure-wa=kucz290j!8wnr8k5$aezj2woc$xu@^qz5m=d%6nx!9k_vt2'
	NAME_PSQL=<Name of database you created in step 4>
	USER_PSQL=<Name of user you created in step 4>
	PASSWORD_PSQL=<Password of user you created in step 4>
	HOST_PSQL=localhost
	PORT_PSQL=<Port your PostgreSQL service runs on>

7. Save the file.
8. You then need to run migrations to configure your postgresql database to work with the model schema we’ve created. Navigate into `/Schedule.friends/backend/sf_api` and type the following:
###
	python manage.py migrate

9. At this point you should be able to run the backend. Navigate into /Schedule.friends/backend/sf_api and type the following command:
###
	python manage.py runserver

10. If all works, django will run without any errors. You can test to see if the database is working as intended by typing `http://127.0.0.1:8000/api/sf_users/` into your web browser.
11. Try adding to the database by inserting into the post field:

	{
		“first_name”: “John”,
		“last_name”: “Doe”,
		“email” : “hello@home.com”,
		“password”: “password”
  	}
  
11. After hitting POST, it should let you know if it’s successful or not. You can then click on GET in the upper right corner to see the contents of your database.
12. In order to test the other paths, I suggest using a program like Postman in order to use the other methods, such as PUT and DELETE. As of now, the paths for GET and POST is `http://127.0.0.1:8000/api/sf_users/` For PUT and DELETE path, http://127.0.0.1:8000/api/sf_users/([0-9]) (an int variable, used to represent the id of the object in the database)

[Back to Navigation](#navigation)

## Running The Application
	
### Frontend
1. Navigate into the frontend folder inside the repository using your terminal of choice.
###
	cd .\frontend\
1. Enter the following command with the terminal in the frontend folder.
###
	npx react-native start
2. While leaving the first terminal running, run the following command on another terminal in the frontend folder.
###
	npx react-native run-android
***The frontend is now running.***	
[Back to Navigation](#navigation)

### Backend
1. Navigate into the backend folder inside the repository using your terminal of choice. 
###
	cd .\backend\
2. Activate the virtual environment by using the command below. 
#### Mac/Linux
	. venv/bin/activate
	
#### Windows
	.\venv\Scripts\activate
3. Navigate into `/Schedule.friends/backend/sf_api` and type the following command:
###
	python manage.py runserver
***The backend is now running.***	
[Back to Navigation](#navigation)	
