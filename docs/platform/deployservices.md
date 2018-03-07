# Deploy your platform using SmartSDK recipes

This section will give you pointers to deploy core services of SmartSDK using
docker recipes, which are mantained in [this repository](https://github.com/smartsdk/smartsdk-recipes)
 and whose documentation can be read [here](https://smartsdk.github.io/smartsdk-recipes/)

If you haven't already, please take some time to read those docs so that you
make sure you have properly setup the environment (the docker swarm cluster)
where the deployment will be done. This is covered in [this section](deployservices.md)
of this guide.

## Deploy an Highly Available Context Broker

To deploy Orion Context Broken in HA, please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/data-management/context-broker/ha/readme/) of the
SmartSDK recipes documentation.

As with the rest of the recipes, the files mentioned in the documentation are
those located in the same directory where the documentation file is. For this
case, we are talking about [this directory](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/data-management/context-broker/ha).

## Deploy an Highly Available QuantumLeap

To deploy Orion Context Broken in HA, please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/data-management/quantumleap/readme/) of the
SmartSDK recipes documentation.

As with the rest of the recipes, the files mentioned in the documentation are
those located in the same directory where the documentation file is. For this
case, we are talking about [this directory](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/data-management/quantumleap).

## Deploy an Highly Available IoT Agent

To deploy IoT Agents in HA, please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/iot-services/readme/) of the
SmartSDK recipes documentation. You will find one recipe for each IoT Agent type.

As with the rest of the recipes, the files mentioned in the documentation are
those located in the same directory where the documentation file is. For this
case, we are talking about [this directory](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/iot-services).
