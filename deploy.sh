#!/bin/bash

echo "got short-term credentials from portal_user admin?"
bun run build
aws s3 sync --delete out s3://portalcdkstack-appf1b96344-l5x909km6zzv
