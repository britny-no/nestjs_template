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


```

# 기본 환경

```

pre-commit 설치
  npx husky ini
  
```



# 전달 사항

```
-inflight@1.0.6은 일단 무시
-pre-commit은 api 폴더에서 커밋해야 적용됨

```