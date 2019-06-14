module.exports = (app) => {
    const nanoid = require('nanoid');
    const path = require('path');
    const urlExists = require('url-exists');

    const Url = require('./UrlModel');

    app.get('/', (req, res) => {
        const htmlPath = path.join(__dirname, 'public', 'index.html');
        res.sendFile(htmlPath);
    });

    app.get('/:short_code', (req, res) => {
        const shortCode = req.params.short_code;

        if (!shortCode) {
            return res.status(200);
        }

        if (shortCode === 'favicon.ico') {
            return res.status(204);
        }

        Url.findOne({ short_code: shortCode }, (err, url) => {
            if (err) {
                return res.status(404).send({ error: err });
            }

            if (!url) {
                return res.status(404);
            }

            return res.redirect(url.original_url);
        });
    });
    
    app.post('/url', (req, res) => {
        let originalUrl;
    
        try {
            originalUrl = new URL(req.body.url);
        } catch (e) {
            return res.status(400).send({ error: err });
        }
    
        urlExists(originalUrl.href, (err) => {
            if (err) {
                return res.status(404).send({ error: err });
            }

            const url = new Url({
                original_url: originalUrl.href,
                short_code: nanoid(7)
            });

            url.save((saveErr) => {
                if (saveErr) {
                    return res.status(500).send({ error: saveErr });
                }

                return res.status(200).json(url);
            });
        });
    });
};