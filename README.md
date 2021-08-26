# Weather Application 
The application is a nodeJS application mainly for the purpose of demonstrating TLS 1.3 running on an OCI compute instance. However,  in order to make things a little more interesting than just a simple hello world node JS application I thought a simple weather application.  The weather application is an extension of the weather application built in the nodeJS udemy.com course. 

The application consists of 3 pages: Home, About, and Help. All of the interesting work is in the Home page. The user enters a zip code; a city, state; or an address. The application will locate the latitude and longitude of the requested location. With the latitude and longitude, the weather for the specified location is able to be retrieved and reported.

# Code Requirements
In order to execute the code you need to register with two external vendors:
- WeatherStack [API Key] https://weatherstack.com
- Mapbox [API Key] https://www.mapbox.com
- OCI "role:webserver" freeform tag needs to be added in the target compute instance
- Each of these vendors will provide you with an API Key. These API Keys need to be plugged into the code.
    - In the geocode.js file (src/utils) add your mapbox.com API Key in the location <mapbox API Key Here>
    - In the forecast.js file (src/utils) add your weatherstack.com API Key in the location <weatherstack API Key Here>
- For the About page you need a picture of yourself and save it as me.png. Save the image in the public/img directory

# Deployment
With the code updated with the API keys the application is now ready for execution. Before the application can receive requests it is necessary to set up an ingress controller. The setup and configuration of the ingress controller (nginx) can be found in the blog: <blog location>.

# Starting the Application
Before starting the application execute "npm list". Make sure you install the packages listed.

At the completion of the package installation you start the application by executing: "node src/app.js".



