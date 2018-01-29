# SmartSDK Guided Tour

[![Documentation Status](https://readthedocs.org/projects/guided-tour-smartsdk/badge/?version=latest)](http://guided-tour-smartsdk.readthedocs.io/en/latest/?badge=latest)

Welcome to the guided tour on SmartSDK platform. This guided tour, by means of a
small application example, provides a simple introduction to different services
developed in the context of SmartSDK project for the FIWARE ecosystem.

## Contributions

Contributions to the documentation are welcome in the form of pull requests.

If you spot any issue in the documentation, you can open an issue, and we will
check your issue and eventually correct the error in the
documentation.

ReadTheDocs documentation is generated automatically out of [MarkDown (MD)](https://guides.github.com/features/mastering-markdown/)
docs. To ensure consistency of the documentation style, we recommend you to
adhere to the MD [linting rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md).
Compliancy with such rules is checked through a Travis CI process. Once you make
a pull request to the repository, you will be able to observe the results of
the compliancy verification in your PR. Merge will be only possible if CI
process is passed successfully.

You can check and build the docs by yourself on your machine using a
[custom dockerimage](https://hub.docker.com/r/dancn/guided-tour-builder/):

``` shell
docker run -it --rm -v "$(pwd):/docs" dancn/guided-tour-builder
```

Should you have a solution yourself, feel free to make a pull request!
