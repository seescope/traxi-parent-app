// Has the kid been using their device too much before 7AM and after 10PM?
export const checkTime = (time) => {
  // Good times are after 7AM and before 10PM.
  const GOOD_TIME = [
    'h7',
    'h8',
    'h9',
    'h10',
    'h11',
    'h12',
    'h13',
    'h14',
    'h15',
    'h16',
    'h17',
    'h18',
    'h19',
    'h20',
    'h21',
  ];

  const goodTimeHits = Object.keys(time)
    .filter(t => GOOD_TIME.indexOf(t) !== -1)
    .map(h => time[h])
    .reduce((a, b) => a + b, 0);

  // What's the average amount of hits per hour the kid had during the day?
  const averageGoodTimeHits = goodTimeHits / GOOD_TIME.length;

  // During any of the "bad" hours, did the kid get more hits than the average "good" amount?
  const badTimes = Object.keys(time)
    .filter(t => GOOD_TIME.indexOf(t) === -1)
    .filter(t => time[t] > averageGoodTimeHits);

  // If there were any bad hours, the verdict is bad.
  const status = badTimes.length === 0 ? 'good' : 'bad';

  return {
    status,
    badTimes,
    time,
  };
};

// Has the kid been attempting to visit any porn domains?
export const checkInappropriate = (domainsWithHits, categories) => {
  const inappropriateDomains = Object.keys(domainsWithHits)
    .filter(d => categories[d].indexOf('adult') !== -1);

  // If there are ANY porn domains, the verdict is bad.
  const status = inappropriateDomains.length === 0 ? 'good' : 'bad';

  return {
    status,
    inappropriateDomains,
  };
};

// Has the kid been using social media excessively?
export const checkSocialMedia = (domainsWithHits, categories) => {
  const domains = Object.keys(domainsWithHits);
  const socialMediaDomains = domains
    .filter(d => categories[d].indexOf('social_networks') !== -1);

  // What's the total amount of hits on social media domains?
  const socialMediaHits = socialMediaDomains
    .map(d => domainsWithHits[d])
    .reduce((a, b) => a + b, 0);

  // What were the total hits for ALL domains?
  const allHits = domains
    .map(d => domainsWithHits[d])
    .reduce((a, b) => a + b, 0);

  // What percentage of hits were for social media domains?
  const socialMediaPercentage = socialMediaHits / allHits;

  // If the kid spent more than 50% of their hits on social media, the verdict is bad.
  const status = socialMediaPercentage < 0.5 ? 'good' : 'bad';

  return {
    socialMediaPercentage,
    status,
  };
};

export const sanitiseDomains = domains => {
  if (domains === null || typeof(domains) === 'undefined') {
    return null;
  }

  const sanitisedDomains = {};

  Object.keys(domains).forEach(d => {
    const sanitisedDomain = decodeURI(d);
    sanitisedDomains[sanitisedDomain] = domains[d];
  });

  return sanitisedDomains;
};
