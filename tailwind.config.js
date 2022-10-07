/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "grey":"#373737",
                "bg-black": "#212121",
                "white": "#FFFFFF",
                "bg-white-dark": "#F2F6F9",
                "mustard": "#F6F0D8",
                "mustard-dark": "#C6B05D",
                "blue": "#E5F1FD",
                "blue-dark": "#5590C1",
                "violet": "#E5DEF0",
                "violet-dark": "#866FA7",
                "green": "#D6EDD9",
                "green-dark": "#5E9C80",
                "gray": "#E5E5E5",
                "red": "#F06464",
                "red-light":"#FFF4F4",
                "blue-night" : '#40617C',

            },
            backgroundImage: {
                'arraw': "url('../assets/down-arrow.png')",
                'arrawError':"url('../assets/down-arrow-red.png')",
            },

            fontFamily: {
                'sans': ['Montserrat', 'sans-serif']
            }
        },
        screens: {


            'xl': {'max': '1495px'},
            // => @media (max-width: 1279px) { ... }

            'lg': {'max': '1023px'},
            // => @media (max-width: 1023px) { ... }

            'md': {'max': '490px'},
            // => @media (max-width: 767px) { ... }

            'sm': {'max': '639px'},
            // => @media (max-width: 639px) { ... }
        },
    },
    plugins: [
        require('daisyui'),
    ],
}
