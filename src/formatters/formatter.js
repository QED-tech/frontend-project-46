import stylish from './stylish.js';

const format = (ast, formatForPresent) => {
  switch (formatForPresent) {
    case 'stylish': {
      return stylish(ast);
    }

    default: {
      throw new Error('undefined format');
    }
  }
};

export default format;
