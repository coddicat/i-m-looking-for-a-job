<template>
  <div class="description-item">
    <div class="description-item__heading">
      <slot name="heading"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors.scss';

.description-item {
  flex: 1;
  margin: 1.2rem 2rem;
  color: $secondary;

  &__heading {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: $foreground;
  }
}

@media (min-width: 1024px) {
  .description-item {
    margin: 1.6rem 2rem;
  }
}
</style>
