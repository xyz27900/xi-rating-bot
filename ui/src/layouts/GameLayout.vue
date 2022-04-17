<template>
  <div class="h-full max-w-screen-sm mx-auto p-4 flex flex-col">
    <div class="flex flex-col justify-center flex-grow">
      <div class="flex flex-col items-center gap-4">
        <slot />
      </div>
    </div>

    <div class="flex-shrink-0">
      <slot name="footer" />
    </div>
  </div>
</template>
