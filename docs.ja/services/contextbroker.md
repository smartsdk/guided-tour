# Context Broker 内の大気質データをクエリ

## 前提条件

本ガイドのこのセクションは、[プラットフォーム](../platform/swarmcluster.md)を
既にデプロイし、[Orion Context Broker](../platform/deployservices.md) を導入
していることを前提としています。

Orion Context Broker にデータを挿入するセンサがあることも前提としています。
何も持っていない場合は 、以下のように、[entity-simulator](https://github.com/smartsdk/entities-simulator)
を使っていくつかのデータ注入をシミュレートすることができます。あなたの環境で
Orion の URL を使って、`ORION_URL` の値を設定する必要があります。

```
$ ORION_URL=http://$(docker-machine ip ms-manager0):1026
$ docker run -ti --rm -e ORION_URL=${ORION_URL} smartsdk/entities-simulator
```

もっと洗練されたものを試してみたいと思えば、[FIWARE Device Simulator](https://fiware-device-simulator.readthedocs.io)
があります。

## Postman Collection

経験を簡単にするために、[PostMan](https://www.getpostman.com/) などの REST
クライアントを使用できます。Postman は、この [postman collection](https://github.com/smartsdk/smartsdk-recipes/blob/master/recipes/tools/postman_collection.json)
を SmartSDK Recipes リポジトリからインポートできます。Postman Collectionは
[ここ](https://www.getpostman.com/docs/v6/postman/collections/intro_to_collections)に書かれています。

## クエリ・エンティティ

最も簡単なクエリは、格納されているすべてのエンティティを取得することです。

Postman Collection では、`Orion` フォルダ内で Orion のエンティティ に GET クエリを使用します。

curl を使用するコマンドラインから、

```
curl -X GET ${ORION_URL}/v2/entities -H 'Accept: application/json'
```

詳細については、[Orion's Queryの公式ドキュメント](http://fiware-orion.readthedocs.io/en/latest/user/walkthrough_apiv2/index.html#query-entity)を参照してください。
