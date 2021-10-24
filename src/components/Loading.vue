<template>
  <div>
      <div id="loading" class="mx-auto"></div>`
  </div>
</template>

<script>

export default {
    name: 'loading'
}
</script>

<style>
#loading:empty {
    width: 230px;
    height: 250px; 
    cursor: progress; 
    background: 
    linear-gradient(0.25turn, transparent, #fff, transparent),
    linear-gradient(#eee, #eee),
    radial-gradient(38px circle at 19px 19px, #eee 50%, transparent 51%),
    linear-gradient(#eee, #eee);
    background-repeat: no-repeat;
    background-size: 315px 250px, 315px 180px, 100px 100px, 225px 30px;
    animation: loading 1.2s infinite;
}

@keyframes loading {  
  to {
    background-position: 315px 0, 0 0, 0 190px, 50px 195px;
  }
}

</style>