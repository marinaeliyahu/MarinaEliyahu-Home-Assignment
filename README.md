# MarinaEliyahu-Home-Assignment
home assignment 

# Backend express

 CMD cd **mese-home-assignment/backend express**

## Run in Docker container 

1. Run `docker compose -f docker-compose.dev.yml up`  
2. Run `docker compose -f docker-compose.dev.yml up --build`
3. Run `docker compose -f docker-compose.dev.yml up --build -d` 
4. Navigate to `http://localhost:3000/`

## Run local code

1. Run `npm install`
2. Run `npm run dev`

# Angular Project

 CMD cd **mese-home-assignment/mese-home-assignment/ui-jobs/angular-project**

## Run Docker 

1. Run `docker build -t angular-docker .`  
2. Run `docker run -p 4200:4200 angular-project`
3. Navigate to `http://localhost:4200/` 

## Run local code

1. Run `npm install`
2. Run `npm run dev`
3. Navigate to `http://localhost:4200/` 

# tests
   
1. Run `npm install cypress --save-dev`
2. Run `npx cypress open`