<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  max-width: 500px;

  &.limited-width {
    width: 90%;
  }
}
@media screen and (min-width: 1350px) {
  .container {
    width: calc(100% - 40px);
  }
}
@media (min-width: 950px) and (max-width: 1349px) {
  .container {
    max-width: 930px;
  }
}

@media (min-width: 1350px) {
  .container {
    max-width: 1300px;
  }
}
</style>
