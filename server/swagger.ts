import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';

const endpointsFiles = [
  './routes/index.ts', // добавляем index.js в список файлов
];

const swaggerOptions = {
  // задаем шаблон поиска файлов
  globPattern: '**/*.route.ts',
};

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions);
