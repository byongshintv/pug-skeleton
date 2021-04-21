const prompt = require('prompt');
const fs = require('fs')
const path = require('path')

const pagesDatas = require("./tools/pages").getPageDatas()

function onErr(err) {
    console.log(err);
    return 1;
}

function replaceAll(rawStr, test){
    Object.entries(test).forEach( ([key,value]) => {
        rawStr = rawStr.replaceAll(`$[${key}]`,value)
    })
    return rawStr
}

async function main(){
        
    prompt.start('');
    const schema = {
        properties : {
            branchName : {
                message : "페이지가 생성될 루트 폴더를 입력 해 주세요",
                require : false,
                default: "/"
            },
            pageName : {
                message : "페이지의 영문 명칭을 입력 해 주세요",
                require : true,
                pattern : /^[^\\/?%*:|"<>]+$/
            },
            pageNameKor : {
                message : "페이지의 한글 명칭을 입력 해 주세요",
                require : true
            }
        }
    }
    prompt.get(schema, async (err, args) => {
        const {branchName, pageName, pageNameKor} = args
        if (err) { return onErr(err); }

        // 내보낼 페이지의 경로 생성
        const exportPath =  path.join(__dirname,`pages/${branchName}/${pageName}`)
        if( fs.existsSync(exportPath) ){
            console.log(`이미 생성된 페이지입니다. ${exportPath}를 확인하고 적절한 조치를 취해주세요.`)
            return
        }
        
        // 페이지 구성품의 기본 파일들 가져오기
        const pathDefaultPage = path.join(__dirname,"pages/default")
        const createBranchTabOrder = () => pagesDatas.map(v => v.config.tabOrder).reduce( (a,b) => a > b ? a : b , 0) + 10

        //페이지의 상위경로가 부재할경우 생성
        if( !fs.existsSync( path.join(exportPath,"../")  )){
            fs.mkdirSync( path.join(exportPath,"../"));
            const {question:branchKor}  = await prompt.get({  message : "폴더의 한글명칭을 입력 해 주세요.",  require : true })
            let configBranchRaw = fs.readFileSync( path.join(pathDefaultPage,"configbranch.json") ,"utf-8");
            configBranchRaw = replaceAll(configBranchRaw,{ 
                tabOrder : createBranchTabOrder(), 
                branchName, branchKor
            })
            fs.writeFileSync(path.join(exportPath,"../config.json"),configBranchRaw,"utf-8")

        }
        fs.mkdirSync(exportPath);




        // 가져온 기본 파일을 새로운 페이지 폴더에 뿌려주기
        fs.readdirSync( pathDefaultPage )
            .forEach( fileName => {
                const pathDefaultFile = path.join(pathDefaultPage,fileName );
                const pathOutputFile = path.join(exportPath, replaceAll(fileName,args) );
                let fileRaw = replaceAll( fs.readFileSync(pathDefaultFile,"utf-8"), args)


                //브런치경로가 없는 루트 페이지인 pug 파일일때 extends 경로 오류 이슈 해결
                if( branchName === '/' && fileName.match(/\.pug/) )
                    fileRaw = fileRaw.replace("../../../views/main.pug","../../views/main.pug") 

                //파일명에 분기가 필요한 경우
                switch(fileName){
                    // config 파일인 경우 사이드바의 순서에 사용할 taborder property 정의
                    case "config.json":
                        const pagesDatas = require("./tools/pages").getPageDatas()
                        //탭오더 정의
                        const tabOrder = branchName === '/' ? createBranchTabOrder() : pagesDatas
                            .filter(branch => branch.config.name === branchName)[0]["list"]
                            .map( thisPage => thisPage.config.tabOrder )
                            .reduce((a,b) => a>b ? a:b,0) + 10
                        fileRaw = replaceAll(fileRaw,{ tabOrder })
                    break;
                    //configbranch.json는 폴더에서 사용하는 설정 파일이므로 복사하지 않고 종료
                    case "configbranch.json":
                        return;
                }
                
                fs.writeFileSync(pathOutputFile,fileRaw,"utf-8")
            })

        console.log(`${exportPath}페이지가 생성되었습니다.`)

    });



}

main()