import SQLite from 'react-native-sqlite-storage';

export const getCategories = domainsWithHits => {
  SQLite.enablePromise(true);
  const domains = Object.keys(domainsWithHits).map(domain => `'${domain}'`);
  const query = `SELECT domain, category FROM domains WHERE domain IN (${domains.join(', ')})`;

  return SQLite.openDatabase({ name: 'blacklist', createFromLocation: 1 }).then(db =>
    db.executeSql(query).then(results => results[0])
  ).then(results => {
    const categories = {};

    for (let i = 0; i < results.rows.length; i++) {
      const { domain, category } = results.rows.item(i);
      if (!categories[domain]) {
        categories[domain] = [category];
      } else if (categories[domain].indexOf(category) !== -1) {
        // Duplicate
      } else {
        categories[domain].push(category);
      }
    }

    Object.keys(domainsWithHits).forEach(domain => {
      if (!categories[domain]) {
        categories[domain] = [];
      }
    });

    return categories;
  });
};
