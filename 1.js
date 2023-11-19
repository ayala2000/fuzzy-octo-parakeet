
const http = require('http');
const data = {
    name: "frontendguruji",
    category: "technology",
    website: "frontendguruji.com",
};
http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case "POST": {
            if (reqURL === "/post-api") {
                postHandler(request, response);
            }
            break;
        }
        case "GET": {
            if (reqURL === "/get-api") {
                getHandler(request, response);
            }
            break;
        }
        default: {
            cont.defaultHandler(resquest, response)
        }
    }
})
    .listen(8000, function () {
        console.log("server start at port 8000");
    });
//defult
const defaultHandler = (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
    });
    response.write(
        JSON.stringify({
            message: `API not found at ${request.url}`,
        }));
    response.end();
};
//get
const getHandler = (request, response) => {

    response.writeHead(200, {
        "Content-Type": "application/json",
    });
    response.write(
        JSON.stringify({
            message: "GET Succesfull",
            data,
        })); response.end();
};
//post
const postHandler = (request, response) => {
    let chunks = [];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    });
    request.on("end", () => {
        const data = Buffer.concat(chunks);
        const parsedData = qs.parse(data.toString());
        console.log(parsedData);
        response.writeHead(200, {
            "Content-Type": "application/json",
        });
        response.write(
            JSON.stringify({
                message: "POST Succesfull",
            })
        );
        response.end();
    });
};

