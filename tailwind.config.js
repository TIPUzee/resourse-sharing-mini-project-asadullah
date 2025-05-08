/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        require('@spartan-ng/brain/hlm-tailwind-preset')
    ],
    content: [
        './src/**/*.{html,js,ts}',
        './libs/**/*.{html,ts,js}'
    ],
    theme: {
        extend: {
        },
    },
    plugins: [],
}
