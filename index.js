module.exports = class {
    constructor(type) {
        this.type = type
        this.queries = []
    }

    addQuery(obj) {
        let nodes = '', args = ''

        if (obj.nodes) {
            Object.keys(obj.nodes).map((key) => {
                let node = obj.nodes[key]
                if (typeof node === 'object') {
                    nodes += this.addQuery({
                        nodes: node,
                        name: key,
                        returnNode: true,
                    })
                } else {
                    nodes += ` ${key} `
                }
            })
        }

        if (obj.args) {
            Object.keys(obj.args).map((key) => {
                let arg = obj.args[key]
                if (typeof arg === 'object') {
                    args += `${this.addQuery({
                        args: arg,
                        returnArgs: true,
                        name: key
                    })}`
                } else {
                    let qoutes = ''
                    if (typeof arg == 'string')
                        qoutes = '"'
                    args += ` ${key}: ${qoutes}${arg}${qoutes} `
                }
            })
        }

        if (obj.args && Object.keys(obj.args).length > 0 && !obj.returnArgs) {
            args = `(${args})`
        }

        if (obj.returnNode) {
            if (nodes == '') {
                return `${obj.name}`
            } else {
                return `${obj.name}{ 
                    ${nodes}   
                }`
            }
        } else if (obj.returnArgs) {
            return `${obj.name}: {${args}}`
        } else {
            if (nodes == '') {
                this.queries.push(`${obj.name} ${args}`)
            } else {
                this.queries.push(`${obj.name} ${args} { 
                    ${nodes}   
                }`)
            }
        }
    }

    getGraphQLString() {
        return `${this.type ? this.type : ''}{
            ${this.queries.join(' ')}
        }`
    }
}