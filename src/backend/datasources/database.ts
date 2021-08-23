import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Pool } from 'pg';

export class DataCenter extends DataSource {
    public db:Pool;
    public context:any;
    constructor(props: {
        db:Pool
    }) {
        super();
        this.db = props.db;
    }

    override initialize(config:DataSourceConfig<any>) {
        this.context = config.context;
    }
}