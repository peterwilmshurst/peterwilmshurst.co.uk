<template>
  <main id="container">
    <img id="svgImage" class="logo" src="@/assets/logo.svg" alt="Wilmshurst_">
  </main>
</template>

<script lang="ts">
window.addEventListener('mousemove', function (event: MouseEvent) {
  const x = (event.pageX - window.innerWidth / 2) / 20;
  const y = (event.pageY - window.innerHeight / 2) / -20;

  const svgImage = document.getElementById('svgImage');

  if(svgImage instanceof HTMLElement) {
    svgImage.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  }
});
</script>

<style scoped>
#container {
  position: relative;
  width: 500px;
  height: 500px;
  perspective: 1000px;
}

#svgImage {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}
</style>
