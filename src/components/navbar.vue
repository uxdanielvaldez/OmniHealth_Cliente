<template>
    <div>
        <header class="header" id="header">
            <div class="header__toggle">
                <i class='bx bx-menu' id="header-toggle"></i>
            </div>

            <div class="header__img">
              <!-- <p>Hola</p>
                <img src="assets/img/perfil.jpg" alt=""> -->
            </div>
        </header>

        <div class="l-navbar" id="nav-bar">
            <nav class="nav">
                <div>
                  <router-link to="/">
                    <a class="nav__logo">
                        <i class='bx bx-layer nav__logo-icon'></i>
                        <span class="nav__logo-name">OmniHealth</span>
                    </a>
                  </router-link>

                    <div class="nav__list">
                      <router-link to="/">
                        <a class="nav__link">
                        <i class='bx bx-grid-alt nav__icon' ></i>
                            <span class="nav__name">Dashboard</span>
                        </a>
                      </router-link>

                      <router-link to="/seleccionarpaciente">
                        <a class="nav__link">
                            <i class='bx bx-pencil nav__icon' ></i>
                            <span class="nav__name">Citas</span>
                        </a>
                      </router-link>
                        
                      <router-link to="/calendar">
                        <a class="nav__link">
                            <i class='bx bx-calendar nav__icon' ></i>
                            <span class="nav__name">Calendarios</span>
                        </a>
                      </router-link>

                      <router-link to="/pacientes">
                        <a class="nav__link">
                            <i class='bx bx-user nav__icon' ></i>
                            <span class="nav__name">Pacientes</span>
                        </a>
                      </router-link>

                      <router-link to="/configuracion">
                        <a class="nav__link">
                            <i class='bx bx-slider-alt nav__icon' ></i>
                            <span class="nav__name">Configuración</span>
                        </a>
                      </router-link>

                    </div>
                </div>

                <a @click="logout" class="nav__link">
                    <i class='bx bx-log-out nav__icon' ></i>
                    <span class="nav__name">Cerrar Sesión</span>
                </a>
            </nav>
        </div>
    </div>
</template>

<script>
import '../assets/js/main'
import router from '../router/index'
import Notiflix from 'notiflix'
import axios from 'axios'
export default {
    mounted() {

        // if (localStorage.getItem("reloaded")) {
        // localStorage.removeItem("reloaded");
        // } else {
        // localStorage.setItem("reloaded", "1");
        // location.reload();
        // }

      if(localStorage.getItem("estadoUser") == 'INACTIVO') {
        localStorage.clear()
        Notiflix.Notify.Failure("USUARIO NO AUTORIZADO")
        this.validUser()
      } else {
        this.validUser()
      }

      this.userInfo()
        /*===== SHOW NAVBAR  =====*/ 
  const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))
    },
    methods: {
      logout() {
        localStorage.clear()
        location.reload()
      },
      userInfo() {
        axios
        .get(`https://api.omnihealth.com.do/api/${localStorage.getItem("userId")}/user/info`)
        .then(res => {
          console.log(res)
        })
      },
    validUser() {
      if(localStorage.getItem("accessToken")) {

      } else {
        router.push('/login')
      }
    }
    },
}
</script>

<style>
    /*===== GOOGLE FONTS =====*/
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap");

/*===== VARIABLES CSS =====*/
:root{
  --header-height: 3rem;
  --nav-width: 68px;

  /*===== Colors =====*/
  --first-color: #5F89FA;
  --first-color-light: #ffffff;
  --white-color: #5F89FA;
  
  /*===== Font and typography =====*/
  --body-font: 'Nunito', sans-serif;
  --normal-font-size: 1rem;
  
  /*===== z index =====*/
  --z-fixed: 100;
}

/*===== BASE =====*/
*,::before,::after{
  box-sizing: border-box;
}


body{
  position: relative;
  margin: var(--header-height) 0 0 0;
  padding: 0 1rem;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  transition: .5s;
}

a{
  text-decoration: none;
}

/*===== HEADER =====*/
.header{
  width: 100%;
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: var(--white-color);
  z-index: var(--z-fixed);
  transition: .5s;
}

.header__toggle{
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
}

.header__img{
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}

.header__img img{
  width: 40px;
}

/*===== NAV =====*/
.l-navbar{
  position: fixed;
  top: 0;
  left: -30%;
  width: var(--nav-width);
  height: 100vh;
  background-color: var(--first-color);
  padding: .5rem 1rem 0 0;
  transition: .5s;
  z-index: var(--z-fixed);
}

.nav{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.nav__logo, .nav__link{
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  column-gap: 1rem;
  padding: .5rem 0 .5rem 1.5rem;
}

.nav__logo{
  margin-bottom: 2rem;
}

.nav__logo-icon{
  font-size: 1.25rem;
  color: #ffffff;
}

.nav__logo-name{
  color: #ffffff;
  font-weight: 700;
}

.nav__link{
  position: relative;
  color: var(--first-color-light);
  margin-bottom: 1.5rem;
  transition: .3s;
}

.nav__link:hover{
  color: #000;
}

.nav__icon{
  font-size: 1.25rem;
}

/*Show navbar movil*/
.show{
  left: 0;
}

/*Add padding body movil*/
.body-pd{
  padding-left: calc(var(--nav-width) + 1rem);
}

/*Active links*/
.active{
  color: #ffffff;
}

.active::before{
  content: '';
  position: absolute;
  left: 0;
  width: 2px;
  height: 32px;
  background-color: #ffffff;
}

/* ===== MEDIA QUERIES=====*/
@media screen and (min-width: 768px){
  body{
    margin: calc(var(--header-height) + 1rem) 0 0 0;
    padding-left: calc(var(--nav-width) + 2rem);
  }

  .header{
    height: calc(var(--header-height) + 1rem);
    padding: 0 2rem 0 calc(var(--nav-width) + 2rem);
  }

  .header__img{
    width: 40px;
    height: 40px;
  }

  .header__img img{
    width: 45px;
  }

  .l-navbar{
    left: 0;
    padding: 1rem 1rem 0 0;
  }
  
  /*Show navbar desktop*/
  .show{
    width: calc(var(--nav-width) + 156px);
  }

  /*Add padding body desktop*/
  .body-pd{
    padding-left: calc(var(--nav-width) + 188px);
  }
}
</style>