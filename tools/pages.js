/**
 * 출력물 예시
 * [
  {
    name: 'mproject',
    list: [ [Object], [Object] ],
    config: { tabOrder: 10, name: 'mproject', nameKor: '프로젝트관리' }
  },
  {
    name: 'mresearch',
    list: [ [Object] ],
    config: { tabOrder: 20, name: 'mresearch', nameKor: '연구개발관리' }
  }

object:
  {
    "name": "mresearch",
    "pugPath": "C:\\Users\\LDG\\Desktop\\개인용\\pophelper\\pages\\a\\aa\\aa.pug",
    "routerPath": "C:\\Users\\LDG\\Desktop\\개인용\\pophelper\\pages\\a\\aa\\apirouter.js",
    "config": {
      "name": "mresearch",
      "nameKor": "연구개발관리",
      "isVisibleSideNav": true,
      "isEnable": true,
      "tabOrder": 10
    }
  },
      
}
 */
const path = require('path')
const fs = require('fs');
function getPageDatas(){
        // './pages'의 default폴더를 제외한 모든 폴더 수집
        const pageRootPath = path.join(__dirname, "../pages")
        const datas = fs.readdirSync(pageRootPath)
            .filter(branchName => {
              const branchPath = path.join(pageRootPath, branchName)
              if(branchName === "default") return false
              //디렉토리의 config.json파일이 없거나 잘못된경우 파싱대상에서 제외
              return fs.existsSync( path.join(branchPath,"config.json"),"utf-8");
            })
            .map(branchName => {
                const branchPath = path.join(pageRootPath, branchName)
                let branchConfig = JSON.parse( fs.readFileSync( path.join(branchPath,"config.json"),"utf-8") );

                const getPageData = (pageName,isRootPage=false) => {
                    const thisPageDir = isRootPage ? branchPath : path.join(branchPath, pageName)
                    return {
                        name: pageName,
                        pugPath: path.join(thisPageDir, pageName+".pug"),
                        routerPath: path.join(thisPageDir, "apirouter.js"),
                        config: JSON.parse( fs.readFileSync( path.join(thisPageDir,"config.json"), "utf-8") ),
                    }

                }

                if(branchConfig.type === "page"){
                  return getPageData(branchName,true)

                }
                const branchDirectory = fs.readdirSync(branchPath)
                    //페이지 폴더에 config.json이 없는 경우 건너뛰기
                    .filter(pageName => {
                        const configDir = path.join(branchPath, pageName,"config.json")
                        return fs.existsSync(configDir)
                    })
                    //페이지 경로 데이터를 json에 압축
                    .map(pageName => getPageData(pageName))
                    .sort((pageA,pageB) => pageA.config.tabOrder - pageB.config.tabOrder)
                return {
                    name:branchName,
                    list:branchDirectory,
                    config:branchConfig
                }
            })
            .sort((pageA,pageB) => pageA.config.tabOrder - pageB.config.tabOrder)
            return datas
}


module.exports = { getPageDatas }