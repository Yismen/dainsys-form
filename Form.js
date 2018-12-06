import Error from './Error.js';

export default class Form {
    constructor(data, options = {}) {
        let reset = typeof(options) == "boolean" ? options : true

        this.default = Object.assign({
            reset: reset
        }, options);

        this.fields = {}
        this.files = new FormData()

        for (let field in data) {
            // this[field] = data[field];
            this.fields[field] = data[field];
        }

        this.error = new Error();
        this.http = axios;
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            this.fields = this.getLoadedFiles();

            this.http[requestType](url, this.fields)
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response);
                })
                .catch(errors => {
                    this.onFail(errors.response.data);

                    reject(errors.response);
                })
        });
    }

    onSuccess(response) {
        this.error.clear();
        this.files = new FormData()

        if (this.default.reset) {
            this.reset();
        }
    }

    onFail(errors) {
        return this.error.record(errors.errors);
    }

    get(url) {
        return this.submit('get', url);
    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    reset(field) {
        if (field) {
            return this.fields[field] = '';
        }

        for (let field in this.fields) {
            this.fields[field] = '';
        }
    }

    loadFiles(name, files) {
        if (!files || !files.length) return;

        for (let entrie in this.files.entries()) {
        }
        this.files.append(name, files[0]);
        for (let entrie in this.files.entries()) {
        }
    }

    getLoadedFiles() {
        if (this.hasFiles()) {
            for (let field in this.fields) {
                this.files.append(field, this.fields[field]);
            }
            return this.files;
        }

        return this.fields;
    }

    hasFiles() {
        let entries = []
        for (let entrie of this.files.entries()) {
            entries.push(entrie);
        }
        return  entries.length > 0 ? true : false;
    }
}
