  pipeline {
   agent any
   environment {
        DOCKER_CREDS = credentials('DOCKER_CREDS')
   }
   stages {
    // stage('verify') {
    //     steps {
    //         sh '''
    //             docker info
    //             docker version
    //             docker compose version
    //             curl --version
    //         '''
    //     }
    // }
    stage('logout') {
        steps {
            script {
                sh 'docker logout'
            }
        }
    }
    stage('login docker') {
        steps {
            script {
                sh 'echo $DOCKER_CREDS | docker login -u mingchanoknan --password-stdin'
            }
        }
    }
    stage('Build docker') {
        steps {
            dir('Health-Alert_mini_Project') {
                    sh 'docker-compose build'
                }
        }
    }
    stage('Push to docker hub') {
        steps {
            sh 'docker-compose push'
        }
    }
    stage('docker run image') {
        steps {
            dir('Health-Alert_mini_Project') {
                sh "docker-compose up -d" 
            }
        }
    }
}
}