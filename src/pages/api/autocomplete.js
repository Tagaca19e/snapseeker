import SerpApi from 'google-search-results-nodejs';

export default async function (req, res) {
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
  const params = {
    engine: 'google',
    q: req.body,
    location: 'United States',
    google_domain: 'google.com',
    gl: 'us',
    hl: 'en',
    tbm: 'shop',
    safe: 'active',
    device: 'mobile',
  };

  const callback = function (data) {
    const relatedSearches = data['people_also_search_for'];
    res.status(200).json({ relatedSearches });
  };

  // Show result as JSON.
  // search.json(params, callback);

  // TEST response to avoid hitting Serp API limit.
  const data = {
    relatedSearches: [
      {
        text: 'coffee cup',
        highlighted_words: ['coffee', 'cup'],
        link: 'https://www.google.com/search?hl=en-US&gl=us&tbm=shop&q=coffee+cup&sa=X&ved=0ahUKEwjDspPqhL7-AhWYRTABHWw0ATMQnsYHCPYZ',
        serpapi_link:
          'https://serpapi.com/search.json?device=mobile&engine=google_shopping&gl=us&google_domain=google.com&hl=en&location=United+States&q=coffee+cup&tbm=shop',
      },
      {
        text: 'espresso coffee',
        highlighted_words: ['espresso', 'coffee'],
        link: 'https://www.google.com/search?hl=en-US&gl=us&tbm=shop&q=espresso+coffee&sa=X&ved=0ahUKEwjDspPqhL7-AhWYRTABHWw0ATMQnsYHCPcZ',
        serpapi_link:
          'https://serpapi.com/search.json?device=mobile&engine=google_shopping&gl=us&google_domain=google.com&hl=en&location=United+States&q=espresso+coffee&tbm=shop',
      },
      {
        text: 'cappuccino coffee',
        highlighted_words: ['cappuccino', 'coffee'],
        link: 'https://www.google.com/search?hl=en-US&gl=us&tbm=shop&q=cappuccino+coffee&sa=X&ved=0ahUKEwjDspPqhL7-AhWYRTABHWw0ATMQnsYHCPgZ',
        serpapi_link:
          'https://serpapi.com/search.json?device=mobile&engine=google_shopping&gl=us&google_domain=google.com&hl=en&location=United+States&q=cappuccino+coffee&tbm=shop',
      },
      {
        text: 'coffee mug',
        highlighted_words: ['coffee', 'mug'],
        link: 'https://www.google.com/search?hl=en-US&gl=us&tbm=shop&q=coffee+mug&sa=X&ved=0ahUKEwjDspPqhL7-AhWYRTABHWw0ATMQnsYHCPkZ',
        serpapi_link:
          'https://serpapi.com/search.json?device=mobile&engine=google_shopping&gl=us&google_domain=google.com&hl=en&location=United+States&q=coffee+mug&tbm=shop',
      },
      {
        text: 'caramel coffee',
        highlighted_words: ['caramel', 'coffee'],
        link: 'https://www.google.com/search?hl=en-US&gl=us&tbm=shop&q=caramel+coffee&sa=X&ved=0ahUKEwjDspPqhL7-AhWYRTABHWw0ATMQnsYHCPoZ',
        serpapi_link:
          'https://serpapi.com/search.json?device=mobile&engine=google_shopping&gl=us&google_domain=google.com&hl=en&location=United+States&q=caramel+coffee&tbm=shop',
      },
      {
        text: 'filter coffee',
        highlighted_words: ['filter', 'coffee'],
        link: 'https://www.google.com/search?hl=en-US&gl=us&tbm=shop&q=filter+coffee&sa=X&ved=0ahUKEwjDspPqhL7-AhWYRTABHWw0ATMQnsYHCPsZ',
        serpapi_link:
          'https://serpapi.com/search.json?device=mobile&engine=google_shopping&gl=us&google_domain=google.com&hl=en&location=United+States&q=filter+coffee&tbm=shop',
      },
    ],
  };
  res.status(200).json({ relatedSearches: data.relatedSearches });
}
