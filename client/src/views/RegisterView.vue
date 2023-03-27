<template>
    <div id="app">
        <h1>Register</h1>
        <form>	
			<div>	
                <label>Username</label>
                <input type="text" name="username" id="username" v-model="username" @blur="validateUsername()" required />
                <div id="username-validate"></div>
            </div>


			<div>	
				<label>Email ID</label>
				<input type ="email" name="email" id = "email" v-model="email" required/>
			</div>

			<div>	
                <label>Password</label>
                <input type="password" id="password" name="password" @blur="validatePassword()" v-model="password" required>
                <div id="password-strength"></div>
            </div>

            <div>	
                <label>Confirm Password</label>
                <input type="password" id="password1" name="password1" v-model="confirmPassword" @blur="validatePasswordMatch()" required/>
                <div id="password-match"></div>
            </div>

			<div>	
				<label>Phone no</label>	
				<input type ="tel" name="phno" id = "phno" v-model="phno" pattern="[0-9]{10}" title="Please enter a 10-digit phone number" required/>
			</div>

			<div>	
				<label>DOB</label>
				<input type ="date" name="dob" id = "dob" v-model="dob" @blur="validateDate()" required/>
                <div id="validate-date"></div>
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
            response:'',
            passwordErrorMessage:'',
            confirmPassword: ''
        }
    },
    methods: {
        async submitForm(event){
            var messageResponse={};

            // Validate the password strength
            if (!this.validatePassword()) {
                this.passwordErrorMessage = 'Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.';
                event.preventDefault();
                return;
            } 
            else if(!this.validatePasswordMatch()){
                event.preventDefault();
                return;
            }
            else if(!this.validateUsername()){
                event.preventDefault();
                return;
            }
            else if(!this.validateDOB()){
                event.preventDefault();
                return;
            }
            else {
                this.passwordErrorMessage = '';
            }

            // Submit the form data
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
        },
        validatePassword() {
            const passwordInput = document.getElementById('password');
            const passwordStrength = document.getElementById('password-strength');

            // Check the password strength and set the message accordingly
            if (passwordInput.value.length < 8) {
                passwordStrength.innerHTML = 'Password must be at least 8 characters long';
                return false;
            } else if (!/\d/.test(passwordInput.value)) {
                passwordStrength.innerHTML = 'Password must contain at least one number';
                return false;
            } else if (!/[a-z]/.test(passwordInput.value)) {
                passwordStrength.innerHTML = 'Password must contain at least one lowercase letter';
                return false;
            } else if (!/[A-Z]/.test(passwordInput.value)) {
                passwordStrength.innerHTML = 'Password must contain at least one uppercase letter';
                return false;
            } 
            else if (!/[\W_]/.test(passwordInput.value)) {
                passwordStrength.innerHTML = 'Password must contain at least one special character';
                return false;
            } else {
                passwordStrength.innerHTML = 'Password strength: Strong';
                return true;
            }
        },
        validatePasswordMatch() {
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('password1');
            const passwordMatch = document.getElementById('password-match');

            if (confirmPasswordInput.value !== passwordInput.value) {
                passwordMatch.innerHTML = 'Passwords do not match';
                return false;
            } else {
                passwordMatch.innerHTML = 'Passwords match';
                return true;
            }
        },
        validateUsername() {
            const usernameInput = document.getElementById('username');
            const username = usernameInput.value.trim();
            const usernamePattern = /^[a-zA-Z_0-9]+$/;
            const usernameValidate = document.getElementById('username-validate');

            
            if (username.length === 0) {
                usernameValidate.innerHTML='Username is required';
                return false;
            } else if (!usernamePattern.test(username)) {
                usernameValidate.innerHTML='Username can only contain alphanumericals and underscores';
                return false;
            } else {
                usernameValidate.innerHTML='';
                return true;
            }
        },
        convertDateFormat(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        validateDOB() {
            const dobInput = document.getElementById('dob');
            const dobValue = dobInput.value;
            const currentDate = new Date();
            const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // match dd/mm/yyyy format
            const validateDate = document.getElementById('validate-date');
            const [, day, month, year] = this.convertDateFormat(dobValue).match(dobRegex); // extract day, month, year from string
            const dob = new Date(year, month - 1, day); // create new date object
            const formattedDOB = this.convertDateFormat(dobValue);

            if (dob > currentDate) {
                validateDate.innerHTML = 'Date of birth must be before today';
                return false;
            }
            if (dobValue.length===0) {
                validateDate.innerHTML = 'Please enter a valid date';
                return false;
            }
            if (!dobRegex.test(formattedDOB)) {
                validateDate.innerHTML = 'Please enter a valid date in the format dd/mm/yyyy';
                return false;
            }
            validateDate.innerHTML = '';
            return true;
        },
    }

}
</script>
