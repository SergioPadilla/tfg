#!/bin/bash
WORKDIR=/Users/$USER/workdir/.docker

IMAGE=mongo:3.4
CONTAINER=$USER-mongo
PORT=27017

docker rm -f $CONTAINER
docker run --name $CONTAINER -v $WORKDIR/$CONTAINER/data/db:/data/db -p $PORT:27017  -d $IMAGE
