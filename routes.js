module.exports = (app) => {
    const nanoid = require('nanoid');
    const urlExists = require('url-exists');

    const Url = require('./UrlModel');

    app.get('/', (req, res) => {
        const htmlPath = path.join(__dirname, 'public', 'index.html');
        res.sendFile(htmlPath);
    });
    
    app.post('/url', (req, res) => {
        let originalUrl;
    
        try {
            originalUrl = new URL(req.body.url);
        } catch (e) {
            return res.status(400).send({ error: 'Invalid URL!' });
        }
    
        urlExists(originalUrl.href, (err) => {
            if (err) {
                return res.status(404).send({ error: 'Invalid URL!' });
            }

            const url = new Url({
                original_url: originalUrl.href,
                short_code: nanoid(7)
            });

            console.log(url);

            url.save((saveErr) => {
                if (saveErr) {
                    return res.status(500).send({ error: saveErr });
                }

                return res.status(200).json(url);
            });
        });
    });
};