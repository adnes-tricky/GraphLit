<template>
  <div>
    <form ref="form" @submit.prevent="uploadImage">
      <label for="image-upload">Upload an image:</label>
      <input
        id="image-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.bmp,.pbm"
        @change="previewImage"
        @blur="validateFileInput()"
        multiple
        required
      />
      <div id="error-message"></div>
      <button @click="resetImage()">Reset</button><br>
      <div>
        <label>Image name</label>
        <input type="text" name="image_name" id="image_name" v-model="image_name" required />
      </div>
      <div>
        <label>Category</label>
        <input type="text" name="category" id="category" v-model="category" />
      </div>
      <div>
        <label>Keywords</label>
        <input type="text" name="keywords" id="keywords" v-model="keywords" />
      </div>
      <div>
        <label>Date</label>
        <input type="date" name="create-date" id="create-date" v-model="created_date" @blur="validateDate()" required/>
        <div id="validate-date"></div>
      </div>
      <button type="submit">Upload Image</button><br>
      <button @click="togglePreviews">
        <i class="material-icons" v-if="showPreviews" >visibility</i>
        <i class="material-icons visibility-off" v-else>visibility_off</i>
      </button>
      <div class="preview-container" v-for="(url, index) in previewUrls" :key="index" v-show="showPreviews">
        <img :src="url.url" alt="Preview Image" /><br>
        <div v-text="url.name"></div>
      </div><br>
    </form>
  </div>
</template>

<style>
.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}
.material-icons {
  font-family: "Material Icons";
  font-size: 48px;
  color: #fff;
}
</style>

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
      showPreviews: true
    };
  },
  methods: {
    previewImage(event) {
      this.previewUrls = [];
      this.file = event.target.files;
      for (let i = 0; i < this.file.length; i++) {
        const imgfile = this.file[i];
        if (this.validateFileInput({ target: { files: [imgfile] } })) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.resizeImage(event.target.result, 400, 400, (resizedDataUrl) => {
              this.previewUrls.push({
                url: resizedDataUrl,
                name: imgfile.name
              });
            });
          };
          reader.readAsDataURL(imgfile);
        } else {
          // Clear selected file(s) from file input and break out of loop
          event.target.value = null;
          break;
        }
      }
    },
    togglePreviews() {
      this.showPreviews = !this.showPreviews;
    },
    resetImage(){
      // Get the file input element
      const fileInput = document.getElementById("image-upload");
      // Reset the file input and previews
      fileInput.value = null;
      this.previewUrls=[]
    },
    resizeImage(dataUrl, maxWidth, maxHeight, callback) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const resizedDataUrl = reader.result;
            callback(resizedDataUrl);
          };
          reader.readAsDataURL(blob);
        }, 'image/jpeg', 0.8);
      };
    },
    uploadImage(event) {
      const batchSize=10;
      const numItems= this.file.length;
      const numBatches= Math.ceil(numItems/batchSize);
      const files=[];
      if(!this.validateDate()){
        event.preventDefault();
        return;
      }
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
    validateFileInput(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const fileType = file.type;
      if (
        !(
          fileType === "image/jpeg" ||
          fileType === "image/png" ||
          fileType === "image/bmp" ||
          fileType === "image/x-portable-bitmap"
        )
      ) {
        const errorMessage = "Please upload a JPG, PNG, BMP or PBM image";
        document.getElementById("error-message").innerHTML = errorMessage;
        return false;
      } else {
        document.getElementById("error-message").innerHTML = "";
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
    validateDate() {
      const dobInput = document.getElementById('create-date');
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
  }, 
};
</script>