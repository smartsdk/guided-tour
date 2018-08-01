# 履歴データを保存し、クエリし、ダッシュボードを作成

## 前提条件

このガイドのこのセクションは、[デプロイされたプラットフォーム](../platform/swarmcluster/)と、[デプロイされたコア・サービス](../platform/deployservices/)がすでにあることを前提にしています。また、[このセクション](contextbroker/)で指摘したように、Orion Context Broker へのデータ・フローがあることも前提としています。

簡単にするために、*QuantumLeap* と *Orion* のエンドポイントを環境変数に保存して、以下のコマンドを少しでも調整して再利用できるようにします。

```
$ export ORION_URL=http://192.168.99.100:1026
$ export QL_URL=http://192.168.99.100:8668
```

もちろん、Windowsでは、`export` の代わりに `setx` を使用し、`$VAR` の代わりに `%VAR%` を使用してください。

## QuantumLeap に Context Broker からの大気質データを格納

QuantumLeap は、Orion の挿入に関する NGSI 通知を受け取ったときに、エンティティの履歴データを追跡します。したがって、Orion では、履歴レコードを保持したいエンティティの変更を QuantumLeap に通知するために、NGSI サブスクリプションを作成する必要があります。

[Orion のサブスクリプション](http://fiware-orion.readthedocs.io/en/latest/user/walkthrough_apiv2/index.html#subscriptions)で豊富な経験がある方は、必要に応じて Orion インスタンスでサブスクリプションを作成して、Orion インスタンスが QuantumLeap を見つけるのに必要な正しい notify_url を使用するようにしてください。

それ以外の場合は、QuantumLeap に依頼してください。このために、Orion にサブスクリプションを作成する API エンドポイント `/v2/subscribe` があります。デフォルトでは、Orion に入るすべてのエンティティのすべての変更について通知を受け取るサブスクリプションを作成します。このガイドについてはこれで十分です。ただし、通知の範囲を調整する場合は、デプロイされた QuantumLeap の `/v2/ui` エンドポイントを確認してください。たとえば、`${QL_URL}/v2/ui` です。

[SmartSDK Postman Collection](https://github.com/smartsdk/smartsdk-recipes/blob/master/recipes/tools/postman_collection.json) を使用している場合は、QuantumLeap フォルダ (QL Subscribe) 内のこのエンドポイントに対する準備済みのコールがすでに用意されています。

それ以外の場合は、次のようにコマンド行からエンドポイントを呼び出すことができます。

```
$ curl -X POST \
  "${QL_URL}/v2/subscribe?orionUrl=${ORION_URL}/v2&quantumleapUrl=${QL_URL}/v2" \
  -H 'Accept: application/json'
```

以前の POST から **201 CREATED** コードを受け取ったはずです。Orion のサブスクリプションをクエリして、QuantumLeap のサブスクリプションを見つかるかどうかを確認してください。また、Postman collection でこのクエリを見つけるでしょう、そうでなければ curl を使用して行うことができます...

```
$ curl -X GET ${ORION_URL}/v2/subscriptions/ -H 'Accept: application/json'
[{"id":"5ae2faa8cfdf0100fa49eb1f","description":"Created by QuantumLeap ...]
```

特定のエンティティ・タイプのみをトラッキングする場合は、エンティティ・タイプごとに1つのサブスクリプションを使用します。

この時点で、あなたは「ちょっと待って、なぜ、QuantumLeap が Orion に通知するように、Orionに依頼するのか？」と考えているかもしれません。答えは、Orion は多くの FIWARE デプロイメントの中心的な部分であり、Broker であるため、すべての情報が最初に流れています。

## QuantumLeap を使用して大気質データをクエリ

QuantumLeap の Querying API はまだ開発中ですが、特定のエンティティの 1またはN 属性の履歴データの簡単なクエリを使用していくつかのテストを行うことができます。

Postman Collection でこれらのクエリを見つけるか、コマンドラインから試してみてください...

例 : `airqualityobserved_0` の `precipitation` 属性の履歴値

```
$ curl -X GET \
  "${QL_URL}/v2/entities/airqualityobserved_0/attrs/precipitation?type=AirQualityObserved" \
  -H 'Accept: application/json'
```

例 : `airqualityobserved_0` の `NO2` と `CO2` 属性の履歴値

```
$ curl -X GET \
  "${QL_URL}/v2/entities/airqualityobserved_0?type=AirQualityObserved&attrs=NO2,CO&lastN=4" \
  -H 'Accept: application/json'
```

QuantumLeap の API は `${QL_URL}/v2/ui` か、[swagger specification](https://github.com/smartsdk/ngsi-timeseries-api/blob/master/specification/quantumleap.yml) でダイレクトにアクセスできます。

## QuantumLeap と Grafana を使って素敵なダッシュボードを作成

[サービスのデプロイ](../platform/deployservices/)に関するセクションを辿った場合、Grafana のインスタンスにアクセスして、履歴データと対話する準備がほとんどできているはずです。

`GRAFANA_URL` と呼ばれる変数に保存されたインスタンス URL を持っているとしましょう。

```
export GRAFANA_URL=http://192.168.99.100:3000
```

インスタンス `${GRAFANA_URL}/login` にログインします。デフォルトの資格情報は admin/admin ですが、後で変更する必要があります。

最初にデータソースを設定する必要があります。これは、前の手順 (つまり、QuantumLeap が既にデータを処理している場合) を経た後にのみ行うことができます。気になるエンティティタイプごとに1つのデータソースを作成します。以下の[手順](https://smartsdk.github.io/ngsi-timeseries-api/admin/grafana/)に従ってください。

これで、データソースを使用してダッシュボードを作成する準備が整いました。何かを始めたいのであれば${GRAFANA_URL}/dashboard/import、grafana / dashboard_example.jsonにアクセスしてインポートすることができます。結果は次のようになります...

![dashboard_example](grafana/dashboard_example.png "Dashboard Example")

それ以外の場合は、[grafanaの公式ドキュメント](http://docs.grafana.org/guides/getting_started/)を読むことをお勧めします。
