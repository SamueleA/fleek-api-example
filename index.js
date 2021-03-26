const express = require('express');
const fetch = require("node-fetch");

const app = express();

app.get('/site/:slug', (req, res) => {
  const variables = {
      slug: req.params.slug,
  };

  fetch("https://api.fleek.co/graphql", {
    method: "POST",
    headers: {
      authorization: process.env.FLEEK_HOSTING_API_KEY
    },
    body: JSON.stringify({
      query: `
        query getSiteBySlug($slug: String!) {
          getSiteBySlug(slug: $slug) {
            id
            teamId
            name
            slug
          }
        }
      `,
      variables,
    })
  })
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    res.send(data);
  })
  .catch((e) => console.error(e));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log('server started on port', PORT);
});
