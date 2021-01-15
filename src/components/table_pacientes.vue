<template>
  <div>
    <div
      class="container"
      style="background-color:#fff; padding-top:10px; border-radius:5px;"
    >
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>

              <th scope="col">Cedula</th>
              <th scope="col">Nombre de Usuario</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Correo Electronico</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item">
              <th scope="row">{{ index++ }}</th>

              <td>{{ item.identificacion }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.nombre }} {{ item.apellido }}</td>
              <td>{{ item.correoElectronico }}</td>
              <td>
                <button
                  style="border:none; background:transparent;"
                  @click="goEditar(item._id, item.identificacion)"
                >
                  <i class="fas fa-pen"></i>
                </button>
                <button
                  style="border:none; background:transparent;"
                  @click="goDelete(item._id) & deleteCitas(item.identificacion)"
                >
                  <i class="fas fa-user-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";
import Notiflix from 'notiflix'
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    axios.get("https://api.omnihealth.com.do/api/data/paciente/", {
      params: {
        user_creation: localStorage.getItem("username")
      }
    }).then((res) => {
      if (res.status == 200) {
        this.data = res.data;
      }
    });
  },
  methods: {
    goEditar(id, identificacion) {
      router.push(`/editarpaciente/${id}/${identificacion}`);
    },
    goDelete(id) {
      axios.delete(`https://api.omnihealth.com.do/api/paciente/${id}`).then((res) => {
        if (res.status == 200) {
          Notiflix.Notify.Success("PACIENTE ELIMINADO");
          setTimeout(() => location.reload(), 6000);
        }
      });
    },
    deleteCitas(id) {
      const body = {
        identificacion: id
      }
      console.log(body)
      axios.delete('https://api.omnihealth.com.do/api/cita/paciente', body)
      .then((res) => {
        Notiflix.Notify.Success(`CITAS ELIMINADAS`)
      });
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

table {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
  text-align: center;
}
</style>
