<script setup lang="ts">
	defineProps<{
		color: string
	}>()
</script>
<template>
	<svg data-slot="icon" aria-hidden="true" :stroke="color" stroke-width="3px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
	</svg>
</template>