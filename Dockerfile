FROM mongo:3.6.8
CMD mongod --fork --logpath /var/log/mongodb.log; \
  mongorestore /tmp/dump/; \
  mongod --shutdown; \
  docker-entrypoint.sh mongod

