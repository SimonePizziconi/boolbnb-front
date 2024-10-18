/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx,scss}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  // Configura i percorsi dei file da cui Tailwind dovrebbe estrarre le classi per ottimizzare il CSS
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      // Estendi la palette dei colori per includere colori personalizzati
      colors: {
        primary: '#292929',    // Colore primario personalizzato
        secondary: '#006D77',  // Colore secondario personalizzato
        accent: '#556B2F',     // Colore di accento personalizzato
        background: '#D9D9D9',
        neutral: '#F0F0F0'
        
      },
      // Aggiungi spaziature personalizzate per margini, padding, ecc.
      spacing: {
        '72': '18rem',  // Aggiungi una spaziatura personalizzata di 18rem
        '84': '21rem',  // Aggiungi una spaziatura personalizzata di 21rem
        '96': '24rem',  // Aggiungi una spaziatura personalizzata di 24rem
      },
      // Configura font personalizzati per il progetto
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],  // Aggiungi o sostituisci i font sans-serif
        serif: ['Merriweather', 'serif'],         // Aggiungi o sostituisci i font serif
      },
      // Aggiungi raggi di bordi personalizzati
      borderRadius: {
        'xl': '1.5rem', // Aggiungi un raggio di bordi di 1.5rem
      },
      // Aggiungi animazioni personalizzate
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Aggiungi un'animazione "spin" lenta
      },
      // Definisci keyframes personalizzati per le animazioni
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },  // Inizia e termina con una rotazione di -3 gradi
          '50%': { transform: 'rotate(3deg)' },        // A metà animazione ruota a 3 gradi
        },
      },
    },
  },
  // Aggiungi plugin ufficiali di Tailwind CSS per funzionalità aggiuntive
  plugins: [
    require('@tailwindcss/forms'),       // Aggiunge stili predefiniti per i form
    require('@tailwindcss/typography'),  // Aggiunge stili predefiniti per la tipografia
    require('@tailwindcss/aspect-ratio'), // Aggiunge classi per gestire il rapporto tra larghezza e altezza
    require('@tailwindcss/container-queries'),
  ],
  // Configura la modalità scura
  darkMode: 'class', // 'media' per attivarla in base alle impostazioni di sistema, 'class' per attivarla manualmente
}


