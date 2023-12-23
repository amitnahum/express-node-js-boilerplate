import { DataSource } from 'typeorm';
import { Container } from 'typedi';

export function DataSourceLoader(entity: any, dataSource: any): CallableFunction {
    return function (constructor: Function) {
        const source: DataSource = Container.get(dataSource());
        Container.set(constructor.name, source.getRepository(entity).extend(constructor));
    };
}
