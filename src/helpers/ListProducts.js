class ListProducts{
    constructor(){
        this.list = []
    }

    
    getLength = () => this.list.length

    
    createId = () => this.getLength() ? this.list[this.getLength() - 1].id + 1 : 1

   
    setList = contFile => this.list = JSON.parse(contFile)

    
    getList = () => this.list 


    getElements = numElements => this.list.slice( 0, numElements )  

   
    getElementById = id => this.list.find( ele => ele.id === id )
    
    
    getIndexElementById = id => this.list.findIndex( ele => ele.id === id)

    
    addElement = data => {
        let { title, description, code, price, status, stock, category, thumbnails } = data

        if( title === undefined || description === undefined || code === undefined || price === undefined || status === undefined || stock === undefined || category === undefined ){
            return false
        }

        if( thumbnails === undefined ){
            thumbnails = []
        }

        let oldLength = this.list.length

        this.list.push({
            id: this.createId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })

        let newLength = this.list.length

        if( newLength > oldLength ){
            return true
        }

        return false
    }

  
    updateElementById = ( id, data ) => {
        const indexId = this.getIndexElementById( id )

        if(indexId < 0 ){
            return false
        }

        const element = this.list[ indexId ]
        const { title, description, code, price, status, stock, category, thumbnails } = data
        const updated = []

        const isUpdated = {
            title : false,
            description: false,
            code: false,
            price: false,
            status: false,
            stock: false,
            category: false,
            thumbnails: false
        }

        if(title !== undefined && !(element.title === title)){
            element.title = title
            isUpdated.title = true
        }
        
        if(description !== undefined && !(element.description === description)){
            element.description = description
            isUpdated.description = true
        }

        if(code !== undefined && !(element.code === code)){
            element.code = code
            isUpdated.code = true
        }

        if(price !== undefined && !(element.price === price)){
            element.price = price
            isUpdated.price = true
        }

        if(status !== undefined && !(element.status === status)){
            element.status = status
            isUpdated.status = true
        }

        if(stock !== undefined && !(element.stock === stock)){
            element.stock = stock
            isUpdated.stock = true
        }

        if(category !== undefined && !(element.category === category)){
            element.category = category
            isUpdated.category = true
        }

        if(thumbnails !== undefined && !(element.thumbnails.length === thumbnails.length && element.thumbnails.every( strurl => thumbnails.includes(strurl)) )){
            element.thumbnails = thumbnails
            isUpdated.thumbnails = true
        }

        for (const property in isUpdated) {
            if (isUpdated[property] === true) {
                updated.push(property)
            }
        }

        return updated
    }

   
    deleteElementById = id => {
        const indexId = this.getIndexElementById( id )
        
        if( !(indexId < 0) ){
            this.list.splice( indexId, 1 )
        }
        
        return indexId
    }
    
    
    emptyList = () => this.list.length = 0 
}

module.exports = ListProducts