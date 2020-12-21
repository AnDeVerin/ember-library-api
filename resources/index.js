import author from './author';
import book from './book';
import review from './review';

const resources = {
  author,
  book,
  review,
};

const serialize = (type, model) => {
  const resource = resources[type];
  const data = Array.isArray(model) ? model.map(resource) : resource(model);

  return { data };
};

export default serialize;
