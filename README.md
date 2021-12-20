# Perceptual test on StyleGAN3
This repository contains the material to repeat the experiment conducted in the paper "More Real than Real: A Study on Human Visual Perception of Synthetic Faces" using images generated with StyleGAN3 ([https://github.com/NVlabs/stylegan3](https://github.com/NVlabs/stylegan3)). 


The web application used for the test is composed of a NodeJS server with Express that export some APIs: the implementation of the server can be found in the "/lib" folder. 

A simple web client (implemented with jQuery calls) that implements the APIs can be found in the "/frontend" folder. 

The images used during the trial are in the folder "/img".  

The database used for storing the data is a MongoDB hosted on Atlas, but a local version can be easily used. A backup of the data collected during the test is present is the "/database" folder and the 2 collections can be easily imported in a new Mongo Database. 

To makes the application work, first of all the command "npm install" is needed to download all the necessary dependecies. The second step is to create a ".env" file with the same format as the ".env.sample" present in the repository, where the value of "MONGODB_URI" is changed with the url of the database.  After that the application can be launched in development mode using "npm run dev" or in normale mode with both the command "npm run build" and "npm run start". After that, the client application can be launched with this url: [http://localhost:8080/](http://localhost:8080/). 

The analysis of the data and the responses of the questionaire are stored in the "/data_analysis" folder. 

More information about the expriment and the resuls are explainted in the pdf presentation "Perceptual test on StyleGAN3.pdf". 

A deployed version of the web application used for the test can be found on Heroku at the following link: [https://projectmds.herokuapp.com/](https://projectmds.herokuapp.com/).
