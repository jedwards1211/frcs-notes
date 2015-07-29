#!/bin/sh

rm -rvf build
mkdir -p build/web

cp -urvp assets build/web

echo CACHE MANIFEST >> build/web/frcs-notes.appcache
echo index.html >> build/web/frcs-notes.appcache
cp index.html build/web

for file in data.js config.js assets/bundle.js
do
  set -- $(md5sum $file)
  md5=$1
  ext=${file##*.}
  base=${file%.*}
  newname=${base}-${md5}.${ext}
  cp $file build/web/$newname
  echo $newname >> build/web/frcs-notes.appcache
  perl -pi -e "s|${file}|${newname}|g" build/web/index.html
done

for file in assets/*
do
  [ "${file##*.}" != "js" ] && echo ${file} >> build/web/frcs-notes.appcache
done