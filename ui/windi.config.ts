import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  safelist: [
    'bg-blue', 'bg-gray', 'bg-green', 'bg-red', 'bg-yellow',
    'bg-gray-light', 'bg-green-light', 'bg-red-light', 'bg-yellow-light',
    'border-gray', 'border-green', 'border-red', 'border-yellow',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#3867d6',
        },
        gray: {
          light: '#dcdfe4',
          DEFAULT: '#718093',
        },
        green: {
          light: '#bfe4cc',
          DEFAULT: '#009432',
        },
        red: {
          light: '#f9d0c5',
          DEFAULT: '#e84118',
        },
        yellow: {
          light: '#fff0c4',
          DEFAULT: '#ffc312',
        },
      },
    },
    gridTemplateRows: {
      6: 'repeat(6, 3rem)',
    },
    gridTemplateColumns: {
      6: 'repeat(6, 3rem)',
    },
  },
});
