<script setup lang="ts">
	import { ref, onMounted, watch } from 'vue';

	import type { Course } from 'celcat';
	import { toFormatHHMM, colors, getDuration } from '@/scripts/utils';

	const props = defineProps<{
		course: Course,
		index: number
	}>();

	const isMobileViewport = ref<boolean>(false);

	const size = ref<number>(0)
	const marginTop = ref<number>(0)
	const color = ref<string>('#314158')

	const calcSize = () => {
		if (isMobileViewport.value) {
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
		let multiplier = isMobileViewport.value ? 0 : 80

		marginTop.value = unit * multiplier
	}

	const calcColor = () => {
		if (props.course.type == 'pause') {
			color.value = 'transparent'
		} else if (props.course.end < new Date()) {
			color.value = '#31415850'
		} else if (Object.keys(colors).includes(props.course.type)) {
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

		calcSize();
		calcColor();
		calcMargin();
	});

	watch(isMobileViewport, () => {
		calcSize();
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
			class="flex bg-slate-900 text-white rounded-[20px] w-full gap-1 overflow-hidden"
			:style="{ cursor: isMobileViewport ? 'pointer' : 'default', opacity: +!!isMobileViewport, height: size + 'px' }"
		>
			<div class="bg-slate-950/10 w-4 h-full overflow-hidden">
				<div
					v-for="(item, idx) in 18"
					:key="idx"
					:style="{ backgroundColor: idx % 2 === 0 ? '#00000024' : 'transparent'}"
					class="h-2"
				></div>
			</div>
			<div class="flex-1 p-2 pr-4">
				<div class="flex items-center h-full">
					<h3 class="font-black line-clamp-1">{{ course.summary }}</h3>
					<div class="grow"></div>
					<span class="text-sm font-semibold line-clamp-1">{{ toFormatHHMM(new Date(course.start)) }} - {{ toFormatHHMM(new Date(course.end)) }}</span>
				</div>
			</div>
		</div>

		<div v-else class="cursor-pointer flex text-white rounded-[20px] w-full overflow-hidden" :style="{ backgroundColor: color, height: size + 'px' }">
			<div class="bg-slate-950/10 w-4 h-full overflow-hidden">
				<div
					v-for="(item, idx) in getDuration(course.start, course.end) * 10"
					:key="idx"
					:style="{ backgroundColor: idx % 2 === 0 ? '#00000024' : 'transparent'}"
					class="h-2"
				></div>
			</div>
			<div class="flex-1 p-2 pr-4">
				<div class="flex items-center">
					<span class="bg-slate-950/5 text-xs font-semibold truncate rounded-lg px-2 py-1">{{ course.location.split('-')[0]!.trim() || "Salle Inconnue" }}</span>
					<div class="grow"></div>
					<span class="text-sm font-semibold line-clamp-1">{{ toFormatHHMM(new Date(course.start)) }} - {{ toFormatHHMM(new Date(course.end)) }}</span>
				</div>
				<div class="pl-1">
					<h3 class="font-black line-clamp-1">{{ course.summary }}</h3>
					<span v-if="getDuration(course.start, course.end) >= 1.5 || isMobileViewport" class="text-sm font-semibold line-clamp-1">{{ course.teachers.join(', ') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
