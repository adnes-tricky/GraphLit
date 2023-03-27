<template>
    <div id="loginUser">
        <h1>Login</h1>
        <form>
			<div>	
				<label>Email ID</label>
				<input type ="email" name="email" id = "email" v-model="email" required/>
			</div>

			<div>	
				<label>Password</label>
				<input type="password" name="password" id = "password" v-model="password" required/>
			</div>

			<button type ="reset">Reset</button><br>
			<button type ="submit" @click="submitForm"><a href='/'></a>Submit</button><br>
			<h6 style="color:rgb(255, 255, 255)">Not registered?</h6>
			<router-link to="/register">Register</router-link>
	</form>
  </div>
</template>


<script>
import axios from 'axios';
import VueCookie from 'vue-cookies';
export default{
    name: 'loginUser',
    data() {
        return{
            response: '',
            email:'',
            password:'',
            username: ''
        }
    },
    methods: {
            async submitForm(){
                var messageResponse={};
                await axios.post('api/loginUser',{
                    email: this.email,
                    password: this.password,
                })
                .then(function(response){
                    if(response.status==200){
                    console.log(response.data.message);
                    messageResponse=response.data.message;

                    VueCookie.set('token', response.data.message.token);
                    VueCookie.set('user', response.data.message.user);
                    console.log(VueCookie.get('token'));
                    }
                })
                .catch(error =>{
                    console.log(error);
                })
                this.response=messageResponse.description;
                this.username=messageResponse.user;
                if(VueCookie.get('token')!=='')
                    window.location.reload();
                
            }
        }

}
</script>