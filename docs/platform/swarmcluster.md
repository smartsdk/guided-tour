# Create your Docker Swarm Cluster

## Create your Docker Swarm Cluster in FIWARE Lab

### Register in FIWARE Lab

### Configure your cluster

### Deploy your cluster

### Export configuration for Docker CLI


## Create your Docker Swarm Cluster on your laptop

In this section we discuss how to create a cluster on your own laptop.

### Prerequisites

To create a swarm cluster on your laptop you need to:
1. Install [VirtualBox](http://virtualbox.org) or any other virtualisation
  solution supported by [Docker Machine](https://docs.docker.com/machine/).

1. Install [Docker](https://docs.docker.com/install/).

1. Install [Docker Machine](https://docs.docker.com/machine/install-machine/).

1. Install 
[PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell?view=powershell-6)
(only on Windows).

### Cluster creation

#### Create your cluster on MacOS X or Linux using miniswarm

Once you completed the installation of the above tools, on Linux and MacOS you
can create your cluster using 
[miniswarm](https://github.com/aelsabbahy/miniswarm):

1. Download miniswarm:

  ```bash
  $ curl -sSL https://raw.githubusercontent.com/aelsabbahy/miniswarm/master/miniswarm -o /usr/local/bin/miniswarm
  $ chmod +rx /usr/local/bin/miniswarm
  ```

1. Create a cluster of three nodes (1 master and 2 workers):

  ```bash
  $ miniswarm start 3
  ```

1. Connect to your cluster:

  ```bash
  $ eval $(docker-machine env ms-manager0)
  ```

If you are interested to explore miniswarm usage:

```bash
$ miniswarm -h
```

#### Create step-by-step your cluster on Windows / Mac / Linux

1. Create 3 docker virtual machines:

  ```bash
  $ docker-machine create --driver virtualbox ms-manager0
  $ docker-machine create --driver virtualbox ms-worker0
  $ docker-machine create --driver virtualbox ms-worker1
  ```

1. Check that the virtual machines are correctly deployed:

  ```
  $ docker-machine ls

  NAME          ACTIVE   DRIVER       STATE     URL                          SWARM   DOCKER        ERRORS
  ms-manager0   *        virtualbox   Running   tcp://192.168.99.100:2376            v18.02.0-ce   
  ms-worker0    -        virtualbox   Running   tcp://192.168.99.101:2376            v18.02.0-ce   
  ms-worker1    -        virtualbox   Running   tcp://192.168.99.102:2376            v18.02.0-ce 
  ```


1. Initialise the swarm cluster:

  ```
  $ docker-machine ssh ms-manager0 "docker swarm init --advertise-addr <ms-manager0-ip>"
  Swarm initialized: current node <node ID> is now a manager.

  To add a worker to this swarm, run the following command:

    docker swarm join \
    --token <token> \
    <ms-manager0-ip>:<port>

  To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
  ```

1. Add the workers to the swarm using the token provided by the swarm manager:

  ```bash
  $ docker-machine ssh ms-worker0 "docker swarm join \
  --token <token> \
  <ms-manager0-ip>:<port>"

  $ docker-machine ssh ms-worker1 "docker swarm join \
  --token <token> \
  <ms-manager0-ip>:<port>"
  ```

1. Connect to your cluster:

  ```bash
  $ eval $(docker-machine env ms-manager0)
  ```

### Test your cluster

1. List nodes in your cluster:

  ```bash
  $ docker node ls
  ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
  w697ke0djs3cfdf3bgbrcblam *   ms-manager0         Ready               Active              Leader
  fw2ajm8zw4f12ut3sgffgdwsl     ms-worker0          Ready               Active              
  z69rvapjce827l69b6zehceal     ms-worker1          Ready               Active 
  ```

1. Launch a docker service:

  ```bash
  $ docker service create --name helloworld alpine ping docker.com

  sm3hi368lbsxye3n2rgdwv5xo
  overall progress: 1 out of 1 tasks 
  1/1: running   [==================================================>] 
  verify: Service converged 
  ```

1. Check the service logs

  ```bash
  $ docker service logs -f helloworld
  helloworld.1.ogo00hqdmtm0@ms-worker1    | PING docker.com (54.209.25.207): 56 data bytes
  ```

1. Remove the services

  ```bash
  $ docker service rm helloworld
  helloworld
  ```
