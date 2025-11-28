<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	import CrossIcon from '@/components/icons/CrossIcon.vue';

	import type { Course } from 'celcat';
	import type { Module } from '@/scripts/utils';

	import { toFormatHHMM, getDuration, colors, modules } from '@/scripts/utils';
	import { focusedCourse } from '@/scripts/timetable';

	const props = defineProps<{
		course: Course,
	}>();

	const module: Module = modules[props.course.module] || { title: props.course.module, emoji: '', short: props.course.module, description: '', coeff: 0 };

	const isMobileViewport = ref<boolean>(false);

	const color = ref<string>('#314158')

	const calcColor = () => {
		if (Object.keys(colors).includes(props.course.type)) {
			color.value = colors[props.course.type]!
		} else {
			color.value = '#D29130'
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
	<section class="select-none fixed top-0 z-500 bg-slate-300/60 backdrop-blur-md w-screen h-screen dark:bg-slate-950/60 md:flex md:flex-col md:items-center md:justify-center">
		<div class="bg-white font-medium shadow-2xl p-6 space-y-4 max-md:h-screen md:rounded-3xl md:min-w-1/2 md:p-8 lg:min-w-1/3 dark:bg-slate-900">
			<div class="flex items-center gap-2">
				<div class="shrink-0 flex items-center justify-center bg-slate-950/5 text-2xl rounded-full w-13 h-13 dark:bg-white/5">
					{{ module.emoji  }}
				</div>
				<div v-if="course.type == 'Réunion'" class="flex-1 flex flex-col justify-center">
					<h2 class="text-lg font-bold">{{ isMobileViewport ? module.short : course.summary }}</h2>
				</div>
				<div v-else class="flex-1 flex flex-col justify-center">
					<h2 class="text-lg font-bold -mt-1 -mb-1.5">{{ isMobileViewport ? module.short : course.summary }}</h2>
					<span class="text-white/50 text-sm font-semibold" :style="{ color: color }">{{ course.type }} - {{ course.module }}</span>
				</div>
				<div class="cursor-pointer flex items-center gap-1 bg-red-500 text-white text-sm font-semibold rounded-full p-1.5 duration-300 dark:bg-white/5 hover:scale-105" v-on:click="focusedCourse = null"><CrossIcon className="stroke-white stroke-3 w-3.5 h-3.5 dark:stroke-white/50" /></div>
			</div>
			<div>
				<p v-if="isMobileViewport"><span class="font-bold">Matière:</span> {{ course.summary }}</p>
			</div>
			<div>
				<p><span class="font-bold">Début:</span> {{ toFormatHHMM(new Date(course.start)) }}</p>
				<p><span class="font-bold">Fin:</span> {{ toFormatHHMM(new Date(course.end)) }}</p>
			</div>
			<div class="max-w-lg">
				<p><span class="font-bold">Lieu:</span> {{ course.location || 'Inconnu' }}</p>
				<p><span class="font-bold">Intervenant(s):</span> {{ course.teachers.join(', ') || "Inconnu" }}</p>
			</div>
			<div class="max-w-lg">
				<p class="font-bold">Description:</p>
				<p>{{ module.description }}</p>
			</div>
		</div>
	</section>
</template>