import inquirer from 'inquirer';
import fs from 'fs';
import Color from 'color';

function generateLogo() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter text to include in the logo (up to three characters)',
        validate: (input) => {
          if (input.length <= 3) {
            return true;
          }
          return 'Enter three characters only.';
        },
      },
      {
        type: 'input',
        name: 'color',
        message: 'Enter the color for the logo (color keyword or hexidecimal number)',
        validate: (input) => {
          const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
          if (input.match(hexRegex) || Color(input).hex() !== '#00000000') {
            return true;
          }
          return 'Enter a valid color (color keyword or hexidecimal number).';
        },
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for the logo',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the color for the shape (color keyword or hexidecimal number)',
        validate: (input) => {
          const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
          if (input.match(hexRegex) || Color(input).hex() !== '#00000000') {
            return true;
          }
          return 'Please enter a valid color (color keyword or hexidecimal number).';
        },
      },
    ])
    .then((answers) => {
      const { text, color, shape, shapeColor } = answers;

      // create the SVG file
      const shapeMarkup = getShapeMarkup(shape, shapeColor);
      const svg = 
          `<svg width="300" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              ${shapeMarkup}
              <text x="50%" y="50%" font-size="30" fill="${color}" text-anchor="middle" dominant-baseline="middle">${text}</text>
            </svg>`;

      fs.writeFileSync('logo.svg', svg);

      console.log('Generated logo.svg');
    });
}

function getShapeMarkup(shape, color) {
  switch (shape) {
    case 'circle':
      return getCircleMarkup(color);
    case 'triangle':
      return getTriangleMarkup(color);
    case 'square':
      return getSquareMarkup(color);
    default:
      return '';
  }
}

function getCircleMarkup(color) {
  return `<circle cx="50" cy="50" r="40" fill="${color}" />`;
}

function getTriangleMarkup(color) {
  return `<polygon points="10,90 50,10 90,90" fill="${color}" />`;
}

function getSquareMarkup(color) {
  return `<rect x="10" y="10" width="80" height="80" fill="${color}" />`;
};

generateLogo();
