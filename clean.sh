#!/bin/bash
rm -rf _build
sudo pip uninstall --cache-dir .cache/pip Pygments setuptools docutils mock pillow alabaster commonmark recommonmark mkdocs
rm -rf .cache/pip
