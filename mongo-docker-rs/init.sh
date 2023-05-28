docker volume create mongors1-volume
docker volume create mongors2-volume
docker volume create mongors3-volume

docker network create replica-sets-network

docker compose up -d --remove-orphans

docker network connect replica-sets-network mongors1
docker network connect replica-sets-network mongors2
docker network connect replica-sets-network mongors3

read -r -p "Enabling first replica set wait 5 seconds or press any key to continue immediately" -t 5 -n 1 -s
docker exec -it mongors1 mongosh mongodb://127.0.0.1:27017 --eval "rs.initiate({_id : 'replica-set-0', members: [{ _id : 0, host : 'mongors1:27017' },{ _id : 1, host : 'mongors2:27017' },{ _id : 2, host : 'mongors3:27017'}]})"

exit

