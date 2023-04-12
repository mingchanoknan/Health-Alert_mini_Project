  pipeline {
   agent any
//    environment {
//         DOCKER_CREDS = credentials('docker-access-')
//    }
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
                sh 'docker login -u mingchanoknan --password dckr_pat_oK9mimodZdOjDTDFAesL4lDfNtQ'
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