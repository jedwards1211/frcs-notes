#!/bin/sh

rm -rvf build
mkdir -p build/web/assets

cp -urvp index.html build/web

echo CACHE MANIFEST >> build/web/frcs-notes.appcache
echo index.html >> build/web/frcs-notes.appcache

for file in data.js config.js assets/bundle.js
do
  set -- $(md5sum $file)
  md5=$1
  ext=${file##*.}
  base=${file%.*}
  newname=${base}-${md5}.${ext}
  cp -v $file build/web/$newname
  echo $newname >> build/web/frcs-notes.appcache
  perl -pi -e "s|${file}|${newname}|g" build/web/index.html
done

for file in assets/*
do
  if [ $file != "assets/bundle.js" ]
  then 
    cp -v $file build/web/assets
    echo ${file} >> build/web/frcs-notes.appcache
  fi
done