


const axios = require('axios');
const jsdom = require("jsdom");
var request = require('request');
const cors = require('cors')
const express = require("express");
const app = express();



app.use(cors())
app.get("/", (express_req, express_res) => {
    try {
        axios.get(
            'https://app.schoology.com/login',
            {
                headers: {
                    'authority': 'app.schoology.com',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'accept-language': 'en-US,en;q=0.9',
                    'cache-control': 'max-age=0',
                    'cookie': 'has_js=1',
                    'origin': 'https://app.schoology.com',
                    'referer': 'https://app.schoology.com/login',
                    'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                }
            }
        )
        .then(res => {
            const dom = new jsdom.JSDOM(res.data)
            const form_build_id = dom.window.document.querySelectorAll("input")[6]["value"]

            var headers = {
                'authority': 'app.schoology.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'has_js=1',
                'origin': 'https://app.schoology.com',
                'referer': 'https://app.schoology.com/login',
                'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
            };

            var dataString = `mail=dabbingshrekbru%40gmail.com&pass=072405dl&school=&school_nid=&form_build_id=${form_build_id}&form_id=s_user_login_form`;

            var options = {
                url: 'https://app.schoology.com/login',
                method: 'POST',
                headers: headers,
                body: dataString
            };

            request(options, (e, r, b) => {
                const cookie = r.headers['set-cookie'][0].split(";")[0]

                fetch('https://app.schoology.com/home', {
                    headers: {
                        'authority': 'app.schoology.com',
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'accept-language': 'en-US,en;q=0.9',
                        'cache-control': 'max-age=0',
                        'cookie': `has_js=1; ${cookie}`,
                        'referer': 'https://app.schoology.com/login',
                        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        'sec-fetch-dest': 'document',
                        'sec-fetch-mode': 'navigate',
                        'sec-fetch-site': 'same-origin',
                        'sec-fetch-user': '?1',
                        'upgrade-insecure-requests': '1',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                    }
                })
                .then(res => res.text())
                .then(data => {
                    express_res.writeHead(200, { "Content-Type": "text/plain" });
					express_res.write(data);
					express_res.end();
                })
            });
        })
    }
    catch {
        res.writeHead(400, { "Content-Type": "text/plain" });
		res.write("ERROR");
		res.end();
    }
})


app.listen(8000, "127.0.0.1", function() {
	console.log("\nListening on: http://127.0.0.1:8000/\n")
})

