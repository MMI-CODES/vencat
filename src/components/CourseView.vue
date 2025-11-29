<script setup lang="ts">
	import { ref, onMounted, watch } from 'vue';

	import type { Course } from 'celcat';
	import type { Module } from '@/scripts/utils';

	import { toFormatHHMM, getDuration, colors, modules } from '@/scripts/utils';
	import { maxScreen, isDark } from '@/scripts/media';
	import { focusedCourse } from '@/scripts/timetable';

	const props = defineProps<{
		course: Course,
		index: number
	}>();

	const module: Module = modules[props.course.module] || { title: props.course.module, emoji: '', short: props.course.module, description: '', coeff: 0 };

	const size = ref<number>(0)
	const marginTop = ref<number>(0)
	const color = ref<string[]>(colors['unknown']!)

	const calcSize = () => {
		if (maxScreen('xs')) {
			if (props.course.type == 'pause') size.value = 0
			else if (props.course.type == 'lunch') size.value = 64
			else size.value = 112
		} else {
			let duration = getDuration(props.course.start, props.course.end)

			if (duration >= 1.5) size.value = 80 * getDuration(props.course.start, props.course.end) - 8 // -8 for the padding
			else size.value = 80 - 8 // same
		}
	}

	const calcMargin = () => {
		if (props.index != 0) {
			marginTop.value = 0
			return
		}

		let morning = new Date(
			props.course.start.getFullYear(),
			props.course.start.getMonth(),
			props.course.start.getDate(),
			8
		)

		let unit = getDuration(morning, props.course.start)
		let multiplier = maxScreen('xs') ? 0 : 80

		marginTop.value = unit * multiplier
	}

	const calcColor = () => {
		if (props.course.type == 'pause') {
			color.value = colors['pause']!
		} else if (props.course.end < new Date()) {
			color.value = colors['finished']!
		} else {
			color.value = colors[props.course.type] || colors['unknown']!
		}
	}

	onMounted(() => {
		calcSize();
		calcColor();
		calcMargin();
	});
</script>
<template>
	<div class="select-none py-1 duration-500 hover:scale-102" :style="{ marginTop: marginTop + 'px' }">
		<div
			v-if="course.type == 'pause'"
			:style="{ height: size  + 'px' }"
		></div>

		<div
			v-else-if="course.type == 'lunch'"
			class="flex bg-[#31415850] text-white rounded-[20px] w-full overflow-hidden"
			:style="{ cursor: maxScreen('xs') ? 'pointer' : 'default', opacity: +!!maxScreen('xs'), height: size + 'px' }"
		>
			<div class="w-8 h-full p-3 overflow-hidden">
				<div class="rounded-full h-full" :style="{ backgroundColor: color[isDark() ? 2 : 4], opacity: isDark() ? .5 : 1 }"></div>
			</div>
			<div class="flex-1 py-2 pr-4">
				<div class="flex items-center gap-1 h-full">
					<div class="text-2xl">{{ module.emoji }}</div>
					<h3 class="grow font-black line-clamp-1">{{ module.short }}</h3>
					<span class="text-sm font-semibold line-clamp-1">{{ toFormatHHMM(new Date(course.start)) }} - {{ toFormatHHMM(new Date(course.end)) }}</span>
				</div>
			</div>
		</div>

		<div v-else class="cursor-pointer flex text-white rounded-[20px] w-full overflow-hidden" :style="{ backgroundColor: color[isDark() ? 3 : 5], color: isDark() ? 'white' : color[3], height: size + 'px' }" v-on:click="focusedCourse = course">
			<div class="w-8 h-full p-3 overflow-hidden">
				<div class="rounded-full h-full" :style="{ backgroundColor: color[isDark() ? 2 : 4], opacity: isDark() ? .5 : 1 }"></div>
			</div>
			<div class="flex-1 py-2 pr-4">
				<div class="flex items-center gap-2">
					<span class="bg-slate-950/5 text-xs font-semibold truncate rounded-lg max-w-16 px-2 py-1" :style="{ backgroundColor: color[isDark() ? 2 : 4] + '50' }">{{ course.location.split('-')[0]!.trim() || "Salle Inconnue" }}</span>
					<span class="flex-1 text-xs text-center font-semibold py-1">{{ module.emoji }} {{ course.module }}</span>
					<span class="text-sm font-semibold line-clamp-1">{{ toFormatHHMM(new Date(course.start)) }} - {{ toFormatHHMM(new Date(course.end)) }}</span>
				</div>
				<div>
					<h3 class="font-black line-clamp-1">{{ module.short }}</h3>
					<span v-if="getDuration(course.start, course.end) >= 1.5 || maxScreen('xs')" class="text-sm font-semibold line-clamp-1">
						<span v-if="course.teachers.length == 1">{{ course.teachers[0] }}</span>
						<span v-else>{{ course.teachers.length }} intervenants</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
