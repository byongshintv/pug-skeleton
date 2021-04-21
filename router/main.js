/**
 * api 라우팅은 pages 폴더내의 apiroute.js에 정의되어 있습니다.
 */

const pug = require('pug');
const path = require('path')
const fs = require('fs');
const pageDatas = require('../tools/pages').getPageDatas();
const { dir } = require('console');


module.exports = function(app){
    //메인페이지
    app.get('/',(req,res) => {
        res.render("index", {sidebarData:pageDatas})
    })

    pageDatas
        .forEach((branch) => { (branch.list || [branch]).forEach(page => {
            const branchKey = branch.config.name
            //config.json의 isEnable 세팅이 false인 경우 라우트를 시도하지 않음
            if( !(page.config.isEnable || true) ) return 
            const thisURLPath = branch.config.type == "page" ? `/page/${branchKey}` : `/page/${branchKey}/${page.name}`;

            app.get(thisURLPath, (req, res) => {
                const htmlRaw = pug.compileFile(page.pugPath)(
                    {sidebarData:pageDatas}
                );
                res.send(htmlRaw)
            })
        })})
}
