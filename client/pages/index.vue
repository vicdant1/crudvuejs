<template>
  <div class="main">
    <div class="form-box d-flex flex-column w-50 justify-content-center mt-5">
      <h1 class="text-center pb-3">Movie Review <span>CRUD</span> Application</h1>
      <label for="movieName">Movie name:</label>
      <input name="movieName" id="movieName" type="text" placeholder="Movie name"/>
      <label for="movieReview">Movie review:</label>
      <input name="movieReview" id="movieReview" type="text" placeholder="Movie review"/>
      <button class="mt-4" @click="insertData()">Submit review</button>
    </div>

    <div class="container mt-5">
      <hr>

        <div v-if="this.movies.length == 0" class="noDataInfo">
          <i class="fas fa-film"></i> no movies yet :'(
        </div>

        <table v-else>
          <thead>
            <tr>
              <th class="col-md-1">Code</th>
              <th class="col-md-1">Name</th>
              <th class="col-md-1">Review</th>
              <th class="col-md-1">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="item in movies" :key="item._id">
              <td>#{{item.id}}</td>
              <td>{{item.movie_name}}</td>
              <td>{{item.movie_review}}</td>
              <td class="">
                <div class="btn btn-primary btn-actions" v-b-modal="String(item.id)"><i class="fas fa-edit"></i></div>
                <b-modal :id="String(item.id)" title="bootstrap vue"  @ok="editData(item.id)">
                    <template #modal-title>
                      <i class="fas fa-edit"></i> #{{item.id}} - {{item.movie_name}} 
                    </template>
                    <div>
                      <b-form-input type="text" name="nameEdit" id="nameEdit" :value="item.movie_name"></b-form-input>
                      <b-form-input class="mt-3" type="text" name="reviewEdit" id="reviewEdit" :value="item.movie_review"></b-form-input>
                    </div>
                </b-modal>

                <div class="btn btn-danger btn-actions" @click="deleteData(item.id)"><i class="fas fa-trash-alt"></i></div>
              </td>
            </tr>
          </tbody>
        </table>
      <hr>
    </div>
    <script src="https://kit.fontawesome.com/fae7e0756f.js" crossorigin="anonymous"></script>
  </div>
</template>

<script>
export default {
  /*
  O que falta:
  - mensagem de confirmação - notificação p/ exclusão edição adição  (fazer com alert do bootstrap);
  - fazer suavização de transições;
  - fazer com que o enter funcione para a submissão do form (onSubmit form javascript);
  - estudar como fazer flash messages no nodejs
  - add tooltip na palavra crud explicando quais são minhas intenções com o projeto
  - add novos campos (slider para nota)/duração/
  */

  data(){
    return{
      baseURL: 'http://localhost:3001/api',
      movies: [],
    }
  },
  methods: {
    fetchData(){
      this.$axios.$get(`${this.baseURL}/get`)
      .then(response => this.movies = response)
      .catch((err) => console.log(`Cannot solve this request, error: ${err}`));
    },
    async insertData(){
      await this.$axios.$post(`${this.baseURL}/insert`, {
        movieName: document.getElementById('movieName').value,
        movieReview: document.getElementById('movieReview').value,
      });
      this.cleanOnSubmit();
      this.fetchData();
    },
    async deleteData(id){
      await this.$axios.$post(`${this.baseURL}/delete/${id}`);
      this.fetchData();
    },
    cleanOnSubmit(){
      document.getElementById('movieName').value = '';
      document.getElementById('movieReview').value = '';
    },
    async editData(id){
      const nameEdit = document.querySelector('#nameEdit').value;
      const reviewEdit = document.querySelector('#reviewEdit').value;
      await this.$axios.$post(`${this.baseURL}/edit/${id}`, {nameEdit, reviewEdit});
      this.fetchData();
    }

  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped>
</style>