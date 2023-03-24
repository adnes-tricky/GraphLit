<template>
  <div>
    <form ref="form" @submit.prevent="uploadImage">
      <!-- <input type="file" ref="fileInput" @change="handleFileChange"/>
      <img :src="imagePreview"/> -->
      <input type="file" @change="previewImage" multiple required/>
      <!-- <img v-if="preview" :src="preview"/> -->
      <div v-for="(url, index) in previewUrls" :key="index">
        <img :src="url" alt="Preview Image" />
      </div>
      <div>	
				<label>Image name</label>
				<input type ="text" name="image_name" id = "image_name" v-model="image_name" required/>
			</div>
      <div>	
				<label>Category</label>
				<input type ="text" name="category" id = "category" v-model="category" />
			</div>
      <div>	
				<label>Keywords</label>
				<input type ="text" name="keywords" id = "keywords" v-model="keywords" />
			</div>
      <div>	
        <label>Date</label>
				<input type ="date" name="create_date" id = "create_date" v-model="created_date" required/>
			</div>
      <button type="submit">Upload Image</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: [],
      previewUrls: [],
      image_name: "",
      imageName: "images",
      category: "",
      keywords: "",
      created_date: "",
    };
  },
  methods: {
    previewImage(event) {
      this.file = event.target.files;
      for (let i = 0; i < this.file.length; i++) {
        const imgfile = this.file[i];
        const reader = new FileReader();
        reader.onload = (event) => {
        this.previewUrls.push(event.target.result);
        };
        reader.readAsDataURL(imgfile);
      }
    },
    uploadImage() {
      const batchSize=10;
      const numItems= this.file.length;
      const numBatches= Math.ceil(numItems/batchSize);
      const files=[];
      for(let i=0;i<this.file.length;i++){
        files.push(this.file[i]);
      }
      for (let i = 0; i < numBatches; i++) {
        const start = i * batchSize;
        const end = Math.min((i + 1) * batchSize, numItems);
        const batch =files.slice(start, end);
        
        let formData = new FormData();
        formData.append('imageName', this.imageName);
        formData.append('image_name',this.image_name);
        formData.append('category', this.category);
        formData.append('keywords', this.keywords);
        formData.append('created_date', this.created_date);
        for(let j=0;j<batchSize;j++){
          formData.append('file', batch[j]);  
        }
        //console.log(formData.image_name);
        axios.post('/api/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data);
          this.prevPermit=false;
        })
        .catch(error => {
          console.log(error);
        }); 
      }
      this.file=[]
      this.previewUrls=[]
      this.image_name=""
      this.category=""
      this.keywords=""
      this.created_date=""
      this.$refs.form.reset()
    },
  },
  
};
</script>