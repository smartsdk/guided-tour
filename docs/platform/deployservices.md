# Deploy your platform using SmartSDK recipes

## Prerequisites

### Checking access to your cluster

This section will guide you through the deployment of the core services.
It assumes you have already deployed your infrastructure, as instructed in
[this section](deployservices.md) of the guide. It also assumes you are
familiarized with [docker swarm clusters](https://docs.docker.com/engine/swarm/).

At this point, you should have your
[docker client installed](https://docs.docker.com/install/) and connected to
the docker engine where you will deploy your services. What does this mean? It
means you can execute docker commands locally and they will interact with your
docker swarm cluster. For example, if you created your swarm locally using
[miniswarm](https://github.com/aelsabbahy/miniswarm), you are now at the command
 line after executing the command `eval $(docker-machine env ms-manager0)`.

Let's make a quick test. Execute the following command...
```
$ docker node ls
```
If the above command does not return you the list of cluster nodes you were
expecting after having configured your cluster, something went wrong and you
should revisit [this section](deployservices.md). In the miniswarm case, the
output would look like this...
```
$ docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
txovguzi0bfjjg19dmia9ne9q *   ms-manager0         Ready               Active              Leader              18.04.0-ce
x319f02s5pgor5i6zxf3j1zfm     ms-worker0          Ready               Active                                  18.04.0-ce
quenm3mxoxkui913cqj6xj9e9     ms-worker1          Ready               Active                                  18.04.0-ce
```

### Getting the recipes

Good, let's get now the recipes that will be used to configure and deploy
services.
```
$ git clone https://github.com/smartsdk/smartsdk-recipes.git
$ cd smartsdk-recipes/recipes/
# NOTE: This folder you are now at will be our 'root' folder for this guide.
 ```

### Checking the networks

The last step to double-check your environment is properly configured, is
making sure you have the docker networks that services will be used. For this
guide, we have agreed on using two overlay networks called `backend` and
`frontend`. You can create them by running the script in
`tools/create_networks.sh` (if you are in Windows, simply execute the docker
commands you see in that file). This way, listing the docker networks you should
 see something like...
```
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
dyhk6vq4igln        backend             overlay             swarm
da6428f879fa        bridge              bridge              local
1c6264aa486f        docker_gwbridge     bridge              local
s6hn8feoikdr        frontend            overlay             swarm
df2a4f889f31        host                host                local
xv2z53zsiztb        ingress             overlay             swarm
5e4bb9a11160        none                null                local
```

Finally, we are now ready to start deploying the main services composing the
overall SmartSDK architecture.

## Deploy a Highly Available MongoDB Replicaset

### From the Command Line

Please execute the following commands...
```
$ cd utils/mongo-replicaset
$ source settings.env  # In Windows, simply execute settings.bat instead.
$ docker stack deploy -c docker-compose.yml mongo-rs
$ cd ../../
```

The first time this will take a while until the images are pulled to the nodes.
To make sure the replicaset is properly established, after some minutes check
the output of the logs of the replicaset controller. See below for example.
```
$ docker service logs mongo-rs_controller
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:Waiting mongo service (and tasks) (mongo-rs_mongo) to start
mongo-rs_controller.1.gl7nia3d3489@ms-manager0    | INFO:__main__:Waiting mongo service (and tasks) (mongo-rs_mongo) to start
mongo-rs_controller.1.gl7nia3d3489@ms-manager0    | ERROR:__main__:Expired attempts waiting for mongo service (mongo-rs_mongo)
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:Mongo service is up and running
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:To remove: {'10.0.0.33', '10.0.0.35', '10.0.0.34'}
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:To add: {'10.0.0.39', '10.0.0.38', '10.0.0.40'}
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:new replSetReconfig: {'ok': 1.0}
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:Primary is: 10.0.0.40
mongo-rs_controller.1.q5qgicakpffs@ms-manager0    | INFO:__main__:Primary is: 10.0.0.40
```

If you got something like that, your **MongoDB Replicaset** is ready!
If you still have issues or want to understand how this works in more detail,
please refer to [this section](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/utils/mongo-replicaset)
 of the SmartSDK recipes documentation.

### Using Portainer

TODO!

## Deploy a Highly Available Context Broker

### From the Command Line

Orion needs a MongoDB database to work. If you have been following this guide,
you should have already one replicaset running. The default configurations in
the settings files assume we will use those mongo instances.

To deploy Orion, please execute the following commands...
```
$ cd data-management/context-broker/ha/
$ source settings.env  # In Windows, simply execute settings.bat instead.
$ docker stack deploy -c docker-compose.yml orion
```

The first time this will take a while until the images are pulled to the nodes.
After some minutes, you can check that Orion was successfully deployed by
checking its logs...
```
$ docker service logs orion_orion
```

If you got something like that, your **Orion** is ready!
If you still have issues or want to understand how this works in more detail,
please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/data-management/context-broker/ha/readme/)
 of the SmartSDK recipes documentation.

### Using Portainer

TODO!

## Deploy a Highly Available QuantumLeap

### From the Command Line

To deploy Orion Context Broken in HA, please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/data-management/quantumleap/readme/)
 of the SmartSDK recipes documentation.

As with the rest of the recipes, the files mentioned in the documentation are
those located in the same directory where the documentation file is. For this
case, we are talking about [this directory](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/data-management/quantumleap).

### Using Portainer

TODO!

## Deploy a Highly Available IoT Agent

### From the Command Line

To deploy IoT Agents in HA, please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/iot-services/readme/)
 of the SmartSDK recipes documentation. You will find one recipe for each IoT Agent type.

As with the rest of the recipes, the files mentioned in the documentation are
those located in the same directory where the documentation file is. For this
case, we are talking about [this directory](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/iot-services).

### Using Portainer

TODO!

## Exploring Further

This section was just a quick overview of the essentials to get you quickly up
and running. If you want to know more, you can find more info about the
deployment of FIWARE Services using Docker in the [smartsdk recipes repository](https://github.com/smartsdk/smartsdk-recipes).
The documentation for that repo is published [here](https://smartsdk.github.io/smartsdk-recipes/).
