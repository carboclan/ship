/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log('Index');
  res.render('index', { title: 'Express' });
};
