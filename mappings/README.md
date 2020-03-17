# Mappings

This file gives some insight on the meaning of each configuration available in the index mapping files.

## `config`

This part contains the definition of every object available, their fields, their relations, along with some fields that controls some UI components.

### `aggs-state`

Controls the availability of fields in the Facets View of the File Repository and in the "Browse All" feature.

> ⚠ WARNING ⚠
>
> The content of the Facets panel is currently overridden by the content of the `src/components/FileRepo/AggregationSidebar/aggsConfig.js` file, because Arranger can't display more than one list of facets.
>
> The "Browse All" function as intended and is not influenced by the content of the file mentioned above.

The order of the fields here determines the order of the fields in the Facets View.

E.g.

```json
{
  "field": "participants__study__short_name",
  "show": true,
  "active": true,
  "type": "Aggregations"
},
```

#### state.field`::String`

The path to the field in the index that this file defines on which to create an aggregation to filter on. The `object__object__field` notation is used here.

#### state.show`::boolean`

Displays the facet in the portal’s facet panel.

#### state.active

Type: `boolean`

Displays the field in the "Browse All" feature of the File Repository.

#### state.type

Which kind of aggregation is used for this filter.

Type: `string`

Value: `Aggregations | NumericAggregations`

> I.e. One of the value from `arranger/modules/schema/src/Aggregations.js`.

### `columns-state`

### `matchbox-state`

### `extended`

# Creating a project

The mapping files needs to be pushed in ES in order for the project to be created.

Pushing the mappings creates a *project*, which is what we map to from kf-portal-ui using the `REACT_APP_PROJECT_ID` environment variable.

## Pushing the mapping files to ES

To push the configurations so that Arranger uses them, we need to send them in ES using an HTTP `PUT` at the given url:

`http://{ES env}.kids-first.io:9200/arranger-projects-{project id}/arranger-projects-{project id}/{index name}`

- ES env: `kf-arranger-es-qa` in QA, `kf-arranger-es-prd` in PRD.
- project id: the index that will be created. Use the same value for both indices. By convention, that should be "`<commitID>-YYYY_MM_DD_v1`", and increment from there if you need to push many times in a day. You can push over an existing index, so be careful.
  > 💡 Use only alphanumerical characters and underscore for the project ID.
- index name: either `file_centric` or `participant_centric`

You may also use a tool like *Postman* instead.

You need to be connected to Bastion to access ES endpoints.

E.g. to push a project `my_project` on QA:

```sh
curl -i -X PUT -H "Content-Type: application/json; charset=utf-8" -d @"mappings/participant_centric.json" http://kf-arranger-es-qa.kids-first.io:9200/arranger-projects-my_project/arranger-projects-my_project/participant_centric

curl -i -X PUT -H "Content-Type: application/json; charset=utf-8" -d @"mappings/file_centric.json" http://kf-arranger-es-qa.kids-first.io:9200/arranger-projects-my_project/arranger-projects-my_project/file_centric
```

The result should look like this after the first one:

```json
{
  "_index": "arranger-projects-my_project",
  "_type": "arranger-projects-my_project",
  "_id": "participant_centric",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 1
}
```

... and this after the second one (notice the value of `_id` and `_shards.successful` has changed):

```json
{
  "_index": "arranger-projects-my_project",
  "_type": "arranger-projects-my_project",
  "_id": "file_centric",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 2,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 1
}
```
