import jsonParser from './json.js';
import yamlParser from './yaml.js';

export default (fileExtension) => {
  switch (fileExtension) {
    case '.json': {
      return jsonParser;
    }
    case '.yaml': {
      return yamlParser;
    }
    case '.yml': {
      return yamlParser;
    }
    default: {
      throw Error('Для данного разширения парсера не найдено');
    }
  }
};
