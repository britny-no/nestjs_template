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

```