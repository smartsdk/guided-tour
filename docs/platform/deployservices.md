# Deploy your platform using SmartSDK recipes

## Prerequisites

### Checking access to your cluster

This section will guide you through the deployment of the core services.
It assumes you have already deployed your infrastructure, as instructed in
[this section](swarmcluster/) of the guide. It also assumes you are
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
should revisit [this section](swarmcluster/). In the miniswarm case, the
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
```

NOTE: `smartsdk-recipes/recipes/` will be our 'root' folder for this guide.

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

### Deploy a Highly Available MongoDB Replicaset

## From the Command Line

Please execute the following commands...

```
$ cd utils/mongo-replicaset
```

In Linux/Mac...

```
$ source settings.env
$ docker stack deploy -c docker-compose.yml ${STACK_NAME}
```

In Windows...

```
$ settings.bat
$ docker stack deploy -c docker-compose.yml %STACK_NAME%
```

Finally...

```
$ cd ../../
```

The first time this will take a while until the images are pulled to the nodes.
To make sure the replicaset is properly established, after some minutes check
the output of the logs of the replicaset controller. See below for example.

```
$ docker service logs ${STACK_NAME}_controller
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:Waiting mongo service (and tasks) (mongo-rs_mongo) to start
mongo-rs_controller.1.njolaq8j49tx@ms-manager0    | INFO:__main__:Waiting mongo service (and tasks) (mongo-rs_mongo) to start
mongo-rs_controller.1.njolaq8j49tx@ms-manager0    | ERROR:__main__:Expired attempts waiting for mongo service (mongo-rs_mongo)
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:Mongo service is up and running
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:No previous valid configuration, starting replicaset from scratch
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:replSetInitiate: {'ok': 1.0}
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:Primary is: 10.0.0.8
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:To add: {'10.0.0.7', '10.0.0.6'}
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:new replSetReconfig: {'ok': 1.0}
mongo-rs_controller.1.ooelrlkfujnn@ms-manager0    | INFO:__main__:Primary is: 10.0.0.8
```

NOTE: In windows use `%STACK_NAME%_controller` instead.

If you got something like that, your **MongoDB Replicaset** is ready!
If you still have issues or want to understand how this works in more detail,
please refer to [this section](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/utils/mongo-replicaset)
 of the SmartSDK recipes documentation.

### Using Portainer

Coming Soon!

## Deploy a Highly Available Context Broker

### From the Command Line

Orion needs a MongoDB database to work. If you have been following this guide,
you should have already one replicaset running. The default configurations in
the settings files assume we will use those mongo instances.

To deploy Orion, please execute the following commands...

```
$ cd data-management/context-broker/ha/
$ source settings.env
$ docker stack deploy -c docker-compose.yml orion
$ cd ../../../
```

NOTE: In Windows, simply execute `settings.bat` instead.

The first time this will take a while until the images are pulled to the nodes.
With command `docker service ls` you can check if all the replicas are up or not.
After some minutes, when all replicas are up, you can check that Orion was
successfully deployed by checking its logs...

```
$ docker service logs orion_orion
orion_orion.2.yu0h9clplwms@ms-worker0    | time=Thursday 26 Apr 08:05:32 2018.325Z | lvl=INFO | corr=N/A | trans=N/A | from=N/A | srv=N/A | subsrv=N/A | comp=Orion | op=contextBroker.cpp[1835]:main | msg=Orion Context Broker is running
orion_orion.2.yu0h9clplwms@ms-worker0    | time=Thursday 26 Apr 08:05:32 2018.331Z | lvl=INFO | corr=N/A | trans=N/A | from=N/A | srv=N/A | subsrv=N/A | comp=Orion | op=mongoConnectionPool.cpp[217]:mongoConnect | msg=Successful connection to database
```

If you can see messages like those (Orion Running and connected to database),
your **Orion** is ready! However, if you still have issues or want to understand
 how this works in more detail, please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/data-management/context-broker/ha/readme/)
 of the SmartSDK recipes documentation.

### Using Portainer

Coming Soon!

## Deploy a Highly Available QuantumLeap

Quantumleap is built on top of a CrateDB cluster. Some values of the
configuration will depend on the number of nodes you have in your swarm cluster.

The default values will deploy a 1-node cluster, to make sure it works as default
for new users. However, if you know you cluster has more nodes, you can adjust
those values following the documentation. For example, with a 3-nodes cluster,
you can update these values from the default `settings.env`:

```
export EXPECTED_NODES=3
export RECOVER_AFTER_NODES=1
export MINIMUM_MASTER_NODES=2
```

### Prerequisites

Crate needs a minimum of 262144 for the mmap count, which by default is lower in
Swarm nodes. Thus, before attempting to launch this service, you should run the
following command in each of your swarm nodes.

Assuming you followed the miniswarm example, you can do...

```
$ docker-machine ssh ms-manager0
docker@ms-manager0:~$ sudo sysctl -w vm.max_map_count=262144
```

Remember to repeat that config for all the nodes of the cluster.

For more info, checkout the corresponding [config documentation](https://crate.io/docs/crate/reference/en/latest/config/system.html?highlight=max_map_count)
of crate docs, or [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)
from elasticsearch docs.

### From the Command Line

To deploy Quantumleap, please execute the following commands...

```
$ cd data-management/quantumleap/
$ source settings.env
$ docker stack deploy -c docker-compose.yml quantumleap
$ docker stack deploy -c docker-compose-addons.yml grafana
$ cd ../../
```

The first time this will take even longer than the previous services. Wait until
all replicas are up.

```
$ docker service ls
ID                  NAME                      MODE                REPLICAS            IMAGE                              PORTS
r6xoq2anisf6        grafana_grafana           replicated          1/1                 grafana/grafana:latest             *:3000->3000/tcp
0ys27a34jhy8        mongo-rs_controller       replicated          1/1                 smartsdk/mongo-rs-swarm:latest
udqr7mimjisi        mongo-rs_mongo            global              3/3                 mongo:3.2
natp6rgvb7pr        orion_orion               replicated          2/2                 fiware/orion:1.12.0                *:1026->1026/tcp
kh5yj8py63ll        quantumleap_crate         global              3/3                 crate:2.3.6
zn77x57xg3mc        quantumleap_quantumleap   replicated          2/2                 smartsdk/quantumleap:latest        *:8668->8668/tcp
n97db06olz7n        quantumleap_traefik       global              1/1                 traefik:1.3.5-alpine               *:80->80/tcp, *:443->443/tcp, *:4200->4200/tcp, *:4300->4300/tcp, *:8080->8080/tcp
```

You can check the status of your crate cluster by curling to the endpoint where
your cluster is deployed, using the header HOST as configured in your settings.

NOTE: Recall you must have called settings.env in this same terminal

```
$ IP_OF_MY_CLUSTER=$(docker-machine ip ms-manager0)
$ curl --header "Host: ${CRATE_HOST}.${CLUSTER_DOMAIN}" $IP_OF_MY_CLUSTER
{
  "ok" : true,
  "status" : 200,
  "name" : "Schwabenalpenkopf",
  "cluster_name" : "quantumleap",
  "version" : {
    "number" : "2.3.6",
    "build_hash" : "a51cbdc9c04cf9d601509cafb104bbbf2e5a2cf7",
    "build_timestamp" : "2018-04-04T13:14:42Z",
    "build_snapshot" : false,
    "es_version" : "5.6.8",
    "lucene_version" : "6.6.1"
  }
}
```

You can check QL is running by executing...

```
$ docker service logs quantumleap_quantumleap
quantumleap_quantumleap.1.tn4mcwvcj9ej@ms-worker1    |  * Running on http://0.0.0.0:8668/ (Press CTRL+C to quit)
```

Congratulations, if you got similar output, your **Quantumleap** is ready!

If you still have issues or want to understand how this works in more detail,
please refer to [this section](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/data-management/quantumleap)
 of the SmartSDK recipes documentation.

### Using Portainer

Coming Soon!

## Deploy a Highly Available IoT Agent

### From the Command Line

Let's go to the folder of the IoT Agent of your choice, for example the `ul`.
The default values for the recipe are good enough for working with a MongoDB
and Orion Context Broker deployed following this guide.

```
$ cd iot-services/iotagent-ul
$ docker stack deploy -c docker-compose iota-ul
```

You can check the agent started properly by looking at its logs.

```
$ docker service logs iota-ul_iotagent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:09.917Z | lvl=INFO | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.DbConn | srv=n/a | subsrv=n/a | msg=Attempting to connect to MongoDB instance. Attempt 5 | comp=IoTAgent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:09.969Z | lvl=INFO | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.DbConn | srv=n/a | subsrv=n/a | msg=Successfully connected to MongoDB. | comp=IoTAgent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:10.029Z | lvl=INFO | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.NorthboundServer | srv=n/a | subsrv=n/a | msg=Starting IoT Agent listening on port [4041] | comp=IoTAgent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:10.030Z | lvl=DEBUG | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.NorthboundServer | srv=n/a | subsrv=n/a | msg=Using config:
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    |
```

If you can see logs like those (Agent successfully connected to MongoDB),
your **IoT Agent** is ready!

If you still have issues or want to understand how this works in more detail,
please refer to [this section](https://smartsdk.github.io/smartsdk-recipes/iot-services/readme/)
 of the SmartSDK recipes documentation.

### Using Portainer

Coming Soon!

## Exploring Further

This section was just a quick overview of the essentials to get you quickly up
and running. If you want to know more, you can find more info about the
deployment of FIWARE Services using Docker in the [smartsdk recipes repository](https://github.com/smartsdk/smartsdk-recipes).
The documentation for that repo is published [here](https://smartsdk.github.io/smartsdk-recipes/).
