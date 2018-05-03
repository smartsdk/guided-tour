# Create your Docker Swarm Cluster

## Create your Docker Swarm Cluster in FIWARE Lab

### Register in FIWARE Lab

Fist of all, you need to register at the site
<https://account.lab.fiware.org/>.  The first time you have to click the
“Sing up” button to be redirected to the Sing up form.

![img](./images/01-create-account-fiware-lab-01.png
"Home page account portal of FIWARE Lab")

The first time you have to click the “Sing up” button to be redirected
to the Sing up form:

![img](./images/01-create-account-fiware-lab-02.png
"Empty form on Sign up of FIWARE Lab")

Complete the form with your personal data and agree with the FIWARE
Lab Term and Conditions:

![img](./images/01-create-account-fiware-lab-03.png
"Example of form Completion on Sign up of FIWARE Lab")

Complete the registration steps by following the instruction found in
the registration email.


### Configure your cluster

Go to the home page of the [SmartSDK Platform Manager](https://platform-manager.smartsdk.eu/)
and click on “Authenticate with Fiware”.

![img](./images/04-user-first-login-01-platform-auth-01.png
"Home page of SmartSDK Platform Manager")

You will be redirected to the Fiware Lab login page.  Insert your
credentials.

![img](./images/04-user-first-login-02-platform-auth-02.png
"Fiware Lab Login Page")

Once you login, you need to authorize the SmartSDK Platform to access
your public information in order to create and enable your account.

![img](./images/04-user-first-login-03-platform-auth-03.png
"Fiware Lab Authorization Request")

Then you will be redirected to the SmartSDK Platform as an authorized
user.


### Setup Swarm on Fiware Lab

In the SmartSDK platform, depending on what is enabled by the
administrator, you can create your own environment(s).

Once the environment is created, you can add new host(s) in the
environment.

Once a host is added you can deploy your application on it.

Here we document the creation of a “Docker Swarm” environment, with
hosts running on the FIWARE Lab.

First, in the “Environment” tab select the “Manage Environments”.

![img](./images/05-user-setup-swarm-01-select-manage-env.png
"Manage Environments Menu")

Then click the “Add Environment” button.

![img](./images/05-user-setup-swarm-02-add-new-env.png
"Add Enviroment")

Fill the `Name` and the optional `Description` and ensure the
Enviroment Template is set to `Swarm`.

![img](./images/05-user-setup-swarm-03-new-env-details.png
"Select Swarm as the Enviroment Template")

You will be redirected to the environments list.  Select the newly
created environment.

![img](./images/05-user-setup-swarm-04-list-envs.png
"Select newly created environment")

In the new environment you will see the list of the users. A warning
at the top of the page will invite you to click on the “Add a host”
link.  Click the link and continue reading.

![img](./images/05-user-setup-swarm-05-inside-env.png
"Add host warning")


## Deploy your cluster

In the add host procedure we can leverage the FIWARE Lab Rancher UI
driver in order to automatically create hosts on the FIWARE Lab.

In the initial page select the “FIWARE Lab” driver.

![img](./images/05-user-setup-swarm-06-add-host-initial.png
"Add new hosts driver selection")

Then insert your FIWARE Cloud Lab credentials.  Please note that those
credential are usually different from the ones used for the OAuth2
procedure.  Those credentials are the ones used for the OpenStack
authentication and are the same you would use on the [cloud lab](https://cloud.lab.fiware.org).

![img](./images/05-user-setup-swarm-07-add-host-fiware-lab.png
"Insert FIWARE credentials")

![img](./images/05-user-setup-swarm-08-add-host-fiware-details.png
"Select hosts configuration")

If you have more than one region enabled, you can choose where to
create new hosts.

![img](./images/05-user-setup-swarm-09-add-host-select-region.png
"Region selection")

Then you need to provide some information regarding the host
configuration you want to deploy.

![img](./images/05-user-setup-swarm-10-add-host-details.png
"Add hosts configuration details")

**Note:** if your OpenStack installation uses a lower MTU than the
de-facto standard of 1500 bytes, you need to configure the Docker
Engine Option properly.

The supported configuration requires the following settings:

-   Image: `Ubuntu 16.04 LTS`
-   Flavor: `m1.medium`
-   Security Groups: `Ports 22/TCP and 2376/TCP Open`
-   Storage Engine: `overlay2`
-   Docker Install Url: `https://releases.rancher.com/install-docker/17.12.sh`
-   Docker Engine Options: key: `mtu`, value `1400`

![img](./images/05-user-setup-swarm-11-add-host-mtu.png
"Save hosts configuration")

Now you can go to the end of the page and click the “Save” button.

For a few minutes you will see a waiting page.  In the background the
driver is starting and provisioning the newly created hosts.

![img](./images/05-user-setup-swarm-13-wait-for-host.png
"Wait for hosts")


## Deploy a stack using the web interface

After waiting for a while (usually a couple of minutes) your host
should be in the “active” state.

![img](./images/07-host-added-01-display.png
"Host added")

Follow the menu “Swarm - Portainer” menu you can start our customized
portainer web interface.

First be sure that in the settings the correct templates are loaded
from the url:
<https://raw.githubusercontent.com/smartsdk/smartsdk-recipes/master/portainer/templates.json>.

![img](./images/09-portainer-01-settings.png
"Portainer Template Settings")

Usually for SmartSDK recipes the required networks “frontend” and
“backend” are to be create as in the following screenshot.

![img](./images/09-portainer-02-network.png
"Network Creation")

To deploy a stack from our templates, follow the “App Templates” link.

![img](./images/09-portainer-03-apps.png
"Application listing")

For the “Onion Context Broker” there are optional values that can be
changed.

![img](./images/09-portainer-04-context-broker-config.png
"Orion Contex Brober Application settings")

A link to the documentation is provided in order to clarify the exact
meaning of the variables.

![img](./images/09-portainer-05-context-broker-help.png
"Link to the Original Context Broker Documentation")

Complete the form with at least the “Stack Name”:

![img](./images/09-portainer-06-context-broker-name.png
"Complete the Orion Context Broker Form")

Click on “Deploy the stack” and wait a bit for the starting of the stack.

![img](./images/09-portainer-07-context-broker-success.png
"Successful start of a deploy")

Note that a configuration can be edited ad any time in order to change
suitable parameters.

![img](./images/09-portainer-09-context-broker-edit.png
"Edit the configuration of a running deploy")

This end our web graphical user interface tour.  The next section
explores the command line oriented tools.


### Export configuration for Docker CLI

Once the host is up you can export the settings.  The settings are
useful if you want to manage the host using the `docker-machine` tool.
You can also use the setting to connect to the host directly using
`ssh`.

![img](./images/07-host-added-02-machine-config-download.png
"Add hosts configuration details")

For the ssh connection see the following example.  Extract the
settings.

    user@localhost tar xvzf h1.tar.gz
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/certs
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/certs/ca-key.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/certs/ca.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/certs/cert.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/certs/key.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/ca.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/cert.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/config.json
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/created
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/id_rsa
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/id_rsa.pub
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/key.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/server-key.pem
    f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/server.pem

Use ssh to connect tho the host and show the running docker container.

    user@localhost ssh -i f92db4d8-5b28-44d8-ae54-7fcb823e2e4a/machines/h1/id_rsa \
      -o IdentitiesOnly=yes ubuntu@130.206.126.99 sudo docker ps

    ##################################################################################
    NOTE: You have accessed a system owned by FIWARE Lab. You must have authorisation
    before using it, and your use will be strictly limited to that indicated in the
    authorisation.
    Unauthorised access to this system or improper use of the same is prohibited and
    is against the FIWARE Terms & Conditions Policy and the legislation in force. The
    use of this system may be monitored.
    #################################################################################



    CONTAINER ID        IMAGE                             COMMAND                  CREATED             STATUS              PORTS               NAMES
    1f6bc6ebfee8        portainer/portainer:pr572         "/portainer --no-a..."   2 hours ago         Up 2 hours                              r-portainer-portainer-ui-1-adaec9cb
    15a9693cbca5        rancher/portainer-agent:v0.1.0    "/.r/r portainer-a..."   2 hours ago         Up 2 hours                              r-portainer-portainer-1-08b16b2d
    95b1d98105b9        rancher/scheduler:v0.8.3          "/.r/r /rancher-en..."   2 hours ago         Up 2 hours                              r-scheduler-scheduler-1-59a39b48
    13a513eddb52        rancher/net:v0.13.9               "/rancher-entrypoi..."   2 days ago          Up 2 days                               r-ipsec-ipsec-connectivity-check-3-25da01ae
    1d8863a459c6        rancher/net:v0.13.9               "/rancher-entrypoi..."   2 days ago          Up 2 days                               r-ipsec-ipsec-router-3-8d16ea87
    5ac088c73d44        rancher/net:holder                "/.r/r /rancher-en..."   2 days ago          Up 2 days                               r-ipsec-ipsec-3-e7a7301d
    2277dc19441a        rancher/net:v0.13.9               "/rancher-entrypoi..."   2 days ago          Up 2 days                               r-ipsec-cni-driver-1-81ee523d
    04262f5583fe        rancher/dns:v0.17.2               "/rancher-entrypoi..."   2 days ago          Up 2 days                               r-network-services-metadata-dns-1-30407e50
    dfe285a4a9cb        rancher/healthcheck:v0.3.3        "/.r/r /rancher-en..."   2 days ago          Up 2 days                               r-healthcheck-healthcheck-1-fef6c66b
    c40e56bd9b43        rancher/metadata:v0.10.2          "/rancher-entrypoi..."   2 days ago          Up 2 days                               r-network-services-metadata-1-5dc37eca
    81391c45319b        rancher/network-manager:v0.7.20   "/rancher-entrypoi..."   2 days ago          Up 2 days                               r-network-services-network-manager-1-870cfe55
    1d3df351c60e        rancher/agent:v1.2.10-rc3         "/run.sh run"            2 days ago          Up 2 days                               rancher-agent

In order to use the `rancher` and `rancher-compose` CLI you need to
download the tools and the API keys.

Download them from the right bottom corner of the interface the
`rancher-compose` CLI.

![img](./images/07-host-added-03-download-cli-compose.png
"Downloload rancher-compose")

Download them from the right bottom corner of the interface the
`rancher` CLI.

![img](./images/07-host-added-04-download-cli-rancher.png
"Downloload rancher CLI")

Download the account and environment API keys from the API tab.  Make
sure you have selected the correct environment.

An overview of the API page.  Click on “Add Account API Key”.

![img](./images/08-download-api-01-account-api-key.png
"API Creation and download page")

Fill the name and description for the account API key

![img](./images/08-download-api-02-account-api-key.png
"New account API key creation")

Take note of the access and secrey keys in a secure place.

![img](./images/08-download-api-03-account-api-key.png
"Account key tokens")

Fill the name and description for the account API key

![img](./images/08-download-api-04-env-api-key.png
"New enviroment key creation")

Take note of the access and secrey keys in a secure place.

![img](./images/08-download-api-05-env-api-key.png
"Environment key tokens")

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

        $ curl -sSL https://raw.githubusercontent.com/aelsabbahy/miniswarm/master/miniswarm -o /usr/local/bin/miniswarm
        $ chmod +rx /usr/local/bin/miniswarm

1. Create a cluster of three nodes (1 master and 2 workers):

        $ miniswarm start 3

1. Connect to your cluster:

        $ eval $(docker-machine env ms-manager0)

If you are interested to explore miniswarm usage:

```bash
$ miniswarm -h
```

#### Create step-by-step your cluster on Windows / Mac / Linux

1. Create 3 docker virtual machines:

        $ docker-machine create --driver virtualbox ms-manager0
        $ docker-machine create --driver virtualbox ms-worker0
        $ docker-machine create --driver virtualbox ms-worker1

1. Check that the virtual machines are correctly deployed:

        $ docker-machine ls

        NAME          ACTIVE   DRIVER       STATE     URL                          SWARM   DOCKER        ERRORS
        ms-manager0   *        virtualbox   Running   tcp://192.168.99.100:2376            v18.02.0-ce
        ms-worker0    -        virtualbox   Running   tcp://192.168.99.101:2376            v18.02.0-ce
        ms-worker1    -        virtualbox   Running   tcp://192.168.99.102:2376            v18.02.0-ce


1. Initialise the swarm cluster:

        $ docker-machine ssh ms-manager0 "docker swarm init --advertise-addr <ms-manager0-ip>"
        Swarm initialized: current node <node ID> is now a manager.

    To add a worker to this swarm, run the following command:

        $ docker swarm join --token <token> <ms-manager0-ip>:<port>

    To add a manager to this swarm, run (and follow the instructions)...

        $ docker swarm join-token manager


1. Add the workers to the swarm using the token provided by the swarm manager:

        $ docker-machine ssh ms-worker0 "docker swarm join \
        --token <token> \
        <ms-manager0-ip>:<port>"
        $ docker-machine ssh ms-worker1 "docker swarm join \
        --token <token> \
        <ms-manager0-ip>:<port>"

1. Connect to your cluster:

        $ eval $(docker-machine env ms-manager0)

### Test your cluster

1. List nodes in your cluster:

        $ docker node ls
        ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
        w697ke0djs3cfdf3bgbrcblam *   ms-manager0         Ready               Active              Leader
        fw2ajm8zw4f12ut3sgffgdwsl     ms-worker0          Ready               Active
        z69rvapjce827l69b6zehceal     ms-worker1          Ready               Active

1. Launch a docker service:

        $ docker service create --name helloworld alpine ping docker.com

        sm3hi368lbsxye3n2rgdwv5xo
        overall progress: 1 out of 1 tasks
        1/1: running   [==================================================>]
        verify: Service converged

1. Check the service logs

        $ docker service logs -f helloworld
        helloworld.1.ogo00hqdmtm0@ms-worker1    | PING docker.com (54.209.25.207): 56 data bytes

1. Remove the services

        $ docker service rm helloworld
        helloworld
