<template>
    <div id="uploadImage">
      <button @click="showUpload = true,showFetch = false">Upload Image</button><br>
      <button @click="showFetch = true,showUpload = false">Fetch Image</button><br>
      
      <div v-if="showUpload">
        <file-upload/>
      </div>

      <div v-else-if="showFetch">
        <fetch-image/>
      </div>
    </div>
</template>
<script>
    import FileUpload from '../components/FileUpload.vue'
    import FetchImage from '../components/FetchImage.vue'
    // import FileUpload from '../'
    export default {
      name: 'uploadImage',
      components: {
        FileUpload,
        FetchImage
      },
      data(){
        return{
          showUpload: false,
          showFetch: false,
        }
      }
    }
</script>