# SmartSDK レシピを使用してプラットフォームをデプロイ

## 前提条件

### クラスタへのアクセスの確認

このセクションでは、コア・サービスのデプロイについて説明します。このガイドの[このセクション](swarmcluster/)で指示されているように、インフラストラクチャを既に展開していることを前提としています。また、[docker swarm clusters](https://docs.docker.com/engine/swarm/) に精通していることを前提としています。

この時点で、[Docker クライアントをインストールし](https://docs.docker.com/install/)、サービスをデプロイする Docker Engine に接続する必要があります。これは何を意味するのでしょうか？これは、あなたがローカルで docker コマンドを実行できることを意味し、それらはあなたの Docker Swarm クラスタとやりとりします。たとえば、[miniswarm](https://github.com/aelsabbahy/miniswarm)を使用して、swarm をローカルで作成した場合は、`eval $(docker-machine env ms-manager0)` コマンドを実行した後で、コマンドラインに戻ります。

簡単なテストをしましょう。次のコマンドを実行してください...

```
$ docker node ls
```

上記のコマンドでクラスタを構成した後に、期待していたクラスタ・ノードの一覧が返されない場合は、何かが間違っているため、[このセクション](swarmcluster/)に戻ってください。miniSwarm の場合、出力は次のようになります...

```
$ docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
txovguzi0bfjjg19dmia9ne9q *   ms-manager0         Ready               Active              Leader              18.04.0-ce
x319f02s5pgor5i6zxf3j1zfm     ms-worker0          Ready               Active                                  18.04.0-ce
quenm3mxoxkui913cqj6xj9e9     ms-worker1          Ready               Active                                  18.04.0-ce
```

### レシピを取得

さて、サービスを構成してデプロイするために使用されるレシピを手に入れましょう。

```
$ git clone https://github.com/smartsdk/smartsdk-recipes.git
$ cd smartsdk-recipes/recipes/
```

注 : `smartsdk-recipes/recipes/` は、このガイドの 'root' フォルダにあります。

### ネットワークの確認

環境を再確認する最後のステップは適切に設定されており、サービスが使用される Docker ネットワークがあることを確認しています。このガイドでは、我々は `backend` と  `frontend` と呼ばれる2つのオーバーレイネットワークを使用することにしました。`tools/create_networks.sh` スクリプトを実行することで作成できます。Windows の場合は、そのファイルに表示されている Docker コマンドを実行するだけです。このように、Docker ネットワークをリストすると、次のようなものが表示されます...

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

最後に、SmartSDK アーキテクチャ全体を構成する主要なサービスのデプロイを開始する準備が整いました。

### 高可用性 MongoDB レプリカセットの導入

## コマンドラインから

次のコマンドを実行してください...

```
$ cd utils/mongo-replicaset
```

Linux / Mac では...

```
$ source settings.env
$ docker stack deploy -c docker-compose.yml ${STACK_NAME}
```

Windows では...

```
$ settings.bat
$ docker stack deploy -c docker-compose.yml %STACK_NAME%
```

最後に...

```
$ cd ../../
```

イメージがノードにプルされるまで、最初は時間がかかります。レプリカセットが適切に確立されていることを確認するには、レプリカセット・コントローラのログの出力を確認してください。例えば以下を参照してください。

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

注 : Windowsでは `%STACK_NAME%_controller` を代わりに使用します。

このようなものがあれば、**MongoDB Replicaset** は準備が整いました！問題がまだ残っている場合、またはこの方法の詳細を理解したい場合 は、SmartSDK レシピのドキュメントのこの[セクション](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/utils/mongo-replicaset)を参照してください。

### Portainer の使用

近日公開！

## 高可用性 Context Broker のデプロイ

### コマンドラインから

Orion は MongoDB データベースが必要です。このガイドに従っている場合は、既に1つのレプリカセットを実行しておく必要があります。設定ファイルのデフォルト設定は、それらの mongo インスタンスを使用することを前提としています。

Orion を展開するには、以下のコマンドを実行してください...

```
$ cd data-management/context-broker/ha/
$ source settings.env
$ docker stack deploy -c docker-compose.yml orion
$ cd ../../../
```

注 : Windows では、単に `settings.bat` を代わりに実行します。

イメージがノードにプルされるまで、最初は時間がかかります。`docker service ls` コマンドを使用すると、すべてのレプリカが起動しているかどうかを確認できます。数分後、すべてのレプリカが起動しているときに、そのログをチェックすることによって、Orionが正常に展開されたことを確認できます...

```
$ docker service logs orion_orion
orion_orion.2.yu0h9clplwms@ms-worker0    | time=Thursday 26 Apr 08:05:32 2018.325Z | lvl=INFO | corr=N/A | trans=N/A | from=N/A | srv=N/A | subsrv=N/A | comp=Orion | op=contextBroker.cpp[1835]:main | msg=Orion Context Broker is running
orion_orion.2.yu0h9clplwms@ms-worker0    | time=Thursday 26 Apr 08:05:32 2018.331Z | lvl=INFO | corr=N/A | trans=N/A | from=N/A | srv=N/A | subsrv=N/A | comp=Orion | op=mongoConnectionPool.cpp[217]:mongoConnect | msg=Successful connection to database
```

"Orion Running" と "connected to database" のようなメッセージが見える場合は、**Orion** の準備が完了です！ただし、問題がまだ残っている場合、またはこの方法の詳細を理解したい場合 は、SmartSDK レシピのドキュメントの[このセクション](https://smartsdk.github.io/smartsdk-recipes/data-management/context-broker/ha/readme/)を参照してください。

### Portainer の使用

近日公開！

## 高可用性 QuantumLeap を導入

Quantumleap は CrateDB クラスタの上に構築されています。構成の一部の値は、Swarm クラスタ内にあるノードの数によって異なります。

デフォルト値は 1ノード・クラスタをデプロイし、新しいユーザのデフォルトとして機能することを確認します。ただし、クラスタにノードが増えていることがわかっている場合は、ドキュメントに従ってこれらの値を調整できます。たとえば、3ノードクラスタでは、これらの値をデフォルト `settings.env` から更新できます :

```
export EXPECTED_NODES=3
export RECOVER_AFTER_NODES=1
export MINIMUM_MASTER_NODES=2
```

### 前提条件

Crate は mmap のカウントに 最低 262,144 を必要とします。これはデフォルトで Swarm ノードでは低くなります。したがって、このサービスを起動する前に、各 Swarm ノードで次のコマンドを実行する必要があります。

あなたが miniSwarm の例に従ったと仮定すると、あなたは次のコマンドを実行できます...

```
$ docker-machine ssh ms-manager0
docker@ms-manager0:~$ sudo sysctl -w vm.max_map_count=262144
```

クラスタのすべてのノードに対してその設定を繰り返すことを忘れないでください。

詳細 は、crate docs の対応する[設定ドキュメント](https://crate.io/docs/crate/reference/en/latest/config/system.html?highlight=max_map_count)、または、elasticsearch docs の[このページ](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)を参照してください。

### コマンドラインから

Quantumleap をデプロイするには、以下のコマンドを実行してください...

```
$ cd data-management/quantumleap/
$ source settings.env
$ docker stack deploy -c docker-compose.yml quantumleap
$ docker stack deploy -c docker-compose-addons.yml grafana
$ cd ../../
```

初回は、以前のサービスよりもさらに時間がかかります。 すべてのレプリカが起動するまで待ちます。

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

設定で構成されている HOST ヘッダを使用して、クラスタがデプロイされているエンド・ポイントに curl を実行して、Crate クラスタのステータスを確認できます。

注 : この同じ端末で `settings.env` を呼び出さなければならないことを思い出してください

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

次のコマンドを実行することによって Quantumleap が動作していることを確認することができます...

```
$ docker service logs quantumleap_quantumleap
quantumleap_quantumleap.1.tn4mcwvcj9ej@ms-worker1    |  * Running on http://0.0.0.0:8668/ (Press CTRL+C to quit)
```

出力が似ていれば、**Quantumleap** の準備は完了です！

問題がまだ残っている場合、またはこの方法の詳細を理解したい場合は、SmartSDK レシピのドキュメントの[このセクション](https://github.com/smartsdk/smartsdk-recipes/tree/master/recipes/data-management/quantumleap)を参照してください。

### Portainer の使用

近日公開！

## 高可用性 IoT Agent を導入

### コマンドラインから

あなたが選んだ IoT Agent のフォルダに行きましょう。たとえば、`ul` です。レシピのデフォルト値は、このガイドの後にデプロイされた MongoDB および Orion Context Broker を使用するのに十分です。

```
$ cd iot-services/iotagent-ul
$ docker stack deploy -c docker-compose iota-ul
```

Agent のログを確認することで、Agent が正常に起動しているかどうかを確認できます。

```
$ docker service logs iota-ul_iotagent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:09.917Z | lvl=INFO | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.DbConn | srv=n/a | subsrv=n/a | msg=Attempting to connect to MongoDB instance. Attempt 5 | comp=IoTAgent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:09.969Z | lvl=INFO | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.DbConn | srv=n/a | subsrv=n/a | msg=Successfully connected to MongoDB. | comp=IoTAgent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:10.029Z | lvl=INFO | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.NorthboundServer | srv=n/a | subsrv=n/a | msg=Starting IoT Agent listening on port [4041] | comp=IoTAgent
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    | time=2018-04-26T11:59:10.030Z | lvl=DEBUG | corr=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | trans=eae6093a-15b6-4816-b1c0-1b2c9fe0a050 | op=IoTAgentNGSI.NorthboundServer | srv=n/a | subsrv=n/a | msg=Using config:
iota-ul_iotagent.1.v5ivpp3c3g58@ms-manager0    |
```

"Agent successfully connected to MongoDB" のようなログを見つけることができれば、**IoT Agent** は準備が整いました！

問題がまだ残っている場合、またはこの方法の詳細を理解したい場合は、SmartSDKレシピのドキュメントの[このセクション](https://smartsdk.github.io/smartsdk-recipes/iot-services/readme/)を参照してください。

### Portainer の使用

近日公開！

## さらに探求

このセクションでは、すばやく動かすための基本事項の概要を説明しました。詳細を知りたい場合は、[smartsdk recipes repository](https://github.com/smartsdk/smartsdk-recipes) レシピのリポジトリに Docker を使用した、FIWARE Services のデプロイメントに関する詳細を見つけることができます。そのリポジトリのドキュメントは[ここ](https://smartsdk.github.io/smartsdk-recipes/)に掲載されています。
