class Calculator {
  constructor (historyTextElement, currentTextElement) {
    this.historyTextElement = historyTextElement
    this.currentTextElement = currentTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.historyOperand = ''
    this.operation = undefined
  }

  appendNum(num) {
    if (num === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString().concat(num.toString())
  }

  deleteNum(){
    this.currentOperand = this.currentOperand.slice(0, 1)
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.historyOperand != '') {
      this.compute()
    }
    this.operation = operation
    this.historyOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let result
    const history = parseFloat(this.historyOperand)
    const current = parseFloat(this.currentOperand)
    switch (this.operation) {
      case '+':
        result = history + current
        break
      case '-':
        result = history - current
        break
      case '*':
        result = history * current
        break
      case '÷':
        result = history / current
        break
      default:
        return
    }
    this.currentOperand = result
    this.operation = undefined
    this.historyOperand = ''
  }

  getDisplayNumber(number) {
    console.log("display number")
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.historyTextElement.innerText =
        `${this.getDisplayNumber(this.historyOperand)} ${this.operation}`
    } else {
      this.historyTextElement.innerText = ''
    }
  }
}

  const numButtons = document.querySelectorAll('.number')
  const operationButtons = document.querySelectorAll('.operator')
  const clearEntryButton = document.querySelector('#clear-entry')
  const equalsButton = document.querySelector('#equal')
  const clearButton = document.querySelector('#clear')

  const historyTextElement = document.querySelector('#history-value')
  const currentTextElement = document.querySelector('#current-value')

  const calculator = new Calculator(historyTextElement, currentTextElement)

  numButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNum(button.innerText)
      calculator.updateDisplay()
    })
  })

  clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

  clearEntryButton.addEventListener('click', button => {
    calculator.deleteNum()
    calculator.updateDisplay()
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
