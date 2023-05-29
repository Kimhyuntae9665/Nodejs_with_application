
// ? require 끼고 있는것들이 module이다 
var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log("여기: "+_url);


    var queryData = url.parse(_url,true).query;
    // ?"parse"는 주어진 문자열을 구문적으로 분석하여 필요한 정보를 추출하는 의미입니다.
    // ? 받아온 _url의 query문을 반환해 준다 (key-value  이런 형태로 ){ id: 'JavaScript' }
    console.log(queryData);


    var title = queryData.id;
    // ? 받아온 query문에서 ? 뒤에 있는게 query문 에서 key-value값이 Data 형태를 value만 반환해준다 
    console.log("여기3: "+title);


    if(url == '/'){
      title = 'Welcome';
    }
    if(url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
        
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`,'utf8',(err,description)=>
    {var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="index.html">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>
        ${description}
        </p>
      </body>
      </html>
    
    `;
    response.end(template);
  })
    
 
});
app.listen(3000);
 