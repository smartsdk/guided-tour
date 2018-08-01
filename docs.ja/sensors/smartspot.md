# Smart Spot Starter Kit のユーザ・ガイド

## イントロダクション

シンプルで直感的な方法でスマート・スポットを始めるために、明らかな教育目的を持った Smart Spot Starter Kit というオープンソース・ソリューションを開発しました。このキットを入手して、このガイドに従うだけで、デバイスを管理し、スマートフォンに接続しているデバイスとは別にボード・センサからデータを取得することができます。

これを実現するために、私たちはフィジカル Web のようなテクノロジーを活用しています。ネイティブのアプリケーションをインストールする必要はなく、Bluetooth 経由でデジタル・コンテンツの "push" 通知を送信するデバイスにより、ユーザはスマートフォン経由でやり取りします。

スマート・スポットは、大気汚染を監視するために、特定の地点で NO2, CO, SO2, O3 をリアルタイムで測定します。マス・フロー・コントローラとゼロ・エア・ジェネレータを備えた洗練された高精度ラボでは、機械学習アルゴリズムを使用して、センサ感度の精度を向上させ、相互感度の影響を軽減しています。

スマート・スポットによって収集されたデータの管理と管理のために、メンテナンス・プラットフォームが必要です。私たちのデバイスは、FIWARE のような、OMA LWM2M を使用するプラットフォームでリモート管理できます。スマート・スポットデータを管理するために FIWARE を導入し、既存の FIWARE エコシステムに私たちのソリューションを統合しています。

オプションで、このシステムは、スマートフォンの WiFi スイッチ・オンを使用している人を検出し、特定の地域の人ごみに関する情報を提供します。

## あなたは何が必要ですか？

