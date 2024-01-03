# Tech Stack

- React + TypeScript + Vite + Emotion + Zustand + GSAP

# Feature

- OPEN API를 이용해 3개의 random 단어 제시
- 알파벳 선택 횟수를 8회까지 제한하고 단어에 존재하지 않은 알파벳은 붉은색 & 클릭 불가
- GSAP를 이용해 교수형 처해지는 사람을 표현
- 반응형 적용

# Issue

- Missed Alphabet 저장

  - 틀린 알파벳을 저장하는 방식을 떠올리는게 힘들었다. 틀린 횟수도 필요하고 어떤 단어들이 틀린 것인 지도 알아야하기 때문에 배열로 저장.
  - 배얄의 길이 : 틀린 횟수
  - 배열의 내용 : 틀린 알파벳 구별
  - 중복된 알파벳이 저장되는 문제 발생 -> 중복된 내용은 자동으로 제거 되는 set을 이용해 중복 제거.

- 배포 에러
  - 깃헙 페이지 배포 시 index.html안에 main.tsx를 호출하지 못해 404 오류 발생(vite프로젝트의 경우 발생)
  - 프로젝트 내에 배포시 실행되는 yml파일을 생성하므로 해결.

# To-be

- Player 수를 정할 수 있는 선택지를 제공해서 여러명이 플레이할 수 있도록 제공
