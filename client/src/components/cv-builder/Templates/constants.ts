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
                imgSrc: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=300&auto=format&fit=crop",
                description: "A clean, professional template with a modern design that puts your skills and experience front and center."
        },
        {
                id: 2,
                name: "Identity",
                preview: "",
                css: template02styles,
                fonts: `@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap');`,
                imgSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=300&auto=format&fit=crop",
                description: "A distinct, eye-catching template that showcases your personal brand and makes your CV stand out."
        },
        {
                id: 3,
                name: "Minimalist",
                preview: "",
                css: template01styles, // Reusing template 1 CSS for now
                fonts: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');`,
                imgSrc: "https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=300&auto=format&fit=crop",
                description: "A sleek, minimalist design that presents your information clearly without unnecessary distractions."
        },
        {
                id: 4,
                name: "Executive",
                preview: "",
                css: template02styles, // Reusing template 2 CSS for now
                fonts: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+Pro&display=swap');`,
                imgSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=300&auto=format&fit=crop",
                description: "A sophisticated template designed for senior professionals and executives highlighting leadership experience."
        },
        {
                id: 5,
                name: "Creative",
                preview: "",
                css: template01styles, // Reusing template 1 CSS for now
                fonts: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Lora&display=swap');`,
                imgSrc: "https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?q=80&w=300&auto=format&fit=crop",
                description: "A vibrant and distinctive template perfect for creative professionals and designers."
        }
];

export const A4_PAGE_SIZES_IN_PX = {
        WIDTH: 794,
        HEIGHT: 1123,
        MARGIN: 36,
};
