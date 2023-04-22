class ListCart {
	constructor() {
		this.list = []
	}

	
	getLength = () => this.list.length

	
	createId = () => this.getLength() ? this.list[this.getLength() - 1].id + 1 : 1

	
	setList = contFile => this.list = JSON.parse(contFile)

	
	getList = () => this.list

	
	getIndexElementById = id => this.list.findIndex(ele => ele.id === id)

	
	getIndexChildElementById = (indexParent, idChild) => this.list[indexParent].products.findIndex(child => child.product === idChild)

	
	addElement = () => this.list.push({ id: this.createId(), products: [] })

	
	getElementById = id => this.list.find(ele => ele.id === id)


	addElementByIds = (idParent, idChild) => {
		const indexParent = this.getIndexElementById(idParent)
		if (indexParent < 0) {
			return false
		}

		const indexChild = this.getIndexChildElementById(indexParent, idChild)

		if (indexChild < 0) {
			this.list[indexParent].products.push({ product: idChild, quantity: 1 })
		} else {
			this.list[indexParent].products[indexChild].quantity++
		}

		return true
	}
}

module.exports = ListCart