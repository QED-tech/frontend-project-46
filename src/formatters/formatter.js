import stylish from './stylish.js';
import plain from './plain.js';

const format = (ast, formatForPresent) => {
  switch (formatForPresent) {
    case 'stylish': {
      return stylish(ast);
    }

    case 'plain': {
      return plain(ast);
    }

    default: {
      throw new Error('undefined format');
    }
  }
};

export default format;
