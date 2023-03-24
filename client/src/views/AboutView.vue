<template>
  <div class="about">
    <h1>GraphLit</h1>
    <div class="container">
      <div class="text-section">
        <p align="justify">
          In today's digital age, images are an increasingly common and important part of our daily lives. 
          From social media platforms to e-commerce sites, images are used to communicate ideas, sell products, 
          and tell stories in ways that text alone cannot.
        </p>
        <p align="justify">
            Imagine that you are a student, you are reading an article on multiple topics and you take screenshots regularly, 
          we may require accessing these images to read a particular article again. These may be based on various parameters 
          like date, image name, context, etc. However, with the vast amount of images available, finding the right image can be
          a daunting task. This is especially true when searching for images based on specific text-based criteria, such as product 
          names or descriptive text.
        </p>
      </div>
      <div class="image-section">
        <img src="../assets/user_search.jpg" alt="User Search image">
      </div>
    </div>
  </div>
</template>


<style>
.container {
  display: flex;
  flex-direction: row;
}

.image-section {
  width: 50%;
}

.text-section {
  width: 50%;
  padding: 0 20px;
}
</style>
