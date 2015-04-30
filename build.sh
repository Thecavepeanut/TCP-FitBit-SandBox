#!/bin/bash

#install node modules
npm i || sudo npm i &&

#install material icons
bower i &&

#install typescript defs
tsd reinstall -so &&

#start grunt to build the front end and rebuild anytime it's code is changed.
#todo dist will minify the files
if [[ $1 = "dist" ]]; then
    grunt build
else
    grunt
fi