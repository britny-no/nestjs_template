# 개요
```
전통적 구조의 NestJS 템플릿
```

# 기본 환경

```

코드 컨벤션: ESLint + Prettier
  eslint.config.mjs

테스트 & 테스트 커버리지: Jest
  npm run test
  npm run test:cov

복잡도 및 코드 분석: ESLint

의존성 순환 체크: Dependency Cruiser
  npx depcruise --config dependency-cruiser.config.js src

pre-commit: husky
  api 폴더속 .husky 없으면 초기화 필요
    npx husky init


```

# 기본 환경

```

pre-commit 설치
  npx husky ini
  
```



# 전달 사항

```
- inflight@1.0.6은 일단 무시
- pre-commit은 api 폴더에서 커밋해야 적용됨
- huskey로 docker-compose.yml을 위한 루트 모듈 못둠
- exception 종류: HttpException, DomainException
  - 전통적 방식이면 HttpException 비중을 늘리고, CQRS에 NestJS 종속성을 줄이고 싶으면 DomainException 비중을 늘린다
- 핸들러에서 command/query/event 파라미터 사용되지 않으면, _앞에 붙이기
- Domain Exception은 추상화 하지 않는다. 사례 조금더 발견되면 추상화
  - Infrastructure Exception은 추상화
- Domain/Application(NestJs)/Infrastructure Exception GlobalFilter에서 catch 하도록
- DTO는 엔드포인트별로 생성하기에, controller 메서드 명을 기반으로 DTO 명칭 정한다
  - List로 명칭 정해져도, 안에 내용이 단순 요소 한개만 다루고 스웨거상 LIST 표시 할수도 있다
- infrastructure 폴더를 분리해, 외부 의존성 분리
```