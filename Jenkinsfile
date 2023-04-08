  pipeline {
   agent any
   stages {
    stage('verify') {
        steps {
            sh '''
                sudo docker info
                sudo docker version
                sudo docker compose version
                curl --version
            '''
        }
    }
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
                sh 'docker login -u mingchanoknan -p dckr_pat__3L3A77YUXnCVZTqW2Ls1pWsNME'
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
            dir('HW_devtool_w10') {
                sh "docker-compose up -d" 
            }
        }
    }
}
}