<template>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link> 
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/upload">Upload</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>
        <li>
          <div v-if="isAuthenticated()"> {{ giveUsername() }} </div>
        </li>
        <li>
          <div v-if="isAuthenticated()"><a href="#" @click="logOut">logout</a></div>
        </li>
      </ul>
    </nav>
    <router-view/>
  </template>

  <script>
  import VueCookie from 'vue-cookies';
  export default{
    data(){
        return{
            loggedIn: true
        }
    },
    methods:{
      giveUsername(){
        console.log(VueCookie.get('user'))
        return VueCookie.get('user')
      },
      isAuthenticated(){
        if(VueCookie.get('token')) this.loggedIn=true;
        else this.loggedIn=false;
        return !!VueCookie.get('token')
      },
      logOut(){
        VueCookie.set('token', '');
        VueCookie.set('user', '');
        // this.$router.push('/');
        this.loggedIn=false;
        window.location.reload();
      },
    }
  }
  </script>
  
  