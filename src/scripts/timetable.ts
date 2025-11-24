import type { Course } from "celcat";
import { Timetable } from "celcat";

import { getDuration } from "./utils";

const tt = new Timetable()

export async function loadWeek(group_id: string, startDate: Date) {
	try {
		const weekStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1 - startDate.getDay());
		const weekEnd = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7 - startDate.getDay());

		const courses: Course[] = await tt.getTimetable(group_id, weekStart, weekEnd);

		const tempDays: Course[][] = [[], [], [], [], [], [], []];

		if (!courses || courses.length === 0) {
			return tempDays;
		}

		let lastCourse: Course = {
			uid: 'matin',
			type: 'pause',
			summary: "Matin",
			start: new Date(
				courses[0]!.start.getFullYear(),
				courses[0]!.start.getMonth(),
				courses[0]!.start.getDate(),
				7
			),
			end: courses[0]!.start,
			teachers: [],
			location: '',
			module: ''
		} as Course

		courses.forEach(course => {
			const dayIndex = (new Date(course.start).getDay() + 6) % 7;

			let duration = lastCourse ? getDuration(lastCourse.end, course.start) : 0
			let isLunch = duration > 0 && (lastCourse.end.getHours() >= 11 && course.start.getHours() <= 14)

			if (duration > 0 && lastCourse.end.getDate() == course.start.getDate()) {
				tempDays[dayIndex]!.push({
					uid: '',
					type: isLunch ? 'lunch' : 'pause',
					summary: isLunch ? "Déjeuner" : "Pause",
					start: lastCourse.end,
					end: course.start,
					teachers: [],
					location: '',
					module: isLunch ? 'lunch' : 'pause'
				} as Course)
			}

			tempDays[dayIndex]!.push(course);
			lastCourse = course
		});

		return tempDays;
	} catch (error) {
		console.error('Error loading week:', error);
		return [[], [], [], [], [], [], []];
	}
}