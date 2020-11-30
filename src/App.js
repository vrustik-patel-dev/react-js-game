import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

var d = new Date();

function setCookie(cname,cvalue,exdays) {
  //Using date function to set expiring time for cookie
  //Using getTime and setTime functions to change time in d(Date object)
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d;
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = document.cookie;
  
  //Spliting string with ; to differentiate every elements in cookie
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];

      //Triming string for extra space around string
      c=c.trim();

      //Finding appearance of cookie key available in string
      if (c.startsWith(name)) {
          //sending substring containing value of the cookie 
          return c.substring(name.length);
          //We can also apply c.slice(name.length) for same result
      }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  let msg;
  if (user !== "") {
      msg = "Welcome Back, " + user;
  } else {
      user = prompt("Please enter your name:","");
      if (user !== "" && user !== null) {

          //Converting Username String in to Uppercase

          user = user.toUpperCase();
          setCookie("username", user, 1);
      }
      msg ="Welcome , " + user;
  }
  alert(msg);
}

const App = () => {
  useEffect(()=>checkCookie())
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
