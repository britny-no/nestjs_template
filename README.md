## 파일 구성

```
docker-compose.yaml: docker production 파일
docker-compose.infra.yaml: 개발, Jenkins(ci/cd) 환경 구축

```

## Jenkins 사용시(굳이? github에서 pr에 따라 hooking하는게 더 나을듯)

```
1. docker compose -f docker-compose.infra.yaml up
2. NodeJS 플러그인 설치:
   -Jenkins 대시보드에서 Manage Jenkins > Manage Plugins로 이동하여 NodeJS 플러그인을 설치합니다.
   -Manage Jenkins > Global Tool Configuration에서 NodeJS를 설정합니다.
3. Git 플러그인 설치(선택):
   -Manage Jenkins > Manage Plugins에서 Git 플러그인도 설치합니다.
4. AWS CLI 플러그인 설치(선택):
   -ECS에 배포를 위해 AWS CLI 플러그인 또는 AWS CLI를 Jenkins에서 사용할 수 있도록 설정합니다.
   -Jenkins 서버에 AWS CLI를 설치하고 AWS 인증 정보를 설정합니다 (aws configure).
5. Jenkins Pipeline 작업 생성
   -Jenkins 대시보드에서 새로운 Item을 선택하고 Pipeline을 선택한 후 파이프라인 이름을 지정합니다.
   -Pipeline 섹션에서 Jenkinsfile을 직접 입력하거나 Git 저장소에서 Jenkinsfile을 로드할 수 있습니다.
   *Git 저장소에서 Jenkinsfile을 로드하려면, Pipeline script from SCM을 선택하고, 저장소 URL을 입력합니다. 이 때, Jenkinsfile이 저장소의 루트 디렉토리에 위치해야 합니다.
```

## dotenv-vault로 환경변수 관리

dotenv-vault고려해 각 NODE_ENV = production || staging || development

```
1. dotenv-vault 로그인후 vault 키값로 팀원별로 연동
2. 기존 키값 pull
   npx dotenv-vault@latest pull {production || staging || development}
3. 새로운 키값 push
   npx dotenv-vault@latest push {production || staging || development}
```
