# horse-racing

Horse-racing application is a combination of 2 smaller applications, a worker fetching the horse racing results and populating a mongo db database and a web application servig the results and giving the opportunity to the user to add a result in case it is considered necessary.

Starting the application is fairly easy. In docker-compose file, located in the root folder, add the authentication password for the result fetching api endpoint and run

```
docker-compose up -d
```

(you do not have to run in detached mode but it highly suggested.)

The above command will spin up 3 containers, the two apps described above and a mongodb instance. User name and password are hardcoded for the database in the docker.compose file as it is not considered a security issue in this context.
