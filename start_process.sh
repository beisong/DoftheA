#!/usr/bin/env bash

meteor run --port 3000 --settings settings.json > meteor_logs/$(date +"%F|%T").log & >/dev/null 2>&1 & echo $! > meteor.pid

