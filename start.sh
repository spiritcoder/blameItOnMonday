#!/bin/bash
npm install -f
pm2 startup systemd
pm2 start index.js --name "TwitterBot"
pm2 save
pm2 monit