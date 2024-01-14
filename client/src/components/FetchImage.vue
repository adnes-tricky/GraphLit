<template>
    <div>
    <form ref="form" @submit.prevent="fetchImage">
		<div>	
			<input type ="text" name="fetch_name" id = "fetch_name" v-model="fetch_name" required />
			<label>Image name</label>
		</div>
		<div>	
			<input type ="date" name="fetch_date" id = "fetch_date" v-model="fetch_date" required />
			<label>Date</label>
		</div>
		<div>
		<button type="submit">Fetch Image</button>
		<div v-for="index in image" :key="index">
			<img :src="`data:image/jpeg;base64, ${index}`"/>
			<div>
    <span>Image Name:</span>
    <span>{{ index.imageName }}</span>
  </div>
  <div>
    <span>Created Date:</span>
    <span>{{ index.createdDate }}</span>
  </div>
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
      async fetchImage() {
		this.image=[]
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
			this.fetch_date="";
			this.$refs.form.reset();

			
		} 
      }
    }
  };
</script>