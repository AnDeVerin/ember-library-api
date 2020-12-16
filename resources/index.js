import author from './author';
import book from './book';

const resources = {
  author,
  book,
};

const serialize = (type, model) => {
  const resource = resources[type];
  const data = Array.isArray(model) ? model.map(resource) : resource(model);

  return { data };
};

export default serialize;
