<script setup lang="ts">
	import { ref, onMounted, watch } from 'vue';

	import type { Course } from 'celcat';
	import { toFormatHHMM, getDuration, colors, emojis } from '@/scripts/utils';
import { focusedCourse } from '@/scripts/timetable';

	const props = defineProps<{
		course: Course,
	}>();

	const isMobileViewport = ref<boolean>(false);

	const color = ref<string>('#314158')

	const calcColor = () => {
		if (Object.keys(colors).includes(props.course.type)) {
			color.value = colors[props.course.type]!
		} else {
			color.value = '#D29130'
		}
	}

	const calcEmoji = () => {
		if (Object.keys(emojis).includes(props.course.module)) {
			return emojis[props.course.module]!
		} else {
			return ''
		}
	}

	onMounted(() => {
		const mediaQuery = window.matchMedia('(max-width: 720px)');
		isMobileViewport.value = mediaQuery.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isMobileViewport.value = e.matches;
		};
		mediaQuery.addEventListener('change', handleChange);

		calcColor();
	});
</script>
<template>
	<section class="select-none fixed top-0 z-500 bg-slate-300/40 backdrop-blur-md w-screen h-screen p-4 dark:bg-slate-950/40 md:flex md:flex-col md:items-center md:justify-center">
		<div class="bg-white font-medium rounded-2xl shadow-2xl p-6 space-y-4 md:rounded-3xl md:min-w-1/2 md:p-8 lg:min-w-1/3 dark:bg-slate-900">
			<div class="flex items-center gap-2">
				<div class="flex items-center justify-center bg-slate-950/5 text-2xl rounded-full w-13 h-13 dark:bg-white/5">
					{{ calcEmoji()  }}
				</div>
				<div class="flex flex-col justify-center">
					<h2 class="text-lg font-bold -mt-1 -mb-1.5">{{ course.summary }}</h2>
					<span class="text-white/50 text-sm font-medium" :style="{ color: color }">{{ course.type }} - {{ course.module }}</span>
				</div>
			</div>
			<div>
				<p><span class="font-bold">Début:</span> {{ toFormatHHMM(new Date(course.start)) }}</p>
				<p><span class="font-bold">Fin:</span> {{ toFormatHHMM(new Date(course.end)) }}</p>
			</div>
			<div>
				<p class="max-w-lg"><span class="font-bold">Lieu:</span> {{ course.location || 'Inconnu' }}</p>
				<p class="max-w-lg"><span class="font-bold">Intervenant(s):</span> {{ course.teachers.join(', ') || "Inconnu" }}</p>
			</div>
			<button class="cursor-pointer block text-white text-sm font-bold rounded-full w-fit px-5 py-3 mx-auto" v-on:click="focusedCourse = null" :style="{ backgroundColor: color }">Fermer</button>
		</div>
	</section>
</template>