pipeline {
    agent any

    environment {
        PROJECT_PATH = "/home/data/jenkins/workspace/$JOB_BASE_NAME"
        WEB_ROOT_PATH = '/app/filscan.web'
    }

    stages {
        stage('PREPARE') {
            steps {
                script {
                    env.LAST_STAGE_NAME = "$env.STAGE_NAME"
                    env.GIT_COMMIT_EMAIL = sh(script:'git --no-pager  show -s --format=%ae', returnStdout: true).trim()
                    env.GIT_COMMIT_AUTHOR = sh(script:'git --no-pager  show -s --format=%an', returnStdout: true).trim()
                    env.GIT_COMMIT_DATE = sh(script:'git --no-pager  show -s --format=%ad', returnStdout: true).trim()
                    env.PROJECT_URL = sh(script:'git --no-pager config --local remote.origin.url', returnStdout: true).trim()
                }
                sh '''#!/bin/bash
                source /root/.bashrc
                nvm use v16.13.0
                nvm alias default v16.13.0
                node --version
                '''
            }
        }

        stage('INSTALL') {
            steps {
                script {
                    env.LAST_STAGE_NAME = "$env.STAGE_NAME"
                }
                sh '''#!/bin/bash
                source /root/.bashrc
                node --version
                npm -v
                npm config get registry
                df -h
                ls "$PROJECT_PATH"
                npm install --legacy-peer-deps
                '''
            }
        }

        stage('BUILD') {
            steps {
                script {
                    env.LAST_STAGE_NAME = "$env.STAGE_NAME"
                }
                sh '''#!/bin/bash
                source /root/.bashrc
                node --version
                npm -v
                npm run build:test
                '''
            }
        }

        stage('UPLOAD') {
            steps {
                script {
                    env.LAST_STAGE_NAME = "$env.STAGE_NAME"
                }
                sh '''#!/bin/bash
                tar -czvf dist.tar.gz dist
                ansible 192.168.1.189 -m copy -a "src=$PROJECT_PATH/dist.tar.gz dest=$WEB_ROOT_PATH/dist.tar.gz mode=0777"
                ansible 192.168.1.189 -m shell -a "cd $WEB_ROOT_PATH && tar -xzvf dist.tar.gz"
                '''
            }
        }

        stage('RESET') {
            steps {
                script {
                    env.LAST_STAGE_NAME = "$env.STAGE_NAME"
                }
                sh '''#!/bin/bash
                source /root/.bashrc
                nvm use system
                nvm alias default system
                ansible 192.168.1.189 -m shell -a "cd $WEB_ROOT_PATH && rm -rf dist.tar.gz"
                rm -rf "$PROJECT_PATH/node_modules"  "$PROJECT_PATH/package-lock.json"
                '''
            }
        }
    }
}

