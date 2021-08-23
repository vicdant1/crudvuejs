<template>
  <div class="main">
    <div class="form-box d-flex flex-column w-50 justify-content-center mt-5">
      <h1 class="text-center pb-3">Movie Review <span>CRUD</span> Application</h1>
      <label for="movieName">Movie name:</label>
      <input name="movieName" type="text" placeholder="Movie name"/>
      <label for="movieReview">Movie review:</label>
      <input name="movieReview" type="text" placeholder="Movie review"/>
      <button class="mt-4">Submit review</button>
    </div>

    <div class="container mt-5">
      <hr>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Review</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="item in movies" :key="item">
              <td>#{{item.Id}}</td>
              <td>{{item.movie_name}}</td>
              <td>{{item.movie_review}}</td>
            </tr>
          </tbody>
        </table>
    </div>


    
  </div>
</template>

<script>
export default {

  data(){
    return{
      baseURL: 'http://localhost:3001/api',
      movies: []
    }
  },
  methods: {
    submit(){
    },
    fetchData(){
      this.$axios.$get(`${this.baseURL}/get`)
      .then(response => this.movies = response)
      .catch((err) => console.log(`Cannot solve this request, error: ${err}`));
    }
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped>
</style>