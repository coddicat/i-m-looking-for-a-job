<template>
  <div class="description-item">
      <div class="description-item__heading">
        <slot name="heading"></slot>
      </div>
      <slot></slot>
  </div>
</template>

<style lang="scss">
.description-item {
  flex: 1;
  margin-top: 2rem;
  margin-left: 1rem;

  &__heading {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
  }
}

@media (min-width: 1024px) {
  .description-item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
