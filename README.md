# The Moodie Foodie

## Summary
Do you love eating but hate deciding where to go eat? The Moodie Foodie is the app for you. 
!['hungry hampster'](https://media.giphy.com/media/GnCc88zZhSVUc/giphy.gif)

## User Story
At sign up, the user will take a brief quiz about the types of foods they prefer to eat when they are in different moods. 

Upon log in, the user can either input their current mood or take a quick selfie. We will analyze their facial expression to determine the dominant emotion and search for a restaurant in the area that match the cuisine they prefer to eat when in that mood.  

We will return only one matching restaurant with relvant information to take the stress out of deciding where to eat. 
The user can either:
- Go enjoy themselves a meal. 
- Save the restaurant for future  reference. 
- Play Restaurant Roulette until satisfied.

!['login page'](http://i.imgur.com/dljibx7.png)

!['restaurant view'](http://i.imgur.com/qmA2cVL.png)

## ERD
!['ERD'](http://i.imgur.com/Ycajljv.png)

## Wireframes
#### Homepage Vision
!['hompage vision'](http://i.imgur.com/pXYs6Yu.png)

#### Login/Quiz Vision
!['login vision'](http://i.imgur.com/6PdU0vJ.png)

## Technologies Used
- React
- PSQL
- Node.js
- Babel
- Webpack
- Bcrypt
- Google Maps API
- Yelp API
- AWS S3
- Multer
- HTML5 Geolocation
- React Webcam

## Sources:
- [React Webcam](https://github.com/cezary/react-webcam)
- [Multer Documentation](https://www.npmjs.com/package/multer-s3)
- Example using [Multer-to-S3](https://gist.github.com/adon-at-work/26c8a8e0a1aee5ded03c)
    - Also, big thank you to Sabrina Mesa and Joey Pinas for all the help with photo uploading and AWS. 
- Help [converting data from webcam image to a file](http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata) to be sent through formData
- Geolocation help from these [docs](ttps://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- Help with Yelp's OAuth attributed to code from [this website](https://arian.io/how-to-use-yelps-api-with-node/) and [Travel Buddy](https://github.com/krmalewski/project2)
- Code for user login and authorization attributed to the work that Nick Taff did on our [Digital Gypsy](https://github.com/Digital-Gypsy/digital-gypsy-app) App

### Visit live site [here](https://the-moodie-foodie.herokuapp.com/)!
