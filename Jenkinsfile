pipeline {
    agent any

    environment {
        CONATINER_NAME='wordapi'
        AZURECR_CREDENTIALS_ID = "ufstdev.azurecr.io"
        AZURE_SERVICEPRINCIPAL_ID = "azure-service-principal"
    }    

    stages {
        // stage('Build') {
        //     steps {
        //         sh '''
        //             npm install
        //         '''
        //     }
        // }
        stage('Docker login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${env.AZURECR_CREDENTIALS_ID}", passwordVariable: 'PW', usernameVariable: 'USERNAME')]) {
                    sh '''
                        docker -D login -u ${USERNAME} -p ${PW} ufstdev.azurecr.io
                    '''
                }
            }
        }
        stage('Build container') {
            steps {
                sh '''
                    docker build -t ufstdev.azurecr.io/${CONATINER_NAME}:latest .
                '''                        
            }
        }
        stage('Push container') {
            steps {
                sh '''
                    docker push ufstdev.azurecr.io/${CONATINER_NAME}:latest
                '''
            }
        }
        stage('Deploy container') {
            steps {
                withCredentials([azureServicePrincipal("${env.AZURE_SERVICEPRINCIPAL_ID}")]) {
                    sh '''
                        az container create --resource-group UFST-dev-RG --name wordapi --image ufstdev.azurecr.io/wordapi:latest --dns-name-label wordapi --ports 80
                    '''
                }
            }
        }
    }
}