Smart Spot Starter Kit には何が含まれていますか :

   1. [ESP32 DevKitC](http://a.co/6nSNpvA):
      ![ESP32-DevKitC](./images/ESP32-DevKitC.png)
   2. Starter Kit のファームウェア
      * フィジカル Web
      * 群衆のモニタリング
      * LwM2M サーバ
      * I2C センサとの統合
      * GPIO ドライバ
   3. [拡張ボード](http://www.hopu.eu/):
      * 温度、湿度および圧力センサ
      * 加速度計とジャイロスコープ
      * 光度センサ
      * RGB led
      * GPIO Led
   4. マイクロ USB ケーブル
   5. [スマート・スポット・大気質の拡張ボード](http://www.hopu.eu/)
   6. I2C ケーブル (拡張ボードに同梱)
      ![I2C ケーブル](./images/I2C.png)
   7. 4 x [ガス・センサ](http://www.alphasense.com/index.php/air/):
      * 二酸化硫黄 (赤色)
      * オゾンと二酸化窒素 (黄色)
      * 一酸化炭素 (緑色)
      * 二酸化窒素 (オレンジ)

      ![Device manager](./images/sensor.png)


## 入門

## デバイス構成

この章は、Windows ユーザのためのガイドです。別の OS を使用している場合は、次のリンクで詳細を見つけることができます : [ESP-IDF](http://esp-idf.readthedocs.io/en/latest/get-started/index.html)

   1. まず、このリンクをクリックして、[ESP32 ツールチェーン](https://bit.ly/2js02AW)をダウンロードする必要があります。解凍して安全な場所に置きます。このガイドでは、環境が "C:\" に配置されていることを前提としています。

   2. ESP32 API も必要です。ダウンロードするには、端末を開いて IDF を配置するディレクトリに移動し、次のコマンドを使用します :

      ```
      $ git clone --recursive https://github.com/espressif/esp-idf.git

      $ git checkout tags/v3.0-rc1

      $ git submodule update –init
      ```

      PCを再起動するたびに、次のコマンドを使用して、IDF\ \_PATH を定義する必要があります。

      ```
      $ export IDF\_PATH=&quot;C:/msys32/home/user-name/esp/esp-idf&quot;
      ``` 

      パスを永続的に設定する場合は、次のリンクを参照してください : <https://bit.ly/2KxiunW>

   3. Smart Sport Firmware をダウンロードする時間です。次のコマンドを使用して、別のディレクトリにある端末を開き、ファームウェアをクローンする必要があります :

      ```
      $ git clone –-https://github.com/HOP-Ubiquitous/SmartSpot\_SmartSDK\_Firmware.git
      ```

   4. すべてをダウンロードしたら、ファームウェアをフラッシュするために、ESP32 ツールチェーンを開きます。ツールチェインを配置したディレクトリに移動し、mingw32 ファイルを実行します。

      ![Device manager](./images/directory.png)

   5. ESP32 を PC に接続します。その後、デバイス・マネージャに行き、そのポート番号 "COM3" を探します。

      ![Device manager](./images/device-manager.png)

      ESP32 を フラッシュできない場合は、ドライバをダウンロードする必要があります。ここでダウンロードしてください。

      [USB to UART Bridge](https://bit.ly/2v0gwnS)

   6. ESP32 を点滅させる時です。Mingw32 ターミナルを開き、ポートと bootloader.bin, smartspot-esp32.bin, partitions_singleapp.bin, esptool.py のディレクトリをコピーします。

      * **esptool.py ディレクトリ**
      * **ポート**
      * **Bootloader.bin ディレクトリ**
      * **smartspot-esp32.bin ディレクトリ**
      * **partitions_singleapp.bin ディレクトリ**

      次のコマンドの太字で置き換えます :

      ```
      $ python 
      /c/Users/HOPU/GitHub/esp-idf/components/esptool_py/esptool/esptool.py
      --chip esp32 --port COMX --baud 115200 --before default_reset --after
      hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size
      detect 0x1000
      C:/Users/HOPU/GitHub/SmartSpot_SmartSDK_Firmware/bootloader.bin 0x10000
      C:/Users/HOPU/GitHub/SmartSpot_SmartSDK_Firmware/smartspot-esp32.bin
      0x8000
      C:/Users/HOPU/GitHub/SmartSpot_SmartSDK_Firmware/partitions_singleapp.bin 
      ```

      コマンド全体をコピーし、ESP32 のフラッシュに使用します。
             
      ![Sensors](./images/python.png)

      ファームウェアを正常にフラッシュすると、上記のようなメッセージが表示されます。

### 拡張ボードの統合

デバイスのエンドポイントがわからない場合は、シリアル・ポートのログを使用するために、このコマンドを使用できます。ポート設定を使用することを忘れないでください :


```
$ miniterm.py COMX 115200
```

エンドポイントは次のようになります :

   ![endPoint](./images/endPoint.png)


   ![Board](./images/board.png)

これは、拡張ボードのコンポーネントの詳細なリストです :

* **Bme280** : このよく知られている Bosch のセンサは、±3%の精度で湿度、±1 hPaの絶対精度の気圧、±1.0°C の精度で温度を測定します。SPI または I2C のどちらでも使用できます。

* **Mpu6050** : このセンサには、MEMS 加速度センサと MEMS ジャイロが1つのチップに搭載されています。これは、各チャンネルの 16ビットアナログ/デジタル変換ハードウェアが含まれているため、非常に正確です。そのため、x, y, z チャンネルを同時にキャプチャします。センサは I2C バス・インターフェースを使用します。

* **Opt3001** : 可視光の強度を測定するセンサです。センサのスペクトル応答は、人間の目の明所応答に緊密に一致し、顕著な赤外線拒絶を含みます。

* **WS2812** : インテリジェント制御 LED 光源で、制御回路と RGB チップが 5,050個の部品で構成されています。内部には、デジタル・ポート・ラッチおよびリシェイプ増幅ドライブ回路が内蔵されています。各色は異なる意味を持ち、スマート・スポットの現在の状態を表します :

    * Purple :ソフトウェアを起動します
    * Blue : グローバル・コネクティビティに接続します
    * Orange : ブートストラップ中。LwM2Mサーバへの接続中
    * Green : デバイスが完全に機能しています
* **GPIO Led** : 単に ESP32 の GPIO ピンで制御される Led です。ダッシュボードから管理、および、オン/オフを切り替えることができます。

拡張ボードは完全にプラグ・アンド・プレイです。以前に ESP32 を正しくフラッシュしていたのであれば、ESP32 のプラグを差し込むだけで済みます。

   ![Expansion Board with ESP32](./images/boardWithESP32.png)

### ガス・センサの統合

アイデアは、Smart Spot Starter Kit とガス・センサを接続することです。利用可能なガスの間で、大気の質 (OMS によって必要とされるガス) を定量するのに最も重要なものを選択しました。最も興味深いのはユース・ケースだけでなく、測定の訂正を実行する興味深いガスです :

* NO2: 二酸化窒素 (インスタンス0)

* O3: オゾン (インスタンス1)

* CO: 一酸化炭素 (インスタンス2)

* SO2: 二酸化硫黄 (インスタンス3)

   ![Sensors](./images/sensors.png)

拡張ボードとスマート・スポット大気質の拡張ボードの接続を行うには、I2C ケーブルを2つの I2C スマート・スポットコネクタのいずれかに接続するだけです。I2C ガス・コネクタに関して、すべてのポートはガスと一致しなければなりません :

| ポート | ガス               |
| ----   |:------------------:|
| J3     | NO2                |
| J4     | O3                 |
| J5     | CO                 |
| J6     | SO2                |
| J7     | 進行中の作業       |
| J8     | 進行中の作業       |

スマート・スポット LwM2M クライアントは、ガス・センサの興味深い変数に関する情報を提供するために特別に作成された *"SmartSpot ガス濃度"* と呼ばれる独自の OMA LwM2M オブジェクトと、標準IPSO アライアンスの濃度オブジェクトの両方を提供します。この最後のものに関する情報と仕様はこの[リンク](https://bit.ly/2FDVC2s)にあります。

これらのオブジェクトはマルチインスタンスです。各被分析物 (測定されるガス) は、ID インスタンスを有しています。たとえば、CO の現在の濃度値を知りたい場合、*3325/2/5700* のリソースを読み取る必要があります。

### デバイスのデプロイメント

スマート・スポットには、デバイスが接続される事前設定された WiFi ステーションがあります。このアクセス・ポイントは、スマートフォン、GSM ルータ、一般的な WiFi アクセス・ポイントから簡単にデプロイすることができます...

デフォルトの設定は次のとおりです :
SSID name: **defaultSSAP**
Password: **defaultSSAP1234**

デバイスをネットワークに接続するには、スマートフォン (HotSpot) またはルータにデフォルトのSSID 名とパスワードでアクセス・ポイントを作成する必要があります。このアクセス・ポイントが作成されると、デバイスは自動的に接続されます。

Wi-Fi ホットスポットを使用すると、モバイル・データ接続をスマートフォンでワイヤレスで共有できます。"Wireless & Network" の "Settings" メニューで、Wi-Fi ホットスポットを有効にする場所を確認します。上記の SSID とパスワードを変更する必要があります。

   ![Connection](./images/connection.png)


## インフラストラクチャのデプロイ

ユーザとデバイスとの間の対話および構成を容易にするために、FIWARE インフラストラクチャがデプロイされます。これにより、LwM2M クライアントの接続と設定、データの保存、およびカスタムアプリケーションの構築が可能になります。デバイスを接続する LwM2M サーバがある場合は、このセクションを飛ばすことができます。

### 前提条件

* Ubuntu 16.04 以上。[ここ](https://bit.ly/2emfC27)で見つけることができます

* Docker。[ここ](https://dockr.ly/2rgbOBK) か [ここ](https://do.co/2FZsV13) を参照してください

* Docker Compose。[ここ](https://dockr.ly/2IdnNKU) を参照してください

### 構成

アーキテクチャ内のサービスは、docker-compose ファイルを使用してデプロイされます。すべてのドキュメントとコードが[ここ](https://bit.ly/2KA6Kku)にあります。

リポジトリは、次のコマンドで簡単に複製できます :

```
$ git clone https://github.com/HOP-Ubiquitous/fiware-docker-infrastructure
```

#### Ubuntu ユーザ

したがって、構成オプションはこのファイルで明示的に宣言されます。複雑な構成のサービスについては、簡単な説明が追加されています。

HOP Ubiquitous の github で見つけることができるガイドラインは、ローカル・ホストの展開を想定していることを考慮してください。分散デプロイメントを行っている場合は、適切なポートを開き、IP のアドレスが互いに異なる別のホストをお互いにデプロイしてください。

#### Windows ユーザ

Windows ユーザは、PC に Ubuntu を実行するために仮想マシンをインストールする必要があります。[VirtualBox](https://www.virtualbox.org/) はこの問題解決のオプションです。新しい仮想マシンを作成し、名前を選択し、Linux と Ubuntu の32ビットまたは64ビットのバージョンを入力します。次のダイアログ・ウィンドウで、仮想マシンで使用するオプションを選択します。

仮想マシンをはじめて起動すると、VirtualBox は Ubuntu インストールファイルについて質問します。このウィンドウのダイアログでファイルを検索すると、Ubuntu がインストールを開始します。

Smart Spot Open Hardware を正しく動作させるには、ネットワーク・アダプタが "bridge adapter mode" であることを考慮する必要があります。このオプションは、VirtualBox / configuration / network にあり、"connect to" をドロップ・ダウンして、"Bridge adapter" を選択します。

#### デプロイされたサービス

##### IoT Agent の設定

OMA LwM2M 情報モデルを OMA NGSI エンティティ、属性およびメタデータにマッピングすることができるように、対応を反映した構成ファイルが作成されます。docker-compose/ ディレクトリの config.js には2つのブロックがあります :

* LwM2M Serverの設定。サーバポート、使用されているコンテンツ形式、サービスのログ・レベルなどの設定を指定します

* NGSI 構成。http サーバ、ストレージ、プロトコル間のマッピングに関する情報を指定します。一方、動的な構成はサービス API を使用して実行できます。このサービスの postman コレクションは、スケルトン・テンプレートを提供します。

コンポーネントの詳細については、[LwM2M IoT エージェントガイド](http://fiware-iotagent-lwm2m.readthedocs.io/en/latest/)を参照してください。

##### Cygnus の構成

agent.conf 情報が保持されるチャネルとデータベースを設定するには、agent.conf ファイルをdocker-compose/ ディレクトリに設定する必要があります。このファイルは設定ファイルとして Docker コンテナにロードされます。デフォルトでロードされるファイルの例は、この [url](https://bit.ly/2w70Cgu) にあります。以前の例では、さまざまなコネクタのそれぞれをデータベースに初期化する方法を確認できます。

Orion に届く情報を永続化させるためには、コールバックの URL として Cygnus を設定して、Orion にサブスクリプションを作成する必要があります。作成するサブスクリプションの例は、メインディレクトリ内の [postman](https://www.getpostman.com/) コレクションにあります。コンポーネントの詳細については、[Cygnus Guide](http://fiware-cygnus.readthedocs.io/en/latest/) を参照してください。

##### QuantumLeap, Crate, Grafana の設定

これらの3つのコンポーネントは共同して、Orion Context Broker の情報を視覚的に表現します。QuantumLeap は、サブスクリプションを通じて Orion から情報を受け取り、その情報を Crate データベースに格納するライブラリです。最後に、grafana コンテナは、デプロイされた Crate データベースをデータソースとして設定できるユーザ・インタフェースを使用して Web サービスを起動します。このサービスの相互作用の詳細なガイドは、use-cases/ ディレクトリにあります

##### Perseo-core と Perseo-fe の構成

Perseo CEPは、複雑なイベント処理 (CEP) モジュールです。このモジュールでは、Perseo-core はルール・エンジンである Perseo CEP のバックエンドです。着信イベントをチェックし、何らかのアクションが必要な場合は、POST リクエストを通じて Perseo-fe を呼び出します。Perseo-fe は定期的に、Perseo-core ルールのセットをリフレッシュします。Perseo-core が Perseo-fe にアクションを送信するとき、それは SMS、電子メール または HTTP によるアクションの送信を担当します。このサービスの相互作用の詳細なガイドは use-cases/ ディレクトリ にあります。Perseo CEP が通知を送信するためには、以下のサーバを設定している必要があります。docker-compose/ ディレクトリに含まれる docker-compose.yml ファイル。Perseo 設定で使用できる環境変数は、この URL にあります。

### ビルド、デプロイ、実行

アーキテクチャの構築と実行には、以前のステップである IoT Agent コンテナのビルドを含む必要がある [docker-compose](https://docs.docker.com/compose/overview)を使用する必要があります。これは、LWM2M IoT Agent の未熟状態によるものです。現時点では、コードにいくつかの変更が必要です。このため、デバイスと Orion の相互運用性を保証するために、変更されたソースコードが提供されています。

### LWM2M IoT Agent を構築

IoT Agent フォルダ内で次のコマンドを実行します :

```
$ docker build -t "iotagent:latest" $(pwd)
```

IoT Agent がその設定を受信するためには、config.js ファイルが docker-compose ディレクトリ (fiware-docker-infrastructure/docker-compose/config.js) に存在していなければなりません。このディレクトリには、デバイスと orion との間でマッピングする必要がある情報が含まれます。このセクションでは、これらのセクションの概要と構成方法について説明します :

* \`config.lwm2m\`: このセクションは、設定している Lwm2m サーバ、LwM2M リクエストを受信するポート、デフォルトのデバイス・タイプ、使用されているプロトコルに関する設定です

* \`config.ngsi\`: このセクションは、LwM2M IOT-Agent と対話する予定のサービスとデバイスに関する設定です。
    * \`ContextBroker\`: Orion Context Broker のホスト ip とポートをここで修正する必要があります。
    * \`server\`: サーバのポートを別のポートで実行したい場合にのみ、サーバ・ポートを変更します。デフォルトのポートは4042です。この同じポートは、適切な IP アドレスを指定して、providerURL にも設定する必要があります
    * \`deviceRegistry\`: デバイス登録を格納するために使用されるデータベース・タイプです。mongodb インスタンスでなければなりません
    * \`mongodb\`: MongoDB の ip、ポート、および データベースの名前です
    * \`types\`: これは最も重要なセクションの1つです。このセクションでは、デバイス・タイプのリソース・マッピングが指定されます。デフォルトとして残すことができる一連のセクションはありますが、以下のセクションはありません
        * \`lazy\`:このセクションでは、読みたい LwM2M リソースを指定します。名前とタイプをそれぞれ修正する必要があります
        * \`active\`: 今回はアクティブなリソースのため、レイジー・セクション・バスに似ています。IoT Agent は、デバイス接続後にすべてのアクティブなリソースにオブザーバを設定します
        * \`lwm2mResourceMapping\`: このセクションは、遅延リソースとアクティブ・リソースをマッピングするために読み込まれる必要な OMA-LwM2M リソースを設定するセクションです
    * \`providerURL\`: LwM2M IOT Agent API が利用可能になる URL です。サーバ・セクションの指定されたポートは、ここで同じである必要があります。

この[ファイル](config.js)には、[HOP Ubiquitous の gitHub](https://github.com/HOP-Ubiquitous/fiware-docker-infrastructure)にある FIWARE Docker インフラストラクチャの例として、config.js ファイルがあります。そのリポジトリの readme ファイルには、Docker インフラストラクチャを展開するための完全なガイドがあります。

### docker-compose によるアーキテクチャの構築

docker-compose.yml ファイルを見てください。このファイルでは、ホストマシンと内部にデプロイされる Docker コンテナとの間のポート・マッピングを見つけることができます。マッピングの左側にあるすべてのポートに到達可能であることを確認します。例えば :

```
...

iotagent:

  image: iotagent

  ports:

    - "5693:5683/udp"
...
```

Docker コンテナの 5683 に接続されてい ホスト・マシンの 5693 ポートは、ネットワークから到達可能でなければなりません。

次のコマンドは Docker コマンドです。現在のインストールでは、root 権限を持たないコマンドを実行することはできません。この問題を解決するには、現在のユーザを Docker グループに追加する必要があります。グループが存在し、実行できることを確認します :

```
$ sudo gpasswd -a $USER docker
```

これで、root ユーザでのアクセスなしですべての docker コマンドを実行できるようになりました :

まず、docker-compose コマンドを実行できるようにするには、docker-compose ディレクトリに移動する必要があります。その後、インフラストラクチャを立ち上げることができます。

インフラストラクチャを立ち上げます :

```
$ docker-compose up
```

バックグラウンドでインフラストラクチャを起動します :

```
$ docker-compose up -d
```

インフラストラクチャを停止します :

```
$ docker-compose down
```

停止した Docker のすべてのコンテナを消去します :

```
$ docker rm $(docker ps -a -q)
```

### デバイスを初期化 : ブートストラップ

すべての LwM2M デバイスは、ブートストラップと呼ばれる前の手順が必要です。このようにして、デバイスは接続する LwM2M サーバのアドレスを取得します。この手順を実行するには、このガイドでは、Leshan Bootstrap サーバを使用します。Leshan は Eclipse Foundation による LwM2M サービスに関するオープンソース・プロジェクトです。オンラインの[ブートストラップ・サーバ](http://leshan.eclipse.org/bs)を含む、一連の優れたサービスを提供します。

既に取得しているデバイスでは、Leshan はすでにブートストラップ・サーバとして設定されています。Leshan の Web サイトでは、次のデータを入力してデバイスを登録する必要があります :

* クライアントエンドポイント : デバイスは固有のエンドポイント名を持っています。(たとえば、HOP240ac403f14e)

* LwM2M サーバ の URL : たとえば、"coap://iotAgentIP:ioTAgentPOR"。お使いのデバイスが "iotAgentIP" に接続できるネットワークに接続されていること、またインターネットに接続されていることを確認してください

   ![Bootstrap Configuration](./images/bootstrapConfiguration.png)

このプロセスが完了すると、デバイスはオンになり、ブートストラップ手順を実行する準備が整います。

### LWM2M のデプロイメントをテスト

* すべてが実行され、デバイスがオンになると、デバイスと FIWARE サービス間の通信が開始され、次のような GET リクエストを ORION Context Broker に送信してテストできます。

    * Orion から 50 のエンティティを取得 : このリクエストは、ORION Context Broker が格納しているエンティティを50の制限で取得します

      ```
      curl --header "fiware-service:SmartSpot" 
      http://orionIP:orionPORT/v2/entities?limit=50
      ```

    * Orion からデータ・モデルとしてエンティティを取得 : このリクエストは前のものと同じになりますが、エンティティを FIWAREデータ・モデル・フォーマット で取得できます

      ```
      curl --header "fiware-service:SmartSpot"
      http://orionIP:orionPORT/v2/entities?options=keyValues&limit=50
      ```

    * GET types v2 : ヘッダとして指定された、fiware-service エンティティの登録済み属性のタイプを取得します

      ```
      curl --header "fiware-service:SmartSpot" 
      http://orionIP:orionPORT/v2/types
      ```

* 以上のステップがすべて正しく実行されると、リクエストされた情報が検索され、ORION API はあらゆる種類のアプリケーションで使用できる状態になります。

* 詳細については、次のリンクを参照してください :

    * [FIWARE Orion Context Broker](https://bit.ly/2rhiZK5).

    * [FIWARE-IOTAgent LwM2M](https://bit.ly/2whpiDp).

## 互換性とバージョン

docker-compose サービス記述は、大半のサービスでバージョン・タグを使用しません。これは、プルを実行する時点でのサービスの最終バージョンの使用を意味します。MongoDB バージョンや IoT Agent のように、ホスト・マシンにビルドする必要がある例外がいくつかあります。

## 必要なこと

FIWARE セキュリティ・スタックを追加します。必要なユーザ・ケースにコンポーネントを適合させて、異なる docker-composes を作成します。ダイアグラムを変更し、perseo のドキュメントを追加してください。

## 拡張性

HOP Ubiquitous からは、デプロイ可能なサービスの拡張にかなり関心があります。他の FIWARE コンポーネントに関する経験があれば、お気軽にお問い合わせください。

### Maintainers

<german@hopu.eu> (FIWARE 設定)  
<joseluis@hopu.eu> (FIWARE 設定)  
<felipe@hopu.eu> (FIWARE 設定)  
<rafa@hopu.eu> (Device 設定)  

## 既知の問題点

現在、IoT Agent のメモリの問題が発見されています。このエラーはサービス停止を意味し、このため、再起動条件は、docker-compose ファイルで提供されます。
