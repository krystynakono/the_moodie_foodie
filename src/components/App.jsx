import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import LogIn from './LogIn/LogIn.jsx';
import EmotionForm from './EmotionForm/EmotionForm.jsx';
import DropzoneBox from './DropZone/DropZone.jsx';
import Restaurant from './Restaurant/Restaurant.jsx';
import MapContainer from './MapsContainer/MapsContainer.jsx';
import SavedList from './SavedList/SavedList.jsx';
import SavedMap from './SavedMap/SavedMap.jsx';
import globalStyles from './assets/styles/global.css';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      emotionForm: false,
      signupName: '',
      signupPass: '',
      loginName: '',
      loginPass: '',
      saved: [],
      seeSaved: false,
      location: '',
      address: '',
      happy: '',
      sad: '',
      angry: '',
      surprised: '',
      contempt: '',
      disgust: '',
      fear: '',
      neutral: '',
      userID: 0,
      emotion: 'HAPPY?',
      counter: 0,
      mood: 'happy',
      formData: '',
      emotions: '',
      restaurants: '',
      eatHere: '',
      eat_map_center: '',
      savebtn: 'Save for another time.',
    };
  }

  // This function checks to see if the state isLoggedIn is false.
  // If the user is not logged in, the log in form will render.
  loggedIn(isLoggedIn) {
    if (!isLoggedIn) {
      return (
        <LogIn
          updateAuthForms={event => this.updateAuthForms(event)}
          handleSignup={this.handleSignup.bind(this)}
          handleLogin={this.handleLogin.bind(this)}
          loginName={this.state.loginName}
          loginPass={this.state.loginPass}
          signupName={this.state.signupName}
          signupPass={this.state.signupPass}
          handleLogout={this.handleLogout.bind(this)}
          emotion={this.state.emotion}
          quiz={event => this.quiz(event)}
          counter={this.state.counter}
        />
      );
    }
  }

  // Checks to see if the state emotionForm is true.
  // If the user is logged in, the emotion form will render.
  emotionForm(emotionForm) {
    if (emotionForm) {
      return (
        <EmotionForm
          mood={this.state.mood}
          moodUpdate={event => this.moodUpdate(event)}
          getFoodForMood={this.getFoodForMood.bind(this)}
        />
      );
    }
  }

  restaurantInfo(eatHere) {
    if (eatHere !== '') {
      return (
        <div className="restaurant-holder">
          <Restaurant
            eatHere={this.state.eatHere}
            saveRestaurant={this.restaurantForm.bind(this)}
            tryAgain={this.tryAgain.bind(this)}
            savebtn={this.state.savebtn}
          />
        </div>
      );
    }
  }

  renderMap(center) {
    if (center !== '') {
      return (

        <div className="map-container-div">
          <div style={{ width: '100%', height: '100%' }} >
            <MapContainer
              center={this.state.eat_map_center}
              eatHere={this.state.eatHere}
            />
          </div>
        </div>
      );
    }
  }

  seeSavedRestaurants(seeSaved) {
    if (seeSaved) {
      return (
        <div className="saved">
          <SavedList
            saved={this.state.saved}
            close={this.closeSavedRestaurants.bind(this)}
            delete={this.deleteRestaurant.bind(this)}
          />
          <div id="save-map-container" style={{ width: '50%', height: '300px' }} >
            <SavedMap
              saved={this.state.saved}
              location={this.state.location}
            />
          </div>
        </div>
      );
    }
  }

  closeSavedRestaurants() {
    this.setState({
      seeSaved: false,
      emotionForm: true,
    });
  }

  success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const promise = new Promise((res, rej) => {
      this.setState({
        location: {
          lat: latitude,
          lng: longitude,
        },
      });
      if (this.state.location === '') rej(this.state.location);
      res(this.state.location);
    });
    promise.then(result => this.getAddress(result));
  }

  // Geolocation help from: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
  geoFindMe() {
    if (!navigator.geolocation) {
      console.log('geolocation not supported');
      return;
    }

    function error() {
      console.log('unable to retrieved your location');
    }

    navigator.geolocation.getCurrentPosition(this.success.bind(this), error);
  }

  getAddress(location) {
    const lat = location.lat;
    const lng = location.lng;
    console.log('get address');
    fetch(`/maps/${lat}/${lng}`)
    .then(r => r.json())
    .then((results) => {
        this.setState({
          address: results.formatted_address,
        });
    })
    .catch(err => console.log(err));
  }

  // When a file is dropped into the dropzone, this function will save the
  // image file into the state photo.
  saveImage(files) {
    console.log(files);
    this.setState({
      photo: files[0],
    });
  }

  // This function creates new formData and appends the photo file as the value
  // to the photo key. It is then send to the upload route.
  uploadImage() {
    console.log(this.state.photo);
    const formData = new FormData();
    formData.append('photo', this.state.photo);
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(r => r.json())
    .then((response) => {
      console.log('image uploaded', response);
      this.determineEmotion(response);
    })
    .catch(err => console.log(err));
  }

  determineEmotion(url) {
    console.log('url: ', url);
    const form = {
      url: url,
    };
    fetch('/emotion', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(form),
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response[0].scores);
      this.setState({
        emotions: response[0].scores,
      });
      this.dominantMood(this.state.emotions);
    })
    .catch(err => console.log(err));
  }

  dominantMood(obj) {
    console.log(obj)
    let mood = 'anger';
    let moodValue = obj.anger;
    for (let key in obj) {
      if (obj[key] > moodValue) {
        mood = key;
        moodValue = obj[key];
      }
    }
    console.log(mood);
    console.log(moodValue);
    // this.setState({
    //   mood: mood,
    // })
  }

  // Update the state mood when user uses dropdown menu
  moodUpdate(e) {
    this.setState({
      mood: e.target.value,
    });
    console.log(e.target.value);
  }

  // Make a fetch to the yelp route to search for restaurants matching a
  // specific cuisine
  searchRestaurant(cuisine) {
    console.log('cuisine: ' + cuisine);
    fetch(`yelp/${cuisine}/${this.state.address}`)
    .then(r => r.json())
    .then((restaurants) => {
      this.setState(
      { restaurants },
      );
      console.log(this.state.restaurants);
      this.pickOneRestaurant();
      console.log(this.state.eatHere)
    });
  }

  pickOneRestaurant() {
    let index = Math.floor(Math.random() * this.state.restaurants.length);
    const promise = new Promise((res, rej) => {
      this.setState({
        eatHere: this.state.restaurants[index],
        emotionForm: false,
      });
      if (this.state.eatHere === '') rej(this.state.eatHere);
      res(this.state.eatHere);
    });
    promise.then(result => this.centerEatMap(result));
  }

  centerEatMap(restaurant) {
    this.setState({
      eat_map_center: {
        lat: restaurant.location.coordinate.latitude,
        lng: restaurant.location.coordinate.longitude,
      },
    });
  }

  // check the state of mood of user and set food equal to the cuisine
  // that the user likes to eat when they are in that mood.
  // After setting food equal to that cuisine, call the function that makes
  // the fetch call to Yelp to get suggested restaurants matching cuisine.
  getFoodForMood() {
    console.log('mood: ' + this.state.mood);
    const setFood = new Promise((res, rej) => {
      let food;
      if (this.state.mood === 'happy') {
        food = this.state.happy;
      } else if (this.state.mood === 'sad') {
        food = this.state.sad;
      } else if (this.state.mood === 'angry') {
        food = this.state.angry;
      } else if (this.state.mood === 'surprised') {
        food = this.state.surprised;
      } else if (this.state.mood === 'contempt') {
        food = this.state.contempt;
      } else if (this.state.mood === 'disgust') {
        food = this.state.disgust;
      } else if (this.state.mood === 'fear') {
        food = this.state.fear;
      } else if (this.state.mood === 'neutral') {
        food = this.state.neutral;
      }
      // food = this.state[mood];
      if(!food) rej(food);
      res(food);
    });
    setFood.then(result => this.searchRestaurant(result));
  }

  tryAgain() {
    console.log('try again');
    this.setState({
      emotionForm: true,
      eatHere: '',
      restaurants: '',
      eat_map_center: '',
      savebtn: 'Save for another time.',
    });
  }

  // In order to save user preferences of mood to food, user will take a
  // quiz when logging in. The counter will start at 0 and the first emotion
  // we will ask about is 'HAPPY'. This function will listen for a click on
  // each food image. Once a user clicks a food image, it will grab the id
  // of that image, set the state of that emotion to that id, increment the
  // counter and change the emotion that we are asking about. Each count
  // will be updating the state of a different emotion.``
  quiz(e) {
    if (this.state.counter === 0) {
      this.setState({
        happy: e.target.id,
        emotion: 'SAD?',
        counter: 1,
      });
    } else if (this.state.counter === 1) {
      console.log('happy: ' + this.state.happy);
      this.setState({
        sad: e.target.id,
        emotion: 'HANGRY?',
        counter: 2,
      });
    } else if (this.state.counter === 2) {
      console.log('sad: ' + this.state.sad);
      this.setState({
        angry: e.target.id,
        emotion: 'SURPRISED?',
        counter: 3,
      });
    } else if (this.state.counter === 3) {
      console.log('angry: ' + this.state.angry);
      this.setState({
        surprised: e.target.id,
        emotion: 'CONTEMPT?',
        counter: 4,
      });
    } else if (this.state.counter === 4) {
      console.log('surprised: ' + this.state.surprised);
      this.setState({
        contempt: e.target.id,
        emotion: 'DISGUSTED?',
        counter: 5,
      });
    } else if (this.state.counter === 5) {
      console.log('contempt: ' + this.state.contempt);
      this.setState({
        disgust: e.target.id,
        emotion: 'AFRAID?',
        counter: 6,
      });
    } else if (this.state.counter === 6) {
      console.log('disgust: ' + this.state.disgust);
      this.setState({
        fear: e.target.id,
        emotion: 'NEUTRAL?',
        counter: 7,
      });
    } else if (this.state.counter === 7) {
      console.log('afraid: ' + this.state.neutral);
      this.setState({
        neutral: e.target.id,
        emotion: '',
        counter: 8,
      });
    }
  }


  // Save a restaurant to the DB
  saveRestaurant(formData) {
    console.log('save restaurant');
    fetch('/restaurant', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(formData),
    })
    .then(this.setState({
      savebtn: 'Saved!',
    }))
    .then(() => console.log('restaurant saved'));
  }

  // Delete a saved restaurant from the DB
  deleteRestaurant(id) {
    console.log('deleting restaurant #', id);
    fetch(`/restaurant/${id}`, {
      method: 'delete',
    })
    .then(this.filterSavedRestaurants(id))
    .catch(err => console.log(err));
  }

  // Rather than retching all saved restaurants from the DB again, filter
  // through the saved restaurants and keep all restaurants except for the
  // one matching the deleted restaurant.
  filterSavedRestaurants(id) {
    const saved = this.state.saved.filter((restaurant) => {
      return restaurant.id !== id;
    });
    this.setState({ saved });
  }

  // Collect the information from a specific restaurant
  // Then send it to the saveRestaurant function.
  restaurantForm() {
    console.log('form');
    const formData = {
      name: this.state.eatHere.name,
      rating: this.state.eatHere.rating,
      rating_img: this.state.eatHere.rating_img_url,
      url: this.state.eatHere.url,
      category: this.state.eatHere.categories[0],
      phone: this.state.eatHere.display_phone,
      image: this.state.eatHere.image_url,
      address1: this.state.eatHere.location.display_address[0],
      address2: this.state.eatHere.location.display_address[1],
      address3: this.state.eatHere.location.display_address[2],
      lat: this.state.eatHere.location.coordinate.latitude,
      lng: this.state.eatHere.location.coordinate.longitude,
      user_id: this.state.userID,
    };
    this.saveRestaurant(formData);
  }

  // Get all saved restaurants from databased and saved into state
  fetchSavedRestaurants() {
    fetch(`/restaurant/${this.state.userID}`)
    .then(r => r.json())
    .then((saved) => {
      this.setState({
        saved: saved,
        seeSaved: true,
        eatHere: '',
        eat_map_center: '',
        emotionForm: false,
        savebtn: 'Save for another time.',
      });
    });
  }

  // code attributed to Nick from Digital Gypsy project
  // updates all of the login/signup forms, filters by name
  updateAuthForms(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'loginName':
        this.setState({ loginName: value });
        break;
      case 'loginPass':
        this.setState({ loginPass: value });
        break;
      case 'signupName':
        this.setState({ signupName: e.target.value });
        break;
      case 'signupPass':
        this.setState({ signupPass: value });
        break;
      default:
        break;
    }
  }


  // passes the login data to the api
  // authenticates the data with server
  // respond with login and user ID
  handleLogin() {
    fetch('auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.loginName,
        password: this.state.loginPass,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log('the response is: ', response);
      if (response.id !== 'invalid') {
        this.setState({
          userID: response.id,
          happy: response.user.happy,
          sad: response.user.sad,
          angry: response.user.angry,
          surprised: response.user.surprised,
          contempt: response.user.contempt,
          disgust: response.user.disgust,
          fear: response.user.fear,
          neutral: response.user.neutral,
        });
        // saves jwt token and ID
        localStorage.id = response.id;
        localStorage.token = response.token;
      } else {
        alert('invalid login');
      }
    })
    .then(this.setState({
      loginName: '',
      loginPass: '',
    }))
    .then(console.log('logging in user: ', localStorage.id))
    .then(() => {
      this.setState({
        isLoggedIn: true,
        emotionForm: true,
      });
    })
    .then(this.geoFindMe.bind(this))
    .catch(err => console.log(err));
  }

  hideSignUp() {
    const btn = document.querySelector('#signupModal');
    const modal = document.querySelector('#signup');
    btn.style.display = 'none';
    modal.style.display = 'none';
  }
  // sends the signup data to the api server
  // encrypts new user data and saves in db
  // authenticates the response and returns the user id
  handleSignup() {
    fetch('/auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.signupName,
        password: this.state.signupPass,
        happy: this.state.happy,
        sad: this.state.sad,
        angry: this.state.angry,
        surprised: this.state.surprised,
        contempt: this.state.contempt,
        disgust: this.state.disgust,
        fear: this.state.fear,
        neutral: this.state.neutral,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      if (response.id) {
        this.setState({
          userID: response.id,
        });
        localStorage.id = response.id;
      } else {
        alert(response.message);
      }
    })
    .then(this.setState({
      signupName: '',
      signupPass: '',
    }))
    .then(this.showLoginForm())
    .then(console.log('signup successful'))
    .then(this.hideSignUp())
    .catch(err => console.log(err));
  }

  showLoginForm() {
    console.log('showLoginForm');
    const login = document.querySelector('.log-in-container');
    const signupbtn = document.querySelector('#signupModal');

    login.style.display = 'flex';
    signupbtn.style.display = 'none';
  }

  // When a user clicks on the log out button, it will reset the state of
  // isLoggedIn to false and set the state of the current userID to 0.
  handleLogout() {
    this.setState({
      isLoggedIn: false,
      emotionForm: false,
      signupName: '',
      signupPass: '',
      loginName: '',
      loginPass: '',
      saved: [],
      seeSaved: false,
      location: '',
      address: '',
      happy: '',
      sad: '',
      angry: '',
      surprised: '',
      contempt: '',
      disgust: '',
      fear: '',
      neutral: '',
      userID: 0,
      emotion: 'HAPPY?',
      counter: 0,
      mood: 'happy',
      restaurants: '',
      eatHere: '',
      eat_map_center: '',
      savebtn: 'Save for another time.',
    });
    console.log('logging out');
  }

  // this authenticates the user on each page load
  // uses a token from local storage to verify access
  authenticateUser() {
    let token;
    if ((localStorage.getItem('token') === null)) {
      token === 'invalid';
    } else {
      token = localStorage.getItem('token');
    }
    console.log(token);
    fetch('/auth/verify', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        token: token,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      if (response.name === 'JsonWebTokenError') {
        this.setState({ userID: 0 });
        localStorage.setItem('token', null);
      } else {
        this.setState({ userID: response.id });
        localStorage.setItem('token', response.token);
      }
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="app">
        <div id="background-image">
          <img src="http://i.imgur.com/zwkflAv.jpg" alt=""/>
        </div>
        <Header
          handleLogout={this.handleLogout.bind(this)}
          fetchSavedRestaurants={this.fetchSavedRestaurants.bind(this)}
          isLoggedIn={this.state.isLoggedIn}
        />
        {this.loggedIn(this.state.isLoggedIn)}
        {this.emotionForm(this.state.emotionForm)}
        <div className="search-container">
          <div id="routlette-results">
            {this.restaurantInfo(this.state.eatHere)}
            {this.renderMap(this.state.eat_map_center)}
          </div>
        </div>
        <DropzoneBox
          saveImage={this.saveImage.bind(this)}
          eatHere={this.state.eatHere}
          uploadImage={this.uploadImage.bind(this)}
        />

        <div className="saved-restaurants-list-map-container">
          {this.seeSavedRestaurants(this.state.seeSaved)}
        </div>
      </div>
    );
  }
}

export default App;
