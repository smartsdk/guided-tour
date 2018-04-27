# Query Air Quality data in the Context Broker

## Prerequisites

This section of the guide starts assuming you have already [deployed your platform](../platform/swarmcluster.md)
and [deployed your Orion Context Broker](../platform/deployservices.md).

It also assumes you have sensors inserting data in your Orion Context Broker.
If you don't have any, you can simulate some data injection using the [entities-simulator]()
as follows. You need of course to configure the value of ORION_URL with the url
of Orion in your deployment.

```
$ ORION_URL=http://$(docker-machine ip ms-manager0):1026
$ docker run -ti --rm -e ORION_URL=${ORION_URL} smartsdk/entities-simulator
```

If you feel like trying something more sophisticated, you can have a look at
[FIWARE Device Simulator](https://fiware-device-simulator.readthedocs.io).

## Postman Collection

To make the experience easier, you can use a REST Client such as [PostMan](https://www.getpostman.com/).
With postman, you can import this [postman collection](https://github.com/smartsdk/smartsdk-recipes/blob/master/recipes/tools/postman_collection.json)
from the SmartSDK Recipes repository. Postman collections are documented [here](https://www.getpostman.com/docs/v6/postman/collections/intro_to_collections).

## Query Entities

The simplest of the queries is to retrieve all entities stored.

In the Postman Collection, within the `Orion` folder use the GET query to Orion Entities.

From the command line using curl,

```
curl -X GET ${ORION_URL}/v2/entities -H 'Accept: application/json'
```

For more details, refer to the [official Orion's Query documentation](http://fiware-orion.readthedocs.io/en/latest/user/walkthrough_apiv2/index.html#query-entity)
