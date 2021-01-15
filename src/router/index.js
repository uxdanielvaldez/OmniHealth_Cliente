import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/dashboard.vue')
  },
  {
    path: '/seleccionarpaciente',
    name: 'Seleccionar Pacientes',
    component: () => import('../views/seleccionarpacientes.vue')
  },
  {
    path: '/crearpaciente',
    name: 'Crear Paciente',
    component: () => import('../views/crearpaciente.vue')
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: () => import('../views/pacientes.vue')
  },
  {
    path: '/agendarcita/:_id',
    name: 'Agendar Cita',
    component: () => import('../views/agendarcita.vue')
  },
  { 
    path: '/meeting/:idmeeting/:id',
    name: 'Meeting',
    component: () => import('../views/meeting.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/editarpaciente/:id/:identificacion',
    name: 'Editar Paciente',
    component: () => import('../views/editarpaciente.vue')
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: () => import('../views/configuracion.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/calendar.vue')
  },
  {
    path: '/calendar2',
    name: 'Calendar',
    component: () => import('../views/calendar2.vue')
  },
  {
    path: '/cuenta',
    name: 'Cuenta',
    component: () => import('../views/configuracion2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
