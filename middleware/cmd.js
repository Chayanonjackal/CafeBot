// module.exports = function cmd(req,res,next){
//     // try {
//         // console.log("mess");
//         console.log(req);
//         // return next();
//         // console.log(next);
//         return next() ;
        
//     // } catch (error) {
//     //     return console.log(error);
//     // }
// }
module.exports = function cmd(req, res, next) {
    console.log('test');
    return next();
}
