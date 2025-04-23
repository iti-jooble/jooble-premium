import { Education, Experience, Skill } from "@shared/schema";

export const atLeastOneFieldExists = (
	data: (Experience | Education | Skill)[],
): boolean =>
	!!data &&
	data.length > 0 &&
	(typeof data[0] === "string"
		? data.some((item) => !!item)
		: !!data.some((item) =>
				Object.values(item).some(
					(value) =>
						!!value &&
						typeof value === "string" &&
						value !== "0" &&
						value !== "-1",
				),
			));

export const sortExperiences = (experiences: Experience[]): Experience[] =>
	[...experiences].sort((a, b) =>
		a.isCurrent && !b.isCurrent
			? -1
			: parseInt(b.startYear) - parseInt(a.startYear),
	);
