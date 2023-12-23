import * as winston from 'winston';
import { LoggerInterface } from './LoggerInterface';
import { Service } from 'typedi';

@Service()
export class Logger implements LoggerInterface {
    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        if (winston) {
            winston[level](message, args);
        }
    }
}
