@Library(value="kids-first/aws-infra-jenkins-shared-libraries", changelog=false) _

ecs_service_type_1_standard {
  projectName = "kf-arranger-admin"
  agentLabel = "terraform-testing"
  environments = "dev,qa,prd"
  docker_image_type = "alpine"
  entrypoint_command = "pm2-runtime index.js" 
  deploy_scripts_version = "master"
  quick_deploy = "true"
  external_config_repo = "false"
  container_port = "443"
  vcpu_container             = "1024"
  memory_container           = "2048"
  vcpu_task                  = "1024"
  memory_task                = "2048"
  health_check_path = "/status"
  dependencies = "ecr"
  friendly_dns_name = "arranger-admin"
}
