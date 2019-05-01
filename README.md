<p align="center">
  <img src="docs/portal_logo.png" alt="Kids First Portal">
</p>
<p align="center">
  <a href="https://github.com/kids-first/kf-arranger-admin/blob/master/LICENSE"><img src="https://img.shields.io/github/license/kids-first/kf-arranger-admin.svg?style=for-the-badge"></a>
</p>

# Kids First Arranger Admin Service

This is an instantiation of the [@kfarranger/admin](https://github.com/kids-first/arranger/tree/master/modules/admin) application for the Kids First portal, with an integration with [Ego](https://github.com/overture-stack/ego) for authentication.

Arranger admin server provides a GraphQL API for configuring Arranger metadata that is used by [@kfarranger/server](https://github.com/kids-first/arranger/tree/master/modules/server). The API itself is consumed by [@arranger/admin-ui](https://github.com/overture-stack/arranger/tree/master/modules/admin-ui).

## Development:

- Installing dependencies: `npm install`
- Starting development: `npm run watch`
