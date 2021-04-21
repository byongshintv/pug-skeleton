module.exports = function(app)
{
    app.get('api/$[folderName]/dailytracker',(req,res) => {
        const isSuccess = true
        res.json({
            status:isSuccess ? "success" : "error",
            apiid:"$[folder]/dailytracker",
            result: {

            }
        })
    })


}