#!/bin/bash
node r.js -o build.js
mkdir dist/js/lib
cp js/lib/require.min.js dist/js/lib/require.min.js
