# Docker Swarm クラスタを作成

Docker Swarm Cluster を FIWARE Lab とローカル開発環境の両方で作成する方法に
ついては、ここで説明します。下記を参照ください。

## FIWARE Lab で Docker Swarm Cluster を作成

### FIWARE Lab に登録

最初に、あなたは、[https://account.lab.fiware.org/](https://account.lab.fiware.org/)
サイトに登録する必要があります。初回、"Sing up" ボタンをクリックして、
Sing Up フォームにリダイレクトする必要があります。

![img](./images/01-create-account-fiware-lab-01.png
"Home page account portal of FIWARE Lab")

初回、あなたが Sing Up フォームにリダイレクトされるために、"Sing up" ボタンを
クリックする必要があります :

![img](./images/01-create-account-fiware-lab-02.png
"Empty form on Sign up of FIWARE Lab")

あなたの個人情報をフォームに記入し、FIWARE Lab Term and Conditions に同意します:

![img](./images/01-create-account-fiware-lab-03.png
"Example of form Completion on Sign up of FIWARE Lab")

登録メールに記載されている手順に従って、登録手順を完了します。

### クラスタを構成

[SmartSDK Platform Manager](https://platform-manager.SmartSDK.eu/) の
ホームページに移動し、"Authenticate with Fiware" をクリックします。

![img](./images/04-user-first-login-01-platform-auth-01.png
"Home page of SmartSDK Platform Manager")

あなたは、Fiware Lab ログイン・ページにリダイレクトされます。あなたの資格情報を
入力します。

![img](./images/04-user-first-login-02-platform-auth-02.png
"Fiware Lab Login Page")

ログインしたら、あなたのアカウントを作成して有効にするため、公開情報にアクセス
するために SmartSDK プラットフォームを認証する必要があります。

![img](./images/04-user-first-login-03-platform-auth-03.png
"Fiware Lab Authorization Request")

その後、SmartSDK プラットフォームに承認されたユーザとしてリダイレクトされます。

### FIWARE Lab の Swarm のセットアップ

SmartSDK プラットフォームでは、管理者が有効にしているものによって、独自の環境を
作成できます。

環境が作成されると、環境内に新しいホストを追加できます。

ホストを追加すると、そのホストにアプリケーションをデプロイできます。

ここでは、"Docker Swarm" 環境の作成について説明します。ホストは FIWARE Lab で
動作します。

まず、"Environment" タブで "Manage Environments" を選択します。

![img](./images/05-user-setup-swarm-01-select-manage-env.png
"Manage Environments Menu")

次に、"Add Environment" ボタンをクリックします。

![img](./images/05-user-setup-swarm-02-add-new-env.png
"Add Enviroment")

`Name` とオプションの `Description` を入力し、環境テンプレートに `Fiware Swarm`
が設定されていることを確認します。

![img](./images/05-user-setup-swarm-03-new-env-details.png
"Select Swarm as the Enviroment Template")

環境リストにリダイレクトされます。新しく作成された環境を選択し、切り替えます!
(左上隅で選択されているように見えるはずです。)

![img](./images/05-user-setup-swarm-04-list-envs.png
"Select newly created environment")

新しい環境では、ユーザのリストが表示されます。ページの上部に警告が表示され、
"Add a host" リンクをクリックしてください。リンクをクリックして、読み続けます。

![img](./images/05-user-setup-swarm-05-inside-env.png
"Add host warning")

## クラスタを展開

クラスタを展開する前に、必要なすべてのポートが開いていることを確認するために、
FIWARE Lab Cloud でセキュリティ・グループを準備する必要があります。
"Access & Security" セクションの [FIWARE Lab Cloud account](https://cloud.lab.fiware.org)
に移動する必要があります。

![img](./images/05-user-setup-swarm-06-add-host-ports.png
"Add new hosts driver selection")

このデモでは、次のルールが必要です :

| Protocol | Port  | Notes (just FYI)   |
| -------- |:-----:| :----------------- |
|   TCP    | 22    |  SSH               |
|   TCP    | 80    |  HTTP              |
|   TCP    | 443   |  HTTPS             |
|   TCP    | 2376  |  Docker Swarm      |
|   TCP    | 2377  |  Rancher           |
|   TCP    | 2378  |  Rancher           |
|   UDP    | 500   |  IPSec             |
|   UDP    | 4500  |  IPSec             |
|   UDP    | 4789  |  Docker Swarm      |
|   UDP    | 7946  |  Docker Swarm      |
|   TCP    | 7946  |  Docker Swarm      |
|   TCP    | 1026  |  Orion CB          |
|   TCP    | 8668  |  QuantumLeap       |
|   TCP    | 3000  |  Grafana           |

今度は、 Platform Manager に戻り、"Add Host" の手順で FIWARE Lab Rancher UI
ドライバを利用して、FIWARE Lab でホストを自動的に作成します。

別の方法として、この Platform Manager の外に VM を作成して
(例えば FIWARE Lab uiから)、それらの VMs にインストールされている同じ Docker
バージョンを取得し、ここで、下図のようにな "Custom" 選択の指示に従って
そのようなホストを追加します。

![img](./images/05-user-setup-swarm-06-add-host-initial.png
"Add new hosts driver selection")

ただし、このガイドでは、推奨される FIWARE Lab Option を使用する方がはるかに簡単
です。すなわち、必要なソフトウェアと設定でVMを作成するためです。

最初のページで、"FIWARE Lab" ドライバを選択します。

![img](./images/05-user-setup-swarm-07-add-host-fiware-lab.png
"Insert FIWARE credentials")

次に、FIWARE Cloud Lab の資格情報を挿入します。これらの資格情報は通常、
OAuth2 手続きで使用されているものとは異なることに注意してください。これらの
認証情報は OpenStack 認証に使用されるもので、[cloud lab](https://cloud.lab.fiware.org)
で使用するものと同じです。 ユーザ名は実際には完全な電子メールアドレスであり、
"エイリアス"ではありません。

![img](./images/05-user-setup-swarm-08-add-host-fiware-details.png
"Select hosts configuration")

複数のリージョンを有効にしている場合は、新しいホストを作成する場所を選択
できます。選択しようとしているリージョンにセキュリティ・グループが作成されて
いることを確認してください。

![img](./images/05-user-setup-swarm-09-add-host-select-region.png
"Region selection")

次に、デプロイしたいホスト構成に関する情報を提供する必要があります。
複数の VM のリソースがある場合は、それに応じて量を設定することができ、VM 名の
後にインスタンス番号を付けることができます。

![img](./images/05-user-setup-swarm-10-add-host-details.png
"Add hosts configuration details")

**注意 :**  OpenStack のインストールで、MTUが、1500 バイトのデファクト・
スタンダードよりも低い場合は、Docker Engine Option を適切に設定する必要が
あります。

サポートされている構成では、次の設定が必要です :

-   イメージ : `Ubuntu 16.04 LTS`
-   フレーバー : `m1.medium`
-   セキュリティ・グループ : 前の手順で作成したものを選択します。
-   Docker のインストールURL : `https://platform-manager-legacy.smartsdk.eu/install-docker/17.12-smartsdk.sh`
-   ストレージ・エンジン :  `overlay2`
-   Docker Engine のオプション : key: `mtu`, value `1400`
-   ネットワーク : `node-int-net-01`
-   FIP Pool : `federation-ext-net-01

それらのいくつかを設定するには、"ADVANCED OPTIONS" を展開する必要があります。
あなたの設定は、以下の例のようになります。

![img](./images/05-user-setup-swarm-11-add-host-mtu.png
"Save hosts configuration")

**注:**  OpenStack のインストールで、MTU がデファクト・スタンダードの 1500バイト
よりも低い場合は、Docker Engine Option を適切に設定する必要があります。この例
では `spain2` リージョンに必要な値の `1400` が使用されています。

数分の間、ウェイティング・ページが表示されます。バックグラウンドでは、ドライバは
新しく作成されたホストを起動してプロビジョニングしています。

![img](./images/05-user-setup-swarm-13-wait-for-host.png
"Wait for hosts")

## Portainer の準備

しばらく待ってから (通常 2〜3分)、ホストは "active" 状態になっているはずです。

![img](./images/07-host-added-01-display.png
"Host added")

"Swarm -> Portainer" メニューに従って、カスタマイズされた Portainer Web
インターフェイスを起動します。

まず、設定で正しいテンプレートが 次のURL からロードされていることを確認して
ください :
<https://raw.githubusercontent.com/smartsdk/smartsdk-recipes/master/portainer/templates.json>.

![img](./images/09-portainer-01-settings.png
"Portainer Template Settings")

SmartSDK レシピの場合、次のスクリーンショットのように、`frontend` と `backend`
という名前の2つのDocker オーバーレイ・ネットワークを作成する必要があります。
`Spain2` FIWARE Lab node の場合のように、ネットワークで、MTU を減らす必要がある
場合、`com.docker.network.driver.mtu` オプションに `1400` の値を含めるように
注意してください。

![img](./images/09-portainer-02-network.png "Network Creation")

これでWeb グラフィカル・ユーザ・インターフェイス・ツアが終了します。
次のセクションでは、CLI から作業する場合に備えて、コマンドライン指向のツールに
ついて説明します。それ以外の場合は、[あなたのプラットフォーム・サービスを展開](deployservices.md)
のセクションにジャンプする準備が整いました。

### Docker CLI のエクスポート設定

ホストが起動すると、設定をエクスポートできます。この設定は、`docker-machine`
ツールを使用してホストを管理する場合に便利です。この設定を使用して、`ssh` で
ホストに直接接続することもできます。"Infrastructure -> Hosts" に移動し、以下の
ように、"Machine Config" をクリックします。
設定をダウンロードしているホストの IP アドレスを確認します。

![img](./images/07-host-added-02-machine-config-download.png
"Add hosts configuration details")

ssh 接続については、次の例を参照してください。
ダウンロードした設定ファイルを取り出します。

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

ssh を使用してホストと接続し、実行中の Docker コンテナを表示します。
設定をダウンロードしたホストのフォルダ名と IP の値を確認します。

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

`rancher` CLI と `rancher-compose` CLI を使用するには、ツールと API キーをダウンロードする必要があります。

インターフェイスの右下隅から `rancher-compose` CLI をダウンロードします。

![img](./images/07-host-added-03-download-cli-compose.png
"Downloload rancher-compose")

インターフェイスの右下隅から `rancher` CLIを ダウンロードします。

![img](./images/07-host-added-04-download-cli-rancher.png
"Downloload rancher CLI")

API タブからアカウントと Environment API キーを作成してダウンロードします。
正しい環境を選択してください。

API ページの概要。"Add Account API Key" をクリックします。

![img](./images/08-download-api-01-account-api-key.png
"API Creation and download page")

アカウント API キーの名前と説明を入力します。

![img](./images/08-download-api-02-account-api-key.png
"New account API key creation")

アクセス・キー と シークレット・キーを安全な場所にメモしておきます。

![img](./images/08-download-api-03-account-api-key.png
"Account key tokens")

Environment API キーは、"ADVANCED OPTIONS" に隠れているかもしれません。
"Add Environment API Key"をクリックし、Environment API キーの名前と説明を
入力します。

![img](./images/08-download-api-04-env-api-key.png
"New enviroment key creation")

アクセス・キー と シークレット・キーを安全な場所にメモしておきます。

![img](./images/08-download-api-05-env-api-key.png
"Environment key tokens")

## ラップトップに Docker Swarm CLUSTER を作成

このセクションでは、自分のラップトップにクラスタを作成する方法について
説明します。

### 前提条件

ラップトップに Swarm クラスタを作成するには、次の作業が必要です :

1. [Docker Machine](https://docs.docker.com/machine/) でサポートされている
   [VirtualBox](http://virtualbox.org) またはその他の仮想化ソリューションを
   インストールします

1. [Docker](https://docs.docker.com/install/) をインストールします

1. [Docker Machine](https://docs.docker.com/machine/install-machine/) を
   インストールします

1. [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell?view=powershell-6)
   をインストールします (Windows のみ)

### クラスタの作成

#### miniSwarm を使って MacOS X または Linux でクラスタを作成

上記のツールのインストールが完了したら、Linux および MacOS 上で、
[miniswarm](https://github.com/aelsabbahy/miniswarm) を使用してクラスタを
作成できます :

1. miniSwarm をダウンロードします :

        $ curl -sSL https://raw.githubusercontent.com/aelsabbahy/miniswarm/master/miniswarm -o /usr/local/bin/miniswarm
        $ chmod +rx /usr/local/bin/miniswarm

1. 3つのノード (1つのマスターと2つのワーカ) のクラスタを作成します :

        $ miniswarm start 3

1. クラスタに接続します :

        $ eval $(docker-machine env ms-manager0)

miniSwarm の使用法を調べる場合 :

```bash
        $ miniswarm -h
```

#### Windows / Mac / Linux で段階的にクラスタをに作成

1. 3つのDocker 仮想マシンを作成します :

        $ docker-machine create --driver virtualbox ms-manager0
        $ docker-machine create --driver virtualbox ms-worker0
        $ docker-machine create --driver virtualbox ms-worker1

1. 仮想マシンが正しく展開されていることを確認します (あなたの manger IPに調整) :

        $ docker-machine ls

        NAME          ACTIVE   DRIVER       STATE     URL                          SWARM   DOCKER        ERRORS
        ms-manager0   *        virtualbox   Running   tcp://192.168.99.100:2376            v18.02.0-ce
        ms-worker0    -        virtualbox   Running   tcp://192.168.99.101:2376            v18.02.0-ce
        ms-worker1    -        virtualbox   Running   tcp://192.168.99.102:2376            v18.02.0-ce

1. swarm クラスタを初期化します :

        $ docker-machine ssh ms-manager0 "docker swarm init --advertise-addr <ms-manager0-ip>"
        Swarm initialized: current node <node ID> is now a manager.

    この Swarm にワーカーを追加するには、次のコマンドを実行します :

        $ docker swarm join --token <token> <ms-manager0-ip>:<port>

    この Swarm にマネージャーを追加するには、以下を実行してください。そして指示に従ってください ...

        $ docker swarm join-token manager

1. Swarm manager が提供するトークンを使用して、Swarm にワーカーを追加します :

        $ docker-machine ssh ms-worker0 "docker swarm join \
        --token <token> \
        <ms-manager0-ip>:<port>"
        $ docker-machine ssh ms-worker1 "docker swarm join \
        --token <token> \
        <ms-manager0-ip>:<port>"

1. クラスタに接続します :

        $ eval $(docker-machine env ms-manager0)

### クラスタをテスト

1. クラスタ内のノードを一覧表示します :

        $ docker node ls
        ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
        w697ke0djs3cfdf3bgbrcblam *   ms-manager0         Ready               Active              Leader
        fw2ajm8zw4f12ut3sgffgdwsl     ms-worker0          Ready               Active
        z69rvapjce827l69b6zehceal     ms-worker1          Ready               Active

1. Docker サービスを開始します :

        $ docker service create --name helloworld --restart-condition=none alpine ping -c 4 docker.com

        sm3hi368lbsxye3n2rgdwv5xo
        overall progress: 1 out of 1 tasks
        1/1: running   [==================================================>]
        verify: Service converged

1. サービスログを確認します (ctrl+C で終了) :

        $ docker service logs -f helloworld
        helloworld.1.k5jtv8w7zyu2@ms-manager0    | PING docker.com (54.209.102.157): 56 data bytes
        helloworld.1.k5jtv8w7zyu2@ms-manager0    |
        helloworld.1.k5jtv8w7zyu2@ms-manager0    | --- docker.com ping statistics ---
        helloworld.1.k5jtv8w7zyu2@ms-manager0    | 4 packets transmitted, 0 packets received, 100% packet loss

1. サービスを削除します (ping を放置しないでください) :

        $ docker service rm helloworld
        helloworld
