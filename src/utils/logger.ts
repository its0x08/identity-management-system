import winston from 'winston';
import expressWinston from 'express-winston';

const expressLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: process.env.COMBINED_LOGFILE,
            level: 'combined'
        }),
        new winston.transports.File({ 
            filename: process.env.ERROR_LOGFILE,
            level: 'error'
        })
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    ignoreRoute: function (req, res) { return false; }
})

export default expressLogger;