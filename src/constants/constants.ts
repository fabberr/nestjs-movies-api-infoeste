export class Defaults {
    /** Application */
    static readonly PORT       = 3000;
    static readonly DATASOURCE = './db/movies.sqlite3';

    /** Pagination */
    static readonly PAGE_NUMBER = 1;
    static readonly PAGE_SIZE   = 10;
}

export class Routes {
    static readonly API_REFERENCE = '/api/openapi';
    static readonly MOVIES        = '/api/movies';
}
