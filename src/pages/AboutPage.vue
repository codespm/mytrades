<template>
  <div class="py-2 text-white text-opacity-75">
     Esta aplicación web surgio a partir del aporte de dos usuarios de la <a class="text-warning" href="https://comunidad.criptonautas.co/" target="_blank">comunidad criptonautas</a>,
     uno para su uso personal por Franco (User) y el otro por Matias (Founder) este último el que se utiliza en el curso.
    <br/>
    <br/>
    La información se almacena en el navegador web, es decir, solo es accesible desde el dispositivo donde se cargue la misma, recomiendo
    resguardarla cada determinado tiempo accediendo al menu data en la grilla de sus respectivos trades.
    <br/>
    <br/>
    Comentarios y/o sugerencias mediante la comunidad.<br/>
    <br/>
    Repositorio del proyecto: <a class="text-warning" href="https://github.com/criptonautas/mytrades" target="_blank">https://github.com/criptonautas/mytrades</a>
  </div>
</template>

<script>
import usePage from '@/composables/usePage'

export default {
  name: 'AboutPage',
  setup () {
    usePage({ title: 'About' })
  }
}
</script>