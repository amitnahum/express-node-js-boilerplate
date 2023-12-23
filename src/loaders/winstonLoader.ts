import { configure, format, transports } from 'winston';

import { config } from '../config';

export const winstonLoader = () => {
    configure({
        transports: [
            new transports.Console({
                level: config.log.level,
                handleExceptions: true,
            }),
        ],
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
    });
};
