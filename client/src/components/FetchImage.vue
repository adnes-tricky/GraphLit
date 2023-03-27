<template>
    <div>
    <form ref="form" @submit.prevent="fetchImage">
		<div>	
			<label>Image name</label>
			<input type ="text" name="fetch_name" id = "fetch_name" v-model="fetch_name" required />
		</div>
		<div>	
			<label>Date</label>
			<input type ="date" name="fetch-date" id = "fetch-date" v-model="fetch_date" @blur="validateDate()" required/>
            <div id="validate-date"></div>
		</div>
		<div>
		<button type="submit">Fetch Image</button>
		<div v-for="index in image" :key="index">
			<img :src="`data:image/jpeg;base64, ${index}`"/>
		</div>
		
		</div>
    </form>
  </div> 
</template>
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
          image: [],
          fetch_name: "",
          fetch_date: ""
      };
    },
    methods: {
		async fetchImage(event) {
			this.image=[]
			if(!this.validateDate()){
				event.preventDefault();
				return;
			}
			const response=await axios.post('api/fetchImage',{
				image_name: this.fetch_name,
				created_date: this.fetch_date,
			})
			.catch(error =>{
				console.log(error);
			})
			if(response.status==200){
				// console.log(response);
				for(let i=0;i<response.data.id.length;i++){
					const response2 = await axios.get('api/uploadImage/' + response.data.id[i]);
					this.image.push(response2.data.image)
				}

				this.fetch_name="";
				this.fetch_date=null;
				this.$refs.form.reset();	
			} 
		},
		convertDateFormat(dateString){
			const date = new Date(dateString);
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		},
		validateDate() {
			const dobInput = document.getElementById('fetch-date');
			const dobValue = dobInput.value;
			const currentDate = new Date();
			const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // match dd/mm/yyyy format
			const validateDate = document.getElementById('validate-date');
			const [, day, month, year] = this.convertDateFormat(dobValue).match(dobRegex); // extract day, month, year from string
			const dob = new Date(year, month - 1, day); // create new date object
			const formattedDOB = this.convertDateFormat(dobValue);
			if (dob > currentDate) {
				validateDate.innerHTML = 'Date of creation must be before today';
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
  };
</script>