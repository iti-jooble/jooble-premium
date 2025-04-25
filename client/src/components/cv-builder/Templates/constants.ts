/* eslint-disable import/no-webpack-loader-syntax */
import template01styles from "./01/template.raw.css?raw";

import template02styles from "./02/template.raw.css?raw";

export const TEMPLATES = [
	{
		id: 1,
		name: "Mastery",
		preview: "",
		css: template01styles,
		fonts: `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@700&display=swap');`,
		imgSrc: "/images/cvTemplates/1.png",
	},
	{
		id: 2,
		name: "Identity",
		preview: "",
		css: template02styles,
		fonts: `@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap');`,
		imgSrc: "/images/cvTemplates/2.png",
	},
];

export const A4_PAGE_SIZES_IN_PX = {
	WIDTH: 794,
	HEIGHT: 1123,
	MARGIN: 36,
};
