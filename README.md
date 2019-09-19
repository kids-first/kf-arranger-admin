<p align="center">
  <img src="docs/portal_logo.png" alt="Kids First Portal">
</p>
<p align="center">
  <a href="https://github.com/kids-first/kf-arranger-admin/blob/master/LICENSE"><img src="https://img.shields.io/github/license/kids-first/kf-arranger-admin.svg?style=for-the-badge"></a>
</p>

# Kids First Arranger Admin Service

This is an instantiation of the [@kfarranger/admin](https://github.com/kids-first/arranger/tree/master/modules/admin) application for the Kids First portal, with an integration with [Ego](https://github.com/overture-stack/ego) for authentication.

Arranger admin server provides a GraphQL API for configuring Arranger metadata that is used by [@kfarranger/server](https://github.com/kids-first/arranger/tree/master/modules/server). The API itself is consumed by [@kfarranger/admin-ui](https://github.com/kids-first/arranger/tree/master/modules/admin-ui).

## Development

- Installing dependencies: `npm install`
- Starting development: `npm run watch`

## Creating an Arranger project

To push the configurations so that Arranger uses them, we need to send them in ES using an HTTP `PUT` at the given url:

`http://{ES env}.kids-first.io:9200/arranger-projects-{project id}/arranger-projects-{project id}/{index name}`

- ES env: `kf-arranger-es-qa` in QA, `kf-arranger-es` in PRD.
- project id: the index that will be used
- index name: either `file_centric` or `participant_centric`

We need to be connected to Bastion to access ES endpoints.

E.g. to push in QA from the root of this repository:

```sh
curl -i -X PUT -H "Content-Type: application/json; charset=utf-8" -d @"mappings/file_centric.json" http://kf-arranger-es-qa.kids-first.io:9200/arranger-projects-2019_09_18/arranger-projects-2019_09_18/file_centric
```
