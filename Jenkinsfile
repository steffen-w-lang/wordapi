pipeline {
    agent any

    environment {
        CONATINER_NAME='wordapi'
    }    

    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh ...
                    npm install
                ...
            }
        }
        stage('Docker login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${env.ARTIFACTORY_CREDENTIALS_ID}", passwordVariable: 'PW', usernameVariable: 'USERNAME')]) {
                    sh ...
                        docker -D login -u ${USERNAME} -p ${PW} ufstdev.azurecr.io
                    ...
                }
            }
        }
        stage('Build container') {
            steps {
                sh ...
                    docker build -t skatligning-docker-local.artifactory.ccta.dk/${CONATINER_NAME}:latest .
                ...                        
            }
        }
        stage('Push container') {
            steps {
                sh ...
                    docker push ufstdev.azurecr.io/${CONATINER_NAME}:latest
                ...
            }
        }

    }
}