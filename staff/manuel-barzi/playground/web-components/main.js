const view = new Component(document.body)
view.setBackgroundColor('black')

const colorList = new List // new List()
colorList.setStyleType('decimal')

const redColorItem = new ListItem
redColorItem.setText('Red')
redColorItem.setColor('tomato')
colorList.add(redColorItem)

const blueColorItem = new ListItem
blueColorItem.setText('Blue')
blueColorItem.setColor('dodgerblue')
colorList.add(blueColorItem)

const yellowColorItem = new ListItem
yellowColorItem.setText('yellow')
yellowColorItem.setColor('gold')
colorList.add(yellowColorItem)

view.add(colorList)