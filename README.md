# site
[![Build Status](https://travis-ci.org/eventzimmer/site.svg?branch=master)](https://travis-ci.org/eventzimmer/site)  [![Netlify Status](https://api.netlify.com/api/v1/badges/8e79b99b-f520-4f98-88a4-d59faff69c4c/deploy-status)](https://app.netlify.com/sites/tender-boyd-d507c4/deploys)

eventzimmer is an aggregation service that let's you display events aggregated from different channels. 

It is location-aware and the perfect fit for your community. If you'd like to have a centralized place to display everything, you've come to the right place.

The `site` repository contains all source code for the website displayed at [eventzimmer.de](https://eventzimmer.de)

## Getting started

We're always happy for suggestions, improvements, and hunting down bugs. You've made the first step by reading this `README`. Congratz :sparkles:

`site` is based on:
- [Vue](http://vuejs.org)
- [Bootstrap](https://getbootstrap.com/)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Below instructions will give you a local version of `site` up and running, assuming that you have `node` and `npm` installed:

```
git clone https://github.com/eventzimmer/site.git
cd site/
npm install
VUE_APP_ENDPOINT=https://api.eventzimmer.de npm run serve
```

To build a production version of `site`:
```
VUE_APP_ENDPOINT=https://api.eventzimmer.de npm run build
cd dist/
python3 -m http.server # will serve a version of the website on http://localhost:8080
```

`site` is a `vue-cli` based project. A full reference can be found [in their documentation](https://cli.vuejs.org/config/).

If you feel ready for submitting your changes, please read our [contribution guidelines](https://github.com/eventzimmer/schema/blob/master/CONTRIBUTING.md).

All pull requests run tests through [Travis](https://travis-ci.org), and deploy to [Netlify](https://netlify.com). This ensures that both quality standards are met, and software also works in production.

On the upside you can test your pull request right from GitHub, without further ado.

### Running a local backend

You may have noticed the `VUE_APP_ENDPOINT` environment variable. This instructs `site` to load events from the given endpoint.
The default for this variable is `localhost:3000`. In order to use the local backend, please have a look at the [schema manual](https://github.com/eventzimmer/schema/blob/master/SETUP.md), in order to set it up.
