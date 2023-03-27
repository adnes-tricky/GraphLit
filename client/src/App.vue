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
        background-color: black;
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
  color: aliceblue;
  font-size: 1.5vw; /* Set font size relative to viewport width */
}
h1{
  color: rgb(201, 168, 251);
  margin: 20px 0;
  text-align: center; /* Center align */
}
h4{
  color: rgb(201, 168, 251);
  margin: 10px 0;
  text-align: center; /* Center align */
}
label{
  color: aliceblue;
}
a {
  color: rgb(162, 82, 247);
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
  color: aliceblue;
}
th{
  color:rgb(162, 82, 247);
}
form{
  max-width: 45vw;
  height: 100%;
  margin: auto;
  background-color: rgb(19, 7, 39);
  padding: 20px;
}
img{
  max-width: 100%;
  height: auto; /* Ensure height adjusts proportionally */
}
</style>


