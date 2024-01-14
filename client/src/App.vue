<template>
  <nav-bar></nav-bar>
</template>
<script>
  import NavBar from './components/NavBar.vue'
  export default {
      name: 'App',
      components: {
        NavBar
      }
    }
</script>
<style>
/* Import the Picocss styles */
@import '../node_modules/@picocss/pico/css/pico.classless.min.css';
/* Your custom styles */
:root{
        background-color: rgb(221, 153, 255);
        color:aliceblue;
      }
:root:not([data-theme=dark]){
  --primary: rgb(144, 51, 244);
  --primary-hover: rgb(60, 26, 96);
}
body{
  padding: 32px;
  color: white;
}
p {
  color: black;
  font-size: 1.5vw; /* Set font size relative to viewport width */
}
h1{
  color: black;
  margin: 20px 0;
  text-align: center; /* Center align */
}
h4{
  color: black;
  margin: 10px 0;
  text-align: center; /* Center align */
}
label{
  color: aliceblue;
}
a {
  color: black;
}
a:hover {
  color: rgb(77, 38, 117);
}
a:active {
  color: rgb(191, 138, 251);
}
button {
  background-color: rgb(132, 68, 200);
  max-width: 45vw;
  height: 100%;
  margin: auto;
  padding: 20px;
}
button:hover {
  background-color: rgb(39, 17, 61);
}
button:active {
  background-color: rgb(158, 116, 203);
}
input{
  color: aliceblue;
}
td{
  color: black;
}
th{
  color:black;
}
form{
  max-width: 45vw;
  height: 100%;
  margin: auto;
  background-color: black;
  padding: 20px;
}
img{
  max-width: 100%;
  height: auto; /* Ensure height adjusts proportionally */
}
</style>


