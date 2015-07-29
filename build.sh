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
  cp $file build/web/${base}-${md5}.${ext}
  echo https://frcs.xyz/notes/${base}-${md5}.${ext} >> build/web/frcs-notes.appcache
  perl -pi -e "s|${file}|${base}-${md5}.${ext}|g" build/web/index.html
done

for file in assets/*
do
  [ "${file##*.}" != "js" ] && echo https://frcs.xyz/notes/${file} >> build/web/frcs-notes.appcache
done

mkdir -p build/frcs-notes-local

cp -urvp build/web/frcs-notes.appcache build/frcs-notes-local
cp config-local.js build/frcs-notes-local/config.js
cp index.html build/frcs-notes-local

perl -pi -e "s|frcs-notes.appcache|https://frcs.xyz/notes/frcs-notes.appcache|g" build/frcs-notes-local/index.html

for file in data.js assets/bundle.js
do
  set -- $(md5sum $file)
  md5=$1
  ext=${file##*.}
  base=${file%.*}
  perl -pi -e "s|${file}|https://frcs.xyz/notes/${base}-${md5}.${ext}|g" build/frcs-notes-local/index.html
done