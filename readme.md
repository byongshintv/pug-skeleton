# pug-skeleton
pug-skeleton은 pug-nodejs 웹 개발 환경에서 비슷한 페이지를 찍어내려고 할 때 최대한의 효율성을 뽑아낼 수 있도록 만들어진 서버사이드 프레임워크입니다. 

## 시작하기
    
아래와 같은 코드를 사용해 이 템플릿을 내려받은 후 프로젝트 이름을 정의 해 주세요.

    git clone https://github.com/byongshintv/pug-skeleton
    yarn init

## 새로운 페이지 생성
내려받은 후 아래의 디버그 스크립트로 새로운 페이지를 작성 할 수 있습니다.

    yarn createpage

생성된 새로운 페이지는 프로젝트 폴더의 pages 하위 폴더에 생성됩니다. 

파일경로를 기반으로 한 컴포넌트 디자인 패턴으로 각각의 페이지를 관리하기 때문에, 페이지를 추가 혹은 삭제할때 페이지가 동봉된 폴더를 삭제하는것 외에 추가로 명시되어야하는 사항은 없습니다.

위와 같은 명령어로 프로젝트에 생성되는 파일들은 아래와 같습니다.

파일명           |       설명
----------------|----------------
$filename.pug   | 페이지의 html 파일입니다 
$filename.js    | 페이지의 js 파일입니다.
$filename.css   | 페이지의 css 파일입니다.
apirouter.js    | $filename과 ajax통신을 주고받기 위한 인터페이스를 기술하는 라우터입니다.
config.json     | 현재 경로에 대한 컴포넌트 데이터를 담고있는 파일입니다.

나는 컨트롤러나 모델이 군데군데 굴러댕기는걸 극혐하기 때문에 극한의 캡슐화로 mvc를 경로 하나에 합쳤습니다.

그러므로 해당 프레임워크를 사용할때에도 /router/를 수정하지 말고 apirouter.js 파일을 적극적으로 활용할것을 권장합니다.

## 서버 구동
생성된 페이지를 아래의 명령어로 확인 할 수 있습니다.

    yarn server


## common.js, common.css
/public/css/index.css와 /public/js/index.js는 모든 페이지에서 사용합니다.

콘솔에다가 <code> yarn inspect</code>를 때리고 src/index.scss나 index.ts를 수정하면 각각의 js,css파일이 수정됩니다. 
