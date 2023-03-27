<template>
    <div id="app">
        <h1>Register</h1>
        <form>	
			<div class="username">	
				<label for="username">Username</label>
				<input type ="text"   name="username" id = "username" v-model="username" required/>
			</div>

			<div class="username">	
				<label for="username">Email ID</label>
				<input type ="text" name="email" id = "email" v-model="email" required/>
			</div>

			<div class="password">	
				<label for="password">Password</label>
				<input type="password" name="password" id = "password" v-model="password" required/>
			</div>

			<div class="username">	
				<label for="username">Phone no</label>	
				<input type ="number" name="phno" id = "phno" v-model="phno" required/>
			</div>

			<div class="username">	
				<label for="username">DOB</label>
				<input type ="date" name="dob" id = "dob" v-model="dob" required/>
			</div>

			<button type ="reset">Reset</button><br>
			<button type ="submit" @click="submitForm"><a href='/'></a>Submit</button><br>
			<h6 style="color:rgb(255, 255, 255)">Already Registered user?</h6>
			<router-link to="/login">Login</router-link>
	</form>
  </div>
</template>


<script>
import axios from 'axios';
export default{
    data() {
        return{
            users: [],
            username:'',
            email:'',
            password:'',
            phno:'',
            dob:'',
            response:''
        }
    },
    methods: {
            async submitForm(){
                var messageResponse={};
                const response= await axios.post('api/registerUser',{
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    phoneNo: this.phno,
                    dob: this.dob
                })
                .then(response =>{
                    console.log(response);
                    messageResponse=response.data.message;
                })
                .catch(error =>{
                    console.log(error);
                })
                this.users.push(response.data);
                this.response=messageResponse.message;
            }
        }

}
</script>