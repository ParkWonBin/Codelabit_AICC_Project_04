


```shell
sudo docker ps -a
sudo docker start my-nginx
sudo docker exec -it my-nginx bash
```

```shell
vim /etc/nginx/conf.d/default.conf

nginx -s reload
exit
sudo docker restart my-nginx
```