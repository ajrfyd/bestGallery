## BestGallery

### 진행중인 기능 
- ~~~infinite scroll~~~
- 언마운트 애니메이션


### Infinite Scroll
1. useObserver
```js
export const useObserver = ({
      target,
      onIntersect, // 타겟이 감지되면 실행할 callback 함수
      root = null, // 타겟의 가시성을 확인할 때 사용. 타겟 상위 요소, 즉 조상 요소. 설정하지 않거나 root 값을 null 로 주었을 때 기본 값으로 브라우저 뷰포트가 설정.
      rootMargin = "0px", // root의 범위를 확장할 수 있다.
      threshold = 1.0, // 어느 정도 타겟 요소가 보여 졌는지에 따라 콜백을 실행. 1.0 = 타겟이 100%다 보여 졌을때. 0.5 = 타겟이 반절 보여 졌을때
  }) => {
      useEffect(() => {
          let observer

          // 넘어오는 element가 있어야 observer를 생성할 수 있도록 한다.
          if (target && target.current) {
              // callback의 인자로 들어오는 entry는 순환자. 복잡한 로직을 필요로 할때가 많다. 
              observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
              // 감지
              observer.observe(target.current)
          }

          // observer 정리 
          return () => observer && observer.disconnect()
      }, [target, rootMargin, threshold])
  }
```
2. observer
```js
  // 타겟과 루트가 전혀 교차하지 않았음에도 호출 되는 것은 Intersection Observer의 기본동작. 이를 예외처리 하기 위해서 intersectionRatio를 사용하거나 아래의 방법 사용.
  const onIntersect = (entries, observer) => {
    // isFetching && entries[0].isIntersecting && fetchNextPage();
    // if (entry.intersectionRatio <= 0) return
    if(!entries[0].isIntersecting) return
    entries[0].isIntersecting && fetchNextPage();
  }
```
3. data 요청 함수
- 만약 response에 다음 페이지 엔드포인트 혹은 정보가 없을 경우
- 밑의 방식으로 리턴한 다음 getNextPageParam 에서 리턴해준다.
```js
  return {
      result: data.results,
      next: pageParam + 1
  }
```

4. 무한 스크롤 문제점
```js
  // if(status === 'loading') return <Loading hasMargin/>
```
- return 전에 저런식으로 상태에 따라 로딩을 보여주면 
- 무한스크롤이 진행되지 않는다.
- 왜?? 요놈 때문에 고생