const createDiv = (className, textContent = null, datasetAttrs = null) => {
	const newDivElement = document.createElement("div")

	newDivElement.className = className
	newDivElement.textContent = textContent

	for (const attr in datasetAttrs)
		newDivElement.dataset[attr] = datasetAttrs[attr]

	return newDivElement
}


class Game {
	constructor() {
		this.default = {
			categoryCount: 6,
			queryCount: 5
		}

		this.drawBoard()
	}

	async drawBoard() {
		this.board = await new Promise(resolve => {
			fetch("./src/board.json")
				.then(response => response.json())
				.then(board => resolve(board))
		})

		const board = createDiv("board")
		document.body.appendChild(board)

		for (let rowIndex = 0; rowIndex < this.default.queryCount + 1; rowIndex++) {
			const row = createDiv("row")
			board.appendChild(row)

			for (let colIndex = 0; colIndex < this.default.categoryCount; colIndex++) {
				const col = createDiv("col s2")
				row.appendChild(col)

				const anchor = document.createElement("a")
				anchor.className = "modal-trigger"
				anchor.href = "#modal"
				col.appendChild(anchor)

				anchor.appendChild((() => {
					if (rowIndex) {
						const queryValue = rowIndex * 200
						const element = createDiv("cell query", queryValue)

						element.onclick = event => {
							const queryset = this.board[colIndex].queries[queryValue]
							const modalText = document.querySelector(".modal-content .query")

							modalText.dataset.categoryIndex = colIndex
							modalText.dataset.value = queryValue

							modalText.textContent = queryset.question
							anchor.remove()
						}
						return element
					} else {
						return createDiv("cell category", this.board[colIndex].category)
					}
				})())
			}
		}
	}
}

const game = new Game()

document.addEventListener("keyup", event => {
	if (event.code === "KeyA") {
		const modal = document.querySelector(".modal")
		const modalIsOpen = modal.classList.contains("open")

		if (modalIsOpen) {
			const modalText = modal.querySelector(".modal-content .query")
			const categoryIndex = modalText.dataset.categoryIndex
			const value = modalText.dataset.value

			modalText.textContent = game.board[categoryIndex].queries[value].answer
		}
	}
})